import { configureStore } from "@reduxjs/toolkit";
import { taskSlice } from "../redux/taskSlice.js";
export const store=configureStore({
    reducer:taskSlice
})