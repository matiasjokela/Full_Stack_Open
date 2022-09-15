import { createSlice } from "@reduxjs/toolkit"

const initialState = null

const setNotification = (content, time) => {
	return async (dispatch) => {
		dispatch(Notification(content))
		setTimeout(() => {
			dispatch(Notification(null))
		}, time * 1000)
	}
}


const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		Notification(state, action) {
			return action.payload
		}
	}
})

export const { Notification } = notificationSlice.actions

export { setNotification }

export default notificationSlice.reducer