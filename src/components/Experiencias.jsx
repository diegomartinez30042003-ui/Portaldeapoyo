import { useState, useEffect } from 'react';
import { MessageCircleHeart, Send, Quote, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { supabaseListo } from '../config';
import { listarExperiencias, guardarExperiencia, formatearFecha } from '../experienciasApi';
import './Experiencias.css';

const EMAIL = 'portaldeayudaemergenciasydesastres@gmail.com';
const ESPERA_MS = 60 * 1000; // un mensaje por minuto desde el mismo navegador

export default function Experiencias() {
  const [nombre, setNombre] = useState('');
  const [comentario, setComentario] = useState('');
  const [trampa, setTrampa] = useState(''); // honeypot anti-spam
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState('');

  const [experiencias, setExperiencias] = useState([]);
  const [cargando, setCargando] = useState(supabaseListo);

  // Cargamos las experiencias ya publicadas.
  useEffect(() => {
    if (!supabaseListo) return;
    let vivo = true;
    listarExperiencias()
      .then((filas) => { if (vivo) setExperiencias(filas); })
      .catch(() => { /* si falla, mostramos el estado vacío */ })
      .finally(() => { if (vivo) setCargando(false); });
    return () => { vivo = false; };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const n = nombre.trim();
    const c = comentario.trim();
    if (!n || !c) return;
    if (trampa) return; // lo rellenan los bots, no las personas

    // Sin base de datos configurada: enviamos por correo (modo provisional).
    if (!supabaseListo) {
      const asunto = encodeURIComponent(`Experiencia compartida en PORTI — ${n}`);
      const cuerpo = encodeURIComponent(`Nombre: ${n}\n\nExperiencia:\n${c}`);
      window.location.href = `mailto:${EMAIL}?subject=${asunto}&body=${cuerpo}`;
      setEnviado(true);
      return;
    }

    // Límite sencillo para evitar envíos repetidos desde el mismo navegador.
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
  };

  return (
    <section id="experiencias" className="exp-section" aria-label="Comparte tu experiencia">
      <div className="section-head">
        <span className="section-eyebrow">Comunidad</span>
        <h2 className="section-title">Comparte tu experiencia</h2>
        <p className="section-lead">
          Si algún material de este portal te acompañó, contarlo puede ayudar a otras
          familias a dar el primer paso. Leemos cada mensaje con cuidado.
        </p>
      </div>

      <div className="exp-layout">
        {/* Formulario */}
        <div className="exp-form-card">
          {enviado ? (
            <div className="exp-gracias" role="status">
              <span className="exp-gracias-icon"><CheckCircle2 size={30} aria-hidden="true" /></span>
              <h3>Gracias por compartir</h3>
              {supabaseListo ? (
                <p>Tu experiencia ya está publicada aquí al lado.</p>
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
              <h3 className="exp-form-title">
                <MessageCircleHeart size={20} aria-hidden="true" /> Cuéntanos tu experiencia
              </h3>

              <div className="form-group">
                <label className="form-label" htmlFor="exp-nombre">Tu nombre</label>
                <input
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
                <label className="form-label" htmlFor="exp-comentario">Tu experiencia</label>
                <textarea
                  id="exp-comentario"
                  className="form-textarea"
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  placeholder="¿Qué material usaste? ¿Cómo te acompañó a ti o a tu familia?"
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
                  <><Send size={17} aria-hidden="true" /> Enviar mi experiencia</>
                )}
              </button>

              <p className="exp-aviso">
                Tu mensaje se publica en esta página. No compartas datos personales de
                niñas, niños o adolescentes.
              </p>
            </form>
          )}
        </div>

        {/* Experiencias publicadas */}
        <div className="exp-lista" aria-live="polite">
          {cargando ? (
            <div className="exp-vacio">
              <Loader2 size={26} className="exp-spin" aria-hidden="true" />
              <p>Cargando experiencias…</p>
            </div>
          ) : experiencias.length > 0 ? (
            experiencias.map((t) => (
              <article key={t.id ?? `${t.nombre}-${t.texto.slice(0, 12)}`} className="exp-card">
                <Quote className="exp-quote" size={22} aria-hidden="true" />
                <p className="exp-texto">{t.texto}</p>
                <footer className="exp-autor">
                  <span className="exp-nombre">{t.nombre}</span>
                  {t.creado_en && <span className="exp-fecha">{formatearFecha(t.creado_en)}</span>}
                </footer>
              </article>
            ))
          ) : (
            <div className="exp-vacio">
              <Quote size={26} aria-hidden="true" />
              <p>
                Todavía no hay experiencias publicadas.
                <strong> La tuya puede ser la primera.</strong>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
