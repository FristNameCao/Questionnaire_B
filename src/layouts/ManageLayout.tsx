import { FC } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "./ManageLayout.module.scss";
import { Button, Divider, Space, message } from "antd";
import {
  BarsOutlined,
  DeleteOutlined,
  PlusOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { createQuestionService } from "../services/question";
import { useRequest } from "ahooks";
const ManageLayout: FC = () => {
  // const [loading, setLoading] = useState(false);
  // nav跳转
  const nav = useNavigate();
  // 根据url判断高亮效果
  const { pathname } = useLocation();

  // async function handleCreaterClick() {
  //   setLoading(true);
  //   const data = await createQuestionService();
  //   const { id } = data;
  //   if (id) {
  //     nav(`/question/edit/${id}`);
  //     message.success("创建成功");
  //   }
  //   setLoading(false);
  // }

  const { loading, run: handleCreaterClick } = useRequest(
    createQuestionService,
    {
      manual: true,
      onSuccess(data) {
        const { id } = data;
        if (id) {
          nav(`/question/edit/${id}`);
          message.success("创建成功");
        }
      },
    },
  );

  return (
    <div className={styled.container}>
      <div className={styled.left}>
        <Space direction="vertical">
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            disabled={loading}
            onClick={handleCreaterClick}
          >
            新建问卷
          </Button>
          <Divider style={{ borderTop: "transparent" }} />
          <Button
            type={pathname.startsWith("/manage/list") ? "default" : "text"}
            size="large"
            icon={<BarsOutlined />}
            onClick={() => nav("/manage/list")}
          >
            我的问卷
          </Button>
          <Button
            type={pathname.startsWith("/manage/star") ? "default" : "text"}
            icon={<StarOutlined />}
            onClick={() => nav("/manage/star")}
          >
            星标问卷
          </Button>
          <Button
            type={pathname.startsWith("/manage/trash") ? "default" : "text"}
            icon={<DeleteOutlined />}
            onClick={() => nav("/manage/trash")}
          >
            回收站
          </Button>
        </Space>
      </div>
      <div className={styled.right}>
        <Outlet />
      </div>
    </div>
  );
};
export default ManageLayout;
