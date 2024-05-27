/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";
import { produce } from "immer";
import QuestionsCard from "../../components/QuestionsCard";
import { useTitle } from "ahooks";
import styled from "./common.module.scss";
import Header from "./components/Header";
import { QuestionList } from "../../types/list";
import { Spin } from "antd";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";
const List: FC = () => {
  useTitle("我的问卷");
  const [questionList, seQuestionList] = useState<QuestionList[]>([]);

  const { data, loading } = useLoadQuestionListData();

  const { total = 0 } = data || {};

  // 组件是一个函数（执行返回JSX片段），组件初次渲染执行这个函数
  // 任何stete更新，都会执行组建的更新（重新执行函数）
  useEffect(() => {
    seQuestionList(data?.list || []);
  }, [data]);

  function handleDelete(_id: string) {
    // const newQuestionList = questionList.filter((item) => item._id !== _id);
    // seQuestionList(newQuestionList);

    seQuestionList(
      produce((draft) => {
        draft.splice(
          draft.findIndex((item) => item._id === _id),
          1,
        );
      }),
    );
  }

  function handleAdd() {
    // seQuestionList(
    //   questionList.concat({
    //     _id: Date.now(),
    //     title: "问卷" + Date.now(),
    //     isPublished: false,
    //   }),
    // );

    // immer写法可以改变数据
    seQuestionList(
      produce((draft) => {
        draft.push({
          _id: Date.now().toString(),
          title: "问卷" + Date.now(),
          isPublished: false,
          isStar: false,
          createAt: "5月20日13:14",
          answerCount: 0,
          isDeleted: false,
        });
      }),
    );
  }

  function handlePublish(_id: string) {
    // const newQuestionList = questionList.map((item) => {
    //   if (item._id === _id) {
    //     return {
    //       ...item,
    //       isPublished: true,
    //     };
    //   }
    //   return item;
    // });
    // seQuestionList(newQuestionList);

    // immer写法
    seQuestionList(
      produce((draft) => {
        draft.find((item) => {
          if (item._id === _id) {
            item.isPublished = true;
          }
        });
      }),
    );
  }

  return (
    <>
      <Header title="我的问卷" />
      <div className={styled.content}>
        {loading && (
          <div style={{ textAlign: "center" }}>
            <Spin />
          </div>
        )}
        {!loading &&
          questionList?.length > 0 &&
          questionList?.map((item) => {
            const { _id } = item;
            return (
              <QuestionsCard
                key={_id}
                handleDelete={handleDelete}
                handlePublish={handlePublish}
                {...item}
              />
            );
          })}
        <button onClick={handleAdd}>添加问卷</button>
      </div>
      <div>{"分页:" + total}</div>
      <div className={styled.footer}>LoadMore... 上滑加载更多</div>
    </>
  );
};
export default List;
