import React from "react";
import gql from "graphql-tag";
import { useMutation } from "react-apollo";
import { useHistory } from "react-router-dom";

const CREATE_RECIPIE_MUTATION = gql`
  mutation CreateRecipieMutation(
    $userId: ID!
    $name: String!
    $ingredients: String!
    $direction: String!
  ) {
    createRecipie(
      userId: $email
      name: $name
      ingredients: $ingredients
      direction: $direction
    ) {
      name
    }
  }
`;

const userId = localStorage.getItem("auth_token").split("id=")[1];

const CreateRecipie = () => {
  return (
    <div>
      <h1>Create recipie</h1>
      <h1>user id = {userId}</h1>
      <form>
        <div className="form-group">
          <label htmlFor="name">Recipie Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="recipieName"
            placeholder="The Best Chicken in The World"
          />
          <small id="recipieHelp" className="form-text text-muted">
            Recipie name should be descriptive.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="ingredients">Ingredients</label>
          <textarea
            rows="4"
            className="form-control"
            id="ingredients"
            placeholder="1 juicy chicken..."
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="direction">Direction</label>
          <textarea
            rows="4"
            className="form-control"
            id="direction"
            placeholder="1. Boil water..."
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateRecipie;
