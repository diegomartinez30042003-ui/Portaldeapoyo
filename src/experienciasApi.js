import { SUPABASE_URL, SUPABASE_ANON_KEY, supabaseListo } from './config';

/*
 * Cliente mínimo para la tabla `experiencias` de Supabase.
 * Usamos fetch directo (en vez de @supabase/supabase-js) para no añadir
 * ~50 KB al portal: muchas familias lo abren con conexiones lentas.
 */
const TABLA = 'experiencias';

const headers = () => ({
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json'
});

/** Trae las experiencias publicadas, de la más reciente a la más antigua. */
export async function listarExperiencias(limite = 50) {
  if (!supabaseListo) return [];
  const url = `${SUPABASE_URL}/rest/v1/${TABLA}?select=id,nombre,texto,creado_en&order=creado_en.desc&limit=${limite}`;
  const res = await fetch(url, { headers: headers() });
  if (!res.ok) throw new Error(`No se pudieron cargar las experiencias (${res.status})`);
  return res.json();
}

/** Guarda una experiencia nueva y devuelve la fila creada. */
export async function guardarExperiencia({ nombre, texto }) {
  if (!supabaseListo) throw new Error('Base de datos no configurada');
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${TABLA}`, {
    method: 'POST',
    headers: { ...headers(), Prefer: 'return=representation' },
    body: JSON.stringify([{ nombre, texto }])
  });
  if (!res.ok) {
    const detalle = await res.text().catch(() => '');
    throw new Error(`No se pudo guardar (${res.status}) ${detalle}`.trim());
  }
  const filas = await res.json();
  return filas[0];
}

/** Formatea la fecha para mostrarla bajo cada experiencia. */
export function formatearFecha(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('es-VE', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  } catch {
    return '';
  }
}
