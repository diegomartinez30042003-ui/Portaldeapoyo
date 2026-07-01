import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail } from 'lucide-react';
import Logo from './Logo';
import './Navbar.css';

const EMAIL = 'portaldeayudaemergenciasydesastres@gmail.com';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Desplazamiento suave a una sección de la página de inicio. Si estamos en
  // otra página (p. ej. Quiénes somos), primero volvemos al inicio y luego bajamos.
  const goToSection = (id) => {
    const scroll = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(scroll, 120);
    } else {
      scroll();
    }
  };

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="navbar-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="PORTI — inicio">
          <Logo />
        </Link>

        <div className="navbar-actions">
          <Link to="/quienes-somos" className="nav-link">Quiénes somos</Link>
          <button className="nav-link" onClick={() => goToSection('materiales')}>Materiales</button>
          <button className="nav-link" onClick={() => goToSection('redes')}>Redes</button>
          <button className="nav-link nav-link-help" onClick={() => goToSection('ayuda')}>Líneas de ayuda</button>
          <a className="nav-email" href={`mailto:${EMAIL}`} title={EMAIL} aria-label={`Escríbenos a ${EMAIL}`}>
            <Mail size={17} aria-hidden="true" />
            <span className="nav-email-text">Contacto</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
