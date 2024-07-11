import { createSlice } from "@reduxjs/toolkit";

 
const initialState = {
    IsAuthenticated: false,
    loading: false,
    error: null,
}
const AuthSlice = createSlice({
    name:"user",
    initialState:initialState,
    reducers:{
        Setuser:(state,action)=>{
            state.user = action.payload
            state.IsAuthenticated = true
        },
        logOut:(state,action)=>{
            state.user = null
            state.loading = false
            state.error = null
            state.IsAuthenticated = false
            state.role = null
        }
    }

})

export const { Setuser ,logOut} = AuthSlice.actions;
export default AuthSlice.reducer;
