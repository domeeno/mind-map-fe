import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Keycloak from "keycloak-js";

let initOptions = {
  url: "http://localhost:8080",
  realm: "realmap",
  clientId: "react-frontend",
};

let keycloak = new Keycloak(initOptions);

keycloak
  .init({ onLoad: "login-required" })
  .then((auth) => {
    if (!auth) {
      window.location.reload();
    } else {
      console.info("Authenticated");
    }

    //React Render
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(
      <React.StrictMode>
        <App keycloak={keycloak} />
      </React.StrictMode>
    );

    localStorage.setItem("react-token", keycloak.token);
    localStorage.setItem("react-refresh-token", keycloak.refreshToken);

    setTimeout(() => {
      keycloak
        .updateToken(70)
        .then((refreshed) => {
          if (refreshed) {
            console.debug("Token refreshed" + refreshed);
          } else {
            console.warn(
              "Token not refreshed, valid for " +
                Math.round(
                  keycloak.tokenParsed.exp +
                    keycloak.timeSkew -
                    new Date().getTime() / 1000
                ) +
                " seconds"
            );
          }
        })
        .catch(() => {
          console.error("Failed to refresh token");
        });
    }, 60000);
  })
  .catch((e) => {
    console.error(e);
    console.error("Authenticated Failed");
  });
