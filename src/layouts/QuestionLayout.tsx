import { FC } from "react";
import { Outlet } from "react-router-dom";
import useLoadUserData from "../hooks/useLoadUserData";
import useNavPage from "../hooks/useNavPage";
import LoadingElem from "../components/Loading";

const QuestionLayout: FC = () => {
  const { waitingUserData } = useLoadUserData();
  useNavPage(waitingUserData);
  return <>{waitingUserData ? <LoadingElem /> : <Outlet />}</>;
};
export default QuestionLayout;
