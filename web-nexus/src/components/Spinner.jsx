import React from 'react';

const Spinner = ({ message = 'Cargando…' }) => {
  return (
    <div className="spinner">
      <div className="spinner-circle"></div>
      <p className="spinner-message">{message}</p>
    </div>
  );
};

export default Spinner;
