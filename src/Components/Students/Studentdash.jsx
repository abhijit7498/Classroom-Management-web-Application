import React from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Studentdash = () => {
  
function BasicExample1() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://static.vecteezy.com/system/resources/previews/014/627/492/original/3d-report-paper-clipboard-note-paper-for-checklist-notes-3d-illustration-png.png" />
      <Card.Body>
        <Card.Title>Notes</Card.Title>
        <Card.Text  className='mb-2'>
          You Can See Your All Notes Here That Your Teachers Provide for Your Class.
        </Card.Text>
        <Link  to='/Notes'><Button variant="primary">Create Timetable</Button></Link>
     
      </Card.Body>
    </Card>
  );
}
function BasicExample2() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://cdn4.iconfinder.com/data/icons/business-1638/512/time_management.png" />
      <Card.Body>
        <Card.Title>Show Timetable</Card.Title>
        <Card.Text className='mb-2'>
          You Can Find Your Class Time Table. With Enter Your Class Name And Division. You Can Edit And Delete Time Table.
        </Card.Text>
        <Link to='/FindTimetable'><Button variant="primary">See Timetable</Button></Link>
     
      </Card.Body>
    </Card>
  );
}
  return (
    <div className='min-h-screen flex justify-evenly items-center'>
        
    {BasicExample1()}
    {BasicExample2()}    
  </div>
  )
}

export default Studentdash