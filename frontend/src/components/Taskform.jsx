import React from 'react'
import { Link } from 'react-router-dom';
const Taskform = () => {
    const handleSubmit=(e)=>{
        e.preventDefault();
    }
  return (
    <>    
    <form className='flex flex-col justify-center items-center gap-5' onSubmit={()=>handleSubmit()}>
        <div>Create-Task</div>
        <input placeholder='Title' name='title' className='border-2 border-blue-300 w-70 h-10 rounded-xs'></input>
        <input placeholder='Discription' name='discription' className='border-2 border-blue-300 h-10 w-70 rounded-xs'></input>
        <input placeholder='Assing To' name='assignto' className='border-2 border-blue-300 h-10 w-70 rounded-xs'></input>
        <input placeholder='Status' name='status' className='border-2 border-blue-300 h-10 w-70 rounded-xs'></input>
        <button className='bg-blue-400 text-black w-30 rounded-xl hover:cursor-pointer'>Create Task</button>
        <Link className='text-white hover:text-blue-300 italic' to="/tasks">Checkout-Assingn Tasks</Link>
    </form>

    
    </>

    
  )
}

export default Taskform