import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";

const DashboardPage = () => {
  const { id } = useParams();
  useEffect(() => {
    console.log("DashboardPage ID: " + id);
  }, [id]);
  return (
    <div className="dashboard">{id ? <Outlet /> : <h1>Dashboard</h1>}</div>
  );
};

export default DashboardPage;
