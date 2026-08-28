/*
 * Configuración de la base de datos de experiencias (Supabase).
 *
 * Mientras estos dos valores estén vacíos, el formulario de "Comparte tu
 * experiencia" sigue funcionando por correo. En cuanto se completen, los
 * mensajes se guardan en la base de datos y aparecen en la página al instante.
 *
 * Dónde encontrarlos: supabase.com → tu proyecto → Settings → API
 *   SUPABASE_URL      = "Project URL"        (ej. https://abcdefgh.supabase.co)
 *   SUPABASE_ANON_KEY = "anon public" key    (es pública por diseño; la
 *                        seguridad la dan las políticas RLS de la tabla)
 */
export const SUPABASE_URL = '';
export const SUPABASE_ANON_KEY = '';

export const supabaseListo = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
