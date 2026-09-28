import React, { useEffect, useState } from "react";
import { fetchUsers } from "../apis";
import UserCard from "./UserCard";
import { RotatingLines } from "react-loader-spinner";
import ErrorPage from "./ErrorPage";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    fetchUsers()
      .then(({ users }) => {
        setUsers(users);
        setError(null);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (error) return <ErrorPage />;

  if (isLoading) {
    return (
      <div className="loading-container">
        <h1>Loading users...</h1>
        <p>This may take a little while if you have just opened the website.</p>

        <RotatingLines
          strokeColor="#818cf8"
          strokeWidth="5"
          animationDuration="0.75"
          width="72"
          visible
        />
      </div>
    );
  }

  return (
    <main className="users-page">
      <header className="users-page-header">
        <span className="users-page-eyebrow">Account selection</span>

        <h2 className="users-heading">Who is reading today?</h2>

        <p className="users-page-description">
          Choose a profile to log in, post comments, and vote on articles.
        </p>
      </header>

      <ul id="users-list" aria-label="Available user profiles">
        {users.map((user) => (
          <UserCard user={user} key={user.username} />
        ))}
      </ul>
    </main>
  );
};

export default UsersList;