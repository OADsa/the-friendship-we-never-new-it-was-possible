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
const mysteryWindow = document.querySelector('#mystery-window');
const mysteryTitle = document.querySelector('#mystery-title');
const caseStatus = document.querySelector('#case-status');
const caseProgress = document.querySelector('#case-progress');
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
let activeMysteryCase = 1;
let case2Stage = 0;
let case2ProloguePage = 0;
let currentEvidence = '';
let currentWitness = '';
let currentValhallaSuspect = '';
const evidenceSeen = new Set();
const witnessesSeen = new Set();
const valhallaSuspectsSeen = new Set();

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

const valhallaSuspects = [
  { id: 'loki', mark: 'L', name: 'Loki', role: 'God of Mischief', statement: '“Dekdek? Invented name. Invented boy. A detective chasing a bedtime story.” He smiles before Bembun mentions any name.' },
  { id: 'jack', mark: 'J', name: 'Jack', role: 'The Ripper', statement: '“The boy carries a color he cannot see himself—blue, threaded with gold. Hope hidden underneath fear.”' },
  { id: 'sasaki', mark: 'S', name: 'Sasaki Kojiro', role: 'History’s Loser', statement: '“His memories are not gone naturally. The gaps are too clean, like pages cut from a book.”' },
  { id: 'poseidon', mark: 'P', name: 'Poseidon', role: 'Lord of the Seas', statement: '“The western archive has remained sealed since 11:30. There are no old records worth discussing.”' },
  { id: 'shiva', mark: 'S', name: 'Shiva', role: 'Destroyer', statement: '“I saw the kid once, before the erasure. Quiet. Still watching the door as though someone might return.”' },
  { id: 'buddha', mark: 'B', name: 'Buddha', role: 'The Enlightened', statement: '“You will find him. The interesting question is what he will find when you do.”' },
  { id: 'zeus', mark: 'Z', name: 'Zeus', role: 'Chairman of Valhalla', statement: '“This investigation is forbidden. Close the case, Detective. Some absences protect the future.”' },
  { id: 'odin', mark: 'O', name: 'Odin', role: 'The All-Father', statement: '“There is no boy without a story.” His ravens repeat one word: “Forgotten.”' }
];

const valhallaSuspectVoices = {
  loki: { src: 'assets/audio/valhalla-loki.m4a', label: 'LOKI’S STATEMENT' },
  jack: { src: 'assets/audio/valhalla-jack.m4a', label: 'JACK’S STATEMENT' },
  sasaki: { src: 'assets/audio/valhalla-sasaki.m4a', label: 'SASAKI’S STATEMENT' },
  poseidon: { src: 'assets/audio/valhalla-poseidon.m4a', label: 'POSEIDON’S STATEMENT' },
  shiva: { src: 'assets/audio/valhalla-shiva.m4a', label: 'SHIVA’S STATEMENT' },
  buddha: { src: 'assets/audio/valhalla-buddha.m4a', label: 'BUDDHA’S STATEMENT' },
  zeus: { src: 'assets/audio/valhalla-zeus.m4a', label: 'ZEUS’S STATEMENT' },
  odin: { src: 'assets/audio/valhalla-odin.m4a', label: 'ODIN’S STATEMENT' }
};

const valhallaPrologueVoices = [
  { src: 'assets/audio/valhalla-prologue-1.m4a', label: 'SOMEONE WAS MISSING FROM ETERNITY' },
  { src: 'assets/audio/valhalla-prologue-2.m4a', label: 'THE ARCHIVE BELL' },
  { src: 'assets/audio/valhalla-prologue-3.m4a', label: 'THE SURVIVING FRAGMENT' },
  { src: 'assets/audio/valhalla-prologue-4.m4a', label: 'THE SUMMONS' }
];

