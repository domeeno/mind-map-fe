import React from "react";
import Header from "./app/components/header/Header";
import Footer from "./app/components/footer/Footer";
import RenderRoutes from "./app/routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = (props) => {
  return (
    <div>
      {/* <ReactKeycloakProvider authClient={props.keycloak}> */}
      {/* pass it better */}
      <Header keycloak={props.keycloak} />
      <div className="content">
        <Router>
          <Routes>
            <Route path="*" element={<RenderRoutes />} />
          </Routes>
        </Router>
      </div>
      <Footer />
      {/* </ReactKeycloakProvider> */}
    </div>
  );
};

export default App;
