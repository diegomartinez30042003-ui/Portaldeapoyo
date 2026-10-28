import { useState } from 'react';
import { GraduationCap, ExternalLink, Camera, X } from 'lucide-react';
import { ANUNCIO } from '../anuncio';
import './Anuncio.css';

const KEY = 'porti_anuncio_cerrado';

function vigente() {
  if (!ANUNCIO?.activo) return false;
  if (!ANUNCIO.vence) return true;
  const hoy = new Date().toISOString().slice(0, 10);
  return hoy < ANUNCIO.vence;
}

export default function Anuncio() {
  const [cerrado, setCerrado] = useState(() => {
    try { return sessionStorage.getItem(KEY) === '1'; } catch { return false; }
  });

  if (cerrado || !vigente()) return null;

  const cerrar = () => {
    try { sessionStorage.setItem(KEY, '1'); } catch { /* sin almacenamiento */ }
    setCerrado(true);
  };

  return (
    <aside className="anuncio" role="region" aria-label="Anuncio">
      <div className="container anuncio-inner">
        <span className="anuncio-icon" aria-hidden="true"><GraduationCap size={22} /></span>
        <div className="anuncio-text">
          <span className="anuncio-eyebrow">{ANUNCIO.etiqueta}</span>
          <strong className="anuncio-title">{ANUNCIO.titulo}</strong>
          <span className="anuncio-detail">{ANUNCIO.detalle}</span>
        </div>
        <div className="anuncio-actions">
          <a className="anuncio-btn anuncio-btn--primary" href={ANUNCIO.inscripcion} target="_blank" rel="noopener noreferrer">
            Inscribirme <ExternalLink size={14} aria-hidden="true" />
          </a>
          <a className="anuncio-btn" href={ANUNCIO.instagram} target="_blank" rel="noopener noreferrer">
            <Camera size={14} aria-hidden="true" /> Ver en Instagram
          </a>
        </div>
        <button type="button" className="anuncio-close" onClick={cerrar} aria-label="Cerrar anuncio">
          <X size={18} />
        </button>
      </div>
    </aside>
  );
}
