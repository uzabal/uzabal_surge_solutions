const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav-links');

menuButton?.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menu.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

const tabs = [...document.querySelectorAll('[role="tab"]')];
const panels = [...document.querySelectorAll('[role="tabpanel"]')];

function activateTab(tab) {
  tabs.forEach(item => {
    const selected = item === tab;
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
  });
  panels.forEach(panel => {
    panel.hidden = panel.id !== tab.getAttribute('aria-controls');
  });
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateTab(tab));
  tab.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = index;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = tabs.length - 1;
    activateTab(tabs[nextIndex]);
    tabs[nextIndex].focus();
  });
});

const recommendations = {
  entrada: {
    type: 'TIPO 1',
    lpz: 'LPZ0B / LPZ1',
    stage: 'Protección primaria',
    product: 'Serie G20-A',
    text: 'Para el origen de la instalación y tableros principales expuestos a corrientes parciales de rayo.'
  },
  secundario: {
    type: 'TIPO 2',
    lpz: 'LPZ1 / LPZ2',
    stage: 'Protección secundaria',
    product: 'Serie G20-C40',
    text: 'Para tableros principales o secundarios, frente a sobretensiones inducidas y de maniobra.'
  },
  final: {
    type: 'TIPO 3',
    lpz: 'LPZ2 / LPZ3',
    stage: 'Protección terciaria',
    product: 'Serie G2040-D10',
    text: 'Para tableros finales y proximidad de equipos sensibles, como última etapa coordinada.'
  }
};

const selectorButtons = [...document.querySelectorAll('.selector-option')];
selectorButtons.forEach(button => button.addEventListener('click', () => {
  selectorButtons.forEach(item => item.classList.toggle('active', item === button));
  const rec = recommendations[button.dataset.choice];
  document.querySelector('#rec-type').textContent = rec.type;
  document.querySelector('#rec-lpz').textContent = rec.lpz;
  document.querySelector('#rec-stage').textContent = rec.stage;
  document.querySelector('#rec-product').textContent = rec.product;
  document.querySelector('#rec-text').textContent = rec.text;
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

const form = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');
form?.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  formStatus.hidden = false;
  formStatus.textContent = 'Consulta preparada correctamente. Este formulario es una demostración y todavía no envía información.';
  formStatus.focus?.();
});
