import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "react-apollo";
import { useHistory } from "react-router-dom";

import { AUTH_TOKEN } from "../../constants";

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    createUser(email: $email, password: $password, name: $name)
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const Authentication = props => {
  const [register, setRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useMutation(LOGIN_MUTATION);
  const [signup] = useMutation(SIGNUP_MUTATION);

  const history = useHistory();

  const confirm = async () => {
    const variables = { name, email, password };
    const {
      data: { createUser: token }
    } = register ? await signup({ variables }) : await login({ variables });

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
    </div>
  );
};

export default Authentication;
