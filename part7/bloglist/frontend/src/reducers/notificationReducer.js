import { createSlice } from "@reduxjs/toolkit";

const initialState = null;
let timeoutID;

const setNotification = (content, time) => {
  console.log("täsä näi", content);
  clearTimeout(timeoutID);
  return async (dispatch) => {
    dispatch(Notification(content));
    timeoutID = setTimeout(() => {
      dispatch(Notification(null));
    }, time * 1000);
  };
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    Notification(state, action) {
      console.log("kutsuitte", action.payload);
      return action.payload;
    },
  },
});

export const { Notification } = notificationSlice.actions;

export { setNotification };

export default notificationSlice.reducer;
