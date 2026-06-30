import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import './Navbar.css';

// Desplazamiento suave a una sección por id (evita chocar con el hash del router).
const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="navbar-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="brand-mark"><Heart size={20} /></span>
          <span className="brand-text">
            <span className="brand-name">Portal de Apoyo</span>
            <span className="brand-tagline">Psicoeducativo · Venezuela 2026</span>
          </span>
        </Link>

        <div className="navbar-actions">
          <button className="nav-link" onClick={() => scrollToId('materiales')}>Materiales</button>
          <button className="nav-link" onClick={() => scrollToId('redes')}>Redes</button>
          <button className="nav-link nav-link-help" onClick={() => scrollToId('ayuda')}>Líneas de ayuda</button>
        </div>
      </div>
    </nav>
  );
}
