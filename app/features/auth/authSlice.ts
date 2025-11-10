import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = any;

type AuthState = {
  token: string | null;
  user: User | null;
};

const initialState: AuthState = {
  token: typeof window !== "undefined" ? sessionStorage.getItem("token") : null,
  user:
    typeof window !== "undefined" && sessionStorage.getItem("user")
      ? JSON.parse(sessionStorage.getItem("user")!)
      : null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      sessionStorage.setItem("token", action.payload.token);
      sessionStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    clearAuth: (state) => {
      state.token = null;
      state.user = null;
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
    },
  },
});

export const { setCredentials, clearAuth } = slice.actions;
export default slice.reducer;
