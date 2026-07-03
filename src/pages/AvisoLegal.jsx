import { useEffect } from 'react';
import './QuienesSomos.css';

const EMAIL = 'portaldeayudaemergenciasydesastres@gmail.com';

export default function AvisoLegal() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <main className="about">
      <header className="about-hero">
        <div className="container">
          <span className="section-eyebrow">Aviso legal</span>
          <h1 className="about-title">Derechos de autor y uso de los materiales</h1>
        </div>
      </header>

      <div className="container about-body">
        <section className="about-section">
          <p>
            Los documentos, manuales, guías, protocolos, artículos y demás materiales
            disponibles en PORTI (Portal sobre el Impacto en la Salud Mental de las Emergencias
            y Desastres) son recursos de libre circulación que fueron obtenidos directamente de
            sitios web oficiales de organizaciones nacionales e internacionales, instituciones
            académicas, entidades gubernamentales, organizaciones no gubernamentales, sociedades
            científicas y profesionales que han puesto estos materiales a disposición del público.
          </p>
          <p>
            PORTI no reclama la autoría ni la propiedad intelectual de dichos documentos. Todos
            los derechos de autor, marcas y demás derechos asociados pertenecen a sus respectivos
            autores, instituciones u organizaciones.
          </p>
          <p>
            El propósito de este portal es exclusivamente educativo, informativo y de divulgación,
            facilitando el acceso centralizado a recursos que contribuyan a la preparación, respuesta
            y recuperación en situaciones de emergencias y desastres, con especial énfasis en la
            salud mental.
          </p>
          <p className="about-callout">
            Siempre que ha sido posible, se ha incluido la referencia correspondiente al documento
            y a su fuente original. Si usted es autor o representante de alguno de los materiales
            publicados y considera que existe alguna imprecisión en la atribución, desea actualizar
            la información o solicita que un documento sea retirado del portal, puede{' '}
            <a href={`mailto:${EMAIL}?subject=Consulta%20sobre%20derechos%20de%20autor%20-%20PORTI`}>
              comunicarse con el equipo de PORTI
            </a>. Atenderemos su solicitud con la mayor diligencia.
          </p>
          <p>
            PORTI promueve el reconocimiento del trabajo realizado por autores e instituciones y
            recomienda consultar siempre las versiones más recientes de los documentos en sus
            fuentes oficiales cuando estas se encuentren disponibles.
          </p>
        </section>
      </div>
    </main>
  );
}
