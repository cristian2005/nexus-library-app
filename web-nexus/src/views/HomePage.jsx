import React from 'react';
import SucursalSelector from '../components/SucursalSelector';
import Libro from '../components/Libro';
import Spinner from '../components/Spinner';
import ErrorState from '../components/ErrorState';
import { useBooks } from '../hooks/useBooks';

const HomePage = () => {
  const { books, loading, error, refetch, darkMode, getCurrentBranchName } = useBooks();

  return (
    <div className={`home-page ${darkMode ? 'dark' : ''}`}>
      <section className="hero">
        <h1>Librería Nexus</h1>
        <p className="hero-sub">
          Libros, co-working y cafetería en el corazón del campus universitario.
        </p>
      </section>

      <SucursalSelector />

      <h2 className="catalog-title">
        Catálogo disponible en {getCurrentBranchName()}
      </h2>

      {loading ? (
        <Spinner message="Cargando catálogo…" />
      ) : error ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : books.length === 0 ? (
        <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
          No hay libros disponibles en esta sucursal.
        </p>
      ) : (
        <div className="books-grid">
          {books.map((book) => (
            <Libro key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
