import React from 'react';

interface PaginationNavigationProps {
  currentPage: number;
  totalPages: number;
  onFirstPage: () => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onLastPage: () => void;
}

export const PaginationNavigation: React.FC<PaginationNavigationProps> = ({
  currentPage,
  totalPages,
  onFirstPage,
  onPreviousPage,
  onNextPage,
  onLastPage
}) => {
  return (
    <div className="pagination-actions" role="group" aria-label="Pagination controls">
      <button
        className="nav-button"
        onClick={onFirstPage}
        disabled={currentPage === 1}
        aria-label="First page"
      >
        <img src="./assets/arrow-left-left.svg" alt="" className="nav-icon" aria-hidden="true" />
      </button>
      
      <button
        className="nav-button"
        onClick={onPreviousPage}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <img src="./assets/arrow-left.svg" alt="" className="nav-icon" aria-hidden="true" />
      </button>
      
      <button
        className="nav-button"
        onClick={onNextPage}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <img src="./assets/arrow-right.svg" alt="" className="nav-icon" aria-hidden="true" />
      </button>
      
      <button
        className="nav-button"
        onClick={onLastPage}
        disabled={currentPage === totalPages}
        aria-label="Last page"
      >
        <img src="./assets/arrow-right-right.svg" alt="" className="nav-icon" aria-hidden="true" />
      </button>
    </div>
  );
};