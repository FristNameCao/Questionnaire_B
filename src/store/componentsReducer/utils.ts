/**
 * 获取下一个selectedId
 * @param fe_id 当前的id
 * @param components 组件列表
 */

import { ComponentInfoType, ComponentsStateType } from ".";

export function getNextSelectedId(
  fe_id: string,
  components: ComponentInfoType[],
): string {
  // 获取可见的组件列表
  const visibleComponents = components.filter((c) => !c.isHidden);
  // 获取下一个组件的fe_id
  const index = visibleComponents.findIndex((c) => c.fe_id === fe_id);

  if (index < 0) return "";

  // 重新计算selectedId
  let newSelectedId = "";

  const length = visibleComponents.length;
  if (length <= 1) {
    // 组件长度就一个，被删除了，就没有组件
    newSelectedId = "";
  } else {
    // 组件长度大于1
    if (index + 1 === length) {
      // 要删除最后一个,就要选中上一个
      newSelectedId = visibleComponents[index - 1].fe_id;
    } else {
      newSelectedId = visibleComponents[index + 1].fe_id;
    }
  }
  return newSelectedId;
}

/**
 * 插入新组件
 * @param draft state draft
 * @param newComponent 新组件信息
 */

export function insterNweComponent(
  draft: ComponentsStateType,
  newComponent: ComponentInfoType,
) {
  // 点击main拿到main选中的组件
  const { selectedId, compontList } = draft;

  // 拿到main选中的组件下标
  const index = compontList.findIndex((item) => item.fe_id === selectedId);
  if (index < 0) {
    // main中未选中任何组件，就直接插入main最后面
    draft.compontList.push(newComponent);
  } else {
    // 选中了组件，就插入选中的main后面一个
    draft.compontList.splice(index + 1, 0, newComponent);
  }
  // 插入后，选中新插入的组件
  draft.selectedId = newComponent.fe_id;
}
