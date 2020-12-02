import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const registerSlice = createSlice({
    name: "register",
    initialState: { loading: false, error: null },
    reducers: {
        registerRequest: state => {
            state.error = null;
            state.loading = true;
        },

        registerSuccess: state => {
            state.loading = false;
        },

        registerFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
});

export const register = formData => async dispatch => {
    dispatch(registerRequest());
    try {
        await axios.post("/register", formData);
        dispatch(registerSuccess());
    } catch (error) {
        console.log(error);
        dispatch(registerFailure());
    }
};

const { actions, reducer } = registerSlice;

export const { registerRequest, registerSuccess, registerFailure } = actions;

export default reducer;
