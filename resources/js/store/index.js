import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./registerSlice";
import loginReducer from "./loginSlice";
import userReducer from "./userSlice";
import indexListReducer from "./indexListSlice";
import showListReducer from "./showListSlice";
import createListReducer from "./createListSlice";
import updateListReducer from "./updateListSlice";
import deleteListReducer from "./deleteListSlice";
import createTaskReducer from "./createTaskSlice";
import updateTaskReducer from "./updateTaskSlice";
import deleteTaskReducer from "./deleteTaskSlice";
import completeTaskReducer from "./completeTaskSlice";
import notificationReducer from "./notificationSlice";

const store = configureStore({
    reducer: {
        register: registerReducer,
        login: loginReducer,
        user: userReducer,
        indexList: indexListReducer,
        showList: showListReducer,
        createList: createListReducer,
        updateList: updateListReducer,
        deleteList: deleteListReducer,
        createTask: createTaskReducer,
        updateTask: updateTaskReducer,
        deleteTask: deleteTaskReducer,
        completeTask: completeTaskReducer,
        notification: notificationReducer
    }
});

export default store;