const valhallaStageVoices = {
  1: { src: 'assets/audio/valhalla-eight-suspects.m4a', label: 'EIGHT SUSPECTS' },
  2: { src: 'assets/audio/valhalla-keepers-last-verse.m4a', label: 'THE KEEPER’S LAST VERSE' },
  3: { src: 'assets/audio/valhalla-shifted-name.m4a', label: 'THE SHIFTED NAME' },
  4: { src: 'assets/audio/valhalla-numbered-door.m4a', label: 'THE NUMBERED DOOR' },
  5: { src: 'assets/audio/valhalla-impossible-alibi.m4a', label: 'THE IMPOSSIBLE ALIBI' },
  6: { src: 'assets/audio/valhalla-missing-piece.m4a', label: 'THE MISSING PIECE' },
  7: { src: 'assets/audio/valhalla-intended-detective.m4a', label: 'THE INTENDED DETECTIVE' },
  8: { src: 'assets/audio/valhalla-raven-order.m4a', label: 'THE RAVEN ORDER' },
  9: { src: 'assets/audio/valhalla-bembun-finds-boy.m4a', label: 'BEMBUN FINDS THE BOY' },
  10: { src: 'assets/audio/valhalla-what-did-dekdek-lose.m4a', label: 'WHAT DID DEKDEK LOSE?' },
  11: { src: 'assets/audio/valhalla-keeper-last-message.m4a', label: 'THE RECORD KEEPER’S LAST MESSAGE' }
};

const valhallaFiles = [
  {
    number: '05', date: 'UNKNOWN', title: 'THE KEEPER’S LAST VERSE', kind: 'ACROSTIC',
    body: ['Find what the fire could not erase.', 'Inside the silence, a trail remains.', 'No god will speak the hidden name.', 'Dust guards the first truth.', 'Do not trust the order of these files.', 'Every beginning matters.', 'Keep only the first mark.', 'Do the same after the divide.', 'Every erased line still leaves a shape.', 'Keep looking.'],
    prompt: 'A hidden instruction survived the fire. What does it say?',
    hint: 'The beginning of each surviving line matters. Separate the message into two words.',
    accepted: ['FIND DEKDEK', 'FINDDEKDEK'], correct: 'FIND DEKDEK',
    success: 'Identity fragment recovered: DEKDEK. No matching citizen exists in Valhalla’s official records.'
  },
  {
    number: '02', date: '3 DAYS BEFORE', title: 'THE SHIFTED NAME', kind: 'CAESAR CIPHER',
    body: ['A strip of paper was hidden beneath the Record Keeper’s desk:', 'GHNGHN', 'Margin note: “The throne stands three steps too far forward.”'],
    prompt: 'Shift every letter three places backward. What name appears?',
    hint: 'Move G back three letters to get D. Do the same to every character.',
    accepted: ['DEKDEK'], correct: 'DEKDEK',
    success: 'The same erased name appears twice. Someone expected the first clue to be destroyed.'
  },
  {
    number: '07', date: '11:47 PM', title: 'THE NUMBERED DOOR', kind: 'NUMBER SEQUENCE',
    body: ['The forgotten archive door has no keyhole.', 'Its dial reads: 4–5–11 / 4–5–11', 'Use A=1, B=2, C=3…'],
    prompt: 'Which name opens the door?',
    hint: 'Turn each number into its matching alphabet letter, then read both groups together.',
    accepted: ['DEKDEK'], correct: 'DEKDEK',
    success: 'The door opens. Behind it: a room deliberately removed from every map of Valhalla.'
  },
  {
    number: '01', date: 'NIGHT OF THE MURDER', title: 'THE IMPOSSIBLE ALIBI', kind: 'TIMELINE',
    body: ['11:41 — Shiva saw the Keeper carrying a ledger west.', '11:44 — Poseidon claims the western archive had been sealed since 11:30.', '11:46 — Sasaki saw fresh wet footprints leaving that archive.', '11:47 — The Record Keeper was killed.'],
    prompt: 'Whose statement cannot coexist with the physical timeline?',
    hint: 'Compare the claimed sealing time with the footprints seen leaving the archive.',
    accepted: ['POSEIDON'], correct: 'POSEIDON',
    success: 'False alibi exposed. Poseidon concealed access to the archive—but the order came from higher authority.'
  },
  {
    number: '06', date: '12 YEARS ERASED', title: 'THE MISSING PIECE', kind: 'EVIDENCE MATCHING',
    body: ['Jack saw blue threaded with gold inside the hidden boy.', 'Sasaki found memories removed with surgical precision.', 'Buddha predicted that one particular detective would find him.', 'Keeper’s note: “The missing piece is not an object.”'],
    prompt: 'What was the Keeper truly investigating?',
    hint: 'The Keeper says the missing piece is not an object. Look for who was removed from history.',
    accepted: ['A DISAPPEARED PERSON', 'DISAPPEARED PERSON', 'A PERSON', 'DEKDEK'], correct: 'A DISAPPEARED PERSON',
    success: 'Case direction corrected: the murder concealed a second crime—the erasure of a living person.'
  },
  {
    number: '03', date: 'DATE REDACTED', title: 'THE INTENDED DETECTIVE', kind: 'FIRST-LETTER MESSAGE',
    body: ['Broken records wait for her.', 'Every false trail will test her.', 'Memory will lead her below.', 'Because she notices who is missing.', 'Under no crown will she stop.', 'Name her, and the final seal breaks.'],
    prompt: 'The first letters identify the person this case was left for. Who?',
    hint: 'The start of every sentence spells the name of the detective.',
    accepted: ['BEMBUN'], correct: 'BEMBUN',
    success: 'The file was addressed to Bembun before the murder happened. The Keeper chose his detective in advance.'
  },
  {
    number: '04', date: 'FUTURE CLASSIFIED', title: 'THE RAVEN ORDER', kind: 'MOTIVE',
    body: ['Recovered order: “Destroy every record. Leave the body alive. Let the story die.”', 'Zeus demanded the case be closed.', 'Odin alone knew the boy’s identity.', 'The Keeper disobeyed and preserved seven fragments.'],
    prompt: 'Who ordered Dekdek erased—and killed the Keeper for resisting?',
    hint: 'Find the one who knew the boy’s identity and whose ravens echo the erased truth.',
    accepted: ['ODIN'], correct: 'ODIN',
    success: 'Murderer identified: Odin. His goal was not death. It was to prevent Dekdek’s future by making him forgotten.'
  }
];

