import React from 'react';

const ErrorState = ({ message, onRetry }) => {
  return (
    <div className="error-state">
      <div className="error-state__icon">⚠️</div>
      <p className="error-state__message">{message || 'Ha ocurrido un error'}</p>
      {onRetry && (
        <button onClick={onRetry} className="error-state__button">
          Reintentar
        </button>
      )}
    </div>
  );
};

export default ErrorState;
