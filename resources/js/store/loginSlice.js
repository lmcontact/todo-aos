import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setNotification } from "./notificationSlice";
import { formatFields, formatErrorMessage } from "./helpers";

const loginSlice = createSlice({
    name: "login",
    initialState: {
        fields: [
            {
                name: "username",
                errors: [],
                touched: false,
                validating: false,
                value: ""
            },
            {
                name: "password",
                errors: [],
                touched: false,
                validating: false,
                value: ""
            },
            {
                name: "remember",
                errors: [],
                touched: true,
                validating: false,
                value: false
            }
        ],
        loading: false,
        error: null
    },
    reducers: {
        setLoginFormFields: (state, { payload }) => {
            state.fields = payload;
        },

        initLoginRequest: state => {
            state.error = null;
            state.loading = true;
        },

        loginRequestSuccess: state => {
            state.loading = false;
        },

        loginRequestFailure: (state, { payload }) => {
            state.error = payload;
            state.loading = false;
        }
    }
});

export const login = (history, formData) => async dispatch => {
    dispatch(initLoginRequest());
    try {
        await axios.post("/api/login", formData);
        dispatch(loginRequestSuccess());
        history.push("/");
    } catch ({ response, request }) {
        if (response.status === 422) {
            const fields = formatFields(response);
            dispatch(setLoginFormFields(fields));
            dispatch(loginRequestFailure("Validation errors"));
        } else if (response.status === 401) {
            const { message } = response.data;
            dispatch(loginRequestFailure(message));
            dispatch(setNotification({ type: "error", message }));
        } else {
            const message = formatErrorMessage(response, request);
            dispatch(loginRequestFailure(message));
            dispatch(setNotification({ type: "error", message }));
        }
    }
};

const { actions, reducer } = loginSlice;

export const {
    setLoginFormFields,
    initLoginRequest,
    loginRequestSuccess,
    loginRequestFailure
} = actions;

export default reducer;
