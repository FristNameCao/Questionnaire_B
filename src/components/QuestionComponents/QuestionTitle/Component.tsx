import { FC } from "react";
import {
  QuestionTitleProprsType,
  QuestionTitleDefaultProps,
} from "./interface";
import { Typography } from "antd";

const { Title } = Typography;
const QuestionTitle: FC<QuestionTitleProprsType> = (
  props: QuestionTitleProprsType,
) => {
  const {
    text = "",
    level = 1,
    isCenter = false,
  } = { ...QuestionTitleDefaultProps, ...props };

  const genFontSize = (level: number) => {
    switch (level) {
      case 1:
        return "24px";
      case 2:
        return "20px";
      case 3:
        return "16px";
    }
  };
  return (
    <Title
      level={level}
      style={{
        textAlign: isCenter ? "center" : "left",
        fontSize: genFontSize(level),
        marginBottom: "0",
      }}
    >
      {text}
    </Title>
  );
};
export default QuestionTitle;
