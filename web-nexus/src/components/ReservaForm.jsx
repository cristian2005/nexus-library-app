import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import ErrorState from '../components/ErrorState';
import { useBooks } from '../hooks/useBooks';

const ReservaForm = () => {
  const { id, date } = useParams();
  const navigate = useNavigate();
  const { getBookById, darkMode } = useBooks();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [quantity, setQuantity] = useState(1);
  const [mode, setMode] = useState('alquiler'); // alquiler | compra
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmation, setConfirmation] = useState(null);

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
          <Spinner />
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
            <Link to="/" className="nav-button">← Volver al inicio</Link>
          </div>
        </div>
      </div>
    );
  }

  const unitPrice = mode === 'compra' ? book.price : Math.round(book.price * 0.2 * 100) / 100;
  const total = Math.round(unitPrice * quantity * 100) / 100;

  const handleSubmit = (e) => {
    e.preventDefault();
    setConfirmation({
      code: `NEX-${Date.now().toString().slice(-6)}`,
      quantity,
      mode,
      date,
      total
    });
  };

  if (confirmation) {
    return (
      <div className={`page-container ${darkMode ? 'dark' : ''}`}>
        <div className="detail-card success-card">
          <h1>✅ Reserva confirmada</h1>
          <p>Gracias por tu reserva en <strong>Nexus</strong>, {fullName}.</p>
          <ul className="book-meta">
            <li><strong>Código:</strong> {confirmation.code}</li>
            <li><strong>Libro:</strong> {book.title}</li>
            <li><strong>Modalidad:</strong> {confirmation.mode === 'compra' ? 'Compra directa' : 'Alquiler'}</li>
            <li><strong>Fecha:</strong> {confirmation.date}</li>
            <li><strong>Ejemplares:</strong> {confirmation.quantity}</li>
            <li><strong>Total:</strong> {confirmation.total} €</li>
            <li><strong>Email:</strong> {email}</li>
          </ul>
          <div className="button-row">
            <Link to="/" className="nav-button">Volver al catálogo</Link>
            <Link to={`/libro/${book.id}`} className="nav-button secondary">Ver libro</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`page-container ${darkMode ? 'dark' : ''}`}>
      <div className="detail-card">
        <button onClick={() => navigate(-1)} className="nav-button back-button">
          ← Volver
        </button>

        <h1>Reserva / Compra</h1>
        <h2>{book.title}</h2>
        <p className="book-author">por <strong>{book.author}</strong></p>

        <form className="reserva-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Modalidad</legend>
            <label className="radio-label">
              <input
                type="radio"
                name="mode"
                value="alquiler"
                checked={mode === 'alquiler'}
                onChange={(e) => setMode(e.target.value)}
              />
              Alquiler (20 % del precio por ejemplar)
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="mode"
                value="compra"
                checked={mode === 'compra'}
                onChange={(e) => setMode(e.target.value)}
              />
              Compra directa ({book.price} € por ejemplar)
            </label>
          </fieldset>

          <div className="form-group">
            <label htmlFor="date">Fecha seleccionada:</label>
            <input type="text" id="date" value={date || 'Sin fecha'} readOnly />
          </div>

          <div className="form-group">
            <label htmlFor="quantity">Ejemplares:</label>
            <input
              type="number"
              id="quantity"
              min="1"
              max={book.stock}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Math.min(book.stock, parseInt(e.target.value) || 1)))}
              required
            />
            <small>Disponibles: {book.stock}</small>
          </div>

          <div className="form-group">
            <label htmlFor="fullName">Nombre completo:</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Ej. María López"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nombre@ejemplo.com"
              required
            />
          </div>

          <div className="summary-box">
            <p><strong>Precio unitario:</strong> {unitPrice} €</p>
            <p><strong>Total:</strong> {total} €</p>
          </div>

          <button type="submit" className="btn btn-primary">
            Confirmar {mode === 'compra' ? 'compra' : 'reserva'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReservaForm;
