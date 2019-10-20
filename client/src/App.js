import React from "react";
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

const authToken = localStorage.getItem(AUTH_TOKEN);

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authToken ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

const App = () => {
  console.log(authToken);
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container">
          <Header />
          <Route exact path="/recipies" component={Recipies} />
          <Route exact path="/login" component={Login} />
          <Route path="/recipie/:id" component={Recipie} />
          <ProtectedRoute
            exact
            path="/create-recipie"
            component={CreateRecipie}
          />
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
