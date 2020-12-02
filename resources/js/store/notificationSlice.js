import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notification",
    initialState: {
        message: null
    },
    reducers: {
        setNotification(state, action) {
            state.message = action.payload;
        },

        resetNotification(state) {
            state.message = null;
        }
    }
});

const { actions, reducer } = notificationSlice;

export const { setNotification, resetNotification } = actions;

export default reducer;
