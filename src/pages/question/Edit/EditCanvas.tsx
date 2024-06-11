import { FC } from "react";
import styled from "./EditCanvas.module.scss";
// import QuestionInput from "../../../components/QuestionComponents/QuestionInput/Component";
// import QuestionTitle from "../../../components/QuestionComponents/QuestionTitle/Component";
import { Spin } from "antd";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import {
  ComponentInfoType,
  changeSelectedId,
  moveComponent,
} from "../../../store/componentsReducer";
import { getComponentConfByType } from "../../../components/QuestionComponents";
import { useDispatch } from "react-redux";
import classNames from "classnames";
import useBindCanvasKeyPress from "../../../hooks/useBindCanvasKeyPress";
import SortableContainer from "../../../components/DragSortable/SortableContainer";
import SortableItem from "../../../components/DragSortable/SortableItem";

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
  // 后端控制初始化时候edit展示多少画布内容
  const { compontList, selectedId } = useGetComponentInfo();
  const dispatch = useDispatch();
  useBindCanvasKeyPress();

  // 点击画布，选中组件
  function handleClick(e: React.MouseEvent<HTMLDivElement>, id: string) {
    e?.stopPropagation(); //阻止冒泡
    dispatch(changeSelectedId(id));
  }

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <Spin />
      </div>
    );
  }

  // SortableContainer 组件的 items属性。需要每一个item都有id
  const componentListWithId = compontList.map((c) => {
    return {
      ...c,
      id: c.fe_id,
    };
  });

  // 拖拽排序结束
  function handleDrageEnd(oldIndex: number, newIndex: number) {
    dispatch(moveComponent({ oldIndex, newIndex }));
  }

  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDrageEnd}>
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
              <SortableItem key={item.fe_id} id={item.fe_id}>
                <div
                  className={wrapperClassName}
                  onClick={(e) => handleClick(e, item.fe_id)}
                >
                  <div className={styled.component}>{getComponent(item)}</div>
                </div>
              </SortableItem>
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
    </SortableContainer>
  );
};
export default EditCanvas;
