import { useState } from "react";
import { Star, StarFill } from "react-bootstrap-icons";
import "./customers.css";
import { useDispatch } from "react-redux";
import { addComment } from "../../reduxSlices/commentSlice"
import { useHistory } from "react-router-dom";

const Customers = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [rating, setRating] = useState(0);

    const getCharactersLeft = () => {
        document.getElementById("chars-left").innerHTML = `${document.getElementById("comment").value.length} / 100`;
    }

    const clearForm = () => {
        setRating(0);
        document.getElementById("comment").value = "";
        document.getElementById("contact-address").value = "";
        document.getElementById("review-error").style.display = "none";
    }

    const submitComment = () => {
        if (document.getElementById("comment").value <= 0 && rating === 0) {
            document.getElementById("review-error").style.display = "block";
        } else {
            dispatch(addComment({ buyer: document.getElementById("contact-address").value, text: document.getElementById("comment").value, rating: rating, createdAt: new Date().toString() }));
            props.setLocation("/");
            history.push("/");
        }
    }

    const renderStar = (id) => {
        if (rating >= id)
            return (<StarFill size={20} style={{ "color": "steelblue" }}></StarFill>)
        else
            return (<Star size={20}></Star>)
    }

    return (
        <div>
            <form className="review-form">
                <h1 className="rating-header">
                    Why not leave a review?
                </h1>
                <div className="rating">
                    <span>
                        <input type="radio" name="rating" id="star5" value="5" className="star-input" onClick={() => rating === 5 ? setRating(0) : setRating(5)} />
                        <label htmlFor="star5">{renderStar(5)}</label>
                    </span>
                    <span>
                        <input type="radio" name="rating" id="star4" value="4" className="star-input" onClick={() => rating === 4 ? setRating(0) : setRating(4)} />
                        <label htmlFor="star4">{renderStar(4)}</label>
                    </span>
                    <span>
                        <input type="radio" name="rating" id="star3" value="3" className="star-input" onClick={() => rating === 3 ? setRating(0) : setRating(3)} />
                        <label htmlFor="star3">{renderStar(3)}</label>
                    </span>
                    <span>
                        <input type="radio" name="rating" id="star2" value="2" className="star-input" onClick={() => rating === 2 ? setRating(0) : setRating(2)} />
                        <label htmlFor="star2">{renderStar(2)}</label>
                    </span>
                    <span>
                        <input type="radio" name="rating" id="star1" value="1" className="star-input" onClick={() => rating === 1 ? setRating(0) : setRating(1)} />
                        <label htmlFor="star1">{renderStar(1)}</label>
                    </span>
                </div>

                <div className="comment-form-section">
                    <h2>Leave a comment</h2>
                    <div className="comment-form">
                        <label>
                            <p>Comment</p>
                            <p style={{ "textAlign": "right", "fontSize": "1.3rem" }} id="chars-left">0 / 100</p>
                            <textarea className="comment-text-area" maxLength="100" rows="4" id="comment" onChange={() => getCharactersLeft()}></textarea>
                        </label>
                        <label>
                            <p>Contact address</p>
                            <input id="contact-address"></input>
                        </label>
                        <button type="button" onClick={() => clearForm()}>Clear</button>
                        <button type="button" onClick={() => submitComment()}>Submit</button>
                        <p className="review-error" id="review-error">* You can't submit a blank review</p>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Customers;