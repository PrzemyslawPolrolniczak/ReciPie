import React from "react";
import { Link, useHistory } from "react-router-dom";

import { AUTH_TOKEN } from "../../constants";

import "./header.scss";

const Header = props => {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN);
    history.push(`/login`);
  };

  return (
    <div className="header">
      <Link to="/">
        <div className="header__logo">ReciPie</div>
      </Link>
      {authToken ? (
        <>
          <Link to="/create-recipie" className="header__tile nav-link">
            Create Recipie
          </Link>
          <Link to="/recipies" className="header__tile nav-link">
            ReciPies
          </Link>
          <div onClick={logout} className="header__tile nav-link">
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
