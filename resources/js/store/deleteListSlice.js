import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { indexList } from "./indexListSlice";
import { setNotification } from "./notificationSlice";
import { formatErrorMessage } from "./helpers";

const deleteListSlice = createSlice({
    name: "deleteSlice",
    initialState: {
        loading: false,
        error: null
    },
    reducers: {
        initDeleteListRequest(state) {
            state.error = null;
            state.loading = true;
        },

        deleteListRequestSuccess(state) {
            state.loading = false;
        },

        deleteListRequestFailure(state, { payload }) {
            state.error = payload;
            state.loading = false;
        }
    }
});

export const deleteList = listId => async dispatch => {
    dispatch(initDeleteListRequest());
    try {
        await axios.delete(`/api/lists/${listId}`);
        dispatch(deleteListRequestSuccess());
        dispatch(indexList());
    } catch ({ response, request }) {
        if (response.status === 404) {
            const { message } = "La liste n'existe pas.";
            dispatch(deleteListRequestFailure(message));
            dispatch(setNotification({ type: "error", message }));
        } else {
            const message = formatErrorMessage(response, request);
            dispatch(deleteListRequestFailure(message));
            dispatch(setNotification({ type: "error", message }));
        }
    }
};

const { actions, reducer } = deleteListSlice;

export const {
    initDeleteListRequest,
    deleteListRequestSuccess,
    deleteListRequestFailure
} = actions;

export default reducer;
