import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const PrincipalLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const Navigate=useNavigate();

    useEffect(() => {
        const render=localStorage.getItem('token');
        if(render){
            Navigate('/Principledash')
        }
    }, [Navigate])
    

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the page from refreshing on form submission

        try{

            // Send a POST request to the server with the username and password
            const response = await axios.post('http://localhost:3000/PrincipalLogin', { 
                Username: username, 
                Password: password 
            });

            // Handle the server response
            if (response.data.message === "User authenticated successfully") {
                const token =response.data.token;
                localStorage.setItem('token',token)
                localStorage.setItem('Username',username)
                Navigate('/Principledash');
            } else if (response.data === "Invalid Password") {
                alert("Invalid Password ,To Get a User Name And Password Contact Your Developer");
            } else if (response.data === "User does not exist") {
                alert("User does not exist ,To Get a User Name And Password Contact Your Developer");
            }
        }catch(err){
            alert("server error Try Later")
            console.log(err)
        }
        
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form 
                onSubmit={handleSubmit} 
                className="w-full max-w-sm bg-white p-8 rounded shadow-lg"
                >
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800"> Principal Login</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input 
                        id="username"
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                        className="w-full px-3 py-2 border rounded text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input 
                        id="password"
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        className="w-full px-3 py-2 border rounded text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
                    />
                </div>
                <button 
                    type="submit" 
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default PrincipalLogin;
