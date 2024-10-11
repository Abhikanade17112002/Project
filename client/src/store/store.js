import { combineReducers, configureStore } from "@reduxjs/toolkit";
import  userReducer  from "../store/userSlice/userSlice.jsx";
import jobReducer from "./jobSlice/jobSlice.jsx";
import companyReducer from "./companySlice/companySlice.jsx"
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import storage from 'redux-persist/lib/storage'


  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }
  const rootReducer = combineReducers({
    user:userReducer ,
    job:jobReducer,
    company:companyReducer
  })
  const persistedReducer = persistReducer(persistConfig, rootReducer)  
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  }) ;


export default store ;