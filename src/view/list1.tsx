import { FC, useState } from "react";
import { produce } from "immer";
import QuestionsCard from "../components/QuestionsCard";
const List1: FC = () => {
  const [questionList, seQuestionList] = useState([
    {
      _id: 1,
      title: "问卷1",
      isPublished: true,
      isStart: true,
      date: "5月10日13:23",
    },
    {
      _id: 2,
      title: "问卷2",
      isPublished: false,
      isStart: true,
      date: "5月11日13:23",
    },
    {
      _id: 3,
      title: "问卷3",
      isPublished: true,
      isStart: false,
      date: "5月12日13:23",
    },
    {
      _id: 4,
      title: "问卷4",
      isPublished: false,
      isStart: true,
      date: "5月13日13:23",
    },
  ]);
  // 组件是一个函数（执行返回JSX片段），组件初次渲染执行这个函数
  // 任何stete更新，都会吃法组建的更新（重新执行函数）

  function handleDelete(id: number) {
    // const newQuestionList = questionList.filter((item) => item.id !== id);
    // seQuestionList(newQuestionList);

    seQuestionList(
      produce((draft) => {
        draft.splice(
          draft.findIndex((item) => item._id === id),
          1,
        );
      }),
    );
  }

  function handleAdd() {
    // seQuestionList(
    //   questionList.concat({
    //     id: Date.now(),
    //     title: "问卷" + Date.now(),
    //     isPublished: false,
    //   }),
    // );

    // immer写法可以改变数据
    seQuestionList(
      produce((draft) => {
        draft.push({
          _id: Date.now(),
          title: "问卷" + Date.now(),
          isPublished: false,
          isStart: true,
          date: "5月13日13:23",
        });
      }),
    );
  }

  function handlePublish(id: number) {
    // const newQuestionList = questionList.map((item) => {
    //   if (item.id === id) {
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
          if (item._id === id) {
            item.isPublished = true;
          }
        });
      }),
    );
  }

  return (
    <>
      <div style={{ height: "100%" }}>
        <h1>问卷列表</h1>
        {questionList.map((item) => {
          const { _id, isPublished } = item;
          return (
            <QuestionsCard
              key={_id}
              {...item}
              isPublished={isPublished}
              handleDelete={handleDelete}
              handlePublish={handlePublish}
            />
          );
        })}
        <button onClick={handleAdd}>添加问卷</button>
      </div>
    </>
  );
};
export default List1;
