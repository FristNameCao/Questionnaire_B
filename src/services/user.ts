import { RegisterType } from "../types/user";
import axios, { ResDataType } from "./ajax";

// 获取用户信息
export const getUserInfoService = (): Promise<ResDataType> =>
  axios.get("/api/user/info");

//  注册用户
export const registerService = async (
  register: RegisterType,
): Promise<ResDataType> => {
  const url = "/api/user/register";
  const { username, password, confirm, nickname } = register;
  const body = {
    username,
    password,
    nickname: nickname || username,
    confirm,
  };
  if (confirm !== password) {
    return {
      code: 400,
      msg: "两次密码不一致",
    };
  }
  const data = await axios.post(url, body);
  return data;
};

// 登录
export const loginService = async (
  username: string,
  password: string,
): Promise<ResDataType> =>
  await axios.post("/api/user/login", { username, password });
