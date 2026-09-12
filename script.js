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
const verificationMood = document.querySelector('#verification-mood');
const angerSegments = [...document.querySelectorAll('.anger-meter i')];
const fingerprintButton = document.querySelector('#fingerprint-button');
const fingerprintStatus = document.querySelector('#fingerprint-status');
const totoroWalker = document.querySelector('.totoro-walker');
const calciferCamp = document.querySelector('.calcifer-camp');
const mysteryScreen = document.querySelector('#mystery-screen');
const caseStatus = document.querySelector('#case-status');
const caseProgressSegments = [...document.querySelectorAll('#case-progress span')];
const mysteryVoiceAudio = document.querySelector('#case-voice-audio');
const mysteryVoiceToggle = document.querySelector('#case-voice-toggle');
const mysteryVoiceLabel = document.querySelector('#case-voice-label');
const mysteryVoiceProgress = document.querySelector('#case-voice-progress');
const mysteryVoiceTime = document.querySelector('#case-voice-time');
let currentGuideStep = 0;
let highestWindowZ = 60;
let fingerprintTimer;
let fingerprintComplete = false;
let wrongNameAttempts = 0;
let charactersStunned = false;
let collisionCooldownUntil = 0;
let mysteryStage = 0;
let currentEvidence = '';
let currentWitness = '';
const evidenceSeen = new Set();
const witnessesSeen = new Set();

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

const littleLetters = {
  forYou: `Dear Bembun,

This one is simply for you.

I don't really need a special reason to write this. I just wanted to leave something here that you can read whenever you want to remind yourself that someone genuinely appreciates you.

Meeting you wasn't something I expected, but I'm really grateful that it happened. Somewhere along the way, you became someone I started caring about and someone whose presence became important to me.

I appreciate your personality, your little habits, the random things you tell me, and even the moments when we don't really have anything important to talk about. I appreciate the person you are and the person you're becoming.

I hope you never feel like you have to change yourself just to be enough for someone. You deserve to be appreciated for who you genuinely are.

So whenever you open this, just remember that somewhere out there is a person who's rooting for you, hoping you're doing okay, and genuinely happy that you exist.

This letter is just for you, Bembun.

No expectations. No pressure.

Just appreciation.

— Dekdek <3`,
  beYourself: `Dear Bembun,

I hope you always remember that you don't have to become someone else just to be loved, accepted, or appreciated.

You don't have to pretend to be okay when you're not. You don't have to hide the parts of yourself that you think aren't perfect. And you definitely don't have to compare yourself to everyone around you.

You're still figuring yourself out, and that's okay.

You have so much time to grow, learn, make mistakes, change your mind, discover new things, and become whoever you want to be.

Don't rush yourself.

Don't let other people's expectations decide who you're supposed to become.

Be weird. Be quiet. Be loud. Be emotional. Be excited. Be confused. Be everything that makes you you.

And if there are days when you don't like yourself very much, please remember that one bad day doesn't change your worth.

You are still you.

And that's already someone worth knowing.

So keep discovering yourself, Bembun. Keep learning about yourself. Keep trying new things. Keep becoming the person you want to be.

I'll always appreciate the real you more than some version of you that you think everyone else wants.

Just be yourself, Bembun. That's enough.

— Dekdek ♡`,
  openWhenSad: `Dear Bembun,

If you're reading this because you're sad, then first of all, I'm sorry you're having a difficult day.

I wish I could take whatever is hurting you and make it disappear, but I know I can't always do that.

So instead, I want to remind you of something.

You don't have to be okay right now.

It's okay to cry. It's okay to feel tired. It's okay to feel lost. It's okay to have a day where you don't feel like doing anything.

You don't have to force yourself to smile just because other people expect you to.

Take your time.

Breathe.

Drink some water.

Rest.

Whatever happened today doesn't define your entire life. One bad moment doesn't mean everything is bad. One failure doesn't mean you're a failure. And one person leaving doesn't mean you're unlovable.

Sometimes life just gets heavy.

But heavy doesn't mean impossible.

You've already made it through every difficult day you've had before this one. Even the days you thought you couldn't survive, somehow you made it through them.

You'll make it through this one too.

And if you need someone, you can always talk to me. You don't have to make your problems sound pretty or explain everything perfectly.

You can simply say:

“Dekdek, I'm not okay.”

And I'll understand.

So please, Bembun, be gentle with yourself today.

You don't need to solve everything tonight.

Just get through today.

Tomorrow can worry about tomorrow.

You'll be okay. Maybe not immediately, maybe not perfectly, but eventually.

And until then, remember that you're cared for.

— Dekdek <3`,
  justBecause: `Dear Bembun,

There isn't really a reason for this letter.

I just wanted to write one.

Not because you're sad.

Not because something happened.

Not because I need anything from you.

Just because.

Just because sometimes people deserve to be reminded that they're appreciated even when nothing is wrong.

So here I am, reminding you.

I appreciate you.

I appreciate your existence, your presence, your random messages, your stories, your jokes, and all the little moments we've shared.

I appreciate the way you are slowly letting me know more about you.

I appreciate the fact that you're trying to understand yourself and become a better version of yourself.

And I appreciate that even though life can get complicated, you're still trying.

I don't know what the future holds for either of us, and I don't want to force it to become something before its time.

For now, I'm just happy that you're here.

I'm happy I met you.

I'm happy I got to know you.

And I'm happy that I have someone like you to appreciate.

So if you ever randomly open this file and wonder why I wrote it...

There's your answer.

Just because you're Bembun.

And sometimes that's reason enough.

— Dekdek ♡`
};

