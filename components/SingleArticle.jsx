import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { changeVotesByArticleId, fetchArticleById } from "../apis";
import CommentsList from "./CommentsList";
import { UserContext } from "../contexts/User";
import ErrorComponent from "./ErrorComponent";
import ErrorPage from "./ErrorPage";

const SingleArticle = () => {
  const [currentArticle, setCurrentArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isVoting, setIsVoting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { loggedInUser } = useContext(UserContext);

  const voteStorageKey = loggedInUser?.username
    ? `voted-article-${id}-${loggedInUser.username}`
    : null;

  useEffect(() => {
    setIsLoading(true);
    fetchArticleById(id)
      .then(({ article }) => {
        setCurrentArticle(article);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError({ err });
      });
  }, [id]);

  // Restore this user's vote state for this article from localStorage.
  // Note: this is client-side only - the backend doesn't track per-user votes,
  // so this won't sync across devices/browsers.
  useEffect(() => {
    if (voteStorageKey) {
      setHasVoted(localStorage.getItem(voteStorageKey) === "true");
    }
  }, [voteStorageKey]);

  function handleVoteClick() {
    if (!loggedInUser?.username) {
      setError({ err: { message: "Log in to vote on articles." } });
      return;
    }

    const increment = hasVoted ? -1 : 1;
    setIsVoting(true);

    changeVotesByArticleId(id, increment)
      .then(({ article }) => {
        setCurrentArticle(article);
        setError(null);
        setIsVoting(false);
        const newVotedState = !hasVoted;
        setHasVoted(newVotedState);
        localStorage.setItem(voteStorageKey, String(newVotedState));
      })
      .catch((err) => {
        setError({ err });
        setIsVoting(false);
      });
  }

  if (isLoading) {
    return <p className="loading-container">Loading article...</p>;
  }

  if (error && !currentArticle.article_id) {
    return <ErrorPage />;
  }

  const { topic, title, author, votes, article_img_url, body, created_at } = currentArticle;

  const readableDate = new Date(created_at)
    .toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .replace(",", "");

  return (
    <article className="single-article">
      <Link to="/articles" className="back-to-articles">
        &larr; Back to articles
      </Link>

      <span className="preview-topic-tag">{topic}</span>
      <h2 className="single-article-title">{title}</h2>

      <p className="single-article-byline">
        By <strong>{author}</strong> &middot; {readableDate}
      </p>

      <img
        src={article_img_url}
        alt={`Illustration for the article: ${title}`}
        className="single-article-image"
      />

      <p className="single-article-body">{body}</p>

      <div className="single-article-actions">
        <button
          onClick={handleVoteClick}
          disabled={isVoting}
          className={`vote-button${hasVoted ? " vote-button-active" : ""}`}
        >
          {isVoting ? "Updating..." : hasVoted ? "👍 Upvoted" : "👍 Upvote"}
        </button>
        <span className="single-article-votes">{votes} votes</span>

        <a href="#comments-list" className="jump-to-comments">
          💬 Jump to comments
        </a>
      </div>

      {error && <ErrorComponent message={error.err.message} />}

      <CommentsList id={id} />
    </article>
  );
};

export default SingleArticle;