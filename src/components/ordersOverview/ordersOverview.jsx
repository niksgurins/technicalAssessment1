import "./ordersOverview.css";
import TooltipLineChart from "../charts/tooltipLineChart/tooltipLineChart";
import CommentSection from "../commentSection/commentSection";
import { Circle, ArrowUpRight, ArrowDownRight, ArrowRight } from "react-bootstrap-icons";

const OrdersOverview = ({id, data}) => {
    const sliceData = (timeSpan, prev) => {
        if(prev) {
            if(data.length >= (timeSpan*2))
                return data.slice(data.length-(timeSpan*2), data.length-timeSpan);
            else if (data.length <= (timeSpan*2) && data.length > timeSpan)
                return data.slice(0, timeSpan);
            else
                return data.slice(0);
        } else {
            if(data.length <= timeSpan)
                return data.slice(0);
            else
                return data.slice(data.length-timeSpan);
        }
    }

    const sumTimespan = (timeSpan) => {
        let total = 0;
        let specificDataSet = sliceData(timeSpan, false).map(item => item.value);
        total = specificDataSet.reduce((sum, current) => sum + current);
        return total;
    }

    const sumPreviousTimeSpan = (timeSpan) => {
        let total = 0;
        let specificDataSet = sliceData(timeSpan, true).map(item => item.value);
        total = specificDataSet.reduce((sum, current) => sum + current);
        return total;
    }
    
    const getPercentageDiff = (timeSpan) => {
        let percentageDifferenceBetweenSpans = (((sumTimespan(timeSpan)/sumPreviousTimeSpan(timeSpan)) * 100) - 100).toFixed(2);
        let diffDirection = percentageDifferenceBetweenSpans >= 0 ? percentageDifferenceBetweenSpans === 0 ? 'neutral' : 'upwards' : 'downwards';

        return (
            <h3 className="orders-percentage flex">
                <span className="flex">{
                    diffDirection === 'neutral' ? 
                        <ArrowRight size={15} style={{"color": "gold", "paddingRight": "5px"}}></ArrowRight> : 
                    diffDirection === 'upwards' ? 
                    <ArrowUpRight size={15} style={{"color": "limegreen", "paddingRight": "5px"}}></ArrowUpRight> : 
                    <ArrowDownRight size={15} style={{"color": "red", "paddingRight": "5px"}}></ArrowDownRight>
                }{` ${percentageDifferenceBetweenSpans >= 0 ? `+${percentageDifferenceBetweenSpans}` : `${percentageDifferenceBetweenSpans}`}% ${percentageDifferenceBetweenSpans < 0 ? "less" : "more"} than last month`}</span>
            </h3>
        );
    }

    return (
        <div className="view orders-overview">
            <div className="orders-overview-headers">
                <h1>Orders over Time</h1>
                <div className="orders-overview-grid">
                    <Circle size={35} className="orders-overview-circle" />
                    <h2>This month's sales: €{sumTimespan(30).toLocaleString()}</h2>
                    {getPercentageDiff(30)}
                </div>
            </div>
            <TooltipLineChart id={`view-graph${id}`} data={sliceData(30, false)}></TooltipLineChart>
            <CommentSection></CommentSection>
        </div>
    )
}


export default OrdersOverview;