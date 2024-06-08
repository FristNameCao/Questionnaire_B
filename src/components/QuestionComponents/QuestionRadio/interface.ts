export type OptionType = {
  value: string;
  text: string;
};

export type QuestionRadionPropsType = {
  title?: string;
  isVertical?: boolean;
  options?: OptionType[];
  value?: string;

  // 用于PropsComponent
  onChange?: (newProps: QuestionRadionPropsType) => void;
  disable?: boolean;
};

export const QuestionRadionDefaultProps: QuestionRadionPropsType = {
  title: "单选标题",
  isVertical: false,
  options: [
    {
      value: "选项1",
      text: "选项1",
    },
    {
      value: "选项2",
      text: "选项2",
    },
    {
      value: "选项3",
      text: "选项3",
    },
  ],
  value: "",
};
