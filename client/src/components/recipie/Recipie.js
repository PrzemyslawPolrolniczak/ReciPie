import React from "react";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const RECIPIE_QUERY = gql`
  query RecipieQuery($id: Int!) {
    recipie(id: $id) {
      title
      ingredients
      direction
      user {
        name
        email
      }
    }
  }
`;

const Launch = props => {
  let { id } = props.match.params;

  return (
    <div>
      <Query query={RECIPIE_QUERY} variables={{ id: parseInt(id) }}>
        {({ loading, error, data }) => {
          if (loading) return <h4>Loading...</h4>;
          if (error) return <h4>error! {error}</h4>;

          const {
            title,
            ingredients,
            direction,
            user: { name, email }
          } = data.recipie;

          return (
            <>
              <h1 className="display-4 my-3">{title}</h1>
              <div className="card">
                <div className="card-header">
                  By: {name} ({email})
                </div>
                <div className="card-body">
                  <h5 className="card-title">Ingredients:</h5>
                  <p className="card-text">{ingredients}</p>
                  <h5 className="card-title">Direction:</h5>
                  <p className="card-text">{direction}</p>
                  <Link to="/" className="btn btn-primary">
                    Go back
                  </Link>
                </div>
              </div>
            </>
          );
        }}
      </Query>
    </div>
  );
};

export default Launch;
