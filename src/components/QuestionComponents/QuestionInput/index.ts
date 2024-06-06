/**
 * @description 问卷 输入框
 * @author 曹志
 */
// 组件
import Component from "./Component";
import PropComponent from "./PropComponet";
// 默认属性
import { QuestionInputDefaultProps } from "./interface";
// 类型
export * from "./interface";
// Input 组件的配置
export default {
  title: "输入框",
  type: "questionInput", // 要和后端统一好
  Component, // 画布显示的组件
  PropComponent, // 修改属性组件
  defaultProps: QuestionInputDefaultProps,
};
