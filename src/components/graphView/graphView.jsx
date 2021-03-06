import { useState } from "react";
import { ChevronDown, ArrowUpRight, ArrowDownRight, ArrowRight } from "react-bootstrap-icons";
import LineChart from "../charts/lineChart/lineChart";
import BarChart from "../charts/barChart/barChart";
import TooltipLineChart from "../charts/tooltipLineChart/tooltipLineChart";
import DCO from "../../data/dataCalculationObject";
import "./graphView.css";
import TIMESPANS from "../../constants/timeSpans";
import { useDispatch } from "react-redux";
import { changeViewSpan } from "../../reduxSlices/graphViewSlice";

const GraphView = ({ title, data, id, type, span }) => {
    const dispatch = useDispatch();
    const [timeSpan, setTimeSpan] = useState(span);

    const renderViewHeadersDiv = () => {
        const getPercentageDiff = () => {
            let percentageDifferenceBetweenSpans = Math.round(DCO.getPercentageDiff(data, timeSpan));
            let diffDirection = percentageDifferenceBetweenSpans >= 0 ? percentageDifferenceBetweenSpans === 0 ? "neutral" : "upwards" : "downwards";

            return (
                <span className="total-percent-difference" style={
                    diffDirection === "neutral" ?
                        { "color": "gold" } :
                        diffDirection === "upwards" ?
                            { "color": "limegreen" } :
                            { "color": "red" }
                }>{percentageDifferenceBetweenSpans}%{
                        diffDirection === "neutral" ?
                            <ArrowRight size={15} style={{ "paddingLeft": "5px" }}></ArrowRight> :
                            diffDirection === "upwards" ?
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
        <li key={key} value={key} onClick={(e) => { dispatch(changeViewSpan({id: id, span: e.currentTarget.value})); setTimeSpan(e.currentTarget.value) }}>
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
            { type === "LINE" ?
                <LineChart id={`view-graph${id}`} data={DCO.sliceData(data, timeSpan, false)}></LineChart> :
             type === "BAR" ?
                <BarChart id={`view-graph${id}`} data={DCO.sliceData(data, timeSpan, false)}></BarChart> :
                <TooltipLineChart id={`view-graph${id}`} data={DCO.sliceData(data, timeSpan, false)} />
            }
        </div>
    );
}

export default GraphView;