const valhallaPrologue = [
  {
    kicker: 'SEVEN NIGHTS BEFORE THE MURDER',
    title: 'Someone was missing from eternity.',
    visual: '<div class="archive-visual"><span class="shelf left"></span><span class="keeper-figure">R</span><span class="shelf right"></span></div>',
    story: `<p>Valhalla records every god, warrior, victory, defeat, birth, and death. Nothing enters eternity without leaving a story behind.</p>
      <p>One Record Keeper noticed an impossible gap: a space where a life should have been. The pages before it were numbered. The pages after it were numbered. But the person between them had been removed so perfectly that the archive itself pretended he had never existed.</p>
      <p>The Keeper began investigating in secret.</p>`
  },
  {
    kicker: 'THE NIGHT EVERYTHING CHANGED',
    title: 'At 11:47 PM, the archive bell rang once.',
    visual: '<div class="clock-visual"><span>11:47</span><i></i></div>',
    story: `<p>The western archive was found open. A chair lay overturned. Ink crossed the floor like a trail, stopping beneath the Record Keeper’s motionless hand.</p>
      <p>He had been murdered—but the room made no sense. Nothing valuable was taken. The ancient records remained untouched.</p>
      <p>Only one thing had vanished: the final investigation file he had spent seven nights protecting.</p>`
  },
  {
    kicker: 'THE MESSAGE THAT SURVIVED',
    title: 'The murderer missed one fragment.',
    visual: '<div class="redacted-visual"><span>████████</span><span class="visible-line">FIND THE BOY</span><span>██████</span></div>',
    story: `<p>Hidden inside the Keeper’s sleeve was a strip of paper addressed to no one. It contained no photograph and no identity.</p>
      <blockquote class="keeper-message">“IF YOU ARE READING THIS,<br>FIND THE BOY WITHOUT A STORY.”</blockquote>
      <p>Below it, three lines remained: <strong>He remembers nothing. He has nothing left. Someone does not want him found.</strong></p>`
  },
  {
    kicker: 'THE SUMMONS',
    title: 'Then Valhalla called for Bembun.',
    visual: '<div class="summons-visual"><span>B</span><div>DETECTIVE ACCESS<br>GRANTED</div></div>',
    story: `<p>Eight names surrounded the dead Keeper’s final hours: Loki, Jack, Sasaki, Poseidon, Shiva, Buddha, Zeus, and Odin.</p>
      <p>Seven damaged files survived. Their dates were scrambled, their sentences altered, and their truths buried beneath codes.</p>
      <p>Bembun was told she was investigating a murder. She was not told why the Keeper had chosen her—or that somewhere beneath Valhalla, a forgotten person was still waiting to be found.</p>`
  }
];

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
  if (activeMysteryCase === 2) {
    const valhallaVoice = case2Stage === 0
      ? valhallaPrologueVoices[case2ProloguePage]
      : currentValhallaSuspect && case2Stage === 1
        ? valhallaSuspectVoices[currentValhallaSuspect]
        : valhallaStageVoices[case2Stage];
    if (valhallaVoice) {
      setMysteryVoice(valhallaVoice, autoplay);
      return;
    }
  }
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
  const isValhalla = activeMysteryCase === 2;
  const segmentCount = isValhalla ? 7 : 5;
  if (caseProgress.children.length !== segmentCount) {
    caseProgress.replaceChildren(...Array.from({ length: segmentCount }, () => document.createElement('span')));
  }

  if (isValhalla) {
    const status = case2Stage === 0
      ? 'CASE #002 SEALED'
      : case2Stage === 1
        ? 'EIGHT SUSPECTS'
        : case2Stage >= 2 && case2Stage <= 8
          ? `FILE ${case2Stage - 1} / 7`
          : case2Stage === 9
            ? 'PERSON FOUND'
            : case2Stage === 10
              ? 'FINAL RECORD'
              : 'CASE SOLVED';
    const completed = case2Stage >= 9 ? 7 : Math.max(0, case2Stage - 2);
    caseStatus.textContent = status;
    [...caseProgress.children].forEach((segment, index) => segment.classList.toggle('is-complete', index < completed));
    return;
  }

  const statusLabels = ['UNOPENED', 'EVIDENCE SEARCH', 'WITNESS INTERVIEWS', 'LOGIC CHECK', 'DECODE CLUE', 'FINAL DEDUCTION', 'CASE CLOSED'];
  const completed = [0, 1, 2, 3, 4, 5, 5][mysteryStage];
  caseStatus.textContent = statusLabels[mysteryStage];
  [...caseProgress.children].forEach((segment, index) => segment.classList.toggle('is-complete', index < completed));
}

