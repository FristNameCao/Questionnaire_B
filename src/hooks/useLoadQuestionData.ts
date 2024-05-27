// import { useEffect, useState } from "react";
import { getQuestionService } from "../services/question";
import { useParams } from "react-router-dom";
import { useRequest } from "ahooks";

function useLoadQuestionData() {
  const { id = "" } = useParams();

  // const [questionData, setData] = useState({});
  // const [loading, setLoading] = useState(false);
  // async function getQuestionData() {
  //   setLoading(true);
  //   const res = await getQuestionService(id);
  //   console.log(res);
  //   setData(res);
  //   setLoading(false);
  // }

  // useEffect(() => {
  //   getQuestionData();
  // }, []);

  async function getQuestionData() {
    const data = await getQuestionService(id);
    console.log(data);
    return data;
  }

  const { loading, data, error } = useRequest(getQuestionData);

  return { loading, data, error };
}

export default useLoadQuestionData;
