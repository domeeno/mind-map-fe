import React from "react";
import Header from "./app/components/header/Header";
import Footer from "./app/components/footer/Footer";
import RenderRoutes from "./app/routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { KeycloakProvider } from "./app/components/keycloak/KeycloakProvider";

const App = () => {
  return (
    <div>
      <Router>
        <div className="relative z-0">
          <KeycloakProvider>
            <Header />
            <Routes>
              <Route path="*" element={<RenderRoutes />} />
            </Routes>
            <Footer />
          </KeycloakProvider>
        </div>
      </Router>
    </div>
  );
};

export default App;
