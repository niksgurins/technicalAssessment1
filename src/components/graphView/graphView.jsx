import {useEffect, useState} from "react";
import * as d3 from "d3";
import { ChevronDown, ArrowUpRight, ArrowDownRight, ArrowRight } from "react-bootstrap-icons";
import LineChart from "../charts/lineChart/lineChart";
import BarChart from "../charts/barChart/barChart";

import "./graphView.css";
import dataFile from "../../data/newOrders.json";
import TIMESPANS from "../../constants/timeSpans";

const GraphView = (props) => {
    const [timeSpan, setTimeSpan] = useState(props.span);
    const [graphData, setGraphData] = useState([]);
    const [totalValueDuringSpan, setTotalValueDuringSpan] = useState(0);
    const [totalValueInPreviousSpanLength, setTotalValueInPreviousSpanLength] = useState(0);

    const renderTimeSpanLI = key => {
        return (
            <li key={key} value={key} onClick={(e) => { setTimeSpan(e.currentTarget.value); calculateTotalValueDuringSpan(e.currentTarget.value); }}>
                {TIMESPANS[key]}
            </li>
        );
    }
    
    const calculateTotalValueDuringSpan = (span, dataArray) => {
        let total = 0;
        let specificDataSet;
        // Assuming graphData is already sorted by date ascending - create a new array of just the values for those dates
        if(dataArray.length <= span)
            specificDataSet = dataArray.slice(0).map(item => { return item.value });
        else
            specificDataSet = dataArray.slice(dataArray.length-span).map(item => { return item.value });
        
        total = specificDataSet.reduce((sum, current) => sum + current);
        return Math.round(total);
    }

    const calculateTotalValueDuringPreviousSpan = (span, dataArray) => {
        let total = 0;
        let specificDataSet;
        // Assuming graphData is already sorted by date ascending - create a new array of just the values for those dates
        if(dataArray.length >= (span*2))
            specificDataSet = dataArray.slice(dataArray.length-(span*2), dataArray.length-span).map(item => { return item.value });
        else if(dataArray.length <= (span*2) && dataArray.length > span)
            specificDataSet = dataArray.slice(0, span).map(item => { return item.value });
        else
            specificDataSet = dataArray.slice(0).map(item => { return item.value });
    
        total = specificDataSet.reduce((sum, current) => sum + current);
        return Math.round(total);
    }

    useEffect(() => {
        if (graphData.length !== dataFile.orders.length) {
            setGraphData(dataFile.orders);
            setTotalValueDuringSpan(calculateTotalValueDuringSpan(timeSpan, dataFile.orders));
            setTotalValueInPreviousSpanLength(calculateTotalValueDuringPreviousSpan(timeSpan, dataFile.orders));
            
        }
    });

    const renderPercentDifferenceSpan = () => {
        let percentageDifferenceBetweenSpans = Math.round(((totalValueDuringSpan/totalValueInPreviousSpanLength) * 100) - 100);
        let diffDirection = percentageDifferenceBetweenSpans >= 0 ? percentageDifferenceBetweenSpans === 0 ? 'neutral' : 'upwards' : 'downwards';

        return (
            <span className="total-percent-difference" style={
                diffDirection === 'neutral' ? 
                    {"color" : "gold"} : 
                diffDirection === 'upwards' ? 
                    {"color": "limegreen"} : 
                    {"color": "red"}
            }>{percentageDifferenceBetweenSpans}%<span className="percentage-arrow-icon">{
                diffDirection === 'neutral' ? 
                <ArrowRight size={15}></ArrowRight> : 
                diffDirection === 'upwards' ? 
                <ArrowUpRight size={15}></ArrowUpRight> : 
                <ArrowDownRight size={15}></ArrowDownRight>
            }</span></span>
        );
    }

    return (
        <div className="view" id="view">
            <div className="view-details">
                <div className="view-headers">
                    <h3>{props.data.toUpperCase()}</h3>
                    <h1>{totalValueDuringSpan}{renderPercentDifferenceSpan()}</h1>
                </div>
                <label htmlFor="time-span-menu-btn" className="time-span-section">
                    <input className="time-span-menu-btn" type="checkbox" id="time-span-menu-btn" />
                    <ChevronDown size={10} style={{"float": "right", "paddingTop": "7px", paddingLeft: "5px", "cursor": "pointer"}}></ChevronDown>
                    <label htmlFor="time-span-menu-btn" className="time-span-label">{TIMESPANS[timeSpan]}</label>
                    <ul className="time-span-menu">
                        {Object.keys(TIMESPANS).map(key => renderTimeSpanLI(key))}
                    </ul>
                </label>
            </div>
            <LineChart id={`view-graph${props.id}`} data={dataFile.orders}></LineChart>
        </div>
    );
}

export default GraphView;