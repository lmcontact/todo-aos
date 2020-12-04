import { createSlice } from "@reduxjs/toolkit";

const showCompletedSlice = createSlice({
    name: "showCompletedSlice",
    initialState: false,
    reducers: {
        setShowCompleted(state, { payload }) {
            return payload;
        }
    }
});

const { actions, reducer } = showCompletedSlice;

export const { setShowCompleted } = actions;

export default reducer;
