import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    error: null,
    user: null,
    role: null,
    _id: null
};

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.role = action.payload.role;
            state._id = action.payload._id;
        },
        logOut: (state) => {
            state.user = null;
            state.loading = false;
            state.error = null;
            state.role = null;
            state._id = null;
        }
    }
});

export const { setUser, logOut } = AuthSlice.actions;
export default AuthSlice.reducer;
