import React from "react";
import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";

const DashboardPage = () => {
  const { id } = useParams();
  return (
    <div className="dashboard">{id ? <h1>Dashboard</h1> : <Outlet />}</div>
  );
};

export default DashboardPage;
