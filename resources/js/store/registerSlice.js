import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setNotification } from "./notificationSlice";
import { formatFields, formatErrorMessage } from "./helpers";

const registerSlice = createSlice({
    name: "register",
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
                name: "confirmation",
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
        setRegisterFormFields: (state, { payload }) => {
            state.fields = payload;
        },

        initRegisterRequest: state => {
            state.error = null;
            state.loading = true;
        },

        registerRequestSuccess: state => {
            state.loading = false;
        },

        registerRequestFailure: (state, { payload }) => {
            state.error = payload;
            state.loading = false;
        }
    }
});

export const register = (history, formData) => async dispatch => {
    dispatch(initRegisterRequest());
    try {
        await axios.post("/api/register", formData);
        dispatch(registerRequestSuccess());
        dispatch(
            setNotification({
                type: "success",
                message: "Votre compte a été créé avec succès."
            })
        );
        history.push("/login");
    } catch ({ response, request }) {
        if (response.status === 422) {
            const fields = formatFields(response);
            dispatch(setRegisterFormFields(fields));
            dispatch(registerRequestFailure("Validation errors"));
        } else {
            const message = formatErrorMessage(response, request);
            dispatch(registerRequestFailure(message));
            dispatch(setNotification({ type: "error", message }));
        }
    }
};

const { actions, reducer } = registerSlice;

export const {
    setRegisterFormFields,
    initRegisterRequest,
    registerRequestSuccess,
    registerRequestFailure
} = actions;

export default reducer;
