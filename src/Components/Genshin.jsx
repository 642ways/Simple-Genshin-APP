import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useAuth } from '../AuthContext';// Import the useAuth hook
import { Navigate } from 'react-router-dom';
import './Genshin.css'

const Genshin = () => {
    const { isLoggedIn } = useAuth(); // Get the isLoggedIn function from the useAuth hook

    // If user is not logged in, redirect to the login page
    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    const [search, setSearch] = useState([]);
    const [name, setName] = useState([]);
    const [vision, setVision] = useState("");
    const [nation, setNation] = useState("");
    const [weapon, setWeapon] = useState("");
    const [rarity, setRarity] = useState("");
    const [description, setDesc] = useState("");

    const api_url = `https://api.genshin.dev/characters/${search}`
    async function getCharacter() {
        const response = await fetch(api_url)
        const data = await response.json();
        console.log(data);
        setName(data.name);
        setWeapon(data.weapon);
        setVision(data.vision);
        setNation(data.nation);
        setRarity(data.rarity);
        setDesc(data.description);
    }
    useEffect(() => {
        console.log(search);
        getCharacter();
    }, [search])

    getCharacter();
    var characterPic = ""
    if (search === "") {
        characterPic = `https://enka.network/ui/UI_AvatarIcon_Ayaka.png`
    } else {
        characterPic = `https://api.genshin.dev/characters/${search}/portrait`
    }

    const formatSearchInput = (input) => {
        return input.replace(/\s+/g, '-').toLowerCase();
    };

    return (
        <div>
            <Navbar />
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
                        <img src={characterPic} alt="" className="mx-auto d-block" />
                    </div>
                    <div className="card-body">
                        <div className="profile-description">
                            <h5 className="card-title">Character Name: {name}</h5>
                            <p className="card-text">Character Vision: {vision}</p>
                            <p className="card-text">Character Rarity: {rarity} Star</p>
                            <p className="card-text">Character Weapon: {weapon}</p>
                            <p className="card-text">Character Nation: {nation}</p>
                            <p className="card-text">Character Description: {description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Genshin