import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name: "isLoggin",
    initialState: {
        isLoggin: localStorage.getItem("isLoggin") || false
    },
    reducers: {
        loggin: (state) => {
            state.isLoggin = true;
            localStorage.setItem("isLoggin", "true");
        },
        logout: (state) => {
            state.isLoggin = false;
            localStorage.removeItem("isLoggin");
            localStorage.removeItem("token");
        },
    },
});

export const { loggin, logout } = loginSlice.actions;

export default loginSlice.reducer;
