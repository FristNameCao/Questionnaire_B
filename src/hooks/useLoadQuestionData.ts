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
      // 拿到后台的默认值展示画布
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
    // 赋值给前端初始化画布界面
    dispatch(
      resetComponents({
        compontList,
        selectedId,
        copiedComponent: null,
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
