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
            }
        ],
        loading: false,
        error: null
    },
    reducers: {
        setLoginFormFields: (state, { payload }) => {
            state.fields = payload;
        },

        loginRequest: state => {
            state.error = null;
            state.loading = true;
        },

        loginSuccess: state => {
            state.loading = false;
        },

        loginFailure: (state, { payload }) => {
            state.error = payload;
            state.loading = false;
        }
    }
});

export const login = (history, formData) => async dispatch => {
    dispatch(loginRequest());
    try {
        await axios.post("/api/login", formData);
        dispatch(loginSuccess());
        history.push("/");
    } catch ({ response, request }) {
        if (response.status === 422) {
            const fields = formatFields(response);
            dispatch(setLoginFormFields(fields));
            dispatch(loginFailure("Validation errors"));
        } else {
            const message = formatErrorMessage(response, request);
            dispatch(loginFailure(message));
            dispatch(setNotification({ type: "error", message }));
        }
    }
};

const { actions, reducer } = loginSlice;

export const {
    setLoginFormFields,
    loginRequest,
    loginSuccess,
    loginFailure
} = actions;

export default reducer;
