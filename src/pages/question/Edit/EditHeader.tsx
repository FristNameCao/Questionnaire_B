import { FC } from "react";
import styled from "./EditHeader.module.scss";
import { Button, Space, Typography } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import EditToolbar from "./EditToolbar";

const { Title } = Typography;
const EditHeader: FC = () => {
  const nav = useNavigate();
  return (
    <div className={styled["header-wrapper"]}>
      <div className={styled.header}>
        <div className={styled.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <Title>{"问卷标题"}</Title>
          </Space>
        </div>
        <div className={styled.main}>
          <EditToolbar />
        </div>
        <div className={styled.right}>
          <Space>
            <Button>保存</Button>
            <Button type="primary">发布</Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default EditHeader;
