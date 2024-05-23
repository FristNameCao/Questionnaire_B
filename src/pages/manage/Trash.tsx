import { FC, useEffect, useState } from "react";
import Header from "./components/Header";
import styled from "./common.module.scss";
import { Button, Empty, Modal, Space, Table, Tag, message } from "antd";
// import QuestionsCard from "../../components/QuestionsCard";
import { useTitle } from "ahooks";
import { produce } from "immer";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const Trash: FC = () => {
  useTitle("回收站");

  const { confirm } = Modal;

  const [questionList, seQuestionList] = useState([
    {
      _id: 1,
      title: "问卷1",
      isPublished: true,
      isStart: true,
      date: "5月10日13:23",
      answerCount: 5,
    },
    {
      _id: 2,
      title: "问卷2",
      isPublished: false,
      isStart: false,
      date: "5月11日13:23",
      answerCount: 6,
    },
    {
      _id: 3,
      title: "问卷3",
      isPublished: true,
      isStart: true,
      date: "5月12日13:23",
      answerCount: 2,
    },
    {
      _id: 4,
      title: "问卷4",
      isPublished: false,
      isStart: false,
      date: "5月13日13:23",
      answerCount: 4,
    },
  ]);

  const [selectedIds, setSelectedRowKeys] = useState<number[]>([]);

  function handleDelete(id: number | number[]) {
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
    console.log(Array.isArray(selectedIds));
  }, [selectedIds]);

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
      render: ({ _id }: { _id: number }) => {
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
        columns={tableCoulumn}
        dataSource={questionList}
        pagination={false}
        rowKey={({ _id }) => _id}
        rowSelection={{
          type: "checkbox",
          onChange: (selectedRowKeys) => {
            setSelectedRowKeys(selectedRowKeys as number[]);
          },
        }}
      />
    </>
  );

  return (
    <div>
      <Header title="回收站" />
      <div className={styled.content}>
        {questionList.length === 0 ? (
          <Empty description={"暂无数据"} />
        ) : (
          TableElement
        )}
      </div>
    </div>
  );
};

export default Trash;
