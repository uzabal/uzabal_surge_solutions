/* ==========================================================================
   UZABAL SURGE SOLUTIONS — Configuración centralizada
   --------------------------------------------------------------------------
   PENDIENTE DE CONFIGURACIÓN: todo lo que vale `null` debe completarse
   aquí cuando se reciban los datos definitivos. La interfaz muestra un
   estado "pendiente" y NUNCA genera enlaces incorrectos mientras tanto.

   No es necesario tocar index.html para actualizar estos valores.
   ========================================================================== */

window.UZABAL_CONFIG = {
  /* Datos institucionales ------------------------------------------------ */
  site: {
    name: "UZABAL SURGE SOLUTIONS",
    shortName: "UZABAL",
    descriptor: "SURGE SOLUTIONS",
    slogan: "Ingeniería que protege. Confianza que permanece.",
    country: "Paraguay"
  },

  /* Contacto — valores pendientes ---------------------------------------
     Ejemplo de uso futuro:
       whatsapp: "595981123456"   (solo dígitos, con código de país, sin "+")
       support:  "soporte@..."
       sales:    "ventas@..."                                              */
  contact: {
    whatsapp: null,   // Número definitivo de WhatsApp (solo dígitos)
    support: null,    // Correo de soporte
    sales: null       // Correo de ventas
  },

  /* Mensajes de estado para datos pendientes ---------------------------- */
  pendingLabel: "Pendiente de configurar",

  /* Rutas de imágenes, logotipo y documentos -----------------------------
     Los valores `null` son materiales pendientes: las carpetas correspondientes
     tienen un README con instrucciones. Los archivos definitivos se colocan
     en assets/ y se actualiza esta ruta (y, si aplica, el HTML).            */
  assets: {
    logo: null,                       // assets/images/logo/ (SVG/PNG oficial)
    hero: "assets/images/hero/tormenta-real.png",
    heroBackground: "assets/images/hero/tormenta-real.png",
    heroLightning: "assets/images/hero/tormenta.svg",
    productPrimary: "assets/images/products/g20-a-real.png",
    productSecondary: "assets/images/products/g20-c40-real.png",
    productTertiary: "assets/images/products/g2040-d10-real.png",
    factSheetPrimary: null,           // assets/docs/ficha-g20-a.pdf
    factSheetSecondary: null,         // assets/docs/ficha-g20-c40.pdf
    factSheetTertiary: null,          // assets/docs/ficha-g2040-d10.pdf
    quickGuide: null,                 // assets/docs/guia-rapida.pdf
    institutional: null,              // assets/images/institutional/
    installation: null,               // assets/images/installations/
    ogImage: "assets/images/og/og-image.png"
  },

  /* SEO — el canonical y los metadatos viven en el <head> de index.html.
     Este bloque documenta los valores que deben mantenerse sincronizados.  */
  seo: {
    locale: "es_PY",
    // URL absoluta definitiva una vez confirmado el dominio.
    siteUrl: null,
    keywords: [
      "protección contra sobretensiones",
      "DPS",
      "SPD",
      "pararrayos",
      "protección eléctrica",
      "descargas atmosféricas",
      "puesta a tierra",
      "ingeniería eléctrica",
      "dispositivos de protección contra sobretensiones"
    ]
  }
};
