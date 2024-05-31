import { FC } from "react";
import Header from "./components/Header";
import styled from "./common.module.scss";
import { Empty, Spin } from "antd";
import QuestionsCard from "../../components/QuestionsCard";
import { useTitle } from "ahooks";
// import { getQuestionListService } from "../../services/question";
// import { QuestionList } from "../../types/list";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";
import ListPage from "../../components/ListPage";
const Star: FC = () => {
  useTitle("星标问卷");
  // const [questionList, seQuestionList] = useState<QuestionList[]>([]);

  // useEffect(() => {
  //   const getQuestionList = async () => {
  //     const data = await getQuestionListService();
  //     console.log(data);
  //     seQuestionList(data.list);
  //   };
  //   getQuestionList();
  // }, []);

  const { data, loading } = useLoadQuestionListData({ isStar: true });

  const { list = [], total = 0 } = data || {};
  return (
    <div>
      <Header title="星标问卷" />
      <div className={styled.content}>
        {loading && (
          <div style={{ textAlign: "center" }}>
            <Spin />
          </div>
        )}
        {!loading && list.length === 0 ? (
          <Empty description={"暂无星标问卷"} />
        ) : (
          list.map((item) => {
            const { _id, isStar } = item;
            return isStar && <QuestionsCard key={_id} {...item} />;
          })
        )}
      </div>
      <div className={styled.footer}>
        <ListPage total={total} />
      </div>
    </div>
  );
};
export default Star;
