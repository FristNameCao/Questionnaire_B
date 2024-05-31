import { Button, Form, Input, Space } from "antd";
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_PATHNAME } from "../router";
import styled from "./Register.module.scss";
import Header from "./components/Header";
import FormComm from "./components/FormComm";
import { useRequest } from "ahooks";
import { RegisterType } from "../types/user";
import { registerService } from "../services/user";

const Register: FC = () => {
  const nav = useNavigate();
  const { loading: registerLoading, run: onFinish } = useRequest(
    async (values: RegisterType) => {
      await registerService(values);
    },
    {
      manual: true,
      onSuccess() {
        nav(LOGIN_PATHNAME, { replace: true });
        console.log("注册成功");
      },
    },
  );

  // 完成注册
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // function onFinish(values: any) {
  //   console.log("Success:", values);
  // }
  // 错误信息
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onFinishFailed(values: any) {
    console.log("Error:", values);
  }
  return (
    <div className={styled.container}>
      <Header title="用户注册" />
      <Form
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <FormComm />
        <Form.Item<RegisterType>
          label="确认密码"
          name="confirm"
          dependencies={["password"]} //依赖于 password ,password变化,会重新触发 validator
          rules={[
            { required: true, message: "请输入确认密码!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                } else {
                  return Promise.reject(new Error("两次密码不一致"));
                }
              },
            }),
          ]}
        >
          <Input.Password allowClear />
        </Form.Item>
        <Form.Item<RegisterType>
          label="昵称"
          name="nickname"
          // rules={[{ required: true, message: "请输入你的昵称" }]}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 7, span: 16 }}>
          <Space>
            <Button type="primary" htmlType="submit" disabled={registerLoading}>
              注册
            </Button>
            <Link to={LOGIN_PATHNAME}>有账户？直接登录</Link>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Register;
