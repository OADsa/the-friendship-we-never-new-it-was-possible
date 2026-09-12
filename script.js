const heartField = document.querySelector('#heart-field');
const celebrateButton = document.querySelector('#celebrate-button');
const toast = document.querySelector('#toast');
const noteText = document.querySelector('#note-text');
const littleLetterPreview = document.querySelector('#little-letter-preview');

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

function updateClock() {
  document.querySelector('#clock').textContent = new Intl.DateTimeFormat('en', {
    hour: 'numeric', minute: '2-digit'
  }).format(new Date());
}

makeFloatingHearts();
updateClock();
window.setInterval(updateClock, 30000);
