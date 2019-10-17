import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "react-apollo";
import { useHistory } from "react-router-dom";

import { AUTH_TOKEN } from "../../constants";

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    createUser(email: $email, password: $password, name: $name) {
      err
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($name: String!, $password: String!) {
    loginUser(name: $name, password: $password) {
      err
      token
    }
  }
`;

const Authentication = props => {
  const [register, setRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [login] = useMutation(LOGIN_MUTATION);
  const [signup] = useMutation(SIGNUP_MUTATION);

  const history = useHistory();

  const confirm = () => {
    register ? registerUser() : loginUser();
  };

  const loginUser = async () => {
    const variables = { name, password };
    const {
      data: {
        loginUser: { err, token }
      }
    } = await login({ variables });

    authenticate(err, token);
  };

  const registerUser = async () => {
    const variables = { name, email, password };
    const {
      data: {
        createUser: { err, token }
      }
    } = await signup({ variables });

    authenticate(err, token);
  };

  const authenticate = (err, token) => {
    if (!token) {
      setError(err);
      return null;
    }

    setError("");
    localStorage.setItem(AUTH_TOKEN, token);
    history.push(`/`);
  };

  return (
    <div>
      <h4>{register ? "Sign Up" : "Login"}</h4>
      <div className="form-group">
        {register && (
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
        <div className="mr-2 btn btn-primary" onClick={confirm}>
          {register ? "create account" : "login"}
        </div>
        <div
          className="btn btn-secondary"
          onClick={() => setRegister(!register)}
        >
          {register ? "already have an account?" : "need to create an account?"}
        </div>
      </div>
      {error && (
        <div className="alert alert-danger">
          <strong>Error!</strong> {error}
        </div>
      )}
    </div>
  );
};

export default Authentication;