const mysteryEvidence = [
  { id: 'ash', image: 'assets/characters/calcifer.webp', name: 'Warm golden ash', detail: '<strong>Found:</strong> beside the empty heart-shaped case. It is still warm—but it smells more like toast than crime.' },
  { id: 'scale', image: 'assets/characters/ponyo-fish.webp', name: 'A red fish scale', detail: '<strong>Found:</strong> in a tiny puddle. Someone swam through here carrying something wrapped in pink.' },
  { id: 'acorn', image: 'assets/characters/totoro.webp', name: 'One polished acorn', detail: '<strong>Found:</strong> beneath a trail of very large, very soft footprints. Gray fur was caught on the corner.' },
  { id: 'shadow', image: 'assets/characters/no-face.webp', name: 'A silent shadow', detail: '<strong>Found:</strong> peeking from behind the window. It left no footprints—only a folded note that says “not stolen.”' }
];

const mysteryWitnesses = [
  { id: 'totoro', image: 'assets/characters/totoro.webp', name: 'Totoro', role: 'Delivery suspect', statement: '<strong>Totoro:</strong> “I heard a tiny heartbeat inside the pink letter. I only carried it safely to the desktop.”' },
  { id: 'ponyo', image: 'assets/characters/ponyo.webp', name: 'Ponyo', role: 'Water-route suspect', statement: '<strong>Ponyo:</strong> “I swam the package across the pink sea. It was already glowing when I found it!”' },
  { id: 'calcifer', image: 'assets/characters/calcifer.webp', name: 'Calcifer', role: 'Seal-breaking suspect', statement: '<strong>Calcifer:</strong> “Fine! I warmed the wax seal—but I never took the thing inside.”' },
  { id: 'noface', image: 'assets/characters/no-face.webp', name: 'No-Face', role: 'Peeping witness', statement: '<strong>No-Face:</strong> “…” He points at all four suspects, then holds up a note: <strong>EVERYONE HELPED.</strong>' }
];

const mysteryStageVoices = [
  { src: 'assets/audio/case-intro.m4a', label: 'CASE BRIEFING' },
  { src: 'assets/audio/evidence-search.m4a', label: 'EVIDENCE SEARCH' },
  null,
  { src: 'assets/audio/who-is-lying.m4a', label: 'WHO IS LYING?' },
  { src: 'assets/audio/missing-letter.m4a', label: 'THE MISSING LETTER' },
  { src: 'assets/audio/missing-heart.m4a', label: 'FINAL DEDUCTION' },
  { src: 'assets/audio/case-closed.m4a', label: 'CASE CLOSED' }
];

const mysteryWitnessVoices = {
  totoro: { src: 'assets/audio/totoro.m4a', label: 'TOTORO’S STATEMENT' },
  ponyo: { src: 'assets/audio/ponyo.m4a', label: 'PONYO’S STATEMENT' },
  calcifer: { src: 'assets/audio/calcifer.m4a', label: 'CALCIFER’S STATEMENT' },
  noface: { src: 'assets/audio/no-face.m4a', label: 'NO-FACE’S STATEMENT' }
};

const classifiedVoice = {
  src: 'assets/audio/classified.m4a',
  label: 'CLASSIFIED FILE'
};

