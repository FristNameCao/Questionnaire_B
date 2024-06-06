import { DeleteOutlined } from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { removeSelectedComponent } from "../../../store/componentsReducer";

const EditToolbar: FC = () => {
  const dispatch = useDispatch();

  function handleDelete() {
    dispatch(removeSelectedComponent());
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
    </Space>
  );
};

export default EditToolbar;
