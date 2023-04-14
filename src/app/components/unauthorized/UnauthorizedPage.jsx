import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UnauthorizedPage() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  }, []);

  return (
    <div className="unauthorized">
      <h1>Unauthorized</h1>
      <p>Redirecting to login page...</p>
    </div>
  );
}

export default UnauthorizedPage;
