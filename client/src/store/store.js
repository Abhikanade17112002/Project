import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from "../store/userSlice/userSlice.jsx";
import jobReducer from "./jobSlice/jobSlice.jsx";
const store = configureStore({
    reducer: {
        user: userReducer,
        job : jobReducer
    }

}) ;


export default store ;