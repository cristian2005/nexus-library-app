import React from 'react';
import { useBooks } from '../hooks/useBooks';

const SucursalSelector = () => {
  const { branch, changeBranch, darkMode } = useBooks();

  const branches = [
    { value: 'madrid', label: '📍 Madrid' },
    { value: 'barcelona', label: '📍 Barcelona' },
    { value: 'valencia', label: '📍 Valencia' },
    { value: 'sevilla', label: '📍 Sevilla' }
  ];

  return (
    <div className={`branch-selector ${darkMode ? 'dark' : ''}`}>
      <label htmlFor="branch-select">
        Selecciona la sucursal Nexus:
      </label>
      <select
        id="branch-select"
        value={branch}
        onChange={(e) => changeBranch(e.target.value)}
      >
        {branches.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SucursalSelector;
