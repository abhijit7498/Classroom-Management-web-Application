import React from 'react'
import { Navigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
const Protectingrouts = ({ children ,allowedRoles }) => {
    const token = localStorage.getItem('token')
    if (!token) {
        return <Navigate to='/' />
    }

    try {
        const decodedToken = jwtDecode(token)
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
            localStorage.removeItem('token');
            return <Navigate to='/' />
        }
        
        if (allowedRoles.includes(decodedToken.role)) {
            return children

        }

    } catch (err) {
        localStorage.removeItem('token');
        return <Navigate to='/' />
    }
}

export default Protectingrouts