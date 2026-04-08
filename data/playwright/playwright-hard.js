const PlaywrightHardTest = {
  meta: {
    id: "playwright-hard-1",
    testTitle: "Playwright Advanced Techniques (Part 1)",
    topic: "playwright",
    topicLabel: "Playwright Advanced",
    difficulty: "Hard",
    questionCount: 20,
    estimatedMinutes: 30,
    description:
      "Evaluates knowledge of complex XPath axes, custom fixtures, context isolation, and advanced test configuration.",
    icon: "🔥",
  },
  questions: [
    {
      id: "ph-01",
      scenario:
        "You are designing tests for a highly secure web app where user session isolation is critical. You must simulate two users chatting with each other simultaneously.",
      question:
        "Which Playwright concept is BEST suited for simulating multiple isolated users in the same test?",
      options: [
        "Using multiple `page` fixtures.",
        "Creating multiple `BrowserContext` objects via the `browser` fixture.",
        "Launching two separate `Browser` instances.",
        "Using the `--workers=2` CLI flag.",
      ],
      correctIndex: 1,
      explanation:
        "A BrowserContext provides an isolated browser session (like an incognito window). Creating multiple contexts from the raw browser object allows you to simulate multiple isolated users in a single test. [cite: 57, 160, 172]",
    },
    {
      id: "ph-02",
      code: "const test = base.extend<{ loggedInPage: any }>({ \n  loggedInPage: async ({ page }, use) => {\n    await page.goto('/login');\n    await use(page);\n    await page.click('#logout');\n  }\n});",
      question:
        "What is the primary architectural benefit of utilizing custom fixtures as shown in the code?",
      options: [
        "They replace the need for `playwright.config.ts`.",
        "They execute code faster by bypassing the CDP protocol.",
        "They eliminate code duplication by encapsulating setup/teardown logic (like login) so it can be reused across tests.",
        "They allow Playwright to test desktop applications.",
      ],
      correctIndex: 2,
      explanation:
        "Custom fixtures eliminate code duplication. By extending base fixtures, you can define setup and teardown logic (like logging in and out) once, and reuse that state across any test that requests the fixture. [cite: 182, 194]",
    },
    {
      id: "ph-03",
      question:
        "What mechanism does Playwright use to communicate with Firefox and WebKit browsers?",
      options: [
        "WebDriver Protocol",
        "DevTools Protocol (CDP)",
        "A custom WebSocket protocol",
        "Native OS-level threading",
      ],
      correctIndex: 2,
      explanation:
        "While Playwright uses the DevTools Protocol (CDP) for Chromium, it utilizes a custom WebSocket protocol for communicating with Firefox and WebKit. [cite: 65]",
    },
    {
      id: "ph-04",
      code: "//table/tbody/tr[td[normalize-space()='Active']]",
      question: "What does this advanced XPath expression target?",
      options: [
        "All 'Active' text nodes inside a table.",
        "A table row (`tr`) that contains a cell (`td`) with the exact, whitespace-trimmed text 'Active'.",
        "A cell (`td`) containing the text 'Active'.",
        "The tbody element if it is active.",
      ],
      correctIndex: 1,
      explanation:
        "This complex XPath finds a table row (`tr`) strictly based on the condition that one of its child cells (`td`) has the text 'Active' (ignoring surrounding whitespace using `normalize-space()`). [cite: 434, 435]",
    },
    {
      id: "ph-05",
      scenario:
        "You are debugging a flaky test where a navigation click occasionally fails because the network is still resolving background requests.",
      question:
        "How can you explicitly instruct Playwright to wait for the page network to settle after a navigation?",
      options: [
        "await page.waitForLoadState('networkidle');",
        "await page.waitForTimeout(5000);",
        "await page.goto('url', { wait: 'all' });",
        "await page.waitForNavigation();",
      ],
      correctIndex: 0,
      explanation:
        "You can wait for navigation to complete and for network activity to settle by using `await page.waitForLoadState('networkidle');` or passing `{ waitUntil: 'networkidle' }` to `page.goto()`. [cite: 304, 312]",
    },
    {
      id: "ph-06",
      question:
        "Which of the following describes the difference between `test.fail()` and `test.skip()`?",
      options: [
        "`test.fail()` stops the test runner entirely, while `test.skip()` bypasses the file.",
        "`test.fail()` marks a test as a 'known bug' and expects it to fail; if it passes, the test runner flags an error. `test.skip()` simply doesn't run the test.",
        "`test.skip()` retries the test upon failure, while `test.fail()` does not.",
        "They are identical and used interchangeably.",
      ],
      correctIndex: 1,
      explanation:
        "The `test.fail()` annotation is used to mark a test as a known bug, meaning it is expected to fail. The `test.skip()` annotation simply prevents the test from running at all. [cite: 248, 254, 256]",
    },
    {
      id: "ph-07",
      code: "//ul/li[count(preceding-sibling::li) = 2]",
      question: "Which element does this XPath evaluate to?",
      options: [
        "The 2nd `<li>` element in the list.",
        "The 3rd `<li>` element in the list.",
        "All `<li>` elements that have exactly 2 children.",
        "The first two `<li>` elements in the list.",
      ],
      correctIndex: 1,
      explanation:
        "This count-based XPath looks for a list item that is preceded by exactly 2 sibling list items, making it the 3rd `<li>` element. [cite: 438]",
    },
    {
      id: "ph-08",
      question:
        "If developers at your company agree to add custom, stable attributes specifically for automation, which locator strategy is considered the MOST stable?",
      options: ["getByText", "getByLabel", "getByTestId", "getByRole"],
      correctIndex: 2,
      explanation:
        "The `getByTestId` locator is considered the most stable option when developers add `data-testid` attributes to key elements specifically for testing purposes. [cite: 375, 441]",
    },
    {
      id: "ph-09",
      code: "await page.evaluate(() => window.scrollTo(0, 500));",
      question: "What is the purpose of `page.evaluate` in this context?",
      options: [
        "To intercept a network request.",
        "To assert the page state.",
        "To execute raw JavaScript directly within the browser's page context.",
        "To take a screenshot of the scrolled area.",
      ],
      correctIndex: 2,
      explanation:
        "The `page.evaluate()` method allows you to execute native JavaScript (like `window.scrollTo`) directly within the context of the rendered web page. [cite: 337]",
    },
    {
      id: "ph-10",
      question:
        "When is it MORE appropriate to use XPath over CSS selectors in Playwright?",
      options: [
        "When you need faster execution times.",
        "When targeting an element by a stable ID.",
        "When you need to navigate UP the DOM (e.g., to a parent or ancestor) or handle complex relationships.",
        "When you need to select elements by class name.",
      ],
      correctIndex: 2,
      explanation:
        "XPath is necessary and appropriate when you need to navigate UP the DOM hierarchy (using parent/ancestor axes), match by text conditionally, or handle complex sibling relationships, which CSS cannot do easily. [cite: 440]",
    },
    {
      id: "ph-11",
      scenario:
        "You are setting up Playwright tracing to ensure you have maximum debugging data in your CI pipeline, but you don't want to waste storage space on tests that pass on the first try.",
      question: "Which `playwright.config.ts` setting achieves this?",
      options: [
        "trace: 'on'",
        "trace: 'retain-on-failure'",
        "trace: 'on-first-retry'",
        "trace: 'off'",
      ],
      correctIndex: 2,
      explanation:
        "Setting `trace: 'on-first-retry'` in the config ensures that trace data is only captured if a test fails its initial run and requires a retry, saving storage space while still providing debug data for failures. [cite: 111, 350]",
    },
    {
      id: "ph-12",
      code: "test('annotated test', {\n  annotation: [\n    { type: 'issue', description: 'https://jira.com/ISSUE-123' }\n  ]\n}, async ({ page }) => { ... });",
      question:
        "What is the primary function of the metadata added in this code block?",
      options: [
        "It acts as an automatic assertion that fails if the Jira API is down.",
        "It automatically updates the Jira ticket state when the test passes.",
        "It adds declarative metadata to the test report to link the test logic with external systems or documentation.",
        "It skips the test if the Jira ticket is closed.",
      ],
      correctIndex: 2,
      explanation:
        "Test annotations allow you to add metadata (like linking an issue URL or a feature description) which provides context and is included in the test execution reports. [cite: 269, 270, 271, 272]",
    },
    {
      id: "ph-13",
      question:
        "Which XPath axis targets all sibling elements that appear *before* the current node in the DOM?",
      options: [
        "following-sibling::",
        "preceding-sibling::",
        "ancestor::",
        "descendant::",
      ],
      correctIndex: 1,
      explanation:
        "The `preceding-sibling::` axis selects all sibling nodes that appear before the current node in the document. [cite: 413]",
    },
    {
      id: "ph-14",
      scenario:
        "You need to locate an input field that sits immediately after a `<label>` containing the exact text 'Username'.",
      question: "Which XPath expression accurately captures this relationship?",
      options: [
        "//label[text()='Username']/descendant::input",
        "//label[text()='Username']/following-sibling::input[1]",
        "//label[text()='Username']/parent::input",
        "//input/ancestor::label[text()='Username']",
      ],
      correctIndex: 1,
      explanation:
        "To find an input that is immediately next to a label, you locate the label by text and traverse to the first input sibling using `/following-sibling::input[1]`. [cite: 419, 420]",
    },
    {
      id: "ph-15",
      code: "await context.tracing.start({ screenshots: true, snapshots: true });\n// ... run steps\nawait context.tracing.stop({ path: 'trace.zip' });",
      question:
        "What command is required to view the artifact generated by this programmatic trace?",
      options: [
        "npx playwright show-report trace.zip",
        "npx playwright open trace.zip",
        "npx playwright show-trace trace.zip",
        "npx playwright trace view trace.zip",
      ],
      correctIndex: 3,
      explanation:
        "To view a generated trace file, you use the CLI command `npx playwright trace view trace.zip`. [cite: 288, 297]",
    },
    {
      id: "ph-16",
      question:
        "What effect does calling `test.slow()` have on a specific test?",
      options: [
        "It forces the browser to throttle network speeds to 'Slow 3G'.",
        "It triples the default timeout for that specific test.",
        "It adds artificial delays between every action (like a slow-motion mode).",
        "It moves the test to the end of the execution queue.",
      ],
      correctIndex: 1,
      explanation:
        "The `test.slow()` annotation marks a test as slow, which automatically multiplies its configured timeout limit by 3. [cite: 262, 263]",
    },
    {
      id: "ph-17",
      question:
        "Which node library is responsible for the core browser management layer in Playwright's architecture?",
      options: [
        "puppeteer-core",
        "playwright-core",
        "webdriverio",
        "@playwright/test",
      ],
      correctIndex: 1,
      explanation:
        "In the architecture overview, the `playwright-core` component represents the core Node.js library responsible for browser management. [cite: 66]",
    },
    {
      id: "ph-18",
      code: "test('context fixture', async ({ context }) => {\n  const page1 = await context.newPage();\n  const page2 = await context.newPage();\n});",
      question: "Regarding session data, how do `page1` and `page2` interact?",
      options: [
        "They are completely isolated and share no cookies.",
        "They share cookies and local storage because they are spawned within the same `context`.",
        "They run in entirely different browser processes.",
        "One operates in incognito mode, while the other does not.",
      ],
      correctIndex: 1,
      explanation:
        "Pages created from the exact same BrowserContext share state, meaning `page1` and `page2` share cookies and local storage within that context. [cite: 173, 174, 175, 176, 177, 180]",
    },
    {
      id: "ph-19",
      question:
        "What CLI command allows you to automatically generate a test script by recording your live browser interactions?",
      options: [
        "npx playwright record",
        "npx playwright codegen <URL>",
        "npx playwright generate",
        "npx playwright test --record",
      ],
      correctIndex: 1,
      explanation:
        "You can generate code and record a test script automatically by running the `npx playwright codegen URL` command. [cite: 148, 149, 287, 296]",
    },
    {
      id: "ph-20",
      code: "await page.setInputFiles('#upload', 'path/to/file.pdf');",
      question: "What Playwright action does this execute?",
      options: [
        "It downloads a PDF from the page.",
        "It intercepts a network response and replaces it with a local PDF.",
        "It uploads a local file to a file input element.",
        "It asserts that an uploaded file matches a local file.",
      ],
      correctIndex: 2,
      explanation:
        "The `page.setInputFiles()` method is used to upload local files to `<input type='file'>` elements on a web page. [cite: 334, 335]",
    },
  ],
};
