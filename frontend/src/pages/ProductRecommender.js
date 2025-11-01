import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import "./ProductRecommender.css";

const ProductRecommender = () => {
  const [country, setCountry] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    if (!country.trim()) {
      setError("Please enter a country.");
      return;
    }

    setLoading(true);
    setError(null);
    setProducts([]);

    try {
      const res = await fetch("http://localhost:5000/product-recommender", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: country.trim() }),
      });

      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();

      if (data.products && data.products.length > 0) {
        // Add a dummy "demand" score if not present
        const productsWithScore = data.products.map((p, idx) => ({
          ...p,
          demand: p.demand || Math.floor(Math.random() * 100) + 50, // random score 50-150
        }));
        setProducts(productsWithScore);
      } else {
        setError("No products found for this country.");
      }
    } catch (err) {
      setError("Unable to fetch product recommendations.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pr-container">
      <h2>Product Recommendations</h2>

      <div className="pr-input">
        <label>
          Enter Country:
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="e.g., Japan"
          />
        </label>
        <button className="hs-btn" onClick={fetchProducts}>
          Get Top Products
        </button>
      </div>

      {loading && <p className="pr-loading">Fetching recommendations...</p>}
      {error && <p className="pr-error">{error}</p>}

      {!loading && !error && products.length === 0 && (
        <p className="pr-info">
          Enter a country to view the top export products and trade tips.
        </p>
      )}

      {/* Chart comes first */}
      {products.length > 0 && (
        <div className="pr-chart">
          <h3>Product Demand Visualization</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={products} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="title" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="demand" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Then the detailed product cards */}
      <div className="pr-grid">
        {products.map((p, idx) => (
          <div key={idx} className="pr-card">
            <h3>{p.title}</h3>
            <p><strong>Summary:</strong> {p.summary}</p>
            <p><strong>Tips:</strong> {p.tips}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductRecommender;
