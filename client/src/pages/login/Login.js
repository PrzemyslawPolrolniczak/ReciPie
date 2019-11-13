import React from "react";

import Authentication from "../../components/authentication/Authentication";

const Login = ({ onLogin }) => {
  return (
    <div>
      <Authentication onLogin={onLogin} />
    </div>
  );
};

export default Login;
