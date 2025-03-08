import { ChangeEvent, FC, useState } from "react";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import styled from "./Layers.module.scss";
import { Button, Input, Space, message } from "antd";
import { useDispatch } from "react-redux";
import {
  ChangeComponetnHidden,
  changeComponentTitle,
  changeSelectedId,
  moveComponent,
  toggleComponentLocked,
} from "../../../store/componentsReducer";
import classNames from "classnames";
import { EyeInvisibleOutlined, LockOutlined } from "@ant-design/icons";
import SortableContainer from "../../../components/DragSortable/SortableContainer";
import SortableItem from "../../../components/DragSortable/SortableItem";

const Layers: FC = () => {
  const { compontList, selectedId } = useGetComponentInfo();
  const [changingTitled, setChangingTitled] = useState<string>("");
  const dispatch = useDispatch();

  function handleTitleClick(fe_id: string) {
    const curComp = compontList.find((c) => c.fe_id === fe_id);
    if (curComp && curComp.isHidden) {
      message.info("该组件已隐藏，请先显示该组件");
      return;
    }

    if (fe_id !== selectedId) {
      // 第一次点击执行选中修改selectedId值
      dispatch(changeSelectedId(fe_id));
      setChangingTitled("");
      return;
    }

    // 第二次点击赋值后就成了Input 框，修改标题，因为这个时候selectedId和fe_id相等也就直接弹出Input框
    setChangingTitled(fe_id);
  }

  // 修改标题
  function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
    const newTitle = e.target.value.trim();
    if (!newTitle) return;
    if (!selectedId) return;
    dispatch(changeComponentTitle({ fe_id: selectedId, title: newTitle }));
  }

  // 切换/隐藏/显示

  function changeHidden(fe_id: string, isHidden: boolean) {
    dispatch(ChangeComponetnHidden({ fe_id, isHidden }));
  }

  function changeLocked(fe_id: string) {
    dispatch(toggleComponentLocked({ fe_id }));
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
      {compontList.map((c) => {
        const { fe_id, title, isHidden, isLocked } = c;

        const titleDefaultClassName = styled.title;

        const selectedClassName = styled.selected;
        const className = classNames({
          [titleDefaultClassName]: true,
          [selectedClassName]: fe_id === selectedId,
        });
        return (
          <SortableItem key={fe_id} id={fe_id}>
            <div className={styled.wrapper}>
              <div
                className={className}
                onClick={() => handleTitleClick(fe_id)}
              >
                {fe_id === changingTitled && (
                  <Input
                    value={title}
                    onChange={handleTitleChange}
                    onPressEnter={() => setChangingTitled("")}
                    onBlur={() => setChangingTitled("")}
                  />
                )}
                {fe_id !== changingTitled && title}
              </div>
              <div>
                <Space>
                  <Button
                    size="small"
                    shape="circle"
                    className={!isHidden ? styled.btn : ""}
                    icon={<EyeInvisibleOutlined />}
                    type={isHidden ? "primary" : "text"}
                    onClick={() => changeHidden(fe_id, !isHidden)}
                  />
                  <Button
                    size="small"
                    shape="circle"
                    className={!isLocked ? styled.btn : ""}
                    icon={<LockOutlined />}
                    type={isLocked ? "primary" : "text"}
                    onClick={() => changeLocked(fe_id)}
                  />
                </Space>
              </div>
            </div>
          </SortableItem>
        );
      })}
    </SortableContainer>
  );
};

export default Layers;
