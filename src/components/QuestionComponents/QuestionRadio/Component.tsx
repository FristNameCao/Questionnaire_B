import { FC } from "react";
import {
  QuestionRadionPropsType,
  QuestionRadionDefaultProps,
} from "./interface";
import { Radio, Space, Typography } from "antd";

const QuestionInput: FC<QuestionRadionPropsType> = (
  props: QuestionRadionPropsType,
) => {
  const { Paragraph } = Typography;
  const {
    title,
    isVertical,
    options = [],
    value,
  } = {
    ...QuestionRadionDefaultProps,
    ...props,
  };
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Radio.Group value={value}>
          <Space direction={isVertical ? "vertical" : "horizontal"}>
            {options.map((opt) => {
              const { value, text } = opt;
              return (
                <Radio key={value} value={value}>
                  {text}
                </Radio>
              );
            })}
          </Space>
        </Radio.Group>
      </div>
    </div>
  );
};

export default QuestionInput;
