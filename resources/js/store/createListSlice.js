import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setNotification } from "./notificationSlice";
import { formatFields, formatErrorMessage } from "./helpers";

const createListSlice = createSlice({
    name: "createList",
    initialState: {
        fields: [
            {
                name: "name",
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
        setCreateListFormFields: (state, { payload }) => {
            state.fields = payload;
        },

        initCreateListRequest: state => {
            state.error = null;
            state.loading = true;
        },

        createListRequestSuccess: state => {
            state.loading = false;
        },

        createListRequestFailure: (state, { payload }) => {
            state.error = payload;
            state.loading = false;
        }
    }
});

export const createList = (handleCancel, { name }) => async dispatch => {
    dispatch(initCreateListRequest());
    try {
        await axios.post("/api/lists", { name });
        dispatch(createListRequestSuccess());
        handleCancel();
    } catch ({ response, request }) {
        if (response.status === 422) {
            const fields = formatFields(response);
            dispatch(setCreateListFormFields(fields));
            dispatch(createListRequestFailure("Validation errors"));
        } else {
            const message = formatErrorMessage(response, request);
            dispatch(createListRequestFailure(message));
            dispatch(setNotification({ type: "error", message }));
        }
    }
};

const { actions, reducer } = createListSlice;

export const {
    setCreateListFormFields,
    initCreateListRequest,
    createListRequestSuccess,
    createListRequestFailure
} = actions;

export default reducer;
