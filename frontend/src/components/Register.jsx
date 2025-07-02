import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Register = () => {

const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [role,setRole]=useState("");

//const dispatch=useDispatch();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        await axios.post("https://taskmanager-1-t5jj.onrender.com/register",{name,email,password,role},{withCredentials:true})
    }

  return (
    <>    
    <div className='flex flex-col justify-center items-center'>

    
    <form className='flex flex-col justify-center items-center gap-5 p-10 rounded-xl bg-gray-800 mt-15 w-200' onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold mb-6">Register</h1>

        <input placeholder='Name'
         name='name'
         value={name}
         onChange={(e)=>setName(e.target.value)} 
         className='border-b-2 border-blue-300 w-70 h-10 rounded-xs focus:outline-none'>
         </input>

        <input placeholder='Email Id' 
        name='email' 
        value={email}
        onChange={(e)=>setEmail(e.target.value)} 
        className='border-b-2 border-blue-300 h-10 w-70 rounded-xs focus:outline-none'>
        </input>

        <input placeholder='Enter Password'
         name='password' 
         value={password}
         onChange={(e)=>setPassword(e.target.value)} 
         className='border-b-2 border-blue-300 h-10 w-70 rounded-xs focus:outline-none'>
         </input>

        <input placeholder='Enter Your Role' 
        name='role' 
        value={role}
        onChange={(e)=>setRole(e.target.value)} 
        className='border-b-2 border-blue-300 h-10 w-70 rounded-xs focus:outline-none '>
        </input>
        <h4>Note:-For Role only expecting <b>Admin</b>, <b>User</b> either of them</h4>
        <button className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded hover:cursor-pointer'>Register</button>
        
    </form>
      
            <Link className="text-blue-400 hover:underline italic mb-4 inline-block" to="/">
              - Already Register! Login From Here
            </Link>
</div>
    
    </>

    
  )
}

export default Register