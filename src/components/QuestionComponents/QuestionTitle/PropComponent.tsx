import { useForm } from "antd/es/form/Form";
import { QuestionTitleProprsType } from "./interface";
import { FC, useEffect } from "react";
import { Checkbox, Form, Input, Select } from "antd";

const PropsComponent: FC<QuestionTitleProprsType> = (
  props: QuestionTitleProprsType,
) => {
  const { text, level, isCenter, onChange, disable } = props;

  const [form] = useForm();
  function handleValuesChange() {
    if (onChange) {
      const values = form.getFieldsValue();
      onChange(values);
    }
  }

  useEffect(() => {
    form.setFieldsValue({ text, level, isCenter });
  }, [text, level, isCenter]);

  return (
    <Form
      onValuesChange={handleValuesChange}
      layout="vertical"
      initialValues={{ text, level, isCenter }}
      form={form}
      disabled={disable}
    >
      <Form.Item
        label="标题内容"
        name="text"
        rules={[{ required: true, message: "请输入标题内容" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="层级" name="level">
        <Select
          options={[
            { value: 1, text: 1 },
            { value: 2, text: 2 },
            { value: 3, text: 3 },
          ]}
        />
      </Form.Item>
      <Form.Item valuePropName="checked" name="isCenter">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropsComponent;
