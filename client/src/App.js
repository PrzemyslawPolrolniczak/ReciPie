import React, { useReducer } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import { AUTH_TOKEN } from "./constants";

import Header from "./components/header/Header";
import Recipies from "./pages/recipies/Recipies";
import Login from "./pages/login/Login";
import Recipie from "./pages/recipie/Recipie";
import CreateRecipie from "./pages/createRecipie/CreateRecipie";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
});

const initialState = {
  isLogged: localStorage.getItem(AUTH_TOKEN),
  userId: null
};

const authReducer = (state = initialState, { type }) => {
  switch (type) {
    case "LOGIN":
      return { isLogged: true, userId: null };
    case "LOGOUT":
      return { isLogged: false, userId: null };
    default:
      return state;
  }
};

const ProtectedRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authenticated ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

const App = () => {
  const [{ isLogged }, dispatch] = useReducer(authReducer, initialState);

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container">
          <Header
            logout={() => dispatch({ type: "LOGOUT" })}
            authenticated={isLogged}
          />
          <Route exact path="/recipies" component={Recipies} />
          <Route
            exact
            path="/login"
            render={() => <Login onLogin={() => dispatch({ type: "LOGIN" })} />}
          />
          <Route path="/recipie/:id" component={Recipie} />
          <ProtectedRoute
            exact
            path="/create-recipie"
            component={CreateRecipie}
            authenticated={isLogged}
          />
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
