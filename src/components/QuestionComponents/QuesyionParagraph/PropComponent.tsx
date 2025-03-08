import { FC, useEffect } from "react";
import { QuestionParagraphPropsType } from "./interface";
import { Checkbox, Form, Input } from "antd";

const PropComponent: FC<QuestionParagraphPropsType> = (
  props: QuestionParagraphPropsType,
) => {
  const { text, isCenter, onChange, disable } = props;
  const [form] = Form.useForm();

  function handleValuesChange() {
    if (onChange) {
      const values = form.getFieldsValue();
      onChange(values);
    }
  }

  useEffect(() => {
    form.setFieldsValue({ text, isCenter });
  }, [text, isCenter]);
  return (
    <Form
      layout="vertical"
      initialValues={{ text, isCenter }}
      form={form}
      onValuesChange={handleValuesChange}
      disabled={disable}
    >
      <Form.Item
        label="段落内容"
        name="text"
        rules={[{ required: true, message: "请输入段落内容" }]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item valuePropName="checked" name="isCenter">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
