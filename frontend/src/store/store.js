import { configureStore } from "@reduxjs/toolkit";
import  taskSlice  from "../redux/taskSlice.js";
import userReducer from '../redux/userSlice.js';
export const store=configureStore({
    reducer:{
        task:taskSlice,
        user:userReducer
    }
});