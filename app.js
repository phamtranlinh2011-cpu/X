import questions from './questions.js';

const app = document.querySelector('#app');
const chapterOrder = ['C1', 'C2', 'C3', 'C4'];
const chapterShort = { C1: 'Mạng & Internet', C2: 'Application', C3: 'Transport', C4: 'Network' };
const chapterLong = {
  C1: 'Chương 1 · Mạng máy tính và Internet',
  C2: 'Chương 2 · Tầng Application',
  C3: 'Chương 3 · Tầng Transport',
  C4: 'Chương 4 · Tầng Network'
};
const letters = ['A', 'B', 'C', 'D'];

let settings = { mode: 'fixed', timed: true };
let session = null;
let timerHandle = null;

const icon = (name, size = 18) => {
  const paths = {
    network: '<circle cx="12" cy="5" r="2.4"/><circle cx="5" cy="18" r="2.4"/><circle cx="19" cy="18" r="2.4"/><path d="m10.8 7.1-4.5 8.7m5.8-8.7 4.5 8.7M7.5 18h9"/>',
    play: '<path d="m8 5 12 7-12 7z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/>',
    shuffle: '<path d="m18 14 4 4-4 4M18 2l4 4-4 4M2 18h2.5a5 5 0 0 0 4-2l7-10a5 5 0 0 1 4-2H22M2 6h2.5a5 5 0 0 1 4 2l1.2 1.7M14.3 14.3l1.2 1.7a5 5 0 0 0 4 2H22"/>',
    arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
    arrowLeft: '<path d="M19 12H5m6 6-6-6 6-6"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    x: '<path d="m18 6-12 12M6 6l12 12"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-8h.01"/>',
    alert: '<path d="m10.3 3.9-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3.1l-8-14a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4m0 4h.01"/>',
    book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22z"/><path d="M4 5.5v14A2.5 2.5 0 0 1 6.5 17H20M8 7h8m-8 4h8"/>',
    trophy: '<path d="M8 21h8m-4-4v4M7 4h10v5a5 5 0 0 1-10 0V4Z"/><path d="M7 6H4v2a4 4 0 0 0 4 4m9-6h3v2a4 4 0 0 1-4 4"/>',
    chart: '<path d="M4 19V5m0 14h17M8 15l3-4 3 2 5-7"/>',
    shield: '<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    laptop: '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M2 21h20m-8-4 1 4m-6-4-1 4"/>',
    server: '<rect x="4" y="3" width="16" height="7" rx="2"/><rect x="4" y="14" width="16" height="7" rx="2"/><path d="M8 6.5h.01M8 17.5h.01m4-11h4m-4 11h4"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18m0-18a15 15 0 0 0 0 18"/>',
    layers2: '<path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 17l9 5 9-5"/>',
    refresh: '<path d="M20 7v5h-5M4 17v-5h5"/><path d="M5.5 9A7 7 0 0 1 18 6l2 2M4 16l2 2a7 7 0 0 0 12.5-3"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>'
  };
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.info}</svg>`;
};

const shuffle = (input) => {
  const arr = [...input];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
};

function stopTimer() {
  if (timerHandle) window.clearInterval(timerHandle);
  timerHandle = null;
}

function renderHome() {
  stopTimer();
  session = null;
  app.innerHTML = `
    <header class="topbar">
      <a class="brand" href="#home" aria-label="NetLab trang chủ">
        <span class="brand-mark">${icon('network', 23)}</span>
        <span><span class="brand-name">NETLAB</span><span class="brand-sub">TDTU · NETWORKING</span></span>
      </a>
      <div class="topbar-right"><span class="eyebrow-pill"><i class="pulse-dot"></i> Ôn tập giữa kỳ · Năm nhất</span></div>
    </header>

    <section class="hero">
      <div class="hero-copy">
        <div class="kicker">Computer networks · Midterm prep</div>
        <h1>Nắm chắc <span class="gradient-word">mạng máy tính.</span></h1>
        <p class="hero-lede">Luyện tập có chiến lược, hiểu bản chất từng tầng mạng và tự tin bước vào bài thi giữa kỳ. 600 câu hỏi trắc nghiệm kèm giải thích, bám sát đề cương ôn tập của bạn.</p>
        <div class="hero-tags"><span>4 chương trọng tâm</span><span>100 câu / lượt</span><span>Giải thích ngay</span></div>
      </div>
      <div class="hero-visual" aria-hidden="true">
        <div class="orbit-card">
          <div class="orbit-lines"></div><div class="orbit-path"></div>
          <span class="orbit-label label-a">Application</span><span class="orbit-label label-b">Transport</span><span class="orbit-label label-c">Network</span><span class="orbit-label label-d">Link</span>
          <div class="node node-main">${icon('network', 31)}</div>
          <div class="node node-small node-a">${icon('laptop', 20)}</div>
          <div class="node node-small node-b">${icon('server', 20)}</div>
          <div class="node node-small node-c">${icon('globe', 20)}</div>
          <div class="node node-small node-d">${icon('layers2', 20)}</div>
        </div>
        <div class="float-chip">600 QUESTIONS<small>Ôn tập theo chương</small></div>
      </div>
    </section>

    <section aria-labelledby="setup-title">
      <div class="section-heading"><div><h2 id="setup-title">Thiết lập lượt ôn tập</h2><p>Chọn cách lấy câu hỏi và thời gian làm bài.</p></div><span class="source-pill">${icon('shield', 13)} Học tập cá nhân</span></div>
      <div class="setup-layout">
        <div class="panel setup-panel">
          <div class="panel-title"><span class="panel-icon">${icon('layers', 17)}</span> Chọn chế độ làm bài</div>
          <div class="mode-grid">
            <button class="mode-card ${settings.mode === 'fixed' ? 'active' : ''}" data-mode="fixed" type="button">
              <span class="mode-symbol">📚</span><strong>Đề mặc định</strong><small>Chọn ngẫu nhiên 1 trong 6 đề cố định. Mỗi đề cân bằng 4 chương.</small><span class="mode-meta">06 đề × 100 câu</span>
            </button>
            <button class="mode-card ${settings.mode === 'random' ? 'active' : ''}" data-mode="random" type="button">
              <span class="mode-symbol">${icon('shuffle', 20)}</span><strong>Đề ngẫu nhiên</strong><small>Bốc câu hỏi mới từ kho 600 câu, không trùng khái niệm trong cùng lượt.</small><span class="mode-meta">100 / 600 câu</span>
            </button>
          </div>
          <div class="setup-divider"></div>
          <div class="time-row">
            <div class="time-label"><strong>Thời gian làm bài</strong><span>Chọn nhịp ôn tập phù hợp với bạn.</span></div>
            <div class="segmented" role="group" aria-label="Chọn thời gian làm bài">
              <button type="button" data-time="timed" class="${settings.timed ? 'active' : ''}">60 phút</button>
              <button type="button" data-time="untimed" class="${!settings.timed ? 'active' : ''}">Không giới hạn</button>
            </div>
          </div>
          <div class="setup-divider"></div>
          <button id="start-exam" class="start-button" type="button">Bắt đầu làm bài ${icon('arrow', 17)}</button>
          <p class="fine-print">Mỗi câu hiện lần lượt · Chọn đáp án để xem giải thích · Có thể nộp bài sớm</p>
        </div>
        <aside class="panel info-panel">
          <div><h3>Ôn tập có hệ thống</h3><p>Kho câu hỏi được chia theo kiến thức trọng tâm để bạn không bị lệch chương khi luyện đề.</p></div>
          <div class="info-stat-grid">
            <div class="info-stat"><b>600</b><span>Câu hỏi</span></div>
            <div class="info-stat"><b>06</b><span>Đề cân bằng</span></div>
            <div class="info-stat"><b>04</b><span>Chương học</span></div>
            <div class="info-stat"><b>60'</b><span>Thời gian thi</span></div>
          </div>
          <div class="info-foot">${icon('info', 14)} <span>Đáp án được giải thích ngay sau khi chọn, giúp bạn ghi nhớ vì sao đúng và vì sao các lựa chọn khác không phù hợp.</span></div>
        </aside>
      </div>
    </section>

    <section class="coverage-section" aria-labelledby="coverage-title">
      <div class="section-heading"><div><h2 id="coverage-title">Bản đồ kiến thức</h2><p>600 câu được phân bổ đều, 150 câu cho mỗi chương.</p></div><span class="source-pill">${icon('book', 13)} 25 câu / chương / đề</span></div>
      <div class="chapter-grid">
        <article class="chapter-card" style="--accent:#71e2d1;--glow:rgba(102,227,208,.15)"><div class="chapter-number">CHAPTER 01</div><h3>Mạng máy tính và Internet</h3><p>Kiến trúc, mô hình, OSI, PDU, topology.</p><div class="chapter-bottom"><span>Ngân hàng câu hỏi</span><strong>150 câu</strong></div></article>
        <article class="chapter-card" style="--accent:#b5a8ff;--glow:rgba(156,140,255,.15)"><div class="chapter-number">CHAPTER 02</div><h3>Tầng Application</h3><p>HTTP, DNS, email, FTP, phân phối file.</p><div class="chapter-bottom"><span>Ngân hàng câu hỏi</span><strong>150 câu</strong></div></article>
        <article class="chapter-card" style="--accent:#ffc17f;--glow:rgba(255,189,120,.15)"><div class="chapter-number">CHAPTER 03</div><h3>Tầng Transport</h3><p>TCP, UDP, port, segment, switching.</p><div class="chapter-bottom"><span>Ngân hàng câu hỏi</span><strong>150 câu</strong></div></article>
        <article class="chapter-card" style="--accent:#ff91a2;--glow:rgba(255,127,145,.15)"><div class="chapter-number">CHAPTER 04</div><h3>Tầng Network</h3><p>Router, IPv4/IPv6, subnetting, VLSM.</p><div class="chapter-bottom"><span>Ngân hàng câu hỏi</span><strong>150 câu</strong></div></article>
      </div>
    </section>

    <div class="disclaimer">${icon('alert', 15)}<span><strong>Ghi chú nguồn:</strong> Đây là ngân hàng câu hỏi tự biên soạn theo đề cương bạn cung cấp và kiến thức mạng máy tính nhập môn; không phải đề thi chính thức, cũng không xác nhận là câu hỏi từng xuất hiện tại TDTU.</span></div>
    <footer class="footer"><span>NETLAB · NETWORKING MIDTERM PRACTICE</span><span>Được thiết kế để tự học · Không cần tài khoản</span></footer>
  `;

  app.querySelectorAll('[data-mode]').forEach((button) => button.addEventListener('click', () => {
    settings.mode = button.dataset.mode;
    renderHome();
  }));
  app.querySelectorAll('[data-time]').forEach((button) => button.addEventListener('click', () => {
    settings.timed = button.dataset.time === 'timed';
    renderHome();
  }));
  app.querySelector('#start-exam').addEventListener('click', startExam);
}

function makeQuestionSet() {
  if (settings.mode === 'fixed') {
    const setId = 1 + Math.floor(Math.random() * 6);
    const selected = questions.filter((question) => question.setId === setId);
    return { list: shuffle(selected), label: `Đề mặc định số ${setId}`, setId };
  }

  const selected = [];
  for (const chapter of chapterOrder) {
    const chapterQuestions = questions.filter((question) => question.chapter === chapter);
    const byConcept = new Map();
    for (const question of chapterQuestions) {
      if (!byConcept.has(question.conceptId)) byConcept.set(question.conceptId, []);
      byConcept.get(question.conceptId).push(question);
    }
    const conceptIds = shuffle([...byConcept.keys()]).slice(0, 25);
    for (const conceptId of conceptIds) {
      const variants = byConcept.get(conceptId);
      selected.push(variants[Math.floor(Math.random() * variants.length)]);
    }
  }
  return { list: shuffle(selected), label: 'Đề ngẫu nhiên · 100 câu', setId: null };
}

function startExam() {
  const picked = makeQuestionSet();
  session = {
    questions: picked.list,
    label: picked.label,
    setId: picked.setId,
    index: 0,
    answers: Array(100).fill(null),
    timed: settings.timed,
    remainingSeconds: settings.timed ? 3600 : null,
    startedAt: Date.now(),
    deadlineAt: settings.timed ? Date.now() + 3600 * 1000 : null,
    timeExpired: false,
    result: null
  };
  renderExam();
  if (session.timed) {
    timerHandle = window.setInterval(tickTimer, 1000);
  }
}

function tickTimer() {
  if (!session || session.result || !session.timed) return;
  session.remainingSeconds = Math.max(0, Math.ceil((session.deadlineAt - Date.now()) / 1000));
  const timer = document.querySelector('#timer-value');
  const chip = document.querySelector('#timer-chip');
  if (timer) timer.textContent = formatTime(Math.max(0, session.remainingSeconds));
  if (chip) chip.classList.toggle('urgent', session.remainingSeconds <= 300);
  if (session.remainingSeconds <= 0) {
    session.timeExpired = true;
    finishExam();
  }
}

function getChapterProgress() {
  return chapterOrder.map((chapter) => {
    const total = session.questions.filter((q) => q.chapter === chapter).length;
    const done = session.questions.reduce((count, q, i) => count + (q.chapter === chapter && session.answers[i] ? 1 : 0), 0);
    return { chapter, total, done };
  });
}

function renderExam() {
  if (!session) return;
  const q = session.questions[session.index];
  const answer = session.answers[session.index];
  const completed = session.answers.filter(Boolean).length;
  const shownProgress = Math.min(100, session.index + (answer ? 1 : 0));
  const percentage = shownProgress;
  const chapterProgress = getChapterProgress();

  app.innerHTML = `
    <div class="exam-shell">
      <header class="exam-top">
        <div class="exam-brand">
          <button class="back-button" id="back-home" title="Về trang chủ" aria-label="Về trang chủ">${icon('arrowLeft', 17)}</button>
          <span class="brand-mark">${icon('network', 22)}</span>
          <div class="exam-title"><strong>NETLAB <span style="color:var(--cyan)">/</span> LUYỆN ĐỀ</strong><span>${session.label}</span></div>
        </div>
        <div class="exam-tools">
          ${session.timed ? `<div class="timer-chip ${session.remainingSeconds <= 300 ? 'urgent' : ''}" id="timer-chip">${icon('clock', 15)}<span id="timer-value">${formatTime(session.remainingSeconds)}</span></div>` : '<div class="timer-chip">∞ <span>Không giới hạn</span></div>'}
          <button class="submit-small" id="submit-early" type="button">Nộp bài</button>
        </div>
      </header>

      <div class="exam-progress-panel">
        <div class="progress-top"><div class="progress-label">Tiến độ bài làm <strong>${completed}/100 câu</strong></div><span class="progress-percent">${percentage}%</span></div>
        <div class="progress-track"><div class="progress-fill" style="width:${percentage}%"></div></div>
      </div>

      <div class="exam-layout">
        <main class="panel question-panel">
          <div class="question-meta">
            <span class="chapter-tag">${icon('layers', 13)} ${chapterShort[q.chapter]}</span>
            <div><span class="question-number">CÂU ${String(session.index + 1).padStart(2, '0')} / 100</span><span class="difficulty-tag">${q.difficulty}</span></div>
          </div>
          <h1 class="question-text">${q.question}</h1>
          <p class="question-hint">Chọn một phương án đúng nhất.</p>
          <div class="options-list">
            ${q.options.map((option, index) => {
              let className = 'option-button';
              let status = '';
              if (answer) {
                if (index === q.answerIndex) { className += index === answer.selectedIndex ? ' selected-correct' : ' reveal-correct'; status = '✓'; }
                else if (index === answer.selectedIndex) className += ' selected-wrong';
              }
              return `<button class="${className}" data-option="${index}" type="button" ${answer ? 'disabled' : ''}><span class="option-letter">${letters[index]}</span><span class="option-text">${option}</span>${status ? `<span class="option-status">${status}</span>` : ''}</button>`;
            }).join('')}
          </div>
          ${answer ? `
            <div class="feedback ${answer.isCorrect ? 'correct' : 'wrong'}">
              <div class="feedback-heading">${icon(answer.isCorrect ? 'check' : 'x', 16)} ${answer.isCorrect ? 'Chính xác! Bạn đã chọn đúng.' : 'Chưa chính xác — cùng xem lại nhé.'}</div>
              ${!answer.isCorrect ? `<p class="answer-line">Bạn chọn: ${letters[answer.selectedIndex]}. ${q.options[answer.selectedIndex]}</p><p class="answer-line">Đáp án đúng: ${letters[q.answerIndex]}. ${q.options[q.answerIndex]}</p><p><strong>Vì sao sai:</strong> ${q.explanation}</p>` : `<p><strong>Vì sao đúng:</strong> ${q.explanation}</p>`}
            </div>
          ` : ''}
          <div class="question-footer">
            <span class="question-footer-note">${answer ? 'Đã ghi nhận câu trả lời của bạn.' : 'Chọn đáp án để mở khóa phần giải thích.'}</span>
            <button class="next-button ${answer ? 'enabled' : ''}" id="next-question" type="button">${session.index === 99 ? 'Hoàn thành bài' : 'Câu tiếp theo'} ${icon('arrow', 15)}</button>
          </div>
        </main>

        <aside class="question-aside">
          <div class="panel aside-card">
            <h3>Phân bổ theo chương</h3>
            <div class="chapter-progress">
              ${chapterProgress.map((item, index) => `<div class="chapter-progress-row"><span class="chapter-mini">${index + 1}</span><div><div class="chapter-progress-name">${chapterShort[item.chapter]}</div><div class="chapter-mini-track"><div class="chapter-mini-fill" style="width:${item.total ? item.done / item.total * 100 : 0}%"></div></div></div><span class="chapter-progress-count">${item.done}/${item.total}</span></div>`).join('')}
            </div>
          </div>
          <div class="panel aside-card tip-card"><h3>💡 Mẹo làm bài</h3><p><strong>Đọc kỹ từ khóa</strong> trong câu hỏi. Với subnetting, xác định prefix và số bit host trước, sau đó mới tính network, broadcast và dải host.</p></div>
        </aside>
      </div>
    </div>
  `;

  document.querySelector('#back-home').addEventListener('click', () => showExitModal());
  document.querySelector('#submit-early').addEventListener('click', openSubmitModal);
  document.querySelectorAll('[data-option]').forEach((button) => button.addEventListener('click', () => selectOption(Number(button.dataset.option))));
  document.querySelector('#next-question').addEventListener('click', nextQuestion);
}

function selectOption(optionIndex) {
  if (!session || session.answers[session.index]) return;
  const q = session.questions[session.index];
  session.answers[session.index] = { selectedIndex: optionIndex, isCorrect: optionIndex === q.answerIndex };
  renderExam();
}

function nextQuestion() {
  if (!session || !session.answers[session.index]) return;
  if (session.index >= session.questions.length - 1) {
    openSubmitModal();
    return;
  }
  session.index += 1;
  renderExam();
}

function openSubmitModal() {
  if (!session) return;
  const done = session.answers.filter(Boolean).length;
  const blank = session.answers.length - done;
  showModal({
    title: 'Xác nhận nộp bài?',
    message: blank ? `Bạn đã trả lời ${done}/100 câu. ${blank} câu chưa làm sẽ được tính là sai khi chấm điểm. Bạn chắc chắn muốn kết thúc lượt thi?` : 'Bạn đã hoàn thành toàn bộ câu hỏi. Xác nhận nộp bài để xem điểm và đáp án nhé.',
    stats: `<span>Đã trả lời <strong>${done}/100</strong></span><span>Chưa làm <strong>${blank}</strong></span>`,
    confirmText: 'Nộp bài ngay',
    onConfirm: finishExam
  });
}

function showExitModal() {
  showModal({
    title: 'Thoát lượt ôn tập?',
    message: 'Tiến độ của lượt làm bài hiện tại sẽ bị xóa. Bạn có muốn quay về trang thiết lập không?',
    confirmText: 'Thoát bài',
    onConfirm: renderHome
  });
}

function showModal({ title, message, stats = '', confirmText = 'Xác nhận', onConfirm }) {
  document.querySelector('.modal-backdrop')?.remove();
  const overlay = document.createElement('div');
  overlay.className = 'modal-backdrop';
  overlay.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div class="modal-symbol">${icon('alert', 22)}</div>
      <h2 id="modal-title">${title}</h2>
      <p>${message}</p>
      ${stats ? `<div class="modal-stats">${stats}</div>` : ''}
      <div class="modal-actions"><button class="modal-cancel" id="modal-cancel" type="button">Tiếp tục làm</button><button class="modal-confirm" id="modal-confirm" type="button">${confirmText}</button></div>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.querySelector('#modal-cancel').addEventListener('click', () => overlay.remove());
  overlay.querySelector('#modal-confirm').addEventListener('click', () => { overlay.remove(); onConfirm?.(); });
  overlay.addEventListener('click', (event) => { if (event.target === overlay) overlay.remove(); });
}

function finishExam() {
  if (!session || session.result) return;
  stopTimer();
  document.querySelector('.modal-backdrop')?.remove();
  const correct = session.answers.reduce((sum, answer) => sum + (answer?.isCorrect ? 1 : 0), 0);
  const attempted = session.answers.filter(Boolean).length;
  const wrong = session.questions.length - correct;
  const unanswered = session.questions.length - attempted;
  session.result = {
    correct,
    wrong,
    attempted,
    unanswered,
    score: Math.round(correct / session.questions.length * 100),
    elapsedSeconds: session.timed ? 3600 - Math.max(0, session.remainingSeconds) : Math.round((Date.now() - session.startedAt) / 1000)
  };
  renderResult();
}

function renderResult() {
  const result = session.result;
  const wrongItems = session.questions.map((question, index) => ({ question, answer: session.answers[index], index })).filter((item) => !item.answer || !item.answer.isCorrect);
  const timeText = session.timeExpired ? 'Đã hết 60 phút' : session.timed ? `Còn lại ${formatTime(Math.max(0, session.remainingSeconds))} khi nộp` : `Thời gian làm ${formatTime(result.elapsedSeconds)}`;
  const heading = result.score >= 85 ? 'Làm tốt lắm!' : result.score >= 65 ? 'Bạn đang đi đúng hướng.' : result.score >= 50 ? 'Cần ôn thêm một chút.' : 'Đừng nản nhé, hãy thử lại!';

  app.innerHTML = `
    <div class="result-shell">
      <header class="result-header">
        <a class="brand" href="#home"><span class="brand-mark">${icon('network', 22)}</span><span><span class="brand-name">NETLAB</span><span class="brand-sub">KẾT QUẢ ÔN TẬP</span></span></a>
        <span class="source-pill">${icon('trophy', 13)} Hoàn thành lượt thi</span>
      </header>
      <section class="panel result-hero">
        <div class="result-kicker">${session.label} · ${session.timeExpired ? 'Hết giờ' : 'Đã nộp bài'}</div>
        <div class="score-ring" style="--score:${result.score}"><div class="score-inner"><div class="score-value">${result.score}<span>/100</span></div><div class="score-caption">ĐIỂM SỐ</div></div></div>
        <h1>${heading}</h1><p>${timeText} · ${result.attempted}/100 câu đã trả lời</p>
      </section>
      <section class="result-stats">
        <div class="result-stat good"><strong>${result.correct}</strong><span>${icon('check', 10)} Câu đúng</span></div>
        <div class="result-stat bad"><strong>${result.wrong}</strong><span>${icon('x', 10)} Câu sai</span></div>
        <div class="result-stat blank"><strong>${result.unanswered}</strong><span>Câu chưa trả lời</span></div>
        <div class="result-stat"><strong>100</strong><span>Tổng số câu</span></div>
      </section>
      <section>
        <div class="result-section-title"><div><h2>Những câu cần xem lại</h2><p>${wrongItems.length ? `${wrongItems.length} câu sai hoặc chưa trả lời — kèm đáp án và giải thích.` : 'Bạn đã trả lời đúng tất cả câu hỏi.'}</p></div></div>
        ${wrongItems.length ? `<div class="review-list">${wrongItems.map(({ question, answer, index }) => `
          <details class="review-item" open>
            <summary class="review-head"><span class="review-index">${String(index + 1).padStart(2, '0')}</span><div><div class="review-question">${question.question}</div><div class="review-chapter">${chapterLong[question.chapter]} · ${question.topic}</div></div></summary>
            <div class="review-body">
              <p class="review-line"><strong>Bạn chọn:</strong> ${answer ? `${letters[answer.selectedIndex]}. ${question.options[answer.selectedIndex]}` : 'Chưa trả lời câu này.'}</p>
              <p class="review-line answer"><strong>Đáp án đúng:</strong> ${letters[question.answerIndex]}. ${question.options[question.answerIndex]}</p>
              <p class="review-explanation"><strong>Giải thích:</strong> ${question.explanation}</p>
            </div>
          </details>
        `).join('')}</div>` : '<div class="empty-review"><strong>🌟 Xuất sắc!</strong>Không có câu sai cần xem lại trong lượt này.</div>'}
      </section>
      <div class="result-actions"><button class="start-button" id="new-exam" type="button">Làm bài mới ${icon('refresh', 16)}</button><button class="secondary-button" id="back-to-top" type="button">Về trang thiết lập</button></div>
      <footer class="footer"><span>NETLAB · NETWORKING MIDTERM PRACTICE</span><span>Hãy xem lại lời giải để củng cố kiến thức.</span></footer>
    </div>
  `;
  document.querySelector('#new-exam').addEventListener('click', renderHome);
  document.querySelector('#back-to-top').addEventListener('click', renderHome);
}

renderHome();
