import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";
import { FC } from "react";
import { useDispatch } from "react-redux";
import {
  ChangeComponetnHidden,
  copySelectedComponent,
  pasteCopiedComponent,
  removeSelectedComponent,
  toggleComponentLocked,
} from "../../../store/componentsReducer";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";

const EditToolbar: FC = () => {
  const dispatch = useDispatch();
  const { selectedId, selectedComponent, copiedComponent } =
    useGetComponentInfo();
  const { isLocked } = selectedComponent || {};

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
    </Space>
  );
};

export default EditToolbar;
