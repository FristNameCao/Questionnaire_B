import { Typography } from "antd";
import { FC } from "react";
import styled from "../common.module.scss";
import ListSearch from "../../../components/ListSearch";

interface HeaderProps {
  title: string;
}

const Header: FC<HeaderProps> = (props) => {
  const { Title } = Typography;
  const { title } = props;
  return (
    <div className={styled.header}>
      <div className={styled.left}>
        <Title level={3}>{title}</Title>
      </div>
      <div className={styled.right}>
        <ListSearch />
      </div>
    </div>
  );
};
export default Header;
