const clawWindow = document.querySelector('#claw-machine-window');
const clawCabinet = document.querySelector('#claw-cabinet');
const clawRig = document.querySelector('#claw-rig');
const clawCapsules = document.querySelector('#claw-capsules');
const clawStatus = document.querySelector('#claw-status');
const clawBookGrid = document.querySelector('#claw-book-grid');
const clawBookCount = document.querySelector('#claw-book-count');
const clawLetterModal = document.querySelector('#claw-letter-modal');
const clawLetterTitle = document.querySelector('#claw-letter-title');
const clawLetterDate = document.querySelector('#claw-letter-date');
const clawLetterCopy = document.querySelector('#claw-letter-copy');
const clawLetterClose = document.querySelector('#claw-letter-close');
const clawStorageKey = 'bembun_claw_letters_v1';

const clawRarities = {
  common: { label: 'COMMON', color: '#ef8fb8', rank: 1 },
  uncommon: { label: 'UNCOMMON', color: '#72d594', rank: 2 },
  rare: { label: 'RARE', color: '#55a9ee', rank: 3 },
  epic: { label: 'EPIC', color: '#ad6bec', rank: 4 },
  legendary: { label: 'LEGENDARY', color: '#f3b83f', rank: 5 },
  secret: { label: 'SECRET', color: '#ee5f67', rank: 6 }
};

const storyCapsuleLetters = [
  { id: 'story-0918', date: 'SEPTEMBER 18–19', title: 'The bouquet that started it', rarity: 'rare', body: `You fell asleep on me the night before, so I made you a little website with your favorite flowers—tulips and sunflowers. It started as my playful way of asking you to make bawi, but it became something I genuinely wanted you to keep. Even our small tampuhan that morning became part of the story, because we chose to understand each other afterward.` },
  { id: 'story-0919', date: 'SEPTEMBER 19', title: 'When you admitted it', rarity: 'legendary', body: `You told me that something began to change when I said I wanted to pursue you. You let me see your fears, your attachment, your family worries, and the parts of yourself you thought might be too much. Then you said you wanted my attention to be yours. I remember that confession because it was honest, possessive in the cutest way, and completely you.` },
  { id: 'story-0926', date: 'SEPTEMBER 26', title: 'The first time beside you', rarity: 'epic', body: `The first time we met, I expected awkwardness. Instead, we melted into each other like we had already known how to be close for a long time. We hugged, I kissed your cheek, and ordinary little moments became memories I still replay. Seeing you in person made everything suddenly real.` },
  { id: 'story-0927', date: 'SEPTEMBER 27', title: 'Another day, another memory', rarity: 'rare', body: `I met your friends and went with you to Cycy’s debut. The day was full of new faces, secret smiles, and the kind of memories only the two of us fully understand. I went home already wanting another day with you.` },
  { id: 'story-0928', date: 'SEPTEMBER 28', title: 'The night I came to you', rarity: 'epic', body: `You felt lonely that night, and I missed you too. That was enough reason for me to go. Even the random picture pretending I was some stranger became part of the fun. I loved that I could turn missing you into actually being beside you.` },
  { id: 'story-0930', date: 'SEPTEMBER 30', title: 'One month of us', rarity: 'legendary', body: `One month after we started talking, we found our own hidden little place. We both know what happened inside that tent, but what I keep most is the feeling: in such a short time, you had already become someone I wanted to celebrate, remember, and keep choosing.` },
  { id: 'story-1003', date: 'OCTOBER 3', title: 'The chapter you let me begin', rarity: 'secret', body: `This was the day you told me I could finally court you. I carried that answer carefully because it was not simply a yes—it was your trust. You also gave me a goodbye gift that I will treasure forever. That day became the page where hoping turned into something I was finally allowed to pursue.` },
  { id: 'story-1004', date: 'OCTOBER 4', title: 'Your surprise while I was travelling', rarity: 'legendary', body: `I was on the road when you sent me your Canva presentation. You even asked whether I could open it while I was travelling—HAHAHAHA, ang cute mo roon. It was the first time someone made something like that for me. You made me understand how it feels to be on the receiving end of effort, and I felt seen, remembered, and ridiculously kilig.` }
];

const capsuleVisualPalette = ['#ef6f9f', '#66baf0', '#ffd15f', '#78d59b', '#ac80e7', '#ff8b62', '#69d4d0', '#f4a2cf', '#9ab7ff', '#d8ed72'];
const visibleCapsuleLimit = 48;

