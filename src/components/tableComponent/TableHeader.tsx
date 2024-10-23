import React from 'react';
import { TableHeaderProps } from './types';
import { ColumnHeader } from './ColumnHeader';
import { CheckboxBase } from './CheckboxBase';
import './table.css';

export const TableHeader: React.FC<TableHeaderProps> = ({
  onSelectAll,
  allSelected = false
}) => {
  const columns = [
    { label: 'Health',width: '250px'},
    { label: 'Location', width:"130px"},
    { label: 'Recorder', width:"160px" },
    { label: 'Tasks', width:"70px" },
    { label: 'Status',  width:"100px"},
    { label: 'Actions',upperCase:true, width:"130px" }
  ];

  return (
    <header className="table-header">
      <div className="header-select-group">
        <CheckboxBase
          onSelect={onSelectAll}
          checked={allSelected}
          ariaLabel="Select all items"
        />
        <ColumnHeader label="Name" />
      </div>
      <div className="header-columns-group">
        {columns.map((column, index) => (
          <ColumnHeader
            key={index}
            label={column.label}
            width={column.width}
          />
        ))}
      </div>
    </header>
  );
};