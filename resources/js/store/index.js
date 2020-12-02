import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./registerSlice";
import loginReducer from "./loginSlice";
import notificationReducer from "./notificationSlice";
import userReducer from "./userSlice";

const store = configureStore({
    reducer: {
        register: registerReducer,
        login: loginReducer,
        user: userReducer,
        notification: notificationReducer
    }
});

export default store;
