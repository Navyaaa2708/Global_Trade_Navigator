import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css"; // Make sure this CSS file exists

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h1 className="sidebar-title">Global Trade Navigator</h1>

      <ul className="sidebar-list">
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/news">News & Updates</Link>
        </li>

        <li className="sidebar-subtitle">Trade Intelligence</li>
        <li>
          <Link to="/hs-code-finder">HS Code Finder</Link>
        </li>
        <li>
          <Link to="/tariffs-policies">Tariffs & Policies</Link>
        </li>
        <li>
          <Link to="/product-recommender">Product Recommender</Link>
        </li>
        <li>
          <Link to="/market-intelligence">Market Intelligence</Link>
        </li>

        <li className="sidebar-subtitle">Operations</li>
        <li>
          <Link to="/logistics-hub">Logistics Hub</Link>
        </li>
        <li>
          <Link to="/documentation">Documentation</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
