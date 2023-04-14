import React from "react";

function Header(props) {
  return (
    <div>
      <h1>Mind-Map</h1>
      <button onClick={() => props.keycloak.logout()}>Logout</button>
    </div>
  );
}

export default Header;
