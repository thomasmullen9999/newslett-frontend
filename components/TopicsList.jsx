import React, { useEffect, useState } from "react";
import TopicCard from "./TopicCard";
import { fetchTopics } from "../apis";
import { RotatingLines } from "react-loader-spinner";
import ErrorPage from "./ErrorPage";

const TopicsList = () => {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchTopics()
      .then(({ topics }) => {
        setTopics(topics);
        setIsLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  if (error) return <ErrorPage />;

  if (isLoading) {
    return (
      <div className="loading-container">
        <h1>Loading topics…</h1>
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
    <section id="topics-list">
      <h2>Topics</h2>
      <h3>Select a topic to browse related articles...</h3>
      <ul className="topics-grid">
        {topics.map((topic) => (
          <TopicCard topic={topic} key={topic.slug} />
        ))}
      </ul>
    </section>
  );
};

export default TopicsList;