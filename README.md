# UZABAL SURGE SOLUTIONS — Sitio institucional

Sitio web institucional **One Page**, estático y sin dependencias. Construido con HTML
semántico, CSS modular y JavaScript vanilla. Sin build, sin framework y sin backend.

> Eslogan: *Ingeniería que protege. Confianza que permanece.*

## Dirección visual

La interfaz es una replicación de las capturas de `docs/referencia/capturas/`.
El análisis completo y las decisiones están en **`docs/referencia/ANALISIS_VISUAL.md`**.

- Hero a pantalla completa con fotografía de tormenta del material de referencia,
  titular exacto, botones pastilla y dispositivos reales.
- Secciones: especialidad (5 tarjetas), productos AC (pestañas + ficha con datos),
  selección orientativa (3 estados), servicios, proceso consultivo, manifiesto,
  documento técnico, contacto y footer.
- **Material de producto original:** recortes de `UZABAL_Datasheet.png` y de las fichas
  entregadas por Felipe, en `assets/images/products/*-real.png`. No se usan imágenes
  genéricas.
- **Documentos:** los botones «Ver ficha técnica», «Descargar guía rápida» y los enlaces
  de «Documentación» del footer están visibles pero **sin destino**, hasta recibir los
  PDF oficiales. `assets/docs/` está vacío y listo para cargarlos (ver su README).
- Se conserva la identidad oficial: paleta `#00A651 / #006B3C / #20282D`, tipografías
  Exo 2 y Source Sans 3. Verde bosque y crema son derivados de la propuesta del cliente.

---

## 1. Ejecutar el proyecto

Desde la raíz del repositorio:

```bash
python3 -m http.server 8000
```

Luego abrir **http://localhost:8000**.

También puede desplegarse tal cual en cualquier hosting estático (GitHub Pages,
Netlify, Vercel, Apache/Nginx, etc.). **No es necesario instalar nada.**

> Nota: se recomienda servir por HTTP (no abrir el `index.html` con doble clic)
> para un comportamiento idéntico al de producción.

---

## Despliegue en GitHub Pages

El sitio está listo para publicarse tal cual:

1. Hacer commit y push a la rama `main` (o la rama que indique GitHub Pages).
2. En el repositorio: **Settings → Pages → Build and deployment**
   - Source: **Deploy from a branch**
   - Branch: `main` / `/ (root)`
3. El sitio quedará en `https://uzabal.github.io/uzabal_surge_solutions/`.

Detalles técnicos:

- Todas las rutas del HTML y del CSS son **relativas**, así que funcionan igual en local,
  en un subdirectorio y en GitHub Pages.
- Se incluye `.nojekyll` para servir los archivos estáticos sin procesamiento Jekyll.
- `.gitignore` excluye artefactos de herramientas locales (`.agents/`, `skills-lock.json`).
- Canonical, hreflang, Open Graph, sitemap y robots ya usan la URL de GitHub Pages.
  Si se configura un dominio propio, actualizar esas referencias (6 apariciones).

---

## 2. Arquitectura

```
index.html                  Contenido completo + SEO + datos estructurados
favicon.svg                 Favicon temporal reemplazable
robots.txt                  Directivas para crawlers
sitemap.xml                 Mapa del sitio (una URL, por ser One Page)
assets/
├── css/
│   ├── tokens.css          Colores, tipografías, espaciado y movimiento
│   ├── base.css            Reset, tipografía base, foco y accesibilidad
│   ├── layout.css          Header, navegación, contenedores y footer
│   ├── components.css      Botones, tarjetas, badges, iconos y formulario
│   └── sections.css        Estilos específicos por sección
├── js/
│   ├── config.js           ← CONFIGURACIÓN CENTRALIZADA (contacto, WhatsApp, assets, SEO)
│   └── main.js             Menú móvil, anclas activas, reveal y formulario → WhatsApp
├── icons/                  README (los iconos están inlinados en index.html)
├── docs/                   Vacío + README (fichas técnicas y guía rápida oficiales)
└── images/                 hero, productos y OG en uso; logo/institucional/instalaciones
                            vacías con README para material oficial
```

Archivos sin uso eliminados: SVG esquemáticos de producto, ilustración anterior del
hero, logo/placeholders institucionales y copias provisorias de fichas. Las carpetas se
conservan con README para cargar los materiales definitivos sin reconstruir secciones.

El contenido visible vive en `index.html` (mejor para SEO: los crawlers lo leen sin
ejecutar JavaScript). La configuración que depende de datos aún no recibidos vive en
`assets/js/config.js`.

---

## 3. Datos pendientes de configuración

**Todos los valores `null`/pendientes están en `assets/js/config.js`.** No es necesario
tocar el HTML para activarlos.

