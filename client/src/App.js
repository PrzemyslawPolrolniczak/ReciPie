import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import Recipies from "./components/recipies/Recipies";
import Recipie from "./components/recipie/Recipie";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container">
          <h1>ReciPie</h1>
          <Route exact path="/" component={Recipies} />
          <Route path="/recipie/:id" component={Recipie} />
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
