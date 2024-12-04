import React, { useState } from "react";

const SearchFilter = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="flex space-x-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by invoice number or customer name"
        className="border px-2 py-1 rounded"
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Search
      </button>
    </div>
  );
};

export default SearchFilter;
