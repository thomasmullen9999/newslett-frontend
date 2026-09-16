import React, { useContext } from "react";
import { UserContext } from "../contexts/User";

const UserCard = ({ user }) => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const { username, name, avatar_url } = user;
  const imageText = `A Mr. Men cartoon character, representing ${username}`;
  const isCurrentUser = loggedInUser?.username === username;

  return (
    <li className={`user-card${isCurrentUser ? " user-card-active" : ""}`}>
      <img src={avatar_url} alt={imageText} />
      <h3>{username}</h3>
      <p className="user-card-name">{name}</p>

      {isCurrentUser ? (
        <span className="user-card-badge">Logged in</span>
      ) : (
        <button onClick={() => setLoggedInUser(user)}>Log in</button>
      )}
    </li>
  );
};

export default UserCard;