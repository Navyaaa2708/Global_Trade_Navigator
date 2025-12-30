import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Components
import Sidebar from "./components/Sidebar";

// Pages
import Dashboard from "./pages/Dashboard";
import News from "./pages/News";
import HSCodeFinder from "./pages/HsCodeFinder";
import TariffsPolicies from "./pages/TariffsPolicies";
import ProductRecommender from "./pages/ProductRecommender";
import MarketIntelligence from "./pages/MarketIntelligence";
import LogisticsHub from "./pages/LogisticsHub";
import Documentation from "./pages/Documentation";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-6">
          <Routes>
            {/* Core Pages */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/news" element={<News />} />
            <Route path="/hs-code-finder" element={<HSCodeFinder />} />
            <Route path="/tariffs-policies" element={<TariffsPolicies />} />
            <Route path="/product-recommender" element={<ProductRecommender />} />
            <Route path="/market-intelligence" element={<MarketIntelligence />} />
            <Route path="/logistics-hub" element={<LogisticsHub />} />
            <Route path="/documentation" element={<Documentation />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
