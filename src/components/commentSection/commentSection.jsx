import { useEffect } from "react";
import "./commentSection.css";
import { connect, useDispatch } from "react-redux";
import { addComments } from "../../reduxSlices/commentSlice"
import { StarFill } from "react-bootstrap-icons";

const CommentSection = (props) => {
    const dispatch = useDispatch();

    const renderStars = (amount) => {
        let buffer = [];
        for (let i = 0; i < amount; i++)
            buffer.push(<StarFill size={15} key={i} style={{ "paddingLeft": "2px" }} />);

        return buffer;
    }

    const renderComment = ({ buyer, text, rating, createdAt }, index) => (
        <div className="comment" key={index}>
            <img src={`http://placekitten.com/200/${300 + index}`} style={{ "height": "4rem", "width": "4rem", "borderRadius": "5px" }}></img>
            <div className="comment-text">
                {renderStars(rating)}
                <p style={rating > 0 ? { "paddingLeft": "1rem" } : {}}>{text}</p>
            </div>
            <p>{new Date(createdAt).toDateString().slice(4)}</p>
        </div>
    )

    const renderComments = () => props.comment.comments.map(renderComment);

    useEffect(() => {
        if (props.comment.comments.length === 0) {
            // Normally I'd fetch this from company db
            fetch("https://cat-fact.herokuapp.com/facts", {
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => res.json())
                .then(res => {
                    let filteredCommentData = res.map(comment => {
                        return { buyer: comment.user, text: comment.text, rating: 0, createdAt: comment.createdAt };
                    });

                    dispatch(addComments(filteredCommentData));
                })
                .catch(err => console.log(err));
        }
    })

    return (
        <div className="comment-section">
            <div className="comment-section-headers" style={props.comment.comments.length > 0 ? {} : { "display": "none" }}>
                <h3>BUYER</h3>
                <h3>COMMENT</h3>
                <h3 style={{ "paddingRight": "4.9rem" }}>DATE</h3>
            </div>
            <div>
                {renderComments()}
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    comment: state.comment
});

export default connect(mapStateToProps)(CommentSection);