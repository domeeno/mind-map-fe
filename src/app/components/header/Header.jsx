import React from "react";
import "./Header.css";

function Header(props) {
  return (
    <div className="header">
      <h1>Hortex</h1>
      <button onClick={() => props.keycloak.logout()}>Logout</button>
    </div>
  );
}

export default Header;
