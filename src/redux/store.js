import {configureStore} from '@reduxjs/toolkit'
import Authslice from './Authslice'
import storage from 'redux-persist/lib/storage'
import {persistStore,persistReducer} from 'redux-persist'


const persistConfig = {
    key: 'root',
    storage,
    whiteList: ['Auth']
}
const persistedReducer = persistReducer(persistConfig, Authslice)


export const store = configureStore({
    reducer:{
        Auth:persistedReducer 
    }
})

export const persister  = persistStore(store)