const capsuleRoot = document.querySelector('#capsule-root');
const capsuleDev = document.querySelector('#capsule-dev');
const capsuleUnlockDate = new Date(2026, 9, 12, 0, 0, 0);
const capsuleDevMode = new URLSearchParams(window.location.search).get('capsuleDev') === 'dekdek';
let capsuleTimer;
let capsuleWarningStep = 0;
let capsuleMemoryStep = 0;
let capsuleForcedOpen = false;

const capsuleWarnings = [
  { title: 'WARNING', copy: 'You are about to open something that was made specifically for you.<br><br>Are you sure you want to continue?', back: 'NO', next: 'YES' },
  { title: 'Sure ka talaga?', copy: 'Pwede ka pa umatras. Hindi pa naman dramatic. Medyo lang.', back: 'Hindi', next: 'Oo' },
  { title: 'Hindi nga?', copy: 'Final answer mo na ba talaga ‘yan?', back: 'Hindi nga', next: 'Oo nga' },
  { title: 'Last chance.', copy: 'Once you open this, you can’t pretend you didn’t see it.', back: 'Back', next: 'Open' },
  { title: 'Okay.', copy: 'You really want to see this?<br><br>Then let’s go back to where it started.', back: '', next: 'OPEN THE TIME CAPSULE' }
];

function capsuleIsOpen() {
  return capsuleForcedOpen || Date.now() >= capsuleUnlockDate.getTime() || localStorage.getItem('bembun_capsule_unlocked') === 'yes';
}

function persistRealUnlock() {
  if (Date.now() >= capsuleUnlockDate.getTime()) localStorage.setItem('bembun_capsule_unlocked', 'yes');
}

