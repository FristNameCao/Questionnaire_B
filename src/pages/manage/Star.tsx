import { FC, useState } from "react";
import Header from "./components/Header";
import styled from "./common.module.scss";
import { Empty } from "antd";
import QuestionsCard from "../../components/QuestionsCard";
import { useTitle } from "ahooks";
const Star: FC = () => {
  useTitle("星标问卷");
  const [questionList] = useState([
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
  return (
    <div>
      <Header title="星标问卷" />
      <div className={styled.content}>
        {questionList.length === 0 ? (
          <Empty description={"暂无星标问卷"} />
        ) : (
          questionList.map((item) => {
            const { _id, isStart } = item;
            return isStart && <QuestionsCard key={_id} {...item} />;
          })
        )}
      </div>
      <div>分页</div>
    </div>
  );
};
export default Star;
