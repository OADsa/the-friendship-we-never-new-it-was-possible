const heartField = document.querySelector('#heart-field');
const celebrateButton = document.querySelector('#celebrate-button');
const toast = document.querySelector('#toast');
const noteText = document.querySelector('#note-text');
const littleLetterPreview = document.querySelector('#little-letter-preview');
const messageText = document.querySelector('#message-text');
const messageCounter = document.querySelector('#message-counter');
const previousMessage = document.querySelector('#previous-message');
const randomMessage = document.querySelector('#random-message');
const nextMessage = document.querySelector('#next-message');
const guideOverlay = document.querySelector('#navigation-guide, #guide-overlay');
const guideNext = document.querySelector('#guide-next');
const guideBack = document.querySelector('#guide-back');
const helpButton = document.querySelector('#help-button');
const verificationOverlay = document.querySelector('#verification-overlay');
const verificationWindow = document.querySelector('.verification-window');
const nameCheckStep = document.querySelector('#name-check-step');
const fingerprintStep = document.querySelector('#fingerprint-step');
const senderName = document.querySelector('#sender-name');
const verifyNameButton = document.querySelector('#verify-name-button');
const verificationError = document.querySelector('#verification-error');
const fingerprintButton = document.querySelector('#fingerprint-button');
const fingerprintStatus = document.querySelector('#fingerprint-status');
let currentGuideStep = 0;
let highestWindowZ = 60;
let fingerprintTimer;
let fingerprintComplete = false;

