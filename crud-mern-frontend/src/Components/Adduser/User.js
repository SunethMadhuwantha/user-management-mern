import React from "react";
import { Link, useNavigate } from "react-router-dom";

function User({ user, onDelete }) {
  const history = useNavigate();

  if (!user) {
    return <p>No user data available.</p>;
  }

  const { _id = "", name = "N/A", gmail = "N/A", age = "N/A", address = "N/A" } = user;

  return (
    <div>
      <h2>ID: {_id}</h2>
      <h2>Name: {name}</h2>
      <h2>Email: {gmail}</h2>
      <h2>Age: {age}</h2>
      <h2>Address: {address}</h2>

      <button>
        <Link to={`/userdetails/${_id}`}>UPDATE</Link>
      </button>
      <button onClick={() => onDelete(_id)}>DELETE</button>
      <br />
      <br />
    </div>
  );
}

export default User;
