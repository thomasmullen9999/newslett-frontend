import React from "react";
import { Link } from "react-router-dom";

const PreviewArticleCard = ({ article }) => {
  const {
    article_id,
    topic,
    title,
    author,
    created_at,
    votes,
    article_img_url,
    comment_count,
  } = article;

  const fullArticleLink = `/articles/${article_id}`;

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
    <div className="preview-article-card">
      <span className="preview-topic-tag">{topic}</span>

      <img
        src={article_img_url}
        alt={`Illustration for the article: ${title}`}
        className="preview-article-image"
      />

      <h3 className="preview-article-title">{title}</h3>

      <p className="preview-article-byline">
        By <strong>{author}</strong> &middot; {readableDate}
      </p>

      <div className="preview-article-stats">
        <span>👍 {votes}</span>
        <span>💬 {comment_count}</span>
      </div>

      <Link to={fullArticleLink} className="preview-article-link">
        View full article
      </Link>
    </div>
  );
};

export default PreviewArticleCard;