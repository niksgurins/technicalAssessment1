import {useEffect, useState} from "react";
import dataFile from "../../data/newOrders.json";
import * as d3 from "d3";

const GraphView = (props) => {
    //const graphDiv = document.getElementById("graph");
    const [graphData, setGraphData] = useState([]);

    useEffect(() => {
        if (graphData.length === 0) {
            setGraphData(dataFile.orders);
        }
    });

    return (
        <div className="view">
            View
            <div id="graph"></div>
        </div>
    );
}

export default GraphView;