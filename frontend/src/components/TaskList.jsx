import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { changeStatus, deleteTask, getTasks } from '../redux/taskSlice.js'
import Filter from './Filter.jsx'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'
import { logout } from '../redux/userSlice.js'

const TaskList = () => {
  const { tasks } = useSelector((state) => state.task);
  const dispatch = useDispatch();
  const state=useSelector((state)=>state.user);
  const navigate=useNavigate();
  
  const handleChange = (id, status) => {
    dispatch(changeStatus({ id, status }));
  };
  
  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleLogoutFn=async()=>{
    dispatch(logout());
    navigate('/');
  }

  useEffect(() => {
    dispatch(getTasks());
  }, [deleteTask]);

  return (
    <>{state.user.success?
      <div className="p-6 text-white bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Task Monitor</h1>
      <button onClick={handleLogoutFn} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded hover:cursor-pointer">Logout</button>
      <div className='flex justify-end align-top'>
        
        <div className=''>
          <Filter />
        </div>
      </div>      

  
      <Link className="text-blue-400 hover:underline italic mb-4 inline-block" to="/create">
        + Create a new task
      </Link>

      
      
      <div className="grid grid-cols-5 font-semibold text-lg border-b border-gray-700 pb-2 mb-2">
        <span>Task</span>
        <span>Description</span>
        <span>Assigned To</span>
        <span>Status</span>
        <span>Action</span>
      </div>

      <ul className="space-y-4">
        {tasks.map((item) => (
          <li key={item._id} className="grid grid-cols-5 items-center gap-4 p-3 bg-gray-800 rounded-md shadow hover:bg-gray-700 transition">
            <span className="text-blue-200 break-words">{item.title}</span>
            <span className="break-words">{item.description}</span>
            <span className="italic">{item.assignto}</span>
            <span>
              <select
                className="bg-gray-700 border border-gray-600 rounded px-2 py-1 focus:outline-none hover:cursor-pointer"
                value={item.status}
                onChange={(e) => handleChange(item._id, e.target.value)}
              >
                <option value="to-do">To-Do</option>
                <option value="in-process">In-Process</option>
                <option value="done">Done</option>
              </select>
            </span>
            <span>
              
              {item.status === 'done' && state.user.data.role==='admin'?
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded hover:cursor-pointer"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>:<span >Only admin can remove task after status is <b>Done</b></span>
              }
            </span>
          </li>
        ))}
      </ul>
    </div>
      :<>
      <h1 className="text-3xl font-bold mb-6">Please Login First To see assing tasks</h1>
      <Link className="text-blue-400 hover:underline italic mb-4 inline-block" to="/">
        + Click To Login
      </Link>
      </>
      }
    </>
    
  );
};

export default TaskList;
