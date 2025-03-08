/* eslint-disable react-hooks/exhaustive-deps */
import { Typography } from "antd";
import { FC, useEffect, useState } from "react";
import { getComponentStatService } from "../../../services/stat";
import { useRequest } from "ahooks";
import { useParams } from "react-router-dom";
import { getComponentConfByType } from "../../../components/QuestionComponents";

const { Title } = Typography;

type PropsType = {
  selectedComponentId: string;
  selectedComponentType: string;
};
const ChartStat: FC<PropsType> = (props: PropsType) => {
  const { selectedComponentId, selectedComponentType } = props;

  const { id = "" } = useParams();

  const [stat, setStat] = useState([]);
  const { run } = useRequest(
    async (questionId: string, selectedComponentId: string) => {
      const res = await getComponentStatService(
        questionId,
        selectedComponentId,
      );
      return res;
    },
    {
      manual: true,
      onSuccess(res) {
        setStat(res.stat);
        console.log("res", res);
      },
    },
  );

  function genStatElem() {
    if (!selectedComponentId) return <div>请选择组件</div>;
    const { StatComponent } =
      getComponentConfByType(selectedComponentType) || null;

    if (StatComponent == null) return <div>该组件无统计图表</div>;

    return <div>{<StatComponent stat={stat} />}</div>;
  }

  useEffect(() => {
    if (selectedComponentId) run(id, selectedComponentId);
  }, [id, selectedComponentId]);

  return (
    <>
      <Title level={3}>图表统计</Title>
      <div>{genStatElem()}</div>
    </>
  );
};

export default ChartStat;
