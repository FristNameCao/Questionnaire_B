import { FC } from "react";
import styled from "./EditCanvas.module.scss";
// import QuestionInput from "../../../components/QuestionComponents/QuestionInput/Component";
// import QuestionTitle from "../../../components/QuestionComponents/QuestionTitle/Component";
import { Spin } from "antd";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import {
  ComponentInfoType,
  changeSelectedId,
} from "../../../store/componentsReducer";
import { getComponentConfByType } from "../../../components/QuestionComponents";
import { useDispatch } from "react-redux";
import classNames from "classnames";
import useBindCanvasKeyPress from "../../../hooks/useBindCanvasKeyPress";

type EditCanvasPropsType = {
  loading: boolean;
};

function getComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo; // 每个组件的信息，是从redux store获取的
  const componentConf = getComponentConfByType(type);
  const { Component } = componentConf;
  return <Component {...props} />;
}

const EditCanvas: FC<EditCanvasPropsType> = ({ loading }) => {
  const { compontList, selectedId } = useGetComponentInfo();
  const dispatch = useDispatch();
  useBindCanvasKeyPress();
  function handleClick(e: React.MouseEvent<HTMLDivElement>, id: string) {
    e?.stopPropagation(); //组织冒泡
    dispatch(changeSelectedId(id));
  }

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <Spin />
      </div>
    );
  }

  return (
    <div className={styled.canvas}>
      {compontList
        .filter((item) => !item.isHidden)
        .map((item) => {
          const wrapperDefaultClassName = styled["component-wrapper"];
          const selectedClassName = styled.selected;
          const lockedCLassName = styled.locked;
          const wrapperClassName = classNames({
            [wrapperDefaultClassName]: true,
            [selectedClassName]: selectedId === item.fe_id,
            [lockedCLassName]: item.isLocked,
          });
          return (
            <div
              className={wrapperClassName}
              key={item.fe_id}
              onClick={(e) => handleClick(e, item.fe_id)}
            >
              <div className={styled.component}>{getComponent(item)}</div>
            </div>
          );
        })}

      {/* 静态组件 */}
      {/* <div className={styled["component-wrapper"]}>
        <div className={styled.component}>
          <QuestionTitle />
        </div>
      </div>
      <div className={styled["component-wrapper"]}>
        <div className={styled.component}>
          <QuestionInput />
        </div>
      </div> */}
    </div>
  );
};
export default EditCanvas;
