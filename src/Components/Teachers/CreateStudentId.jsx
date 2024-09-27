import axios from 'axios';
import React, { useState } from 'react'


const CreateStudentId = () => {
    const [Studentinfo, setStudentinfo] = useState({ Username: "", Password: "", Classname: "", Division: "", StudentId: "" });

    const Handleinputs = (e) => {
        setStudentinfo({ ...Studentinfo, [e.target.name]: e.target.value })
    }
    const CreateUser = async (e) => {
        try {
            e.preventDefault();
            const token = localStorage.getItem('token')
            let responce = await axios.post('http://localhost:3000/CreateStudentId', {
                 Username: Studentinfo.Username, Password: Studentinfo.Password, Classname: Studentinfo.Classname, Division: Studentinfo.Division, StudentId: Studentinfo.StudentId 
            })
            if (responce.data === "User Exist") {
                alert("User Already Exist")
            } else if (responce.data === "User Created") {
                alert("User Created Successfully")
            }
        } catch (err) {
            alert("Server Error Try Later");
        }
    }
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 pt-2 pb-20 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Create Student Login Id
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={CreateUser} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Username
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="Username"
                                type="email"
                                value={Studentinfo.Username}
                                required
                                autoComplete="email"
                                placeholder='Enter Username'
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={Handleinputs}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>

                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="Password"
                                type="password"
                                value={Studentinfo.Password}
                                required
                                placeholder='Enter Password'
                                autoComplete="current-password"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={Handleinputs}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="Classname" className="block text-sm font-medium leading-6 text-gray-900">
                                Classname
                            </label>

                        </div>
                        <div className="mt-2">
                            <input
                                id="Classname"
                                name="Classname"
                                type="text"
                                value={Studentinfo.Classname}
                                required
                                placeholder='Enter Classname'
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={Handleinputs}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="Division" className="block text-sm font-medium leading-6 text-gray-900">
                                Division
                            </label>

                        </div>
                        <div className="mt-2">
                            <input
                                id="Division"
                                name="Division"
                                type="text"
                                value={Studentinfo.Division}
                                required
                                placeholder='Enter Division'
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={Handleinputs}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="StudentId" className="block text-sm font-medium leading-6 text-gray-900">
                                Student Id
                            </label>

                        </div>
                        <div className="mt-2">
                            <input
                                id="StudentId"
                                name="StudentId"
                                type="text"
                                value={Studentinfo.StudentId}
                                required
                                placeholder='Enter Student Id'
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={Handleinputs}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Create
                        </button>
                    </div>
                </form>


            </div>
        </div>
    )
}

export default CreateStudentId