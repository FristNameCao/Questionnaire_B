import { FC } from "react";
import {
  QuestionTextareaPropsType,
  QuestionTextareaDefaultProps,
} from "./interface";
import { Input, Typography } from "antd";

const QuestionInput: FC<QuestionTextareaPropsType> = (
  props: QuestionTextareaPropsType,
) => {
  const { Paragraph } = Typography;
  const { title, placeholder } = { ...QuestionTextareaDefaultProps, ...props };
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Input.TextArea placeholder={placeholder} />
      </div>
    </div>
  );
};

export default QuestionInput;