const messages = [
  "Dear Bembun, I’m really glad I met you.",
  "Thank you, Bembun, for always making me smile.",
  "Bembun, you’re someone I genuinely appreciate.",
  "I’m thankful for every conversation with you, Bembun.",
  "Bembun, you make my days a little better.",
  "Thank you for being yourself, Bembun.",
  "I’m happy that I get to know you, Bembun.",
  "Bembun, you’re honestly someone special to me.",
  "Thank you for letting me be part of your life, Bembun.",
  "Bembun, I appreciate you more than I say.",
  "I hope I can make you smile too, Bembun.",
  "Bembun, talking to you is always something I look forward to.",
  "Thank you for listening to me, Bembun.",
  "Bembun, you make even random conversations memorable.",
  "I’m grateful that our paths crossed, Bembun.",
  "Bembun, you deserve all the happiness in the world.",
  "Thank you for reassuring me, Bembun.",
  "Bembun, I’m glad I can be myself around you.",
  "You’re someone I’m happy to have met, Bembun.",
  "Bembun, your presence means a lot to me.",
  "Thank you for every little thing you do, Bembun.",
  "Bembun, I genuinely enjoy talking to you.",
  "I appreciate every moment with you, Bembun.",
  "Bembun, you’re one of my favorite people to talk to.",
  "Thank you for being honest with me, Bembun.",
  "Bembun, I hope you know how appreciated you are.",
  "I’m thankful for the memories we’re making, Bembun.",
  "Bembun, you make me smile without even trying.",
  "Thank you for being part of my life, Bembun.",
  "Bembun, I’ll always appreciate you.",
  "I’m glad I got to know you, Bembun.",
  "Bembun, you’re genuinely worth knowing.",
  "Thank you for all the laughs, Bembun.",
  "Bembun, your happiness matters to me.",
  "I’m grateful for you, Bembun.",
  "Bembun, you make ordinary days feel special.",
  "Thank you for trusting me, Bembun.",
  "Bembun, I’m proud of you for choosing yourself.",
  "I’ll always support you, Bembun.",
  "Bembun, take your time. I’ll respect your pace.",
  "Thank you for every random story, Bembun.",
  "Bembun, you’re honestly adorable.",
  "I hope life treats you kindly, Bembun.",
  "Bembun, I’m happy you’re here.",
  "Thank you for putting up with me, Bembun. :3",
  "Bembun, you’re someone I don’t want to lose.",
  "I appreciate your kindness, Bembun.",
  "Bembun, I’ll always cheer for you.",
  "Thank you for making me feel heard, Bembun.",
  "Bembun, you mean more to me than you know.",
  "I’m grateful for our connection, Bembun.",
  "Bembun, you’re a beautiful part of my life.",
  "Thank you for being patient with me, Bembun.",
  "Bembun, I like getting to know you slowly.",
  "You make conversations feel easy, Bembun.",
  "Bembun, I hope I can be someone you can rely on.",
  "Thank you for every smile you’ve given me.",
  "Bembun, I’ll always respect your feelings.",
  "I’m happy with where we are, Bembun.",
  "Bembun, no pressure, just appreciation.",
  "Thank you for being someone I can talk to.",
  "Bembun, you’re genuinely important to me.",
  "I hope I make your days better too.",
  "Bembun, I’ll always value what we have.",
  "Thank you for the little moments, Bembun.",
  "Bembun, you have such a comforting presence.",
  "I’m glad you’re part of my story.",
  "Bembun, you’re someone I’ll always remember.",
  "Thank you for being you.",
  "Bembun, I appreciate you every day.",
  "I hope you never forget how special you are.",
  "Bembun, you deserve someone who understands you.",
  "Thank you for allowing me to know you better.",
  "Bembun, I’m happy whenever I hear from you.",
  "I’ll always be grateful for you.",
  "Bembun, you’re worth the patience.",
  "Thank you for every conversation we’ve had.",
  "Bembun, I’ll always root for you.",
  "I’m thankful that I met you.",
  "Bembun, you make waiting feel worth it.",
  "Thank you for every little interaction.",
  "Bembun, I hope you always feel appreciated.",
  "I’m grateful for your presence.",
  "Bembun, you’re someone I care about deeply.",
  "Thank you for giving me something to smile about.",
  "Bembun, I appreciate how honest you are.",
  "I’ll always respect your boundaries.",
  "Bembun, I hope we keep making memories.",
  "Thank you for being part of my days.",
  "Bembun, you make life feel a little lighter.",
  "I’m grateful for every “hello.”",
  "Bembun, I’ll always appreciate our connection.",
  "Thank you for letting me stay in your life.",
  "Bembun, you’re someone worth waiting for.",
  "I hope you always feel safe talking to me.",
  "Bembun, I’m happy we’re friends.",
  "Thank you for being someone I trust.",
  "Bembun, I’m grateful for you every day.",
  "I’ll always appreciate you, Bembun. ♡",
  "Dear Bembun, thank you for coming into my life. I’m genuinely grateful I met you. <3"
];

let currentMessageIndex = 0;

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
  highestWindowZ += 1;
  target.style.zIndex = String(highestWindowZ);
}

