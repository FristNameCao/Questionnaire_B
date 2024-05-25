import { FC } from "react";
import useLoadQuestionData from "../../../hooks/useLoadQuestionData";

const Edit: FC = () => {
  const { loading, questionData } = useLoadQuestionData();

  return (
    <div>
      <h1>Edit</h1>
      {loading ? <p>加载中</p> : <p>问卷id：{JSON.stringify(questionData)}</p>}
    </div>
  );
};
export default Edit;
