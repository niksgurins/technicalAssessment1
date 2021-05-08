import { useEffect, useState } from "react";
import "./commentSection.css";

const CommentSection = () => {
    const [comments, setComments] = useState([]);

    const renderComment = ({user, text, createdAt}, index) => (
        <div className="comment" key={index}>
            <p>{user}</p>
            <p>{text}</p>
            <p>{createdAt}</p>
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
            {renderComments()}
        </div>
    );
}
 
export default CommentSection;