import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import { Space, Tabs } from "antd";
import { FC } from "react";
import ComponentLib from "./ComponentLib";
import Layers from "./Layers";

const LeftPanel: FC = () => {
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
      children: (
        <div>
          <Layers />
        </div>
      ),
    },
  ];
  return <Tabs defaultActiveKey="componentLib" items={tabsItem} />;
};

export default LeftPanel;
