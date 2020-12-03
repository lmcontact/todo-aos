import { createSlice } from "@reduxjs/toolkit";
import { setNotification } from "./notificationSlice";
import { formatErrorMessage } from "./helpers";

const logoutSlice = createSlice({
    name: "logout",
    initialState: {
        error: null,
        loading: null
    },
    reducers: {
        initLogoutRequest(state) {
            state.error = null;
            state.loading = true;
        },

        logoutRequestSuccess(state) {
            state.loading = false;
        },

        logoutRequestFailure(state, { payload }) {
            state.error = payload;
            state.loading = false;
        }
    }
});

export const logout = (history) => async dispatch => {
    dispatch(initLogoutRequest());
    try {
        await axios.post("/api/logout");
        dispatch(logoutRequestSuccess());
        history.push("/login");
    } catch ({ response, request }) {
        if (response.status === 401) {
            const { message } = response.data;
            dispatch(logoutRequestFailure(message));
            dispatch(setNotification({ type: "error", message }));
        } else {
            const message = formatErrorMessage(response, request);
            dispatch(logoutRequestFailure(message));
            dispatch(setNotification({ type: "error", message }));
        }
    }
};

const { actions, reducer } = logoutSlice;

export const {
    initLogoutRequest,
    logoutRequestSuccess,
    logoutRequestFailure
} = actions;

export default reducer;
