# UZABAL SURGE SOLUTIONS — Sitio institucional

Versión publicada de la web, entregada por Felipe y construida con HTML/CSS/JS estáticos.
**Sin build, sin dependencias y sin backend.**

> Eslogan: *Ingeniería que protege. Confianza que permanece.*

## Arquitectura (versión entregada)

```
index.html          Página completa: hero, especialidad, productos, selección,
                    documento técnico, ingeniería, proceso, Nosotros, contacto y footer
styles.css          Reset, layout y componentes base + responsive
styles-premium.css  Identidad visual premium (paleta, tipografía, secciones)
styles-ad.css       Estilos complementarios conservados del proyecto (referencia)
script.js           Menú móvil, pestañas, selección orientativa, reveal y formulario
assets/             Logotipos, imágenes de producto, fondos WebP, vistas de fichas y PDFs
docs/referencia/    Capturas, análisis visual y documentos internos (no enlazados)
```

## Ejecutar

```bash
python3 -m http.server 8000
```

Abrir `http://localhost:8000`.

## GitHub Pages

El sitio está listo para publicarse desde la rama `main` / raíz. Incluye `.nojekyll`
para servir archivos estáticos sin Jekyll. Todas las rutas son relativas.

Canonical, hreflang, `og:url` y `og:image` apuntan a
`https://uzabal.github.io/uzabal_surge_solutions/` (derivado del remoto).
Si se usa dominio propio, actualizar esas referencias en `<head>`, `sitemap.xml` y
`robots.txt`.

## Documentos y imágenes

En `assets/` están las imágenes usadas por la versión entregada: logotipo en PNG,
productos con fondo transparente, fondos del hero y vistas previas de fichas.
Los PDF descargables también están en `assets/` y son enlazados desde los botones
y el footer.

En `docs/referencia/` se conservan el Brief y el Manual Integral de Identidad como
fuentes internas, sin enlace público. El Manual aporta el texto institucional de
“Nosotros” (origen, propósito, misión, visión y valores rectores).

Ver `assets/README.md` para convenciones y mantenimiento.

## Pendiente

- Número de WhatsApp y correos definitivos (el formulario es demostrativo).
- Logotipo vectorial definitivo (la versión actual usa el PNG entregado).
- Dirección/zona de atención, si se quiere publicar.
- Fotografía y datos profesionales, si Felipe decide incluirlos.

El formulario no envía correos ni almacena datos: solo prepara la consulta.
