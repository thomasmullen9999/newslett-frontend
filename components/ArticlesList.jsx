import React, { useEffect, useState } from "react";
import PreviewArticleCard from "./PreviewArticleCard";
import { fetchArticles } from "../apis";
import { useSearchParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import { RotatingLines } from "react-loader-spinner";

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState("desc");
  const [sortBy, setSortBy] = useState("created_at");
  const [error, setError] = useState(null);

  const topicQuery = searchParams.get("topic");

  useEffect(() => {
    setIsLoading(true);
    fetchArticles(topicQuery, sortBy, order)
      .then(({ articles }) => {
        setArticles(articles);
        setIsLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [topicQuery, sortBy, order]);

  if (error) return <ErrorPage />;

  if (isLoading) {
    return (
      <div className="loading-container">
        <h1>Loading articles...</h1>
        <p>This may take a little while if you've just opened the website!</p>
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      </div>
    );
  }

  return (
    <main className="articles-page">
      <div className="controls">
        <h2>Articles{topicQuery ? `: ${topicQuery}` : ""}</h2>
        <div className="dropdowns">
          <label htmlFor="sort-by">Sort By:</label>
          <select
            name="sort-by"
            id="sort-by"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
          >
            <option value="created_at">Date</option>
            <option value="comment_count">Comment Count</option>
            <option value="votes">Votes</option>
          </select>

          <label htmlFor="order">Order:</label>
          <select
            name="order"
            id="order"
            value={order}
            onChange={(event) => setOrder(event.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {articles.length === 0 ? (
        <p className="articles-empty-state">No articles found for this topic yet.</p>
      ) : (
        <div className="articles-grid">
          {articles.map((article) => (
            <PreviewArticleCard article={article} key={article.article_id} />
          ))}
        </div>
      )}
    </main>
  );
};

export default ArticlesList;