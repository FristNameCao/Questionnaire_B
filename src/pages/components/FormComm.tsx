import { FC } from "react";
import { Form, Input } from "antd";

type FieldType = {
  username: string;
  password: string;
};
const FormComm: FC = () => {
  return (
    <div>
      <Form.Item<FieldType>
        label="用户名"
        name="username"
        rules={[
          { required: true, message: "请输入你的用户名" },
          {
            type: "string",
            min: 5,
            max: 20,
            message: "用户名长度在5-20之间",
          },
          {
            pattern: /^\w+$/,
            message: "只能是字母数字下划线",
          },
        ]}
      >
        <Input allowClear />
      </Form.Item>
      <Form.Item<FieldType>
        label="密码"
        name="password"
        rules={[
          { required: true, message: "请输入你的密码!" },
          () => ({
            validator(_, value) {
              console.log(value);
              if (value.length < 8) {
                return Promise.reject(new Error("密码至少8位,且少于16位"));
              }
              if (value.length > 16) {
                return Promise.reject(new Error("密码最多16位"));
              }
              const reg = /^[A-Za-z\d!@#$%^&*]{8,16}$/;
              if (!reg.test(value)) {
                return Promise.reject("仅支持字符,英文,数字");
              }
              return Promise.resolve();
            },
          }),
        ]}
      >
        <Input.Password allowClear />
      </Form.Item>
    </div>
  );
};

export default FormComm;
