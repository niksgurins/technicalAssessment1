import { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import "./header.css";
import { House, Check2Square, BoxSeam, Search, ChevronDown } from "react-bootstrap-icons";

const Header = () => {
    const [location, setLocation] = useState(window.location.pathname);
    const history = useHistory();

    return (
        <header className="header" style={{"zIndex": "999"}}>
            <div className="header-content">
                <div className="header-buttons">
                    <div className={ location == '/' ? "header-home-section active" : "header-home-section"} onClick={() => { setLocation('/'); history.push("/"); }}>
                        <p><House size={20}></House>Home</p>    
                    </div>
                    <div className={ ['/hoodies','/tshirts','/hats'].includes(location) ? "header-units-section active" : "header-units-section"}>
                        <input className="units-menu-button" type="checkbox" id="units-menu-button" />
                        <label htmlFor="units-menu-button">
                            
                            <BoxSeam size={20}></BoxSeam>
                            <label>Units</label>
                            <ChevronDown size={10}></ChevronDown>
                            
                        </label>
                        <ul className="units-menu">
                            <li onClick={() => setLocation('/hoodies')}><NavLink to="/hoodies">Hoodies</NavLink></li>
                            <li onClick={() => setLocation('/tshirts')}><NavLink to="/tshirts">T-Shirts</NavLink></li>
                            <li onClick={() => setLocation('/hats')}><NavLink to="/hats">Hats</NavLink></li>
                        </ul>
                    </div>
                    <div className={ location == '/customers' ? "header-customers-section active" : "header-customers-section"} onClick={() => { setLocation('/customers'); history.push("/customers"); }}>
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