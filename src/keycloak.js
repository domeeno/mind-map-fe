import Keycloak from "keycloak-js";

let initOptions = {
  url: "http://localhost:8080",
  realm: "realmap",
  clientId: "react-frontend",
  onLoad: "login-required",
};

let keycloak = new Keycloak(initOptions);

export default keycloak;
