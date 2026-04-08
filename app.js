/**
 * ╔══════════════════════════════════════════════════════════════════════════╗
 * ║                        QUIZ APP — app.js                               ║
 * ║  All registered test modules are read from window.APP_MODULES (set     ║
 * ║  in index.html after each data script tag). The app never touches the  ║
 * ║  DOM directly from data files — all rendering happens here.            ║
 * ╚══════════════════════════════════════════════════════════════════════════╝
 */

// ─── CONSTANTS ──────────────────────────────────────────────────────────────

const LS_SCORES_KEY = "qapp_scores_v1"; // localStorage key for past scores
const LS_SESSION_KEY = "qapp_session_v1"; // localStorage key for in-progress session

// ─── APPLICATION STATE ──────────────────────────────────────────────────────

const State = {
  /** Currently loaded test module object (meta + questions) */
  activeModule: null,

  /**
   * Map of questionId → selectedOptionIndex (or null if unanswered)
   * Populated when the user selects an option during exam mode.
   */
  answers: {},

  /** Current view: 'dashboard' | 'exam' | 'results' */
  view: "dashboard",
};

// ─── LOCAL STORAGE HELPERS ──────────────────────────────────────────────────

const LS = {
  /** Read all stored past scores. Returns { [moduleId]: { score, total, date }[] } */
  getScores() {
    try {
      return JSON.parse(localStorage.getItem(LS_SCORES_KEY) || "{}");
    } catch {
      return {};
    }
  },

  /** Append a new score entry for a given module ID */
  saveScore(moduleId, score, total) {
    const all = this.getScores();
    if (!all[moduleId]) all[moduleId] = [];
    // Keep the last 5 attempts per module
    all[moduleId].unshift({
      score,
      total,
      pct: Math.round((score / total) * 100),
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    });
    all[moduleId] = all[moduleId].slice(0, 5);
    try {
      localStorage.setItem(LS_SCORES_KEY, JSON.stringify(all));
    } catch {
      /* quota exceeded — fail silently */
    }
  },

  /** Get the best score for a module (or null) */
  getBest(moduleId) {
    const attempts = this.getScores()[moduleId];
    if (!attempts || attempts.length === 0) return null;
    return attempts.reduce(
      (best, a) => (a.pct > best.pct ? a : best),
      attempts[0],
    );
  },

  /** Persist in-progress session so a page refresh doesn't lose answers */
  saveSession() {
    try {
      localStorage.setItem(
        LS_SESSION_KEY,
        JSON.stringify({
          moduleId: State.activeModule?.meta.id,
          answers: State.answers,
        }),
      );
    } catch {
      /* fail silently */
    }
  },

  /** Restore a persisted in-progress session. Returns true if found. */
  restoreSession() {
    try {
      const raw = localStorage.getItem(LS_SESSION_KEY);
      if (!raw) return false;
      const { moduleId, answers } = JSON.parse(raw);
      const mod = window.APP_MODULES.find((m) => m.meta.id === moduleId);
      if (!mod) return false;
      State.activeModule = mod;
      State.answers = answers || {};
      return true;
    } catch {
      return false;
    }
  },

  clearSession() {
    try {
      localStorage.removeItem(LS_SESSION_KEY);
    } catch {
      /* ok */
    }
  },
};

// ─── DOM HELPERS ────────────────────────────────────────────────────────────

/** Grab a single element by selector, scoped to an optional parent. */
const $ = (sel, parent = document) => parent.querySelector(sel);
const $$ = (sel, parent = document) => [...parent.querySelectorAll(sel)];

/** Toggle multiple classes on an element. */
function setClasses(el, map) {
  Object.entries(map).forEach(([cls, add]) => el.classList.toggle(cls, !!add));
}

