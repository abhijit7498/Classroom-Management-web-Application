import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='container w-full mx-auto h-full flex items-center justify-center'>
      <div className='h-[100vh] flex justify-center items-center flex-col gap-5 max-w-full'>
           <Link to='/PrincipalLogin'><button className='text-white w-80 p-4 rounded-2xl bg-blue-600'>Login as Principle</button></Link> 
           <Link to='/TeacherLogin'><button className='text-white w-80 p-4 rounded-2xl bg-blue-600'>Login as Teacher</button></Link>
           <Link to='/StudentLogin'><button className='text-white w-80 p-4 rounded-2xl bg-blue-600'>Login as Student</button></Link> 
    </div>
    </div>
  )
}

export default Home