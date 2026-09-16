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
        <h1>Loading users...</h1>
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
    <section>
      <h2 className="users-heading">Users</h2>
      <ul id="users-list">
        {users.map((user) => (
          <UserCard user={user} key={user.username} />
        ))}
      </ul>
    </section>
  );
};

export default UsersList;