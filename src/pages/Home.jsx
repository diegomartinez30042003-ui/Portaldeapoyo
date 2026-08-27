import { useState } from 'react';
import { useAppContext } from '../store';
import Hero from '../components/Hero';
import ResourceCard from '../components/ResourceCard';
import SocialMedia from '../components/SocialMedia';
import Experiencias from '../components/Experiencias';
import {
  LayoutGrid, BookHeart, HeartHandshake, Stethoscope,
  LifeBuoy, BookOpen, ChevronDown, ChevronUp
} from 'lucide-react';
import './Home.css';

// Las categorías reflejan exactamente las tres carpetas del Drive.
const CATEGORIES = [
  { name: 'Todos', icon: LayoutGrid },
  { name: 'Cuentos infantiles', icon: BookHeart },
  { name: 'Material para padres', icon: HeartHandshake },
  { name: 'Materiales para psicólogos y afines', icon: Stethoscope }
];

// Orientación breve. Tonos de marca: azul marino, teal, verde.
const GUIDANCE = [
  { icon: <LifeBuoy size={22} />, tone: 'primary', title: 'En caso de emergencia', text: 'Si hay riesgo para la vida, comunícate primero con la línea de emergencias (171 / 911) o Protección Civil.' },
  { icon: <HeartHandshake size={22} />, tone: 'secondary', title: 'No estás solo', text: 'Estos materiales son un apoyo, no un reemplazo de la atención profesional. Pedir ayuda es un acto de cuidado.' },
  { icon: <BookOpen size={22} />, tone: 'accent', title: 'Cómo usar el portal', text: 'Filtra por categoría o busca por palabra clave. Cada recurso abre o descarga el documento completo.' }
];

export default function Home() {
  const { resources } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');

  const filteredResources = resources.filter(resource => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      resource.title.toLowerCase().includes(term) ||
      resource.description.toLowerCase().includes(term);
    const matchesCategory = activeCategory === 'Todos' || resource.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const count = filteredResources.length;

  // Para evitar una página demasiado larga, mostramos solo las primeras
  // tarjetas y un botón para desplegar el catálogo completo.
  const VISIBLE = 9;
  const [showAll, setShowAll] = useState(false);
  const visibleResources = showAll ? filteredResources : filteredResources.slice(0, VISIBLE);
  const hasMore = count > VISIBLE;

  const toggleShowAll = () => {
    if (showAll) {
      // Al plegar, volvemos al inicio del catálogo para no dejar al usuario perdido.
      document.getElementById('materiales')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setShowAll(!showAll);
  };

  return (
    <div className="home-page">
      <Hero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <main className="container">
        {/* Orientación rápida */}
        <section className="guide-strip" aria-label="Antes de empezar">
          {GUIDANCE.map((item, i) => (
            <article key={i} className="guide-card" data-tone={item.tone}>
              <span className="guide-icon">{item.icon}</span>
              <div>
                <h3 className="guide-title">{item.title}</h3>
                <p className="guide-text">{item.text}</p>
              </div>
            </article>
          ))}
        </section>

        {/* Biblioteca de materiales */}
        <section id="materiales" className="catalog">
          <div className="section-head">
            <span className="section-eyebrow">Biblioteca</span>
            <h2 className="section-title">Explorar materiales</h2>
            <p className="section-lead">
              Documentos de acceso libre, organizados igual que en el archivo original.
            </p>
          </div>

          <div className="category-filters" role="group" aria-label="Filtrar por categoría">
            {CATEGORIES.map(({ name, icon: Icon }) => (
              <button
                key={name}
                type="button"
                className={`filter-btn ${activeCategory === name ? 'active' : ''}`}
                onClick={() => setActiveCategory(name)}
                aria-pressed={activeCategory === name}
              >
                <Icon size={16} aria-hidden="true" />
                {name}
              </button>
            ))}
          </div>

          <p className="results-count" aria-live="polite">
            {count === 0
              ? 'Sin resultados'
              : `${count} ${count === 1 ? 'recurso' : 'recursos'} ${activeCategory === 'Todos' ? 'en total' : `en “${activeCategory}”`}`}
          </p>

          {count > 0 ? (
            <>
              <div className="resources-grid">
                {visibleResources.map(resource => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
              {hasMore && (
                <div className="show-all-wrap">
                  <button type="button" className="btn show-all-btn" onClick={toggleShowAll}>
                    {showAll ? (
                      <>Mostrar menos <ChevronUp size={18} aria-hidden="true" /></>
                    ) : (
                      <>Ver todos los materiales ({count}) <ChevronDown size={18} aria-hidden="true" /></>
                    )}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="no-results">
              <p>No se encontraron recursos con esos criterios.</p>
              <button
                type="button"
                className="btn btn-outline mt-4"
                onClick={() => { setSearchTerm(''); setActiveCategory('Todos'); }}
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </section>

        {/* Redes sociales recomendadas */}
        <SocialMedia />

        {/* Aviso sobre los materiales publicados */}
        <section id="aviso" className="legal-section" aria-label="Aviso sobre los materiales publicados">
          <div className="section-head">
            <span className="section-eyebrow">Sobre los materiales</span>
            <h2 className="section-title">Derechos de autor y uso de los recursos</h2>
          </div>
          <div className="legal-body">
            <p>
              Los documentos, manuales, guías, protocolos, artículos y demás materiales disponibles
              en PORTI (Portal sobre el Impacto en la Salud Mental de las Emergencias y Desastres)
              son recursos de libre circulación que fueron obtenidos directamente de sitios web
              oficiales de organizaciones nacionales e internacionales, instituciones académicas,
              entidades gubernamentales, organizaciones no gubernamentales, sociedades científicas
              y profesionales que han puesto estos materiales a disposición del público.
            </p>
            <p>
              <strong>PORTI no reclama la autoría ni la propiedad intelectual de dichos documentos.</strong>{' '}
              Todos los derechos de autor, marcas y demás derechos asociados pertenecen a sus
              respectivos autores, instituciones u organizaciones.
            </p>
            <p>
              El propósito de este portal es exclusivamente educativo, informativo y de divulgación,
              facilitando el acceso centralizado a recursos que contribuyan a la preparación,
              respuesta y recuperación en situaciones de emergencias y desastres, con especial
              énfasis en la salud mental.
            </p>
            <p>
              Siempre que ha sido posible, se ha incluido la referencia correspondiente al documento
              y a su fuente original. Si usted es autor o representante de alguno de los materiales
              publicados y considera que existe alguna imprecisión en la atribución, desea actualizar
              la información o solicita que un documento sea retirado del portal, puede{' '}
              <a
                className="legal-mail"
                href="mailto:portaldeayudaemergenciasydesastres@gmail.com?subject=Consulta%20sobre%20derechos%20de%20autor%20-%20PORTI"
              >
                comunicarse con el equipo de PORTI
              </a>. Atenderemos su solicitud con la mayor diligencia.
            </p>
            <p>
              PORTI promueve el reconocimiento del trabajo realizado por autores e instituciones y
              recomienda consultar siempre las versiones más recientes de los documentos en sus
              fuentes oficiales cuando estas se encuentren disponibles.
            </p>
          </div>
        </section>

        {/* Comparte tu experiencia — última sección del sitio */}
        <Experiencias />
      </main>
    </div>
  );
}
