import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../Common/Loader";
import "./User.css";

const EditUser = () => {
  const [user, setUser] = useState({
    name: "",
    position: "",
    battingAverage: "",
    yearsPlaying: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const getUserApi = "http://localhost:3001/user";

  useEffect(() => {
    axios
      .get(`${getUserApi}/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${getUserApi}/${id}`, user)
      .then(() => {
        navigate("/show-user");
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  return (
    <div className="user-form">
      {isLoading && <Loader />}
      {error && <p>Error: {error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={user.name}
            onChange={handleInput}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="position" className="form-label">
            Position
          </label>
          <input
            type="text"
            className="form-control"
            id="position"
            name="position"
            value={user.position}
            onChange={handleInput}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="battingAverage" className="form-label">
            Batting Average
          </label>
          <input
            type="text"
            className="form-control"
            id="battingAverage"
            name="battingAverage"
            value={user.battingAverage}
            onChange={handleInput}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="yearsPlaying" className="form-label">
            Years Playing
          </label>
          <input
            type="text"
            className="form-control"
            id="yearsPlaying"
            name="yearsPlaying"
            value={user.yearsPlaying}
            onChange={handleInput}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditUser;
