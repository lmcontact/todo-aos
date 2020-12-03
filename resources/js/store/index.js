import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./registerSlice";
import loginReducer from "./loginSlice";
import userReducer from "./userSlice";
import indexListReducer from "./indexListSlice";
import createListReducer from "./createListSlice";
import updateListReducer from "./updateListSlice";
import deleteListReducer from "./deleteListSlice";
import notificationReducer from "./notificationSlice";

const store = configureStore({
    reducer: {
        register: registerReducer,
        login: loginReducer,
        user: userReducer,
        indexList: indexListReducer,
        createList: createListReducer,
        updateList: updateListReducer,
        deleteList: deleteListReducer,
        notification: notificationReducer
    }
});

export default store;
