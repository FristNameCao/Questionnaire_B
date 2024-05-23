import { FC, useState } from "react";
import { produce } from "immer";
import QuestionsCard from "../../components/QuestionsCard";
import { useSearchParams } from "react-router-dom";
import { useTitle } from "ahooks";
import styled from "./common.module.scss";
// import { Typography } from "antd";
import Header from "./components/Header";
const List: FC = () => {
  // const { Title } = Typography;
  const [searchParmas] = useSearchParams();
  console.log(searchParmas.get("name"));
  useTitle("我的问卷");
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
      isStart: false,
      date: "5月11日13:23",
    },
    {
      _id: 3,
      title: "问卷3",
      isPublished: true,
      isStart: true,
      date: "5月12日13:23",
    },
    {
      _id: 4,
      title: "问卷4",
      isPublished: false,
      isStart: false,
      date: "5月13日13:23",
    },
  ]);
  // 组件是一个函数（执行返回JSX片段），组件初次渲染执行这个函数
  // 任何stete更新，都会吃法组建的更新（重新执行函数）

  function handleDelete(_id: number) {
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
          _id: Date.now(),
          title: "问卷" + Date.now(),
          isPublished: false,
          isStart: false,
          date: "5月20日13:14",
        });
      }),
    );
  }

  function handlePublish(_id: number) {
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
        {questionList.length > 0 &&
          questionList.map((item) => {
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
      <div className={styled.footer}>LoadMore... 上滑加载更多</div>
    </>
  );
};
export default List;
