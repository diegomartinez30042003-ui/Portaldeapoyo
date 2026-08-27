import { useState } from 'react';
import { MessageCircleHeart, Send, Quote, CheckCircle2 } from 'lucide-react';
import './Experiencias.css';

const EMAIL = 'portaldeayudaemergenciasydesastres@gmail.com';

/*
 * Experiencias publicadas.
 * PORTI revisa cada mensaje antes de publicarlo: para añadir uno, agrega
 * aquí un objeto { nombre, texto, fecha } (la fecha es opcional).
 */
const TESTIMONIOS = [
  // { nombre: 'María', texto: 'Los cuentos nos ayudaron muchísimo…', fecha: 'julio 2026' },
];

export default function Experiencias() {
  const [nombre, setNombre] = useState('');
  const [comentario, setComentario] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const n = nombre.trim();
    const c = comentario.trim();
    if (!n || !c) return;

    // El portal es un sitio estático: el mensaje se envía por correo al equipo
    // de PORTI, que lo revisa antes de publicarlo en esta sección.
    const asunto = encodeURIComponent(`Experiencia compartida en PORTI — ${n}`);
    const cuerpo = encodeURIComponent(
      `Nombre: ${n}\n\nExperiencia:\n${c}\n\n` +
      `— Enviado desde el Portal PORTI. Autorizo que mi mensaje sea revisado y, si el equipo lo considera, publicado en el portal.`
    );
    window.location.href = `mailto:${EMAIL}?subject=${asunto}&body=${cuerpo}`;
    setEnviado(true);
  };

  const nuevoMensaje = () => {
    setNombre('');
    setComentario('');
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
              <p>
                Se abrió tu correo con el mensaje listo para enviar. Si no se abrió,
                puedes escribirnos directamente a{' '}
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
              </p>
              <p className="exp-gracias-nota">
                El equipo de PORTI revisa cada experiencia antes de publicarla.
              </p>
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

              <button type="submit" className="btn btn-primary exp-submit">
                <Send size={17} aria-hidden="true" /> Enviar mi experiencia
              </button>

              <p className="exp-aviso">
                No compartas datos personales de niñas, niños o adolescentes. Tu mensaje
                se envía al equipo de PORTI y se publica solo si tú lo autorizas.
              </p>
            </form>
          )}
        </div>

        {/* Experiencias publicadas */}
        <div className="exp-lista" aria-label="Experiencias publicadas">
          {TESTIMONIOS.length > 0 ? (
            TESTIMONIOS.map((t, i) => (
              <article key={i} className="exp-card">
                <Quote className="exp-quote" size={22} aria-hidden="true" />
                <p className="exp-texto">{t.texto}</p>
                <footer className="exp-autor">
                  <span className="exp-nombre">{t.nombre}</span>
                  {t.fecha && <span className="exp-fecha">{t.fecha}</span>}
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
