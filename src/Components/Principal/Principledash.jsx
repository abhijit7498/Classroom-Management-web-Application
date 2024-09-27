import { React} from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Principledash = () => {


function BasicExample1() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://static.vecteezy.com/system/resources/previews/009/456/577/original/3d-illustration-time-schedule-png.png" />
      <Card.Body>
        <Card.Title>Create Timetable</Card.Title>
        <Card.Text  className='mb-2'>
          You Can Create Timetable For Any Class In Your School Or College And Share With Teachers And Students.
        </Card.Text>
        <Link  to='/Timetablegenerate'><Button variant="primary">Create Timetable</Button></Link>
     
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
function BasicExample3() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://cdn3d.iconscout.com/3d/premium/thumb/login-9696585-7864618.png" />
      <Card.Body>
        <Card.Title>Create Teacher Id</Card.Title>
        <Card.Text className='mb-2'>
        You Can Create An Account For Teachers And Provide Them Login Id And Password. Only Those Teacher can See Timetable.
        </Card.Text>
        <Link to='/CreateTeacherLogin'><Button variant="primary">Create New Teacher Account</Button></Link>
     
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

export default Principledash