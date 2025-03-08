import { FC, useEffect } from "react";
import useGetPageIndo from "../../../hooks/useGetPageInfo";
import { Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { resetPageInfo } from "../../../store/pageInfoReducer";

const PageSetting: FC = () => {
  const pageInfo = useGetPageIndo();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  function handleValuesChange() {
    dispatch(resetPageInfo(form.getFieldsValue()));
  }

  // 实时更新表单内容
  useEffect(() => {
    form.setFieldsValue(pageInfo);
  }, [pageInfo]);

  return (
    <Form
      layout="vertical"
      initialValues={pageInfo}
      onValuesChange={handleValuesChange}
      form={form}
    >
      <Form.Item
        label="问卷标题"
        name="title"
        rules={[{ required: true, message: "请输入标题" }]}
      >
        <Input placeholder="请输入标题" />
      </Form.Item>
      <Form.Item label="问卷描述" name="decs">
        <Input.TextArea placeholder="请输入问卷描述" />
      </Form.Item>
      <Form.Item label="样式代码" name="css">
        <Input.TextArea placeholder="请输入css样式代码" />
      </Form.Item>
      <Form.Item label="脚本代码" name="js">
        <Input.TextArea placeholder="请输入js脚本代码" />
      </Form.Item>
    </Form>
  );
};

export default PageSetting;
