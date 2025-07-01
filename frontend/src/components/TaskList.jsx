import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const TaskList = () => {
 const {tasks} = useSelector((state) => state.task);

  return (
    <>
    <div>Task Monitor</div>
    <ul>
      {tasks.map((item)=>(
        <li key={item.title} className='flex items-center gap-4'>
          <span className='text-blue-200'>{item.title}</span>
          <span>{item.description}</span>
          <span>{item.assignto}</span>
          <span>
          <select className='bg-black'>
            <option defaultChecked>{item.status}</option>
            <option>Done</option>
            <option>In Process</option>
            <option>Pending</option>
          </select>
          </span>
        </li>
      ))}
    </ul>
    <Link className='text-white hover:text-blue-300 italic' to="/">Create a new task</Link>
    </>
  )
}

export default TaskList