import { useKeyPress } from "ahooks";
import { useDispatch } from "react-redux";
import {
  copySelectedComponent,
  pasteCopiedComponent,
  removeSelectedComponent,
  selectNextComponent,
  selectPrevComponent,
} from "../store/componentsReducer";
import { ActionCreators as UnActionCreator } from "redux-undo";

/**
 *
 * @returns 判断activeEm是否合法
 */
function isActiveElementValid() {
  const activeEm = document.activeElement;

  // 没有增加dnd-kit 之前
  // if (activeEm == document.body) return true; // 光标没有focus在输入框上

  //增加了dnd-kit以后
  if (activeEm == document.body) return true;
  if (activeEm?.matches("div[role='button']")) return true;
}
function useBindCanvasKeyPress() {
  const dispatch = useDispatch();
  // 删除组件
  useKeyPress(["backspace", "delete"], () => {
    if (!isActiveElementValid()) return;
    dispatch(removeSelectedComponent());
  });

  // 复制组件
  useKeyPress(["ctrl.c", "meta.c"], () => {
    if (!isActiveElementValid()) return;
    dispatch(copySelectedComponent());
  });

  // 粘贴组件
  useKeyPress(["ctrl.v", "meta.v"], () => {
    if (!isActiveElementValid()) return;
    dispatch(pasteCopiedComponent());
  });

  // 选中上一个组件
  useKeyPress(["uparrow"], () => {
    if (!isActiveElementValid()) return;
    dispatch(selectPrevComponent());
  });

  // 选中下一个组件
  useKeyPress(["downarrow"], () => {
    if (!isActiveElementValid()) return;
    dispatch(selectNextComponent());
  });

  // 撤销
  useKeyPress(
    ["ctrl.z", "meta.z"],
    () => {
      if (!isActiveElementValid()) return;
      dispatch(UnActionCreator.undo());
    },
    {
      exactMatch: true, // 严格匹配
    },
  );

  // 重做
  useKeyPress(
    ["ctrl.shift.z", "meta.shift.z"],
    () => {
      if (!isActiveElementValid()) return;
      dispatch(UnActionCreator.redo());
    },
    {
      exactMatch: true, // 严格匹配
    },
  );
}
export default useBindCanvasKeyPress;
