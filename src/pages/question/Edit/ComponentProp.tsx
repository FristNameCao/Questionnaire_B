import { FC } from "react";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import {
  ComponentPropsType,
  getComponentConfByType,
} from "../../../components/QuestionComponents";
import { useDispatch } from "react-redux";
import { changeComponentProps } from "../../../store/componentsReducer";

const NoProp: FC = () => {
  return <div style={{ textAlign: "center" }}>请选择组件</div>;
};
const ComponentProp: FC = () => {
  const dispatch = useDispatch();
  // 拿到选中的返回的组件信息
  const { selectedComponent } = useGetComponentInfo();
  if (selectedComponent == null) return <NoProp />;
  const { type, props } = selectedComponent;

  // 拿到组件的配置信息
  const componentConf = getComponentConfByType(type);
  if (componentConf === null) return <NoProp />;
  const { PropComponent } = componentConf;

  // 修改组件的属性
  function changeProps(newProps: ComponentPropsType) {
    if (selectedComponent == null) return;
    const { fe_id } = selectedComponent;
    // 修改组件的属性
    dispatch(changeComponentProps({ fe_id, newProps }));
  }

  return <PropComponent {...props} onChange={changeProps} />;
};

export default ComponentProp;
