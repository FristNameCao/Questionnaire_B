import { FC } from "react";
// QuestionInputConf 输入框的配置也就是一个组件和配置都在一起 QuestionInputPropsType 输入框的属性
import QuestionInputConf, { QuestionInputPropsType } from "./QuestionInput";
import QuestionTitletConf, { QuestionTitleProprsType } from "./QuestionTitle";
import QuestionParagraphConf, {
  QuestionParagraphPropsType,
} from "./QuesyionParagraph";
import QuestionInfoConf, { QuestionInfoPropsType } from "./QuestionInfo";
import QuestionTextareaConf, {
  QuestionTextareaPropsType,
} from "./QuestionTextarea";
import QuestionRadionConf, {
  QuestionRadionPropsType,
  QuestionRadioStatPropsType,
} from "./QuestionRadio";
import QuestionCheckboxConf, {
  QuestionCheckboxPropsType,
  QuestionCheckboxStatPropsType,
} from "./QuestionCheckbox";
// 组件的属性 proprs type
export type ComponentPropsType = QuestionInputPropsType &
  QuestionTitleProprsType &
  QuestionParagraphPropsType &
  QuestionInfoPropsType &
  QuestionTextareaPropsType &
  QuestionRadionPropsType &
  QuestionCheckboxPropsType;

// 各个组件统计属性类型
type QuestionStatPropsType = QuestionRadioStatPropsType &
  QuestionCheckboxStatPropsType;

// title组件的配置
export type ComponentConfType = {
  type: string;
  title: string;
  Component: FC<ComponentPropsType>;
  PropComponent: FC<ComponentPropsType>;
  defaultProps: ComponentPropsType;
  StatComponent?: FC<QuestionStatPropsType>;
};

// 全部组件的配置
const componentConfList: ComponentConfType[] = [
  QuestionTitletConf,
  QuestionInputConf,
  QuestionParagraphConf,
  QuestionInfoConf,
  QuestionTextareaConf,
  QuestionRadionConf,
  QuestionCheckboxConf,
];

// 组件分组
export const ComponentConfGroup = [
  {
    grounId: "textGroun",
    groupName: "文本显示",
    components: [QuestionInfoConf, QuestionTitletConf, QuestionParagraphConf],
  },
  {
    grounId: "inputGroun",
    groupName: "用户输入",
    components: [QuestionInputConf, QuestionTextareaConf],
  },
  {
    grounId: "chooseGrop",
    groupName: "用户选择",
    components: [QuestionRadionConf, QuestionCheckboxConf],
  },
];

export function getComponentConfByType(type: string): ComponentConfType {
  const result = componentConfList.find((c) => c.type === type);
  if (!result) {
    throw new Error(`Component  ${type} 没有`);
  }
  return result;
}
