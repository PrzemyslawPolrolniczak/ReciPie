import React, { useState } from "react";
import { AUTH_TOKEN } from "../../constants";

const Authentication = () => {
  const [login, setLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <h4 className="mv3">{login ? "Login" : "Sign Up"}</h4>
      <div className="form-group">
        {!login && (
          <input
            className="form-control my-2"
            value={name}
            onChange={e => setName(e.target.value)}
            type="text"
            placeholder="Your name"
          />
        )}
        <input
          className="form-control my-2"
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="text"
          placeholder="Your email address"
        />
        <input
          className="form-control my-2"
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          placeholder="Choose a safe password"
        />
      </div>
      <div>
        <div className="mr-2 btn btn-primary" onClick={() => this._confirm()}>
          {login ? "login" : "create account"}
        </div>
        <div className="btn btn-secondary" onClick={() => setLogin(!login)}>
          {login ? "need to create an account?" : "already have an account?"}
        </div>
      </div>
    </div>
  );
};

export default Authentication;
