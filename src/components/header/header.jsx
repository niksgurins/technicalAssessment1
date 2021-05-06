import {useState, useEffect} from "react";
import { NavLink, useHistory } from "react-router-dom";


import "./header.css";
import { House, Check2Square, BoxSeam, Search, ChevronDown } from "react-bootstrap-icons";

const Header = () => {
    const [location, setLocation] = useState(window.location.pathname);
    const history = useHistory();

    useEffect(() => {
        console.log(location);
        if(location != window.location.pathname)
            setLocation(window.location.pathname);
    })

    return (
        <header className="header">
            <div className="header-content">
                <div className="header-buttons">
                    <div className={location == '/' ? "header-home-section active" : "header-home-section"} onClick={() => history.push("/")}>
                        <p><House size={20}></House>Home</p>    
                    </div>
                    <div className="header-units-section">
                        <input className="units-menu-button" type="checkbox" id="units-menu-button" />
                        <label htmlFor="units-menu-button">
                            
                            <BoxSeam size={20} style={{"paddingTop": "0rem"}}></BoxSeam>
                            <label style={{"marginBottom" : "3rem"}}>Units</label>
                            <ChevronDown size={10}></ChevronDown>
                            
                        </label>
                        <ul className="units-menu">
                            <li><NavLink to="/hoodies">Hoodies</NavLink></li>
                            <li><NavLink to="/tees">T-Shirts</NavLink></li>
                            <li><NavLink to="/hats">Hats</NavLink></li>
                        </ul>
                    </div>
                    <div className="header-customers-section" onClick={() => history.push("/customers")}>
                        <p><Check2Square size={20}></Check2Square>Customers</p>
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