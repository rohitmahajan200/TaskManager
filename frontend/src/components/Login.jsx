import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { login } from '../redux/userSlice';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
const loginAlert=(data)=>toast(data);
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const navigate=useNavigate();
const dispatch=useDispatch();
const state=useSelector((state)=>state.user);

    const handleSubmit=async(e)=>{
        e.preventDefault();
        dispatch(login({email,password}));
    }

    useEffect(()=>{
      if(state.user!=null){
      if(state?.user?.success){
            setTimeout(()=>{
              navigate("/tasks");
            },2000)
            loginAlert("Login Successfully!");
        }else{
          loginAlert(state?.user?.message);
        }    
      }else{
        loginAlert("User Logout!");
      }
    },[dispatch,state])


  return (
    <>    
    <div className='flex flex-col justify-center items-center'>

    
    <form className='flex flex-col justify-center items-center gap-5 p-10 rounded-xl bg-gray-800 mt-15 w-200' onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold mb-6">Login</h1>


        <input placeholder='Email Id' 
        name='email' 
        value={email}
        onChange={(e)=>setEmail(e.target.value)} 
        className='border-b-2 border-blue-300 h-10 w-70 rounded-xs focus:outline-none'>
        </input>

        <input placeholder='Enter Password'
        type='password'
         name='password' 
         value={password}
         onChange={(e)=>setPassword(e.target.value)} 
         className='border-b-2 border-blue-300 h-10 w-70 rounded-xs focus:outline-none'>
         </input>
        <ToastContainer />
        <button className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded hover:cursor-pointer'>Login</button>
        
    </form>
      
            <Link className="text-blue-400 hover:underline italic mb-4 inline-block" to="/register">
              - Not Register Yet! Register From Here
            </Link>
</div>
    
    </>

    
  )
}

export default Login