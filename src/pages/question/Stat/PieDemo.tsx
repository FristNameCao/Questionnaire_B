import { FC } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { STAT_COLORS } from "../../../constant";

const data01 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
  { name: "Group E", value: 278 },
  { name: "Group F", value: 189 },
];

const PieDemo: FC = () => {
  return (
    <div style={{ width: 400, height: 400 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data01}
            cx="50%" // x 轴的偏移
            cy="50%" // y 轴的偏移
            outerRadius={80} // 饼图的直径
            fill="pink" // 饼图颜色
            label={(i) => i.name} // 饼图上的文字
          >
            {data01.map((i, index) => {
              return <Cell key={index} fill={STAT_COLORS[index]} />;
            })}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieDemo;
