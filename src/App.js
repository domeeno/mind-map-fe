import React from "react";
// import { renderRoutes } from "react-router-config";
import Header from "./app/components/header/Header";
import Footer from "./app/components/footer/Footer";
// import routes from './app/routes';
// import { BrowserRouter as Router } from 'react-router-dom';
import LoginPage from "./app/pages/login/LoginPage";

function App() {
  return (
    <div>
      <Header />
      <LoginPage />
      <Footer />
    </div>
  );
}

export default App;
