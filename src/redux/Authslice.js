import { createSlice } from "@reduxjs/toolkit";

 
const initialState = {
    loading: false,
    error: null,
    user:null,
}
const AuthSlice = createSlice({
    name:"user",
    initialState:initialState,
    reducers:{
        Setuser:(state,action)=>{
            state.user = action.payload
        },
        logOut:(state,action)=>{
            state.user = null
            state.loading = false
            state.error = null
        }
    }

})

export const { Setuser ,logOut} = AuthSlice.actions;
export default AuthSlice.reducer;
