import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ComponentPropsType } from "../../components/QuestionComponents";
import { produce } from "immer";
import { getNextSelectedId } from "./utils";

export type ComponentInfoType = {
  fe_id: string;
  type: string;
  title: string;
  props: ComponentPropsType;
};

export type ComponentsStateType = {
  selectedId: string;
  compontList: Array<ComponentInfoType>;
};

const INIT_STATE: ComponentsStateType = {
  selectedId: "",
  compontList: [],
  // 其他扩展
};

export const componentsSlice = createSlice({
  name: "components",
  initialState: INIT_STATE,
  reducers: {
    // 重置所有组件
    resetComponents: (
      state: ComponentsStateType,
      action: PayloadAction<ComponentsStateType>,
    ) => {
      return action.payload;
    },
    // 修改selectedId
    changeSelectedId: produce(
      // 改变不可变数据的写法
      (draft: ComponentsStateType, action: PayloadAction<string>) => {
        draft.selectedId = action.payload;
      },
    ),
    // 添加新的组件
    addComponent: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<ComponentInfoType>,
      ) => {
        // 新点击left拿到的组件
        const newComponent = action.payload;
        // 点击main拿到main选中的组件
        const { selectedId, compontList } = draft;

        // 拿到main选中的组件下标
        const index = compontList.findIndex(
          (item) => item.fe_id === selectedId,
        );
        if (index < 0) {
          // main中未选中任何组件，就直接插入main最后面
          draft.compontList.push(newComponent);
        } else {
          // 选中了组件，就插入选中的main后面一个
          draft.compontList.splice(index + 1, 0, newComponent);
        }
        // 插入后，选中新插入的组件
        draft.selectedId = newComponent.fe_id;
      },
    ),
    // 修改组件属性
    changeComponentProps: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>,
      ) => {
        const { fe_id, newProps } = action.payload;

        // 当前要修改属性的这个组件
        const curComp = draft.compontList.find((item) => item.fe_id === fe_id);
        if (curComp) {
          // 给组件的props属性，赋值新的属性
          curComp.props = {
            ...curComp.props,
            ...newProps,
          };
        }
      },
    ),
    // 删除组件
    removeSelectedComponent: produce((draft: ComponentsStateType) => {
      const { selectedId: removeId, compontList = [] } = draft;

      //重新计算 selectedId
      const newSelectedId = getNextSelectedId(removeId, compontList);
      draft.selectedId = newSelectedId;

      // 拿到main选中的组件下标
      const index = compontList.findIndex((item) => item.fe_id === removeId);
      if (index >= 0) {
        // 删除选中的组件
        draft.compontList.splice(index, 1);
      }
    }),
  },
});

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
} = componentsSlice.actions;
export default componentsSlice.reducer;
