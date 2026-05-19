import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useBooks } from '../hooks/useBooks';
import { usersData } from '../data/usersData';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useContext(AuthContext);
  const { darkMode } = useBooks();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = usersData.find(u => u.username === username && u.password === password);
    if (found) {
      setUser({ name: found.name, role: found.role, email: found.email });
      navigate(from, { replace: true });
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className={`page-container ${darkMode ? 'dark' : ''}`}>
      <div className="form-container">
        <h2>Iniciar Sesión</h2>
        <p>Accede con tu cuenta Nexus</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Usuario:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Ej. admin"
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Ingresa tu contraseña"
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Iniciar Sesión
          </button>
        </form>

        <div className="login-help">
          <p><strong>Usuarios de prueba:</strong></p>
          <p>Admin: <code>admin</code> / <code>admin123</code></p>
          <p>Estudiante: <code>user</code> / <code>user123</code></p>
          <p>Docente: <code>docente</code> / <code>docente123</code></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
