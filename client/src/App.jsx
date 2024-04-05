import { useState } from 'react'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Sidebar from './pages/Sidebar'
import Dashboard from './pages/Dashboard'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Transaction from './pages/Transaction'
import Setting from './pages/Setting'
import Profile from './pages/Profile'
const Layout=()=>{
  return(
    <div className='flex'>
      <Sidebar/>
      <div  className='ml-5 mt-3 w-full p-4'>
      <Outlet />
      </div>
    </div>
  )
}
function App() {
  const router=createBrowserRouter(
    [
      {
        path:'/',
        element:<Layout/>,
        children:[
          {
            path:'/:username',
            element:<Dashboard/>
          }
          ,
          {
            path:'/transcations',
            element:<Transaction/>
          },
          {
            path:'/settings',
            element:<Setting/>
          }
          ,
          {
            path:'/profile',
            element:<Profile/>
          }
        ]
      },
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:'/signup',
        element:<Signup/>
      }
    ]
  )
  return (
    <div>
    <RouterProvider router={router} />
    </div>
  )
}

export default App
