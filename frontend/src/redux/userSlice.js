import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const register=createAsyncThunk(
    'task/register',
    async({name,email,password,role},{rejectWithValue})=>{
        try {
           const response=await axios.post("https://taskmanager-1-t5jj.onrender.com/register",
            {name,email,password,role},
            {withCredentials:true}
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const login=createAsyncThunk(
    'task/login',
    async({email,password},{rejectWithValue})=>{
        try {
           const response=await axios.post("https://taskmanager-1-t5jj.onrender.com/login",
            {email,password},
            {withCredentials:true}
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const logout=createAsyncThunk(
    'task/logout',
    async(_,{rejectWithValue})=>{
       try {
         const response =await axios.post("https://taskmanager-1-t5jj.onrender.com/logout",
            {},
            {withCredentials:true}
         );
         return response.data;
       } catch (error) {
        return rejectWithValue(error.response.data);
       }
    }
)

const userSlice=createSlice(
    {
        name:'user',
        initialState:
        {
            user: null,
            loading: false,
            error: null,
            message:null,
            success:null
        },

        reducers:{},
        extraReducers:(builder)=>{
            builder
            .addCase(register.fulfilled,(state,action)=>{
                state.message=action.payload.message;
                state.success=action.payload.success;
                state.user=null;
            })
            .addCase(register.rejected,(state,action)=>{
                state.message=action.payload.message;
                state.success=action.payload.success;
                state.user=null;
            })

            .addCase(login.fulfilled,(state,action)=>{
                state.user=action.payload
            })
            .addCase(login.rejected,(state,action)=>{
                state.error=action.payload
            })

            .addCase(logout.fulfilled,(state)=>{
                state.user=null;
                state.error=null;
                state.loading=false;
            })
        }
        
    }
)

export default userSlice.reducer;