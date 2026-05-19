import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useBooks } from '../hooks/useBooks';

const Header = () => {
  const { user, setUser } = useContext(AuthContext);
  const { getCurrentBranchName, darkMode, toggleDarkMode, branch } = useBooks();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => setUser(null);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={darkMode ? 'dark' : ''}>
      <div className="header-content">
        <Link to="/" className="brand" onClick={closeMenu}>
          <h1>📚 Nexus <span className="brand-branch">· {getCurrentBranchName()}</span></h1>
        </Link>

        <button
          className={`menu-toggle ${menuOpen ? 'open' : ''}`}
          aria-label="Menú"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(v => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`header-nav ${menuOpen ? 'open' : ''}`}>
          <NavLink to="/" end className="nav-link" onClick={closeMenu}>Inicio</NavLink>
          <NavLink to="/about" className="nav-link" onClick={closeMenu}>Nosotros</NavLink>
          <NavLink to={`/sucursal/${branch}`} className="nav-link" onClick={closeMenu}>Sucursal</NavLink>
          {user && user.role === 'admin' && (
            <NavLink to="/admin" className="nav-link" onClick={closeMenu}>Admin</NavLink>
          )}

          <div className="header-controls">
            <button className="dark-mode-toggle" onClick={toggleDarkMode}>
              {darkMode ? '☀️ Claro' : '🌙 Oscuro'}
            </button>

            {user ? (
              <>
                <span className="user-greeting">Hola, {user.name}</span>
                <button onClick={handleLogout} className="auth-button logout">
                  Cerrar sesión
                </button>
              </>
            ) : (
              <Link to="/login" className="auth-button" onClick={closeMenu}>
                Iniciar sesión
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
