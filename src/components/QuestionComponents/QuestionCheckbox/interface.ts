export type OptionType = {
  text: string;
  value: string;
  checked?: boolean;
};

export type QuestionCheckboxPropsType = {
  title?: string;
  isVertical?: boolean;
  list?: OptionType[];

  // 用于PropComponent
  onChange?: (newProps: QuestionCheckboxPropsType) => void;
  disable?: boolean;
};

export const QuestionCheckboxDefaultProps: QuestionCheckboxPropsType = {
  title: "多选标题",
  isVertical: false,
  list: [
    {
      text: "选项1",
      value: "1",
    },
    {
      text: "选项2",
      value: "2",
    },
    {
      text: "选项3",
      value: "3",
    },
  ],
};
