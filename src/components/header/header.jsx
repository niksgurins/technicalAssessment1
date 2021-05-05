import {useState, useEffect} from "react";
import { NavLink, useHistory } from "react-router-dom";


import "./header.css";
import { House, Check2Square, BoxSeam, Search } from "react-bootstrap-icons";

const Header = () => {
    const [location, setLocation] = useState(window.location.pathname);
    const history = useHistory();

    return (
        <header className="header">
            <div className="header-content">
                <div className="header-buttons">
                    <div className="header-home-section" onClick={() => history.push("/")}>
                        <House size={20}></House>
                        <p>Home</p>
                    </div>
                    <div className="header-units-section">
                        <input className="units-menu-button" type="checkbox" id="units-menu-button" />
                        <label htmlFor="units-menu-button">
                            <div className="units-button">
                                <BoxSeam size={20}></BoxSeam>
                                <p>Units</p>
                            </div>
                        </label>
                        <ul className="units-menu">
                            <li><NavLink to="/hoodies">Hoodies</NavLink></li>
                            <li><NavLink to="/tees">T-Shirts</NavLink></li>
                            <li><NavLink to="/hats">Hats</NavLink></li>
                        </ul>
                    </div>
                    <div className="header-customers-section" onClick={() => history.push("/customers")}>
                        <Check2Square size={20}></Check2Square>
                        <p>Customers</p>
                    </div>
                </div>
                <div className="header-search-bar">
                    <Search size={20}></Search>
                    <input className="search-input"></input>
                </div>
            </div>
        </header>
    );
}

export default Header;