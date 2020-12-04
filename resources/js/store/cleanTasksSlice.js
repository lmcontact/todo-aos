import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { formatErrorMessage } from "./helpers";

const cleanTasksSlice = createSlice({
    name: "cleanTasks",
    initialState: {
        loading: false,
        error: null
    },
    reducers: {
        initCleanTasksRequest(state) {
            state.error = null;
            state.loading = true;
        },

        cleanTasksRequestSuccess(state) {
            state.loading = false;
        },

        cleanTasksRequestFailure(state, { payload }) {
            state.error = payload;
            state.loading = false;
        }
    }
});

export const cleanTasks = listId => async dispatch => {
    dispatch(initCleanTasksRequest());
    try {
        await axios.post("/api/tasks/clean");
        dispatch(cleanTasksRequestSuccess());
        dispatch(
            setNotification({
                type: "success",
                message: "Tâches supprimées avec succès."
            })
        );
        dispatch(showList(listId));
    } catch ({ response, request }) {
        const message = formatErrorMessage(response, request);
        dispatch(cleanTasksRequestFailure(message));
        dispatch(setNotification({ type: "error", message }));
    }
};

const { actions, reducer } = cleanTasksSlice;

export const {
    initCleanTasksRequest,
    cleanTasksRequestSuccess,
    cleanTasksRequestFailure
} = actions;

export default reducer;
