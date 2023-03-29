import React from "react";
import Header from "./app/components/header/Header";
import Footer from "./app/components/footer/Footer";
import RenderRoutes from "./app/routes";
// import { renderRoutes } from "react-router-config";
// import routes from "./app/routes";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div>
      <Header />
      <Router>
        <RenderRoutes />
      </Router>
      <Footer />
    </div>
  );
}

export default App;