let clawLetters = [];
let clawCollected = new Set();
let clawX = 50;
let clawBusy = false;
let clawMachineOrder = [];
let clawLayout = [];
let clawBookFilter = 'all';

function rarityForLetter(number) {
  if (number === 100) return 'secret';
  if ([46, 48, 51, 52, 54, 85, 99].includes(number)) return 'legendary';
  if ([38, 47, 50, 53, 56, 86].includes(number) || number % 13 === 0) return 'epic';
  if (number % 7 === 0) return 'rare';
  if (number % 3 === 0) return 'uncommon';
  return 'common';
}

function parseSuppliedLetters(text) {
  return [...text.matchAll(/^###\s+(\d+)\s*\n+([\s\S]*?)(?=^###\s+\d+|\s*$)/gm)].map((match) => {
    const number = Number(match[1]);
    return {
      id: `letter-${String(number).padStart(3, '0')}`,
      date: `LITTLE LETTER ${String(number).padStart(3, '0')}`,
      title: number === 100 ? 'A hundred still would not be enough' : `Little Letter #${String(number).padStart(3, '0')}`,
      rarity: rarityForLetter(number),
      body: match[2].trim()
    };
  });
}

function loadCollectedLetters() {
  try {
    const saved = JSON.parse(localStorage.getItem(clawStorageKey) || '[]');
    clawCollected = new Set(Array.isArray(saved) ? saved : []);
  } catch {
    clawCollected = new Set();
  }
}

function saveCollectedLetters() {
  localStorage.setItem(clawStorageKey, JSON.stringify([...clawCollected]));
}

function buildMachineOrder() {
  clawMachineOrder = clawLetters
    .map((letter, index) => ({ id: letter.id, key: (index * 47 + 19) % clawLetters.length }))
    .sort((a, b) => a.key - b.key)
    .map((item) => item.id);
}

function visibleClawLetters() {
  return clawMachineOrder
    .filter((id) => !clawCollected.has(id))
    .slice(0, visibleCapsuleLimit)
    .map((id) => clawLetters.find((letter) => letter.id === id));
}

function capsuleColor(id) {
  let hash = 0;
  for (const character of id) hash = ((hash * 31) + character.charCodeAt(0)) >>> 0;
  return capsuleVisualPalette[hash % capsuleVisualPalette.length];
}

function refreshClawLayout() {
  const visible = visibleClawLetters();
  const positions = [];
  let row = 0;
  while (positions.length < visible.length) {
    const columns = row % 2 === 0 ? 10 : 9;
    const start = row % 2 === 0 ? 5.5 : 10.5;
    const step = 89 / (columns - 1);
    for (let column = 0; column < columns && positions.length < visible.length; column += 1) {
      positions.push({
        x: Math.max(4, Math.min(96, start + column * step + (Math.random() * 3.2 - 1.6))),
        bottom: row * 34 + Math.random() * 6,
        tilt: Math.round(-15 + Math.random() * 30),
        delay: Math.random() * .35
      });
    }
    row += 1;
  }

  for (let index = positions.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [positions[index], positions[swapIndex]] = [positions[swapIndex], positions[index]];
  }
  clawLayout = visible.map((letter, index) => ({ letter, ...positions[index] }));
}

function nearestVisibleCapsule() {
  let nearest = null;
  clawLayout.forEach((item) => {
    const distance = Math.abs(item.x - clawX);
    if (!nearest || distance < nearest.distance) nearest = { ...item, distance };
  });
  return nearest;
}

function renderClawCapsules() {
  clawCapsules.innerHTML = clawLayout.map((item) => {
    return `<span class="claw-capsule" data-claw-letter="${item.letter.id}" title="Mystery capsule" style="--capsule-x:${item.x}%;--capsule-bottom:${item.bottom}px;--capsule-tilt:${item.tilt}deg;--capsule-color:${capsuleColor(item.letter.id)};--fall-delay:${item.delay}s"></span>`;
  }).join('');

  if (!clawLayout.length) {
    clawStatus.textContent = 'You caught every capsule. The whole archive is now inside your letter book.';
    clawStatus.classList.add('is-win');
  }
}

