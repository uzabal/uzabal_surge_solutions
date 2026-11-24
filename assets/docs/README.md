# Documentos oficiales descargables

Contenido entregado por Felipe, listo para publicar. Los botones «Ver ficha técnica» y
«Descargar guía rápida», y los enlaces «Fichas técnicas» y «Guía rápida» del footer,
ya apuntan a estos archivos.

| Archivo | Uso en el sitio |
|---|---|
| `UZABAL_Datasheet_G20-A_Oct2026.pdf` | Ficha técnica de G20-A (Clase I / Tipo 1) |
| `UZABAL_Datasheet_G20-C40_Oct2026.pdf` | Ficha técnica de G20-C40 (Clase II / Tipo 2) |
| `UZABAL_Datasheet_G2040-D10_Oct2026.pdf` | Ficha técnica de G2040-D10 (Clase III / Tipo 3) |
| `USS_Guia_Rapida_Instalacion_Rev01_Nov2026.pdf` | Guía rápida de instalación, Rev. 01 |

Las rutas también están centralizadas en `assets/js/config.js` (`assets.factSheet*` y
`assets.quickGuide`).

## Documentos internos (no descargables desde la web)

En `docs/referencia/` se conservan, como fuente de contenido y no enlazados públicamente:

- `Brief_Integral_Diseno_Web_Uzabal_Surge_Solutions.pdf`
- `Manual_Integral_Identidad_Uzabal_Surge_Solutions_v1.1.pdf`

El Manual es la fuente del texto institucional de la sección «Nosotros»: origen,
propósito, misión, visión y valores rectores. El Brief define la arquitectura y las
restricciones de contenido (no publicar datos no aprobados).

## Si cambian los documentos

Reemplazar el PDF conservando el mismo nombre de archivo: no hay que tocar el HTML.
Si cambia el nombre, actualizar las rutas en `index.html` y en `config.js`.
