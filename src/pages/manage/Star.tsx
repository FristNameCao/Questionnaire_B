import { FC } from "react";
import Header from "./components/Header";
import styled from "./common.module.scss";
import { Empty } from "antd";
import QuestionsCard from "../../components/QuestionsCard";
import { useTitle } from "ahooks";
// import { getQuestionListService } from "../../services/question";
// import { QuestionList } from "../../types/list";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";
import ListPage from "../../components/ListPage";
import LoadingElem from "../../components/Loading";
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
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Header title="星标问卷" />
      <div
        className={styled.content}
        style={{ maxHeight: "calc(100vh - 152px - 158px)" }}
      >
        {loading && <LoadingElem />}
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
