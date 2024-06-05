import { FC } from "react";
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
  defaultProps: ComponentPropsType;
};

// 全部组件的配置
const componentConfList: ComponentConfType[] = [
  QuestionInputConf,
  QuestionTitletConf,
];

export function getComponentConfByType(type: string): ComponentConfType {
  const result = componentConfList.find((c) => c.type === type);
  if (!result) {
    throw new Error(`Component  ${type} 没有`);
  }
  return result;
}
