import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./registerSlice";
import loginReducer from "./loginSlice";
import notificationReducer from "./notificationSlice";

const store = configureStore({
    reducer: {
        register: registerReducer,
        login: loginReducer,
        notification: notificationReducer
    }
});

export default store;
