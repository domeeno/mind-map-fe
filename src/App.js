import React from "react";
import Header from "./app/components/header/Header";
import Footer from "./app/components/footer/Footer";
import RenderRoutes from "./app/routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Router>
        <div className="relative z-0">
          <Header />
          <Routes>
            <Route path="*" element={<RenderRoutes />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </div>
  );
};

export default App;
