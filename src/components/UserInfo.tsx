import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_PATHNAME } from "../router";
import { useDebounceFn } from "ahooks";
// import { getUserInfoService } from "../services/user";
import { UserOutlined } from "@ant-design/icons";
import { Button, Space, message } from "antd";
import { removeToken } from "../utils/user-token";
import { useDispatch } from "react-redux";
import { logoutReducer } from ".././store/userReducer";
import useGetUserInfo from "../hooks/useGetUserInfo";

const UserInfo: FC = () => {
  const nav = useNavigate();
  // const { data } = useRequest(getUserInfoService);
  // const { username, nickname } = data || {};
  const { username, nickname } = useGetUserInfo();
  const dispatch = useDispatch();
  const { run: logout } = useDebounceFn(
    () => {
      removeToken(); // 清除token
      dispatch(logoutReducer());
      message.success("退出成功");
      nav(LOGIN_PATHNAME);
    },
    {
      wait: 1000,
    },
  );
  if (username) {
    return (
      <>
        <span style={{ color: "#e8e8e8" }}>
          <Space>
            <UserOutlined />
            {nickname}
          </Space>
        </span>
        <Button type="link" onClick={logout}>
          退出
        </Button>
      </>
    );
  }
  return (
    <>
      <Link to={LOGIN_PATHNAME}>登录</Link>
    </>
  );
};

export default UserInfo;
