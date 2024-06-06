import { useForm } from "antd/es/form/Form";
import { QuestionInputPropsType } from "./interface";
import { FC, useEffect } from "react";
import { Form, Input } from "antd";

const PropsComponent: FC<QuestionInputPropsType> = (
  props: QuestionInputPropsType,
) => {
  const { title, placeholder, onChange } = props;
  const [form] = useForm();
  function handleValuesChange() {
    if (onChange) {
      const values = form.getFieldsValue();
      onChange(values);
    }
  }
  useEffect(() => {
    form.setFieldsValue({ title, placeholder });
  }, [title, placeholder]);

  return (
    <Form
      layout="vertical"
      initialValues={{ title, placeholder }}
      form={form}
      onValuesChange={handleValuesChange}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: "请输入标题" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="placeholder" name="placeholder">
        <Input />
      </Form.Item>
    </Form>
  );
};

export default PropsComponent;
