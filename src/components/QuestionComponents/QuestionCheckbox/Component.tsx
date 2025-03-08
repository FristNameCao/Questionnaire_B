import { FC } from "react";
import {
  QuestionCheckboxPropsType,
  QuestionCheckboxDefaultProps,
} from "./interface";
import { Checkbox, Space, Typography } from "antd";

const QuestionInput: FC<QuestionCheckboxPropsType> = (
  props: QuestionCheckboxPropsType,
) => {
  const { Paragraph } = Typography;
  const {
    title,
    isVertical,
    list = [],
  } = {
    ...QuestionCheckboxDefaultProps,
    ...props,
  };
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Space direction={isVertical ? "vertical" : "horizontal"}>
        {list.map((opt) => {
          const { value, text, checked } = opt;
          return (
            <Checkbox key={value} value={value} checked={checked}>
              {text}
            </Checkbox>
          );
        })}
      </Space>
    </div>
  );
};

export default QuestionInput;
