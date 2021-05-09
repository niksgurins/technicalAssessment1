import { useState } from "react";
import { ChevronDown, ArrowUpRight, ArrowDownRight, ArrowRight } from "react-bootstrap-icons";
import LineChart from "../charts/lineChart/lineChart";
import BarChart from "../charts/barChart/barChart";
import DCO from "../../data/dataCalculationObject";
import "./graphView.css";
import TIMESPANS from "../../constants/timeSpans";

const GraphView = ({ title, data, id, type }) => {
    const [timeSpan, setTimeSpan] = useState(7);

    const renderViewHeadersDiv = () => {
        const getPercentageDiff = () => {
            let percentageDifferenceBetweenSpans = Math.round(DCO.getPercentageDiff(data, timeSpan));
            let diffDirection = percentageDifferenceBetweenSpans >= 0 ? percentageDifferenceBetweenSpans === 0 ? 'neutral' : 'upwards' : 'downwards';

            return (
                <span className="total-percent-difference" style={
                    diffDirection === 'neutral' ?
                        { "color": "gold" } :
                        diffDirection === 'upwards' ?
                            { "color": "limegreen" } :
                            { "color": "red" }
                }>{percentageDifferenceBetweenSpans}%{
                        diffDirection === 'neutral' ?
                            <ArrowRight size={15} style={{ "paddingLeft": "5px" }}></ArrowRight> :
                            diffDirection === 'upwards' ?
                                <ArrowUpRight size={15} style={{ "paddingLeft": "5px" }}></ArrowUpRight> :
                                <ArrowDownRight size={15} style={{ "paddingLeft": "5px" }}></ArrowDownRight>
                    }</span>
            );
        }

        return (
            <div className="view-headers">
                <h3>{title.toUpperCase()}</h3>
                <h1>{DCO.sumTimespan(data, timeSpan).toLocaleString()}{getPercentageDiff()}</h1>
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
                    <ChevronDown size={10} style={{ "float": "right", "paddingTop": "7px", paddingLeft: "5px", "cursor": "pointer" }}></ChevronDown>
                    <label htmlFor={`time-span-menu-btn${id}`} className="time-span-label">{TIMESPANS[timeSpan]}</label>
                    <ul className="time-span-menu">
                        {Object.keys(TIMESPANS).map(key => renderTimeSpanLI(key))}
                    </ul>
                </label>
            </div>
            { type === "line" ?
                <LineChart id={`view-graph${id}`} data={DCO.sliceData(data, timeSpan, false)}></LineChart> :
                <BarChart id={`view-graph${id}`} data={DCO.sliceData(data, timeSpan, false)}></BarChart>
            }
        </div>
    );
}

export default GraphView;