import {useEffect, useState} from "react";
import { ChevronDown, ArrowUpRight, ArrowDownRight, ArrowRight } from "react-bootstrap-icons";
import LineChart from "../charts/lineChart/lineChart";
import BarChart from "../charts/barChart/barChart";

import "./graphView.css";
import TIMESPANS from "../../constants/timeSpans";

const GraphView = ({span, title, data, id, type}) => {
    const [timeSpan, setTimeSpan] = useState(span);

    const renderViewHeadersDiv = () => {
        const sumTimespan = () => {
            let total = 0;
            let specificDataSet;
            // Assuming data is already sorted by date ascending - create a new array of just the values for those dates
            if(data.length <= timeSpan)
                specificDataSet = data.slice(0).map(item => { return item.value });
            else
                specificDataSet = data.slice(data.length-timeSpan).map(item => { return item.value });
            
            total = Math.round(specificDataSet.reduce((sum, current) => sum + current));
            return total;
        }

        const sumPreviousTimeSpan = () => {
            let total = 0;
            let specificDataSet;
            // Assuming data is already sorted by date ascending - create a new array of just the values for those dates
            if(data.length >= (timeSpan*2))
                specificDataSet = data.slice(data.length-(timeSpan*2), data.length-timeSpan).map(item => { return item.value });
            else if(data.length <= (timeSpan*2) && data.length > timeSpan)
                specificDataSet = data.slice(0, timeSpan).map(item => { return item.value });
            else
                specificDataSet = data.slice(0).map(item => { return item.value });
        
            total = Math.round(specificDataSet.reduce((sum, current) => sum + current));
            return total;
        }
        
        const getPercentageDiff = () => {
            let percentageDifferenceBetweenSpans = Math.round(((sumTimespan()/sumPreviousTimeSpan()) * 100) - 100);
            let diffDirection = percentageDifferenceBetweenSpans >= 0 ? percentageDifferenceBetweenSpans === 0 ? 'neutral' : 'upwards' : 'downwards';
    
            return (
                <span className="total-percent-difference" style={
                    diffDirection === 'neutral' ? 
                        {"color" : "gold"} : 
                    diffDirection === 'upwards' ? 
                        {"color": "limegreen"} : 
                        {"color": "red"}
                }>{percentageDifferenceBetweenSpans}%{
                    diffDirection === 'neutral' ? 
                        <ArrowRight size={15}></ArrowRight> : 
                    diffDirection === 'upwards' ? 
                    <ArrowUpRight size={15}></ArrowUpRight> : 
                    <ArrowDownRight size={15}></ArrowDownRight>
                }</span>
            );
        }
    
        return (
            <div className="view-headers">
                <h3>{ title.toUpperCase() }</h3>
                <h1>{ sumTimespan() }{ getPercentageDiff() }</h1>
            </div>
        )
    }

    const renderTimeSpanLI = key => 
    (
        <li key={key} value={key} onClick={(e) => { setTimeSpan(e.currentTarget.value) }}>
            {TIMESPANS[key]}
        </li>
    )

    return (
        <div className="view" id="view">
            <div className="view-details">
                {renderViewHeadersDiv()}
                <label htmlFor={`time-span-menu-btn${id}`} className="time-span-section">
                    <input className="time-span-menu-btn" type="checkbox" id={`time-span-menu-btn${id}`} />
                    <ChevronDown size={10} style={{"float": "right", "paddingTop": "7px", paddingLeft: "5px", "cursor": "pointer"}}></ChevronDown>
                    <label htmlFor={`time-span-menu-btn${id}`} className="time-span-label">{TIMESPANS[timeSpan]}</label>
                    <ul className="time-span-menu">
                        {Object.keys(TIMESPANS).map(key => renderTimeSpanLI(key))}
                    </ul>
                </label>
            </div>
            { type === "line" ? 
                <LineChart id={`view-graph${id}`} data={data}></LineChart> :
                <BarChart id={`view-graph${id}`} data={data}></BarChart>
            }
        </div>
    );
}

export default GraphView;