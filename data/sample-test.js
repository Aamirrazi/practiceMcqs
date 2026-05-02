/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  TEST MODULE — sample-test.js                               ║
 * ╚══════════════════════════════════════════════════════════════╝
 * Step 1 — Update the `meta` block.
 * Step 2 — Add your questions to the `questions` array.
 * Step 3 — Register the file in data/manifest.js
 */
registerTest({
  meta: {
    id:              "sample-test",
    testTitle:       "Sample Test Module",
    topic:           "general",
    topicLabel:      "General",
    difficulty:      "Beginner",
    questionCount:   3,
    estimatedMinutes: 5,
    description:     "A template module demonstrating all supported question types — scenario-based, code-based, and standalone.",
    icon:            "📝",
  },

  questions: [
    {
      id: "sample-01",
      scenario:
        "A junior developer pushes code that breaks the main branch. " +
        "The CI pipeline turns red and the entire team is blocked from merging " +
        "any further work until the issue is resolved. The on-call engineer is " +
        "currently unavailable, and the release is scheduled in two hours.",
      question: "What is the FIRST action a senior engineer should take to unblock the team?",
      options: [
        "Immediately revert the offending commit using git revert so the main branch is green again.",
        "Run the full test suite locally on the broken branch to reproduce the failure before touching anything.",
        "Raise a P1 incident ticket and page the on-call engineer to take ownership of the problem.",
        "Open a pull request with a speculative fix without reviewing the CI logs or error output.",
      ],
      correctIndex: 0,
      explanation:
        "A fast `git revert` unblocks the entire team immediately — it is a safe, non-destructive operation that creates a new commit reversing the bad changes. Debugging and root-cause analysis can then happen safely on a feature branch without impacting everyone else's velocity or risking the release window.",
    },

    {
      id: "sample-02",
      code: `const result = [1, 2, 3].reduce((acc, n) => acc + n, 0);
console.log(result);`,
      question: "What value is printed to the console when this code executes?",
      options: [
        "0 — the initial accumulator value is returned unchanged.",
        "3 — only the last element is accumulated.",
        "6 — all elements are summed starting from the initial value of 0.",
        "undefined — reduce returns undefined when an initial value is provided.",
      ],
      correctIndex: 2,
      explanation:
        "Array.prototype.reduce iterates over every element and passes the running total (accumulator) into the next call. Starting from the initial value of 0: 0+1=1, 1+2=3, 3+3=6. The final accumulated value 6 is assigned to `result` and printed.",
    },

    {
      id: "sample-03",
      question:
        "Which HTTP method is semantically correct for creating a brand-new resource on a REST API when the server assigns the resource identifier?",
      options: [
        "GET — retrieves existing representations; safe and idempotent.",
        "PUT — replaces an existing resource at a known URI entirely.",
        "POST — submits data to the server, which creates a new resource and returns its URI.",
        "PATCH — applies a partial update to an already existing resource.",
      ],
      correctIndex: 2,
      explanation:
        "POST is the standard method for resource creation when the server determines the new resource's identifier. The server responds with 201 Created and a Location header pointing to the new resource. PUT is used when the client already knows the full target URI and wants to replace it completely.",
    },
  ],
});
