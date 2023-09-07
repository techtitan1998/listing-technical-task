import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];

    const maxVisiblePages = 5;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);

    if (currentPage > 1) {
      buttons.push(
        <button
          key="prev"
          onClick={() => goToPage(currentPage - 1)}
          className="pagination-link"
        >
          Previous
        </button>
      );
    }

    const start = Math.max(1, currentPage - halfVisiblePages);
    const end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (start > 1) {
      buttons.push(
        <button key={1} onClick={() => goToPage(1)} className="pagination-link">
          1
        </button>
      );
      if (start > 2) {
        buttons.push(
          <span key="ellipsis_start" className="pagination-ellipsis">
            ...
          </span>
        );
      }
    }

    for (let i = start; i <= end; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`pagination-link ${currentPage === i ? "active" : ""}`}
        >
          {i}
        </button>
      );
    }

    if (end < totalPages) {
      if (end < totalPages - 1) {
        buttons.push(
          <span key="ellipsis_end" className="pagination-ellipsis">
            ...
          </span>
        );
      }
      buttons.push(
        <button
          key={totalPages}
          onClick={() => goToPage(totalPages)}
          className="pagination-link"
        >
          {totalPages}
        </button>
      );
    }

    if (currentPage < totalPages) {
      buttons.push(
        <button
          key="next"
          onClick={() => goToPage(currentPage + 1)}
          className="pagination-link"
        >
          Next
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="pagination-container">{renderPaginationButtons()}</div>
  );
};

export default Pagination;
