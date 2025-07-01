import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addTask = createAsyncThunk(
  '/tasks',
  async (task, thunkAPI) => {
    const response = await axios.post("acv",task);
    return await response.json();
  }
);

export const getTasks = createAsyncThunk(
  '/tasks',
  async (filter, thunkAPI) => {
    const response = await axios.get("acv",filter);
    return await response.json();
  }
);

export const taskSlice=createSlice({
    name:"tasks",
    initialState:{
        tasks: [],
        loading: false,
        error: null,
    },
    reducers:{
        
    },

    extraReducers:(builder)=>{
        //to add task to state
        builder
        .addCase(addTask.fulfilled,(state,action)=>{
        state.loading = false;
        state.error = null;
        state.tasks.push(action.payload);
        })

        .addCase(addTask.pending,(state,action)=>{
        state.loading = true;
        state.error = null;
        })

        .addCase(addTask.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.payload;
        })

//---------------------------------------------------------------------------------------------------------

        //to add FILTER task to state
        .addCase(getTasks.fulfilled,(state,action)=>{
        state.loading = false;
        state.error = null;
        state.tasks.push(action.payload);
        })

        .addCase(getTasks.pending,(state,action)=>{
        state.loading = true;
        state.error = null;
        })

        .addCase(getTasks.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.payload;
        })

    }

})

export default taskSlice.reducer;