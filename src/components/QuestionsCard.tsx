import { FC, useState } from "react";
import "./QuestionsCard.css";
import { Button, Divider, Popconfirm, Space, Tag, message } from "antd";
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useRequest } from "ahooks";
import {
  duplicateQuestionService,
  updateQuestionService,
} from "../services/question";
interface QuestionsCard {
  _id: string;
  title: string;
  isPublished: boolean;
  createAt?: string;
  isStar: boolean;
  isDeleted?: boolean;
  handleDelete?: (_id: string) => void;
  handlePublish?: (_id: string) => void;
}

const QuestionsCard: FC<QuestionsCard> = (props) => {
  // const { confirm } = Modal;
  const nav = useNavigate();
  const { _id, title, isPublished, isDeleted, createAt, isStar } = props;

  const [isStarState, setIsStarState] = useState(isStar);

  const { loading: changeStartLoading, run: changeStart } = useRequest(
    async () => {
      await updateQuestionService(_id, { isStar: !isStarState });
    },
    {
      manual: true,
      onSuccess() {
        setIsStarState(!isStarState);
        message.success("星标操作成功");
      },
    },
  );

  // 删除
  const [isDeletedState, setDelected] = useState(isDeleted);
  const { loading: changeDeletedLoading, run: deleteQuestion } = useRequest(
    async () => {
      await updateQuestionService(_id, { isDeleted: !isDeletedState });
    },
    {
      manual: true,
      onSuccess() {
        setDelected(!isDeletedState);
        message.success("删除成功");
      },
    },
  );

  function detele() {
    // confirm({
    //   title: "是否删除问卷",
    //   content: "是否删除问卷",
    //   onOk() {
    //     deleteQuestion();
    //   },
    // });
    deleteQuestion();
  }

  const { loading: changeDuplicateLoading, run: changeDuplicate } = useRequest(
    async () => await duplicateQuestionService(_id),
    {
      manual: true,
      onSuccess(result) {
        const { id } = result;
        nav({
          pathname: `/question/edit/${id}`,
        });
        message.success("复制成功"); // 跳转编辑页
      },
    },
  );

  // function duplicate() {
  //   // alert("复制成功");
  //   message.success("复制成功");
  // }
  if (isDeletedState) return null;

  return (
    <div>
      <div key={_id} className="list-item">
        <div className="flex">
          <div className="flex-1">
            <Link
              to={
                isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`
              }
            >
              <Space>
                {isStarState && <StarOutlined style={{ color: "red" }} />}
                {title}
              </Space>
            </Link>
          </div>
          <div>
            <Space>
              {isPublished ? (
                <Tag color="processing">{"已发布"}</Tag>
              ) : (
                <>
                  <Tag>{"未发布"}</Tag>
                  {/* <button onClick={() => handlePublish(_id)}>{"发布"}</button> */}
                </>
              )}
              <span>{"答卷:" + _id}</span>
              <span>{createAt}</span>
            </Space>
          </div>
        </div>
        <Divider style={{ margin: "10px 0" }} />
        <div className="flex">
          <div className="flex-1">
            <Space>
              <Button
                type="text"
                icon={<EditOutlined />}
                size="small"
                onClick={() => nav(`/question/edit/${_id}`)}
              >
                编辑问卷
              </Button>
              <Button
                type="text"
                icon={<LineChartOutlined />}
                size="small"
                onClick={() => nav(`/question/stat/${_id}`)}
                disabled={!isPublished}
              >
                问卷统计
              </Button>
            </Space>
          </div>
          <div>
            <Button
              type="text"
              icon={<StarOutlined />}
              size="small"
              disabled={changeStartLoading}
              onClick={changeStart}
            >
              {isStarState ? "取消标星" : "标星"}
            </Button>
            <Popconfirm
              title={"确认复制该问卷？"}
              okText={"确定"}
              cancelText={"取消"}
              onConfirm={changeDuplicate}
            >
              <Button
                type="text"
                icon={<CopyOutlined />}
                disabled={changeDuplicateLoading}
              >
                复制
              </Button>
            </Popconfirm>
            <Popconfirm
              title={"确认删除该问卷？"}
              okText={"确定"}
              cancelText={"取消"}
              onConfirm={detele}
            >
              <Button
                type="text"
                icon={<DeleteOutlined />}
                disabled={changeDeletedLoading}
              >
                删除
              </Button>
            </Popconfirm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionsCard;
