import { createSlice } from "@reduxjs/toolkit"

const initialState = null

const showNotification = (content) => {
	return async (dispatch) => {
		dispatch(Notification(content))
		setTimeout(() => {
			dispatch(Notification(null))
		}, 5000)
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

export { showNotification }

export default notificationSlice.reducer