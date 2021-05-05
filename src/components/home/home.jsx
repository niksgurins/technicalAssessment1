import React from "react";
import GraphView from "../graphView/graphView";
import "./home.css";

const Home = () => {
    return (
        <div className="home">
            <div className="overview-dashboard">
                <div className="overview-headers">
                    <h3>OVERVIEW</h3>
                    <h1>Dashboard</h1>
                </div>
                <div>
                    <button className="new-view-button">New View</button>
                    <button className="create-report-button"><span className="plus-icon">+</span> Create new report</button>
                </div>
            </div>
            <div className="views-section">
                <GraphView type="Line" data="New Orders" span="7" />
                <GraphView type="Bar" data="Returns Volume" span="7" />
                <GraphView />
            </div>
        </div>
    );
}
 
export default Home;