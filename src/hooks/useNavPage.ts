import { useLocation, useNavigate } from "react-router-dom";
import useGetUserInfo from "./useGetUserInfo";
import { useEffect } from "react";
import {
  MANAGE_INDEX_PATHNAME,
  isLoginOrRegisterPage,
  isNoNeedUserInfoPage,
} from "../router";

function useNavPage(waitingUserData: boolean) {
  const { username } = useGetUserInfo();
  const { pathname } = useLocation();
  const nav = useNavigate();

  useEffect(() => {
    if (waitingUserData) return;
    // 已经登录了
    if (username) {
      if (isLoginOrRegisterPage(pathname)) {
        nav(MANAGE_INDEX_PATHNAME);
      }
      return;
    }

    // 未登录
    if (isNoNeedUserInfoPage(pathname)) {
      nav("/");
    }
  }, [waitingUserData, username, pathname]);

  return { username, pathname };
}

export default useNavPage;
