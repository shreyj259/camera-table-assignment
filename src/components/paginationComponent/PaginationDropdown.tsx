import React from 'react';

interface PaginationDropdownProps {
  value: number;
  isOpen: boolean;
  onToggle: () => void;
  onChange: (value: number) => void;
}

export const PaginationDropdown: React.FC<PaginationDropdownProps> = ({
  value,
  isOpen,
  onToggle,
  onChange
}) => {
  const options = [5, 10, 15, 20, 25];

  return (
    <div className="dropdown-container">
      <button
        className="page-selector"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select items per page"
      >
        <span>{value}</span>
        <img 
          src="./assets/down-arrow-icon.svg" 
          alt="" 
          className="dropdown-arrow" 
          aria-hidden="true"
        />
      </button>
      
      {isOpen && (
        <ul
          className="dropdown-menu"
          role="listbox"
          aria-label="Items per page options"
        >
          {options.map((option) => (
            <li
              key={option}
              role="option"
              aria-selected={option === value}
              className="dropdown-item"
              onClick={() => onChange(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};