import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Taskform from "./components/Taskform.jsx"
import TaskList from "./components/TaskList.jsx"

function App() {
  const router=createBrowserRouter([
    {
      path:"/",
      element:<Taskform />,
    },
    {
      path:"/tasks",
      element:<TaskList />
    }
  ]);
  return (
    <>
    <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
