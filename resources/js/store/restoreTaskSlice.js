import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { showList } from "./showListSlice";
import { setNotification } from "./notificationSlice";
import { formatErrorMessage } from "./helpers";

const restoreTaskSlice = createSlice({
    name: "restoreTask",
    initialState: {
        loading: false,
        error: null
    },
    reducers: {
        initRestoreTaskRequest(state) {
            state.error = null;
            state.loading = false;
        },

        restoreTaskRequestSuccess(state) {
            state.loading = false;
        },

        restoreTaskRequestFailure(state, { payload }) {
            state.error = payload;
            state.loading = false;
        }
    }
});

export const restoreTask = (listId, taskId) => async dispatch => {
    dispatch(initRestoreTaskRequest());
    try {
        await axios.post(`/api/tasks/${taskId}/restore`);
        dispatch(restoreTaskRequestSuccess());
        dispatch(
            setNotification({
                type: "success",
                message: "Tâche restaurée avec succès."
            })
        );
        dispatch(showList(listId));
    } catch ({ response, request }) {
        if (response && response.status === 404) {
            const message = "La tâche n'existe pas.";
            dispatch(restoreTaskRequestFailure(message));
            dispatch(setNotification({ type: "error", message }));
        } else {
            const message = formatErrorMessage(response, request);
            dispatch(restoreTaskRequestFailure(message));
            dispatch(setNotification({ type: "error", message }));
        }
    }
};

const { actions, reducer } = restoreTaskSlice;

export const {
    initRestoreTaskRequest,
    restoreTaskRequestSuccess,
    restoreTaskRequestFailure
} = actions;

export default reducer;
