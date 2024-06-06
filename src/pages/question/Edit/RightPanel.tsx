import { FileTextOutlined, SettingOutlined } from "@ant-design/icons";
import { Space, Tabs } from "antd";
import { FC } from "react";
import ComponentProp from "./ComponentProp";

const RightPanel: FC = () => {
  const tabsItem = [
    {
      key: "prop",
      label: (
        <span>
          <Space>
            <FileTextOutlined />
            属性
          </Space>
        </span>
      ),
      children: (
        <div>
          <ComponentProp />
        </div>
      ),
    },
    {
      key: "setting",
      label: (
        <span>
          <Space>
            <SettingOutlined />
            设置
          </Space>
        </span>
      ),
      children: <div>设置</div>,
    },
  ];
  return <Tabs items={tabsItem} defaultActiveKey="prop"></Tabs>;
};

export default RightPanel;
