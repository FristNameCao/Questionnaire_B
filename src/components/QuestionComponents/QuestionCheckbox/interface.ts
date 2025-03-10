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
      checked: false,
    },
    {
      text: "选项2",
      value: "2",
      checked: false,
    },
    {
      text: "选项3",
      value: "3",
      checked: false,
    },
  ],
};

// stat统计组件

export type QuestionCheckboxStatPropsType = {
  stat: Array<{ name: string; count: number }>;
};
