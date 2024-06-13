import { FC, useMemo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { STAT_COLORS } from "../../../constant";
import { QuestionRadioStatPropsType } from "./interface";

const StatComponent: FC<QuestionRadioStatPropsType> = ({ stat = [] }) => {
  const sum = useMemo(() => {
    let s = 0;
    stat.map((i) => (s += i.count));
    return s;
  }, [stat]);

  function format(n: number) {
    return (n * 100).toFixed(2);
  }

  return (
    <div style={{ width: 400, height: 400 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="count"
            isAnimationActive={false}
            data={stat}
            cx="50%" // x 轴的偏移
            cy="50%" // y 轴的偏移
            outerRadius={50} // 饼图的直径
            fill="pink" // 饼图颜色
            label={(i) => `${i.name}:${format(i.count / sum)}%`} // 饼图上的文字
          >
            {stat.map((i, index) => {
              return <Cell key={index} fill={STAT_COLORS[index]} />;
            })}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatComponent;
