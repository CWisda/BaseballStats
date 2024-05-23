import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

import Loader from "../Common/Loader";
import "./User.css";

const ShowUser = () => {
  const showUserApi = "http://localhost:3001/user";

  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  const handleDelete = async (id) => {
    console.log("id :", id);
    setIsLoading(true);
    try {
      const response = await fetch(showUserApi.concat("/") + id, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      setUser(user.filter((item) => item.id !== id));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleEdit = (id) => {
    navigate(`/edit-user/${id}`);
  };

  const handleView = (id) => {
    navigate(`/user/${id}`);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    axios
      .get(showUserApi)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (user.length < 0) {
    return <h1>no user found</h1>;
  } else {
    return (
      <div className="container mt-5">
        {isLoading && <Loader />}
        {error && <p>Error: {error}</p>}
        <div className="row">
          {user.map((user, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{user.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {user.position}
                  </h6>
                  <p className="card-text">
                    Batting Average: {user.battingAverage}
                  </p>
                  <p className="card-text">
                    Years Playing: {user.yearsPlaying}
                  </p>
                  <div className="button-container">
                    <button
                      onClick={() => handleEdit(user.id)}
                      className="card-link btn btn-primary"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleView(user.id)}
                      className="card-link btn btn-success"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default ShowUser;