function formatVoiceTime(seconds) {
  if (!Number.isFinite(seconds)) return '0:00';
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
}

function setMysteryVoice(voice, autoplay = false) {
  if (!voice) return;
  mysteryVoiceAudio.pause();
  mysteryVoiceAudio.src = voice.src;
  mysteryVoiceAudio.load();
  mysteryVoiceLabel.textContent = voice.label;
  mysteryVoiceProgress.style.width = '0%';
  mysteryVoiceTime.textContent = '0:00';
  mysteryVoiceToggle.textContent = 'PLAY';
  mysteryVoiceToggle.setAttribute('aria-label', `Play ${voice.label.toLowerCase()} voice-over`);

  if (autoplay) {
    mysteryVoiceAudio.play().catch(() => {
      mysteryVoiceLabel.textContent = `${voice.label} — TAP PLAY`;
    });
  }
}

function playMysteryStageVoice(autoplay = true) {
  const voice = mysteryStageVoices[mysteryStage];
  if (voice) {
    setMysteryVoice(voice, autoplay);
    return;
  }
  if (mysteryStage === 2 && currentWitness) {
    setMysteryVoice(mysteryWitnessVoices[currentWitness], autoplay);
    return;
  }

  mysteryVoiceAudio.pause();
  mysteryVoiceAudio.removeAttribute('src');
  mysteryVoiceAudio.load();
  mysteryVoiceLabel.textContent = 'SELECT A CHARACTER';
  mysteryVoiceProgress.style.width = '0%';
  mysteryVoiceTime.textContent = '0:00';
}

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
  button.addEventListener('click', () => {
    showWindow(button.dataset.open);
    if (button.dataset.open === 'mystery-window') playMysteryStageVoice(true);
  });
});

document.querySelectorAll('.close-window').forEach((button) => {
  button.addEventListener('click', () => {
    if (button.closest('#mystery-window')) mysteryVoiceAudio.pause();
    closeWindow(button);
  });
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
      if (targetWindow.id === 'mystery-window' && targetWindow.classList.contains('is-minimized')) mysteryVoiceAudio.pause();
    }

    if (button.dataset.windowAction === 'maximize') {
      targetWindow.classList.toggle('is-maximized');
      button.textContent = targetWindow.classList.contains('is-maximized') ? '❐' : '□';
      button.setAttribute('aria-label', targetWindow.classList.contains('is-maximized') ? 'Restore friendship window' : 'Maximize friendship window');
    }
  });
});

mysteryVoiceToggle.addEventListener('click', () => {
  if (!mysteryVoiceAudio.getAttribute('src')) {
    playMysteryStageVoice(false);
    if (!mysteryVoiceAudio.getAttribute('src')) return;
  }

  if (mysteryVoiceAudio.paused) {
    mysteryVoiceAudio.play().catch(() => {
      mysteryVoiceLabel.textContent = 'TAP PLAY AGAIN';
    });
  } else {
    mysteryVoiceAudio.pause();
  }
});

mysteryVoiceAudio.addEventListener('play', () => {
  mysteryVoiceToggle.textContent = 'PAUSE';
  mysteryVoiceToggle.classList.add('is-playing');
  mysteryVoiceToggle.setAttribute('aria-label', 'Pause voice-over');
});

mysteryVoiceAudio.addEventListener('pause', () => {
  mysteryVoiceToggle.textContent = 'PLAY';
  mysteryVoiceToggle.classList.remove('is-playing');
  mysteryVoiceToggle.setAttribute('aria-label', 'Play voice-over');
});

mysteryVoiceAudio.addEventListener('timeupdate', () => {
  const progress = mysteryVoiceAudio.duration ? (mysteryVoiceAudio.currentTime / mysteryVoiceAudio.duration) * 100 : 0;
  mysteryVoiceProgress.style.width = `${progress}%`;
  mysteryVoiceTime.textContent = formatVoiceTime(mysteryVoiceAudio.currentTime);
});

