import { FormOutlined } from "@ant-design/icons";
import { Space, Typography } from "antd";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "./Logo.module.scss";
import { HOME_PATHNAME, MANAGE_INDEX_PATHNAME } from "../router";
import useGetUserInfo from "../hooks/useGetUserInfo";

const Logo: FC = () => {
  const { Title } = Typography;

  const { username } = useGetUserInfo();

  const [pathname, setPathname] = useState(HOME_PATHNAME);

  useEffect(() => {
    if (username) {
      setPathname(MANAGE_INDEX_PATHNAME);
    }
  }, [username]);

  return (
    <div className={styled.container}>
      <Link to={pathname}>
        <Space>
          <Title>
            <FormOutlined />
          </Title>
          <Title>问卷调查</Title>
        </Space>
      </Link>
    </div>
  );
};

export default Logo;
