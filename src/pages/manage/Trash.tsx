import { FC, useEffect, useState } from "react";
import Header from "./components/Header";
import styled from "./common.module.scss";
import { Button, Empty, Modal, Space, Table, Tag, message } from "antd";
// import QuestionsCard from "../../components/QuestionsCard";
import { useTitle } from "ahooks";
import { produce } from "immer";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";
import { QuestionList } from "../../types/list";

const Trash: FC = () => {
  useTitle("回收站");

  const { confirm } = Modal;

  const [questionList, seQuestionList] = useState<QuestionList[]>([]);

  const { data, loading } = useLoadQuestionListData({ isDeleted: true });

  const { total = 0 } = data || {};

  const [selectedIds, setSelectedRowKeys] = useState<string[]>([]);

  function handleDelete(id: string | string[]) {
    confirm({
      title: "确认删除该问卷？",
      icon: <ExclamationCircleOutlined />,
      content: "此操作不可逆，请谨慎操作",
      onOk() {
        seQuestionList(
          produce((draft) => {
            Array.isArray(id)
              ? id.map((id) =>
                  draft.splice(
                    draft.findIndex((item) => item._id === id),
                    1,
                  ),
                )
              : draft.splice(
                  draft.findIndex((item) => item._id === id),
                  1,
                );
          }),
        );
        message.success(`删除成功${selectedIds}`);
      },
    });
  }

  useEffect(() => {
    seQuestionList(data?.list || []);
  }, [data]);

  const tableCoulumn = [
    {
      title: "问卷标题",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "是否发布",
      dataIndex: "isPublished",
      render: (isPublished: boolean) => {
        return isPublished ? (
          <Tag color="processing">已发布</Tag>
        ) : (
          <Tag>未发布</Tag>
        );
      },
    },
    {
      title: "答卷数量",
      dataIndex: "answerCount",
      key: "answerCount",
    },
    {
      title: "创建时间",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "操作",
      key: "action",
      render: ({ _id }: { _id: string }) => {
        return (
          <>
            <Space>
              <Button onClick={() => handleDelete(_id)}>恢复</Button>
              <Button onClick={() => handleDelete(_id)}>彻底删除</Button>
            </Space>
          </>
        );
      },
    },
  ];

  const TableElement = (
    <>
      <div style={{ marginBottom: "16px" }}>
        <Space>
          <Button type="primary" disabled={selectedIds.length === 0}>
            恢复
          </Button>
          <Button
            danger
            disabled={selectedIds.length === 0}
            onClick={() => handleDelete(selectedIds)}
          >
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        loading={loading}
        columns={tableCoulumn}
        dataSource={questionList}
        pagination={false}
        rowKey={({ _id }) => _id}
        rowSelection={{
          type: "checkbox",
          onChange: (selectedRowKeys) => {
            setSelectedRowKeys(selectedRowKeys as string[]);
          },
        }}
      />
    </>
  );

  return (
    <div>
      <Header title="回收站" />
      <div className={styled.content}>
        {!loading && questionList.length === 0 ? (
          <Empty description={"暂无数据"} />
        ) : (
          TableElement
        )}
      </div>
      <div>{total}</div>
    </div>
  );
};

export default Trash;
