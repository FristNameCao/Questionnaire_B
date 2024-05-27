import { FC } from "react";
import "./QuestionsCard.css";
import { Button, Divider, Popconfirm, Space, Tag, message, Modal } from "antd";
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
interface QuestionsCard {
  _id: string;
  title: string;
  isPublished: boolean;
  createAt?: string;
  isStar: boolean;
  handleDelete?: (_id: string) => void;
  handlePublish?: (_id: string) => void;
}

const QuestionsCard: FC<QuestionsCard> = (props) => {
  const { confirm } = Modal;
  const nav = useNavigate();
  const {
    _id,
    title,
    isPublished,
    handleDelete = () => {},
    // handlePublish,
    createAt,
    isStar,
  } = props;

  function detele(_id: string) {
    confirm({
      title: "是否删除问卷",
      content: "是否删除问卷",
      onOk() {
        handleDelete(_id);
        message.success("删除成功");
      },
    });
  }

  function duplicate() {
    // alert("复制成功");
    message.success("复制成功");
  }
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
                {isStar && <StarOutlined style={{ color: "red" }} />}
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
            <Button type="text" icon={<StarOutlined />} size="small">
              {isStar ? "取消标星" : "标星"}
            </Button>
            <Popconfirm
              title={"确认复制该问卷？"}
              okText={"确定"}
              cancelText={"取消"}
              onConfirm={duplicate}
            >
              <Button type="text" icon={<CopyOutlined />}>
                复制
              </Button>
            </Popconfirm>
            <Button
              type="text"
              icon={<DeleteOutlined />}
              onClick={() => detele(_id)}
            >
              删除
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionsCard;