function renderValhallaCase() {
  if (case2Stage === 0) {
    const prologue = valhallaPrologue[case2ProloguePage];
    const dots = valhallaPrologue.map((_, index) => `<span class="${index === case2ProloguePage ? 'is-current' : index < case2ProloguePage ? 'is-seen' : ''}"></span>`).join('');
    mysteryScreen.innerHTML = `
      <article class="case-panel valhalla-panel prologue-panel">
        <div class="prologue-progress" aria-label="Prologue page ${case2ProloguePage + 1} of ${valhallaPrologue.length}">${dots}</div>
        <p class="case-kicker">PROLOGUE ${case2ProloguePage + 1} / ${valhallaPrologue.length} • ${prologue.kicker}</p>
        <h2 class="case-heading">${prologue.title}</h2>
        ${prologue.visual}
        <div class="prologue-story">${prologue.story}</div>
        <div class="button-row">
          ${case2ProloguePage === 0
            ? '<button class="pixel-button" type="button" data-game-action="case1">return to case #001</button>'
            : '<button class="pixel-button" type="button" data-case2-prologue="back">previous</button>'}
          ${case2ProloguePage === valhallaPrologue.length - 1
            ? '<button class="pixel-button primary-button" type="button" data-case2-action="start">accept the case</button>'
            : '<button class="pixel-button primary-button" type="button" data-case2-prologue="next">continue</button>'}
        </div>
      </article>`;
    return;
  }

  if (case2Stage === 1) {
    const cards = valhallaSuspects.map((suspect) => `
      <button class="valhalla-suspect ${valhallaSuspectsSeen.has(suspect.id) ? 'is-seen' : ''}" type="button" data-valhalla-suspect="${suspect.id}">
        <span class="suspect-mark">${suspect.mark}</span><strong>${suspect.name}</strong><small>${suspect.role}</small>
      </button>`).join('');
    const selected = valhallaSuspects.find((suspect) => suspect.id === currentValhallaSuspect);
    mysteryScreen.innerHTML = `
      <article class="case-panel valhalla-panel">
        <p class="case-kicker">PRELIMINARY INQUIRY</p>
        <h2 class="case-heading">Eight gods and warriors. Eight incomplete truths.</h2>
        <p class="case-copy">Question everyone. Their statements will matter again when the files begin to contradict them.</p>
        <div class="valhalla-suspect-grid">${cards}</div>
        <div class="witness-detail valhalla-detail">${selected ? `<strong>${selected.name}:</strong> ${selected.statement}` : 'Select a suspect to inspect their statement.'}</div>
        <div class="case-footer">
          <p class="case-hint">Statements recorded: ${valhallaSuspectsSeen.size} / 8</p>
          <button class="pixel-button primary-button" type="button" data-case2-action="files" ${valhallaSuspectsSeen.size < 8 ? 'disabled' : ''}>unseal the files</button>
        </div>
      </article>`;
    return;
  }

  if (case2Stage >= 2 && case2Stage <= 8) {
    const file = valhallaFiles[case2Stage - 2];
    const solvedFiles = new Set(valhallaFiles.slice(0, case2Stage - 2).map((item) => item.number));
    const order = [...valhallaFiles]
      .sort((first, second) => Number(first.number) - Number(second.number))
      .map((item) => `<span class="${solvedFiles.has(item.number) ? 'is-solved' : item.number === file.number ? 'is-current' : ''}">${item.number}</span>`)
      .join('');
    const body = file.body.map((line) => `<p>${line}</p>`).join('');
    mysteryScreen.innerHTML = `
      <article class="case-panel valhalla-panel">
        <div class="archive-order" aria-label="Recovered file order">${order}</div>
        <p class="case-kicker">FILE ${file.number} • ${file.date} • ${file.kind}</p>
        <h2 class="case-heading">${file.title}</h2>
        <div class="archive-document">${body}</div>
        <p class="case-copy puzzle-prompt"><strong>${file.prompt}</strong></p>
        <form class="valhalla-input-form" id="case2-answer-form" autocomplete="off">
          <label for="case2-answer-input">Type your deduction</label>
          <div class="valhalla-input-row">
            <input id="case2-answer-input" name="deduction" type="text" placeholder="enter your answer..." aria-describedby="case2-feedback" required />
            <button class="pixel-button primary-button" type="submit">submit</button>
          </div>
        </form>
        <button class="valhalla-clue-button" type="button" data-case2-clue aria-expanded="false">need a clue?</button>
        <p class="valhalla-clue" id="case2-clue" hidden>${file.hint}</p>
        <p class="case-feedback" id="case2-feedback" aria-live="polite">The archive is waiting for your deduction.</p>
      </article>`;
    return;
  }

  if (case2Stage === 9) {
    mysteryScreen.innerHTML = `
      <article class="case-panel valhalla-panel found-scene">
        <p class="case-kicker">FORGOTTEN WING • BELOW VALHALLA</p>
        <h2 class="case-heading">Bembun finds the boy without a story.</h2>
        <div class="found-silhouette"><span>D</span></div>
        <p class="dialogue"><strong>Dekdek:</strong> “I don't know why you're looking for me.”</p>
        <p class="dialogue detective"><strong>Bembun:</strong> “Because someone went through a lot of trouble to make sure nobody could.”</p>
        <p class="case-copy">He is alive. His memories arrive in fragments, but every surviving file carries his name. From here, he follows while Bembun remains the detective.</p>
        <button class="pixel-button primary-button case-action" type="button" data-case2-action="final-record">read the keeper’s final record</button>
      </article>`;
    return;
  }

  if (case2Stage === 10) {
    mysteryScreen.innerHTML = `
      <article class="case-panel valhalla-panel">
        <p class="case-kicker">FINAL RECORD • ADDRESSED TO BEMBUN</p>
        <h2 class="case-heading">What did Dekdek lose?</h2>
        <div class="archive-document final-record">
          <p>Not his memory alone.</p><p>Not his identity.</p><p>Not his past.</p>
          <p>He lost the part of himself that believed another person could genuinely stay.</p>
        </div>
        <p class="case-copy puzzle-prompt"><strong>What did Dekdek truly lose?</strong></p>
        <form class="valhalla-input-form" id="case2-answer-form" autocomplete="off">
          <label for="case2-answer-input">Type your final deduction</label>
          <div class="valhalla-input-row">
            <input id="case2-answer-input" name="deduction" type="text" placeholder="enter your answer..." aria-describedby="case2-feedback" required />
            <button class="pixel-button primary-button" type="submit">submit</button>
          </div>
        </form>
        <button class="valhalla-clue-button" type="button" data-case2-clue aria-expanded="false">need a clue?</button>
        <p class="valhalla-clue" id="case2-clue" hidden>It is not physical. Finish this thought: the courage to ___ again.</p>
        <p class="case-feedback" id="case2-feedback" aria-live="polite">The answer is emotional, not physical.</p>
      </article>`;
    return;
  }

  mysteryScreen.innerHTML = `
    <article class="case-panel valhalla-panel valhalla-final">
      <p class="case-kicker">THE RECORD KEEPER’S LAST MESSAGE</p>
      <blockquote class="keeper-message">“Detective Bembun,<br><br>If you reached this page, then you found him.<br><br>I did not ask you to save him. I only asked you to find him.<br><br>What he lost was never truly gone. It was waiting for someone to remind him where it was.”</blockquote>
      <p class="dialogue"><strong>Dekdek:</strong> “So… you really came all this way just to find me?”</p>
      <p class="dialogue detective"><strong>Bembun:</strong> “Obviously. You made yourself ridiculously difficult to find.”</p>
      <p class="dialogue"><strong>Dekdek:</strong> “Maybe I didn't lose it after all.”</p>
      <p class="dialogue detective"><strong>Bembun:</strong> “Lose what?”</p>
      <p class="dialogue"><strong>Dekdek:</strong> “Myself.”</p>
      <div class="valhalla-verdict">
        <h2>VALHALLA CASE #002<br>CASE SOLVED</h2>
        <p><strong>MURDERER:</strong> ODIN</p><p><strong>VICTIM:</strong> THE RECORD KEEPER</p>
        <p><strong>DETECTIVE:</strong> BEMBUN</p><p><strong>PERSON FOUND:</strong> DEKDEK</p>
        <p><strong>MISSING:</strong> UNKNOWN</p><p><strong>STATUS:</strong> FOUND</p>
      </div>
      <p class="valhalla-final-note">“Sometimes you don't find what you were looking for.<br>Sometimes you find the person you were meant to.”</p>
      <div class="button-row">
        <button class="pixel-button" type="button" data-game-action="case1">case #001</button>
        <button class="pixel-button primary-button" type="button" data-case2-action="replay">replay case #002</button>
      </div>
    </article>`;
}

