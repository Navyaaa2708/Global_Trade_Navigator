import React from "react";
import "./News.css";

const News = () => {
  const newsData = [
    {
      title: "Global Trade Flows Increase",
      summary:
        "Exports from Asia surged by 12% in Q3 due to strong demand in Europe and North America.",
      source: "https://www.worldbank.org/trade-update",
    },
    {
      title: "New Tariffs on Electronics",
      summary:
        "The USA has announced new tariffs on imported electronics from select countries starting November 2025.",
      source: "https://ustr.gov/trade-policy/agreements",
    },
    {
      title: "EU Trade Agreement with South America",
      summary:
        "The European Union signed a new trade agreement with Brazil and Argentina, reducing tariffs on agricultural products.",
      source: "https://trade.ec.europa.eu/news",
    },
    {
      title: "Shipping Costs Remain High",
      summary:
        "Global shipping costs are still elevated due to container shortages and port congestion, affecting import/export businesses.",
      source: "https://www.imo.org/en/MediaCentre/News",
    },
    {
      title: "China Reports Increased Exports",
      summary:
        "China's export volumes increased 8% in September 2025, mainly in electronics and machinery sectors.",
      source: "http://english.customs.gov.cn/",
    },
  ];

  return (
    <div className="hs-container">
      <h2>Trade News & Updates</h2>

      <div className="hs-news-grid">
        {newsData.map((item, idx) => (
          <div key={idx} className="hs-card">
            <h3 className="text-blue-600">{item.title}</h3>
            <p>{item.summary}</p>
            <a href={item.source} target="_blank" rel="noopener noreferrer">
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
