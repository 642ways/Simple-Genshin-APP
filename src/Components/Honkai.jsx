import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Import the useAuth hook
import Navbar from './Navbar';

const Honkai = () => {
    const { isLoggedIn } = useAuth(); // Get the isLoggedIn function from the useAuth hook

    // If user is not logged in, redirect to the login page
    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <Navbar />
            <h2>Honkai</h2>
            {/* Your content for the Honkai page */}
        </div>
    );
};

export default Honkai;