/** Escape user-facing raw strings that may contain HTML entities. */
function esc(str = "") {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ─── VIEW SWITCHER ──────────────────────────────────────────────────────────

/**
 * Show one named section and hide all others.
 * Sections are identified by data-view="..." on the HTML element.
 */
function showView(viewName) {
  State.view = viewName;
  $$("[data-view]").forEach((el) => {
    const isActive = el.dataset.view === viewName;
    el.hidden = !isActive;
    el.setAttribute("aria-hidden", String(!isActive));
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ─── THEME TOGGLE ───────────────────────────────────────────────────────────

function initTheme() {
  const html = document.documentElement;
  const toggle = $("#themeToggle");
  const label = $("#themeLabel");

  const apply = (theme) => {
    html.dataset.theme = theme;
    label.textContent = theme === "dark" ? "Dark" : "Light";
    toggle.setAttribute("aria-checked", String(theme === "dark"));
    try {
      localStorage.setItem("qapp_theme", theme);
    } catch {
      /* ok */
    }
  };

  try {
    const saved = localStorage.getItem("qapp_theme");
    if (saved) apply(saved);
  } catch {
    /* ok */
  }

  toggle.addEventListener("click", () => {
    apply(html.dataset.theme === "dark" ? "light" : "dark");
  });
}

// ─── DASHBOARD ──────────────────────────────────────────────────────────────

/**
 * Render the main dashboard from the registered modules.
 * Groups modules by topic and creates interactive cards.
 */
function renderDashboard() {
  const grid = $("#dashboardGrid");
  const modules = window.APP_MODULES || [];

  if (!modules.length) {
    grid.innerHTML = `<p class="empty-state">No test modules registered. Add data files and register them in index.html.</p>`;
    return;
  }

  // Group modules by topic
  const groups = modules.reduce((acc, mod) => {
    const t = mod.meta.topic;
    if (!acc[t]) acc[t] = { label: mod.meta.topicLabel, modules: [] };
    acc[t].modules.push(mod);
    return acc;
  }, {});

  grid.innerHTML = Object.entries(groups)
    .map(
      ([topic, group]) => `
    <section class="topic-group" aria-labelledby="group-${topic}">
      <div class="group-header">
        <div class="group-dot ${topic}"></div>
        <h2 id="group-${topic}" class="group-title">${esc(group.label)}</h2>
        <span class="group-count">${group.modules.length} test${group.modules.length !== 1 ? "s" : ""}</span>
      </div>
      <div class="cards-row">
        ${group.modules.map((mod) => buildDashboardCard(mod)).join("")}
      </div>
    </section>
  `,
    )
    .join("");

  // Attach click handlers
  $$(".test-card").forEach((card) => {
    card.addEventListener("click", () => {
      const modId = card.dataset.moduleId;
      const mod = modules.find((m) => m.meta.id === modId);
      if (mod) startExam(mod);
    });
    // Keyboard accessibility
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.click();
      }
    });
  });
}

function buildDashboardCard(mod) {
  const {
    id,
    testTitle,
    topic,
    difficulty,
    questionCount,
    estimatedMinutes,
    description,
    icon,
  } = mod.meta;
  const best = LS.getBest(id);

  const diffClass =
    { Beginner: "diff-easy", Intermediate: "diff-med", Advanced: "diff-hard" }[
      difficulty
    ] || "diff-med";

  const historyBadge = best
    ? `<div class="card-best" title="Your best score">
         <span class="best-icon">🏆</span>
         <span>${best.score}/${best.total} &nbsp;·&nbsp; ${best.pct}%</span>
       </div>`
    : `<div class="card-best untaken">Not attempted yet</div>`;

  return `
    <article
      class="test-card"
      data-module-id="${esc(id)}"
      data-topic="${esc(topic)}"
      role="button"
      tabindex="0"
      aria-label="Start ${esc(testTitle)}"
    >
      <div class="card-top">
        <span class="card-icon" aria-hidden="true">${icon}</span>
        <span class="card-badge ${topic}">${esc(mod.meta.topicLabel)}</span>
      </div>

      <h3 class="card-title">${esc(testTitle)}</h3>
      <p class="card-desc">${esc(description)}</p>

      <div class="card-meta">
        <span class="card-meta-item">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <circle cx="6" cy="6" r="5" stroke="currentColor" stroke-width="1.4"/>
            <path d="M6 3.5V6L7.5 7.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
          </svg>
          ${estimatedMinutes} min
        </span>
        <span class="card-meta-item">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <rect x="1" y="1" width="10" height="10" rx="2" stroke="currentColor" stroke-width="1.4"/>
            <path d="M4 6h4M4 8h2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
          </svg>
          ${questionCount} questions
        </span>
        <span class="card-meta-item ${diffClass}">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M2 9l3-4 2.5 2.5L10 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          ${esc(difficulty)}
        </span>
      </div>

      ${historyBadge}

      <div class="card-arrow" aria-hidden="true">→</div>
    </article>
  `;
}

// ─── EXAM MODE ──────────────────────────────────────────────────────────────

function startExam(mod) {
  // Check for an in-progress session for this same module
  const existingSession = LS.restoreSession();
  if (existingSession && State.activeModule?.meta.id === mod.meta.id) {
    // Resume with previously stored answers
  } else {
    State.activeModule = mod;
    State.answers = {};
    LS.saveSession();
  }

  renderExam();
  showView("exam");
}

function renderExam() {
  const mod = State.activeModule;
  const container = $("#examContainer");
  const titleEl = $("#examTitle");
  const metaEl = $("#examMeta");

  titleEl.textContent = mod.meta.testTitle;
  metaEl.textContent = `${mod.meta.questionCount} questions · ${mod.meta.estimatedMinutes} min · ${mod.meta.difficulty}`;

  container.innerHTML = mod.questions
    .map((q, idx) => buildQuestionBlock(q, idx))
    .join("");

  // Restore any pre-existing answers (e.g. after page refresh)
  Object.entries(State.answers).forEach(([qId, optIdx]) => {
    if (optIdx === null || optIdx === undefined) return;
    const card = container.querySelector(`[data-question-id="${qId}"]`);
    if (!card) return;
    const opt = card.querySelector(`[data-option-idx="${optIdx}"]`);
    if (opt) opt.classList.add("selected");
  });

  // Attach option-click handlers
  $$(".option-btn", container).forEach((btn) => {
    btn.addEventListener("click", handleOptionClick);
  });

  updateProgress();
}

function buildQuestionBlock(q, idx) {
  const contextHtml = q.code
    ? `<div class="q-code-block"><strong class="context-label">Code</strong><pre><code>${esc(q.code)}</code></pre></div>`
    : q.scenario
      ? `<div class="q-scenario"><strong class="context-label">Scenario</strong>${esc(q.scenario)}</div>`
      : "";

  const optionsHtml = q.options
    .map(
      (opt, i) => `
    <li>
      <button
        class="option-btn"
        data-question-id="${esc(q.id)}"
        data-option-idx="${i}"
        type="button"
        aria-pressed="false"
      >
        <span class="opt-letter" aria-hidden="true">${String.fromCharCode(65 + i)}</span>
        <span class="opt-text">${esc(opt)}</span>
      </button>
    </li>
  `,
    )
    .join("");

  return `
    <div class="question-block" data-question-id="${esc(q.id)}" id="q-block-${esc(q.id)}">
      <div class="q-number-row">
        <span class="q-number">Q${String(idx + 1).padStart(2, "0")}</span>
      </div>
      ${contextHtml}
      <p class="q-text">${esc(q.question)}</p>
      <ul class="options-list" role="listbox" aria-label="Answer options">
        ${optionsHtml}
      </ul>
    </div>
  `;
}

function handleOptionClick(e) {
  const btn = e.currentTarget;
  const qId = btn.dataset.questionId;
  const optIdx = parseInt(btn.dataset.optionIdx, 10);

  // Deselect all options for this question
  const block = $(`[data-question-id="${qId}"].question-block`);
  const allBtns = $$(".option-btn", block);
  allBtns.forEach((b) => {
    b.classList.remove("selected");
    b.setAttribute("aria-pressed", "false");
  });

  // Select clicked option
  btn.classList.add("selected");
  btn.setAttribute("aria-pressed", "true");

  // Persist answer
  State.answers[qId] = optIdx;
  LS.saveSession();

  updateProgress();
}

function updateProgress() {
  const total = State.activeModule.questions.length;
  const answered = Object.values(State.answers).filter(
    (v) => v !== null && v !== undefined,
  ).length;
  const pct = Math.round((answered / total) * 100);

  const counter = $("#progressCounter");
  const bar = $("#progressBar");
  const submit = $("#submitBtn");

  if (counter) counter.textContent = `Answered ${answered} of ${total}`;
  if (bar) bar.style.width = `${pct}%`;
  if (submit) submit.disabled = answered === 0;
}

// ─── RESULTS ────────────────────────────────────────────────────────────────

function submitExam() {
  const mod = State.activeModule;
  const questions = mod.questions;

  // Calculate score
  let correct = 0;
  questions.forEach((q) => {
    if (State.answers[q.id] === q.correctIndex) correct++;
  });

  const total = questions.length;
  const pct = Math.round((correct / total) * 100);

  // Persist score
  LS.saveScore(mod.meta.id, correct, total);
  LS.clearSession();

  // Render results
  renderResults(mod, questions, correct, total, pct);
  showView("results");
}

function renderResults(mod, questions, correct, total, pct) {
  const header = $("#resultsHeader");
  const review = $("#reviewList");

  // ── Score ring ──
  const ringColor =
    pct >= 80
      ? "var(--clr-pass)"
      : pct >= 50
        ? "var(--clr-warn)"
        : "var(--clr-fail)";
  const grade =
    pct >= 80
      ? "Excellent"
      : pct >= 60
        ? "Good"
        : pct >= 40
          ? "Needs Work"
          : "Keep Practising";
  const ringCircumference = 2 * Math.PI * 54; // r=54
  const dashOffset = ringCircumference * (1 - pct / 100);

  header.innerHTML = `
    <div class="results-top">
      <div class="score-ring-wrap" role="img" aria-label="${correct} out of ${total} correct, ${pct} percent">
        <svg class="score-ring" viewBox="0 0 120 120" width="120" height="120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="var(--border)" stroke-width="8"/>
          <circle
            cx="60" cy="60" r="54" fill="none"
            stroke="${ringColor}" stroke-width="8"
            stroke-dasharray="${ringCircumference}"
            stroke-dashoffset="${dashOffset}"
            stroke-linecap="round"
            transform="rotate(-90 60 60)"
            class="ring-progress"
          />
        </svg>
        <div class="ring-inner">
          <span class="ring-pct" style="color:${ringColor}">${pct}<small>%</small></span>
        </div>
      </div>

      <div class="results-summary">
        <div class="results-grade" style="color:${ringColor}">${grade}</div>
        <h2 class="results-title">${esc(mod.meta.testTitle)}</h2>
        <p class="results-tally">${correct} correct out of ${total} questions</p>
        <div class="results-badges">
          <span class="rbadge">${esc(mod.meta.topicLabel)}</span>
          <span class="rbadge ${pct >= 80 ? "rbadge-pass" : pct >= 50 ? "rbadge-warn" : "rbadge-fail"}">${pct >= 80 ? "✓ Passed" : "✗ Failed"}</span>
        </div>
      </div>
    </div>
  `;

  // ── Review list ──
  review.innerHTML = questions
    .map((q, idx) => {
      const userIdx = State.answers[q.id];
      const isCorrect = userIdx === q.correctIndex;
      const isSkipped = userIdx === null || userIdx === undefined;

      const statusClass = isSkipped
        ? "status-skip"
        : isCorrect
          ? "status-pass"
          : "status-fail";
      const statusLabel = isSkipped
        ? "Skipped"
        : isCorrect
          ? "Correct"
          : "Incorrect";
      const statusIcon = isSkipped ? "—" : isCorrect ? "✓" : "✗";

      const contextHtml = q.code
        ? `<div class="rv-code"><pre><code>${esc(q.code)}</code></pre></div>`
        : q.scenario
          ? `<div class="rv-scenario">${esc(q.scenario)}</div>`
          : "";

      const optionsHtml = q.options
        .map((opt, i) => {
          let cls = "rv-opt";
          if (i === q.correctIndex) cls += " rv-correct";
          if (i === userIdx && !isCorrect) cls += " rv-wrong";
          if (i === userIdx && isCorrect) cls += " rv-user-correct";
          const marker =
            i === q.correctIndex
              ? "✓"
              : i === userIdx && !isCorrect
                ? "✗"
                : String.fromCharCode(65 + i);
          return `<div class="${cls}"><span class="rv-opt-marker">${marker}</span><span>${esc(opt)}</span></div>`;
        })
        .join("");

      return `
      <div class="review-item ${statusClass}">
        <div class="rv-header">
          <span class="rv-num">Q${String(idx + 1).padStart(2, "0")}</span>
          <div class="rv-status ${statusClass}">
            <span class="rv-status-icon">${statusIcon}</span>
            <span>${statusLabel}</span>
          </div>
        </div>
        ${contextHtml}
        <p class="rv-question">${esc(q.question)}</p>
        <div class="rv-options">${optionsHtml}</div>
        <div class="rv-explanation">
          <strong>Explanation:</strong> ${esc(q.explanation)}
        </div>
      </div>
    `;
    })
    .join("");
}

// ─── BACK NAVIGATION ────────────────────────────────────────────────────────

function goToDashboard() {
  LS.clearSession();
  State.activeModule = null;
  State.answers = {};
  renderDashboard(); // refresh scores on cards
  showView("dashboard");
}

// ─── CONFIRM SUBMIT MODAL ───────────────────────────────────────────────────

function openSubmitModal() {
  const total = State.activeModule.questions.length;
  const answered = Object.values(State.answers).filter(
    (v) => v !== null && v !== undefined,
  ).length;
  const unanswered = total - answered;

  const modal = $("#submitModal");
  const message = $("#modalMessage");

  message.textContent =
    unanswered > 0
      ? `You have ${unanswered} unanswered question${unanswered !== 1 ? "s" : ""}. Are you sure you want to submit?`
      : `You have answered all ${total} questions. Ready to submit?`;

  modal.hidden = false;
  modal.setAttribute("aria-hidden", "false");
  $("#modalConfirmBtn").focus();
}

function closeSubmitModal() {
  const modal = $("#submitModal");
  modal.hidden = true;
  modal.setAttribute("aria-hidden", "true");
}

// ─── BOOT ───────────────────────────────────────────────────────────────────

function boot() {
  initTheme();

  // Wire up global action buttons
  $("#submitBtn")?.addEventListener("click", openSubmitModal);
  $("#modalConfirmBtn")?.addEventListener("click", () => {
    closeSubmitModal();
    submitExam();
  });
  $("#modalCancelBtn")?.addEventListener("click", closeSubmitModal);
  $("#submitModal")?.addEventListener("click", (e) => {
    if (e.target === $("#submitModal")) closeSubmitModal();
  });

  // Back buttons
  $$(".back-to-dashboard").forEach((btn) =>
    btn.addEventListener("click", goToDashboard),
  );

  // Check for a persisted in-progress session
  if (LS.restoreSession()) {
    renderExam();
    showView("exam");
  } else {
    renderDashboard();
    showView("dashboard");
  }
}

// Run after DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
