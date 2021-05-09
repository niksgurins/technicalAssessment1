import "./ordersOverview.css";
import TooltipLineChart from "../charts/tooltipLineChart/tooltipLineChart";
import CommentSection from "../commentSection/commentSection";
import { Circle, ArrowUpRight, ArrowDownRight, ArrowRight } from "react-bootstrap-icons";
import DCO from "../../data/dataCalculationObject";

const OrdersOverview = ({ id, data }) => {
    const getPercentageDiff = (timeSpan) => {
        let percentageDifferenceBetweenSpans = DCO.getPercentageDiff(data, timeSpan);
        let diffDirection = percentageDifferenceBetweenSpans >= 0 ? percentageDifferenceBetweenSpans === 0 ? 'neutral' : 'upwards' : 'downwards';

        return (
            <h3 className="orders-percentage flex">
                <span className="flex">{
                    diffDirection === 'neutral' ?
                        <ArrowRight size={15} style={{ "color": "gold", "paddingRight": "5px" }}></ArrowRight> :
                        diffDirection === 'upwards' ?
                            <ArrowUpRight size={15} style={{ "color": "limegreen", "paddingRight": "5px" }}></ArrowUpRight> :
                            <ArrowDownRight size={15} style={{ "color": "red", "paddingRight": "5px" }}></ArrowDownRight>
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
                    <h2>This month's sales: €{DCO.sumTimespan(data, 30).toLocaleString()}</h2>
                    {getPercentageDiff(30)}
                </div>
            </div>
            <TooltipLineChart id={`view-graph${id}`} data={DCO.sliceData(data, 30, false)} />
            <CommentSection />
        </div>
    )
}


export default OrdersOverview;