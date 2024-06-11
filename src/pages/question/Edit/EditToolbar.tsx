import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  DownOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  RedoOutlined,
  UndoOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";
import { FC } from "react";
import { useDispatch } from "react-redux";
import {
  ChangeComponetnHidden,
  copySelectedComponent,
  moveComponent,
  pasteCopiedComponent,
  removeSelectedComponent,
  toggleComponentLocked,
} from "../../../store/componentsReducer";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import { ActionCreators as UnActionCreator } from "redux-undo";

const EditToolbar: FC = () => {
  const dispatch = useDispatch();
  const { selectedId, selectedComponent, copiedComponent, compontList } =
    useGetComponentInfo();
  const { isLocked } = selectedComponent || {};
  const length = compontList.length;
  const selectedIndex = compontList.findIndex((c) => c.fe_id === selectedId);
  const isFirst = selectedIndex <= 0; // 第一个
  const isLast = selectedIndex + 1 >= length; // 最后一个
  // 删除
  function handleDelete() {
    dispatch(removeSelectedComponent());
  }

  // 隐藏
  function handleHidden() {
    console.log("selectedId", selectedId);

    dispatch(ChangeComponetnHidden({ fe_id: selectedId, isHidden: true }));
  }
  // 锁定
  function handleLock() {
    dispatch(toggleComponentLocked({ fe_id: selectedId }));
  }
  // 复制
  function handlecopy() {
    dispatch(copySelectedComponent());
  }

  // 粘贴
  function handlePaste() {
    if (copiedComponent) {
      dispatch(pasteCopiedComponent());
    }
  }

  // 上移
  function moveUp() {
    dispatch(
      moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex - 1 }),
    );
  }

  // 下移
  function moveDown() {
    dispatch(
      moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex + 1 }),
    );
  }

  // 撤销
  function undo() {
    dispatch(UnActionCreator.undo());
  }

  // 重做
  function redo() {
    dispatch(UnActionCreator.redo());
  }

  return (
    <Space>
      <Tooltip title="删除">
        <Button
          shape="circle"
          icon={<DeleteOutlined />}
          onClick={handleDelete}
        ></Button>
      </Tooltip>
      <Tooltip title="隐藏">
        <Button
          shape="circle"
          icon={<EyeInvisibleOutlined />}
          onClick={handleHidden}
        ></Button>
      </Tooltip>
      <Tooltip title="锁定">
        <Button
          shape="circle"
          type={isLocked ? "primary" : "default"}
          icon={<LockOutlined />}
          onClick={handleLock}
        ></Button>
      </Tooltip>
      <Tooltip title="复制">
        <Button
          shape="circle"
          type={isLocked ? "primary" : "default"}
          icon={<CopyOutlined />}
          onClick={handlecopy}
        ></Button>
      </Tooltip>
      <Tooltip title="粘贴">
        <Button
          shape="circle"
          type={isLocked ? "primary" : "default"}
          icon={<BlockOutlined />}
          disabled={!copiedComponent}
          onClick={handlePaste}
        ></Button>
      </Tooltip>
      <Tooltip title="上移">
        <Button
          shape="circle"
          type={isLocked ? "primary" : "default"}
          icon={<UpOutlined />}
          disabled={isFirst}
          onClick={moveUp}
        ></Button>
      </Tooltip>
      <Tooltip title="下移">
        <Button
          shape="circle"
          type={isLocked ? "primary" : "default"}
          icon={<DownOutlined />}
          disabled={isLast}
          onClick={moveDown}
        ></Button>
      </Tooltip>
      <Tooltip title="撤销">
        <Button
          shape="circle"
          type={isLocked ? "primary" : "default"}
          icon={<UndoOutlined />}
          onClick={undo}
        ></Button>
      </Tooltip>
      <Tooltip title="重做">
        <Button
          shape="circle"
          type={isLocked ? "primary" : "default"}
          icon={<RedoOutlined />}
          onClick={redo}
        ></Button>
      </Tooltip>
    </Space>
  );
};

export default EditToolbar;
