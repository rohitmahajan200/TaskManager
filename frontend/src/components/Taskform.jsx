import React from 'react'

const Taskform = () => {
    const handleSubmit=()=>{
        
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
    </form>
    </>
    
  )
}

export default Taskform