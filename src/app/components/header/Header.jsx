import React from "react";
import { styles } from "../../../styles";
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20`}
    >
      <div className="w-full flex justify-between items-center ">
        <Link to="/" className="flex items-center gap-2">
          <h1 className="text-white py-2 px-4">.Hortex</h1>
        </Link>

        <ul className="list-none hidden sm:flex items-right flex-row gap-10">
          <li
            className={`${
              window.location.pathname === "/about"
                ? "text-white"
                : "text-secondary"
            } py-2 px-4 hover:text-white font-medium`}
          >
            <a href="/about">About</a>
          </li>
          <li>
            {props.keycloak.authenticated ? (
              <button
                className="py-2 px-4"
                onClick={() => props.keycloak.logout()}
              >
                Logout
              </button>
            ) : (
              <button
                className="text-teal-200 hover:text-indigo-200 py-2 px-4 border border-gray-500 hover:border-transparent rounded"
                onClick={() => props.keycloak.login()}
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
