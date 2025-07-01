import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { addTask } from '../redux/taskSlice.js';
import axios from 'axios';


const Taskform = () => {

const [title,setTitle]=useState("");
const [description,setDescription]=useState("");
const [assignto,setAssignto]=useState("");
const [status,setStatus]=useState("");

const dispatch=useDispatch();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const task={title,description,assignto,status};
        dispatch(addTask(task));
        // await axios.post("http://localhost:5000/",task);
    }

  return (
    <>    
    <form className='flex flex-col justify-center items-center gap-5' onSubmit={()=>handleSubmit()}>
        <div>Create-Task</div>
        <input placeholder='Title' name='title' onChange={(e)=>setTitle(e.target.value)} className='border-2 border-blue-300 w-70 h-10 rounded-xs'></input>
        <input placeholder='Discription' name='description' onChange={(e)=>setDescription(e.target.value)} className='border-2 border-blue-300 h-10 w-70 rounded-xs'></input>
        <input placeholder='Assing To' name='assignto' onChange={(e)=>setAssignto(e.target.value)} className='border-2 border-blue-300 h-10 w-70 rounded-xs'></input>
        <input placeholder='Status' name='status' onChange={(e)=>setStatus(e.target.value)} className='border-2 border-blue-300 h-10 w-70 rounded-xs'></input>
        <button className='bg-blue-400 text-black w-30 rounded-xl hover:cursor-pointer'>Create Task</button>
        <Link className='text-white hover:text-blue-300 italic' to="/tasks">Checkout-Assingn Tasks</Link>
    </form>

    
    </>

    
  )
}

export default Taskform