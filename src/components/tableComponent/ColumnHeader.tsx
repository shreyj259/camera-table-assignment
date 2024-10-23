import React from 'react';
import { ColumnHeaderProps } from './types';
import './table.css';

export const ColumnHeader: React.FC<ColumnHeaderProps> = ({
  label,
  uppercase = true,
  width="200px"
}) => (
  <div style={{width:width}} className="column-header">
    <span className={`header-text ${uppercase ? 'uppercase' : ''}`}>
      {label}
    </span>
  </div>
);