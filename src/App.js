import React from "react";
import Header from "./app/components/header/Header";
import Footer from "./app/components/footer/Footer";
import RenderRoutes from "./app/routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { KeycloakProvider } from "./app/components/keycloak/KeycloakProvider";

const App = () => {
  return (
    <div className="flex flex-col h-screen">
      <Router>
        <KeycloakProvider>
          <Header />
          {/* <div className="flex-1 min-h-0"> */}
          <Routes>
            <Route path="*" element={<RenderRoutes />} />
          </Routes>
          {/* </div> */}
          <Footer />
        </KeycloakProvider>
      </Router>
    </div>
  );
};

export default App;
