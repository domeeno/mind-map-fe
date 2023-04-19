import React from "react";
import "./Header.css";

function Header(props) {
  return (
    <div className="header">
      <h1>.Hortex</h1>
      {props.keycloak.authenticated ? (
        <button onClick={() => props.keycloak.logout()}>Logout</button>
      ) : (
        <button onClick={() => props.keycloak.login()}>Login</button>
      )}
    </div>
  );
}

export default Header;
