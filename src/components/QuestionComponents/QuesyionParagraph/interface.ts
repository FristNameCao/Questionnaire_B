export type QuestionParagraphPropsType = {
  text?: string;
  isCenter?: boolean;

  // 用于PropComponent
  onChange?: (newProps: QuestionParagraphPropsType) => void;
  disable?: boolean;
};

export const QuestionParagraphDefaultProps: QuestionParagraphPropsType = {
  text: "段落",
  isCenter: false,
};
