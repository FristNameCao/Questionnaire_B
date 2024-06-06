/**
 * @description 问卷 标题组件
 * @author 曹志
 */
// 导入组件
import Component from "./Component";
import PropComponent from "./PropComponent";
// 导入组件默认属性
import { QuestionTitleDefaultProps } from "./interface";

// 导出组件类型
export * from "./interface";
// 导出组件
export default {
  title: "标题",
  type: "questionTitle", // 要和后端统一好
  Component, // 画布组件
  PropComponent, // 修改属性组件
  defaultProps: QuestionTitleDefaultProps,
};
