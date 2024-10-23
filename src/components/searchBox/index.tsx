import React from 'react';
import './searchbox.css';
import useDebounce from '../../utils/useDebounce';

interface SearchBoxProps {
  setSearchQuery:(query: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({setSearchQuery}) => {

  const debouncedSetSearch=useDebounce(setSearchQuery);


  return (
    <div className="search-box flex justify-center items-center">
      <input
        type="text"
        className="search-input"
        placeholder="Seach"
        aria-label="Search"
        onChange={(e)=>debouncedSetSearch(e.target.value)}
      />
      <button className="search-button" aria-label="Submit search">
        <img src="./assets/search.svg" alt="" className="search-icon" />
      </button>
    </div>
  );
};

export default SearchBox;