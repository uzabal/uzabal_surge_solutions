# Iconos

Los iconos visibles en el sitio están **inlinados en `index.html`** para evitar
peticiones HTTP adicionales y heredar el color con `currentColor`.

Convención para cualquier icono nuevo: `viewBox="0 0 24 24"`, `fill="none"`,
`stroke="currentColor"`, `stroke-width="1.6"`, terminaciones redondas.

Si se recibe un set de iconos oficial, guardar los SVG en esta carpeta y decidir
si se inlinan (recomendado, por rendimiento) o se referencian como archivos.
