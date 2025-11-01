import React, { useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import "./ForecastForm.css";

export default function ForecastForm() {
  const [product, setProduct] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResults(null);

    try {
      const res = await axios.post("http://127.0.0.1:5000/forecast", { product });
      const data = res.data;
      if (data.results && data.results.length > 0) {
        setResults(data.results);
      } else {
        setError("No data found for this product.");
      }
    } catch (err) {
      console.error(err);
      setError("Network error or backend failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forecast-container">
      <h1>AI-Powered Trade Advisor</h1>
      <form onSubmit={handleSubmit} className="forecast-form">
        <input
          type="text"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          placeholder="Enter product name"
        />
        <button type="submit">Get Forecast</button>
      </form>

      {loading && <p className="loading-text">Fetching data...</p>}
      {error && <p className="error-text">{error}</p>}

      {results && !loading && !error && (
        <>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={results}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Country" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Demand_Index" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="pros-cons-grid">
            {results.map((item, idx) => (
              <div key={idx} className="pros-cons-card">
                <h3>{item.Country}</h3>

                <div>
                  <p className="pros-title">Pros:</p>
                  <ul>
                    {item.Pros && item.Pros.length > 0
                      ? item.Pros.slice(0, 4).map((p, i) => <li key={i}>{p}</li>)
                      : <li>No pros available</li>}
                  </ul>
                </div>

                <div>
                  <p className="cons-title">Cons:</p>
                  <ul>
                    {item.Cons && item.Cons.length > 0
                      ? item.Cons.slice(0, 4).map((c, i) => <li key={i}>{c}</li>)
                      : <li>No cons available</li>}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
