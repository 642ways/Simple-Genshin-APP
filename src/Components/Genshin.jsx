import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Import the useAuth hook
import Navbar from './Navbar';

const Genshin = () => {
    const { isLoggedIn } = useAuth(); // Get the isLoggedIn function from the useAuth hook

    // If user is not logged in, redirect to the login page
    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <Navbar />
            <h2>Genshin</h2>
            {/* Your content for the Genshin page */}
        </div>
    );
};

export default Genshin;