function closeWindow(button) {
  const target = button.closest('.window');
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

document.querySelectorAll('.window').forEach((windowElement) => {
  windowElement.addEventListener('pointerdown', () => {
    if (windowElement.closest('.guide-overlay')) return;
    highestWindowZ += 1;
    windowElement.style.zIndex = String(highestWindowZ);
  });
});

celebrateButton.addEventListener('click', () => {
  const reminder = messages[Math.floor(Math.random() * messages.length)];
  noteText.textContent = noteMessages[Math.floor(Math.random() * noteMessages.length)];
  burstHearts(celebrateButton);
  showToast(reminder);
});

document.querySelectorAll('.little-letter-file').forEach((file) => {
  file.addEventListener('click', () => {
    littleLetterPreview.textContent = file.dataset.letter;
  });
});

function renderMessage() {
  messageCounter.textContent = `MESSAGE ${String(currentMessageIndex + 1).padStart(3, '0')} / ${messages.length}`;
  messageText.replaceChildren();
  messages[currentMessageIndex].split(/(Bembun)/g).forEach((part) => {
    if (part === 'Bembun') {
      const emphasis = document.createElement('strong');
      emphasis.textContent = part;
      messageText.appendChild(emphasis);
    } else {
      messageText.appendChild(document.createTextNode(part));
    }
  });
}

previousMessage.addEventListener('click', () => {
  currentMessageIndex = (currentMessageIndex - 1 + messages.length) % messages.length;
  renderMessage();
});

nextMessage.addEventListener('click', () => {
  currentMessageIndex = (currentMessageIndex + 1) % messages.length;
  renderMessage();
});

randomMessage.addEventListener('click', () => {
  let nextIndex = currentMessageIndex;
  while (nextIndex === currentMessageIndex) nextIndex = Math.floor(Math.random() * messages.length);
  currentMessageIndex = nextIndex;
  renderMessage();
  burstHearts(randomMessage);
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

function checkSenderName() {
  const answer = senderName.value.trim().toLowerCase().replace(/\s+/g, '');
  const acceptedNames = ['kris', 'krissy', 'dekdek'];

  if (!acceptedNames.includes(answer)) {
    verificationError.textContent = 'Hmm… that’s not quite it. Try a name or nickname ♡';
    verificationWindow.classList.remove('is-shaking');
    void verificationWindow.offsetWidth;
    verificationWindow.classList.add('is-shaking');
    senderName.focus();
    return;
  }

  verificationError.textContent = '';
  nameCheckStep.classList.add('is-hidden');
  fingerprintStep.classList.remove('is-hidden');
  window.setTimeout(() => fingerprintButton.focus(), 80);
}

function finishFingerprint() {
  fingerprintComplete = true;
  window.clearTimeout(fingerprintTimer);
  fingerprintButton.classList.remove('is-holding');
  fingerprintButton.classList.add('is-complete');
  fingerprintStatus.textContent = 'verified! welcome in ♡';
  sessionStorage.setItem('friendship_sender_verified', 'yes');
  burstHearts(fingerprintButton);

  window.setTimeout(() => verificationOverlay.classList.add('is-unlocking'), 350);
  window.setTimeout(() => {
    verificationOverlay.classList.add('is-hidden');
    verificationOverlay.classList.remove('is-unlocking');
    if (!guideOverlay.classList.contains('is-hidden')) guideNext.focus();
    else document.querySelector('[data-open="long-message-window"]')?.focus();
  }, 1000);
}

function startFingerprintHold(event) {
  if (fingerprintComplete || fingerprintButton.classList.contains('is-holding')) return;
  event?.preventDefault();
  fingerprintButton.classList.add('is-holding');
  fingerprintStatus.textContent = 'keep holding… ♡';
  fingerprintTimer = window.setTimeout(finishFingerprint, 1500);
}

function cancelFingerprintHold() {
  if (fingerprintComplete || !fingerprintButton.classList.contains('is-holding')) return;
  window.clearTimeout(fingerprintTimer);
  fingerprintButton.classList.remove('is-holding');
  fingerprintStatus.textContent = 'almost—hold it a little longer ♡';
}

verifyNameButton.addEventListener('click', checkSenderName);
senderName.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') checkSenderName();
});
fingerprintButton.addEventListener('pointerdown', startFingerprintHold);
document.addEventListener('pointerup', cancelFingerprintHold);
document.addEventListener('pointercancel', cancelFingerprintHold);
fingerprintButton.addEventListener('keydown', (event) => {
  if ((event.key === ' ' || event.key === 'Enter') && !event.repeat) startFingerprintHold(event);
});
fingerprintButton.addEventListener('keyup', (event) => {
  if (event.key === ' ' || event.key === 'Enter') cancelFingerprintHold();
});

if (sessionStorage.getItem('friendship_sender_verified') === 'yes') {
  verificationOverlay.classList.add('is-hidden');
} else {
  window.setTimeout(() => senderName.focus(), 100);
}

function updateClock() {
  document.querySelector('#clock').textContent = new Intl.DateTimeFormat('en', {
    hour: 'numeric', minute: '2-digit'
  }).format(new Date());
}

makeFloatingHearts();
renderMessage();
updateClock();
window.setInterval(updateClock, 30000);
