import React from 'react';
import { useBooks } from '../hooks/useBooks';

const AboutUs = () => {
  const { darkMode } = useBooks();

  return (
    <div className={`page-container ${darkMode ? 'dark' : ''}`}>
      <div className="about-content">
        <h2>Sobre Nexus</h2>

        <div className="about-section">
          <h3>¿Qué es Nexus?</h3>
          <p>
            Nexus es una librería universitaria y un espacio multifuncional que combina la
            venta y alquiler de libros con una zona de co-working y una cafetería. Es el punto
            de encuentro donde estudiantes, docentes y curiosos comparten conocimiento, trabajan
            y disfrutan de un buen café rodeados de literatura.
          </p>
        </div>

        <div className="about-section">
          <h3>Servicios disponibles</h3>
          <p>
            En cada una de nuestras sucursales podrás encontrar:
          </p>
          <ul className="service-list">
            <li>📚 Catálogo actualizado con novedades literarias y textos académicos.</li>
            <li>🔁 Servicio de alquiler de libros a precios reducidos para estudiantes.</li>
            <li>💻 Zona de co-working con Wi-Fi de alta velocidad y enchufes en cada mesa.</li>
            <li>☕ Cafetería con repostería casera y bebidas de especialidad.</li>
            <li>🎤 Eventos: clubes de lectura, firmas de autores y talleres.</li>
          </ul>
        </div>

        <div className="about-section">
          <h3>Nuestras sucursales</h3>
          <div className="cities-grid">
            <div className="city-card">
              <h4>🏙️ Madrid</h4>
              <p>Nexus central. Sede principal con la mayor variedad de catálogo y salas de estudio.</p>
            </div>
            <div className="city-card">
              <h4>🌊 Barcelona</h4>
              <p>Espacio moderno con terraza y una sección destacada de literatura catalana.</p>
            </div>
            <div className="city-card">
              <h4>🍊 Valencia</h4>
              <p>Librería de dos plantas con una acogedora cafetería de especialidad.</p>
            </div>
            <div className="city-card">
              <h4>🌞 Sevilla</h4>
              <p>Espacio luminoso en pleno casco histórico con una gran sección de poesía y ensayo.</p>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h3>Misión</h3>
          <p>
            Acercar la cultura y el estudio a la comunidad universitaria con un modelo sostenible
            de alquiler y compra, fomentando la colaboración y el encuentro en un entorno cómodo
            y accesible.
          </p>
        </div>

        <div className="contact-info">
          <h3>Contacto</h3>
          <p>📧 Email: hola@nexus.unir.net</p>
          <p>📞 Teléfono: +34 900 654 321</p>
          <p>🌐 Web: www.nexus-libros.unir.net</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
