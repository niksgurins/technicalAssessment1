import { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import "./header.css";
import { House, Check2Square, BoxSeam, Search, ChevronDown } from "react-bootstrap-icons";

const Header = () => {
    const [location, setLocation] = useState(window.location.pathname);
    const history = useHistory();

    const closeUnitsMenu = () => {
        document.getElementById("units-menu-button").checked = false;
    }

    return (
        <header className="header" style={{ "zIndex": "999" }}>
            <div className="header-content">
                <div className="header-buttons">
                    <div className={location == "/" ? "header-home-section active" : "header-home-section"} onClick={() => { setLocation('/'); history.push("/"); closeUnitsMenu() }}>
                        <House size={20} className="header-icon"></House>
                        <p>Home</p>
                    </div>
                    <div className={["/hoodies", "/tshirts", "/hats"].includes(location) ? "active" : ""}>
                        <label htmlFor="units-menu-button" className="header-units-section">
                            <input className="units-menu-button" type="checkbox" id="units-menu-button" />
                            <BoxSeam size={20} className="header-icon"></BoxSeam>
                            <p>Units</p>
                            <ChevronDown size={10} style={{ "paddingLeft": "3px", "paddingTop": "3px" }}></ChevronDown>
                            <ul className="units-menu">
                                <li onClick={() => { setLocation("/hoodies"); closeUnitsMenu() }}><NavLink to="/hoodies">Hoodies</NavLink></li>
                                <li onClick={() => { setLocation("/tshirts"); closeUnitsMenu() }}><NavLink to="/tshirts">T-Shirts</NavLink></li>
                                <li onClick={() => { setLocation("/hats"); closeUnitsMenu() }}><NavLink to="/hats">Hats</NavLink></li>
                            </ul>
                        </label>
                    </div>
                    <div className={location == "/customers" ? "header-customers-section active" : "header-customers-section"} onClick={() => { setLocation('/customers'); history.push("/customers"); closeUnitsMenu() }}>
                        <Check2Square size={20} className="header-icon" />
                        <p>Customers</p>
                    </div>
                </div>
                <div className="header-search-bar">
                    <Search size={18} className="search-bar-icon"></Search>
                    <input className="search-bar" placeholder="Search..."></input>
                </div>
            </div>
        </header>
    );
}

export default Header;