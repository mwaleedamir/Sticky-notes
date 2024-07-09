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
        }
    }

})

export const { Setuser } = AuthSlice.actions;
export default AuthSlice.reducer;
