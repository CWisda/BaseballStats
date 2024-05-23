import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Common/Loader";
import "./User.css";
const CreateUser = () => {
  const navigate = useNavigate();
  const createUserApi = "http://localhost:3001/user";
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    name: "",
    position: "",
    battingAverage: "",
    yearsPlaying: "",
  });

  const handelInput = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    console.log(name, value);
    setUser({ ...user, [name]: value });
  };

  const handelSubmit = async (event) => {
    event.preventDefault();
    console.log(user);
    try {
      setIsLoading(true);
      const response = await fetch(createUserApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        console.log("Form submitted successfully!");
        setUser({ name: "", email: "", phone: "" });
        navigate("/show-user");
      } else {
        console.error("Form submission failed!");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="user-form">
      <div className="heading">
        {isLoading && <Loader />}
        {error && <p>Error: {error}</p>}
        <p>NEW PLAYER Form</p>
      </div>
      <form onSubmit={handelSubmit}>
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
            onChange={handelInput}
          />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="email" className="form-label">
            Position
          </label>
          <input
            type="position"
            className="form-control"
            id="position"
            name="position"
            value={user.position}
            onChange={handelInput}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pwd" className="form-label">
            Batting Average
          </label>
          <input
            type="text"
            className="form-control"
            id="battingAverage"
            name="battingAverage"
            value={user.battingAverage}
            onChange={handelInput}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pwd" className="form-label">
            Years Playing
          </label>
          <input
            type="text"
            className="form-control"
            id="yearsPlaying"
            name="yearsPlaying"
            value={user.yearsPlaying}
            onChange={handelInput}
          />
        </div>
        <button type="submit" className="btn btn-primary submit-btn">
          ADD PLAYER
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
