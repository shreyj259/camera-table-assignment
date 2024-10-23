import React, { useState } from 'react';

interface FilterInputProps {
  icon: string;
  placeholder: string;
  altText: string;
  options: string[];
  setFilter:(query:string)=>void
}

const FilterInput: React.FC<FilterInputProps> = ({ icon, placeholder, altText, options, setFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    setFilter(option)
  };

  return (
    <div className="filter-input">
      <div className="filter-input__content" onClick={toggleOptions}>
        <img src={icon} alt={altText} className="filter-input__icon" />
        <span className="filter-input__placeholder">
          {selectedOption || placeholder}
        </span>
      </div>
      {selectedOption==""?<img
        src="./assets/down-arrow-icon.svg"
        alt=""
        className="filter-input__dropdown-icon"
        onClick={toggleOptions}
      />:<img
      src="./assets/cross-icon.svg"
      alt=""
      className="filter-input__cross-icon"
      onClick={()=>handleOptionSelect('')}
    />}
      {isOpen && (
        <ul className="filter-input__options">
          {options.map((option, index) => (
            <li
              key={index}
              className="filter-input__option"
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilterInput;