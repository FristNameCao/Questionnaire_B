import { useSelector } from "react-redux";
import { StateType } from "../store";
import { ComponentsStateType } from "../store/componentsReducer";

function useGetComponentInfo() {
  // 通过useSelector获取redux中其他地方初始化好的组件列表（初始化都是后台传的）
  // const components = useSelector<StateType>(
  //   (state) => state.components,
  // ) as ComponentsStateType;

  //加了undo
  const components = useSelector<StateType>(
    (state) => state.components.present,
  ) as ComponentsStateType;
  // 解构后台传过来的数据
  const { compontList, selectedId, copiedComponent } = components;

  // 找到选中的组件
  const selectedComponent = compontList.find((c) => c.fe_id === selectedId);

  return { compontList, selectedId, selectedComponent, copiedComponent };
}

export default useGetComponentInfo;
