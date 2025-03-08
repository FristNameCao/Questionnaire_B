import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type UserStatrType = {
  username: string;
  nickname: string;
};

const INIT_STATE: UserStatrType = { username: "", nickname: "" };

export const userSlice = createSlice({
  name: "user",
  initialState: INIT_STATE,
  reducers: {
    loginReducer: (
      state: UserStatrType,
      action: PayloadAction<UserStatrType>,
    ) => {
      return action.payload;
    },
    logoutReducer: () => INIT_STATE,
  },
});

export const { loginReducer, logoutReducer } = userSlice.actions;
export default userSlice.reducer;
