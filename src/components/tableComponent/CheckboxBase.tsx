import React from 'react';
import { CheckboxBaseProps } from './types';
import './table.css';

export const CheckboxBase: React.FC<CheckboxBaseProps> = ({
  onSelect,
  checked = false,
  id,
  ariaLabel
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onSelect?.();
    }
  };

  return (
    <div
      role="checkbox"
      tabIndex={0}
      aria-checked={checked}
      onClick={onSelect}
      onKeyPress={handleKeyPress}
      id={id}
      aria-label={ariaLabel}
      className="checkbox-base"
    />
  );
};