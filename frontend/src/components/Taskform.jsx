import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { addTask } from '../redux/taskSlice.js';
import Cookies from 'js-cookie';

const Taskform = () => {

const [title,setTitle]=useState("");
const [description,setDescription]=useState("");
const [assignto,setAssignto]=useState("");
const [status,setStatus]=useState("");
const state=useSelector((state)=>state.user);
const dispatch=useDispatch();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const task={title,description,assignto,status};
        dispatch(addTask(task));
    }

  return (
    <>{state?.user?.user?.role==='admin'?
      <div className='flex flex-col justify-center items-center'>

    
    <form className='flex flex-col justify-center items-center gap-5 p-10 rounded-xl bg-gray-800 mt-15 w-200' onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold mb-6">Create-Task</h1>

        <input placeholder='Title'
         name='title'
         value={title}
         onChange={(e)=>setTitle(e.target.value)} 
         className='border-b-2 border-blue-300 w-70 h-10 rounded-xs focus:outline-none'>
         </input>

        <input placeholder='Discription' 
        name='description' 
        value={description}
        onChange={(e)=>setDescription(e.target.value)} 
        className='border-b-2 border-blue-300 h-10 w-70 rounded-xs focus:outline-none'>
        </input>

        <input placeholder='Assing To'
         name='assignto' 
         value={assignto}
         onChange={(e)=>setAssignto(e.target.value)} 
         className='border-b-2 border-blue-300 h-10 w-70 rounded-xs focus:outline-none'>
         </input>

        <input placeholder='Status' 
        name='status' 
        value={status}
        onChange={(e)=>setStatus(e.target.value)} 
        className='border-b-2 border-blue-300 h-10 w-70 rounded-xs focus:outline-none '>
        </input>
        <h4>Note:-For status only expecting <b>To-Do</b>, <b>In-process</b>, <b>Done</b> either of them</h4>
        <button className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded hover:cursor-pointer'>Create Task</button>
        
    </form>
      
            <Link className="text-blue-400 hover:underline italic mb-4 inline-block" to="/tasks">
              - Checkout-Assingn Tasks
            </Link>
</div>:
  <div>
    <h1 className="text-3xl font-bold mb-6">You are not authorised to create task only <b>Admin</b> can do..</h1>
    <Link className="text-blue-400 hover:underline italic mb-4 inline-block" to="/tasks">
              -- Back to DashBoard
    </Link>
  </div>
    } 
    
    
    </>

    
  )
}

export default Taskform