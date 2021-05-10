import { useEffect, useState } from "react";
import GraphView from "../graphView/graphView";
import OrdersOverview from "../ordersOverview/ordersOverview";
import NewViewModal from "../newViewModal/newViewModal";
import { Plus } from "react-bootstrap-icons";
import "./home.css";
import dataFile from "../../data/newOrders.json";

const Home = () => {
    const [countViews, setCountViews] = useState(3);
    const [additionalViews, setAdditionalViews] = useState([]);
    const [BCHPriceLast2Years, setBCHPriceLast2Years] = useState([]);
    const [showModal, setShowModal] = useState(false);

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
                    <button className="new-view-button" onClick={() => setShowModal(true)}>New view</button>
                </div>
            </div>
            <div className="views-section" id="views-section">
                {countViews > 3 ? additionalViews : ''}
                <GraphView type="LINE" data={dataFile.orders} title="new orders" span="7" id="1" />
                <GraphView type="BAR" data={dataFile.orders} title="returns" span="7" id="2" />
                {BCHPriceLast2Years.length > 0 ? <OrdersOverview data={BCHPriceLast2Years} id="3"></OrdersOverview> : ''}
            </div>
            <NewViewModal showModal={showModal} setShowModal={setShowModal} countViews={countViews} setCountViews={setCountViews} additionalViews={additionalViews} setAdditionalViews={setAdditionalViews} />
        </div>
    );
}

export default Home;