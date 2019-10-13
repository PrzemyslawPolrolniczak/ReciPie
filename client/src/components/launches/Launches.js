import React, { useState } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import LaunchItem from "../launchItem/LaunchItem";

const LAUNCHES_QUERY = gql`
  query LaunchesQuery {
    launches {
      flight_number
      mission_name
      launch_date_local
      launch_success
    }
  }
`;

const Launches = () => {
  const [showResult, setResult] = useState(false);

  return (
    <div>
      <h1 className="display-4 my-3">Launches</h1>
      <button className="primary" onClick={() => setResult(!showResult)}>
        Test me
      </button>
      {showResult && (
        <Query query={LAUNCHES_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <h4>Loading...</h4>;
            if (error) return <h4 className="text-red">Error</h4>;

            return data.launches.map(launch => (
              <LaunchItem key={launch.flight_number} launch={launch} />
            ));
          }}
        </Query>
      )}
    </div>
  );
};

export default Launches;
