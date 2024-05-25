/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import styled from "./Register.module.scss";
import { Button, Checkbox, Form, Space } from "antd";
import { REGISTER_PATHNAME } from "../router";
import { useForm } from "antd/es/form/Form";
import FormComm from "./components/FormComm";

type FieldType = {
  username: string;
  password: string;
  remember: boolean;
};

const USERNAME_KEY = "username";
const PASSWORD_KEY = "password";
const Login: FC = () => {
  const nav = useNavigate();
  const [form] = useForm(); //第三方hook

  function rememberUserFromStorage(username: string, password: string) {
    localStorage.setItem(USERNAME_KEY, username);
    localStorage.setItem(PASSWORD_KEY, password);
  }

  function deleteUserFromStorage() {
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(PASSWORD_KEY);
  }

  function getUserInfoFormStorage() {
    const username = localStorage.getItem(USERNAME_KEY);
    const password = localStorage.getItem(PASSWORD_KEY);
    return { username, password };
  }

  useEffect(() => {
    const { username, password } = getUserInfoFormStorage();
    form.setFieldsValue({
      username,
      password,
    });
  }, []);

  // 完成登录
  function onFinish(values: any) {
    const { username, password, remember } = values;

    if (remember) {
      rememberUserFromStorage(username, password);
    } else {
      deleteUserFromStorage();
    }
  }

  // 错误信息
  function onFinishFailed(values: any) {
    console.log("Error:", values);
  }
  return (
    <div className={styled.container}>
      <Header title="用户登录" />
      <Form
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
      >
        <FormComm />
        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 7, span: 16 }}
        >
          <Checkbox>记住密码</Checkbox>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 7, span: 16 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
            <Link to={REGISTER_PATHNAME}>我要注册</Link>
          </Space>
        </Form.Item>
      </Form>
      <button onClick={() => nav(-1)}>返回</button>
    </div>
  );
};
export default Login;
