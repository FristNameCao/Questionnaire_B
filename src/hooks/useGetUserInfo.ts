import { useSelector } from "react-redux";
import { StateType } from "../store";
import { UserStatrType } from "../store/userReducer";

function useGetUserInfo() {
  const { username, nickname } = useSelector<StateType>(
    (state) => state.user,
  ) as UserStatrType;

  return { username, nickname };
}

export default useGetUserInfo;
