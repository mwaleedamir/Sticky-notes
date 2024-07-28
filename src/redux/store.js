import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './AuthSlice';
import ColumnSlice from './ColumnSlice';
import BoardSlice from './BoardSlice';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

const authPersistConfig = {
    key: 'auth',
    storage,
};

const columnPersistConfig = {
    key: 'column',
    storage,
};

const boardPersistConfig = {
    key: 'board',
    storage,
};

const persistedReducerAuth = persistReducer(authPersistConfig, AuthSlice);
const persistedReducerColumn = persistReducer(columnPersistConfig, ColumnSlice);
const persistedReducerBoard = persistReducer(boardPersistConfig, BoardSlice);

export const store = configureStore({
    reducer: {
        auth: persistedReducerAuth,
        column: persistedReducerColumn,
        board: persistedReducerBoard,
    }
});

export const persistor = persistStore(store);
