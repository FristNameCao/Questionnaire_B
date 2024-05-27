import { useSearchParams } from "react-router-dom";
import { getQuestionListService } from "../services/question";
import { useRequest } from "ahooks";
import { SearchOption } from "../types/list";

function useLoadQuestionListData(opt: Partial<SearchOption> = {}) {
  // const { isStar, isDeleted } = opt;
  const [searchParams] = useSearchParams();
  const { data, loading, error } = useRequest(
    async () => {
      const keyWord = searchParams.get("keyWord") || "";
      const data = await getQuestionListService({ keyWord, ...opt });
      return data;
    },
    {
      refreshDeps: [searchParams],
    },
  );
  return { data, loading, error };
}

export default useLoadQuestionListData;
