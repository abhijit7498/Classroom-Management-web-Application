import React, { useContext } from 'react'
import { Timetablecontext } from '../../Contexhook/TimeTablecontex'
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditTimeTable = (e) => {
  const { timetable, setTimetable } = useContext(Timetablecontext);
  const navigate = useNavigate()

  const Handlevalues = (e, rowindex, colindex) => {

    // Make a shallow copy of the existing state object
    const updatedTimetable = { ...timetable };
    // Update the specific cell in the Timetable array
    updatedTimetable.Timetable[rowindex][colindex] = e.target.value;

    // Set the updated state with the new Timetable
    setTimetable(updatedTimetable);
  }
  const Handleclassvalues = (e) => {
    const {name ,value}=e.target;

   let updateclassinfo={...timetable};
   updateclassinfo.Classinfo[name]=value;
   setTimetable(updateclassinfo)
    
  }
  const Updatetimetable = async () => {
    let responce = await axios.post('http://localhost:3000/Update', { timetable: timetable, id: timetable._id });
  }

  const addrow=()=>{
    const addrow={...timetable};
    addrow.Timetable=[...addrow.Timetable,Array(7).fill('')]
    setTimetable(addrow)
  }
  const deleterow=()=>{
    const deleterow={...timetable};
    deleterow.Timetable=deleterow.Timetable.slice(0,-1);
    setTimetable(deleterow)
  }
  return (
    <div className='min-h-screen flex justify-center items-center flex-col'>
      <h3 className='text-xl'>EDIT TIMETABLE</h3>
      <div className='my-7'>
        {timetable && <div><div>
          <div className='w-1/2 flex justify-between items-center'>
            <input type="text"
              onChange={Handleclassvalues}
              value={timetable.Classinfo.Classname}
              name="Classname"
              className=' p-1 rounded-md border-[2px] border-blue-400'
              placeholder='Enter Class Name' />

            <select onChange={Handleclassvalues} value={timetable.Classinfo.Division} name='Division' className=' p-1 rounded-md border-[2px] border-blue-400'>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
            </select>

            <input type="text" 
            value={timetable.Classinfo.Lecturehall}
            name='Lecturehall'
            onChange={Handleclassvalues}
            placeholder='Enter Lecture hall'
             className=' p-1 rounded-md border-[2px] border-blue-400'
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
              {
                timetable.Timetable.map((arr, rowindex) => (
                  <tr key={rowindex}>
                    {arr.map((cell, colindex) => (
                      <td key={colindex} style={{ border: '1px solid black', padding: '8px' }}>
                        <input type={colindex == 0 ? "time" : "text"}
                          value={cell}
                          className='p-1 rounded-md border-[2px] border-slate-400'
                          onChange={(e) => Handlevalues(e, rowindex, colindex)}
                        />
                      </td>
                    ))}
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
          <div className='flex items-center justify-between'>
          <div className=' flex gap-3'>
                <button className='px-2 py-1 rounded-lg bg-green-600 text-white' onClick={addrow}>Add row</button>
                <button className='px-2 py-1 rounded-lg bg-red-500 text-white' onClick={deleterow}>Delete row</button>
              </div>
              <div className='flex gap-2'>
            <button className='p-2 bg-green-500 rounded-lg' onClick={Updatetimetable} >Update</button>
            <button className='p-2 bg-red-400 rounded-lg' onClick={() => { navigate('/FindTimeTable') }}>Cancel</button>
          </div>
          </div>
        </div>}

      </div>
    </div>
  )
}

export default EditTimeTable