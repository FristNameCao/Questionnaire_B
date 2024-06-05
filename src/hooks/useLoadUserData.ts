import { useEffect, useState } from "react";
import useGetUserInfo from "./useGetUserInfo";
import { useRequest } from "ahooks";
import { getUserInfoService } from "../services/user";
import { useDispatch } from "react-redux";
import { loginReducer } from "../store/userReducer";

function useLoadUserData() {
  const [waitingUserData, setWaitingUserData] = useState(true);

  const dispatch = useDispatch();

  // 获取用户信息
  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(res) {
      const { nickname, username } = res;
      dispatch(loginReducer({ nickname, username })); // 存储到 redux store
    },
    onFinally() {
      setWaitingUserData(false);
    },
  });

  // 判断当前 redux store 是否已经存在
  const { username } = useGetUserInfo(); //redux store
  useEffect(() => {
    if (username) {
      setWaitingUserData(false); // 如果redux store存在，则不需要请求数据
      return;
    }
    run(); // 如果redux store不存在，则请求数据
  }, [username]);
  return { waitingUserData };
}

export default useLoadUserData;
