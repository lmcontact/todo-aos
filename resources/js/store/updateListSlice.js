import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setNotification } from "./notificationSlice";
import { formatFields, formatErrorMessage } from "./helpers";
import { indexList } from "./indexListSlice";

const updateListSlice = createSlice({
    name: "updateList",
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
        setUpdateListFormFields: (state, { payload }) => {
            state.fields = payload;
        },

        initUpdateListRequest: state => {
            state.error = null;
            state.loading = true;
        },

        updateListRequestSuccess: state => {
            state.loading = false;
        },

        updateListRequestFailure: (state, { payload }) => {
            state.error = payload;
            state.loading = false;
        }
    }
});

export const updateList = (handleCancel, { id, name }) => async dispatch => {
    dispatch(initUpdateListRequest());
    try {
        await axios.put(`/api/lists/${id}`, { name });
        dispatch(updateListRequestSuccess());
        dispatch(indexList());
        dispatch(
            setNotification({
                type: "success",
                message: "Liste mise à jour avec succès."
            })
        );
        handleCancel();
    } catch ({ response, request }) {
        if (response && response.status === 422) {
            const fields = formatFields(response);
            dispatch(setUpdateListFormFields(fields));
            dispatch(updateListRequestFailure("Validation errors"));
        } else {
            const message = formatErrorMessage(response, request);
            dispatch(updateListRequestFailure(message));
            dispatch(setNotification({ type: "error", message }));
        }
    }
};

const { actions, reducer } = updateListSlice;

export const {
    setUpdateListFormFields,
    initUpdateListRequest,
    updateListRequestSuccess,
    updateListRequestFailure
} = actions;

export default reducer;
