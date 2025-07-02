import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addTask = createAsyncThunk(
  '/',
  async (task,{ rejectWithValue }) => {
    try {
    const response = await axios.post("https://taskmanager-1-t5jj.onrender.com/",task);
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
  async (_,{rejectWithValue}) => {
    try {
      const response = await axios.get("https://taskmanager-1-t5jj.onrender.com/task",{withCredentials: true});
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue(error.message);
    }
  }
);

export const changeStatus=createAsyncThunk(  
  '/tasks/changeStatus',
  async({id,status},{rejectWithValue})=>{
    try {
      const response=await axios.post(`https://taskmanager-1-t5jj.onrender.com/task/${id}`,{status});
      return response.data;
    } catch(error){
      if(error.response && error.response.data){
        return rejectWithValue(error.response.data)
      }
      return rejectWithValue(error.message);
    }
  }
)

export const deleteTask=createAsyncThunk(
  '/tasks/delete',
  async(id,{rejectWithValue})=>{
    try {
      const response=await axios.delete(`https://taskmanager-1-t5jj.onrender.com/task/${id}`);
      return response.data;
    } catch(error){
      if(error.response && error.response.data){
        return rejectWithValue(error.response.data)
      }
      return rejectWithValue(error.message);
    }
  }
)

export const getFilterTasks = createAsyncThunk(
  '/tasks/filter',
  async(filter,{rejectWithValue}) => {
    try {
      const response = await axios.get(`https://taskmanager-1-t5jj.onrender.com/filter/?filter=${filter}`);
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

        // .addCase(addTask.pending,(state)=>{
        // state.loading = true;
        // state.error = null;
        // })

        // .addCase(addTask.rejected,(state,action)=>{
        // state.loading = false;
        // state.error = action.payload.message;
        // })

//---------------------------------------------------------------------------------------------------------

        //to add All task to state
        .addCase(getTasks.fulfilled,(state,action)=>{
        state.loading = false;
        state.error = null;
        state.tasks=action.payload.data;
        })

        // .addCase(getTasks.pending,(state)=>{
        // state.loading = true;
        // state.error = null;
        // })

        // .addCase(getTasks.rejected,(state,action)=>{
        // state.loading = false;
        // state.error = action.payload.message;
        // })

        //-------------------------------------------------------------------------------------------------------
        //Afer changing status
        .addCase(changeStatus.fulfilled,(state,action)=>{
          state.tasks.forEach((item)=>{
          if(item._id==action.payload.data._id){
            item.status=action.payload.data.status;
          }
        }) })
        //-------------------------------------------------------------------------------------------------------
        //After filter
        .addCase(getFilterTasks.fulfilled,(state,action)=>{
          state.tasks=action.payload.data;
        })


    }

})



export default taskSlice.reducer;