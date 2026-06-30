import { createContext, useContext } from 'react';

// Catálogo de recursos. Es el ÚNICO contenido del sitio y refleja exactamente
// las tres carpetas del Drive (misma distribución). Se actualiza solo aquí,
// en código, cuando se agrega material nuevo al Drive.
//
//   Cuentos infantiles (5) · Material para padres (10) · Materiales para psicólogos y afines (2)
//
const resources = [
  // === Cuentos infantiles ===
  { id: 1, title: 'Cuando la Tierra se Movió (México)', description: 'Cuento ilustrado para explicarles a las niñas y niños qué es un sismo y por qué ocurre.', category: 'Cuentos infantiles', type: 'PDF', url: './Material terremoto niños/Cuentos infantiles/CUANDO-LA-TIERRA-SE-MOVIO-MEXICO.pdf' },
  { id: 2, title: 'Cuando la Tierra se Movió (1 Minuto de Psicología)', description: 'Versión ilustrada centrada en el impacto emocional de los sismos en la infancia.', category: 'Cuentos infantiles', type: 'PDF', url: './Material terremoto niños/Cuentos infantiles/Cuando la tierra se movió_1minutodepsicologia.pdf' },
  { id: 3, title: 'Plaza Sésamo: Contención Emocional', description: 'Material oficial de Plaza Sésamo para acompañar y contener emocionalmente a los más pequeños.', category: 'Cuentos infantiles', type: 'PDF', url: './Material terremoto niños/Cuentos infantiles/Material Plaza Sesamo contención emocional.pdf' },
  { id: 4, title: 'Mi Miedo, Mi Guardián Personal', description: 'Lectura para resignificar el miedo como una herramienta natural de protección.', category: 'Cuentos infantiles', type: 'PDF', url: './Material terremoto niños/Cuentos infantiles/Mi miedo mi guardián personal.pdf' },
  { id: 5, title: 'Trinka y Sam: El Día que la Tierra Tembló', description: 'Cuento de Trinka y Sam para ayudar a las niñas y niños a procesar desastres naturales.', category: 'Cuentos infantiles', type: 'PDF', url: './Material terremoto niños/Cuentos infantiles/trinka_sam_the_day_the_earth_shook_sp.pdf' },

  // === Material para padres ===
  { id: 6, title: 'Respondiendo a las Necesidades Emocionales de los Niños', description: 'Guía de la AAP y CHLA para padres y cuidadores tras una emergencia.', category: 'Material para padres', type: 'Guía Escrita', url: './Material terremoto niños/Material para padres/CHLA-AAP-Responding-to-Childrens-Emotional-Needs-Spanish_0.pdf' },
  { id: 7, title: 'Reacciones a Eventos Traumáticos según la Edad', description: 'Cómo responden los menores ante el trauma según su etapa de desarrollo.', category: 'Material para padres', type: 'PDF', url: './Material terremoto niños/Material para padres/age_related_reactions_to_traumatic_events_sp.pdf' },
  { id: 8, title: 'Duelo Traumático en la Infancia (Resumen)', description: 'Conceptos fundamentales sobre el duelo en la edad pediátrica tras un desastre.', category: 'Material para padres', type: 'Guía Escrita', url: './Material terremoto niños/Material para padres/brief_information_on_childhood_traumatic_grief_sp.pdf' },
  { id: 9, title: 'Duelo Traumático: Guía Completa para Padres', description: 'Guía extendida con recomendaciones para acompañar a los hijos en el duelo.', category: 'Material para padres', type: 'PDF', url: './Material terremoto niños/Material para padres/childhood_traumatic_grief_materials_parents_sp.pdf' },
  { id: 10, title: 'Cómo Acompañar ante una Muerte no Confirmada', description: 'Apoyo para familias con menores en situaciones de personas desaparecidas.', category: 'Material para padres', type: 'Guía Escrita', url: './Material terremoto niños/Material para padres/coping-with-unconfirmed-death-for-forcibly-displaced-children-and-families-caregivers-sp_0.pdf' },
  { id: 11, title: 'Ayudando a Adolescentes con Duelo Traumático', description: 'Estrategias específicas para acompañar a jóvenes que atraviesan un duelo.', category: 'Material para padres', type: 'PDF', url: './Material terremoto niños/Material para padres/helping-teens-with-traumatic-grief-for-caregivers-sp.pdf' },
  { id: 12, title: 'Ayudando a los Padres a Sobrellevar el Desastre (en inglés)', description: 'Folleto de CHLA y CDC con recursos básicos de manejo del estrés. Documento en inglés.', category: 'Material para padres', type: 'PDF', url: './Material terremoto niños/Material para padres/inglés CHLA-CDC-Helping-Parents-Cope-with-Disaster-English.pdf' },
  { id: 13, title: 'Plan para Manejar los Recuerdos del Evento', description: 'Pasos prácticos para enfrentar los detonantes y los recuerdos intrusivos.', category: 'Material para padres', type: 'Guía Escrita', url: './Material terremoto niños/Material para padres/making_a_plan_dealing_with_things_that_remind_you_what_happened_sp.pdf' },
  { id: 14, title: 'Actividades Simples para Niños y Adolescentes', description: 'Dinámicas prácticas para hacer en casa y reducir la tensión y el estrés.', category: 'Material para padres', type: 'Actividad Práctica', url: './Material terremoto niños/Material para padres/simple_activities_for_children_and_adolescents_spanish.pdf' },
  { id: 15, title: '12 Conceptos Básicos sobre el Estrés Traumático', description: 'Marco teórico para entender el comportamiento de la familia ante el trauma.', category: 'Material para padres', type: 'PDF', url: './Material terremoto niños/Material para padres/the_12_core_concepts_for_understanding_traumatic_stress_responses_in_children_and_families_sp.pdf' },

  // === Materiales para psicólogos y afines ===
  { id: 16, title: 'Guía de Primeros Auxilios Psicológicos', description: 'Manual general para la intervención inmediata en situaciones de crisis.', category: 'Materiales para psicólogos y afines', type: 'PDF', url: './Material terremoto niños/Materiales para psicólogos y afines/Guia Primeros Auxilios Psicologicos.pdf' },
  { id: 17, title: 'Protocolo ACERCARSE (Primeros Auxilios Psicológicos)', description: 'Técnica estructurada de contención y estabilización emocional.', category: 'Materiales para psicólogos y afines', type: 'Guía Escrita', url: './Material terremoto niños/Materiales para psicólogos y afines/PRIMEROS AUXILIOS PSICOLÓGICOS PROTOCOLO ACERCARSE.pdf' }
];

const AppContext = createContext();

export const AppProvider = ({ children }) => (
  <AppContext.Provider value={{ resources }}>
    {children}
  </AppContext.Provider>
);

export const useAppContext = () => useContext(AppContext);
