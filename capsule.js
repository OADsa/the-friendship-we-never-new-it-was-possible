const capsuleRoot = document.querySelector('#capsule-root');
const capsuleDev = document.querySelector('#capsule-dev');
const capsuleWindow = document.querySelector('#capsule-window');
const capsuleMusic = document.querySelector('#capsule-music');
const capsuleUnlockDate = new Date(2026, 9, 12, 0, 0, 0);
const capsuleAnnouncementDate = new Date(2026, 9, 7, 0, 0, 0);
const capsuleRevealDate = new Date(2026, 9, 11, 23, 0, 0);
const capsuleDevMode = new URLSearchParams(window.location.search).get('capsuleDev') === 'dekdek';
const capsuleDesktopIcon = document.querySelector('#capsule-desktop-icon');
const capsuleUpdatePopup = document.querySelector('#capsule-update-popup');
const capsuleUpdateTitle = document.querySelector('#capsule-update-title');
const capsuleUpdateCopy = document.querySelector('#capsule-update-copy');
let capsuleTimer;
let capsuleWarningStep = 0;
let capsuleMemoryStep = 0;
const capsuleLastMemoryStep = 16;
let capsuleForcedOpen = false;
let capsuleMusicFade;

function fadeCapsuleMusic(targetVolume, pauseAfter = false) {
  window.clearInterval(capsuleMusicFade);
  const startVolume = capsuleMusic.volume;
  let step = 0;
  capsuleMusicFade = window.setInterval(() => {
    step += 1;
    capsuleMusic.volume = Math.max(0, Math.min(1, startVolume + ((targetVolume - startVolume) * step / 12)));
    if (step >= 12) {
      window.clearInterval(capsuleMusicFade);
      if (pauseAfter) capsuleMusic.pause();
    }
  }, 55);
}

function startCapsuleMusic() {
  if (!capsuleMusic.paused) {
    fadeCapsuleMusic(0.14);
    return;
  }
  capsuleMusic.volume = 0;
  capsuleMusic.play().then(() => fadeCapsuleMusic(0.14)).catch(() => {});
}

function pauseCapsuleMusic() {
  if (!capsuleMusic.paused) fadeCapsuleMusic(0, true);
}

