import React from 'react'
import Navbar from './Navbar'
import './Genshin.css'
import { useAuth } from '../AuthContext'; // Import the useAuth hook
import { Navigate } from 'react-router-dom';
import './About.css'

const About = () => {
    const { isLoggedIn } = useAuth(); // Get the isLoggedIn function from the useAuth hook

    // If user is not logged in, redirect to the login page
    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <Navbar />
            <div className="container d-flex justify-content-center">
                <div className="card profile-body">
                    <div className="card-body">
                        <div className="profile-description">
                            <h5 className="card-title">Kelompok : 17</h5>
                            <p className="card-text">Daffa Maulana Wisesa</p>
                            <p className="card-text">Fadel Rizky Nurfitanto</p>
                            <p className="card-text">Muhammad Raihan Maulana</p>
                            <p className="card-text">Dhea Rahma Putri</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About