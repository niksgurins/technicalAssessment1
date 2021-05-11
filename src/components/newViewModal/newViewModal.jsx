import { X } from "react-bootstrap-icons";
import Modal from "react-modal";
import CHARTTYPES from "../../constants/chartTypes";
import TIMESPANS from "../../constants/timeSpans";
import "./newViewModal.css";
import dataFile from "../../data/newOrders.json";
import { useDispatch } from "react-redux";
import { addView } from "../../reduxSlices/graphViewSlice";

Modal.setAppElement("#root")
const NewViewModal = ({ showModal, setShowModal }) => {
    const dispatch = useDispatch();
    
    const closeModal = () => {
        setShowModal(false);
    }

    const renderTimeSpanOptions = (key) =>
    (
        <option key={key} value={TIMESPANS[key]}>
            {TIMESPANS[key]}
        </option>
    )

    const renderChartTypeOptions = (key) =>
    (
        <option key={key} value={CHARTTYPES[key]}>
            {CHARTTYPES[key]}
        </option>
    )

    let chartType;
    let timeSpan;
    
    const createView = () => {
        let timeSpanKey = "";
        let chartTypeKey = "";
        Object.keys(TIMESPANS).forEach(key => { if(TIMESPANS[key] == timeSpan) timeSpanKey = key });
        Object.keys(CHARTTYPES).forEach(key => { if(CHARTTYPES[key] == chartType) chartTypeKey = key });
        
        if (document.getElementById("view-title").value <= 0 || timeSpanKey === "" || chartTypeKey === "") {
            document.getElementById("new-view-error").style.display = "block";
        } else {
            dispatch(addView({
                title: document.getElementById("view-title").value,
                span: timeSpanKey,
                data: dataFile.orders,
                type: chartTypeKey,
            }));
            closeModal();
        }
    }

    return (
        <Modal
            isOpen={showModal}
            onRequestClose={closeModal}
            className="modal"
            overlayClassName="overlay"
            contentLabel="New view Modal"
        >
            <div className="modal-content">
                <div className="modal-header">
                    <h1>New view</h1>
                    <X size={30} onClick={closeModal}></X>
                </div>
                <div className="view-form comment-form">
                    <label>
                        <p>Title<span style={{"color": "red"}}> *</span></p>
                        <input id="view-title"></input>
                    </label>
                    <label>
                        <p>Time Span<span style={{"color": "red"}}> *</span></p>
                        <input list="timeSpans" value={timeSpan} onChange={(e) => timeSpan = e.currentTarget.value}></input>
                        <datalist value={timeSpan} id="timeSpans" name="timeSpans">
                            {Object.keys(TIMESPANS).map(key => renderTimeSpanOptions(key))}
                        </datalist>
                    </label>
                    <label>
                        <p>Chart Type<span style={{"color": "red"}}> *</span></p>
                        <input list="types" value={chartType} onChange={(e) => chartType = e.currentTarget.value}></input>
                        <datalist value={chartType} id="types" name="types">
                            {Object.keys(CHARTTYPES).map(key => renderChartTypeOptions(key))}
                        </datalist>
                    </label>
                    <button type="button" onClick={() => closeModal()}>Close</button>
                    <button type="button" onClick={() => createView()}>Create</button>
                    <p className="new-view-error" id="new-view-error">* You must fill in the required(*) fields</p>
                </div>
            </div>
        </Modal>
    );
}

export default NewViewModal;