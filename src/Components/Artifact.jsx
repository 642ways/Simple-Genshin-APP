import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Import the useAuth hook
import Navbar from './Navbar';
import './Genshin.css'

const Honkai = () => {
    const { isLoggedIn } = useAuth(); // Get the isLoggedIn function from the useAuth hook

    // If user is not logged in, redirect to the login page
    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }


    const [search, setSearch] = useState("");
    const [name, setName] = useState([]);
    const [twopceffect, setTwopceffect] = useState([]);
    const [fourpceffect, setFourpceffect] = useState([]);
    const [rarity, setRarity] = useState("");

    const api_url = `https://api.genshin.dev/artifacts/${search}`
    async function getArtifact() {
        const response = await fetch(api_url)
        const data = await response.json();
        console.log(data);
        setName(data.name);
        setRarity(data.max_rarity);
        setFourpceffect(data['4-piece_bonus']);
        setTwopceffect(data['2-piece_bonus']);
    }
    useEffect(() => {
        console.log(search);
        getArtifact();
    }, [search])

    getArtifact();
    var artiPic = ""
    if (search === "") {
        artiPic = `https://enka.network/ui/UI_AvatarIcon_Ayaka.png`
    } else {
        artiPic = `https://api.genshin.dev/artifacts/${search}/flower-of-life`
    }

    const formatSearchInput = (input) => {
        return input.replace(/\s+/g, '-').toLowerCase();
    };

    return (
        <div>
            <Navbar />
            <div>
                <form className="search">
                    <input
                        className="input"
                        value={search} // Use `value` instead of `defaultValue` for controlled input
                        onChange={(e) => setSearch(formatSearchInput(e.target.value))}
                    />
                </form>
                <div className="container d-flex justify-content-center">
                    <div className="card profile-body">
                        <div className="card-header">
                            <img
                                src={artiPic}
                                alt="" className="mx-auto d-block"
                            />
                        </div>
                        <div className="card-body">
                            <div className="profile-description">
                                <h5 className="card-title">Artifact Name : {name}</h5>
                                <p className="card-title">Artifact Rarity : {rarity}</p>
                                <p className="card-title">Artifact Two Piece Effect</p>
                                <p className="card-title">{twopceffect}</p>
                                <p className="card-title">Artifact Four Piece Effect</p>
                                <p className="card-title">{fourpceffect}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Honkai;
