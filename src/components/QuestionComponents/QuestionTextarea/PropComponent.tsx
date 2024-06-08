import { useForm } from "antd/es/form/Form";
import { QuestionTextareaPropsType } from "./interface";
import { FC, useEffect } from "react";
import { Form, Input } from "antd";

const PropsComponent: FC<QuestionTextareaPropsType> = (
  props: QuestionTextareaPropsType,
) => {
  const { title, placeholder, onChange, disable } = props;
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
      disabled={disable}
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
