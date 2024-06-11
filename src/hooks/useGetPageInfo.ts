import { useSelector } from "react-redux";
import type { StateType } from "../store";

function useGetPageIndo() {
  const pageInfo = useSelector((state: StateType) => state.pageInfo);
  return pageInfo;
}

export default useGetPageIndo;
