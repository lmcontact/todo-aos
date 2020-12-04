import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { formatErrorMessage } from "./helpers";
import { setNotification } from "./notificationSlice";
import { showList } from "./showListSlice";

const deleteTaskSlice = createSlice({
    name: "deleteTask",
    initialState: {
        error: null,
        loading: false
    },
    reducers: {
        initDeleteTaskRequest(state) {
            state.error = null;
            state.loading = true;
        },

        deleteTaskRequestSuccess(state) {
            state.loading = false;
        },

        deleteTaskRequestFailure(state, { payload }) {
            state.error = payload;
            state.loading = false;
        }
    }
});

export const deleteTask = (listId, taskId) => async dispatch => {
    dispatch(initDeleteTaskRequest());
    try {
        await axios.delete(`/api/tasks/${taskId}`);
        dispatch(deleteTaskRequestSuccess());
        dispatch(
            setNotification({
                type: "success",
                message: "Tâche supprimée avec succès."
            })
        );
        dispatch(showList(listId));
    } catch ({ response, request }) {
        if (response && response.status === 404) {
            const message = "La tâche n'existe pas.";
            dispatch(deleteTaskRequestFailure(message));
            dispatch(setNotification({ type: "error", message }));
        } else {
            const message = formatErrorMessage(response, request);
            dispatch(deleteTaskRequestFailure(message));
            dispatch(setNotification({ type: "error", message }));
        }
    }
};

const { actions, reducer } = deleteTaskSlice;

export const {
    initDeleteTaskRequest,
    deleteTaskRequestSuccess,
    deleteTaskRequestFailure
} = actions;

export default reducer;
