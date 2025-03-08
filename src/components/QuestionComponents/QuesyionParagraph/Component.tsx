import { FC } from "react";
import {
  QuestionParagraphDefaultProps,
  QuestionParagraphPropsType,
} from "./interface";
import { Typography } from "antd";

const { Paragraph } = Typography;
const Component: FC<QuestionParagraphPropsType> = (
  props: QuestionParagraphPropsType,
) => {
  const { text = "", isCenter = false } = {
    ...QuestionParagraphDefaultProps,
    ...props,
  };
  const textList = text.split("\n");
  return (
    <Paragraph style={{ textAlign: isCenter ? "center" : "start" }}>
      {textList.map((item, index) => {
        return (
          <span key={index}>
            {index > 0 && <br />}
            {item}
          </span>
        );
      })}
    </Paragraph>
  );
};
export default Component;
