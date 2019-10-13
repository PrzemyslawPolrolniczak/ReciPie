import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import Launches from "./components/launches/Launches";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="container">
        <h1>SpaceX</h1>
        <Launches />
      </div>
    </ApolloProvider>
  );
};

export default App;