mysteryVoiceAudio.addEventListener('ended', () => {
  mysteryVoiceAudio.currentTime = 0;
  mysteryVoiceProgress.style.width = '0%';
  mysteryVoiceTime.textContent = '0:00';
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
    littleLetterPreview.textContent = littleLetters[file.dataset.letterKey] || file.dataset.letter;
    littleLetterPreview.scrollTop = 0;
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

function updateCaseHud() {
  const statusLabels = ['UNOPENED', 'EVIDENCE SEARCH', 'WITNESS INTERVIEWS', 'LOGIC CHECK', 'DECODE CLUE', 'FINAL DEDUCTION', 'CASE CLOSED'];
  const completed = [0, 1, 2, 3, 4, 5, 5][mysteryStage];
  caseStatus.textContent = statusLabels[mysteryStage];
  caseProgressSegments.forEach((segment, index) => segment.classList.toggle('is-complete', index < completed));
}

function renderMysteryGame() {
  updateCaseHud();

  if (mysteryStage === 0) {
    mysteryScreen.innerHTML = `
      <article class="case-panel">
        <p class="case-kicker">CONFIDENTIAL • CASE #1147</p>
        <h2 class="case-heading">The Case of the Missing Heart</h2>
        <p class="case-copy">Detective Bembun, something important disappeared from <strong>friendship.exe</strong> at exactly 11:47 PM.</p>
        <div class="case-brief">
          <p><strong>Missing item:</strong> [REDACTED]</p>
          <p><strong>Last known location:</strong> inside a sealed pink letter</p>
          <p><strong>Suspects:</strong> Totoro, Ponyo, Calcifer, and No-Face</p>
          <p><strong>Warning:</strong> one final answer may change the entire case.</p>
        </div>
        <div class="case-cast" aria-label="The four characters in the case">
          ${mysteryWitnesses.map((person) => `<img src="${person.image}" alt="${person.name}" title="${person.name}" />`).join('')}
        </div>
        <button class="pixel-button primary-button case-action" type="button" data-game-action="start">begin investigation</button>
      </article>`;
  }

  if (mysteryStage === 1) {
    const cards = mysteryEvidence.map((item) => `
      <button class="evidence-card ${evidenceSeen.has(item.id) ? 'is-seen' : ''}" type="button" data-evidence="${item.id}">
        <img class="case-card-image" src="${item.image}" alt="" /><strong>${item.name}</strong><small>${evidenceSeen.has(item.id) ? 'EXAMINED' : 'TAP TO EXAMINE'}</small>
      </button>`).join('');
    const selected = mysteryEvidence.find((item) => item.id === currentEvidence);
    mysteryScreen.innerHTML = `
      <article class="case-panel">
        <p class="case-kicker">STEP 1 • CRIME SCENE</p>
        <h2 class="case-heading">Examine the evidence</h2>
        <p class="case-copy">Tap every item. Tiny details matter in tiny mysteries.</p>
        <div class="evidence-grid">${cards}</div>
        <div class="evidence-detail">${selected ? selected.detail : 'Select an item to inspect it.'}</div>
        <div class="case-footer"><p class="case-hint">Evidence found: ${evidenceSeen.size} / 4</p><button class="pixel-button primary-button" type="button" data-game-action="continue" ${evidenceSeen.size < 4 ? 'disabled' : ''}>question suspects →</button></div>
      </article>`;
  }

  if (mysteryStage === 2) {
    const cards = mysteryWitnesses.map((person) => `
      <button class="suspect-card ${witnessesSeen.has(person.id) ? 'is-seen' : ''}" type="button" data-witness="${person.id}">
        <img class="case-card-image" src="${person.image}" alt="" /><strong>${person.name}</strong><small>${person.role}</small>
      </button>`).join('');
    const selected = mysteryWitnesses.find((person) => person.id === currentWitness);
    mysteryScreen.innerHTML = `
      <article class="case-panel">
        <p class="case-kicker">STEP 2 • INTERROGATION</p>
        <h2 class="case-heading">Question every suspect</h2>
        <p class="case-copy">One is shy, one is fiery, one is fishy, and one says almost nothing.</p>
        <div class="suspect-grid">${cards}</div>
        <div class="witness-detail">${selected ? selected.statement : 'Choose a character to hear their statement.'}</div>
        <div class="case-footer"><p class="case-hint">Statements taken: ${witnessesSeen.size} / 4</p><button class="pixel-button primary-button" type="button" data-game-action="continue" ${witnessesSeen.size < 4 ? 'disabled' : ''}>compare stories →</button></div>
      </article>`;
  }

  if (mysteryStage === 3) {
    mysteryScreen.innerHTML = `
      <article class="case-panel">
        <p class="case-kicker">STEP 3 • CONTRADICTION</p>
        <h2 class="case-heading">Who is lying?</h2>
        <p class="case-copy">Totoro carried the letter. Ponyo crossed the water. Calcifer warmed the seal. No-Face watched them all. The physical evidence supports every statement.</p>
        <div class="deduction-list">
          <button class="deduction-option" type="button" data-game-answer="totoro">A — Totoro</button>
          <button class="deduction-option" type="button" data-game-answer="calcifer">B — Calcifer</button>
          <button class="deduction-option" type="button" data-game-answer="noface">C — No-Face</button>
          <button class="deduction-option" type="button" data-game-answer="none" data-correct="true">D — None of them</button>
        </div>
        <p class="case-feedback" id="case-feedback">Choose carefully, Detective.</p>
      </article>`;
  }

  if (mysteryStage === 4) {
    mysteryScreen.innerHTML = `
      <article class="case-panel">
        <p class="case-kicker">STEP 4 • RECOVERED CODE</p>
        <h2 class="case-heading">Complete the name</h2>
        <p class="case-copy">No-Face unfolds the final note. One letter has been washed away.</p>
        <div class="decoded-name">_ E M B U N</div>
        <div class="deduction-list">
          <button class="deduction-option" type="button" data-game-answer="D">D</button>
          <button class="deduction-option" type="button" data-game-answer="B" data-correct="true">B</button>
          <button class="deduction-option" type="button" data-game-answer="K">K</button>
        </div>
        <p class="case-feedback" id="case-feedback">Which letter completes the recipient’s name?</p>
      </article>`;
  }

  if (mysteryStage === 5) {
    mysteryScreen.innerHTML = `
      <article class="case-panel">
        <p class="case-kicker">STEP 5 • FINAL DEDUCTION</p>
        <h2 class="case-heading">Who has the missing heart?</h2>
        <p class="case-copy">Every clue points to one person. This is your final accusation.</p>
        <div class="deduction-list">
          <button class="deduction-option" type="button" data-game-answer="Totoro">Totoro — the delivery suspect</button>
          <button class="deduction-option" type="button" data-game-answer="Dekdek">Dekdek — the supposed victim</button>
          <button class="deduction-option" type="button" data-game-answer="Bembun" data-correct="true">Bembun — the recipient</button>
        </div>
        <p class="case-feedback" id="case-feedback">The answer has been nearby from the beginning.</p>
      </article>`;
  }

  if (mysteryStage === 6) {
    mysteryScreen.innerHTML = `
      <article class="case-panel final-case">
        <p class="case-kicker">FINAL REPORT • DECLASSIFIED</p>
        <div class="case-stamp">CASE CLOSED</div>
        <div class="final-heart">D + B</div>
        <h2 class="case-heading">There was no theft.</h2>
        <p class="case-copy"><strong>Missing item:</strong> Dekdek’s heart</p>
        <p class="case-copy"><strong>Current location:</strong> Safe with Bembun</p>
        <p class="case-copy">Totoro delivered it. Ponyo carried it across the water. Calcifer warmed the seal. No-Face made sure it arrived.</p>
        <div class="case-cast final-cast" aria-label="The case team">
          ${mysteryWitnesses.map((person) => `<img src="${person.image}" alt="${person.name}" title="${person.name}" />`).join('')}
        </div>
        <p class="case-copy"><strong>Dekdek gave it willingly—and he doesn’t want it back. ♡</strong></p>
        <div class="button-row" style="justify-content:center">
          <button class="pixel-button" type="button" data-game-action="classified">open classified.txt</button>
          <button class="pixel-button primary-button" type="button" data-game-action="replay">replay case</button>
        </div>
        <div class="case-brief is-hidden" id="classified-note">
          <p><strong>CLASSIFIED:</strong> There was never a crime. This whole mystery was just an excuse to lead you here and say: I really like you, Bembun. That’s the whole case. :3</p>
        </div>
      </article>`;
  }
}

mysteryScreen.addEventListener('click', (event) => {
  const evidenceButton = event.target.closest('[data-evidence]');
  const witnessButton = event.target.closest('[data-witness]');
  const answerButton = event.target.closest('[data-game-answer]');
  const actionButton = event.target.closest('[data-game-action]');

  if (evidenceButton) {
    currentEvidence = evidenceButton.dataset.evidence;
    evidenceSeen.add(currentEvidence);
    renderMysteryGame();
    return;
  }

  if (witnessButton) {
    currentWitness = witnessButton.dataset.witness;
    witnessesSeen.add(currentWitness);
    renderMysteryGame();
    setMysteryVoice(mysteryWitnessVoices[currentWitness], true);
    return;
  }

  if (answerButton) {
    const feedback = document.querySelector('#case-feedback');
    if (answerButton.dataset.correct === 'true') {
      answerButton.classList.add('is-correct');
      feedback.textContent = 'Correct. Updating the case file…';
      window.setTimeout(() => {
        mysteryStage += 1;
        renderMysteryGame();
        playMysteryStageVoice(true);
      }, 650);
    } else {
      answerButton.classList.add('is-wrong');
      feedback.textContent = mysteryStage === 5 ? 'That person helped—but the heart belongs somewhere else.' : 'That clue doesn’t fit. Look at the evidence again.';
    }
    return;
  }

  if (!actionButton) return;
  if (actionButton.dataset.gameAction === 'start' || actionButton.dataset.gameAction === 'continue') {
    mysteryStage += 1;
    renderMysteryGame();
    playMysteryStageVoice(true);
  }
  if (actionButton.dataset.gameAction === 'classified') {
    document.querySelector('#classified-note').classList.remove('is-hidden');
    setMysteryVoice(classifiedVoice, true);
    burstHearts(actionButton);
  }
  if (actionButton.dataset.gameAction === 'replay') {
    mysteryStage = 0;
    currentEvidence = '';
    currentWitness = '';
    evidenceSeen.clear();
    witnessesSeen.clear();
    renderMysteryGame();
    playMysteryStageVoice(true);
  }
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
    wrongNameAttempts = Math.min(wrongNameAttempts + 1, 4);
    const wrongMessages = [
      'Nope… try a name or nickname ♡',
      'Hey! Are you sure you know the sender? >:(',
      'The little computer is getting suspicious…',
      'ACCESS DENIED! Think harder!!'
    ];
    const moods = ['mood: slightly annoyed :/', 'mood: getting grumpy >:(', 'mood: VERY MAD!!', 'mood: FURIOUS!!!'];
    const buttonLabels = ['try again', 'try harder >:(', 'last chance!!', 'ACCESS DENIED'];

    verificationOverlay.dataset.anger = String(wrongNameAttempts);
    verificationError.textContent = wrongMessages[wrongNameAttempts - 1];
    verificationMood.textContent = moods[wrongNameAttempts - 1];
    verifyNameButton.textContent = buttonLabels[wrongNameAttempts - 1];
    angerSegments.forEach((segment, index) => segment.classList.toggle('is-filled', index < wrongNameAttempts));
    verificationWindow.classList.remove('is-shaking');
    void verificationWindow.offsetWidth;
    verificationWindow.classList.add('is-shaking');
    senderName.focus();
    return;
  }

  verificationOverlay.removeAttribute('data-anger');
  verificationError.textContent = '';
  verificationMood.textContent = 'mood: happy again ♡';
  angerSegments.forEach((segment) => segment.classList.remove('is-filled'));
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

function stunCharacters() {
  charactersStunned = true;
  collisionCooldownUntil = performance.now() + 3200;
  totoroWalker.classList.add('is-stunned');
  calciferCamp.classList.add('is-stunned');

  window.setTimeout(() => {
    totoroWalker.classList.remove('is-stunned');
    calciferCamp.classList.remove('is-stunned');
    charactersStunned = false;
  }, 1050);
}

function watchCharacterCollision(time) {
  if (!charactersStunned && time > collisionCooldownUntil) {
    const totoroBox = totoroWalker.getBoundingClientRect();
    const calciferBox = calciferCamp ? calciferCamp.getBoundingClientRect() : null;
    const overlapping = calciferBox
      && totoroBox.left + 12 < calciferBox.right
      && totoroBox.right - 12 > calciferBox.left
      && totoroBox.top + 8 < calciferBox.bottom
      && totoroBox.bottom - 8 > calciferBox.top;

    if (overlapping) stunCharacters();
  }

  window.requestAnimationFrame(watchCharacterCollision);
}

function updateClock() {
  document.querySelector('#clock').textContent = new Intl.DateTimeFormat('en', {
    hour: 'numeric', minute: '2-digit'
  }).format(new Date());
}

makeFloatingHearts();
renderMessage();
renderMysteryGame();
updateClock();
window.requestAnimationFrame(watchCharacterCollision);
window.setInterval(updateClock, 30000);
