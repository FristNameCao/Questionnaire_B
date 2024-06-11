import componentsReducer, { ComponentsStateType } from "./componentsReducer";
import pageInfoReducer, { PageInfoType } from "./pageInfoReducer";
import userReducer, { UserStatrType } from "./userReducer";
import { configureStore } from "@reduxjs/toolkit";
export type StateType = {
  user: UserStatrType;
  components: ComponentsStateType;
  pageInfo: PageInfoType;
};

export default configureStore({
  reducer: {
    user: userReducer,
    components: componentsReducer,
    // 页面信息
    pageInfo: pageInfoReducer,
    // 分模块，扩展：问卷的信息
  },
});
