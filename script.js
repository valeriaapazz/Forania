// ============================================================
// forania — prototipo navegable (datos 100% ficticios y locales)
// ============================================================

const state = {
  currentScreen: 1,
  history: [1],
  goal: 'practica', // 'practica' | 'confianza'
  verified: false,
  altIndex: 0,
};

// ---------- alternativas ficticias para "prefiero otra sugerencia" ----------
const MATCHES = [
  {
    name: 'Camila, 21',
    region: 'Cajamarca',
    career: 'Psicología',
    cycle: '6.º ciclo',
    university: 'UPC',
    avatar: '👩🏽',
    role: '🌱 Madrina foránea · perfil de ejemplo',
    day: 'jueves',
    time: '6:00 p. m.',
    place: 'Cocina común de la residencia, San Miguel.',
    planTitle: 'Cocinar algo de casa',
    priceLabel: 'S/ 12–15',
  },
  {
    name: 'Jorge, 22',
    region: 'Áncash',
    career: 'Ingeniería',
    cycle: '5.º ciclo',
    university: 'PUCP',
    avatar: '🧑🏽',
    role: '🌱 Padrino foráneo · perfil de ejemplo',
    day: 'martes',
    time: '7:00 p. m.',
    place: 'Biblioteca del campus, sala de estudio grupal.',
    planTitle: 'Estudiar juntos un rato',
    priceLabel: 'S/ 0–5',
  },
];

// ---------- helpers ----------
const $ = (id) => document.getElementById(id);
const screens = Array.from(document.querySelectorAll('.screen'));

function getFormData() {
  return {
    name: $('f-name').value.trim() || 'Lucía',
    region: $('f-region').value,
    career: $('f-career').value,
    cycle: $('f-cycle').value,
    university: $('f-university').value,
    email: $('f-email').value,
    days: Array.from(document.querySelectorAll('#days-chips .chip.is-active')).map(c => c.dataset.day),
    timeslot: $('f-timeslot').value,
    zone: $('f-zone').value,
    budget: Array.from(document.querySelectorAll('#budget-chips .chip.is-active')).map(c => c.dataset.budget)[0] || 'S/10–20',
    support: (document.querySelector('input[name="support"]:checked') || {}).value || 'Ambos',
    weekend: $('f-weekend').value,
  };
}

// ---------- navegación entre pantallas ----------
function goToScreen(n, { isBack = false, skipHistory = false } = {}) {
  const target = screens.find(s => Number(s.dataset.screen) === n);
  if (!target) return;

  screens.forEach(s => {
    s.classList.remove('is-active', 'is-leaving-back');
  });

  if (isBack) target.classList.add('is-leaving-back');
  target.classList.add('is-active');

  // reset scroll position
  const scrollArea = target.querySelector('.screen-scroll');
  if (scrollArea) scrollArea.scrollTop = 0;

  state.currentScreen = n;
  if (!skipHistory) {
    if (isBack) state.history.pop();
    else state.history.push(n);
  }

  // acciones al entrar a una pantalla específica
  if (n === 4) runProcessingScreen();
  if (n === 5) renderResultScreen();
  if (n === 6) renderReviewScreen();
}

document.querySelectorAll('[data-next]').forEach(btn => {
  btn.addEventListener('click', () => {
    const next = Number(btn.dataset.next);
    goToScreen(next);
  });
});

document.querySelectorAll('[data-back]').forEach(btn => {
  btn.addEventListener('click', () => {
    if (state.history.length <= 1) return;
    const prev = state.history[state.history.length - 2];
    goToScreen(prev, { isBack: true });
  });
});

// ---------- pantalla 2: chips de días ----------
document.querySelectorAll('#days-chips .chip').forEach(chip => {
  chip.addEventListener('click', () => chip.classList.toggle('is-active'));
});

// ---------- pantalla 2: chips de presupuesto (selección única) ----------
document.querySelectorAll('#budget-chips .chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('#budget-chips .chip').forEach(c => c.classList.remove('is-active'));
    chip.classList.add('is-active');
  });
});

// ---------- pantalla 2: verificación de correo (simulada) ----------
$('verify-btn').addEventListener('click', () => {
  const btn = $('verify-btn');
  const status = $('verify-status');
  if (state.verified) return;
  btn.disabled = true;
  btn.textContent = 'Enviando…';
  setTimeout(() => {
    state.verified = true;
    btn.textContent = '✓ Correo enviado';
    status.textContent = 'Correo de verificación enviado (simulado). Revisa tu bandeja.';
    status.classList.add('is-verified');
  }, 850);
});

// ---------- pantalla 3: selección de objetivo ----------
const goalCards = document.querySelectorAll('.goal-card');
const goalCta = $('goal-cta');
const goalFootnote = $('goal-footnote');

goalCards.forEach(card => {
  card.addEventListener('click', () => {
    goalCards.forEach(c => c.classList.remove('is-selected'));
    card.classList.add('is-selected');
    state.goal = card.dataset.goal;
    updateGoalCta();
  });
});

function updateGoalCta() {
  if (state.goal === 'practica') {
    goalCta.innerHTML = 'Buscar compañía <span class="arrow">→</span>';
    goalFootnote.textContent = 'Después podrás explorar un círculo.';
  } else {
    goalCta.innerHTML = 'Buscar círculo <span class="arrow">→</span>';
    goalFootnote.textContent = 'Después podrás explorar compañía práctica.';
  }
}

