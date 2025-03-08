import { Space, Typography } from "antd";
import { FC } from "react";
import { UserAddOutlined } from "@ant-design/icons";

interface HeaderProps {
  title: string;
}

const Header: FC<HeaderProps> = (props) => {
  const { Title } = Typography;
  const { title } = props;
  return (
    <>
      <Space>
        <Title level={2}>
          <UserAddOutlined />
        </Title>
        <Title level={2}>{title}</Title>
      </Space>
    </>
  );
};
export default Header;
