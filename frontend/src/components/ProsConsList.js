import React from "react";

const ProsConsList = ({ prosCons }) => {
  if (!prosCons || prosCons.length === 0) {
    return <p className="text-gray-500 mt-2">No pros/cons data available.</p>;
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Pros & Cons</h2>
      {prosCons.map((item, idx) => (
        <div
          key={idx}
          className="mb-4 p-4 border rounded-lg shadow-sm bg-gray-50"
        >
          <h3 className="font-bold text-lg text-blue-600 mb-2">{item.Country}</h3>

          {/* Pros */}
          <p className="font-semibold text-green-600">Pros:</p>
          <ul className="list-disc ml-6">
            {item.Pros && item.Pros.length > 0 ? (
              item.Pros.map((p, i) => (
                <li key={i} className="text-gray-800">
                  {p}
                </li>
              ))
            ) : (
              <li className="text-gray-500">No pros available</li>
            )}
          </ul>

          {/* Cons */}
          <p className="font-semibold text-red-600 mt-2">Cons:</p>
          <ul className="list-disc ml-6">
            {item.Cons && item.Cons.length > 0 ? (
              item.Cons.map((c, i) => (
                <li key={i} className="text-gray-800">
                  {c}
                </li>
              ))
            ) : (
              <li className="text-gray-500">No cons available</li>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ProsConsList;
