import { configureStore } from "@reduxjs/toolkit";
import isLoggin from "./slices/auth";

const store = configureStore({
    reducer: {
        isLoggin: isLoggin
    },
});

export default store;
