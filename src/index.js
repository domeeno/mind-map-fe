import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { KeycloakProvider } from "./app/components/keycloak/KeycloakProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <KeycloakProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </KeycloakProvider>
);
