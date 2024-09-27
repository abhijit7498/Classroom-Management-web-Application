import React, { useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const StudentLogin = () => {
  const navigate=useNavigate();
  useEffect(() => {
    const render=localStorage.getItem('token')
    if(render){
        navigate('/StudentDash')
    }
}, [navigate])
  const [Studentinfo, setStudentinfo] = useState({Username: "", Password: ""})
  const Handleinputs = (e) => {
    setStudentinfo({ ...Studentinfo, [e.target.name]: e.target.value })
}
const StudentValid = async (e) => {
  try {
      e.preventDefault();
      let responce = await axios.post('http://localhost:3000/StudentValidation', { Username: Studentinfo.Username, Password: Studentinfo.Password});
      if (responce.data.message === "User True") {
        localStorage.setItem('token',responce.data.token)
        localStorage.setItem('Username',Studentinfo.Username)
        navigate('/StudentDash')
      } else if (responce.data === "Invalid Password") {
          alert("Invalid Password")
      }else if(responce.data==="User False"){
        alert("No Student Found Contact Your Teacher")
      }
  } catch (err) {
      alert("Server Error Try Later",err);
  }
}
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">

        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
         Student Login 
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={StudentValid} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Username
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="Username"
                type="email"
                value={Studentinfo.Username}
                required
                autoComplete="email"
                placeholder='Enter Username'
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={Handleinputs}
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
                name="Password"
                type="password"
                value={Studentinfo.Password}
                required
                placeholder='Enter Password'
                autoComplete="current-password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={Handleinputs}
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

      export default StudentLogin