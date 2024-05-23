import { FormOutlined } from "@ant-design/icons";
import { Space, Typography } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";
import styled from "./Logo.module.scss";
import { HOME_PATHNAME } from "../router";

const Logo: FC = () => {
  const { Title } = Typography;
  return (
    <div className={styled.container}>
      <Link to={HOME_PATHNAME}>
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
