import React from "react";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const LAUNCH_QUERY = gql`
  query LaunchQuery($flight_number: ID!) {
    launch(flight_number: $flight_number) {
      mission_name
      launch_year
      launch_success
      rocket {
        rocket_name
        rocket_type
      }
    }
  }
`;

const Launch = props => {
  let { flight_number } = props.match.params;

  return (
    <div>
      <Query
        query={LAUNCH_QUERY}
        variables={{ flight_number: parseInt(flight_number) }}
      >
        {({ loading, error, data }) => {
          if (loading) return <h4>Loading...</h4>;
          if (error) return <h4>error! {error}</h4>;

          const {
            launch_success,
            launch_year,
            mission_name,
            rocket: { rocket_name, rocket_type }
          } = data.launch;

          return (
            <>
              <h1 className="display-4 my-3">{mission_name}</h1>
              <div className="card">
                <div className="card-header">
                  Status:{" "}
                  <span
                    className={launch_success ? "text-success" : "text-danger"}
                  >
                    [{launch_success ? "Success" : "Failure"}]
                  </span>
                  <br />
                  Year: {launch_year}
                </div>
                <div className="card-body">
                  <h5 className="card-title">Rocket name: {rocket_name}</h5>
                  <p className="card-text">Rocket Type: {rocket_type}</p>
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
