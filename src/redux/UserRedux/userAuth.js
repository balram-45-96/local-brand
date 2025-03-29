import { createSlice } from "@reduxjs/toolkit";


const initialState = {
	data: "",
	status: "idle",
	error: undefined,
	user: null,
	isAuthenticated: false,
};

const exampleSlice = createSlice({
	name: "userAuth",
	initialState: initialState,
	reducers: {
		// Your existing reducer logic
		updateData: (state, action) => {
			state.data = action.payload;
		},
		logout: (state) => {
			state.isAuthenticated = false;
		},
		updateIsAuthenticated: (state, action) => {
			state.isAuthenticated = action.payload;
		},
	},

});
export const { updateData, logout, updateIsAuthenticated } =
	exampleSlice.actions;
export const selectUserAuth = (state) => state.userAuth;

export default exampleSlice.reducer;
