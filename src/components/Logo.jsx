import './Logo.css';

// Logo oficial PORTI (PNG en public/). BASE_URL respeta el subdirectorio de
// GitHub Pages y el modo offline (base relativa './').
const LOGO_SRC = `${import.meta.env.BASE_URL}porti-logo.png`;

export default function Logo({ className = '' }) {
  return (
    <img
      className={`porti-logo ${className}`}
      src={LOGO_SRC}
      alt="PORTI — Portal sobre el impacto de las emergencias y desastres en la salud mental"
    />
  );
}
