import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addTask = createAsyncThunk(
  '/',
  async (task,{ rejectWithValue }) => {
    try {
    const response = await axios.post("http://localhost:5000/",task);
    return response.data;
    } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue(error.message);
    }
    
  }
);

export const getTasks = createAsyncThunk(
  '/tasks',
  async (filter,{rejectWithValue}) => {
    try {
      const response = await axios.get("http://localhost:5173/task",{params: filter});
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue(error.message);
    }
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
        state.tasks.push(action.payload.data);
        })

        .addCase(addTask.pending,(state,action)=>{
        state.loading = true;
        state.error = null;
        })

        .addCase(addTask.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.payload.message;
        })

//---------------------------------------------------------------------------------------------------------

        //to add FILTER task to state
        .addCase(getTasks.fulfilled,(state,action)=>{
        state.loading = false;
        state.error = null;
        state.tasks.push(action.payload.data);
        })

        .addCase(getTasks.pending,(state,action)=>{
        state.loading = true;
        state.error = null;
        })

        .addCase(getTasks.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.payload.message;
        })

    }

})

export default taskSlice.reducer;