import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useAuth } from '../AuthContext';
import { Navigate } from 'react-router-dom';
import './Genshin.css';

const Genshin = () => {
    const { isLoggedIn } = useAuth();

    // If the user is not logged in, redirect to the login page
    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    const [artifacts, setArtifacts] = useState([]);
    const [search, setSearch] = useState('');
    const [displayedSearch, setDisplayedSearch] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.genshin.dev/artifacts');
                const data = await response.json();
                setArtifacts(data);
            } catch (error) {
                console.error('Error fetching Artifacts:', error);
            }
        };

        fetchData();
    }, []);

    const formatSearchInput = (input) => {
        return input.replace(/\s+/g, '-').toLowerCase();
    };

    const handleSearchChange = (e) => {
        const inputValue = e.target.value;
        setDisplayedSearch(inputValue);
        setSearch(formatSearchInput(inputValue));
    };

    const filteredArtifacts = artifacts.filter((artifact) =>
        formatSearchInput(artifact).includes(search)
    );

    return (
        <div>
            <Navbar />
            <form className="search">
                <input
                    className="input"
                    value={displayedSearch}
                    onChange={(e) => {
                        setDisplayedSearch(e.target.value);
                        setSearch(e.target.value);
                    }}
                    placeholder="Search Artifacts"
                />
            </form>
            <div className="container mt-3">
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {filteredArtifacts.map((artifact) => (
                        <div key={artifact} className="col">
                            <div className="card h-100">
                                <img
                                    src={`https://api.genshin.dev/artifacts/${artifact}/flower-of-life`}
                                    alt=""
                                    className="mx-auto d-block img-fluid"
                                    style={{ minWidth: '200px', minHeight: '200px', maxWidth: '100%', maxHeight: '100%' }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">Artifact Name: {artifact}</h5>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Genshin;
