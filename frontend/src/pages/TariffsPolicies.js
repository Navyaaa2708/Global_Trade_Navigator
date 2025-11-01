import React, { useState } from "react";
import "./TariffsPolicies.css";

const TariffPolicies = () => {
  const [product, setProduct] = useState("Coffee");
  const [country, setCountry] = useState("USA");
  const [value, setValue] = useState("");
  const [tariff, setTariff] = useState(null);

  // Example product-country tariffs (static)
  const tariffRates = {
    Coffee: { USA: 0.05, Germany: 0.07, India: 0.10 },
    Rice: { USA: 0.08, Germany: 0.12, India: 0.02 },
    Tea: { USA: 0.03, Germany: 0.05, India: 0.01 },
  };

  // Example policies
  const policies = {
    Coffee: {
      USA: [
        "Comply with FDA import regulations",
        "Mandatory labeling of origin and quality grade",
        "Tariff rate quota may apply",
      ],
      Germany: [
        "EU import regulations apply",
        "Sustainability certifications encouraged",
        "Value-added tax applicable on retail sales",
      ],
      India: [
        "Import licenses required",
        "BIS quality certification recommended",
        "Customs duty applies",
      ],
    },
    Rice: {
      USA: ["FAS regulations", "Tariff rate quota applies", "Import permit required"],
      Germany: ["EU import regulations", "Sustainability labeling", "Quota limits"],
      India: ["Phytosanitary certificate required", "Tariff may vary by variety"],
    },
    Tea: {
      USA: ["FDA compliance", "Labeling standards", "Import duties apply"],
      Germany: ["EU regulations", "Fair trade certifications encouraged"],
      India: ["Import duty applies", "Certification for organic tea recommended"],
    },
  };

  const calculateTariff = () => {
    if (!value) return;
    const rate = tariffRates[product][country] || 0;
    setTariff((parseFloat(value) * rate).toFixed(2));
  };

  return (
    <div className="hs-container tariff-container">
      <h2>Tariffs & Policies</h2>

      {/* Tariff Calculator */}
      <div className="tp-card">
        <h3>Tariff Calculator</h3>
        <label>Product</label>
        <select value={product} onChange={(e) => setProduct(e.target.value)}>
          <option value="Coffee">Coffee</option>
          <option value="Rice">Rice</option>
          <option value="Tea">Tea</option>
        </select>

        <label>Country</label>
        <select value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value="USA">USA</option>
          <option value="Germany">Germany</option>
          <option value="India">India</option>
        </select>

        <label>Import/Export Value ($)</label>
        <input
          type="number"
          placeholder="Enter value in USD"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <button className="hs-btn" onClick={calculateTariff}>
          Calculate Tariff
        </button>

        {tariff !== null && (
          <div className="tp-result">
            <p>
              Estimated Tariff for importing <strong>{product}</strong> to{" "}
              <strong>{country}</strong>: <strong>${tariff}</strong>
            </p>
          </div>
        )}
      </div>

      {/* Policies Section */}
      <div className="tp-card">
        <h3>Policies for {product} in {country}</h3>
        <ul>
          {(policies[product][country] || []).map((p, idx) => (
            <li key={idx}>{p}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TariffPolicies;
