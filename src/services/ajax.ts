/* eslint-disable @typescript-eslint/no-explicit-any */
import { message } from "antd";
import axios, { AxiosResponse } from "axios";
import { getToken } from "../utils/user-token";

const instance = axios.create({
  timeout: 10 * 1000,
});

// request 拦截:统一处理token,每次请求都会携带token
instance.interceptors.request.use(
  (config) => {
    const token = `Bearer ${getToken()}`; // JWT 固定格式
    config.headers.Authorization = token;
    return config;
  },
  (error) => Promise.reject(error),
);

// response 拦截:统一处理errno 和msg
instance.interceptors.response.use(
  (res: AxiosResponse): AxiosResponse | Promise<AxiosResponse> => {
    const resData = (res.data || {}) as ResType;
    const { errno, data, msg } = resData;
    if (errno !== 0) {
      if (msg) {
        message.error(msg);
      }
      throw new Error(msg);
    }

    return data as any;
  },
);

export default instance;

export type ResType = {
  errno: number;
  data: ResDataType;
  msg?: string;
};

export type ResDataType = {
  [key: string]: any;
};
