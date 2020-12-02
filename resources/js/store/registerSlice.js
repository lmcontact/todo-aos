import { createSlice } from "@reduxjs/toolkit";

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

const { actions, reducer } = registerSlice;

export const { registerRequest, registerSuccess, registerFailure } = actions;

export default reducer;
