import { FC } from "react";
import { Outlet } from "react-router-dom";

const QuestionLayout: FC = () => {
  return (
    <>
      <p>QuestionLayout header</p>
      <div>
        <Outlet />
      </div>
    </>
  );
};
export default QuestionLayout;
