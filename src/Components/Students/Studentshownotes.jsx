import axios from 'axios';
import { React, useEffect, useState } from 'react'

const Studentshownotes = () => {
    const [Alldata, setAlldata] = useState(null)
    useEffect(() => {
        getpdf();

    }, [])

    const getpdf = async () => {
        const responce = await axios.post('http://localhost:3000/getNotes',{Username:localStorage.getItem('Username')});

        setAlldata(responce.data.data)
    }
    const Showpdf=async(pdf)=>{
            window.open(`http://localhost:3000/Files/${pdf}`,"_blank","noreferrer")
    }
    return (
        <div className='grid grid-cols-5 gap-4 m-4'>
            {Alldata===null?"":
            Alldata.map((info,index) => {
                return (
                  <div key={index} className='border border-black p-2 rounded-lg'>
                    <div className='flex flex-col gap-2 my-3 '>
                      <div>
                        Class: {info.Classname}
                       </div>
                       <div> Title: {info.Title}</div>
                       <span>Shared on : {new Date(info.CreatedAt).toLocaleString()}</span>

                      <div className='border border-black  h-[35vh] p-1 overflow-auto'>

                       {info.Textinfo}
                    </div>
                    {info.pdf?
                        <button className='bg-blue-500 p-2 rounded-xl' onClick={(e)=>Showpdf(info.pdf)}>SEE Document</button>
                        :""
                    }
                      </div>
            </div>
                )
            })}
            </div>
           
    )
}

export default Studentshownotes