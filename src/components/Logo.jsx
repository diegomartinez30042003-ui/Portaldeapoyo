import './Logo.css';

// Estrella de 5 puntas centrada en (cx,cy) con radio r.
function starPoints(cx, cy, r) {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const ang = (Math.PI / 5) * i - Math.PI / 2;
    const rad = i % 2 === 0 ? r : r * 0.42;
    pts.push(`${(cx + rad * Math.cos(ang)).toFixed(1)},${(cy + rad * Math.sin(ang)).toFixed(1)}`);
  }
  return pts.join(' ');
}

/**
 * Logo PORTI: corazón abierto con un rastro de estrellas + wordmark.
 * `showWordmark={false}` muestra solo la marca (corazón), útil para espacios reducidos.
 */
export default function Logo({ showWordmark = true, className = '' }) {
  return (
    <span className={`porti-logo ${className}`}>
      <svg className="porti-mark" viewBox="0 0 56 46" role="img" aria-label="PORTI">
        <defs>
          <linearGradient id="portiHeart" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#6FA84E" />
            <stop offset="0.5" stopColor="#16868A" />
            <stop offset="1" stopColor="#0E2C54" />
          </linearGradient>
        </defs>
        {/* Corazón de trazo (mitad sólida, mitad punteada como en el logo) */}
        <path
          d="M28 41 C 12 30, 6 20, 14 13 C 20 8, 27 11, 28 17"
          fill="none" stroke="url(#portiHeart)" strokeWidth="2.6"
          strokeLinecap="round" strokeLinejoin="round"
        />
        <path
          d="M28 17 C 29 11, 36 8, 42 13 C 50 20, 44 30, 28 41"
          fill="none" stroke="#16868A" strokeWidth="2.6"
          strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 4"
        />
        {/* Rastro de estrellas, de pequeña a grande */}
        <polygon points={starPoints(13, 33, 2.1)} fill="#0E2C54" />
        <polygon points={starPoints(18.5, 29.5, 2.7)} fill="#16868A" />
        <polygon points={starPoints(24.5, 25, 3.3)} fill="#0E2C54" />
        <polygon points={starPoints(31, 19.5, 4)} fill="#0E2C54" />
      </svg>

      {showWordmark && (
        <span className="porti-wordmark">PORT<span className="porti-i">i</span></span>
      )}
    </span>
  );
}
