import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setNotification } from "./notificationSlice";
import { formatErrorMessage } from "./helpers";

const showListSlice = createSlice({
    name: "showList",
    initialState: {
        id: "",
        name: "",
        tasks: [],
        error: null,
        loading: false
    },
    reducers: {
        initShowListRequest(state) {
            state.error = null;
            state.loading = true;
        },

        showListRequestSuccess(state, { payload }) {
            state.id = payload.id;
            state.name = payload.name;
            state.tasks = payload.tasks;
            state.loading = false;
        },

        showListRequestFailure(state, { payload }) {
            state.error = payload;
            state.loading = false;
        }
    }
});

export const showList = listId => async dispatch => {
    dispatch(initShowListRequest());
    try {
        const { data } = await axios.get(`/api/lists/${listId}`);
        dispatch(showListRequestSuccess(data.data));
    } catch ({ response, request }) {
        if (response && response.status === 404) {
            const message = "La liste n'existe pas.";
            dispatch(showListRequestFailure(message));
            dispatch(setNotification({ type: "error", message }));
        } else {
            const message = formatErrorMessage(response, request);
            dispatch(showListRequestFailure(message));
            dispatch(setNotification({ type: "error", message }));
        }
    }
};

const { actions, reducer } = showListSlice;

export const {
    initShowListRequest,
    showListRequestSuccess,
    showListRequestFailure
} = actions;

export default reducer;
