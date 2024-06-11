import { FC } from "react";
import styled from "./StatHeader.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Space, Typography } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import useGetPageInfo from "../../../hooks/useGetPageInfo";

const { Title } = Typography;
const StatHeader: FC = () => {
  const nav = useNavigate();
  const { title } = useGetPageInfo();
  const { id } = useParams();
  return (
    <div className={styled["header-wrapper"]}>
      <div className={styled.header}>
        <div className={styled.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              {"返回"}
            </Button>
            <Title>{title}</Title>
          </Space>
        </div>
        <div className={styled.main}>中</div>
        <div className={styled.right}>
          <Button type="primary" onClick={() => nav(`/question/edit/${id}`)}>
            {"编辑"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StatHeader;
