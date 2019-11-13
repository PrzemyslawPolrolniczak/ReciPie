import React from "react";
import { Link, useHistory } from "react-router-dom";

import { AUTH_TOKEN } from "../../constants";

import "./header.scss";

const Header = ({ logout, authenticated }) => {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem(AUTH_TOKEN);
    logout();
    history.push(`/login`);
  };

  return (
    <div className="header">
      <Link to="/">
        <div className="header__logo">ReciPie</div>
      </Link>
      {authenticated ? (
        <>
          <Link to="/create-recipie" className="header__tile nav-link">
            Create Recipie
          </Link>
          <Link to="/recipies" className="header__tile nav-link">
            ReciPies
          </Link>
          <div onClick={handleLogout} className="header__tile nav-link">
            Logout
          </div>
        </>
      ) : (
        <Link to="/login" className="header__tile nav-link">
          Login
        </Link>
      )}
    </div>
  );
};

export default Header;
