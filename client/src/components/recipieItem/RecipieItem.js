import React from "react";
import { Link } from "react-router-dom";

const RecipieItem = props => {
  const {
    id,
    title,
    user: { name }
  } = props.recipie;

  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-9">
          <h4>{title}</h4>
        </div>
        <div className="col-md-3">
          <h4>Created by: {name}</h4>
          <Link to={`/recipie/${id}`}>
            <button className="btn btn-secondary">Recipie details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipieItem;
