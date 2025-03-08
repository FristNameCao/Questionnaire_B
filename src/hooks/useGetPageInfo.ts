import { useSelector } from "react-redux";
import type { StateType } from "../store";

function useGetPageInfo() {
  const pageInfo = useSelector((state: StateType) => state.pageInfo);
  return pageInfo;
}

export default useGetPageInfo;
