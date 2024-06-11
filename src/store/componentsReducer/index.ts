import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";
import { ComponentPropsType } from "../../components/QuestionComponents";
import { produce } from "immer";
import { getNextSelectedId, insterNweComponent } from "./utils";
import cloneDeep from "lodash.clonedeep";
import { arrayMove } from "@dnd-kit/sortable";
export type ComponentInfoType = {
  fe_id: string;
  type: string;
  title: string;
  isHidden?: boolean;
  isLocked?: boolean;
  props: ComponentPropsType;
};

export type ComponentsStateType = {
  selectedId: string;
  compontList: Array<ComponentInfoType>;
  copiedComponent: ComponentInfoType | null;
};

const INIT_STATE: ComponentsStateType = {
  selectedId: "",
  compontList: [],
  copiedComponent: null,
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
        // 选中哪个就把哪个id传过来
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

        insterNweComponent(draft, newComponent);
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
    // 隐藏/显示 组件
    ChangeComponetnHidden: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ fe_id: string; isHidden: boolean }>,
      ) => {
        const { fe_id, isHidden } = action.payload;
        const { compontList = [] } = draft;
        let newSelectedId = "";
        //重新计算 selectedId
        if (isHidden) {
          // 要隐藏
          newSelectedId = getNextSelectedId(fe_id, compontList);
          draft.selectedId = newSelectedId;
        } else {
          // 要显示
          newSelectedId = fe_id;
        }

        draft.selectedId = newSelectedId;

        const curComp = compontList.find((item) => item.fe_id === fe_id);
        if (curComp) {
          curComp.isHidden = isHidden;
        }
      },
    ),

    // 锁定/解锁 组件
    toggleComponentLocked: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ fe_id: string }>,
      ) => {
        const { fe_id } = action.payload;
        const { compontList = [] } = draft;
        const curComp = compontList.find((item) => item.fe_id === fe_id);
        if (curComp) {
          curComp.isLocked = !curComp.isLocked;
        }
      },
    ),
    // 复制当前选中的组件
    copySelectedComponent: produce((draft: ComponentsStateType) => {
      const { selectedId, compontList = [] } = draft;
      const selectedComponent = compontList.find(
        (item) => item.fe_id === selectedId,
      );
      if (selectedComponent == null) return;
      draft.copiedComponent = cloneDeep(selectedComponent); // 深拷贝
    }),
    // 粘贴组件
    pasteCopiedComponent: produce((draft: ComponentsStateType) => {
      const { copiedComponent } = draft;
      if (copiedComponent == null) return;
      // 要把fe_id修改了
      copiedComponent.fe_id = nanoid();
      insterNweComponent(draft, copiedComponent);
    }),

    // 选中上一个
    selectPrevComponent: produce((draft: ComponentsStateType) => {
      const { selectedId, compontList = [] } = draft;
      const selectedIndex = compontList.findIndex(
        (item) => item.fe_id === selectedId,
      );
      if (selectedIndex < 0) return; //未选择组件
      if (selectedIndex <= 0) return; //已经选中了第一个组件，无法往上选中
      draft.selectedId = compontList[selectedIndex - 1].fe_id;
    }),
    // 选中下一个
    selectNextComponent: produce((draft: ComponentsStateType) => {
      const { selectedId, compontList = [] } = draft;
      const selectedIndex = compontList.findIndex(
        (item) => item.fe_id === selectedId,
      );
      if (selectedIndex < 0) return; //未选择组件
      if (selectedIndex + 1 === compontList.length) return; //已经选中了最后一个组件，无法往下选中
      draft.selectedId = compontList[selectedIndex + 1].fe_id;
    }),
    // 修改组件标题
    changeComponentTitle: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ fe_id: string; title: string }>,
      ) => {
        const { fe_id, title } = action.payload;
        const curComp = draft.compontList.find((item) => item.fe_id === fe_id);
        if (curComp) {
          curComp.title = title;
        }
      },
    ),

    // 移动组件位置
    moveComponent: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{
          oldIndex: number;
          newIndex: number;
        }>,
      ) => {
        const { compontList: CurCompoinentList } = draft;
        const { oldIndex, newIndex } = action.payload;
        draft.compontList = arrayMove(CurCompoinentList, oldIndex, newIndex);
      },
    ),
  },
});

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  ChangeComponetnHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent,
  changeComponentTitle,
  moveComponent,
} = componentsSlice.actions;
export default componentsSlice.reducer;
