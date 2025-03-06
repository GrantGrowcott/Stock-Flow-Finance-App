// store/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isLoggedIn: boolean;
  authPage: string;
}

const initialState: UserState = {
  isLoggedIn: false,
  authPage: "login"
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoginState: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setAuthPage: (state, action: PayloadAction<string>) => {
      state.authPage = action.payload;
    },
  },
});

export const { setLoginState, setAuthPage } = userSlice.actions;

export default userSlice.reducer;
