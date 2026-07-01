import { useEffect } from 'react';
import { HeartHandshake, Stethoscope, Building2, GraduationCap, Users, Code2, Palette } from 'lucide-react';
import './QuienesSomos.css';

const DIRIGIDO = [
  { icon: <Stethoscope size={18} />, text: 'Psicólogos, psiquiatras y demás profesionales de la salud mental.' },
  { icon: <HeartHandshake size={18} />, text: 'Profesionales de la salud, trabajadores sociales, docentes y equipos de primera respuesta.' },
  { icon: <Building2 size={18} />, text: 'Organizaciones gubernamentales y no gubernamentales que trabajan en gestión del riesgo, acción humanitaria y atención de desastres.' },
  { icon: <GraduationCap size={18} />, text: 'Estudiantes interesados en la salud mental en contextos de emergencia.' },
  { icon: <Users size={18} />, text: 'Personas, familias y comunidades que desean comprender mejor el impacto emocional de estos eventos y acceder a recursos útiles.' }
];

export default function QuienesSomos() {
  // Al entrar a la página, siempre desde arriba (es una página aparte, no una sección).
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <main className="about">
      <header className="about-hero">
        <div className="container">
          <span className="section-eyebrow">Quiénes somos</span>
          <h1 className="about-title">Bienvenidos a PORTI</h1>
          <p className="about-lead">
            PORTI (Portal sobre el Impacto en la Salud Mental de las Emergencias y Desastres) es una
            iniciativa independiente creada con el propósito de reunir, organizar y difundir información
            confiable sobre las consecuencias psicológicas de las emergencias y los desastres, así como
            recursos prácticos que orienten tanto a profesionales como a la comunidad en general.
          </p>
        </div>
      </header>

      <div className="container about-body">
        <section className="about-section">
          <p>
            En este espacio encontrarás manuales, guías, herramientas, materiales educativos, documentos
            técnicos y recomendaciones que facilitan la comprensión de las reacciones psicológicas que pueden
            surgir antes, durante y después de una emergencia o desastre. Asimismo, el portal busca promover la
            preparación, fortalecer la respuesta y favorecer la recuperación de las personas, las familias y las
            comunidades afectadas, mediante el acceso libre a recursos de calidad.
          </p>
          <p>
            PORTI nace de la convicción de que el conocimiento científico debe estar disponible para quienes
            trabajan en la atención de las personas afectadas por emergencias y desastres, así como para quienes
            desean comprender mejor el impacto que estos acontecimientos tienen sobre la salud mental.
          </p>
        </section>

        <section className="about-section">
          <h2 className="about-h2">¿A quién está dirigido?</h2>
          <ul className="dirigido-list">
            {DIRIGIDO.map((item, i) => (
              <li key={i}>
                <span className="dirigido-icon">{item.icon}</span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="about-section">
          <h2 className="about-h2">Dirección y coordinación académica</h2>
          <div className="person-card">
            <div className="person-avatar" aria-hidden="true">AS</div>
            <div className="person-body">
              <h3 className="person-name">Alejandra Sapene Chapellín</h3>
              <p className="person-role">Concepción y coordinación de PORTI</p>
              <p>
                Lidera la selección, revisión, organización y difusión de los contenidos publicados en este portal.
                Es Licenciada en Psicología por la Universidad Católica Andrés Bello (UCAB), Caracas (Venezuela);
                Especialista en Psicología Clínica Comunitaria por la misma universidad y Magíster en Psicopedagogía
                Social por la Universidad Internacional de La Rioja (UNIR), España.
              </p>
              <p>
                Su interés profesional se centra en la salud mental en contextos de emergencias y desastres, la
                intervención psicosocial, la atención a poblaciones en situación de vulnerabilidad y la difusión del
                conocimiento científico como herramienta para fortalecer las capacidades de respuesta de profesionales,
                instituciones y comunidades.
              </p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2 className="about-h2">Nuestro compromiso</h2>
          <p>
            La información publicada en PORTI tiene fines educativos y de divulgación. Los materiales compartidos son
            seleccionados por su calidad técnica y su utilidad práctica, priorizando documentos elaborados por organismos
            internacionales, instituciones académicas y organizaciones de reconocido prestigio, así como literatura
            científica relevante en el campo de la salud mental y el apoyo psicosocial en emergencias.
          </p>
          <p className="about-callout">
            La información contenida en este portal <strong>no sustituye la evaluación, orientación o tratamiento</strong>
            &nbsp;brindado por profesionales de la salud mental cuando una persona presenta síntomas que requieren atención
            especializada.
          </p>
          <p>
            PORTI también busca promover el intercambio de conocimiento entre profesionales y convertirse en un espacio de
            referencia para quienes trabajan por la protección de la salud mental en situaciones de emergencia, desastre y
            crisis humanitarias.
          </p>
        </section>

        <section className="about-section">
          <h2 className="about-h2">Un recurso de acceso gratuito</h2>
          <p>
            Todos los contenidos disponibles en PORTI son de acceso completamente gratuito. Este proyecto no tiene fines
            comerciales y surge del convencimiento de que el acceso al conocimiento constituye una herramienta fundamental
            para fortalecer la preparación, la respuesta y la recuperación frente a las emergencias y los desastres.
          </p>
          <p>
            Nuestro objetivo es facilitar el acceso a recursos de calidad para el mayor número posible de personas,
            eliminando barreras económicas y promoviendo el aprendizaje continuo.
          </p>
        </section>

        <section className="about-section">
          <h2 className="about-h2">Reconocimientos</h2>
          <p>
            PORTI es el resultado del trabajo colaborativo de personas que generosamente aportaron su conocimiento y
            talento para hacer posible este proyecto.
          </p>
          <div className="credits">
            <div className="credit-card">
              <span className="credit-icon"><Code2 size={20} /></span>
              <div>
                <h3 className="credit-name">Diego Martínez Boscán</h3>
                <p className="credit-role">Desarrollo y programación de la plataforma</p>
                <p className="credit-text">Hizo posible la construcción de una plataforma funcional, intuitiva y accesible para los usuarios.</p>
              </div>
            </div>
            <div className="credit-card">
              <span className="credit-icon"><Palette size={20} /></span>
              <div>
                <h3 className="credit-name">Ana Beatriz Sapene Chapellín</h3>
                <p className="credit-role">Identidad visual y logotipo</p>
                <p className="credit-text">Creó la imagen de PORTI, reflejando su misión y propósito.</p>
              </div>
            </div>
          </div>
          <p>
            Esperamos que PORTI continúe creciendo con el aporte de profesionales, investigadores e instituciones que deseen
            compartir recursos, experiencias y conocimientos para fortalecer la atención en salud mental y el apoyo
            psicosocial en contextos de emergencias y desastres.
          </p>
          <p className="about-closing">
            Creemos que compartir conocimiento es una forma de proteger la salud mental, fortalecer a las comunidades y
            contribuir a una respuesta más humana, informada y basada en la evidencia cuando más se necesita.
          </p>
        </section>
      </div>
    </main>
  );
}
