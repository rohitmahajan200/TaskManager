import React from 'react'
import { Link } from 'react-router-dom'

const TaskList = () => {

  return (
    <>
    <div>Task Monitor</div>

    <Link className='text-white hover:text-blue-300 italic' to="/">Create a new task</Link>
    </>
  )
}

export default TaskList