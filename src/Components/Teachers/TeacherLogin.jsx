import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const TeacherLogin = () => {
  const Navigate=useNavigate();

  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');

  useEffect(() => {
    const render=localStorage.getItem('token')
    if(render){
        Navigate('/Teacherdash')
    }
}, [Navigate])

  const Finduser = async (e) => {
    e.preventDefault();
    try {
      const responce = await axios.post('https://classroom-management-web-application-1.onrender.com/Teacherlogin', { Username: Username, Password: Password });
      if (responce.data.message === "User Exist") {
        const token=responce.data.token;
        localStorage.setItem("token",token)
        localStorage.setItem('Username',Username)
        Navigate('/Teacherdash')
      } else if (responce.data === "Invalid Username") {
        alert("Enter Valid Username");
      } else if (responce.data === "Invalid Password") {
        alert("Invalid Password")
      }
    } catch (err) {
      alert("Server Error Try Later",(err));
    }
  }
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Teacher Login
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={Finduser}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setUsername(e.target.value)}

              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setPassword(e.target.value)}

              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Login
            </button>
          </div>
        </form>

      </div>
    </div>

  )
}

export default TeacherLogin