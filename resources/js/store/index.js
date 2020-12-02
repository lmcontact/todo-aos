import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./registerSlice";
import notificationReducer from "./notificationSlice";

const store = configureStore({
    reducer: {
        register: registerReducer,
        notification: notificationReducer
    }
});

export default store;
