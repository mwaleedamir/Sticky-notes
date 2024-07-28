import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    board: []
};

const BoardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        setBoard: (state, action) => {
            console.log("action payload up",action.payload)
            state.board = action.payload;
            console.log("action payload down",action.payload)
            
        },
        clearBoard: (state) => {
            state.board = null;
            state._id = null;
        }
    }
});

export const { setBoard, clearBoard } = BoardSlice.actions;
export default BoardSlice.reducer;
