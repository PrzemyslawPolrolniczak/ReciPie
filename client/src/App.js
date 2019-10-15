import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import Header from "./components/header/Header";
import Recipies from "./pages/recipies/Recipies";
import Login from "./pages/login/Login";
import Recipie from "./pages/recipie/Recipie";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container">
          <Header />
          <Route exact path="/" component={Recipies} />
          <Route exact path="/login" component={Login} />
          <Route path="/recipie/:id" component={Recipie} />
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
