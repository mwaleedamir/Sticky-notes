import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    column: null,
    _id: null
};

const ColumnSlice = createSlice({
    name: 'column',
    initialState,
    reducers: {
        setColumn: (state, action) => {
            console.log(action.column);
            state.column = action.payload;
            state._id = action.payload._id;
        }
    }
});

export const { setColumn } = ColumnSlice.actions;
export default ColumnSlice.reducer;
