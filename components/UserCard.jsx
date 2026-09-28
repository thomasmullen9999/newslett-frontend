import React, { useContext } from "react";
import { UserContext } from "../contexts/User";

const UserCard = ({ user }) => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  const { username, name, avatar_url } = user;
  const isCurrentUser = loggedInUser?.username === username;
  const displayName = name || username;

  return (
    <li className={`user-card${isCurrentUser ? " user-card-active" : ""}`}>
      <div className="user-card-avatar-wrapper">
        <img
          src={avatar_url}
          alt={`${displayName}'s avatar`}
          className="user-card-avatar"
        />

        {isCurrentUser && (
          <span className="user-card-status" aria-label="Currently logged in">
            ✓
          </span>
        )}
      </div>

      <div className="user-card-content">
        <h3 className="user-card-username">@{username}</h3>
        <p className="user-card-name">{displayName}</p>
      </div>

      {isCurrentUser ? (
        <span className="user-card-badge">Currently logged in</span>
      ) : (
        <button
          type="button"
          className="user-card-login-button"
          onClick={() => setLoggedInUser(user)}
          aria-label={`Log in as ${displayName}`}
        >
          Continue as @{username}
        </button>
      )}
    </li>
  );
};

export default UserCard;