function renderCountdown() {
  const remaining = Math.max(0, capsuleUnlockDate.getTime() - Date.now());
  if (remaining === 0) {
    persistRealUnlock();
    window.clearInterval(capsuleTimer);
    renderCapsuleOpening();
    return;
  }

  const totalSeconds = Math.floor(remaining / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const values = { days, hours, minutes, seconds };
  Object.entries(values).forEach(([name, value]) => {
    const target = capsuleRoot.querySelector(`[data-countdown="${name}"]`);
    if (target) target.textContent = String(value).padStart(2, '0');
  });
}

function renderCapsuleLocked() {
  window.clearInterval(capsuleTimer);
  capsuleRoot.innerHTML = `
    <section class="capsule-screen">
      <div class="capsule-center">
        <p class="capsule-eyebrow">PERSONAL ARCHIVE • SEALED</p>
        <h1 class="capsule-heading">ARE YOU READY?</h1>
        <div class="capsule-lockbox">
          <h2>TIME CAPSULE</h2>
          <p class="capsule-subtitle">There’s something waiting for you.</p>
          <p class="capsule-date-label">OPENING DATE</p>
          <p class="capsule-date">OCTOBER 12, 2026</p>
          <div class="capsule-countdown" aria-label="Time remaining until the capsule opens">
            <div class="countdown-part"><strong data-countdown="days">00</strong><span>DAYS</span></div>
            <div class="countdown-part"><strong data-countdown="hours">00</strong><span>HOURS</span></div>
            <div class="countdown-part"><strong data-countdown="minutes">00</strong><span>MINUTES</span></div>
            <div class="countdown-part"><strong data-countdown="seconds">00</strong><span>SECONDS</span></div>
          </div>
          <p class="capsule-whisper">Some things are worth waiting for.</p>
        </div>
      </div>
    </section>`;
  renderCountdown();
  capsuleTimer = window.setInterval(renderCountdown, 1000);
}

function renderCapsuleOpening() {
  window.clearInterval(capsuleTimer);
  capsuleRoot.innerHTML = `
    <section class="capsule-screen">
      <div class="capsule-center">
        <div class="unlock-lines">
          <p>OCTOBER 12, 2026</p>
          <p>THE TIME CAPSULE IS NOW OPEN.</p>
          <p>Are you ready?</p>
        </div>
        <button class="capsule-button primary" type="button" data-capsule-action="begin">BEGIN</button>
      </div>
    </section>`;
}

function renderCapsuleWarning() {
  const warning = capsuleWarnings[capsuleWarningStep];
  capsuleRoot.innerHTML = `
    <section class="capsule-screen">
      <div class="warning-window">
        <div class="warning-title">CAPSULE WARNING ${capsuleWarningStep + 1} / ${capsuleWarnings.length}</div>
        <div class="warning-content">
          <h2>${warning.title}</h2>
          <p>${warning.copy}</p>
          <div class="capsule-actions">
            ${warning.back ? `<button class="capsule-button ghost" type="button" data-capsule-action="warning-back">${warning.back}</button>` : ''}
            <button class="capsule-button primary" type="button" data-capsule-action="warning-next">${warning.next}</button>
          </div>
        </div>
      </div>
    </section>`;
}

function memoryNavigation(nextLabel = 'continue') {
  return `<div class="capsule-actions">
    ${capsuleMemoryStep > 0 ? '<button class="capsule-button ghost" type="button" data-capsule-action="memory-back">back</button>' : ''}
    <button class="capsule-button primary" type="button" data-capsule-action="memory-next">${nextLabel}</button>
  </div>`;
}

function renderCapsuleMemory() {
  const screens = [
    `
      <section class="memory-screen"><div class="memory-shell">
        <p class="memory-date">AUGUST 30, 2026 • 1:17 AM</p>
        <h2 class="memory-title">Where it all started.</h2>
        <div class="chat-recovery">
          <div class="chat-bubble"><strong>BEMBUN</strong>paano kung naubos mo na lahat ng damo diyan only to end up with “she loves me not” HAHAHAHAHAHAHAHA<br>akala ko bubunot ka ng something ng bulaklak TT TT TT</div>
          <div class="chat-bubble"><strong>DEKDEK</strong>kunsakali man masasabi ko lang atleast I tried HAHAHA<br>wala nang makakapag sabi na ayan kasi, hindi mo hinabol</div>
          <div class="chat-bubble"><strong>BEMBUN</strong>loko</div>
        </div>
        <p class="memory-quote">Funny how something so random ended up becoming the beginning of something.</p>
        ${memoryNavigation('and then?')}
      </div></section>`,
    `
      <section class="memory-screen"><div class="memory-shell">
        <p class="memory-date">THE DAYS THAT FOLLOWED</p>
        <h2 class="memory-title">AND THEN WE STARTED TALKING.</h2>
        <p class="memory-copy">Somewhere between random conversations, laughing at stupid things, and talking about things that probably shouldn’t have been discussed at 2 AM… we started getting comfortable with each other.</p>
        <div class="memory-card-grid">
          <div class="memory-card"><strong>Random conversations</strong><small>How did we even get here?</small></div>
          <div class="memory-card"><strong>Aliens</strong><small>Why were we even talking about aliens?</small></div>
          <div class="memory-card"><strong>Paranormal stuff</strong><small>Then somehow it became paranormal.</small></div>
          <div class="memory-card"><strong>Weird theories</strong><small>Confidently discussing zero evidence.</small></div>
          <div class="memory-card"><strong>Random questions</strong><small>One question. Twelve unrelated topics.</small></div>
          <div class="memory-card"><strong>Late nights</strong><small>And somehow it became more unhinged.</small></div>
          <div class="memory-card"><strong>Learning each other</strong><small>Every answer revealed something new.</small></div>
          <div class="memory-card"><strong>Those conversations</strong><small>Yeah… we’re not explaining that one.</small></div>
        </div>
        <p class="memory-copy">Nothing dramatic happened. We just slowly stopped feeling like strangers.</p>
        ${memoryNavigation('the Kiko moment')}
      </div></section>`,
    `
      <section class="memory-screen"><div class="memory-shell">
        <div class="timeline-marker">KIKO</div>
        <h2 class="memory-title">THEN CAME THE KIKO MOMENT.</h2>
        <div class="story-beat">There were things Kiko had done before, things involving Bembun, and details that initially sounded genuinely serious. Then some of those details apparently turned out to be jokes—which somehow made the whole thing more confusing, not less.</div>
        <div class="story-beat">Dekdek explained who Kiko was and what he understood about the situation. Bembun explained what she had experienced. They talked through the parts that didn’t line up.</div>
        <div class="story-beat">It wasn’t about rescuing anyone or pretending to have every answer. It was just listening, explaining, and being present while something messy became a little easier to understand.</div>
        <p class="memory-quote">Maybe that was one of the first times I realized I actually cared about what happened to you.</p>
        ${memoryNavigation('September 8')}
      </div></section>`,
    `
      <section class="memory-screen"><div class="memory-shell">
        <p class="memory-date">SEPTEMBER 8, 2026</p>
        <h2 class="memory-title">THE CONFESSION</h2>
        <p class="memory-copy center">I was drunk.</p>
        <p class="memory-copy center">And somehow being drunk made me brave enough to say something I had probably already been thinking about.</p>
        <p class="memory-quote">I really found you interesting.</p>
        <p class="memory-copy center">And I really wanted to make an effort.</p>
        <p class="memory-quote">I wanted to pursue you.</p>
        <p class="memory-copy center">I didn’t really know where this would go.<br>But I knew I wanted to try.</p>
        ${memoryNavigation('September 12')}
      </div></section>`,
    `
      <section class="memory-screen"><div class="memory-shell">
        <p class="memory-date">SEPTEMBER 12, 2026</p>
        <h2 class="memory-title">THE LETTERS</h2>
        <p class="memory-copy center">Then I sent you something.</p>
        <p class="memory-quote">A little website.<br>Love letters.</p>
        <p class="memory-copy">Somewhere along the way, I discovered how much words of affirmation mean to you. I think that was when I started realizing how much I wanted to express things in ways you’d actually appreciate.</p>
        <p class="memory-copy center">And the rest…</p>
        <p class="memory-quote">…is still being written.</p>
        ${memoryNavigation('look forward')}
      </div></section>`,
    `
      <section class="memory-screen"><div class="memory-shell">
        <p class="memory-date">DATE UNKNOWN</p>
        <h2 class="memory-title">THE REST OF THE STORY</h2>
        <div class="empty-future">This space has intentionally been left empty.</div>
        <p class="memory-copy center">Some parts of the story haven’t happened yet.</p>
        <p class="memory-copy center">Because they’re still waiting to be written.</p>
        <p class="memory-quote">Maybe by you.</p>
        ${memoryNavigation('one final page')}
      </div></section>`,
    `
      <section class="final-question"><div class="memory-shell">
        <h2>Bembun.</h2>
        <div class="final-lines">
          <p>I don’t know what version of yourself you’ll become tomorrow.</p>
          <p>I don’t know what you’ll discover about yourself.</p>
          <p>I don’t know where life will take you.</p>
          <p>But I hope you’re becoming someone you’re proud of.</p>
          <p>Are you okay?</p>
          <p>Have you upgraded to a better version of yourself na?</p>
          <p class="courting-question">If yes…<br><br>Can I make the courtesy to court you?</p>
        </div>
        <div class="final-response-actions delayed-actions">
          <button class="capsule-button ghost" type="button" data-capsule-response="no">NO</button>
          <button class="capsule-button primary" type="button" data-capsule-response="yes">YES</button>
        </div>
      </div></section>`
  ];
  capsuleRoot.innerHTML = screens[capsuleMemoryStep];
  capsuleRoot.scrollTop = 0;
}

function renderCapsuleYes() {
  localStorage.setItem('bembun_capsule_response', 'yes');
  capsuleRoot.innerHTML = `
    <section class="final-question"><div class="memory-shell">
      <h2>Wait.</h2>
      <div class="final-lines">
        <p>Before you answer… there is one thing I want you to do.</p>
        <p class="courting-question">Choose an Arthur Nery song.</p>
        <p>Find the story or message behind the song.</p>
        <p>And when you’re ready, message me:</p>
      </div>
      <div class="secret-phrase">“Dekdek? Bembun is now ready.”</div>
      <div class="final-lines"><p>I’ll know what it means.</p><p>Maybe this isn’t the end of the time capsule.</p><p>Maybe it’s the beginning of the next chapter.</p></div>
      <p class="capsule-whisper">Whatever happens next… I’ll let you write the next part.</p>
    </div></section>`;
}

function renderCapsuleNo() {
  localStorage.setItem('bembun_capsule_response', 'no');
  capsuleRoot.innerHTML = `
    <section class="final-question"><div class="memory-shell">
      <h2>That’s okay.</h2>
      <div class="final-lines">
        <p>I hope you figure things out.</p>
        <p>I hope you find the version of yourself that you’re looking for.</p>
        <p>Take your time. You don’t owe me an answer before you’re ready.</p>
        <p>Whatever happens, I’m still glad our story happened.</p>
        <p>Thank you for being part of it.</p>
        <p>This chapter will remain here. But this question is now closed.</p>
        <p class="courting-question">Maybe another chapter someday.</p>
      </div>
      <p class="capsule-whisper">Whatever happens next… I’ll let you write the next part.</p>
    </div></section>`;
}

function startUnlockedCapsule() {
  const response = localStorage.getItem('bembun_capsule_response');
  if (response === 'yes') {
    renderCapsuleYes();
    return;
  }
  if (response === 'no') {
    renderCapsuleNo();
    return;
  }
  renderCapsuleOpening();
}

capsuleRoot.addEventListener('click', (event) => {
  const action = event.target.closest('[data-capsule-action]')?.dataset.capsuleAction;
  const response = event.target.closest('[data-capsule-response]')?.dataset.capsuleResponse;
  if (response === 'yes') return renderCapsuleYes();
  if (response === 'no') return renderCapsuleNo();
  if (!action) return;

  if (action === 'begin') {
    capsuleWarningStep = 0;
    renderCapsuleWarning();
  }
  if (action === 'warning-back') {
    if (capsuleWarningStep === 0) renderCapsuleOpening();
    else {
      capsuleWarningStep -= 1;
      renderCapsuleWarning();
    }
  }
  if (action === 'warning-next') {
    if (capsuleWarningStep < capsuleWarnings.length - 1) {
      capsuleWarningStep += 1;
      renderCapsuleWarning();
    } else {
      capsuleMemoryStep = 0;
      renderCapsuleMemory();
    }
  }
  if (action === 'memory-next') {
    capsuleMemoryStep = Math.min(6, capsuleMemoryStep + 1);
    renderCapsuleMemory();
  }
  if (action === 'memory-back') {
    capsuleMemoryStep = Math.max(0, capsuleMemoryStep - 1);
    renderCapsuleMemory();
  }
});

if (capsuleDevMode) {
  capsuleDev.classList.remove('is-hidden');
  capsuleDev.addEventListener('click', (event) => {
    const action = event.target.closest('[data-capsule-dev]')?.dataset.capsuleDev;
    if (!action) return;
    if (action === 'unlock' || action === 'preview') {
      capsuleForcedOpen = true;
      localStorage.removeItem('bembun_capsule_response');
      renderCapsuleOpening();
    }
    if (action === 'yes') renderCapsuleYes();
    if (action === 'no') renderCapsuleNo();
    if (action === 'restart') {
      capsuleForcedOpen = true;
      capsuleWarningStep = 0;
      capsuleMemoryStep = 0;
      localStorage.removeItem('bembun_capsule_response');
      renderCapsuleOpening();
    }
    if (action === 'lock') {
      capsuleForcedOpen = false;
      localStorage.removeItem('bembun_capsule_unlocked');
      localStorage.removeItem('bembun_capsule_response');
      renderCapsuleLocked();
    }
  });
}

persistRealUnlock();
if (capsuleIsOpen()) startUnlockedCapsule();
else renderCapsuleLocked();
