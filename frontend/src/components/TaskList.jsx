import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { changeStatus, deleteTask, getTasks } from '../redux/taskSlice.js'

const TaskList = () => {
 const [value,setValue]=useState(null);
 const {tasks} = useSelector((state) => state.task);
 const dispatch=useDispatch();

 const handleChange=(id,status)=>{
      setValue(value);
      dispatch(changeStatus({id,status}));
 }

 const handleDelete=(id)=>{
    dispatch(deleteTask(id));
 }
 
useEffect(()=>{
  const loadData=async()=>{
    dispatch(getTasks());
  }
  loadData()
},[value,tasks,deleteTask]);

  return (
    <>
    <div>Task Monitor</div>
    <ul>
      {tasks.map((item)=>(
        
        <li key={item._id} className='flex items-center gap-4'>
          <span className='text-blue-200'>{item.title}</span>
          <span>{item.description}</span>
          <span>{item.assignto}</span>
          <span>
          <select className='bg-black' value={value||item.status} onChange={(e)=>handleChange(item._id,e.target.value)}>
            <option value="todo">to do</option>
            <option value="done">Done</option>
            <option value="in progress">in progress</option>
          </select>
          </span>
          <span>
            {item.status=="done"?<button onClick={()=>handleDelete(item._id)}>Delete</button>:null}
          </span>
        </li>
      ))}
    </ul>
    <Link className='text-white hover:text-blue-300 italic' to="/">Create a new task</Link>
    </>
  )
}

export default TaskList