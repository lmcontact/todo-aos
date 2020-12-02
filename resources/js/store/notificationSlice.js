import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";

const notificationSlice = createSlice({
    name: "notification",
    initialState: {
        type: null,
        message: null
    },
    reducers: {
        setNotification(state, { payload }) {
            state = payload;
            const message = { message: payload.message };
            switch (payload.type) {
                case "info":
                    notification.info(message);
                    break;
                case "success":
                    notification.success(message);
                    break;
                case "error":
                    notification.error(message);
                    break;
            }
        }
    }
});

const { actions, reducer } = notificationSlice;

export const { setNotification } = actions;

export default reducer;
