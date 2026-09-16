import React, { useContext } from "react";
import { UserContext } from "../contexts/User";

const Header = () => {
  const { loggedInUser } = useContext(UserContext);
  const isLoggedIn = Boolean(loggedInUser?.username);

  return (
    <header className="site-header">
      <h1 className="site-title">Newslett</h1>

      <div id="user-info">
        {isLoggedIn ? (
          <>
            <img
              src={loggedInUser.avatar_url}
              alt="A Mr. Men character representing your username."
              width={50}
              height={50}
            />
            <strong>{loggedInUser.name}</strong>
          </>
        ) : (
          <span className="user-info-guest">Not logged in</span>
        )}
      </div>
    </header>
  );
};

export default Header;