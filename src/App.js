import React from "react";
import Header from "./app/components/header/Header";
import Footer from "./app/components/footer/Footer";
import RenderRoutes from "./app/routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import keycloak from "./app/components/keycloak/keycloak";
import { ReactKeycloakProvider } from "@react-keycloak/web";

function App() {
  return (
    <div>
      <Header />
      <ReactKeycloakProvider authClient={keycloak}>
        <Router>
          <Routes>
            <Route path="*" element={<RenderRoutes />} />
          </Routes>
        </Router>
      </ReactKeycloakProvider>
      <Footer />
    </div>
  );
}

export default App;
