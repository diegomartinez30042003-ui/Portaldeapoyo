import { Link } from 'react-router-dom';
import Logo from './Logo';
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
          <Logo />
          <span className="brand-tagline">Impacto de las emergencias y desastres en la salud mental</span>
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
