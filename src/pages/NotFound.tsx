import { Button, Result } from "antd";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { MANAGE_INDEX_PATHNAME } from "../router";

const NotFound: FC = () => {
  const nav = useNavigate();
  return (
    <Result
      status={404}
      title={"404"}
      subTitle={"页面不存在"}
      extra={
        <Button type="primary" onClick={() => nav(MANAGE_INDEX_PATHNAME)}>
          返回首页
        </Button>
      }
    ></Result>
  );
};
export default NotFound;
