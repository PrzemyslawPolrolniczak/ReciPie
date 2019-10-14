import React from "react";
import { Link } from "react-router-dom";

const LaunchItem = props => {
  const {
    flight_number,
    mission_name,
    launch_date_local,
    launch_success
  } = props.launch;

  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-9">
          <h4>Mission: {mission_name}</h4>
          <p>Date: {launch_date_local}</p>
        </div>
        <div className="col-md-3">
          <h4>Status: {launch_success ? "Success" : "Failure"}</h4>
          <Link to={`/launch/${flight_number}`}>
            <button className="btn btn-secondary">Launch details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LaunchItem;
