import Home from './Components/Home'
import { Routes, Route, useLocation } from 'react-router-dom'
import Principledash from './Components/Principal/Principledash'
import Timetablegenerate from './Components/Principal/Timetablegenerate'
import FindTimetable from './Components/Principal/FindTimetable'
import PrincipalLogin from './Components/Principal/PrincipalLogin'
import EditTimeTable from './Components/Principal/EditTimeTable'
import { Timetableprovider } from './Contexhook/TimeTablecontex'
import Navbarall from './Components/Navbarall'
import CreateTeachersLogin from './Components/Principal/CreateTeachersLogin'
import TeacherLogin from './Components/Teachers/TeacherLogin'
import TeacherDashboard from './Components/Teachers/TeacherDashboard'
import CreateStudentId from './Components/Teachers/CreateStudentId'
import ProvideNotes from './Components/Teachers/ProvideNotes'
import Studentdash from './Components/Students/Studentdash'
import StudentLogin from './Components/Students/StudentLogin'
import Studentshownotes from './Components/Students/Studentshownotes'
import Protectingrouts from './Protectingroute/Protectingrouts'
import Footer from './Components/Footer'

function App() {
  const location =useLocation()
  const allrouts=['/TeacherLogin','/PrincipalLogin','/StudentLogin']
  return (
    <>
    {!allrouts.includes(location.pathname)&&<Navbarall/>}
    
      <Timetableprovider>
          <Routes>
            <Route path='/' element={<Home />} />
           <Route path='/TeacherLogin' element={<TeacherLogin />} />
           <Route path='/PrincipalLogin' element={<PrincipalLogin />} />
            <Route path='/StudentLogin' element={<StudentLogin />} />
    {/* Principal uses Routes */}
            <Route path='/Principledash' element={
              <Protectingrouts allowedRoles={['principal']}>
                <Principledash />
              </Protectingrouts>
            } />
            <Route path='/Timetablegenerate' element={
              <Protectingrouts allowedRoles={['principal']}>
                <Timetablegenerate />
              </Protectingrouts>
            } />
            <Route path='/FindTimetable' element={
              <Protectingrouts allowedRoles={['principal','teacher','student']}>
                <FindTimetable />
              </Protectingrouts>} />

            <Route path='/EditTimeTable' element={
              <Protectingrouts allowedRoles={['principal']}>
                <EditTimeTable />
              </Protectingrouts>

            } />
            <Route path='/CreateTeacherLogin' element={
              <Protectingrouts allowedRoles={['principal']}>
                <CreateTeachersLogin />
              </Protectingrouts>
            } />

{/* Teacher uses Routes  */}
            <Route path='/Teacherdash' element={
              <Protectingrouts allowedRoles={['teacher']}>
                <TeacherDashboard />
               </Protectingrouts>

            } />
            <Route path='/CreateStudentLogin' element={
              <Protectingrouts allowedRoles={['teacher']}>
                <CreateStudentId />
              </Protectingrouts>
            } />
            <Route path='/ProvideNotes'
              element={
                <Protectingrouts allowedRoles={['teacher']}>
                  <ProvideNotes />
                </Protectingrouts>
              } />
            
            {/* student uses Routes */}
            <Route path='/StudentDash' element={
              <Protectingrouts allowedRoles={['student']}>

                <Studentdash />
              </Protectingrouts>

            } />
            <Route path='/Notes' element={
              <Protectingrouts allowedRoles={['student']}>

                <Studentshownotes />
              </Protectingrouts>

            } />
          </Routes>
          <Footer/>
      </Timetableprovider>
    </>
  )
}

export default App
