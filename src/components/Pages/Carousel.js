import React from "react";
import "./Carousel.css"; 

const Carousel = ({ stats }) => {
  return (
    <div className="carousel-container">
      <div className="details-box">
        <h1 className="carousel-title">
          Welcome to the Baseball Stats Application
        </h1>
        <ul className="inner-text">
          <li>Create A Player Profile</li>
          <li>Edit A Player Information</li>
          <li>View Player Details and Stats</li>
          <li>Delete A Player Profiles</li>
        </ul>
      </div>
    </div>
  );
};

export default Carousel;
