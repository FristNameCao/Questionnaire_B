import { FC } from "react";
import { getComponentConfByType } from "../../../components/QuestionComponents";
import styled from "./ComponentList.module.scss";

import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import classNames from "classnames";

type PropsType = {
  selectedComponentId: string;
  setSelectedComponentId: (id: string) => void;
  setSelectedComponentType: (type: string) => void;
};

const ComponentList: FC<PropsType> = (props: PropsType) => {
  const {
    selectedComponentId,
    setSelectedComponentId,
    setSelectedComponentType,
  } = props;
  const { compontList } = useGetComponentInfo();
  // const [selectedComponentId, setSelectedComponentId] = useState("");

  return (
    <div>
      {/* 左侧组件列表 */}
      {compontList
        .filter((item) => !item.isHidden) //过滤隐藏组件
        .map((item) => {
          const { fe_id, props, type } = item;
          const componentConf = getComponentConfByType(type);
          if (!componentConf) return null;

          const { Component } = componentConf;

          // 拼接 className
          const wrapperDefaultClassName = styled["component-wrapper"];
          const selectedClassName = styled.selected;
          const wrapperClassName = classNames({
            [wrapperDefaultClassName]: true,
            [selectedClassName]: fe_id === selectedComponentId, // 是否选中
          });
          return (
            <div
              key={fe_id}
              className={wrapperClassName}
              onClick={() => {
                setSelectedComponentId(fe_id), setSelectedComponentType(type);
              }}
            >
              <div className={styled.component}>
                <Component {...props} />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ComponentList;
