import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import { GlobalProvider } from './context/GlobalContext';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './views/HomePage';
import AboutUs from './views/AboutUs';
import SucursalDetail from './views/SucursalDetail';
import BookDetails from './views/BookDetails';
import Login from './views/Login';
import ReservaForm from './components/ReservaForm';
import { useBooks } from './hooks/useBooks';

const AdminPage = () => {
  const { darkMode } = useBooks();
  return (
    <PrivateRoute>
      <div className={`page-container ${darkMode ? 'dark' : ''}`}>
        <div className="detail-card">
          <h1>Panel de Administración</h1>
          <p>Contenido solo para administradores.</p>

          <div className="info-grid">
            <div className="info-item"><strong>Usuarios</strong><span>3 cuentas</span></div>
            <div className="info-item"><strong>Libros</strong><span>12 títulos</span></div>
            <div className="info-item"><strong>Sucursales</strong><span>4 ubicaciones</span></div>
            <div className="info-item"><strong>Reservas hoy</strong><span>27 tickets</span></div>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

function AppContent() {
  const { darkMode } = useBooks();

  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}>
      <Header />

      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/libro/:id" element={<BookDetails />} />
          <Route
            path="/sucursal/:branch"
            element={
              <PrivateRoute>
                <SucursalDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/libro/:id/reserva/:date"
            element={
              <PrivateRoute>
                <ReservaForm />
              </PrivateRoute>
            }
          />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={
            <div className={`page-container ${darkMode ? 'dark' : ''}`}>
              <div className="detail-card">
                <h1>404 — Página no encontrada</h1>
                <p>La ruta solicitada no existe en Nexus.</p>
              </div>
            </div>
          } />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <GlobalProvider>
        <Router>
          <AppContent />
        </Router>
      </GlobalProvider>
    </AuthProvider>
  );
}

export default App;
