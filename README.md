# Portal de Apoyo Psicoeducativo Post-Terremoto · Venezuela 2026

Repositorio web, **abre sin conexión**, con recursos psicoeducativos de acceso libre
para acompañar a niñas, niños, adolescentes y familias tras los sismos del
**24 de junio de 2026** en la costa norte de Venezuela (Yaracuy, Falcón, Carabobo,
Aragua, La Guaira y zonas cercanas).

## Tecnología

- **React 19 + Vite 5**, CSS plano (sin Tailwind).
- **`HashRouter`** para que el ruteo funcione al abrir el archivo localmente (`file://`).
- **`vite-plugin-singlefile`**: empaqueta todo (JS + CSS) en un único `index.html`.
- Estado global con React Context (`src/store.jsx`), persistido en `localStorage`.
- Iconos: `lucide-react`.

## Estructura

- `src/components/` — UI reutilizable (`Navbar`, `Hero`, `ResourceCard`, `SocialMedia`, `Footer`).
- `src/pages/` — vista única (`Home`). No hay login ni panel de administración.
- `public/Material terremoto niños/` — los PDF reales. Vite copia esta carpeta a
  `dist/` en cada build; los recursos se enlazan con rutas relativas
  (`./Material terremoto niños/...`).

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build y distribución offline

```bash
npm run build && mv dist/index.html dist/Portal_Apoyo_Psicoeducativo.html
```

Luego abre `dist/Portal_Apoyo_Psicoeducativo.html` con doble clic en Chrome o Safari.
La carpeta `dist/Material terremoto niños/` debe acompañar al HTML para que los PDF abran.

## Contenido (catálogo)

No hay panel de administración. El catálogo vive en `src/store.jsx` y se actualiza
**solo en código** cuando hay material nuevo en el Drive. Las categorías deben
reflejar exactamente las tres carpetas del Drive: *Cuentos infantiles*,
*Material para padres*, *Materiales para psicólogos y afines*.

## Redes sociales recomendadas

Las cuentas se definen en el arreglo `RECOMMENDED` dentro de
`src/components/SocialMedia.jsx`. Para publicar una cuenta real, completa su `url`
(mientras esté vacía, la tarjeta muestra "Enlace por confirmar"). El campo
`platform` acepta: `instagram`, `tiktok`, `facebook`, `youtube`, `x`, `whatsapp`.

## Notas

- Mantener `HashRouter` (no usar `BrowserRouter`) o el build offline deja de funcionar.
- Los materiales son de organizaciones como NCTSN, CHLA & AAP y Plaza Sésamo,
  recopilados y traducidos para uso comunitario. **No reemplazan la atención profesional.**
