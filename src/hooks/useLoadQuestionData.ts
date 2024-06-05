import { useRequest } from "ahooks";
import { useParams } from "react-router-dom";
import { getQuestionService } from "../services/question";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetComponents } from "../store/componentsReducer";

function useLoadQuestionData() {
  const { id = "" } = useParams();
  const dispatch = useDispatch();
  // ajax加载
  const { run, data, loading, error } = useRequest(
    async (id: string) => {
      if (!id) throw new Error("没有问卷");

      const data = await getQuestionService(id);
      return data;
    },
    {
      manual: true,
    },
  );

  // 根据获取的data设置redux store
  useEffect(() => {
    if (!data) {
      return;
    }
    const { title = "", compontList = [] } = data;
    console.log("title", title);
    let selectedId = "";

    if (compontList.length > 0) {
      selectedId = compontList[0].fe_id;
    }

    dispatch(
      resetComponents({
        compontList,
        selectedId,
      }),
    );
  }, [data]);

  // 根据id变化，执行ajax
  useEffect(() => {
    run(id);
  }, [id]);
  return { loading, error };
}
export default useLoadQuestionData;
