/**
 * @description 问卷-段落
 * @author 曹志
 */

import Component from "./Component";
import PropComponent from "./PropComponent";

import { QuestionParagraphDefaultProps } from "./interface";

// 导出组件类型
export * from "./interface";

// 导出组件 Pargarph配置
export default {
  title: "段落",
  type: "questionParagraph",
  Component,
  PropComponent,
  defaultProps: QuestionParagraphDefaultProps,
};
