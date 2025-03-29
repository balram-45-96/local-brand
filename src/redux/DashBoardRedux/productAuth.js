
import { createSlice } from "@reduxjs/toolkit";

// Define the async thunk using fetch


const Slice = createSlice({
	name: "productSlice",
	initialState: {
		data: '',
		status: "",
	},
	reducers: {
		// Your existing reducer logic
		productsData: (state, action) => {
			state.data = action.payload;
		},
	}

});

export const { productsData } = Slice.actions;

export default Slice.reducer;
