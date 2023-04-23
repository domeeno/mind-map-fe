import React from "react";
import { styles } from "../../../styles";
import { Link, useLocation } from "react-router-dom";
import { useKeycloak } from "../keycloak/KeycloakProvider";

const Header = () => {
  const { keycloak, authenticated } = useKeycloak();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    keycloak.logout();
  };

  return (
    <nav className={`${styles.paddingX} w-full flex items-center py-3 `}>
      <div className="w-full flex justify-between items-center ">
        <Link
          to={authenticated ? "/" : "/welcome"}
          className="flex items-center gap-2"
        >
          <h1 className="text-2xl text-white py-2 px-4">.Hortex</h1>
        </Link>
        <ul className="list-none hidden sm:flex items-right flex-row gap-10">
          <li
            className={`${
              location.pathname === "/about" ? "text-white" : "text-secondary"
            } py-2 px-4 hover:text-white font-medium`}
          >
            <Link to="/about">About</Link>
          </li>
          <li
            className={`${
              location.pathname === "/subjects"
                ? "text-white"
                : "text-secondary"
            } py-2 px-4 hover:text-white font-medium`}
          >
            <Link to="/subjects">Subjects</Link>
          </li>
          <li>
            {/* just a vertical grey line div with tailwind css classes */}
            <div className="w-[2px] h-full bg-[#3A405A]" />
          </li>
          <li>
            {authenticated ? (
              <button className="py-2 px-4" onClick={() => handleLogout()}>
                Logout
              </button>
            ) : (
              <button
                className="text-teal-200 hover:text-indigo-200 py-2 px-4 border border-gray-500 hover:border-transparent rounded"
                onClick={() => keycloak.login()}
              >
                Login
              </button>
            )}
          </li>
        </ul>

        {/* TODO make a mobile view for nav https://trello.com/c/AzH30uT9/5-mobile-nav */}
      </div>
    </nav>
  );
};

export default Header;
