import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <h5 className="mb-3" href="https://domeeno.github.io/">
        by Dominic Flocea
      </h5>

      <div className="footer-text ml-1">
        <ul>
          <li>
            <a href="https://github.com/domeeno">Github</a>
          </li>
          <li>
            <a href="https://domeeno.github.io/">Blog</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
