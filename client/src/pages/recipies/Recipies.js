import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import RecipieItem from "../../components/recipieItem/RecipieItem";

const RECIPIES_QUERY = gql`
  query RecipiesQuery {
    allRecipies {
      id
      title
      user {
        name
      }
    }
  }
`;

const Recipies = () => {
  return (
    <div>
      <h1 className="display-4 my-3">All ReciPies</h1>
      <Query query={RECIPIES_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <h4>Loading...</h4>;
          if (error) return <h4 className="text-red">Error</h4>;

          return data.allRecipies.map(recipie => (
            <RecipieItem key={recipie.id} recipie={recipie} />
          ));
        }}
      </Query>
    </div>
  );
};

export default Recipies;
