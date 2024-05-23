import React from "react";
import Carousel from "../Pages/Carousel";
import jsonData from "../../mydata.json";

const Home = () => {
  return (
    <div>
      <Carousel stats={jsonData.user} /> 
    </div>
  );
};

export default Home;
