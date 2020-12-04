import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setNotification } from "./notificationSlice";
import { formatFields, formatErrorMessage } from "./helpers";
import { showList } from "./showListSlice";

const updateTaskSlice = createSlice({
    name: "updateTask",
    initialState: {
        fields: [
            {
                name: "name",
                errors: [],
                touched: false,
                validating: false,
                value: ""
            },
            {
                name: "description",
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
        setUpdateTaskFormFields: (state, { payload }) => {
            state.fields = payload;
        },

        initUpdateTaskRequest: state => {
            state.error = null;
            state.loading = true;
        },

        updateTaskRequestSuccess: state => {
            state.loading = false;
        },

        updateTaskRequestFailure: (state, { payload }) => {
            state.error = payload;
            state.loading = false;
        }
    }
});

export const updateTask = (handleCancel, { id, name, description }) => async dispatch => {
    dispatch(initUpdateTaskRequest());
    try {
        await axios.put(`/api/tasks/${id}`, { name, description });
        dispatch(updateTaskRequestSuccess());
        dispatch(showList());
        dispatch(
            setNotification({
                type: "success",
                message: "Tâche mise à jour avec succès."
            })
        );
        handleCancel();
    } catch ({ response, request }) {
        if (response && response.status === 422) {
            const fields = formatFields(response);
            dispatch(setUpdateTaskFormFields(fields));
            dispatch(updateTaskRequestFailure("Validation errors"));
        } else {
            const message = formatErrorMessage(response, request);
            dispatch(updateTaskRequestFailure(message));
            dispatch(setNotification({ type: "error", message }));
        }
    }
};

const { actions, reducer } = updateTaskSlice;

export const {
    setUpdateTaskFormFields,
    initUpdateTaskRequest,
    updateTaskRequestSuccess,
    updateTaskRequestFailure
} = actions;

export default reducer;
