import { createSlice } from "@reduxjs/toolkit"

const initialState = null

const setFilter = (filteredAnecdotes) => {
	return async (dispatch) => {
		dispatch(Filter(filteredAnecdotes))
	}
}

const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		Filter(state, action) {
			console.log('tää', action.payload)
			return action.payload
		}
	}
})

export const { Filter } = filterSlice.actions

export { setFilter }

export default filterSlice.reducer