import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import { Space, Tabs } from "antd";
import { FC } from "react";
import ComponentLib from "./ComponentLib";

const leftPanel: FC = () => {
  const tabsItem = [
    {
      key: "componentLib",
      label: (
        <span>
          <Space>
            <AppstoreOutlined />
            组件库
          </Space>
        </span>
      ),
      children: (
        <div>
          <ComponentLib />
        </div>
      ),
    },
    {
      key: "layers",
      label: (
        <span>
          <Space>
            <BarsOutlined />
            图层
          </Space>
        </span>
      ),
      children: <div>图层</div>,
    },
  ];
  return <Tabs defaultActiveKey="componentLib" items={tabsItem} />;
};

export default leftPanel;
