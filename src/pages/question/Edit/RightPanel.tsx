import { FileTextOutlined, SettingOutlined } from "@ant-design/icons";
import { Space, Tabs } from "antd";
import { FC, useEffect, useState } from "react";
import ComponentProp from "./ComponentProp";
import PageSetting from "./PageSetting";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";

// 枚举
export enum TAB_KEYS {
  PROP = "prop",
  SETTING = "setting",
}

const RightPanel: FC = () => {
  const [activeKey, setActiveKey] = useState<TAB_KEYS>(TAB_KEYS.PROP);

  const { selectedId } = useGetComponentInfo();

  useEffect(() => {
    if (selectedId) {
      setActiveKey(TAB_KEYS.PROP);
    } else {
      setActiveKey(TAB_KEYS.SETTING);
    }
  }, [selectedId]);

  const tabsItem = [
    {
      key: TAB_KEYS.PROP,
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
      key: TAB_KEYS.SETTING,
      label: (
        <span>
          <Space>
            <SettingOutlined />
            设置
          </Space>
        </span>
      ),
      children: (
        <div>
          <PageSetting />
        </div>
      ),
    },
  ];
  return <Tabs items={tabsItem} activeKey={activeKey}></Tabs>;
};

export default RightPanel;
