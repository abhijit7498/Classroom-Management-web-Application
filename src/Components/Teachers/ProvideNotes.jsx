import axios from 'axios'
import { React, useState, useEffect } from 'react'

const ProvideNotes = () => {
    const [Storedata, setStoredata] = useState({ Classname: '', Division: '', Subject: '', Textinfo: '', Title: '' })
    const [file, setFile] = useState(null);

    const Handleinput = (e) => {
        setStoredata({ ...Storedata, [e.target.name]: e.target.value })

    }
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const Uploadnotes = async (e) => {
        e.preventDefault();
            try {
                const formData = new FormData();
                formData.append('Classname', Storedata.Classname);
                formData.append('Division', Storedata.Division);
                formData.append('Subject', Storedata.Subject);
                formData.append('Textinfo', Storedata.Textinfo);
                formData.append('Title', Storedata.Title);
                formData.append('file', file); // Add file to the form data

                const response = await axios.post('http://localhost:3000/ProvideNotes', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                if (response.data === 'Upload True') {
                    alert("Upload Succesfully")
                }
            } catch (err) {
                alert("Server Error")
            }
    }
    return (
        <div className='min-h-screen flex items-center justify-center container mx-auto flex-col'>
            <h3 className='mb-3 text-xl'>Provide Notes For Students</h3>
            <div className='min-h-[30rem] bg-slate-200 min-w-[35rem] rounded-xl container mx-auto'>
                <form onSubmit={Uploadnotes}>
                    <p className='text-base m-3'>Share Notes</p>
                    <div className='flex justify-start gap-1 items-center m-2'>
                        <input required type="text" name='Classname' value={Storedata.Classname} className=' h-9 rounded-md p-2' style={{ border: '1px solid blue' }} placeholder='Enter Class Name' onChange={Handleinput} />
                        <input required type="text" name='Division' value={Storedata.Division} className=' h-9 rounded-md p-2' style={{ border: '1px solid blue' }} placeholder='Enter Division' onChange={Handleinput} />
                        <input required type="text" name='Subject' value={Storedata.Subject} className=' h-9 rounded-md p-2' style={{ border: '1px solid blue' }} placeholder='Enter Subject' onChange={Handleinput} />

                    </div>
                    <div className='min-h-[23rem] bg-slate-50 m-4 rounded-xl flex flex-col justify-between'>
                        <textarea

                            onChange={Handleinput}
                            placeholder='Write notes ,Upload Links,Upload Document'
                            className='bg-white p-3 rounded-xl'
                            style={{ border: '1px solid black' }}
                            name='Textinfo'
                            value={Storedata.Textinfo}
                            id=""
                            cols="30"
                            rows="10">

                        </textarea>
                        <div className='flex justify-end items-center mb-2'>
                            <input type="file" onChange={handleFileChange} />

                        </div>

                    </div>
                    <div className='flex justify-around items-center p-3'>
                        <input type="text"
                            required
                            onChange={Handleinput}
                            name='Title'
                            value={Storedata.Massage}
                            className='h-10 w-[40rem] rounded-xl p-2'
                            placeholder='Title' />
                        <button type='submit' className='p-2.5 rounded-full bg-green-500'>Upload</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default ProvideNotes