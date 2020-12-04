import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setNotification } from "./notificationSlice";
import { formatFields, formatErrorMessage } from "./helpers";
import { showList } from "./showListSlice";

const createTaskSlice = createSlice({
    name: "createTask",
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
        setCreateTaskFormFields: (state, { payload }) => {
            state.fields = payload;
        },

        initCreateTaskRequest: state => {
            state.error = null;
            state.loading = true;
        },

        createTaskRequestSuccess: state => {
            state.loading = false;
        },

        createTaskRequestFailure: (state, { payload }) => {
            state.error = payload;
            state.loading = false;
        }
    }
});

export const createTask = (
    handleCancel,
    listId,
    { name, description }
) => async dispatch => {
    dispatch(initCreateTaskRequest());
    try {
        await axios.post(`/api/lists/${listId}/tasks`, { name, description });
        dispatch(createTaskRequestSuccess());
        dispatch(
            setNotification({
                type: "success",
                message: "Tâche créée avec succès."
            })
        );
        dispatch(showList(listId));
        handleCancel();
    } catch ({ response, request }) {
        if (response && response.status === 422) {
            const fields = formatFields(response);
            dispatch(setCreateTaskFormFields(fields));
            dispatch(createTaskRequestFailure("Validation errors"));
        } else if (response && response.status === 404) {
            const message = "La liste n'existe pas.";
            dispatch(createTaskRequestFailure(message));
            dispatch(setNotification({ type: "error", message }));
        } else {
            const message = formatErrorMessage(response, request);
            dispatch(createTaskRequestFailure(message));
            dispatch(setNotification({ type: "error", message }));
        }
    }
};

const { actions, reducer } = createTaskSlice;

export const {
    setCreateTaskFormFields,
    initCreateTaskRequest,
    createTaskRequestSuccess,
    createTaskRequestFailure
} = actions;

export default reducer;