function updateCapsuleAvailability() {
  const now = Date.now();
  const isReleased = now >= capsuleUnlockDate.getTime();
  const isIconVisible = now >= capsuleRevealDate.getTime();
  const isAnnouncementTime = now >= capsuleAnnouncementDate.getTime() && now < capsuleRevealDate.getTime();
  const noticePhase = isReleased ? 'released' : isAnnouncementTime ? 'countdown' : '';

  capsuleDesktopIcon.classList.toggle('is-hidden', !isIconVisible && !capsuleDevMode);
  if (capsuleDevMode || !noticePhase || sessionStorage.getItem(`bembun_update_notice_${noticePhase}`) === 'seen') {
    capsuleUpdatePopup.classList.add('is-hidden');
    return;
  }

  capsuleUpdatePopup.dataset.noticePhase = noticePhase;
  if (isReleased) {
    capsuleUpdateTitle.textContent = 'The site has been updated.';
    capsuleUpdateCopy.textContent = 'New letters and a new app have been added.';
  } else {
    const daysRemaining = Math.max(1, Math.ceil((capsuleUnlockDate.getTime() - now) / 86400000));
    capsuleUpdateTitle.textContent = 'Something new is almost here.';
    capsuleUpdateCopy.textContent = `This site is updating in ${daysRemaining} ${daysRemaining === 1 ? 'day' : 'days'}.`;
  }
  capsuleUpdatePopup.classList.remove('is-hidden');
}

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
        <p class="memory-date">SEPTEMBER 18–19, 2026</p>
        <h2 class="memory-title">THE BOUQUET THAT STARTED A BIG DAY</h2>
        <figure class="memory-photo is-ready bouquet-memory">
          <img src="assets/memories/virtual-bouquet.webp" alt="A bouquet of sunflowers and tulips made for Bembun" />
          <figcaption>Your favorite flowers—sunflowers and tulips—in one little website.</figcaption>
        </figure>
        <p class="memory-copy">Nakatulugan mo ako the night before, kaya gumawa ako ng virtual bouquet para sa’yo. Hindi para manumbat—gusto ko lang gawing something sweet ang isang gabing nabitin.</p>
        <div class="story-beat"><strong>The next morning:</strong> Kagigising mo lang, pero nangulit agad ako tungkol sa videos. Nainis ka, nasaktan ako, at saglit tayong hindi nagkaintindihan.</div>
        <p class="memory-copy">Pero nag-usap tayo. We listened, we softened, and we fixed it. Hindi perfect ang araw na iyon—but maybe that is why it mattered.</p>
        <p class="memory-quote">Some days become special not because nothing went wrong, but because we chose to understand each other after.</p>
        ${memoryNavigation('what you admitted')}
      </div></section>`,
    `
      <section class="memory-screen"><div class="memory-shell">
        <p class="memory-date">SEPTEMBER 19, 2026 • THE HONEST PART</p>
        <h2 class="memory-title">YOU FELT IT TOO.</h2>
        <blockquote class="confession-panel">
          <p>“Yes, I admit I started to feel something nung sinabi mo na you want to pursue me, na you find me interesting and you started to like me.”</p>
          <small>— Bembun</small>
        </blockquote>
        <p class="memory-copy">You told me about the things you were still considering—time, distance, family, attachment, and the fear that something overwhelming might make you pull away. I did not hear a rejection. I heard honesty. I heard someone trying to protect both her heart and mine.</p>
        <div class="highlight-confession">
          <p>“Does it sound selfish ba if gusto kita, akin ka na lang, at ayaw kong tumingin ka sa ibang babae kahit random stranger pa ’yan?”</p>
          <p>“Like gusto ko akin lang attention mo kahit ganito pa lang tayo.”</p>
        </div>
        <p class="memory-quote">That was the day “maybe” began to sound a little more like “us.”</p>
        ${memoryNavigation('our first meeting')}
      </div></section>`,
    `
      <section class="memory-screen"><div class="memory-shell">
        <p class="memory-date">SEPTEMBER 26, 2026</p>
        <h2 class="memory-title">THE FIRST TIME WE MET.</h2>
        <div class="memory-photo placeholder"><span>PHOTO SLOT • SEPTEMBER 26</span><small>Your first-meeting photo will go here.</small></div>
        <p class="memory-copy">Akala ko magiging awkward. Instead, nagulat ako kung gaano ka ka-clingy—and how naturally I became just as clingy with you.</p>
        <p class="memory-copy">We hugged. I kissed your cheek. Ang daming random moments, ang daming tawa, at parang hindi iyon ang unang beses nating magkasama.</p>
        <p class="memory-quote">Parang matagal na nating alam kung paano maging malapit sa isa’t isa.</p>
        ${memoryNavigation('the very next day')}
      </div></section>`,
    `
      <section class="memory-screen"><div class="memory-shell">
        <p class="memory-date">SEPTEMBER 27, 2026</p>
        <h2 class="memory-title">FRIENDS, A DEBUT, AND US.</h2>
        <div class="memory-photo placeholder"><span>PHOTO SLOT • SEPTEMBER 27</span><small>The debut and the people you introduced me to.</small></div>
        <p class="memory-copy">I met your friends for the first time, then sumama tayo sa debut ni Cycy. It felt like I was being allowed into another small part of your world.</p>
        <p class="memory-copy">Pagkatapos noon, lumabas tayo—and the rest of that day belongs to us. No explanation needed. We both know what made it unforgettable.</p>
        <p class="memory-quote">Some memories are sweeter when only two people know the whole story.</p>
        ${memoryNavigation('the unexpected visit')}
      </div></section>`,
    `
      <section class="memory-screen"><div class="memory-shell">
        <p class="memory-date">SEPTEMBER 28, 2026 • LATE AT NIGHT</p>
        <h2 class="memory-title">THE “STRANGER” WHO CAME TO SEE YOU.</h2>
        <div class="memory-photo placeholder"><span>PHOTO SLOT • SEPTEMBER 28</span><small>The low-key stranger picture belongs here.</small></div>
        <p class="memory-copy">You felt lonely. I missed you too. So pinuntahan kita—with a random picture pretending I was some stranger, low-key kunwari. HAHAHA.</p>
        <p class="memory-copy">It was not a grand plan. I just knew I did not want you to feel alone if I could be there.</p>
        <p class="memory-quote">Sometimes care looks like showing up late at night with a ridiculous disguise.</p>
        ${memoryNavigation('our one-month mark')}
      </div></section>`,
    `
      <section class="memory-screen"><div class="memory-shell">
        <p class="memory-date">SEPTEMBER 30, 2026 • ONE MONTH</p>
        <h2 class="memory-title">A MONTH OF US TALKING.</h2>
        <div class="memory-photo placeholder"><span>PHOTO SLOT • SEPTEMBER 30</span><small>Your one-month memory will go here.</small></div>
        <p class="memory-copy">One month since we started talking. We found a quiet, hidden place, stayed inside a tent, and made a memory that does not need to be explained to anyone else.</p>
        <p class="memory-copy">A month sounds short on a calendar. Somehow, with you, it already held so many conversations, feelings, and versions of us.</p>
        <p class="memory-quote">Thirty days—and already a hundred little reasons to remember.</p>
        ${memoryNavigation('the day everything changed')}
      </div></section>`,
    `
      <section class="memory-screen"><div class="memory-shell">
        <p class="memory-date">OCTOBER 3, 2026</p>
        <h2 class="memory-title">YOU SAID I COULD COURT YOU.</h2>
        <div class="memory-photo placeholder"><span>PHOTO SLOT • OCTOBER 3</span><small>The day you gave me your answer.</small></div>
        <p class="memory-copy">That day became one of the most special parts of our story. You decided na pwede na akong manligaw sa’yo.</p>
        <p class="memory-copy">Hindi ko tinitingnan iyon bilang finish line. It was your trust—something I want to honor slowly, sincerely, and consistently.</p>
        <div class="gift-keepsake">GOODBYE GIFT<br><small>Something I will treasure for a very, very long time.</small></div>
        <p class="memory-quote">You did not just give me permission to pursue you. You gave me a chance to prove how gently I can care for you.</p>
        ${memoryNavigation('your surprise for me')}
      </div></section>`,
    `
      <section class="memory-screen"><div class="memory-shell">
        <p class="memory-date">OCTOBER 4, 2026</p>
        <h2 class="memory-title">THEN YOU MADE SOMETHING FOR ME.</h2>
        <div class="memory-photo placeholder"><span>PHOTO SLOT • OCTOBER 4</span><small>A screenshot from your Canva presentation will go here.</small></div>
        <p class="memory-copy">Unexpectedly, ginawan mo ako ng presentation sa Canva. Sobrang kilig at saya ko—not only because it was beautiful, but because it was the first time someone made something like that for me.</p>
        <p class="memory-copy">For once, ako naman ang nasa receiving end ng effort. I felt seen. I felt remembered. I felt special.</p>
        <p class="memory-quote">You made me understand how it feels when someone turns their thoughts about you into something you can keep.</p>
        ${memoryNavigation('one more page')}
      </div></section>`,
    `
      <section class="final-question chapter-teaser"><div class="memory-shell">
        <p class="capsule-eyebrow">AUGUST 30 — OCTOBER 4 — AND EVERYTHING BETWEEN</p>
        <h2>The best chapter is the one we’re writing now.</h2>
        <div class="final-lines">
          <p>Marami pang araw ang hindi naisama rito. Marami pang tawanan, tampuhan, late-night talks, random updates, at maliliit na sandaling walang litrato.</p>
          <p>Pero special pa rin ang mga iyon—kasi sa halos bawat araw na iyon, ikaw ang pinakamaraming umokupa sa isip at oras ko.</p>
          <p>Konti man ang nailagay ko rito, hindi konti ang halaga mo sa akin.</p>
        </div>
        <div class="story-date-strip" aria-label="Important dates in our story">
          <span>AUG 30</span><span>SEP 19</span><span>SEP 26</span><span>SEP 27</span><span>SEP 28</span><span>SEP 30</span><span>OCT 3</span><span>OCT 4</span>
        </div>
        ${memoryNavigation('the last page')}
      </div></section>`,
    `
      <section class="final-question"><div class="memory-shell">
        <h2>Bembun.</h2>
        <div class="final-lines">
          <p>Kung ano man ang pinagdaanan mo bago makarating sa pahinang ito, sana naging banayad ka rin sa sarili mo.</p>
          <p>Hindi mo kailangang maging “mas magandang bersyon” ng sarili mo para maging karapat-dapat sa pag-aaruga.</p>
          <p>Ipinagmamalaki ko ang bawat hakbang mo—pati ang maliliit at tahimik na walang ibang nakapansin.</p>
          <p>Walang hinihinging kapalit ang pahinang ito. Masaya lamang akong narito ka.</p>
        </div>
        <div class="capsule-actions delayed-actions">
          <button class="capsule-button primary" type="button" data-capsule-action="memory-next">isang huling pahina</button>
        </div>
      </div></section>`,
    `
      <section class="final-question chapter-teaser"><div class="memory-shell">
        <p class="capsule-eyebrow">THE STORY ISN’T OVER</p>
        <h2>Do you wanna know what the best chapter is?</h2>
        <div class="final-lines">
          <p>Hindi pa ito tungkol sa nakaraan.</p>
          <p>Tungkol ito sa pahinang pinili nating simulan—at gusto kong itanong muli nang maayos.</p>
        </div>
        <div class="final-response-actions delayed-actions">
          <button class="capsule-button ghost" type="button" data-capsule-chapter="no">NOT YET</button>
          <button class="capsule-button primary" type="button" data-capsule-chapter="yes">YES</button>
        </div>
      </div></section>`,
    `
      <section class="final-question standalone-question"><div class="memory-shell">
        <p class="capsule-eyebrow">ISANG HULING TANONG</p>
        <div class="makata-poem">
          <p>Kung ang oras ay ilog, hindi kita mamadaliing tumawid;</p>
          <p>sasabay lamang ako sa agos na kaya ng iyong dibdib.</p>
          <p>Hindi kita hihilahin sa landas na hindi mo pinili;</p>
          <p>mag-aalay lang ako ng kamay, kung nais mo itong tanggapin.</p>
          <p>At kung pahihintulutan, hindi pangako ang una kong dala—</p>
          <p>kundi tiyaga, paggalang, at pusong handang makilala ka pa.</p>
        </div>
        <p class="courting-question">Pwede na ba akong manligaw sa’yo?</p>
        <p class="question-reassurance">Walang maling sagot. Anuman ang piliin mo, igagalang ko.</p>
        <div class="final-response-actions delayed-actions">
          <button class="capsule-button ghost" type="button" data-capsule-response="no">HINDI PA</button>
          <button class="capsule-button primary" type="button" data-capsule-response="yes">OO</button>
        </div>
      </div></section>`
  ];
  capsuleRoot.innerHTML = screens[capsuleMemoryStep];
  capsuleRoot.scrollTop = 0;
}

function renderChapterNotYet() {
  capsuleRoot.innerHTML = `
    <section class="final-question"><div class="memory-shell">
      <h2>Okay lang.</h2>
      <div class="final-lines">
        <p>Hindi ko muna bubuksan ang pahinang iyon. Walang kailangang madaliin.</p>
        <p>Pero hindi ibig sabihin noon na titigil na akong mag-effort o bigla na lang akong lalayo.</p>
        <p>Patuloy kitang kikilalanin, pakikinggan, at aalalahanin sa maliliit pero totoong paraan.</p>
        <p class="courting-question">Hindi para pilitin ka—kundi para ipakita na sincere at consistent ako.</p>
        <p>Walang panunumbat at walang hinihinging kapalit. I’ll respect your pace while still showing you that I care.</p>
      </div>
      <div class="capsule-actions">
        <button class="capsule-button ghost" type="button" data-capsule-action="memory-back">balikan muna</button>
        <button class="capsule-button primary" type="button" data-capsule-chapter="yes">sige, ano iyon?</button>
      </div>
      <p class="capsule-whisper">Kapag handa ka nang malaman, narito lang ang pahina.</p>
    </div></section>`;
}

function renderCapsuleYes() {
  localStorage.setItem('bembun_capsule_response', 'yes-pending');
  capsuleRoot.innerHTML = `
    <section class="final-question password-page"><div class="memory-shell">
      <p class="capsule-eyebrow">ISANG MUNTING HULING HAKBANG</p>
      <h2>Tanungin si Dekdek.</h2>
      <div class="final-lines">
        <p>I-message mo si Dekdek at itanong sa kanya:</p>
        <p class="courting-question">“Ano ang password?”</p>
        <p>Pagkatapos, bumalik dito at ilagay ang eksaktong sagot niya.</p>
      </div>
      <form class="capsule-password-form" id="capsule-password-form" autocomplete="off">
        <label for="capsule-password">PASSWORD</label>
        <input id="capsule-password" name="password" type="text" placeholder="ILAGAY ANG PASSWORD" required />
        <button class="capsule-button primary" type="submit">UNLOCK</button>
      </form>
      <p class="capsule-password-feedback" id="capsule-password-feedback" aria-live="polite"></p>
    </div></section>`;
}

function renderCapsuleYesComplete() {
  localStorage.setItem('bembun_capsule_response', 'yes');
  capsuleRoot.innerHTML = `
    <section class="final-question"><div class="memory-shell">
      <p class="capsule-eyebrow">PASSWORD ACCEPTED</p>
      <h2>Kung gayon, oo.</h2>
      <div class="final-lines">
        <p>Salamat sa pagtitiwala mo sa akin at sa sagot na ibinigay mo.</p>
        <p>Hindi natin kailangang madaliin ang susunod. Maaari natin itong simulan nang marahan, tapat, at may paggalang.</p>
        <p class="courting-question">I-message si Dekdek:<br>“Handa na si Bembun sa susunod na kabanata.”</p>
        <p>Alam na niya kung ano ang ibig sabihin noon.</p>
      </div>
      <p class="capsule-whisper">Ang susunod na pahina, sabay nating isusulat.</p>
    </div></section>`;
}

function renderCapsuleNo() {
  localStorage.setItem('bembun_capsule_response', 'no');
  capsuleRoot.innerHTML = `
    <section class="final-question"><div class="memory-shell">
      <h2>Ayos lang. Totoo.</h2>
      <div class="final-lines">
        <p>Salamat sa pagiging tapat sa akin.</p>
        <p>Hindi mo kailangang magpaliwanag, humingi ng tawad, o makonsensya sa sagot mo.</p>
        <p>Hindi nababawasan ang halaga ng mga sandaling pinagsaluhan natin dahil lamang dito.</p>
        <p class="courting-question">Hindi ako biglang lalamig o titigil maging sincere dahil hindi ka pa handa.</p>
        <p>Patuloy akong gagawa ng effort sa paraang komportable ka—consistent, mahinahon, at walang pangungulit.</p>
        <p>Hindi iyon kapalit ng sagot at hindi mo iyon kailangang suklian. Gusto ko lang ipakitang totoo ang pag-aalaga ko.</p>
        <p>Mahalaga ka, Bembun. Walang pilitan at walang samaan ng loob.</p>
      </div>
      <p class="capsule-whisper">I’ll respect your pace, and I’ll keep showing up with care.</p>
    </div></section>`;
}

function startUnlockedCapsule() {
  renderCapsuleOpening();
}

capsuleRoot.addEventListener('submit', (event) => {
  if (event.target.id !== 'capsule-password-form') return;
  event.preventDefault();
  const input = event.target.querySelector('#capsule-password');
  const feedback = event.target.parentElement.querySelector('#capsule-password-feedback');
  const password = input.value.trim().replace(/\s+/g, '');

  event.target.classList.remove('is-wrong');
  if (password !== '30/08/2026') {
    event.target.classList.add('is-wrong');
    feedback.textContent = 'Hindi iyon ang password. Subukan ulit ang eksaktong sagot na ibinigay ni Dekdek.';
    input.focus();
    input.select();
    return;
  }

  input.disabled = true;
  event.target.querySelector('button').disabled = true;
  feedback.textContent = 'Tama. Binubuksan ang huling pahina…';
  window.setTimeout(renderCapsuleYesComplete, 700);
});

capsuleRoot.addEventListener('click', (event) => {
  const action = event.target.closest('[data-capsule-action]')?.dataset.capsuleAction;
  const response = event.target.closest('[data-capsule-response]')?.dataset.capsuleResponse;
  const chapterChoice = event.target.closest('[data-capsule-chapter]')?.dataset.capsuleChapter;
  if (chapterChoice === 'yes') {
    capsuleMemoryStep = capsuleLastMemoryStep;
    renderCapsuleMemory();
    return;
  }
  if (chapterChoice === 'no') {
    renderChapterNotYet();
    return;
  }
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
    capsuleMemoryStep = Math.min(capsuleLastMemoryStep, capsuleMemoryStep + 1);
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

document.addEventListener('click', (event) => {
  if (event.target.closest('[data-open="capsule-window"]')) {
    startCapsuleMusic();
    return;
  }
  if (event.target.closest('#capsule-window .close-window')) {
    pauseCapsuleMusic();
    return;
  }
  if (event.target.closest('#capsule-window [data-window-action="minimize"]')) {
    if (capsuleWindow.classList.contains('is-minimized')) pauseCapsuleMusic();
    else startCapsuleMusic();
  }
});

document.addEventListener('visibilitychange', () => {
  if (document.hidden) pauseCapsuleMusic();
  else if (!capsuleWindow.classList.contains('is-hidden') && !capsuleWindow.classList.contains('is-minimized')) startCapsuleMusic();
});

document.querySelectorAll('[data-capsule-update-close]').forEach((button) => {
  button.addEventListener('click', () => {
    const phase = capsuleUpdatePopup.dataset.noticePhase;
    if (phase) sessionStorage.setItem(`bembun_update_notice_${phase}`, 'seen');
    capsuleUpdatePopup.classList.add('is-hidden');
  });
});

persistRealUnlock();
updateCapsuleAvailability();
window.setInterval(updateCapsuleAvailability, 60000);
if (capsuleIsOpen()) startUnlockedCapsule();
else renderCapsuleLocked();
