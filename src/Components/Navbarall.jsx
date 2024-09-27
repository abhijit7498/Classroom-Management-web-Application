import React from 'react'
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

const Navbarall = () => {
  const navigate = useNavigate()
  const logoutuser = () => {
    const conformation=confirm('Are You Sure About Logout')
    {conformation? localStorage.removeItem('token')||localStorage.removeItem('Username')||navigate('/'):""}

  }
  const TextLinkExample = () => {
    return (
      <Navbar className="bg-blue-200 ">
        <Container>
          <Navbar.Brand>Classroom & Timetable Generator</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text className='flex'>
              {localStorage.getItem('Username')?<p className='bg-pink-400 rounded-xl px-2 py-0.5 w-[22rem] mr-3 text-white '>Well Come... {localStorage.getItem('Username')}</p>:""}
              {localStorage.getItem('token') ? <button onClick={logoutuser} className='bg-blue-500 py-1 px-3 rounded-md mr-2 text-white'>Log Out</button> : <p className='bg-pink-400 rounded-xl px-2 py-0.5 w-[15rem] mr-3 text-white '>Well Come ...</p>}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
  return (
    <div className='sticky top-0'>{TextLinkExample()}</div>
  )
}

export default Navbarall