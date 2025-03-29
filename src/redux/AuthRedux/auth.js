// authSlice.ts
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	token: "",
	myLat:'',
	myLon:"",
	user:"",
	zone_id:"",
	setting:{},
	otp: "",
	email:"",
	WishlistData :[],
	WishlistDataCount: 0,
	cardList:null
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setToken(state, action) {
			state.token = action.payload;
		},
		setLogin(state, action) {
			state.token = action.payload.api_token;
			state.user = action.payload;
		},
		setLatAndLon(state, action) {
			state.myLat = action.payload.myLat;
			state.myLon = action.payload.myLon
		},
		clearToken(state) {
			state.token = "";
		},
		setZone(state,action) {
			state.zone_id = action.payload
		},
		setSetting(state, action){
			state.setting=action.payload;
		},
		setWishlist(state, action){
			state.WishlistData=action.payload;
			state.WishlistDataCount= action.payload.length;
		},
		setWishlistCount(state){
			state.WishlistDataCount += state.WishlistDataCount;
		},
		setOtp(state, action){
			state.otp=action.payload.otp;
			state.email=action.payload.email;
		},
		setCardListData(state, action) {
			state.cardList= action.payload;
		},
		logout(state) {
			Object.assign(state, initialState);
		  },
	},
});

export const { setToken, clearToken, setLatAndLon, 
	setLogin, setZone, setSetting, setOtp, setWishlist, logout, setWishlistCount, setCardListData } = authSlice.actions;
export default authSlice.reducer;
