import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../../interfaces/auth"

const initialState: AuthState = {
  token: localStorage.getItem("token") || "",
  expiresAt: new Date(localStorage.getItem("expireTime")!) || null,
  user: JSON.parse(localStorage.getItem("user")!) || undefined,
}

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setLoggingData: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token;
      state.expiresAt = action.payload.expiresAt;
      state.user = action.payload.user;
      if (action.payload) {
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("expireTime", action.payload.expiresAt ? action.payload.expiresAt.toString() : "");
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("expireTime");
        localStorage.removeItem("user");
      }
    },
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("expireTime");
      localStorage.removeItem("user");
      state.token = "";
      state.expiresAt = null;
      state.user = undefined;
    },
  },
});

export const { setLoggingData, logout } = authSlice.actions;
export default authSlice.reducer;
