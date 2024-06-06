import { FC } from "react";
// QuestionInputConf 输入框的配置也就是一个组件和配置都在一起 QuestionInputPropsType 输入框的属性
import QuestionInputConf, { QuestionInputPropsType } from "./QuestionInput";
import QuestionTitletConf, { QuestionTitleProprsType } from "./QuestionTitle";

// 组件的属性 proprs type
export type ComponentPropsType = QuestionInputPropsType &
  QuestionTitleProprsType;

// title组件的配置
export type ComponentConfType = {
  type: string;
  title: string;
  Component: FC<ComponentPropsType>;
  PropComponent: FC<ComponentPropsType>;
  defaultProps: ComponentPropsType;
};

// 全部组件的配置
const componentConfList: ComponentConfType[] = [
  QuestionTitletConf,
  QuestionInputConf,
];

// 组件分组
export const ComponentConfGroup = [
  {
    grounId: "textGroun",
    groupName: "文本显示",
    components: [QuestionTitletConf],
  },
  {
    grounId: "inputGroun",
    groupName: "用户输入",
    components: [QuestionInputConf],
  },
];

export function getComponentConfByType(type: string): ComponentConfType {
  const result = componentConfList.find((c) => c.type === type);
  if (!result) {
    throw new Error(`Component  ${type} 没有`);
  }
  return result;
}
