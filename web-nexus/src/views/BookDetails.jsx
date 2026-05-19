import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import ErrorState from '../components/ErrorState';
import { useBooks } from '../hooks/useBooks';
import { generateCover } from '../utils/cover';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { getBookById, darkMode } = useBooks();
  const highlightDate = searchParams.get('date');

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    getBookById(id)
      .then(data => {
        if (cancelled) return;
        if (!data) setError('Libro no encontrado');
        setBook(data || null);
      })
      .catch(err => {
        if (cancelled) return;
        setError(err.message || 'Error cargando el libro');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [id, getBookById]);

  if (loading) {
    return (
      <div className={`page-container ${darkMode ? 'dark' : ''}`}>
        <div className="detail-card">
          <Spinner message="Cargando libro…" />
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className={`page-container ${darkMode ? 'dark' : ''}`}>
        <div className="detail-card">
          <ErrorState
            message={error || 'Libro no encontrado'}
            onRetry={() => window.location.reload()}
          />
          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <Link to="/" className="nav-button">Volver al catálogo</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`page-container ${darkMode ? 'dark' : ''}`}>
      <div className="detail-card book-detail">
        <button
          onClick={() => navigate(-1)}
          className="nav-button back-button"
        >
          ← Volver
        </button>

        <div className="book-detail-grid">
          <div className="book-detail-cover">
            <img
              src={generateCover(book)}
              alt={`Portada de ${book.title}`}
            />
          </div>

          <div className="book-detail-info">
            <h1>{book.title}</h1>
            <p className="book-author">por <strong>{book.author}</strong></p>

            <div className="info-grid">
              <div className="info-item"><strong>Género</strong><span>{book.genre}</span></div>
              <div className="info-item"><strong>Páginas</strong><span>{book.pages}</span></div>
              <div className="info-item"><strong>Valoración</strong><span>⭐ {book.rating}</span></div>
              <div className="info-item"><strong>Año</strong><span>{book.year}</span></div>
              <div className="info-item"><strong>Editorial</strong><span>{book.publisher}</span></div>
              <div className="info-item"><strong>Idioma</strong><span>{book.language}</span></div>
              <div className="info-item"><strong>ISBN</strong><span>{book.isbn}</span></div>
              <div className="info-item"><strong>Stock</strong><span>{book.stock}</span></div>
              <div className="info-item"><strong>Precio</strong><span>{book.price} €</span></div>
            </div>
          </div>
        </div>

        <section className="detail-section">
          <h3>Sinopsis</h3>
          <p>{book.synopsis}</p>
        </section>

        {highlightDate && (
          <div className="highlight-box">
            <p><strong>Fecha seleccionada:</strong> {highlightDate}</p>
          </div>
        )}

        <section className="detail-section">
          <h3>Fechas de disponibilidad</h3>
          <p>Reserva o compra el libro en una de las siguientes fechas:</p>
          <div className="availability-dates">
            {book.availableDates?.map((date, index) => (
              <Link
                key={index}
                to={`/libro/${book.id}/reserva/${date}`}
                className="availability-chip"
              >
                {date}
              </Link>
            ))}
          </div>
        </section>

        <div className="button-row">
          <Link
            to={`/libro/${book.id}/reserva/${book.availableDates?.[0] || ''}`}
            className="nav-button primary"
          >
            Comprar o reservar
          </Link>
          <Link to="/" className="nav-button secondary">Volver al catálogo</Link>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