// ---------- pantalla 4: animación de procesamiento ----------
function runProcessingScreen() {
  const data = getFormData();
  $('scan-detail').textContent = `${data.region} · ${data.zone}`;
  $('scan-detail-2').textContent = `${data.days.join(' y ') || 'Por definir'}, ${data.timeslot} · ${data.budget}`;

  // reinicia la animación del anillo/semilla cada vez que se entra
  const ring = document.querySelector('.ring-fill');
  const seed = document.querySelector('.grow-seed');
  [ring, seed].forEach(el => {
    el.style.animation = 'none';
    void el.offsetWidth; // reflow para reiniciar
    el.style.animation = '';
  });

  clearTimeout(state._procTimer);
  state._procTimer = setTimeout(() => {
    if (state.currentScreen === 4) goToScreen(5);
  }, 2400);
}

// ---------- pantalla 5: resultado dinámico ----------
function buildMessage(data, match) {
  return `Hola, ${match.name.split(',')[0]} :) Soy ${data.name}, también de ${data.region} y estudio ${data.career} en ${data.university}. Vi que estamos por ${data.zone} y libres los ${data.days.join(' y ') || match.day}. ¿Te anima a ${match.planTitle.toLowerCase()} el ${match.day} a las ${match.time}? Mi presupuesto es de ${data.budget}. Podemos conocernos primero en un espacio compartido. ¡Sin presión!`;
}

function renderResultScreen() {
  const data = getFormData();
  const match = MATCHES[state.altIndex % MATCHES.length];

  $('result-lead').textContent = `${data.name}, podrían empezar con algo rico, sencillo y dentro de tu presupuesto.`;
  $('match-name').textContent = match.name;
  $('match-meta').textContent = `${match.region} · ${data.zone}`;
  $('match-career').textContent = `${match.career} · ${match.cycle} · ${match.university}`;
  document.querySelector('#screen-5 .match-avatar').textContent = match.avatar;
  document.querySelector('#screen-5 .match-tag').textContent = match.role;

  $('match-reason').textContent = `También es de ${match.region} y se mueve por ${data.zone}. Coinciden el ${match.day} a las ${match.time} y buscan planes de ${data.budget}. Además, conoce tu carrera.`;

  $('plan-title').textContent = match.planTitle;
  $('plan-detail').textContent = `${match.day.charAt(0).toUpperCase() + match.day.slice(1)} · ${match.time}`;
  $('plan-place').textContent = match.place;
  $('plan-price-num').textContent = match.priceLabel;
  $('plan-note').textContent = `Estimado; puede variar. Acuerden el gasto antes. Dentro de tu rango de ${data.budget}.`;

  $('message-draft').value = buildMessage(data, match);
}

$('alt-suggestion-btn').addEventListener('click', () => {
  state.altIndex += 1;
  renderResultScreen();
});

// ---------- pantalla 6: revisión final y envío ----------
function renderReviewScreen() {
  const data = getFormData();
  const match = MATCHES[state.altIndex % MATCHES.length];
  $('review-sub').textContent = `Este es tu mensaje, ${data.name}. Léelo una vez más, sin apuro.`;
  $('review-to-name').textContent = `${match.name.split(',')[0]} · Paisanos`;
  $('message-final').textContent = $('message-draft').value;
  document.querySelector('#review-state .match-avatar').textContent = match.avatar;
  document.querySelector('.message-to-meta').textContent = match.role.replace('🌱 ', '');
  const firstName = match.name.split(',')[0];
  $('review-body-1').textContent = `Si decides enviarlo, ${firstName} podrá responder cuando pueda. No hace falta quedarte pendiente del celular.`;
  $('sent-note').textContent = `En una versión real, ${firstName} recibiría tu mensaje y podría responder cuando pueda — nunca de forma inmediata ni obligatoria.`;

  // vuelve al estado "por enviar" cada vez que se entra de nuevo a revisar
  $('review-state').hidden = false;
  $('sent-state').hidden = true;
  $('send-btn').hidden = false;
  $('send-btn').disabled = false;
  $('send-btn-label').textContent = 'Enviar mensaje';
  $('send-btn-icon').textContent = '➤';
  $('send-footnote').hidden = false;
  $('restart-btn').hidden = true;
}

$('send-btn').addEventListener('click', () => {
  const btn = $('send-btn');
  if (btn.dataset.sent === 'true') return;
  btn.disabled = true;
  $('send-btn-label').textContent = 'Enviando…';
  $('send-btn-icon').textContent = '…';

  setTimeout(() => {
    $('review-state').hidden = true;
    $('sent-state').hidden = false;
    btn.hidden = true;
    btn.dataset.sent = 'true';
    $('send-footnote').hidden = true;
    $('restart-btn').hidden = false;
  }, 900);
});

$('restart-btn').addEventListener('click', () => {
  state.altIndex = 0;
  state.goal = 'practica';
  state.history = [1];
  $('send-btn').dataset.sent = 'false';
  goalCards.forEach(c => c.classList.remove('is-selected'));
  document.querySelector('.goal-card[data-goal="practica"]').classList.add('is-selected');
  updateGoalCta();
  goToScreen(1, { skipHistory: true });
});

// ---------- estado inicial ----------
updateGoalCta();
goToScreen(1, { skipHistory: true });
