import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import ErrorState from '../components/ErrorState';
import { useBooks } from '../hooks/useBooks';

const SucursalDetail = () => {
  const { branch: branchParam } = useParams();
  const navigate = useNavigate();
  const { darkMode, branchesData, branchesLoading, branchesError } = useBooks();

  if (branchesLoading) {
    return (
      <div className={`page-container ${darkMode ? 'dark' : ''}`}>
        <div className="detail-card">
          <Spinner message="Cargando sucursal…" />
        </div>
      </div>
    );
  }

  if (branchesError) {
    return (
      <div className={`page-container ${darkMode ? 'dark' : ''}`}>
        <div className="detail-card">
          <ErrorState 
            message={branchesError} 
            onRetry={() => window.location.reload()} 
          />
          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <button onClick={() => navigate(-1)} className="nav-button">← Volver</button>
          </div>
        </div>
      </div>
    );
  }

  const branch = branchesData[branchParam];

  if (!branch) {
    return (
      <div className={`page-container ${darkMode ? 'dark' : ''}`}>
        <div className="detail-card">
          <h1>Sucursal no encontrada</h1>
          <button onClick={() => navigate(-1)} className="nav-button">← Volver</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`page-container ${darkMode ? 'dark' : ''}`}>
      <div className="detail-card">
        <button
          onClick={() => navigate(-1)}
          className="nav-button back-button"
        >
          ← Volver
        </button>

        <h1>{branch.name}</h1>

        <div className="info-grid">
          <div className="info-item">
            <strong>Aforo co-working</strong>
            <span>{branch.coworkingSeats} puestos</span>
          </div>
          <div className="info-item">
            <strong>Conectividad</strong>
            <span>{branch.wifi}</span>
          </div>
          <div className="info-item">
            <strong>Aparcamiento</strong>
            <span>{branch.parking ? 'Disponible' : 'No disponible'}</span>
          </div>
          <div className="info-item">
            <strong>Horario</strong>
            <span>{branch.hours}</span>
          </div>
        </div>

        <section className="detail-section">
          <h3>Contacto</h3>
          <p><strong>Dirección:</strong> {branch.address}</p>
          <p><strong>Teléfono:</strong> {branch.phone}</p>
        </section>

        <section className="detail-section">
          <h3>Catálogo actual</h3>
          <p>
            En esta sucursal ofrecemos {branch.books?.length || 0} títulos disponibles.
          </p>

          <div className="branch-books-list">
            {branch.books?.map(book => (
              <Link
                key={book.id}
                to={`/libro/${book.id}`}
                className="branch-book-item"
              >
                <strong>{book.title}</strong>
                <span>{book.author} · {book.genre}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SucursalDetail;