function renderMysteryGame(preserveScroll = false) {
  const previousScroll = mysteryScreen.scrollTop;
  window.queueMicrotask(() => {
    mysteryScreen.scrollTop = preserveScroll ? previousScroll : 0;
  });
  mysteryWindow.classList.toggle('is-valhalla', activeMysteryCase === 2);
  mysteryTitle.textContent = activeMysteryCase === 2
    ? 'mystery.exe — VALHALLA CASE #002'
    : 'mystery.exe — THE MISSING HEART';
  updateCaseHud();

  if (activeMysteryCase === 2) {
    renderValhallaCase();
    return;
  }

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
        <div class="button-row">
          <button class="pixel-button primary-button case-action" type="button" data-game-action="start">begin investigation</button>
          <button class="pixel-button case-action" type="button" data-game-action="case2">open case #002</button>
        </div>
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
          <button class="pixel-button" type="button" data-game-action="case2">begin case #002</button>
          <button class="pixel-button primary-button" type="button" data-game-action="replay">replay case</button>
        </div>
        <div class="case-brief is-hidden" id="classified-note">
          <p><strong>CLASSIFIED:</strong> There was never a crime. This whole mystery was just an excuse to lead you here and say: I really like you, Bembun. That’s the whole case. :3</p>
        </div>
      </article>`;
  }
}

function normalizeValhallaAnswer(value) {
  return value
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

function submitValhallaDeduction(form) {
  const input = form.querySelector('#case2-answer-input');
  const feedback = document.querySelector('#case2-feedback');
  const answer = normalizeValhallaAnswer(input.value);
  const accepted = case2Stage === 10
    ? ['TRUST', 'COURAGE TO TRUST AGAIN', 'THE COURAGE TO TRUST AGAIN']
    : valhallaFiles[case2Stage - 2].accepted.map(normalizeValhallaAnswer);

  form.classList.remove('is-wrong');
  if (!accepted.includes(answer)) {
    form.classList.add('is-wrong');
    feedback.textContent = case2Stage === 10
      ? 'That was damaged too, but it is not the missing piece described by the Keeper.'
      : 'The archive rejects that deduction. Recheck the evidence or open the clue.';
    input.focus();
    input.select();
    return;
  }

  form.classList.add('is-correct');
  input.disabled = true;
  form.querySelector('button[type="submit"]').disabled = true;
  feedback.textContent = case2Stage === 10
    ? 'Correct. She did not fix him. She stayed long enough for him to remember that part was still there.'
    : valhallaFiles[case2Stage - 2].success;
  window.setTimeout(() => {
    case2Stage += 1;
    renderMysteryGame();
    playMysteryStageVoice(false);
  }, 1400);
}

mysteryScreen.addEventListener('submit', (event) => {
  if (event.target.id !== 'case2-answer-form') return;
  event.preventDefault();
  submitValhallaDeduction(event.target);
});

mysteryScreen.addEventListener('click', (event) => {
  const evidenceButton = event.target.closest('[data-evidence]');
  const witnessButton = event.target.closest('[data-witness]');
  const answerButton = event.target.closest('[data-game-answer]');
  const actionButton = event.target.closest('[data-game-action]');
  const valhallaSuspectButton = event.target.closest('[data-valhalla-suspect]');
  const case2ActionButton = event.target.closest('[data-case2-action]');
  const case2PrologueButton = event.target.closest('[data-case2-prologue]');
  const case2ClueButton = event.target.closest('[data-case2-clue]');

  if (activeMysteryCase === 2) {
    if (actionButton?.dataset.gameAction === 'case1') {
      activeMysteryCase = 1;
      renderMysteryGame();
      playMysteryStageVoice(true);
      return;
    }

    if (valhallaSuspectButton) {
      currentValhallaSuspect = valhallaSuspectButton.dataset.valhallaSuspect;
      valhallaSuspectsSeen.add(currentValhallaSuspect);
      renderMysteryGame(true);
      playMysteryStageVoice(false);
      return;
    }

    if (case2PrologueButton) {
      case2ProloguePage += case2PrologueButton.dataset.case2Prologue === 'next' ? 1 : -1;
      case2ProloguePage = Math.max(0, Math.min(valhallaPrologue.length - 1, case2ProloguePage));
      renderMysteryGame();
      playMysteryStageVoice(false);
      return;
    }

    if (case2ClueButton) {
      const clue = document.querySelector('#case2-clue');
      const willShow = clue.hidden;
      clue.hidden = !willShow;
      case2ClueButton.setAttribute('aria-expanded', String(willShow));
      case2ClueButton.textContent = willShow ? 'hide clue' : 'need a clue?';
      return;
    }

    if (case2ActionButton) {
      if (case2ActionButton.dataset.case2Action === 'replay') {
        case2Stage = 0;
        case2ProloguePage = 0;
        currentValhallaSuspect = '';
        valhallaSuspectsSeen.clear();
      } else {
        case2Stage += 1;
      }
      renderMysteryGame();
      playMysteryStageVoice(false);
      return;
    }

    return;
  }

  if (evidenceButton) {
    currentEvidence = evidenceButton.dataset.evidence;
    evidenceSeen.add(currentEvidence);
    renderMysteryGame(true);
    return;
  }

  if (witnessButton) {
    currentWitness = witnessButton.dataset.witness;
    witnessesSeen.add(currentWitness);
    renderMysteryGame(true);
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
  if (actionButton.dataset.gameAction === 'case2') {
    activeMysteryCase = 2;
    case2Stage = 0;
    case2ProloguePage = 0;
    renderMysteryGame();
    playMysteryStageVoice(false);
    return;
  }
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
