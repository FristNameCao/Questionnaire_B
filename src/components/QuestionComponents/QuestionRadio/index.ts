/**
 * @description 问卷 输入框
 * @author 曹志
 */
// 组件
import Component from "./Component";
import PropComponent from "./PropComponent";
import StatComponent from "./StatComponent";
// 默认属性
import { QuestionRadionDefaultProps } from "./interface";
// 类型
export * from "./interface";
// Radio 组件的配置
export default {
  title: "单选框",
  type: "questionRadio", // 要和后端统一好
  Component, // 画布显示的组件
  PropComponent, // 修改属性组件
  defaultProps: QuestionRadionDefaultProps,
  // 统计组件
  StatComponent: StatComponent,
};
