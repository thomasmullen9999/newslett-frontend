import React, { useContext, useEffect, useState } from "react";
import { addNewCommentByArticleId, fetchCommentsByArticleId } from "../apis";
import CommentCard from "./CommentCard";
import ErrorComponent from "./ErrorComponent";
import { UserContext } from "../contexts/User";

const CommentsList = ({ id }) => {
  const [comments, setComments] = useState([]);
  const [body, setBody] = useState("");
  const [error, setError] = useState(null);
  const [isPosting, setIsPosting] = useState(false);
  const { loggedInUser } = useContext(UserContext);

  useEffect(() => {
    fetchCommentsByArticleId(id).then(({ comments }) => {
      setComments(comments);
    });
  }, [id]);

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (!body.trim()) {
      setError({ err: { message: "Comment body cannot be empty" } });
      return;
    }

    setIsPosting(true);
    const newComment = {
      username: loggedInUser.username,
      body,
    };

    addNewCommentByArticleId(id, newComment)
      .then(({ comment }) => {
        setComments([comment, ...comments]);
        setBody("");
        setError(null);
        setIsPosting(false);
      })
      .catch((err) => {
        setError({ err });
        setIsPosting(false);
      });
  };

  return (
    <section id="comments-list">
      <h2>Comments ({comments.length})</h2>

      <form className="comment-form" onSubmit={handleCommentSubmit}>
        <textarea
          className="comment-textarea"
          rows="4"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your comment..."
        />
        <div className="comment-form-footer">
          <button type="submit" disabled={isPosting}>
            {isPosting ? "Posting..." : "Post comment"}
          </button>
        </div>
      </form>

      {error && <ErrorComponent message={`${error.err.message}.`} />}

      {comments.length === 0 ? (
        <p className="comments-empty-state">No comments yet — be the first to share your thoughts.</p>
      ) : (
        <div className="comment-cards-container">
          {comments.map((comment) => (
            <CommentCard
              key={comment.comment_id}
              comment={comment}
              comments={comments}
              setComments={setComments}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default CommentsList;