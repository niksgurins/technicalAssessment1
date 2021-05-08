import "./ordersOverview.css";
import TooltipLineChart from "../charts/tooltipLineChart/tooltipLineChart";
import CommentSection from "../commentSection/commentSection";

const OrdersOverview = ({id, data}) =>
(
    <div className="view orders-overview">
        <div className="orders-overview-headers">
            <h1>Orders over Time</h1>
        </div>
        <TooltipLineChart id={`view-graph${id}`} data={data}></TooltipLineChart>
        <CommentSection></CommentSection>
    </div>
)

export default OrdersOverview;