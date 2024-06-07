import { useSelector } from "react-redux";
import { StateType } from "../store";
import { ComponentsStateType } from "../store/componentsReducer";

function useGetComponentInfo() {
  const components = useSelector<StateType>(
    (state) => state.components,
  ) as ComponentsStateType;
  const { compontList, selectedId, copiedComponent } = components;

  // 找到选中的组件
  const selectedComponent = compontList.find((c) => c.fe_id === selectedId);

  return { compontList, selectedId, selectedComponent, copiedComponent };
}

export default useGetComponentInfo;
