import { FC, useEffect, useState } from "react";
import Header from "./components/Header";
import styled from "./common.module.scss";
import {
  Button,
  Empty,
  Modal,
  Popconfirm,
  Space,
  Table,
  Tag,
  message,
} from "antd";
// import QuestionsCard from "../../components/QuestionsCard";
import { useRequest, useTitle } from "ahooks";
// import { produce } from "immer";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";
import { QuestionList } from "../../types/list";
import ListPage from "../../components/ListPage";
import {
  deleteQuestionService,
  updateQuestionService,
} from "../../services/question";

const Trash: FC = () => {
  useTitle("回收站");

  const { confirm } = Modal;

  const { data, loading, refresh } = useLoadQuestionListData({
    isDeleted: true,
  });

  const [questionList, seQuestionList] = useState<QuestionList[]>([]);

  const [selectedIds, setSelectedRowKeys] = useState<string[]>([]);
  const { list = [], total = 0 } = data || {};

  // function handleDelete(id: string | string[]) {
  //   confirm({
  //     title: "确认删除该问卷？",
  //     icon: <ExclamationCircleOutlined />,
  //     content: "此操作不可逆，请谨慎操作",
  //     onOk() {
  //       seQuestionList(
  //         produce((draft) => {
  //           Array.isArray(id)
  //             ? id.map((id) =>
  //                 draft.splice(
  //                   draft.findIndex((item) => item._id === id),
  //                   1,
  //                 ),
  //               )
  //             : draft.splice(
  //                 draft.findIndex((item) => item._id === id),
  //                 1,
  //               );
  //         }),
  //       );
  //       message.success(`删除成功${selectedIds}`);
  //     },
  //   });
  // }

  // 删除

  // 合并重置刷新
  function handleRefresh() {
    refresh(); //手动刷新列表
    setSelectedRowKeys([]);
  }

  // 删除确认
  function handleDelete() {
    confirm({
      title: "确认删除该问卷？",
      icon: <ExclamationCircleOutlined />,
      content: "此操作不可逆，请谨慎操作",
      onOk: () => deleteQuestion(),
    });
  }

  // 恢复确认
  function handleRecover() {
    confirm({
      title: "确认恢复该问卷？",
      content: "恢复后可去我的问卷查看",
      icon: <ExclamationCircleOutlined />,
      onOk: () => recover(),
    });
  }

  useEffect(() => {
    seQuestionList(list);
  }, [loading]);

  // 批量恢复
  const { loading: recoverLoading, run: recover } = useRequest(
    async () => {
      for await (const id of selectedIds) {
        await updateQuestionService(id, { isDeleted: false });
      }
    },
    {
      manual: true,
      debounceMaxWait: 500,
      onSuccess() {
        message.success("恢复成功");
        handleRefresh();
      },
    },
  );

  // 批量删除
  const { loading: deleteLoading, run: deleteQuestion } = useRequest(
    async () => await deleteQuestionService(selectedIds),
    {
      manual: true,
      debounceMaxWait: 500,
      onSuccess() {
        message.success("删除成功");
        handleRefresh();
      },
    },
  );

  // 单个删除
  async function handleDeletedOne(_id: string) {
    await deleteQuestionService(_id);
    refresh();
  }

  // 单个恢复
  async function handleRecoverOne(_id: string) {
    await updateQuestionService(_id, { isDeleted: false });
    refresh();
  }

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
              <Popconfirm
                title={"确认恢复该问卷？"}
                description={"恢复后可去我的问卷查看"}
                okText={"确定"}
                cancelText={"取消"}
                onConfirm={() => handleRecoverOne(_id)}
              >
                <Button>恢复</Button>
              </Popconfirm>
              <Popconfirm
                title={"确认彻底删除该问卷？"}
                description={"此操作不可逆，请谨慎操作"}
                okText={"确定"}
                cancelText={"取消"}
                onConfirm={() => handleDeletedOne(_id)}
              >
                <Button>彻底删除</Button>
              </Popconfirm>
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
          <Button
            type="primary"
            disabled={selectedIds.length === 0 || recoverLoading}
            onClick={() => handleRecover()}
          >
            恢复
          </Button>
          <Button
            danger
            disabled={selectedIds.length === 0 || deleteLoading}
            onClick={() => handleDelete()}
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
        scroll={{ y: 500 }}
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
      <div className={styled.footer}>
        <ListPage total={total} />
      </div>
    </div>
  );
};

export default Trash;
