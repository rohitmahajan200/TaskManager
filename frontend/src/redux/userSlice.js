import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const login=createAsyncThunk(
    'task/login',
    ({email,password})=>{
        axios.post("https://taskmanager-1-t5jj.onrender.com/login",{email,password},{withCredentials:true});
    }
)

export const logout=createAsyncThunk(
    'task/logout',
    ()=>{
        axios.post("https://taskmanager-1-t5jj.onrender.com/logout",{},{withCredentials:true});
    }
)

const userSlice=createSlice(
    {
        name:'user',
        initialState:{},
        reducers:{},
        extraReducers:(builder)=>{
            builder
            .addCase(login.fulfilled,(state,action)=>{
                state=action.payload.data
            })
            .addCase(logout.fulfilled,(state,action)=>{
                state=action.payload.data
            })
        }
        
    }
)

export default userSlice.reducer;