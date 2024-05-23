import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../Common/Loader";
import "./User.css";
const EditUser = () => {
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const getUserApi = "http://localhost:3001/user";

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUser = () => {
    axios
      .get(getUserApi.concat("/") + id)
      .then((item) => {
        setUser(item.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };



  const handelSubmit = (e) => {
    e.preventDefault();

    fetch(getUserApi.concat("/") + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setIsLoading(true);
        navigate("/show-user");
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  return (
    <div className="user-form">
      <div className="heading">
        {isLoading && <Loader />}
        {error && <p>Error: {error}</p>}
        <p>Player Information</p>
      </div>
      <form onSubmit={handelSubmit}>
        <div className="mb-3">
          <label for="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={user.name}
          />
        </div>
        <div className="mb-3 mt-3">
          <label for="email" className="form-label">
            Position
          </label>
          <input
            type="position"
            className="form-control"
            id="position"
            name="position"
            value={user.position}
          />
        </div>
        <div className="mb-3">
          <label for="pwd" className="form-label">
            Batting Average
          </label>
          <input
            type="text"
            className="form-control"
            id="battingAverage"
            name="battingAverage"
            value={user.battingAverage}
          />
        </div>
        <div className="mb-3">
          <label for="pwd" className="form-label">
            Years Playing
          </label>
          <input
            type="text"
            className="form-control"
            id="yearsPlaying"
            name="yearsPlaying"
            value={user.yearsPlaying}
          />
        </div>
        <button type="submit" className="btn btn-primary submit-btn">
          Done
        </button>
      </form>
    </div>
  );
};
export default EditUser;
