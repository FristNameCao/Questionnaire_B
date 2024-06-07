import { useKeyPress } from "ahooks";
import { useDispatch } from "react-redux";
import {
  copySelectedComponent,
  pasteCopiedComponent,
  removeSelectedComponent,
} from "../store/componentsReducer";

/**
 *
 * @returns 判断activeEm是否合法
 */
function isActiveElementValid() {
  const activeEm = document.activeElement;
  if (activeEm == document.body) return true; // 光标没有focus在输入框上
  return false;
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
}
export default useBindCanvasKeyPress;