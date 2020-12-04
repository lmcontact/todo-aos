import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./registerSlice";
import loginReducer from "./loginSlice";
import userReducer from "./userSlice";
import indexListReducer from "./indexListSlice";
import showListReducer from "./showListSlice";
import createListReducer from "./createListSlice";
import updateListReducer from "./updateListSlice";
import deleteListReducer from "./deleteListSlice";
import cleanListReducer from "./cleanTasksSlice";
import createTaskReducer from "./createTaskSlice";
import updateTaskReducer from "./updateTaskSlice";
import deleteTaskReducer from "./deleteTaskSlice";
import completeTaskReducer from "./completeTaskSlice";
import restoreTaskReducer from "./restoreTaskSlice";
import notificationReducer from "./notificationSlice";
import showCompletedReducer from "./showCompletedSlice";

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
        cleanList: cleanListReducer,
        createTask: createTaskReducer,
        updateTask: updateTaskReducer,
        deleteTask: deleteTaskReducer,
        completeTask: completeTaskReducer,
        restoreTask: restoreTaskReducer,
        notification: notificationReducer,
        showCompleted: showCompletedReducer
    }
});

export default store;
