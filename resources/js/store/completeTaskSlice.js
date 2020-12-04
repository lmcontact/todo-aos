import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { showList } from "./showListSlice";
import { setNotification } from "./notificationSlice";
import { formatErrorMessage } from "./helpers";

const completeTaskSlice = createSlice({
    name: "completeTask",
    initialState: {
        loading: false,
        error: null
    },
    reducers: {
        initCompleteTaskRequest(state) {
            state.error = null;
            state.loading = false;
        },

        completeTaskRequestSuccess(state) {
            state.loading = false;
        },

        completeTaskRequestFailure(state, { payload }) {
            state.error = payload;
            state.loading = false;
        }
    }
});

export const completeTask = (listId, taskId) => async dispatch => {
    dispatch(initCompleteTaskRequest());
    try {
        await axios.post(`/api/tasks/${taskId}/complete`);
        dispatch(completeTaskRequestSuccess());
        dispatch(showList(listId));
    } catch ({ response, request }) {
        if (response && response.status === 404) {
            const message = "La tâche n'existe pas.";
            dispatch(completeTaskRequestFailure(message));
            dispatch(setNotification({ type: "error", message }));
        } else {
            const message = formatErrorMessage(response, request);
            dispatch(completeTaskRequestFailure(message));
            dispatch(setNotification({ type: "error", message }));
        }
    }
};

const { actions, reducer } = completeTaskSlice;

export const {
    initCompleteTaskRequest,
    completeTaskRequestSuccess,
    completeTaskRequestFailure
} = actions;

export default reducer;
