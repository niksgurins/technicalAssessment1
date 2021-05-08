import { useEffect, useState } from "react";
import "./commentSection.css";

const CommentSection = () => {
    const [comments, setComments] = useState([]);
    const [userPhotos, setUserPhotos] = useState([]);

    const renderComment = ({user, text, createdAt}, index) => (
        <div className="comment" key={index}>
            <img src={`http://placekitten.com/200/${300 + index}`} style={{"height" : "4rem", "width": "4rem", "borderRadius": "5px"}}></img>
            <p>{text}</p>
            <p>{new Date(createdAt).toDateString().slice(4)}</p>
        </div>
    )

    const renderComments = () => comments.map(renderComment);
    
    useEffect(() => {
        if (comments.length === 0) {
            // Normally I'd fetch this from company db
            fetch("https://cat-fact.herokuapp.com/facts", {
                headers: { 
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(res => {
                let filteredData = res.map(comment => {
                    return { user: comment.user, text: comment.text, createdAt: comment.createdAt }
                });
                setComments(filteredData);
            })
            .catch(err => console.log(err));
        }
    })

    return (
        <div className="comment-section">
            <div className="comment-section-headers">
                <h3>BUYER</h3>
                <h3>COMMENT</h3>
                <h3 style={{"paddingRight": "4.9rem"}}>DATE</h3>
            </div>
            <div>
                {renderComments()}
            </div>
        </div>
    );
}
 
export default CommentSection;