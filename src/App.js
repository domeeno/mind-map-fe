import React from "react";
import Header from "./app/components/header/Header";
import Footer from "./app/components/footer/Footer";
import RenderRoutes from "./app/routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { KeycloakProvider } from "./app/components/keycloak/KeycloakProvider";
import "./styles";

const App = () => {
  return (
    <div className="grid h-screen" style={{
      gridTemplateRows: "4.5rem auto 6rem"
    }}>
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
