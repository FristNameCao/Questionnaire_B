import { FC } from "react";
import useLoadQuestionData from "../../../hooks/useLoadQuestionData";
import { Button, Result, Spin } from "antd";
import useGetPageInfo from "../../../hooks/useGetPageInfo";
import { useNavigate } from "react-router-dom";
import { useTitle } from "ahooks";
import styled from "./index.module.scss";
import StatHeader from "./StatHeader";

const Stat: FC = () => {
  const { loading } = useLoadQuestionData();
  const { isPublished, title } = useGetPageInfo();
  const nav = useNavigate();

  // 修改标题
  useTitle(`问卷统计-${title}`);

  // loading 效果
  const LoadingElem = (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <Spin />
    </div>
  );

  // content Element
  function genConentElement() {
    if (typeof isPublished === "boolean" && !isPublished) {
      return (
        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <Result
            status="warning"
            title="该问卷未发布，无法查看统计结果"
            style={{ width: "500px", margin: "0 auto" }}
            extra={
              <Button type="primary" onClick={() => nav(-1)}>
                返回我的问卷
              </Button>
            }
          />
        </div>
      );
    }

    return (
      <>
        <div className={styled.left}>左侧</div>
        <div className={styled.main}>中</div>
        <div className={styled.right}>右侧</div>
      </>
    );
  }

  return (
    <div className={styled.container}>
      <div>
        <StatHeader />
      </div>
      <div className={styled["content-wrapper"]}>
        <div className={styled.content}>
          {loading && LoadingElem}
          {!loading && genConentElement()}
        </div>
      </div>
    </div>
  );
};
export default Stat;