function renderClawBook() {
  clawBookCount.textContent = `${clawCollected.size}/${clawLetters.length}`;
  const filteredLetters = clawBookFilter === 'all' ? clawLetters : clawLetters.filter((letter) => letter.rarity === clawBookFilter);
  clawBookGrid.innerHTML = filteredLetters.map((letter) => {
    const index = clawLetters.findIndex((item) => item.id === letter.id);
    const unlocked = clawCollected.has(letter.id);
    const rarity = clawRarities[letter.rarity];
    return `<button class="claw-book-card rarity-${letter.rarity}${unlocked ? '' : ' is-locked'}${letter.rarity === 'secret' ? ' is-special' : ''}" type="button" data-book-letter="${letter.id}" ${unlocked ? '' : 'disabled'}>
      <span class="book-capsule" style="--book-color:${capsuleColor(letter.id)}"></span>
      <strong>${unlocked ? letter.title : 'LOCKED'}</strong>
      <small>${unlocked ? `${rarity.label} • ${letter.date}` : `${String(index + 1).padStart(3, '0')} • ???`}</small>
    </button>`;
  }).join('');
}

function setClawPosition(nextX) {
  if (clawBusy) return;
  clawX = Math.max(5, Math.min(95, nextX));
  clawRig.style.setProperty('--claw-x', `${clawX}%`);
}

function setClawControlsDisabled(disabled) {
  document.querySelectorAll('[data-claw-control]').forEach((button) => { button.disabled = disabled; });
}

function burstClawConfetti(rarityName) {
  const rarity = clawRarities[rarityName];
  const amount = 10 + rarity.rank * 4;
  const palette = [rarity.color, '#fff1a8', '#ffffff', '#f184bb', '#83d5ff'];
  for (let index = 0; index < amount; index += 1) {
    const piece = document.createElement('i');
    piece.className = 'claw-confetti';
    piece.style.setProperty('--confetti-color', palette[index % palette.length]);
    piece.style.setProperty('--confetti-x', `${-230 + Math.random() * 460}px`);
    piece.style.setProperty('--confetti-y', `${90 + Math.random() * 190}px`);
    piece.style.setProperty('--confetti-spin', `${-360 + Math.random() * 720}deg`);
    piece.style.setProperty('--confetti-delay', `${Math.random() * .18}s`);
    clawCabinet.appendChild(piece);
    window.setTimeout(() => piece.remove(), 1500);
  }
}

function dropClaw() {
  if (clawBusy || !clawLetters.length) return;
  const target = nearestVisibleCapsule();
  const catchIsPossible = Boolean(target && target.distance <= 3.25);
  let caughtLetter = null;
  clawBusy = true;
  setClawControlsDisabled(true);
  clawCabinet.classList.add('is-dropping');
  clawStatus.className = 'claw-status';
  clawStatus.textContent = 'The claw is going down…';

  window.setTimeout(() => {
    clawCabinet.classList.add('is-grabbing');
    if (!target || target.distance > 3.25) {
      clawStatus.textContent = 'The claw closed on empty space. It must be directly above a capsule.';
      return;
    }

    const capsule = clawCapsules.querySelector(`[data-claw-letter="${target.letter.id}"]`);
    capsule?.classList.add('is-held');
    caughtLetter = target.letter;
    clawCollected.add(target.letter.id);
    saveCollectedLetters();
    const rarity = clawRarities[target.letter.rarity];
    clawStatus.textContent = `${rarity.label} CAPSULE CAUGHT — “${target.letter.title}” was saved to the letter book!`;
    clawStatus.classList.add('is-win', `rarity-${target.letter.rarity}`);
    burstClawConfetti(target.letter.rarity);
  }, 760);

  window.setTimeout(() => {
    if (caughtLetter) {
      const capsule = clawCapsules.querySelector(`[data-claw-letter="${caughtLetter.id}"]`);
      const playfield = clawCabinet.querySelector('.claw-playfield').getBoundingClientRect();
      const travelX = ((90 - target.x) / 100) * playfield.width;
      capsule?.style.setProperty('--prize-x', `${travelX}px`);
      capsule?.style.setProperty('--prize-y', `${target.bottom + 67}px`);
      capsule?.classList.add('is-lifting');
      clawCabinet.classList.remove('is-dropping');
    } else {
      clawCabinet.classList.remove('is-dropping', 'is-grabbing');
    }
  }, 1050);

  window.setTimeout(() => {
    if (!caughtLetter) return;
    clawRig.style.setProperty('--claw-x', '90%');
    clawCapsules.querySelector(`[data-claw-letter="${caughtLetter.id}"]`)?.classList.add('is-to-prize');
  }, 1800);

  window.setTimeout(() => {
    if (!caughtLetter) return;
    clawCapsules.querySelector(`[data-claw-letter="${caughtLetter.id}"]`)?.classList.add('is-prize-drop');
    clawCabinet.classList.remove('is-grabbing');
  }, 2450);

  window.setTimeout(() => {
    clawCabinet.classList.remove('is-dropping', 'is-grabbing');
    clawX = 50;
    clawRig.style.setProperty('--claw-x', '50%');
    clawBusy = false;
    setClawControlsDisabled(false);
    if (caughtLetter) {
      refreshClawLayout();
      renderClawCapsules();
      renderClawBook();
      openCollectedLetter(caughtLetter.id);
    }
  }, catchIsPossible ? 3150 : 1650);
}

