# Documentos oficiales

Carpeta reservada para las fichas técnicas y la guía rápida definitivas.

Hoy los botones «Ver ficha técnica», «Descargar guía rápida» y los enlaces de
«Documentación» del footer están **visibles pero sin destino**, porque los documentos
oficiales aún no fueron entregados. No se crearon enlaces falsos ni PDFs provisorios.

## Cómo cargar los documentos cuando lleguen

1. Colocar aquí los archivos definitivos, por ejemplo:
   - `ficha-g20-a.pdf`
   - `ficha-g20-c40.pdf`
   - `ficha-g2040-d10.pdf`
   - `guia-rapida.pdf`
2. En `index.html`, reemplazar cada botón pendiente por un enlace:
   ```html
   <a class="btn btn--primary btn--pill" href="assets/docs/ficha-g20-a.pdf" target="_blank" rel="noopener noreferrer">Ver ficha técnica</a>
   ```
   Y en el footer, los `<span class="footer__link">` por `<a class="footer__link" href="…">`.
3. Actualizar las rutas en `assets/js/config.js` (`assets.factSheet*`).

No es necesario modificar CSS ni JavaScript.
