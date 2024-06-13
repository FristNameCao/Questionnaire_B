import { FC, useState } from "react";
import useLoadQuestionData from "../../../hooks/useLoadQuestionData";
import { Button, Result } from "antd";
import useGetPageInfo from "../../../hooks/useGetPageInfo";
import { useNavigate } from "react-router-dom";
import { useTitle } from "ahooks";
import styled from "./index.module.scss";
import StatHeader from "./StatHeader";
import ComponentList from "./ComponentList";
import PageStat from "./PageStat";
import LoadingElem from "../../../components/Loading";

const Stat: FC = () => {
  const { loading } = useLoadQuestionData();
  const { isPublished, title } = useGetPageInfo();
  const nav = useNavigate();

  // 状态提升 selectedId type

  const [selectedComponentId, setSelectedComponentId] = useState("");
  const [selectedComponentType, setSelectedComponentType] = useState("");
  console.log("selectedComponentType", selectedComponentType);

  // 修改标题
  useTitle(`问卷统计-${title}`);

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
        <div className={styled.left}>
          <ComponentList
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
        <div className={styled.main}>
          <PageStat
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
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
        {loading && <LoadingElem />}
        <div className={styled.content}>{!loading && genConentElement()}</div>
      </div>
    </div>
  );
};
export default Stat;
