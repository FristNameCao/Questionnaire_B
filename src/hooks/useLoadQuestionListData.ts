import { useSearchParams } from "react-router-dom";
import { getQuestionListService } from "../services/question";
import { useRequest } from "ahooks";
import { SearchOption } from "../types/list";
import {
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_DEFAULT,
  LIST_PAGE_SIZE_PARAM_KEY,
} from "../constant";

function useLoadQuestionListData(opt: Partial<SearchOption> = {}) {
  // const { isStar, isDeleted } = opt;
  const [searchParams] = useSearchParams();

  const { data, loading, error, refresh } = useRequest(
    async () => {
      const keyWord = searchParams.get("keyWord") || "";
      const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || "") || 1;
      const pageSize =
        parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || "") ||
        LIST_PAGE_SIZE_DEFAULT;
      const data = await getQuestionListService({
        keyWord,
        ...opt,
        page,
        pageSize,
      });
      return data;
    },
    {
      refreshDeps: [searchParams],
    },
  );
  return { data, loading, error, refresh };
}

export default useLoadQuestionListData;
