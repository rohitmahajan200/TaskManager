import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFilterTasks } from '../redux/taskSlice';

const Filter = () => {
  const { tasks } = useSelector((state) => state.task);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [status, setStatus] = useState('');

  const handleNameFilter = (e) => {
    const val = e.target.value;
    setName(val);
    dispatch(getFilterTasks(val));
  };

  const handleStatusFilter = (e) => {
    const val = e.target.value;
    setStatus(val);
    dispatch(getFilterTasks(val));
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md text-white space-y-4 mb-2 w-80">
      <h3 className="text-xl font-semibold mb-2">Filter Tasks</h3>

{/* Filter by name */}
  
      <div>
        <label className="block mb-1 font-medium">Filter by Assigned To:</label>
        <input
          list="list"
          value={name}
          onChange={handleNameFilter}
          placeholder="Select or type a name"
          className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-400"
        />
        <datalist id="list">
          {tasks.map((item) => (
            <option key={item._id}>{item.assignto}</option>
          ))}
        </datalist>
      </div>

      {/* Filter by status */}
      <div>
        <label className="block mb-1 font-medium">Filter by Status:</label>
        <select
          value={status}
          onChange={handleStatusFilter}
          className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-400"
        >
          <option value="">-- Select Status --</option>
          <option value="done">Done</option>
          <option value="to-do">To-Do</option>
          <option value="in-process">In-Process</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
