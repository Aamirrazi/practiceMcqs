/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║          SAMPLE TEST MODULE — COPY & CUSTOMISE              ║
 * ║  File naming convention: {topic}-{level}.js                 ║
 * ║  Examples: web-dev-level1.js | sql-basics.js | react-q1.js  ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * Step 1 — Update the `meta` block.
 * Step 2 — Add your questions to the `questions` array.
 * Step 3 — Register the module in index.html (see comment there).
 */
const SampleTest = {
  // ─── META ────────────────────────────────────────────────────────────────
  // This block powers the Dashboard card and colour-coding system.
  meta: {
    id: "sample-test", // Unique identifier — no spaces
    testTitle: "Sample Test Module", // Displayed as card title
    topic: "custom", // Matches a CSS class for colour accent
    topicLabel: "Custom Topic", // Human-readable label shown on badge
    difficulty: "Beginner", // Beginner | Intermediate | Advanced
    questionCount: 3, // Should match questions.length
    estimatedMinutes: 5, // Shown on the dashboard card
    description: "A template module. Replace this with your test description.",
    icon: "📝", // Emoji displayed on the dashboard card
  },

  // ─── QUESTIONS ───────────────────────────────────────────────────────────
  // Each question supports THREE context types — pick ONE per question:
  //   1. `scenario` : a plain text paragraph describing a situation
  //   2. `code`     : a code snippet (displayed in a monospace block)
  //   3. (neither)  : just a standalone question — both fields can be omitted
  questions: [
    // ── Example 1: Scenario-based question ──────────────────────────────
    {
      id: "sample-01", // Unique question ID (used internally)
      scenario:
        "A junior developer pushes code that breaks the main branch. " +
        "The CI pipeline turns red and the team is blocked.",
      question: "What is the FIRST action a senior engineer should take?",
      options: [
        "Immediately revert the offending commit using git revert.", // index 0
        "Run the full test suite locally to reproduce the failure.", // index 1
        "Raise a P1 incident ticket and page the on-call engineer.", // index 2
        "Open a pull request with the fix without reviewing the CI logs.", // index 3
      ],
      correctIndex: 0, // Zero-based index of the correct option above
      explanation:
        "A fast git revert unblocks the team immediately. Debugging and root-cause " +
        "analysis can happen safely on a branch without impacting everyone else.",
    },

    // ── Example 2: Code-based question ──────────────────────────────────
    {
      id: "sample-02",
      code: "const result = [1, 2, 3].reduce((acc, n) => acc + n, 0);",
      question: "What value does `result` hold after this expression executes?",
      options: ["0", "3", "6", "undefined"],
      correctIndex: 2,
      explanation:
        "Array.reduce accumulates values using the callback. Starting from 0 (the " +
        "initial value), it computes 0+1=1, 1+2=3, 3+3=6.",
    },

    // ── Example 3: Standalone question (no scenario or code) ────────────
    {
      id: "sample-03",
      question:
        "Which HTTP method is semantically correct for creating a new resource?",
      options: ["GET", "PUT", "POST", "PATCH"],
      correctIndex: 2,
      explanation:
        "POST is the standard method for creating new resources. PUT is used for " +
        "full replacement of an existing resource, and PATCH for partial updates.",
    },
  ],
};
