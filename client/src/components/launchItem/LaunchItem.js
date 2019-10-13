import React from "react";

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
          <button className="btn btn-secondary" disabled>
            Launch details
          </button>
        </div>
      </div>
    </div>
  );
};

export default LaunchItem;