function switchClawView(view) {
  document.querySelectorAll('[data-claw-view]').forEach((button) => {
    const active = button.dataset.clawView === view;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-selected', String(active));
  });
  document.querySelectorAll('[data-claw-panel]').forEach((panel) => panel.classList.toggle('is-active', panel.dataset.clawPanel === view));
}

function openCollectedLetter(id) {
  if (!clawCollected.has(id)) return;
  const letter = clawLetters.find((item) => item.id === id);
  if (!letter) return;
  const rarity = clawRarities[letter.rarity];
  clawLetterDate.textContent = `${rarity.label} CAPSULE • ${letter.date}`;
  clawLetterTitle.textContent = letter.title;
  clawLetterCopy.textContent = letter.body;
  clawLetterModal.classList.remove('is-hidden');
  clawLetterClose.focus();
}

document.querySelectorAll('[data-claw-control]').forEach((button) => {
  button.addEventListener('click', () => {
    if (button.dataset.clawControl === 'left') setClawPosition(clawX - 6);
    if (button.dataset.clawControl === 'right') setClawPosition(clawX + 6);
    if (button.dataset.clawControl === 'down') dropClaw();
  });
});

document.querySelectorAll('[data-claw-view]').forEach((button) => button.addEventListener('click', () => switchClawView(button.dataset.clawView)));
document.querySelectorAll('[data-book-filter]').forEach((button) => {
  button.addEventListener('click', () => {
    clawBookFilter = button.dataset.bookFilter;
    document.querySelectorAll('[data-book-filter]').forEach((filterButton) => {
      const active = filterButton === button;
      filterButton.classList.toggle('is-active', active);
      filterButton.setAttribute('aria-selected', String(active));
    });
    renderClawBook();
  });
});
clawBookGrid.addEventListener('click', (event) => openCollectedLetter(event.target.closest('[data-book-letter]')?.dataset.bookLetter));
clawLetterClose.addEventListener('click', () => clawLetterModal.classList.add('is-hidden'));
clawLetterModal.addEventListener('click', (event) => { if (event.target === clawLetterModal) clawLetterModal.classList.add('is-hidden'); });

document.addEventListener('keydown', (event) => {
  if (clawWindow.classList.contains('is-hidden') || !document.querySelector('[data-claw-panel="game"]').classList.contains('is-active')) return;
  if (event.key === 'ArrowLeft') { event.preventDefault(); setClawPosition(clawX - 6); }
  if (event.key === 'ArrowRight') { event.preventDefault(); setClawPosition(clawX + 6); }
  if (event.key === 'ArrowDown') { event.preventDefault(); dropClaw(); }
  if (event.key === 'Escape') clawLetterModal.classList.add('is-hidden');
});

async function initializeClawMachine() {
  try {
    const response = await fetch('assets/claw-letters.txt');
    if (!response.ok) throw new Error('letters unavailable');
    clawLetters = [...parseSuppliedLetters(await response.text()), ...storyCapsuleLetters];
    loadCollectedLetters();
    buildMachineOrder();
    refreshClawLayout();
    setClawPosition(50);
    renderClawCapsules();
    renderClawBook();
  } catch {
    clawStatus.textContent = 'The capsule letters are still being loaded. Please reopen the app in a moment.';
  }
}

initializeClawMachine();
