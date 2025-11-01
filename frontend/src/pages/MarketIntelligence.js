import React, { useState } from "react";
import "./MarketIntelligence.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const MarketIntelligence = () => {
  const [product, setProduct] = useState("");
  const [loading, setLoading] = useState(false);
  const [marketData, setMarketData] = useState(null);
  const [error, setError] = useState("");

  const fetchMarketData = async () => {
    if (!product.trim()) {
      setError("Please enter a product name.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/market-intelligence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product }),
      });

      if (!res.ok) throw new Error("Failed to fetch data.");

      const data = await res.json();
      setMarketData(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch market intelligence data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hs-container mi-container">
      <h2>Market Intelligence</h2>

      {/* Input and Button */}
      <div className="mi-filters">
        <label>
          Enter Product:{" "}
          <input
            type="text"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            placeholder="e.g., Coffee, Textiles, Steel..."
          />
        </label>
        <button className="hs-btn" onClick={fetchMarketData}>
          Analyze
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {loading ? (
        <p>🔍 Analyzing product trends...</p>
      ) : marketData ? (
        <>
          {/* Forecast Chart */}
          <div className="hs-card">
            <h3 className="text-blue-600">
              {marketData.product} Demand Forecast
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={marketData.forecast_data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="demand" stroke="#2563eb" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Top Countries Bar Chart */}
          <div className="hs-card">
            <h3 className="text-green-600">Top Countries by Demand</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={marketData.results}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Country" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="demand_index" fill="#16a34a" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pros & Cons */}
          <div className="hs-card">
            <h3 className="text-red-600">Opportunities & Risks</h3>
            {marketData.results.map((countryData, idx) => (
              <div key={idx} className="mi-country">
                <h4>{countryData.Country}</h4>
                <div className="mi-lists">
                  <div>
                    <h5>Opportunities</h5>
                    <ul>
                      {countryData.Pros.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5>Risks & Challenges</h5>
                    <ul>
                      {countryData.Cons.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p style={{ color: "#666" }}>
          Enter a product above to view global insights.
        </p>
      )}
    </div>
  );
};

export default MarketIntelligence;
