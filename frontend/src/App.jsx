import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Taskform from "./components/Taskform.jsx"
import TaskList from "./components/TaskList.jsx"
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";

function App() {
  const router=createBrowserRouter([
    {
      path:"/create",
      element:<Taskform />,
    },
    {
      path:"/tasks",
      element:<TaskList />
    },
    {
      path:"/",
      element:<Login />
    },
    {
      path:"/register",
      element:<Register />
    }
  ]);
  return (
    <>
    <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
