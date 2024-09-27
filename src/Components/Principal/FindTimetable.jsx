import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { Timetablecontext } from '../../Contexhook/TimeTablecontex';
import jwtDecode from 'jwt-decode';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // This will help with table creation


const FindTimetable = () => {
  const [FindTable, setFindTable] = useState({ Classname: "", Division: "" });
  const { timetable, setTimetable } = useContext(Timetablecontext)
  const [Tabledata, setTabledata] = useState([])
  const token=localStorage.getItem('token')
  const decoded=jwtDecode(token)

  useEffect(() => {
    const featchdata = async () => {
      const responce = await axios.get('http://localhost:3000/Findtable')
      setTabledata(responce.data)
    }
    featchdata();
  }, [])

  const Handleinput = (e) => {
    setFindTable({ ...FindTable, [e.target.name]: e.target.value })
  }
 
  
  const downloadPDF = () => {
    if (!timetable) {
      alert('No timetable available');
      return;
    }
  
    const doc = new jsPDF();
  
    // Add class details as text
    doc.text(`Class Name: ${timetable.Classinfo.Classname}`, 10, 10);
    doc.text(`Division: ${timetable.Classinfo.Division}`, 10, 20);
    doc.text(`Lecture Hall: ${timetable.Classinfo.Lecturehall}`, 10, 30);
    doc.text(`Created On: ${new Date(timetable.Createat).toLocaleString()}`, 10, 40);
  
    // Prepare the table headers
    const headers = [["Start Time", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]];
  
    // Prepare the table rows from the timetable data
    const rows = timetable.Timetable.map(row => row.map(cell => cell || 'Off Lecture'));
  
    // Use jsPDF AutoTable plugin to add the table
    doc.autoTable({
      head: headers,
      body: rows,
      startY: 50,  // Where the table should start
      theme: 'grid',
      styles: {
        halign: 'center', // Horizontal align all text to center
      },
    });
  
    // Save the PDF
    doc.save(`${timetable.Classinfo.Classname}-${timetable.Classinfo.Division}-Timetable.pdf`);
  };
  
  const FindTimeTable = async (e) => {

    const response = await axios.post('http://localhost:3000/FindTimetable', {
      FindTable: FindTable,
    });

    // Check the response data for the timetable or the message
    if (response.data && response.data.message === 'Timetable not found') {
      alert('Timetable Not Found');
    } else {
      setTimetable(response.data); // Assuming the timetable is found
    }

  }
  const Deletetable = async () => {
    const conformation=confirm("Are You Want to Delete This Timetable");
    if(conformation){
    try{

      const responce = await axios.post('http://localhost:3000/Deletetable', { timetable: timetable })
      if(responce.data==='Timetable Deleted'){
        alert("Timetable Delete")
      }
    }catch(err){
      alert("Server Error try Later")
    }
  }
  }
  return (
    <div className='h-[100vh] container mx-auto flex flex-col mt-5 '>
      <h3 className='text-center text-lg'>Select Class Name And Division</h3>
      <div className='flex justify-evenly items-center my-3 p-2 rounded-md border-solid border-orange-400'>
        <select
          className='border border-violet-400 p-1 rounded-md'
          name='Classname'
          value={FindTable.Classname}
          onChange={Handleinput}
        >
          <option value=''>Select class</option>
          {Tabledata.map((classItem) => (
            <option className='text-black' key={classItem._id} value={classItem.className}>
              {classItem.Classinfo.Classname}
            </option>
          ))}
        </select>

        <select
          className='border border-violet-400 p-1 rounded-md'
          name="Division"
          onChange={Handleinput}>
          <option value=''>Select Division</option>
          {Tabledata.map((Divisionitem) => (
            <option value={Divisionitem.Classinfo.Division} key={Divisionitem._id}>
              {Divisionitem.Classinfo.Division}
            </option>
          ))}
        </select>

        <button onClick={FindTimeTable} className='p-2 rounded-md bg-blue-400'>Find Timetable</button>
      </div>
      <div className='m-20'>
        {timetable && <div className='flex flex-col gap-8'>
          <div className='flex gap-6 items-center content-center'><span className='text-lg'>Class Name: {timetable.Classinfo.Classname} </span> <span className='text-lg'>Division: {timetable.Classinfo.Division} </span><span className='text-lg'>LectureHall: {timetable.Classinfo.Lecturehall}</span></div>
          <span>Time table Created on {new Date(timetable.Createat).toLocaleString()}</span>
          <table style={{ border: '1px solid black' }}>
            <thead>
              <tr> {/* First row to display days of the week */}
                <th style={{ border: '1px solid black', textAlign:'center', padding: '8px' }}>Start Time</th>
                <th style={{ border: '1px solid black', textAlign:'center', padding: '8px' }}>Monday</th>
                <th style={{ border: '1px solid black', textAlign:'center', padding: '8px' }}>Tuesday</th>
                <th style={{ border: '1px solid black', textAlign:'center', padding: '8px' }}>Wednesday</th>
                <th style={{ border: '1px solid black', textAlign:'center', padding: '8px' }}>Thursday</th>
                <th style={{ border: '1px solid black', textAlign:'center', padding: '8px' }}>Friday</th>
                <th style={{ border: '1px solid black', textAlign:'center', padding: '8px' }}>Saturday</th>
              </tr>
            </thead>
            {timetable.Timetable.map((Row, Rowindex) => (
              <tr key={Rowindex} style={{ border: '1px solid black', padding: '8px' }}>
                {Row.map((cell, colindex) => (
                  <td className=' border border-black text-center p-2 m-1' key={colindex}>
                    {cell?cell:(colindex===0?'No time Insert':'Off lecture')}
                  </td>
                ))}

              </tr>
            ))}
          </table>
          <div className='flex gap-3'>
            {decoded.role==="principal"&&(<><Link to='/EditTimeTable'><button className='p-2 bg-blue-400 rounded-md'>Edit Time Table</button></Link>
            <button onClick={Deletetable} className='p-2 bg-red-500 rounded-md'>Delete Time Table</button></>)
}
            <button onClick={downloadPDF} className='p-2 bg-green-500 rounded-md'>Download Timetable</button>

          </div>
        </div>
        }
      </div>
    </div>

  )
}

export default FindTimetable