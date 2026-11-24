# Assets — UZABAL SURGE SOLUTIONS

Estructura limpia, preparada para recibir los materiales definitivos sin reconstruir
secciones. Las fotos de producto usadas hoy **son recortes del material original
entregado por Felipe**; el resto de imágenes son de referencia y están documentadas.

```
assets/
├── css/                     Estilos modulares (tokens, base, layout, components, sections)
├── js/                      config.js (datos) + main.js (comportamiento)
├── icons/                   Solo README: los iconos están inlinados en index.html
├── docs/                    Vacío + README: fichas técnicas y guía rápida oficiales
└── images/
    ├── logo/                Vacío + README: logotipo SVG/PNG oficial
    ├── hero/                tormenta-real.png (foto de referencia) + tormenta.svg (rayos)
    ├── products/            g20-a-real.png, g20-c40-real.png, g2040-d10-real.png
    │                        → recortes de las fotos originales de Felipe
    ├── institutional/       Vacío + README: foto de Felipe / institucional
    ├── installations/       Vacío + README: fotos de instalaciones
    └── og/                  og-image.png (1200×630) → imagen definitiva para redes
```

## Cómo cargar material oficial

| Material | Acción |
|---|---|
| Logotipo oficial | Guardar en `images/logo/` y seguir `images/logo/README.md`. La marca actual es tipográfica (HTML/CSS), no depende de ningún archivo. |
| Fichas técnicas / guía rápida | Guardar en `docs/` y seguir `docs/README.md`. Hoy los botones y enlaces están visibles **sin destino**, a la espera de los PDF oficiales. |
| Fotos de producto de mayor calidad | Sobrescribir `images/products/*-real.png` conservando el nombre; no hace falta tocar el HTML. |
| Foto institucional / de Felipe | Guardar en `images/institutional/` y seguir su README. La sección «Nosotros» tiene una estructura oculta para ese contenido. |
| Fotos de instalaciones | Guardar en `images/installations/` y seguir su README. No publicar fotos genéricas como propias. |
| Fotografía original del hero | Sobrescribir `images/hero/tormenta-real.png` manteniendo proporción panorámica y zona oscura a la izquierda. |
| Imagen Open Graph | Reemplazar `images/og/og-image.png` por una imagen 1200×630 definitiva. |
| Datos de contacto | Completar `contact` en `js/config.js` (WhatsApp y correos). |

Los valores pendientes en `js/config.js` son `null`; las carpetas vacías incluyen un
README con el nombre de archivo sugerido y el fragmento de HTML a reemplazar.

## Convenciones

- Iconos: `viewBox 0 0 24 24`, `fill="none"`, `stroke="currentColor"`, trazo 1.6.
  Están inlinados en `index.html` para evitar peticiones y heredar el color.
- Imágenes: siempre con `width`, `height`, `alt` descriptivo y `loading="lazy"` salvo el hero.
- Rutas relativas: funciona igual en local, en un subdirectorio y en GitHub Pages.
