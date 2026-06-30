import { FileText, Video, Activity, File, ExternalLink, Download } from 'lucide-react';
import './ResourceCard.css';

// Acento de color por categoría (las tres carpetas del Drive): aporta
// variedad y "vida" manteniendo la calma.
// Soft Venezuela tricolor mapped to the three Drive folders:
// cuentos → oro · padres → azul · profesionales → rojo arcilla.
const CATEGORY_ACCENT = {
  'Cuentos infantiles': 'accent',
  'Material para padres': 'primary',
  'Materiales para psicólogos y afines': 'coral'
};

export default function ResourceCard({ resource }) {
  const getIcon = () => {
    switch (resource.type) {
      case 'Video': return <Video size={22} />;
      case 'Actividad Práctica': return <Activity size={22} />;
      case 'Guía Escrita': return <File size={22} />;
      default: return <FileText size={22} />;
    }
  };

  const accent = CATEGORY_ACCENT[resource.category] || 'primary';

  const isExternalLink = /^https?:\/\//i.test(resource.url);
  const hasUrl = Boolean(resource.url);
  const actionLabel = isExternalLink ? 'Visitar' : 'Ver / Descargar';
  const ActionIcon = isExternalLink ? ExternalLink : Download;

  return (
    <article className="resource-card" data-accent={accent}>
      <span className="resource-accent-bar" aria-hidden="true" />
      <div className="resource-card-header">
        <span className="resource-icon-chip" aria-hidden="true">{getIcon()}</span>
        <span className="resource-category-tag">{resource.category}</span>
      </div>
      <div className="resource-card-body">
        <h3 className="resource-title">{resource.title}</h3>
        <p className="resource-desc">{resource.description}</p>
      </div>
      <div className="resource-card-footer">
        <span className="resource-type">{resource.type}</span>
        {hasUrl ? (
          <a
            className="btn btn-secondary resource-btn"
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${actionLabel}: ${resource.title}`}
          >
            <ActionIcon size={16} />
            {actionLabel}
          </a>
        ) : (
          <span className="resource-btn-disabled" title="Recurso sin enlace disponible">
            No disponible
          </span>
        )}
      </div>
    </article>
  );
}
