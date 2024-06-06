/**
 * 获取下一个selectedId
 * @param fe_id 当前的id
 * @param components 组件列表
 */

import { ComponentInfoType } from ".";

export function getNextSelectedId(
  fe_id: string,
  components: ComponentInfoType[],
): string {
  // 获取下一个组件的fe_id
  const index = components.findIndex((c) => c.fe_id === fe_id);

  if (index < 0) return "";

  // 重新计算selectedId
  let newSelectedId = "";

  const length = components.length;
  if (length <= 1) {
    // 组件长度就一个，被删除了，就没有组件
    newSelectedId = "";
  } else {
    // 组件长度大于1
    if (index + 1 === length) {
      // 要删除最后一个,就要选中上一个
      newSelectedId = components[index - 1].fe_id;
    } else {
      newSelectedId = components[index + 1].fe_id;
    }
  }
  return newSelectedId;
}
