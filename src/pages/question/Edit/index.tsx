import { FC } from "react";
import useLoadQuestionData from "../../../hooks/useLoadQuestionData";
import styled from "./index.module.scss";
import EditCanvas from "./EditCanvas";
import { useDispatch } from "react-redux";
import { changeSelectedId } from "../../../store/componentsReducer";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import EditHeader from "./EditHeader";
import useGetPageInfo from "../../../hooks/useGetPageInfo";
import { useTitle } from "ahooks";

const Edit: FC = () => {
  const { loading } = useLoadQuestionData();
  const dispatch = useDispatch();

  // 修改标题
  const { title = "" } = useGetPageInfo();
  useTitle(`问卷编辑-${title}`);

  // 清除选中的组件
  function clearSelectedId() {
    dispatch(changeSelectedId(""));
  }

  return (
    <div className={styled.container}>
      <div style={{ background: "#FFFF", height: "40px" }}>
        <EditHeader />
      </div>
      <div className={styled["content-wrapper"]}>
        <div className={styled.content}>
          <div className={styled.left}>
            <LeftPanel />
          </div>
          <div className={styled.main} onClick={clearSelectedId}>
            <div className={styled["canvas-wrapper"]}>
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className={styled.right}>
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Edit;
