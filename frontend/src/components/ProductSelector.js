import React from 'react';

const ProductSelector = ({ product, setProduct, handleFetchData }) => {
  return (
    <div>
      <input
        type="text"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        placeholder="Enter product name"
      />
      <button onClick={handleFetchData}>Get Top Countries</button>
    </div>
  );
};

export default ProductSelector;
