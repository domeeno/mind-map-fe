import React from "react";
import { styles } from "../../../styles";
import "./Footer.css";

const Footer = () => {
  return (
    <div
      className={`${styles.paddingX} text-xs w-full flex-col justify-between items-center py-3 footer-shadow`}
    >
      <h5 className="flex items-center gap-2 px-4  text-gray-600">
        by Dominic Flocea
      </h5>

      <div className="footer-text ml-1 py-2 px-4 text-gray-600">
        <ul className="list-disc list-inside mb-2">
          <li>
            <a
              className=" hover:text-indigo-200"
              href="https://github.com/domeeno"
            >
              Github
            </a>
          </li>
          <li>
            <a
              className="hover:text-indigo-200"
              href="https://domeeno.github.io/"
            >
              Blog
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
