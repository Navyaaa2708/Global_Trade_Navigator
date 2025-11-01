import React from "react";
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
import "./Dashboard.css";

const Dashboard = () => {
  // Example stats
  const stats = [
    { title: "Total Products", value: "25" },
    { title: "Countries Covered", value: "50+" },
    { title: "Latest Reports", value: "12" },
    { title: "Trade Alerts", value: "5" },
  ];

  // Example mini chart data
  const demandForecast = [
    { year: 2024, demand: 200000 },
    { year: 2025, demand: 400000 },
    { year: 2026, demand: 600000 },
    { year: 2027, demand: 750000 },
    { year: 2028, demand: 900000 },
  ];

  const topCountries = [
    { country: "China", demand: 160000 },
    { country: "India", demand: 140000 },
    { country: "Vietnam", demand: 120000 },
    { country: "Germany", demand: 90000 },
    { country: "Brazil", demand: 80000 },
  ];

  const quickLinks = [
    { title: "Documentation", link: "/documentation" },
    { title: "Market Intelligence", link: "/market-intelligence" },
    { title: "Trade News & Updates", link: "/news" },
    { title: "Export Reports", link: "/reports" },
  ];

  return (
    <div className="hs-container dashboard-container">
      <h2>Welcome to Trade Intelligence Portal</h2>

      {/* Quick Stats */}
      <div className="hs-news-grid dashboard-stats">
        {stats.map((s, idx) => (
          <div key={idx} className="hs-card stat-card">
            <h3>{s.value}</h3>
            <p>{s.title}</p>
          </div>
        ))}
      </div>

      {/* Mini Charts */}
      <div className="hs-news-grid dashboard-charts">
        {/* Demand Forecast */}
        <div className="hs-card">
          <h3 className="text-blue-600">Product Demand Forecast</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={demandForecast}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="demand" stroke="#2563eb" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Countries */}
        <div className="hs-card">
          <h3 className="text-green-600">Top Importing Countries</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={topCountries}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="country" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="demand" fill="#15803d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Links */}
      <div className="hs-card dashboard-links">
        <h3>Quick Access</h3>
        <div className="hs-news-grid">
          {quickLinks.map((l, idx) => (
            <a key={idx} href={l.link}>
              {l.title}
            </a>
          ))}
        </div>
      </div>

      {/* Welcome Note */}
      <div className="hs-card dashboard-welcome">
        <h3>Hello, Welcome Back!</h3>
        <p>
          Explore the latest trade intelligence, market insights, and reports
          to make informed decisions. Use the quick links above to navigate
          across different modules.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
