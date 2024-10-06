import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from "../store/userSlice/userSlice.jsx";

const store = configureStore({
    reducer: {
        user: userReducer,
    }

}) ;


export default store ;