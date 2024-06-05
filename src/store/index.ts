import componentsReducer, { ComponentsStateType } from "./componentsReducer";
import userReducer, { UserStatrType } from "./userReducer";
import { configureStore } from "@reduxjs/toolkit";
export type StateType = {
  user: UserStatrType;
  components: ComponentsStateType;
};

export default configureStore({
  reducer: {
    user: userReducer,
    components: componentsReducer,
    // 分模块，扩展：问卷的信息
  },
});
