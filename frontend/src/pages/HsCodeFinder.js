import React, { useState } from "react";
import "./HSCodeFinder.css";

const HSCodeFinder = () => {
  const [product, setProduct] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Example static HS code dataset
  const hsData = [
    { product: "Coffee", hsCode: "0901", description: "Coffee, roasted or unroasted" },
    { product: "Tea", hsCode: "0902", description: "Tea, green or black" },
    { product: "Rice", hsCode: "1006", description: "Rice, husked, milled, or polished" },
    { product: "Wheat", hsCode: "1001", description: "Wheat and meslin" },
    { product: "Sugar", hsCode: "1701", description: "Cane or beet sugar and chemically pure sucrose" },
  ];

  const handleSearch = () => {
    if (!product.trim()) return;
    setLoading(true);

    // Filter HS codes by product name
    const filtered = hsData.filter((item) =>
      item.product.toLowerCase().includes(product.trim().toLowerCase())
    );

    setResults(filtered);
    setLoading(false);
  };

  return (
    <div className="hs-container hscode-container">
      <h2>HS Code Finder</h2>

      <div className="hs-card hs-search-card">
        <label>
          Enter Product Name:
          <input
            type="text"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            placeholder="e.g., Coffee"
          />
        </label>
        <button className="hs-btn" onClick={handleSearch}>
          Find HS Code
        </button>
      </div>

      {loading && <p>Searching...</p>}

      {results.length > 0 && (
        <div className="hs-news-grid hs-results">
          {results.map((r, idx) => (
            <div key={idx} className="hs-card hs-result-card">
              <h3>{r.product}</h3>
              <p>
                <strong>HS Code:</strong> {r.hsCode}
              </p>
              <p>{r.description}</p>
            </div>
          ))}
        </div>
      )}

      {results.length === 0 && !loading && product && (
        <p>No HS code found for "{product}"</p>
      )}
    </div>
  );
};

export default HSCodeFinder;
