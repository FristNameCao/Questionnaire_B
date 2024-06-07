import { FC } from "react";
import { QuestionDefaultPropsType, QuestionInfoPropsType } from "./interface";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;
const Component: FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {
  const { title, desc } = {
    ...QuestionDefaultPropsType,
    ...props,
  };

  const destList = desc?.split("\n");
  return (
    <div style={{ textAlign: "center" }}>
      <Title style={{ fontSize: "24px" }}>{title}</Title>
      <Paragraph>
        {destList?.map((item, index) => {
          return (
            <span key={index}>
              {index > 0 && <br />}
              {item}
            </span>
          );
        })}
      </Paragraph>
    </div>
  );
};

export default Component;
