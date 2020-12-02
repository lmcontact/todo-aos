import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
    name: "user",
    initialState: {
        value: null,
        error: null,
        loading: false
    },
    reducers: {
        initUserRequest(state) {
            state.error = null;
            state.loading = true;
        },

        userRequestSuccess(state, { payload }) {
            state.value = payload;
            state.loading = false;
        },

        userRequestFailure(state, { payload }) {
            state.error = payload;
            state.loading = false;
        }
    }
});

export const fetchUser = () => async dispatch => {
    dispatch(initUserRequest());
    try {
        const { data } = await axios.get("/api/user");
        dispatch(userRequestSuccess(data));
    } catch ({ response, request }) {
        const message = formatErrorMessage(response, request);
        dispatch(userRequestFailure(message));
        dispatch(setNotification({ type: "error", message }));
    }
};

const { reducer, actions } = userSlice;

export const {
    initUserRequest,
    userRequestSuccess,
    userRequestFailure
} = actions;

export default reducer;
