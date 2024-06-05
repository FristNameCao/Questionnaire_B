/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import styled from "./Register.module.scss";
import { Button, Checkbox, Form, Space, message } from "antd";
import { MANAGE_INDEX_PATHNAME, REGISTER_PATHNAME } from "../router";
import { useForm } from "antd/es/form/Form";
import FormComm from "./components/FormComm";
import { RegisterType } from "../types/user";
import { useRequest } from "ahooks";
import { loginService } from "../services/user";
import { setToken } from "../utils/user-token";
const USERNAME_KEY = "username";
const PASSWORD_KEY = "password";
const Login: FC = () => {
  const nav = useNavigate();
  const [form] = useForm(); //第三方hook
  // 记住账户密码
  function rememberUserFromStorage(username: string, password: string) {
    localStorage.setItem(USERNAME_KEY, username);
    localStorage.setItem(PASSWORD_KEY, password);
  }

  // 删除账户密码
  function deleteUserFromStorage() {
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(PASSWORD_KEY);
  }

  // 获取账户密码
  function getUserInfoFormStorage() {
    const username = localStorage.getItem(USERNAME_KEY);
    const password = localStorage.getItem(PASSWORD_KEY);
    return { username, password };
  }

  // 回填账户密码
  useEffect(() => {
    const { username, password } = getUserInfoFormStorage();
    form.setFieldsValue({
      username,
      password,
    });
  }, []);

  // 登录请求

  const { run } = useRequest(
    async (username: string, password: string) => {
      return await loginService(username, password);
    },
    {
      manual: true,
      onSuccess(result) {
        const { token } = result;

        // 登录成功后,将token保存到本地
        setToken(token);
        message.success("登录成功");
        nav(MANAGE_INDEX_PATHNAME);
      },
    },
  );

  // 完成登录
  function onFinish(values: any) {
    const { username, password, remember } = values;
    run(username, password);
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
        <Form.Item<RegisterType>
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
