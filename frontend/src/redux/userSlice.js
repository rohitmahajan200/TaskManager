import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

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
        },

        reducers:{},
        extraReducers:(builder)=>{
            builder
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