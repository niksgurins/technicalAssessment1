import { useEffect, useState } from "react";
import GraphView from "../graphView/graphView";
import OrdersOverview from "../ordersOverview/ordersOverview";
import { Plus } from "react-bootstrap-icons";
import "./home.css";
import dataFile from "../../data/newOrders.json";

const Home = () => {
    const [countViews, setCountViews] = useState(3);
    const [BCHPriceLast2Years, setBCHPriceLast2Years] = useState([]);

    useEffect(() => {
        if (BCHPriceLast2Years.length === 0) {
            fetch("https://api.coingecko.com/api/v3/coins/bitcoin-cash/market_chart?vs_currency=eur&days=60&interval=daily", {
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => res.json())
                .then(res => {
                    let structuredData = res.prices.map((x, index) => {
                        let date = new Date();
                        date.setDate(date.getDate() - (61 - index));
                        return { "date": date.toISOString().slice(0, 10), "value": Math.round((x[1] + Number.EPSILON) * 100) / 100 }
                    })

                    setBCHPriceLast2Years(structuredData);
                })
                .catch(err => console.log(err));
        }
    })

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
                <GraphView type="line" data={dataFile.orders} title="new orders" id="1" />
                <GraphView type="bar" data={dataFile.orders} title="returns" id="2" />
                {BCHPriceLast2Years.length > 0 ? <OrdersOverview data={BCHPriceLast2Years} id="3"></OrdersOverview> : ''}
            </div>
        </div>
    );
}

export default Home;