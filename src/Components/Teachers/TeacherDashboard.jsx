import { React} from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const TeacherDashboard = () => {

function BasicExample1() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://static.vecteezy.com/system/resources/previews/009/456/577/original/3d-illustration-time-schedule-png.png" />
      <Card.Body>
        <Card.Title>See Timetables</Card.Title>
        <Card.Text  className='mb-2'>
        You Can Find Your Class Time Table. With Enter Your Class Name And Division. You Can Edit And Delete Time Table.
        </Card.Text>
        <Link  to='/FindTimetable'><Button variant="primary">See Timetable</Button></Link>
     
      </Card.Body>
    </Card>
  );
}
function BasicExample2() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://static.vecteezy.com/system/resources/previews/014/627/492/original/3d-report-paper-clipboard-note-paper-for-checklist-notes-3d-illustration-png.png" />
      <Card.Body>
        <Card.Title>Send Notes for Students</Card.Title>
        <Card.Text className='mb-2'>
          You Can Send any Kind Of Notes For Students.
        </Card.Text>
        <Link to='/ProvideNotes'><Button variant="primary">Send Notes</Button></Link>
     
      </Card.Body>
    </Card>
  );
}
function BasicExample3() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://cdn3d.iconscout.com/3d/premium/thumb/login-9696585-7864618.png" />
      <Card.Body>
        <Card.Title>Create Student ID</Card.Title>
        <Card.Text className='mb-2'>
        You Can Create An Account For Students And Provide Them Login Id And Password.
        </Card.Text>
        <Link to='/CreateStudentLogin'><Button variant="primary">Create New Student Account</Button></Link>
      </Card.Body>
    </Card>
  );
}
  return (
    <>
    <div className='min-h-screen flex justify-evenly items-center'>
      {BasicExample1()}
      {BasicExample2()}
      {BasicExample3()}
      
    </div>
    </>
  )
}

export default TeacherDashboard