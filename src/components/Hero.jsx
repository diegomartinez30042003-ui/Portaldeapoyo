import { useEffect, useRef } from 'react';
import { Search, FileHeart, Wifi, Unlock } from 'lucide-react';
import { useAppContext } from '../store';
import './Hero.css';

export default function Hero({ searchTerm, setSearchTerm }) {
  // Cuenta solo los materiales del catálogo (no las cuentas de redes sociales).
  const { resources } = useAppContext();
  const count = resources.length;

  // Envía evento al dataLayer de GTM cuando el usuario deja de escribir (500ms).
  const timerRef = useRef(null);
  useEffect(() => {
    if (!searchTerm.trim()) return;
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'busqueda_portal',
          search_term: searchTerm.trim()
        });
      }
    }, 500);
    return () => clearTimeout(timerRef.current);
  }, [searchTerm]);

  return (
    <section className="hero">
      <div className="container hero-content">
        <span className="hero-context">
          Tras los sismos del 24 de junio de 2026 · Costa norte de Venezuela
        </span>
        <h1 className="hero-title">
          Estamos aquí para <span className="hero-accent">acompañarte</span>
        </h1>
        <p className="hero-subtitle">
          Recursos, guías y actividades para ayudar a niñas, niños, adolescentes y
          sus familias a sobrellevar el impacto emocional y, poco a poco, recuperar la calma.
        </p>

        <div className="search-container">
          <Search className="search-icon" size={20} aria-hidden="true" />
          <input
            type="search"
            className="search-input"
            aria-label="Buscar recursos por tema o palabra clave"
            placeholder="Buscar por tema, palabra clave o tipo de material…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <ul className="hero-meta" aria-label="Características del portal">
          <li><FileHeart size={16} aria-hidden="true" /> {count} materiales cuidadosamente seleccionados</li>
          <li><Unlock size={16} aria-hidden="true" /> Acceso libre y gratuito</li>
          <li><Wifi size={16} aria-hidden="true" /> Funciona sin conexión</li>
        </ul>
      </div>

      <svg className="hero-wave" viewBox="0 0 1440 70" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,38 C320,80 720,6 1080,30 C1260,42 1380,52 1440,46 L1440,70 L0,70 Z" />
      </svg>
    </section>
  );
}
