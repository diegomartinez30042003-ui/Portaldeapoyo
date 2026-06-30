import { Phone, Globe, Search, Heart } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer id="ayuda" className="site-footer">
      <div className="container">
        <div className="footer-emergency">
          <Phone size={20} aria-hidden="true" />
          <p>
            <strong>¿Es una emergencia con riesgo para la vida?</strong> Comunícate de
            inmediato con la línea nacional de emergencias <strong>171 / 911</strong> o
            con Protección Civil de tu localidad.
          </p>
        </div>

        <div className="footer-grid">
          <div className="footer-col">
            <h4 className="footer-title">Sobre este portal</h4>
            <p>
              Reúne material psicoeducativo de acceso libre para acompañar a niñas, niños,
              adolescentes y familias tras los sismos del 24 de junio de 2026 en la costa
              norte de Venezuela (Yaracuy, Falcón, Carabobo, Aragua, La Guaira y zonas cercanas).
            </p>
            <p className="footer-note">
              Es un apoyo, <strong>no reemplaza la atención profesional</strong> de salud mental.
            </p>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Buscar personas y reportar daños</h4>
            <a className="footer-link" href="https://www.civis.com.ve" target="_blank" rel="noopener noreferrer">
              <Search size={16} aria-hidden="true" /> CIVIS Venezuela — plataforma ciudadana
            </a>
            <a className="footer-link" href="https://www.paho.org/es/terremotos-venezuela-2026" target="_blank" rel="noopener noreferrer">
              <Globe size={16} aria-hidden="true" /> OPS/OMS — respuesta al terremoto
            </a>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Créditos del material</h4>
            <p>
              Documentos de acceso libre de la NCTSN, CHLA &amp; AAP, Plaza Sésamo y otras
              organizaciones, recopilados y traducidos al español para uso comunitario.
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-brand">
            <Heart size={15} aria-hidden="true" /> Hecho con cuidado para las familias de Venezuela
          </span>
          <span>Material de distribución libre · Sin fines de lucro</span>
        </div>
      </div>
    </footer>
  );
}
