import { createContext, useContext } from 'react';

// Catálogo de recursos. Es el ÚNICO contenido del sitio y refleja exactamente
// las tres carpetas del Drive (misma distribución). Se actualiza solo aquí,
// en código, cuando se agrega material nuevo al Drive.
//
//   Cuentos infantiles (11: 9 terremotos + 2 duelo) · Material para padres (11) · Materiales para psicólogos y afines (6)
//
const resources = [
  // === Cuentos infantiles · Sobre terremotos ===
  { id: 1, title: 'Cuando la Tierra se Movió (México)', description: 'Cuento ilustrado para explicarles a las niñas y niños qué es un sismo y por qué ocurre.', category: 'Cuentos infantiles', subcategory: 'Sobre terremotos', type: 'PDF', url: './Material terremoto niños/Cuentos infantiles/Sobre terremotos/CUANDO-LA-TIERRA-SE-MOVIO-MEXICO.pdf' },
  { id: 2, title: 'Cuando la Tierra se Movió (1 Minuto de Psicología)', description: 'Versión ilustrada centrada en el impacto emocional de los sismos en la infancia.', category: 'Cuentos infantiles', subcategory: 'Sobre terremotos', type: 'PDF', url: './Material terremoto niños/Cuentos infantiles/Sobre terremotos/Cuando la tierra se movió_1minutodepsicologia.pdf' },
  { id: 3, title: 'Plaza Sésamo: Contención Emocional', description: 'Material oficial de Plaza Sésamo para acompañar y contener emocionalmente a los más pequeños.', category: 'Cuentos infantiles', subcategory: 'Sobre terremotos', type: 'PDF', url: './Material terremoto niños/Cuentos infantiles/Sobre terremotos/Material Plaza Sesamo contención emocional.pdf' },
  { id: 4, title: 'Mi Miedo, Mi Guardián Personal', description: 'Lectura para resignificar el miedo como una herramienta natural de protección.', category: 'Cuentos infantiles', subcategory: 'Sobre terremotos', type: 'PDF', url: './Material terremoto niños/Cuentos infantiles/Sobre terremotos/Mi miedo mi guardián personal.pdf' },
  { id: 5, title: 'Trinka y Sam: El Día que la Tierra Tembló', description: 'Cuento de Trinka y Sam para ayudar a las niñas y niños a procesar desastres naturales.', category: 'Cuentos infantiles', subcategory: 'Sobre terremotos', type: 'PDF', url: './Material terremoto niños/Cuentos infantiles/Sobre terremotos/trinka_sam_the_day_the_earth_shook_sp.pdf' },
  { id: 18, title: 'El Día que Todo se Movió', description: 'Cuento ilustrado para acompañar a las niñas y niños a comprender y nombrar lo que sintieron durante el sismo.', category: 'Cuentos infantiles', subcategory: 'Sobre terremotos', type: 'PDF', url: './Material terremoto niños/Cuentos infantiles/Sobre terremotos/202010-RSC-vB6veFy91v-El_da_que_todo_se_movio.pdf' },
  { id: 19, title: 'Cuando la Tierra se Mueve, Tus Manos me Sostienen', description: 'Cuento sobre la contención y el cariño de los cuidadores como refugio seguro ante el miedo.', category: 'Cuentos infantiles', subcategory: 'Sobre terremotos', type: 'PDF', url: './Material terremoto niños/Cuentos infantiles/Sobre terremotos/CUENTO CUANDO LA TIERRA SE MUEVE, TUS MANOS ME SOSTIENEN (A4).pdf' },
  { id: 26, title: 'Ana y el Terremoto', description: 'Cuento que acompaña a las niñas y niños a entender y calmar el miedo después de un temblor.', category: 'Cuentos infantiles', subcategory: 'Sobre terremotos', type: 'PDF', url: './Material terremoto niños/Cuentos infantiles/Sobre terremotos/Ana-y-el-terremoto.pdf' },
  { id: 27, title: 'Érase una Vez unos Valientes', description: 'Cuento sobre la valentía y la esperanza compartida para sobrellevar un desastre.', category: 'Cuentos infantiles', subcategory: 'Sobre terremotos', type: 'PDF', url: './Material terremoto niños/Cuentos infantiles/Sobre terremotos/Cuento_erase_una_vez_unos_valientes.pdf' },

  // === Cuentos infantiles · Sobre el duelo y la muerte ===
  { id: 20, title: 'El Tejedor Invisible del Corazón', description: 'Cuento para trabajar las emociones, los vínculos y la esperanza tras una pérdida.', category: 'Cuentos infantiles', subcategory: 'Sobre el duelo y la muerte', type: 'PDF', url: './Material terremoto niños/Cuentos infantiles/Sobre el duelo y la muerte/El tejedor invisible del corazón.pdf' },
  { id: 28, title: 'El Árbol de los Recuerdos', description: 'Cuento para acompañar el duelo honrando los recuerdos de quienes ya no están.', category: 'Cuentos infantiles', subcategory: 'Sobre el duelo y la muerte', type: 'PDF', url: './Material terremoto niños/Cuentos infantiles/Sobre el duelo y la muerte/CUENTO-El-arbol-de-los-recuerdos.pdf' },

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
  { id: 21, title: 'Guía Familiar ante Sismos y Maremotos', description: 'Recomendaciones prácticas de preparación y respuesta para toda la familia ante sismos y maremotos.', category: 'Material para padres', type: 'Guía Escrita', url: './Material terremoto niños/Material para padres/guia-familiar-sismos-maremotos.pdf' },

  // === Materiales para psicólogos y afines ===
  { id: 16, title: 'Guía de Primeros Auxilios Psicológicos', description: 'Manual general para la intervención inmediata en situaciones de crisis.', category: 'Materiales para psicólogos y afines', type: 'PDF', url: './Material terremoto niños/Materiales para psicólogos y afines/Guia Primeros Auxilios Psicologicos.pdf' },
  { id: 17, title: 'Protocolo ACERCARSE (Primeros Auxilios Psicológicos)', description: 'Técnica estructurada de contención y estabilización emocional.', category: 'Materiales para psicólogos y afines', type: 'Guía Escrita', url: './Material terremoto niños/Materiales para psicólogos y afines/PRIMEROS AUXILIOS PSICOLÓGICOS PROTOCOLO ACERCARSE.pdf' },
  { id: 22, title: 'Manual ABCDE de Primeros Auxilios Psicológicos', description: 'Método ABCDE para aplicar PAP en crisis individuales y colectivas (PUC de Chile · CIGIDEN).', category: 'Materiales para psicólogos y afines', type: 'PDF', url: './Material terremoto niños/Materiales para psicólogos y afines/59897_auxiliar.pdf' },
  { id: 23, title: 'Fichas Psicológicas de Intervención', description: 'Fichas de trabajo para apoyar la intervención y la contención psicológica.', category: 'Materiales para psicólogos y afines', type: 'Guía Escrita', url: './Material terremoto niños/Materiales para psicólogos y afines/Fichas Psicológicas.pdf' },
  { id: 24, title: 'Guía de Apoyo Psicosocial en Emergencias (Save the Children)', description: 'Manual de Save the Children para el apoyo psicosocial a la niñez en situaciones de emergencia.', category: 'Materiales para psicólogos y afines', type: 'PDF', url: './Material terremoto niños/Materiales para psicólogos y afines/Guia-de-apoyo-psicosocial-en-situaciones-de-emergencia-Save-the-Children.pdf' },
  { id: 25, title: 'Manual de Primeros Auxilios Psicológicos para Población Migrante', description: 'Guía de PAP con enfoque en población migrante y desplazada.', category: 'Materiales para psicólogos y afines', type: 'PDF', url: './Material terremoto niños/Materiales para psicólogos y afines/MANUAL-PRIMEROS-AUXILIOS-PSICOLOGICOS-POBLACION-MIGRANTE.pdf' }
];

const AppContext = createContext();

export const AppProvider = ({ children }) => (
  <AppContext.Provider value={{ resources }}>
    {children}
  </AppContext.Provider>
);

export const useAppContext = () => useContext(AppContext);
