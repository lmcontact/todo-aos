import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setNotification } from "./notificationSlice";

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

        registerRequest: state => {
            state.error = null;
            state.loading = true;
        },

        registerSuccess: state => {
            state.loading = false;
        },

        registerFailure: (state, { payload }) => {
            state.error = payload;
            state.loading = false;
        }
    }
});

export const register = (history, formData) => async dispatch => {
    dispatch(registerRequest());
    try {
        await axios.post("/api/register", formData);
        dispatch(registerSuccess());
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
            dispatch(registerFailure("Validation errors"));
        } else {
            const message = formatErrorMessage(response, request);
            dispatch(registerFailure(message));
            dispatch(setNotification({ type: "error", message }));
        }
    }
};

function formatFields(response) {
    return Object.keys(response.data.errors).map(key => ({
        errors: response.data.errors[key],
        name: key
    }));
}

function formatErrorMessage(response, request) {
    if (response) {
        return "Une erreur interne au serveur est survenue, veuillez réessayer.";
    }
    return request
        ? "Aucune réponse du serveur, veuillez réessayer."
        : "Une erreur est survenue lors de l'envoi de la requếte, veuillez réessayer.";
}

const { actions, reducer } = registerSlice;

export const {
    setRegisterFormFields,
    registerRequest,
    registerSuccess,
    registerFailure
} = actions;

export default reducer;
