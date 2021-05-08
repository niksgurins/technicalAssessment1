import { useState } from "react";
import GraphView from "../graphView/graphView";
import OrdersOverview from "../ordersOverview/ordersOverview";
import { Plus } from "react-bootstrap-icons";
import "./home.css";
import dataFile from "../../data/newOrders.json";

const Home = () => {
    const [countViews, setCountViews] = useState(3);

    return (
        <div className="home">
            <div className="overview-dashboard">
                <div className="overview-headers">
                    <h3>OVERVIEW</h3>
                    <h1>Dashboard</h1>
                </div>
                <div>
                    <div className="create-report-section">
                        <Plus size={30} className="plus-icon"></Plus>
                        <button className="create-report-button"><span className="plus-icon"></span> Create new report</button>
                    </div>
                    <button className="new-view-button">New view</button>
                </div>
            </div>
            <div className="views-section">
                <GraphView type="line" data={dataFile.orders} title="new orders" span="7" id="1"/>
                <GraphView type="bar" data={dataFile.orders} title="returns" span="7" id="2"/>
                <OrdersOverview data={dataFile.orders} id="3"></OrdersOverview>
            </div>
        </div>
    );
}
 
export default Home;