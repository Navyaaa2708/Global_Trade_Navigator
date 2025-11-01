import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex-1 p-6 bg-gray-100">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/news" element={<News />} />
            <Route path="/hs-code-finder" element={<HSCodeFinder />} />
            <Route path="/tariffs-policies" element={<TariffsPolicies />} />
            <Route path="/product-recommender" element={<ProductRecommender />} />
            <Route path="/market-intelligence" element={<MarketIntelligence />} />
            <Route path="/logistics-hub" element={<LogisticsHub />} />
            <Route path="/documentation" element={<Documentation />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
