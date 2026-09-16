import React from "react";
import { Link } from "react-router-dom";

const TopicCard = ({ topic }) => {
  const { slug, description } = topic;
  const topicsLink = `/articles?topic=${slug}`;

  return (
    <li className="topic-card">
      <h3>{slug}</h3>
      <p>{description}</p>
      <Link to={topicsLink} className="preview-article-link">
        View related articles
      </Link>
    </li>
  );
};

export default TopicCard;