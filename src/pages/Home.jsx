import { useState } from 'react';
import { useAppContext } from '../store';
import Hero from '../components/Hero';
import ResourceCard from '../components/ResourceCard';
import SocialMedia from '../components/SocialMedia';
import {
  LayoutGrid, BookHeart, HeartHandshake, Stethoscope,
  LifeBuoy, BookOpen
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
            <div className="resources-grid">
              {filteredResources.map(resource => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
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
      </main>
    </div>
  );
}
