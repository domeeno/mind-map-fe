import React from "react";
import { useParams } from "react-router-dom";

const MapDashboard = () => {
  let { id } = useParams();

  return (
    <>
      <div className="dashboard">
        <h1>Map Dashboard: {id}</h1>
      </div>
    </>
  );
};

export default MapDashboard;
