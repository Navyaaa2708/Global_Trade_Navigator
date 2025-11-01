import React from 'react';

const TopCountriesTable = ({ topCountries }) => {
  return (
    <div>
      <h2>Top 5 Countries</h2>
      <table>
        <thead>
          <tr>
            <th>Country</th>
            <th>Demand Index</th>
          </tr>
        </thead>
        <tbody>
          {topCountries.map((item, idx) => (
            <tr key={idx}>
              <td>{item.Country}</td>
              <td>{item.Demand_Index.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopCountriesTable;
