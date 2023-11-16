import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Import the useAuth hook
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
    const { isLoggedIn, logout } = useAuth(); // Get the isLoggedIn and logout functions from the useAuth hook
    const navigate = useNavigate(); // Get the navigate function from react-router-dom

    const handleLogout = () => {
        // Perform any additional cleanup or API calls if needed
        logout();
        navigate('/login'); // Redirect to the login page after logout
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/genshin">
                    Navbar
                </Link>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <form className="d-flex">
                        {isLoggedIn ? (
                            <button className="btn btn-outline-secondary" onClick={handleLogout}>
                                Logout
                            </button>
                        ) : (
                            <Link to="/registration" className="btn btn-outline-primary">
                                Registration
                            </Link>
                        )}
                    </form>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
