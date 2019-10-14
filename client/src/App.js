import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import Launches from "./components/launches/Launches";
import Launch from "./components/launch/Launch";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container">
          <h1>SpaceX</h1>
          <Route exact path="/" component={Launches} />
          <Route path="/launch/:flight_number" component={Launch} />
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
