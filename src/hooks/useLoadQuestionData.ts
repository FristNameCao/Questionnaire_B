import { useRequest } from "ahooks";
import { useParams } from "react-router-dom";
import { getQuestionService } from "../services/question";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetComponents } from "../store/componentsReducer";
import { resetPageInfo } from "../store/pageInfoReducer";

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
    const {
      title = "",
      desc = "",
      js = '"',
      css = "",
      compontList = [],
    } = data;
    console.log("title", title);
    let selectedId = "";

    if (compontList.length > 0) {
      selectedId = compontList[0].fe_id;
    }
    // 赋值给前端组件，初始化画布界面，就是把componentList赋值给Redux store中
    dispatch(
      resetComponents({
        compontList,
        selectedId,
        copiedComponent: null,
      }),
    );
    // 把pageInfo赋值给Redux store
    dispatch(resetPageInfo({ title, desc, js, css }));
  }, [data]);

  // 根据id变化，执行ajax
  useEffect(() => {
    run(id);
  }, [id]);
  return { loading, error };
}
export default useLoadQuestionData;
