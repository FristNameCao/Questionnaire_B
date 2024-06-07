export type QuestionInfoPropsType = {
  title?: string;
  desc?: string;
  // 用于 PropComponent
  onChange?: (newProps: QuestionInfoPropsType) => void;
  disable?: boolean;
};

export const QuestionDefaultPropsType: QuestionInfoPropsType = {
  title: "问卷标题",
  desc: "问卷描述",
};
