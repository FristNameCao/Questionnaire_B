import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type PageInfoType = {
  id?: string;
  title?: string;
  desc?: string;
  js?: string;
  css?: string;
};

const INIT_STATE: PageInfoType = {
  id: "",
  title: "",
  desc: "",
  js: "",
  css: "",
};

const pageInfoSlice = createSlice({
  name: "pageInfo",
  initialState: INIT_STATE,
  reducers: {
    resetPageInfo(state, action: PayloadAction<PageInfoType>) {
      return action.payload;
    },
    // 修改标题
    changePageTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
  },
});

export const { resetPageInfo, changePageTitle } = pageInfoSlice.actions;

export default pageInfoSlice.reducer;
