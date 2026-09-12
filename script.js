const heartField = document.querySelector('#heart-field');
const celebrateButton = document.querySelector('#celebrate-button');
const toast = document.querySelector('#toast');
const noteText = document.querySelector('#note-text');
const littleLetterPreview = document.querySelector('#little-letter-preview');
const guideOverlay = document.querySelector('#navigation-guide, #guide-overlay');
const guideNext = document.querySelector('#guide-next');
const guideBack = document.querySelector('#guide-back');
const helpButton = document.querySelector('#help-button');
let currentGuideStep = 0;

const reminders = [
  'You are one of my favorite plot twists. ♡',
  'Life is better with you in the group chat.',
  'No distance can uninstall this friendship.',
  'You make being understood feel easy.',
  'In every timeline, I hope we find each other.'
];

const noteMessages = [
  'You make ordinary days feel like something worth saving.',
  'Thank you for knowing the real me—and staying anyway.',
  'Some people feel like sunshine. You feel like home.',
  'Our friendship is proof that the best things can arrive unexpectedly.'
];

function makeFloatingHearts() {
  const colors = ['#ffeff6', '#ffb1cf', '#f45a9b', '#d83d82', '#ffffff'];
  const amount = window.innerWidth < 600 ? 11 : 18;

  for (let index = 0; index < amount; index += 1) {
    const heart = document.createElement('span');
    heart.className = 'balloon-heart';
    heart.style.left = `${Math.random() * 96}%`;
    heart.style.setProperty('--size', `${20 + Math.random() * 38}px`);
    heart.style.setProperty('--opacity', `${0.28 + Math.random() * 0.48}`);
    heart.style.setProperty('--duration', `${13 + Math.random() * 14}s`);
    heart.style.setProperty('--delay', `${Math.random() * -24}s`);
    heart.style.setProperty('--tilt', `${-13 + Math.random() * 26}deg`);
    heart.style.setProperty('--color', colors[Math.floor(Math.random() * colors.length)]);
    heartField.appendChild(heart);
  }
}

function burstHearts(origin) {
  const box = origin.getBoundingClientRect();
  const colors = ['#fff', '#ffb5d1', '#ec438c', '#b7296d'];

  for (let index = 0; index < 18; index += 1) {
    const heart = document.createElement('span');
    heart.className = 'burst-heart';
    heart.textContent = '♥';
    heart.style.setProperty('--x', `${box.left + box.width / 2}px`);
    heart.style.setProperty('--y', `${box.top + box.height / 2}px`);
    heart.style.setProperty('--dx', `${-145 + Math.random() * 290}px`);
    heart.style.setProperty('--dy', `${-70 - Math.random() * 190}px`);
    heart.style.setProperty('--spin', `${-120 + Math.random() * 240}deg`);
    heart.style.setProperty('--burst-size', `${10 + Math.random() * 17}px`);
    heart.style.setProperty('--burst-color', colors[Math.floor(Math.random() * colors.length)]);
    document.body.appendChild(heart);
    window.setTimeout(() => heart.remove(), 1200);
  }
}

function showWindow(id) {
  const target = document.getElementById(id);
  if (!target) return;
  target.classList.remove('is-hidden');
  target.classList.remove('is-minimized');
  target.style.zIndex = String(40 + Math.floor(Math.random() * 20));
}

function closeWindow(button) {
  const target = button.closest('.mini-window');
  target?.classList.add('is-hidden');
}

function showToast(message) {
  toast.textContent = `♥ ${message}`;
  toast.classList.add('is-visible');
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove('is-visible'), 3100);
}

document.querySelectorAll('[data-open]').forEach((button) => {
  button.addEventListener('click', () => showWindow(button.dataset.open));
});

document.querySelectorAll('.close-window').forEach((button) => {
  button.addEventListener('click', () => closeWindow(button));
});

document.querySelectorAll('[data-window-action]').forEach((button) => {
  button.addEventListener('click', () => {
    const targetWindow = button.closest('.window');
    if (!targetWindow) return;

    if (button.dataset.windowAction === 'close') {
      targetWindow.classList.add('is-hidden');
    }

    if (button.dataset.windowAction === 'minimize') {
      targetWindow.classList.toggle('is-minimized');
      button.setAttribute('aria-label', targetWindow.classList.contains('is-minimized') ? 'Restore window' : 'Minimize window');
    }

    if (button.dataset.windowAction === 'maximize') {
      targetWindow.classList.toggle('is-maximized');
      button.textContent = targetWindow.classList.contains('is-maximized') ? '❐' : '□';
      button.setAttribute('aria-label', targetWindow.classList.contains('is-maximized') ? 'Restore friendship window' : 'Maximize friendship window');
    }
  });
});

celebrateButton.addEventListener('click', () => {
  const reminder = reminders[Math.floor(Math.random() * reminders.length)];
  noteText.textContent = noteMessages[Math.floor(Math.random() * noteMessages.length)];
  burstHearts(celebrateButton);
  showToast(reminder);
});

document.querySelectorAll('.little-letter-file').forEach((file) => {
  file.addEventListener('click', () => {
    littleLetterPreview.textContent = file.dataset.letter;
  });
});

function renderGuideStep() {
  document.querySelectorAll('.guide-step').forEach((step, index) => {
    step.classList.toggle('is-active', index === currentGuideStep);
  });
  document.querySelectorAll('.guide-dots span').forEach((dot, index) => {
    dot.classList.toggle('is-active', index === currentGuideStep);
  });
  guideBack.classList.toggle('is-hidden', currentGuideStep === 0);
  guideNext.textContent = currentGuideStep === 1 ? 'enter site ♡' : 'next →';
}

function openGuide() {
  currentGuideStep = 0;
  renderGuideStep();
  guideOverlay.classList.remove('is-hidden');
  window.setTimeout(() => guideNext.focus(), 50);
}

function finishGuide() {
  guideOverlay.classList.add('is-hidden');
  sessionStorage.setItem('friendship_navigation_seen', 'yes');
  document.querySelector('[data-open="little-letters-window"]')?.focus();
}

guideNext.addEventListener('click', () => {
  if (currentGuideStep === 1) {
    finishGuide();
    return;
  }
  currentGuideStep += 1;
  renderGuideStep();
});

guideBack.addEventListener('click', () => {
  currentGuideStep = Math.max(0, currentGuideStep - 1);
  renderGuideStep();
});

helpButton.addEventListener('click', openGuide);

if (sessionStorage.getItem('friendship_navigation_seen') === 'yes') {
  guideOverlay.classList.add('is-hidden');
} else {
  openGuide();
}

function updateClock() {
  document.querySelector('#clock').textContent = new Intl.DateTimeFormat('en', {
    hour: 'numeric', minute: '2-digit'
  }).format(new Date());
}

makeFloatingHearts();
updateClock();
window.setInterval(updateClock, 30000);
