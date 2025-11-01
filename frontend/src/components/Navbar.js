import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [openTrade, setOpenTrade] = useState(false);
  const [openOperations, setOpenOperations] = useState(false);

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-4 font-bold text-xl">
            <Link to="/">Global Trade Navigator</Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/" className="hover:bg-blue-700 px-3 py-2 rounded">Dashboard</Link>
            <Link to="/news" className="hover:bg-blue-700 px-3 py-2 rounded">News & Updates</Link>

            {/* Trade Intelligence Dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpenTrade(!openTrade)}
                className="hover:bg-blue-700 px-3 py-2 rounded flex items-center"
              >
                Trade Intelligence ▼
              </button>
              {openTrade && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-10">
                  <Link to="/hs-code" className="block px-4 py-2 hover:bg-gray-200">HS Code Finder</Link>
                  <Link to="/tariffs" className="block px-4 py-2 hover:bg-gray-200">Tariffs & Policies</Link>
                  <Link to="/product-recommender" className="block px-4 py-2 hover:bg-gray-200">Product Recommender</Link>
                  <Link to="/market-intelligence" className="block px-4 py-2 hover:bg-gray-200">Market Intelligence</Link>
                  <Link to="/demand-forecast" className="block px-4 py-2 hover:bg-gray-200">Demand Forecasting</Link>
                </div>
              )}
            </div>

            {/* Operations Dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpenOperations(!openOperations)}
                className="hover:bg-blue-700 px-3 py-2 rounded flex items-center"
              >
                Operations ▼
              </button>
              {openOperations && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg z-10">
                  <Link to="/logistics" className="block px-4 py-2 hover:bg-gray-200">Logistics Hub</Link>
                  <Link to="/documentation" className="block px-4 py-2 hover:bg-gray-200">Documentation</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
