import { useState, useEffect, useRef, useCallback } from 'react';
import { MessageCircleHeart, Send, Quote, CheckCircle2, Loader2, AlertCircle, X } from 'lucide-react';
import { supabaseListo } from '../config';
import { listarExperiencias, guardarExperiencia, formatearFecha } from '../experienciasApi';
import './Experiencias.css';

const EMAIL = 'portaldeayudaemergenciasydesastres@gmail.com';
const ESPERA_MS = 60 * 1000; // un mensaje por minuto desde el mismo navegador

// Evento global para abrir el panel desde cualquier parte (p. ej. la portada).
export const ABRIR_EXPERIENCIAS = 'porti:abrir-experiencias';
export const abrirExperiencias = () => window.dispatchEvent(new Event(ABRIR_EXPERIENCIAS));

/**
 * "Comparte tu experiencia": botón flotante siempre visible + panel lateral
 * con el formulario y las experiencias publicadas.
 */
export default function Experiencias() {
  const [abierto, setAbierto] = useState(false);

  const [nombre, setNombre] = useState('');
  const [comentario, setComentario] = useState('');
  const [trampa, setTrampa] = useState(''); // honeypot anti-spam
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState('');

  const [experiencias, setExperiencias] = useState([]);
  const [cargando, setCargando] = useState(supabaseListo);

  const primerCampo = useRef(null);
  const botonFlotante = useRef(null);

  // Experiencias publicadas (también alimentan el contador del botón).
  useEffect(() => {
    if (!supabaseListo) return;
    let vivo = true;
    listarExperiencias()
      .then((filas) => { if (vivo) setExperiencias(filas); })
      .catch(() => { /* si falla, se muestra el estado vacío */ })
      .finally(() => { if (vivo) setCargando(false); });
    return () => { vivo = false; };
  }, []);

  const cerrar = useCallback(() => {
    setAbierto(false);
    botonFlotante.current?.focus();
  }, []);

  // Abrir desde otras partes del sitio.
  useEffect(() => {
    const abrir = () => setAbierto(true);
    window.addEventListener(ABRIR_EXPERIENCIAS, abrir);
    return () => window.removeEventListener(ABRIR_EXPERIENCIAS, abrir);
  }, []);

  // Con el panel abierto: bloquear el scroll de fondo, cerrar con Esc y enfocar el formulario.
  useEffect(() => {
    if (!abierto) return;
    const previo = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') cerrar(); };
    window.addEventListener('keydown', onKey);
    const t = setTimeout(() => primerCampo.current?.focus(), 250);
    return () => {
      document.body.style.overflow = previo;
      window.removeEventListener('keydown', onKey);
      clearTimeout(t);
    };
  }, [abierto, cerrar]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const n = nombre.trim();
    const c = comentario.trim();
    if (!n || !c) return;
    if (trampa) return; // lo rellenan los bots, no las personas

    // Sin base de datos configurada: envío por correo (modo provisional).
    if (!supabaseListo) {
      const asunto = encodeURIComponent(`Experiencia compartida en PORTI — ${n}`);
      const cuerpo = encodeURIComponent(`Nombre: ${n}\n\nExperiencia:\n${c}`);
      window.location.href = `mailto:${EMAIL}?subject=${asunto}&body=${cuerpo}`;
      setEnviado(true);
      return;
    }

    try {
      const ultimo = Number(localStorage.getItem('porti:ultimo-envio') || 0);
      if (Date.now() - ultimo < ESPERA_MS) {
        setError('Acabas de enviar un mensaje. Espera un momento antes de enviar otro.');
        return;
      }
    } catch { /* si no hay localStorage, seguimos igual */ }

    setEnviando(true);
    try {
      const fila = await guardarExperiencia({ nombre: n, texto: c });
      setExperiencias((prev) => [fila, ...prev]);
      try { localStorage.setItem('porti:ultimo-envio', String(Date.now())); } catch { /* opcional */ }
      setEnviado(true);
      setNombre('');
      setComentario('');
    } catch {
      setError('No pudimos publicar tu mensaje. Revisa tu conexión e inténtalo de nuevo.');
    } finally {
      setEnviando(false);
    }
  };

  const nuevoMensaje = () => {
    setNombre('');
    setComentario('');
    setError('');
    setEnviado(false);
    setTimeout(() => primerCampo.current?.focus(), 50);
  };

  const total = experiencias.length;

  return (
    <>
      {/* Botón flotante: visible en todo momento */}
      <button
        ref={botonFlotante}
        type="button"
        className="exp-fab"
        onClick={() => setAbierto(true)}
        aria-haspopup="dialog"
        aria-expanded={abierto}
        aria-label="Comparte tu experiencia"
      >
        <MessageCircleHeart size={20} aria-hidden="true" />
        <span className="exp-fab-texto">Comparte tu experiencia</span>
        {total > 0 && <span className="exp-fab-badge" aria-hidden="true">{total}</span>}
      </button>

      <div className={`exp-overlay${abierto ? ' abierto' : ''}`} onClick={cerrar} aria-hidden="true" />

      <aside
        className={`exp-panel${abierto ? ' abierto' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="exp-panel-titulo"
        inert={!abierto}
      >
        <header className="exp-panel-head">
          <div>
            <span className="section-eyebrow">Comunidad</span>
            <h2 id="exp-panel-titulo" className="exp-panel-titulo">Comparte tu experiencia</h2>
          </div>
          <button type="button" className="exp-cerrar" onClick={cerrar} aria-label="Cerrar">
            <X size={22} aria-hidden="true" />
          </button>
        </header>

        <div className="exp-panel-body">
          <p className="exp-intro">
            Si algún material de este portal te acompañó, contarlo puede ayudar a otras
            familias a dar el primer paso.
          </p>

          {/* Formulario */}
          <div className="exp-form-card">
            {enviado ? (
              <div className="exp-gracias" role="status">
                <span className="exp-gracias-icon"><CheckCircle2 size={30} aria-hidden="true" /></span>
                <h3>Gracias por compartir</h3>
                {supabaseListo ? (
                  <p>Tu experiencia ya está publicada aquí abajo.</p>
                ) : (
                  <p>
                    Se abrió tu correo con el mensaje listo para enviar. Si no se abrió,
                    escríbenos a <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
                  </p>
                )}
                <button type="button" className="btn btn-outline" onClick={nuevoMensaje}>
                  Escribir otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="exp-nombre">Tu nombre</label>
                  <input
                    ref={primerCampo}
                    id="exp-nombre"
                    type="text"
                    className="form-input"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Como quieras que aparezca"
                    maxLength={60}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="exp-comentario">Tu experiencia o sugerencia</label>
                  <textarea
                    id="exp-comentario"
                    className="form-textarea"
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    placeholder="¿Qué material usaste? ¿Cómo te acompañó a ti o a tu familia? ¿Qué te gustaría encontrar aquí?"
                    maxLength={800}
                    required
                  />
                  <span className="exp-contador">{comentario.length}/800</span>
                </div>

                {/* Campo trampa: invisible para las personas, lo rellenan los bots */}
                <input
                  type="text"
                  className="exp-trampa"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={trampa}
                  onChange={(e) => setTrampa(e.target.value)}
                />

                {error && (
                  <p className="exp-error" role="alert">
                    <AlertCircle size={16} aria-hidden="true" /> {error}
                  </p>
                )}

                <button type="submit" className="btn btn-primary exp-submit" disabled={enviando}>
                  {enviando ? (
                    <><Loader2 size={17} className="exp-spin" aria-hidden="true" /> Publicando…</>
                  ) : (
                    <><Send size={17} aria-hidden="true" /> Enviar</>
                  )}
                </button>

                <p className="exp-aviso">
                  Tu mensaje se publica en este portal. No compartas datos personales de
                  niñas, niños o adolescentes.
                </p>
              </form>
            )}
          </div>

          {/* Experiencias publicadas */}
          <h3 className="exp-lista-titulo">
            Experiencias compartidas{total > 0 ? ` (${total})` : ''}
          </h3>
          <div className="exp-lista" aria-live="polite">
            {cargando ? (
              <div className="exp-vacio">
                <Loader2 size={24} className="exp-spin" aria-hidden="true" />
                <p>Cargando experiencias…</p>
              </div>
            ) : total > 0 ? (
              experiencias.map((t) => (
                <article key={t.id ?? `${t.nombre}-${t.texto.slice(0, 12)}`} className="exp-card">
                  <Quote className="exp-quote" size={20} aria-hidden="true" />
                  <p className="exp-texto">{t.texto}</p>
                  <footer className="exp-autor">
                    <span className="exp-nombre">{t.nombre}</span>
                    {t.creado_en && <span className="exp-fecha">{formatearFecha(t.creado_en)}</span>}
                  </footer>
                </article>
              ))
            ) : (
              <div className="exp-vacio">
                <Quote size={24} aria-hidden="true" />
                <p>
                  Todavía no hay experiencias publicadas.
                  <strong> La tuya puede ser la primera.</strong>
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
