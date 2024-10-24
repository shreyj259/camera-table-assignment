import React from 'react';
import FilterInput from './FilterInput';
import './filter.css'

const Filters: React.FC<{ setLocation: (query: string) => void; setStatus: (query: string) => void }> = ({ setLocation, setStatus }) => {
  const filterInputs = [
    {
      icon: "./assets/location-icon.svg",
      placeholder: "Location",
      altText: "Location icon",
      options: ["Denver", "Chicago", "Los Angeles", "San Diego", "Miami","Houston","New York City"],
      setFilter:setLocation
    },
    {
      icon: "./assets/status-icon.svg",
      placeholder: "Status",
      altText: "Status icon",
      options: ["Active", "Inactive"],
      setFilter:setStatus
    }
  ];

  return (
    <section className="filters">
      {filterInputs.map((input, index) => (
        <FilterInput
          setFilter={input.setFilter}
          key={index}
          icon={input.icon}
          placeholder={input.placeholder}
          altText={input.altText}
          options={input.options}
        />
      ))}
    </section>
  );
};

export default Filters;