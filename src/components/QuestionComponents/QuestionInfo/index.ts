/**
 * @description 问卷-段落
 * @author 曹志
 */

import Component from "./Component";
import PropComponent from "./PropComponent";

import { QuestionDefaultPropsType } from "./interface";

// 导出组件类型
export * from "./interface";

// 导出组件 QuestionInfoh配置
export default {
  title: "问卷信息",
  type: "questionInfo",
  Component,
  PropComponent,
  defaultProps: QuestionDefaultPropsType,
};
