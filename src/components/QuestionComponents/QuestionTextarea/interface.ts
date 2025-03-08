export type QuestionTextareaPropsType = {
  title?: string;
  placeholder?: string;
  onChange?: (newProps: Partial<QuestionTextareaPropsType>) => void;
  disable?: boolean;
};

export const QuestionTextareaDefaultProps: QuestionTextareaPropsType = {
  title: "请输入标题",
  placeholder: "请输入",
};
