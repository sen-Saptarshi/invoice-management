import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex mt-10 justify-left items-center space-x-4">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-200 rounded"
      >
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-200 rounded"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
