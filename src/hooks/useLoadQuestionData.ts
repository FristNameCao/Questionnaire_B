import { useEffect, useState } from "react";
import { getQuestionService } from "../services/question";
import { useParams } from "react-router-dom";

function useLoadQuestionData() {
  const { id = "" } = useParams();

  const [questionData, setData] = useState({});
  const [loading, setLoading] = useState(false);
  async function getQuestionData() {
    setLoading(true);
    const res = await getQuestionService(id);
    console.log(res);
    setData(res);
    setLoading(false);
  }

  useEffect(() => {
    getQuestionData();
  }, []);

  return { loading, questionData };
}

export default useLoadQuestionData;
