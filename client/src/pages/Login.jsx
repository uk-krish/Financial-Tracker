import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  // Navigator
   const navigate = useNavigate()
  const [UserDetails, setUserDetails] = useState({
    email: '',
    password: ''
  })

  const HandleSumbit = async (e) => {
    e.preventDefault()
   try {
    const response = await axios.post('http://localhost:8080/api/user/login', UserDetails,{
      withCredentials:true
    })
    console.log(response.data)
    localStorage.setItem('User', JSON.stringify(response.data.user))
    if (response.status === 200) {
      navigate(`/${response.data.user.username}`)
    }
   } 
   catch (error) {
    console.log(error.response.data.message);
   }
  }

  return (
    <div className='text-white h-screen w-screen bg_login'>
      <div className='container  rounded-md shadow-lg '>
        <div className='flex mx-auto flex-col justify-center items-center' >
          <img className='w-14 mb-5' src={logo} alt="" />
          <h1 className='text-3xl font-bold text-center'>WELCOME BACK</h1>
          <p className='text-[14px] text-center mb-5'>Login to your account</p>
        </div>
        <form action="" method="post"
        >
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter email</label>
            <input
              type="email" id="email" className=" border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 
            focus:outline-none focus:border-blue-500"
              placeholder="email"
              required
              onChange={(e) => setUserDetails({ ...UserDetails, email: e.target.value })}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter password</label>
            <input type="password" id="password" className=" border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 
            focus:outline-none focus:border-blue-500"
              placeholder="password"
              required
              onChange={(e) => setUserDetails({ ...UserDetails, password: e.target.value })}
            />
          </div>
          <div>
            <div className='w-full mx-auto flex justify-center'>
              <input
                type="submit"
                value="Login"
                onClick={HandleSumbit}
                className="bg-[#5c85e7] text-white p-3 w-28 rounded-lg justify-center hover:bg-[#064aae] cursor-pointer"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
