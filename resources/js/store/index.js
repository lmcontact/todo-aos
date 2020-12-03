import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./registerSlice";
import loginReducer from "./loginSlice";
import userReducer from "./userSlice";
import createListReducer from "./createListSlice";
import indexListReducer from "./indexListSlice";
import notificationReducer from "./notificationSlice";

const store = configureStore({
    reducer: {
        register: registerReducer,
        login: loginReducer,
        user: userReducer,
        createList: createListReducer,
        indexList: indexListReducer,
        notification: notificationReducer
    }
});

export default store;
