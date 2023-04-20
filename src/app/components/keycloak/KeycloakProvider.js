import React, { useEffect, useState } from "react";
import keycloak from "../../utils/keycloak";

const KeycloakContext = React.createContext();

export const useKeycloak = () => React.useContext(KeycloakContext);

export const KeycloakProvider = ({ children }) => {
  const [keycloakInstance, setKeycloakInstance] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (keycloakInstance && authenticated) {
      setInterval(() => {
        keycloakInstance
          .updateToken(70)
          .then((refreshed) => {
            if (refreshed) {
              console.debug("Token refreshed" + refreshed);
              localStorage.setItem("token", keycloak.token);
              localStorage.setItem("refresh-token", keycloak.refreshToken);
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
    }
  }, [keycloakInstance, authenticated]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");

    if (token && refreshToken) {
      keycloak
        .init({ token, refreshToken })
        .then((refreshed) => {
          if (refreshed) {
            localStorage.setItem("token", keycloak.token);
            localStorage.setItem("refreshToken", keycloak.refreshToken);
          }
        })
        .catch(() => {
          keycloak.clearToken();
        });
    }
  }, []);

  useEffect(() => {
    keycloak.init({}).then((authenticated) => {
      if (authenticated) {
        localStorage.setItem("token", keycloak.token);
        localStorage.setItem("refreshToken", keycloak.refreshToken);
      }

      setAuthenticated(authenticated);
      setKeycloakInstance(keycloak);
    });
  }, []);

  return (
    <KeycloakContext.Provider
      value={{ keycloak: keycloakInstance, authenticated }}
    >
      {children}
    </KeycloakContext.Provider>
  );
};
