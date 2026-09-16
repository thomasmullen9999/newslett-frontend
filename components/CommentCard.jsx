import React, { useState, useContext } from "react";
import { deleteCommentById } from "../apis";
import { UserContext } from "../contexts/User";
import ErrorComponent from "./ErrorComponent";

const CommentCard = ({ comment, comments, setComments }) => {
  const { body, votes, author, created_at, comment_id } = comment;
  const { loggedInUser } = useContext(UserContext);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [loginMessage, setLoginMessage] = useState("");

  function handleCommentDeletion() {
    if (loggedInUser.username !== author) {
      setLoginMessage("You are not logged in as this user.");
      return;
    }

    setIsDeleting(true);
    deleteCommentById(comment_id)
      .then(() => {
        setIsDeleting(false);
        setComments(comments.filter((c) => c.comment_id !== comment_id));
        setError(null);
      })
      .catch((err) => {
        setError({ err });
        setIsDeleting(false);
      });
  }

  const formattedDate = new Date(created_at).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  if (isDeleting) {
    return (
      <div className="comment-card comment-card-deleting">
        <p>Deleting comment...</p>
      </div>
    );
  }

  return (
    <div className="comment-card">
      <div className="comment-card-header">
        <span className="comment-author">{author}</span>
        <span className="comment-date">{formattedDate}</span>
      </div>

      <p className="comment-body">{body}</p>

      <div className="comment-card-footer">
        <span className="comment-votes">👍 {votes}</span>

        {loggedInUser.username === author && (
          <button className="comment-delete-btn" onClick={handleCommentDeletion}>
            Delete
          </button>
        )}
      </div>

      {error && <ErrorComponent message={error.err.message} />}
      {loginMessage && <p className="comment-login-message">{loginMessage}</p>}
    </div>
  );
};

export default CommentCard;