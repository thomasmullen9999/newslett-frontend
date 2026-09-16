import React from 'react';

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <h1 className="hero-title">Newslett</h1>
        <p className="hero-subtitle">
          A community-driven space for sharing articles, starting discussions, and following the topics you care about.
        </p>
      </section>

      <section className="home-highlights">
        <div className="highlight-card">
          <h2>Discover</h2>
          <p>
            Browse articles across a range of topics, curated and shared by the community rather than a single
            editorial team.
          </p>
        </div>
        <div className="highlight-card">
          <h2>Discuss</h2>
          <p>
            Every article is a conversation. Comment, reply, and see what other readers think — the discussion is
            often as valuable as the article itself.
          </p>
        </div>
        <div className="highlight-card">
          <h2>Follow</h2>
          <p>
            Explore topics that interest you and keep track of the users whose posts and comments you find worth
            coming back to.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;