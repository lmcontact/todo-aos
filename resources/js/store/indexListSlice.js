import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setNotification } from "./notificationSlice";
import { formatErrorMessage } from "./helpers";

const indexListSlice = createSlice({
    name: "indexList",
    initialState: {
        lists: [],
        error: null,
        loading: false
    },
    reducers: {
        initIndexListRequest(state) {
            state.error = null;
            state.loading = true;
        },

        indexListRequestSuccess(state, { payload }) {
            state.lists = payload;
            state.loading = false;
        },

        indexListRequestFailure(state, { payload }) {
            state.error = payload;
            state.loading = false;
        }
    }
});

export const indexList = () => async dispatch => {
    dispatch(initIndexListRequest());
    try {
        const { data } = await axios.get("/api/lists");
        dispatch(indexListRequestSuccess(data));
    } catch ({ response, request }) {
        const message = formatErrorMessage(response, request);
        dispatch(indexListRequestFailure(message));
        dispatch(setNotification({ type: "error", message }));
    }
};

const { actions, reducer } = indexListSlice;

export const {
    initIndexListRequest,
    indexListRequestSuccess,
    indexListRequestFailure
} = actions;

export default reducer;
