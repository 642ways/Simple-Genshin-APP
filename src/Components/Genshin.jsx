import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useAuth } from '../AuthContext';
import { Navigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import './Genshin.css';

const Genshin = () => {
    const { isLoggedIn } = useAuth();

    // If the user is not logged in, redirect to the login page
    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    const [characters, setCharacters] = useState([]);
    const [search, setSearch] = useState('');
    const [displayedSearch, setDisplayedSearch] = useState('');
    const [pageNumber, setPageNumber] = useState(0);

    const charactersPerPage = 9;
    const pagesVisited = pageNumber * charactersPerPage;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.genshin.dev/characters');
                const data = await response.json();
                setCharacters(data);
            } catch (error) {
                console.error('Error fetching characters:', error);
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

    const filteredCharacters = characters
        .filter((character) => formatSearchInput(character).includes(search))
        .slice(pagesVisited, pagesVisited + charactersPerPage);

    const pageCount = Math.ceil(characters.length / charactersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

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
                    placeholder="Search characters"
                />
            </form>
            <div className="container mt-3">
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {filteredCharacters.map((character) => (
                        <div key={character} className="col">
                            <div className="card h-100">
                                <img
                                    src={`https://api.genshin.dev/characters/${character}/icon`}
                                    alt=""
                                    className="mx-auto d-block img-fluid"
                                    style={{ minWidth: '200px', minHeight: '200px', maxWidth: '100%', maxHeight: '100%' }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">Character Name: {character}</h5>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={'pagination'}
                    previousLinkClassName={'pagination__link'}
                    nextLinkClassName={'pagination__link'}
                    disabledClassName={'pagination__link--disabled'}
                    activeClassName={'pagination__link--active'}
                />
            </div>
        </div>
    );
};

export default Genshin;
