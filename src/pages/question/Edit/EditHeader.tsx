import { ChangeEvent, FC, useState } from "react";
import styled from "./EditHeader.module.scss";
import { Button, Input, Space, Typography, message } from "antd";
import { EditOutlined, LeftOutlined, LoadingOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import EditToolbar from "./EditToolbar";
import useGetPageInfo from "../../../hooks/useGetPageInfo";
import { useDispatch } from "react-redux";
import { changePageTitle } from "../../../store/pageInfoReducer";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import { useDebounceEffect, useKeyPress, useRequest } from "ahooks";
import { updateQuestionService } from "../../../services/question";

const { Title } = Typography;
// 显示和修改标题
const TitleElem: FC = () => {
  const { title } = useGetPageInfo();
  const [editState, setEditState] = useState(false);
  const dispatch = useDispatch();
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch(changePageTitle(e.target.value));
  }
  if (editState) {
    return (
      <Input
        value={title}
        onPressEnter={() => setEditState(false)}
        onBlur={() => setEditState(false)}
        onChange={handleChange}
      />
    );
  }
  return (
    <Space>
      <Title>{title}</Title>
      <Button
        icon={<EditOutlined />}
        type="text"
        onClick={() => setEditState(true)}
      />
    </Space>
  );
};

// 保存按钮
const SaveBtn: FC = () => {
  const { compontList } = useGetComponentInfo();
  const { id } = useParams();
  const pageInfo = useGetPageInfo();

  const { run: save, loading } = useRequest(
    async () => {
      if (!id) return;
      await updateQuestionService(id, { ...compontList, ...pageInfo });
    },
    {
      manual: true,
    },
  );

  // 快捷键
  useKeyPress(["ctrl.s", "meta.s"], (event: KeyboardEvent) => {
    event.preventDefault();
    if (!loading) save();
  });

  // 自动保存(不是定期保存,不是定时器),使用debounce防抖
  useDebounceEffect(
    () => {
      save();
    },
    [compontList, pageInfo],
    {
      wait: 1000,
    },
  );

  return (
    <Button
      onClick={save}
      disabled={loading}
      icon={loading ? <LoadingOutlined /> : null}
    >
      保存
    </Button>
  );
};

// 发布按钮
const PublishBtn: FC = () => {
  const { compontList } = useGetComponentInfo();
  const { id } = useParams();
  const pageInfo = useGetPageInfo();
  const nav = useNavigate();
  const { run: pub, loading } = useRequest(
    async () => {
      if (!id) return;
      await updateQuestionService(id, {
        ...pageInfo,
        compontList,
        isPublished: true,
      });
    },
    {
      manual: true,
      // 成功后跳转到问卷统计页面
      onSuccess() {
        message.success("发布成功");
        nav("/question/stat/" + id);
      },
    },
  );
  return (
    <Button type="primary" onClick={pub} disabled={loading}>
      发布
    </Button>
  );
};
// 编辑器头部
const EditHeader: FC = () => {
  const nav = useNavigate();
  return (
    <div className={styled["header-wrapper"]}>
      <div className={styled.header}>
        <div className={styled.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <TitleElem />
          </Space>
        </div>
        <div className={styled.main}>
          <EditToolbar />
        </div>
        <div className={styled.right}>
          <Space>
            <SaveBtn />
            <PublishBtn />
          </Space>
        </div>
      </div>
    </div>
  );
};

export default EditHeader;
