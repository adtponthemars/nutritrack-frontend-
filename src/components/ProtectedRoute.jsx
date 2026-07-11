import React from 'react'
import { Navigate } from 'react-router-dom'
const ProtectedRoute = ({ user,  authLoading, children }) => {
    if (authLoading) {
        return <p>Loading...</p>;  // ⏳ wait for Firebase
    }

    //If no user is signin, redirect to sign-in page
    if (!user) {
        return <Navigate to="/signin" replace />
    }
    //Else allow access to the route
    return children
}

export default ProtectedRoute