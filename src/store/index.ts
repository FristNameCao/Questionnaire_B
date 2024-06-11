import undoable, { StateWithHistory, excludeAction } from "redux-undo";
import componentsReducer, { ComponentsStateType } from "./componentsReducer";
import pageInfoReducer, { PageInfoType } from "./pageInfoReducer";
import userReducer, { UserStatrType } from "./userReducer";
import { configureStore } from "@reduxjs/toolkit";
export type StateType = {
  user: UserStatrType;
  // components: ComponentsStateType;
  components: StateWithHistory<ComponentsStateType>; // 增加了undo
  pageInfo: PageInfoType;
};

export default configureStore({
  reducer: {
    user: userReducer,

    // 没有undo
    // components: componentsReducer,

    // 增加了 undo
    components: undoable(componentsReducer, {
      limit: 20, //限制undo 20步
      filter: excludeAction([
        "components/resetComponents",
        "components/changeSelectedId",
        "components/selectNextComponent",
        "components/selectPrevComponent",
      ]), //排除resetComponents,changeSelectedId,selectNextComponentselectPrevComponent不需要撤销功能
    }),

    // 页面信息
    pageInfo: pageInfoReducer,
    // 分模块，扩展：问卷的信息
  },
});
