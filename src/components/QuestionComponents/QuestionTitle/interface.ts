export type QuestionTitleProprsType = {
  text?: string;
  level?: 1 | 2 | 3 | 4 | 5;
  isCenter?: boolean;
  onChange?: (newProps: Partial<QuestionTitleProprsType>) => void;
};

export const QuestionTitleDefaultProps: QuestionTitleProprsType = {
  text: "一行标题",
  level: 1,
  isCenter: false,
};

export type QuestionTitleStateType = {
  text: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  isCenter: boolean;
};
