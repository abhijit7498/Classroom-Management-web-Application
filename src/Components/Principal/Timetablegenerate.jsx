import axios from 'axios';
import React from 'react';
import { useState } from 'react';

const Timetablegenerate = () => {
  const [lecturevalue, setlecturevalue] = useState(''); // get value from user to show the lecture
  const [Tablegenerate, setTablegenerate] = useState([]); // to set value for table creation
  const [tablevisiblity, settablevisiblity] = useState(false);
  const [Classinfo, setClassinfo] = useState({ Classname: '', Division: '', Lecturehall: '' })//to Store information of class
  const createtable = () => {
    if (lecturevalue > 0 && lecturevalue <= 20) { // To confirm user enters a value greater than 0.
      const initialTable = Array.from({ length: lecturevalue }, () =>
        Array(7).fill('') // Create a 2D array with empty strings
      );
      setTablegenerate(initialTable); // Initialize the table state with empty values
      settablevisiblity(true);
    } else {
      alert('Enter number more than 1 or less than 20');
    }
  };

  // Store value in lecturevalue
  const handlelecturevalue = (e) => {
    let value = e.target.value;
    let lecturevalue = parseInt(value, 10); // Parse float into integer 
    setlecturevalue(lecturevalue > 0 ? lecturevalue : 0); // If value greater than 0, add; otherwise, set 0.
  };

  const setinputdata = (e, rowindex, colindex) => {
    const value = e.target.value;
    const newTablegenerate = [...Tablegenerate]; // Copy the existing table data

    // Update the specific cell
    newTablegenerate[rowindex][colindex] = value;

    // Update the state with the new data
    setTablegenerate(newTablegenerate);
  };

  const addrow = () => {
    setTablegenerate([...Tablegenerate, Array(7).fill('')]); // Add a new empty row
  };

  const deleterow = () => {
    let deleterow = Tablegenerate.slice(0, -1); // To delete the last row
    setTablegenerate(deleterow); // Update the state to show in the table
  };

  const handleclassinputs = (e) => {
    setClassinfo({ ...Classinfo, [e.target.name]: e.target.value })
  }

  // <-----backend------>
  const senddata = async () => {
    // try {
    const response = await axios.post('http://localhost:3000/CreateTimetable', {
      Classinfo: Classinfo,
      Timetable: Tablegenerate
    });

    // Handle success and error messages based on the response
    if (response.data.message === 'Timetable saved successfully') {
      alert("Timetable saved successfully");
    } else if (response.data.message === 'Classname And Division is required') {
      alert('Classname And Division Fields Are required')
    } else if (response.data.message === 'Classname is required') {
      alert("Please fill in the Classname field");
    } else if (response.data.message === 'Division is required') {
      alert("Please fill Division field");
    } else if (response.data.message === 'Timetable already exists')
      alert("Time Table Already exist Edit Or delete It First")

  };


  return (
    <>
      <div className='w-full container mx-auto flex justify-center items-center h-[100vh]'>
        {!tablevisiblity && (
          <div className='flex justify-center items-center gap-3'>
            <input
              className='border border-blue-400 px-4 py-3 w-72 rounded-lg '
              type="number"
              onChange={handlelecturevalue} // To input lecture value
              placeholder="No. of lectures in a day."
            />
            <button className='p-2 bg-blue-500 w-40 rounded-lg' onClick={createtable}>GENERATE TABLE</button>
          </div>
        )}
        {tablevisiblity && (
          <div>
            <div className='w-1/2 flex justify-between items-center'>
              <input required type="text"
                className=' p-1 rounded-md border-[2px] border-blue-400'
                onChange={handleclassinputs}
                name="Classname"
                value={Classinfo.Classname}
                placeholder='Enter Class Name' />

              <select onChange={handleclassinputs} name="Division" className=' p-1.5 rounded-md border-[2px] border-blue-400'>
                <option value="">Select Division</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>

              </select>
              <input required
                className=' p-1 rounded-md border-[2px] border-blue-400'
                type="text"
                placeholder='Lecture Hall Number'
                name="Lecturehall"
                value={Classinfo.Lecturehall}
                onChange={handleclassinputs}
              />


            </div>
            <table style={{ border: '1px solid black' }} className='my-3'>
              <thead>
                <tr> {/* First row to display days of the week */}
                  <th style={{ border: '1px solid black', padding: '8px' }}>Start Time</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Monday</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Tuesday</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Wednesday</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Thursday</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Friday</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Saturday</th>
                </tr>
              </thead>
              <tbody>
                {Tablegenerate.map((row, rowindex) => (
                  <tr key={rowindex}>
                    {row.map((cell, colindex) => (
                      <td key={colindex} style={{ border: '1px solid black', padding: '8px' }}>
                        <input
                          className='p-1 rounded-md border-[2px] border-slate-400'
                          type={colindex === 0 ? 'time' : 'text'}
                          placeholder={`Enter ${rowindex + 1} Subject `}
                          value={cell}
                          onChange={(e) => setinputdata(e, rowindex, colindex)}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <div className='flex justify-between items-center my-3'>
              <div className=' flex gap-3'>
                <button className='px-2 py-1 rounded-lg bg-green-600 text-white' onClick={addrow}>Add row</button>
                <button className='px-2 py-1 rounded-lg bg-red-500 text-white' onClick={deleterow}>Delete row</button>
              </div>
              <button className='px-2 py-1 rounded-lg bg-blue-500 mr-1 text-white' onClick={senddata}>SAVE TIMETABLE</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Timetablegenerate;
