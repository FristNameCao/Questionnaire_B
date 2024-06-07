import { FC, useEffect } from "react";
import { QuestionInfoPropsType } from "./interface";
import { Form, Input } from "antd";

const PropComponent: FC<QuestionInfoPropsType> = (
  props: QuestionInfoPropsType,
) => {
  const { title, desc, onChange, disable } = props;
  const [form] = Form.useForm();

  function handleValuesChange() {
    onChange?.(form.getFieldsValue());
  }

  useEffect(() => {
    form.setFieldsValue({ title, desc });
  }, [title, desc]);
  return (
    <Form
      layout="vertical"
      initialValues={{ title, desc }}
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
      <Form.Item label="描述" name="desc">
        <Input.TextArea />
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
