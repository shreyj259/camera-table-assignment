import React, { useState } from 'react';
import { PaginationDropdown } from './PaginationDropdown';
import { PaginationNavigation } from './PaginationNavigation';
import './pagination.css';

interface PaginationControlsProps {
  currentPage: number;
  totalItems: number;
  onItemsPerPageChange: (value: number) => void;
  onPageChange: (page: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalItems,
  onItemsPerPageChange,
  onPageChange
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [itemsPerPage,setItemsPerPage]=useState(10);

  const handleItemsPerPage=(value:number)=>{
    setItemsPerPage(value);
    onItemsPerPageChange(value)
  }
  
  const startItem = ((currentPage - 1) * itemsPerPage) + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleFirstPage = () => onPageChange(1);
  const handlePreviousPage = () => onPageChange(Math.max(1, currentPage - 1));
  const handleNextPage = () => onPageChange(Math.min(totalPages, currentPage + 1));
  const handleLastPage = () => onPageChange(totalPages);

  return (
    <nav className="pagination" aria-label="Pagination Navigation">
      <div className="pagination-options">
        <PaginationDropdown
          value={itemsPerPage}
          isOpen={isDropdownOpen}
          onToggle={() => setIsDropdownOpen(!isDropdownOpen)}
          onChange={(value) => {
            handleItemsPerPage(value);
            setIsDropdownOpen(false);
          }}
        />
        
        <span className="items-count" aria-live="polite">
          {`${startItem}-${endItem} of ${totalItems}`}
        </span>

        <PaginationNavigation
          currentPage={currentPage}
          totalPages={totalPages}
          onFirstPage={handleFirstPage}
          onPreviousPage={handlePreviousPage}
          onNextPage={handleNextPage}
          onLastPage={handleLastPage}
        />
      </div>
    </nav>
  );
};

export default PaginationControls;