| Dato pendiente | Dónde configurarlo |
|---|---|
| Número de WhatsApp | `contact.whatsapp` (solo dígitos con código de país, ej. `"595981123456"`). Al configurarlo se activan automáticamente los 4 CTAs, el bloque de contacto, el footer y el envío del formulario. |
| Correo de soporte | `contact.support` → se transforma en un enlace `mailto:`. |
| Correo de ventas | `contact.sales` → se transforma en un enlace `mailto:`. |
| Fotografías de productos | Ya se usan recortes de las fotos originales (`*-real.png`). Si llegan imágenes de mayor calidad, sobrescribir esos archivos conservando el nombre. |
| Fotografía de tormenta del hero | Sobrescribir `assets/images/hero/tormenta-real.png` con la foto definitiva. La ruta está en `config.js` → `assets.hero` / `assets.heroBackground`. |
| Logotipo original | Guardar en `assets/images/logo/` y seguir su README. La marca actual es tipográfica (HTML/CSS). |
| Foto de Felipe / institucional | Guardar en `assets/images/institutional/` y seguir su README (estructura oculta en «Nosotros»). |
| Fichas técnicas / guía rápida | Guardar en `assets/docs/` y seguir su README; luego activar los botones y enlaces del footer. |
| Dirección / zona de atención | Agregar en el bloque de contacto de `index.html` y en el footer **solo cuando se confirme**. |
| Líneas comerciales activas | Hoy solo se publican **AC Protection** y **Engineering**. PV / Signal / Fire Protection quedan deliberadamente fuera. |
| Info personal/profesional | Estructura reservada (oculta) en la sección Nosotros de `index.html`, bloque `.about__future`. |

Mientras estos datos no se configuren, los botones **no generan enlaces erróneos**:
permanecen desactivados o muestran "Pendiente de configurar".

### Comportamiento del formulario

1. Valida nombre, correo, teléfono, tipo de consulta y mensaje (empresa es opcional).
2. Construye un mensaje ordenado con todos los datos.
3. Abre WhatsApp con el mensaje ya cargado para que el visitante lo **revise y envíe**.
4. Si el número aún no está configurado, muestra el mensaje listo y un botón
   **"Copiar mensaje"**. No envía correos, no guarda datos y no requiere backend.

---

## 4. SEO

 Ya implementado:

- `<html lang="es">`, título, meta description, keywords y `robots`.
- Jerarquía H1 → H2 → H3 → H4 correcta y una sola H1.
- Open Graph + Twitter Cards, `theme-color`, `geo.region=PY` y hreflang `es` / `es-PY`.
- Canonical, hreflang, `og:url`, `og:image` y `twitter:image` apuntando a la URL de
  GitHub Pages derivada del remoto (`https://uzabal.github.io/uzabal_surge_solutions/`).
- JSON-LD `Organization` **solo con datos confirmados** (sin teléfono, correo, dirección ni URL).
- `sitemap.xml`, `robots.txt` y favicon SVG.
- Imágenes con `alt`, dimensiones y `loading="lazy"` (excepto el hero).
- Navegación por anclas con `scroll-margin` vía `scroll-padding-top`.

**Si se usa un dominio propio**, reemplazar las 6 apariciones de
`https://uzabal.github.io/uzabal_surge_solutions/` en `index.html`, `sitemap.xml` y
`robots.txt`. Con GitHub Pages no hay que cambiar nada.

Antes de publicar:

1. Reemplazar `assets/images/og/og-image.png` por la imagen definitiva 1200×630.
2. Agregar el archivo de verificación de **Google Search Console** en la raíz cuando se solicite.
3. Actualizar `config.seo.siteUrl` en `config.js` si el dominio cambia (documentación).
4. Actualizar `<lastmod>` en `sitemap.xml` cuando el contenido cambie.

---

## 5. Accesibilidad y rendimiento

- `skip-link`, landmarks semánticos, menú con `aria-expanded` / `aria-controls`,
  cierre con `Escape` y foco gestionado.
- Estados `:focus-visible`, `:hover` y `:active`; contraste AA (el verde de acento se
  usa en detalles; los rellenos interactivos usan verde profundo `#006B3C`).
- `prefers-reduced-motion` respetado. El contenido **nunca queda oculto** si JS falla.
- Cero dependencias, CSS crítico local, fuentes con `preconnect` y `display=swap`,
  iconos inlinados y JS con `defer`.

---

## 6. Alcance deliberadamente excluido

Tienda, carrito, pagos, login, panel admin, inventario, base de datos, blog,
portal de distribuidores, chatbot y automatizaciones. La «selección orientativa» es
una interfaz de tres estados que muestra información, **no un selector que calcule**
ni recomiende automáticamente. PV Protection, Signal Protection y Fire Protection
**no se publican** hasta confirmación.

---

## 7. Verificación rápida

```bash
python3 -m http.server 8000   # Servir
python3 -c "import xml.dom.minidom; xml.dom.minidom.parse('sitemap.xml'); print('sitemap OK')"
```

Comprobar en el navegador: menú hamburguesa, anclas, foco con teclado, formulario
válido/inválido, vista móvil 375 px y modo de movimiento reducido.
