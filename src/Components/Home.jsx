import React from 'react'
import Navbar from './Navbar'
import { useAuth } from '../AuthContext';// Import the useAuth hook
import { Navigate } from 'react-router-dom';

const Home = () => {
    const { isLoggedIn } = useAuth(); // Get the isLoggedIn function from the useAuth hook

    // If user is not logged in, redirect to the login page
    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <Navbar />
            Home
        </div>
    )
}

export default Home