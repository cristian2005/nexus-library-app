import React from 'react';
import { Link } from 'react-router-dom';
import { useBooks } from '../hooks/useBooks';
import { generateCover } from '../utils/cover';

const Libro = ({ book }) => {
  const { darkMode } = useBooks();

  return (
    <article className={`book-card ${darkMode ? 'dark' : ''}`}>
      <div className="book-cover">
        <img
          src={book.image}
          alt={`Portada de ${book.title}`}
          loading="lazy"
          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = generateCover(book); }}
        />
      </div>

      <div className="book-body">
        <h2>{book.title}</h2>
        <p className="book-author">por <strong>{book.author}</strong></p>

        <ul className="book-meta">
          <li><strong>Género:</strong> {book.genre}</li>
          <li><strong>Páginas:</strong> {book.pages}</li>
          <li><strong>Idioma:</strong> {book.language}</li>
          <li><strong>Valoración:</strong> ⭐ {book.rating}</li>
          <li><strong>Stock:</strong> {book.stock} ejemplares</li>
          <li><strong>Precio:</strong> {book.price} €</li>
        </ul>

        <p className="book-synopsis">{book.synopsis}</p>

        <div className="availability">
          <span className="availability-title">Fechas de disponibilidad:</span>
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
        </div>

        <Link to={`/libro/${book.id}`} className="nav-button">
          Ver detalles del libro →
        </Link>
      </div>
    </article>
  );
};

export default Libro;
