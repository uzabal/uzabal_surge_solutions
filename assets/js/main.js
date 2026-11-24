/* ==========================================================================
   UZABAL SURGE SOLUTIONS — Comportamiento de la interfaz
   Sin dependencias. Se ejecuta con defer, después de analizar el HTML.
   ========================================================================== */

(function () {
  "use strict";

  var config = window.UZABAL_CONFIG || {};
  var contact = config.contact || {};
  var pendingLabel = (config.pendingLabel) || "Pendiente de configurar";
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /* ---------- Utilidades ------------------------------------------------ */

  function digitsOnly(value) {
    return String(value || "").replace(/\D/g, "");
  }

  // Acepta 8–15 dígitos: evita generar enlaces wa.me inválidos.
  function validPhone(value) {
    var digits = digitsOnly(value);
    return digits.length >= 8 && digits.length <= 15 ? digits : null;
  }

  function validEmail(value) {
    return typeof value === "string" && EMAIL_RE.test(value.trim());
  }

  function whatsappUrl(phone, text) {
    return "https://wa.me/" + phone + (text ? "?text=" + encodeURIComponent(text) : "");
  }

  /* ---------- Header: sombra discreta al desplazarse -------------------- */

  var header = document.getElementById("site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Menú móvil accesible ------------------------------------- */

  var navToggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("site-nav");

  if (navToggle && nav) {
    function setMenu(open) {
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Cerrar menú de navegación" : "Abrir menú de navegación");
      nav.classList.toggle("is-open", open);
      document.body.classList.toggle("nav-open", open);
    }

    navToggle.addEventListener("click", function () {
      var open = navToggle.getAttribute("aria-expanded") === "true";
      setMenu(!open);
      if (!open) {
        window.requestAnimationFrame(function () {
          var first = nav.querySelector(".site-nav__link");
          if (first) first.focus();
        });
      }
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setMenu(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && navToggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        navToggle.focus();
      }
    });

    document.addEventListener("click", function (event) {
      if (navToggle.getAttribute("aria-expanded") !== "true") return;
      if (!nav.contains(event.target) && !navToggle.contains(event.target)) setMenu(false);
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 992) setMenu(false);
    });
  }

  /* ---------- Navegación activa según la sección visible ---------------- */

  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".site-nav__link"));
  var sections = navLinks
    .map(function (link) { return document.querySelector(link.getAttribute("href")); })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          var active = link.getAttribute("href") === "#" + entry.target.id;
          if (active) link.setAttribute("aria-current", "true");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-42% 0px -52% 0px", threshold: 0 });

    sections.forEach(function (section) { sectionObserver.observe(section); });
  }

  /* ---------- Reveal sutil (con respeto a movimiento reducido) ---------- */

  var reveals = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    reveals.forEach(function (el) { revealObserver.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Pestañas de productos (interfaz, no selector automático) - */

  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
  function activateTab(tab) {
    tabs.forEach(function (item) {
      var active = item === tab;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-selected", String(active));
      item.setAttribute("tabindex", active ? "0" : "-1");
      var panel = document.getElementById(item.getAttribute("aria-controls"));
      if (panel) {
        panel.hidden = !active;
        panel.classList.toggle("is-active", active);
      }
    });
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener("click", function () { activateTab(tab); });
    tab.addEventListener("keydown", function (event) {
      var target = null;
      if (event.key === "ArrowRight") target = tabs[(index + 1) % tabs.length];
      if (event.key === "ArrowLeft") target = tabs[(index - 1 + tabs.length) % tabs.length];
      if (event.key === "Home") target = tabs[0];
      if (event.key === "End") target = tabs[tabs.length - 1];
      if (target) {
        event.preventDefault();
        activateTab(target);
        target.focus();
      }
    });
  });

  /* ---------- Selección orientativa (tres estados, sin cálculo automático) */

  var guideData = {
    g20a: { type: "TIPO 1", level: "Protección primaria", series: "Serie G20-A",
      text: "Para el origen de la instalación y tableros principales expuestos a corrientes parciales de rayo." },
    g20c40: { type: "TIPO 2", level: "Protección secundaria", series: "Serie G20-C40",
      text: "Para tableros principales o secundarios, frente a sobretensiones inducidas y de maniobra." },
    g2040: { type: "TIPO 3", level: "Protección terciaria", series: "Serie G2040-D10",
      text: "Para tableros finales y proximidad de equipos sensibles como última etapa coordinada." }
  };

  var guideButtons = Array.prototype.slice.call(document.querySelectorAll("[data-guide]"));
  guideButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var key = button.getAttribute("data-guide");
      var data = guideData[key];
      if (!data) return;

      guideButtons.forEach(function (item) {
        var active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });

      var setText = function (id, value) {
        var el = document.getElementById(id);
        if (el) el.textContent = value;
      };
      setText("guide-type", data.type);
      setText("guide-level", data.level);
      setText("guide-series", data.series);
      setText("guide-text", data.text);
    });
  });

  /* ---------- Año dinámico --------------------------------------------- */

  Array.prototype.forEach.call(document.querySelectorAll("[data-year]"), function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---------- Hidratación de datos de contacto ------------------------- */

  var phone = validPhone(contact.whatsapp);

  // Botones de WhatsApp (hero, header y menú móvil).
  Array.prototype.forEach.call(document.querySelectorAll("[data-whatsapp-cta]"), function (el) {
    if (!phone) return; // Permanece desactivado: nunca apunta a un enlace erróneo.
    el.setAttribute("href", whatsappUrl(phone));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener noreferrer");
    el.removeAttribute("aria-disabled");
    el.removeAttribute("tabindex");
  });

  // Convierte un bloque pendiente en enlace real cuando el dato existe.
  function hydrateContactBlock(el, value, href, isExternal) {
    var link = document.createElement("a");
    link.className = el.className.replace(/\bis-pending\b/g, "").trim();
    link.innerHTML = el.innerHTML;
    link.setAttribute("href", href);
    link.querySelector("[data-contact-value]").textContent = value;
    if (isExternal) {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    }
    el.replaceWith(link);
  }

  Array.prototype.forEach.call(document.querySelectorAll("[data-contact]"), function (el) {
    var key = el.getAttribute("data-contact");
    var value = typeof contact[key] === "string" ? contact[key].trim() : "";
    if (!value) return;

    if (key === "whatsapp") {
      var wa = validPhone(value);
      if (wa) hydrateContactBlock(el, "+" + wa, whatsappUrl(wa), true);
    } else if (validEmail(value)) {
      hydrateContactBlock(el, value, "mailto:" + value, false);
    }
  });

  Array.prototype.forEach.call(document.querySelectorAll("[data-footer-contact]"), function (el) {
    var key = el.getAttribute("data-footer-contact");
    var value = typeof contact[key] === "string" ? contact[key].trim() : "";
    if (!value) return;

    var label = el.textContent.split(":")[0];
    var href = null;
    if (key === "whatsapp") {
      var wa = validPhone(value);
      if (wa) {
        href = whatsappUrl(wa);
        value = "+" + wa;
      }
    } else if (validEmail(value)) {
      href = "mailto:" + value;
    }
    if (!href) return;

    var link = document.createElement("a");
    link.className = el.className;
    link.textContent = label + ": " + value;
    link.setAttribute("href", href);
    if (key === "whatsapp") {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    }
    el.replaceWith(link);
  });

  var pendingNotice = document.querySelector("[data-pending-notice]");
  if (pendingNotice && phone && validEmail(contact.support) && validEmail(contact.sales)) {
    pendingNotice.hidden = true;
  }

  /* ---------- Formulario → mensaje de WhatsApp ------------------------- */

  var form = document.getElementById("contact-form");
  if (!form) return;

  var status = document.getElementById("form-status");
  var copyButton = document.getElementById("copy-message");
  var lastMessage = "";

  var fields = {
    nombre: document.getElementById("cf-nombre"),
    empresa: document.getElementById("cf-empresa"),
    email: document.getElementById("cf-email"),
    telefono: document.getElementById("cf-telefono"),
    tipo: document.getElementById("cf-tipo"),
    mensaje: document.getElementById("cf-mensaje")
  };

  var messages = {
    nombre: "Ingrese su nombre.",
    email: "Ingrese un correo electrónico válido.",
    telefono: "Ingrese un número de teléfono válido.",
    tipo: "Seleccione el tipo de consulta.",
    mensaje: "Escriba su consulta (mínimo 10 caracteres)."
  };

  function validate(input, key) {
    var value = input.value.trim();
    var error = "";

    switch (key) {
      case "nombre":
        if (value.length < 2) error = messages.nombre;
        break;
      case "email":
        if (!validEmail(value)) error = messages.email;
        break;
      case "telefono":
        if (digitsOnly(value).length < 6) error = messages.telefono;
        break;
      case "tipo":
        if (!value) error = messages.tipo;
        break;
      case "mensaje":
        if (value.length < 10) error = messages.mensaje;
        break;
      default:
        break;
    }

    input.setAttribute("aria-invalid", error ? "true" : "false");
    var errorEl = document.getElementById(input.id + "-error");
    if (errorEl) errorEl.textContent = error;
    return error;
  }

  Object.keys(fields).forEach(function (key) {
    var input = fields[key];
    if (!input) return;
    var eventName = input.tagName === "SELECT" ? "change" : "input";
    input.addEventListener(eventName, function () {
      if (input.getAttribute("aria-invalid") === "true") validate(input, key);
    });
  });

  function buildMessage(data) {
    return [
      "Consulta desde el sitio web — UZABAL SURGE SOLUTIONS",
      "",
      "Nombre: " + data.nombre,
      "Empresa: " + (data.empresa || "No indicada"),
      "Correo electrónico: " + data.email,
      "Teléfono: " + data.telefono,
      "Tipo de consulta: " + data.tipo,
      "",
      "Mensaje:",
      data.mensaje
    ].join("\n");
  }

  function setStatus(text, kind) {
    if (!status) return;
    status.textContent = text;
    status.className = "form-status" + (kind ? " form-status--" + kind : "");
  }

  function showCopyButton(show) {
    if (copyButton) copyButton.hidden = !show;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var firstInvalid = null;
    Object.keys(fields).forEach(function (key) {
      var input = fields[key];
      if (!input) return;
      if (validate(input, key) && !firstInvalid) firstInvalid = input;
    });

    if (firstInvalid) {
      setStatus("Revise los campos marcados antes de continuar.", "error");
      showCopyButton(false);
      firstInvalid.focus();
      return;
    }

    var data = {};
    Object.keys(fields).forEach(function (key) {
      data[key] = fields[key] ? fields[key].value.trim() : "";
    });

    lastMessage = buildMessage(data);

    if (!phone) {
      setStatus("Su mensaje está listo. El envío por WhatsApp se activará cuando se configure el número de contacto. Mientras tanto, puede copiar el mensaje.", "error");
      showCopyButton(true);
      return;
    }

    var opened = window.open(whatsappUrl(phone, lastMessage), "_blank", "noopener,noreferrer");
    if (opened) {
      setStatus("Mensaje preparado. Revíselo y envíelo desde WhatsApp.", "success");
      showCopyButton(false);
    } else {
      setStatus("No se pudo abrir WhatsApp. Puede copiar el mensaje y enviarlo manualmente.", "error");
      showCopyButton(true);
    }
  });

  if (copyButton) {
    copyButton.addEventListener("click", function () {
      if (!lastMessage) return;

      function done() {
        setStatus("Mensaje copiado al portapapeles.", "success");
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(lastMessage).then(done, fallbackCopy);
      } else {
        fallbackCopy();
      }

      function fallbackCopy() {
        var area = document.createElement("textarea");
        area.value = lastMessage;
        area.setAttribute("readonly", "");
        area.style.position = "fixed";
        area.style.opacity = "0";
        document.body.appendChild(area);
        area.select();
        try {
          document.execCommand("copy");
          done();
        } catch (error) {
          setStatus("No se pudo copiar. Seleccione y copie el mensaje manualmente.", "error");
        }
        document.body.removeChild(area);
      }
    });
  }
})();
