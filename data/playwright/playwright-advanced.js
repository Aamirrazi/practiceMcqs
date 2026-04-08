/**
 * DATA MODULE: Playwright Advanced Concepts
 * -------------------------------------------------
 * Each module exports a single object with:
 *   - meta   : test metadata used by the Dashboard
 *   - questions : array of question objects
 *
 * To create a new module, duplicate this file, update the
 * meta block, and populate the questions array.
 */
const PlaywrightAdvanced = {
  meta: {
    id: "playwright-advanced-1",
    testTitle: "Playwright: Advanced Concepts (Part 1)",
    topic: "playwright", // used for colour-coding
    topicLabel: "Playwright",
    difficulty: "Advanced",
    questionCount: 20,
    estimatedMinutes: 25,
    description:
      "Locators, fixtures, async patterns, network interception, POM, and debugging strategies.",
    icon: "🎭",
  },

  questions: [
    {
      id: "pw-01",
      scenario:
        "An input field's ID attribute changes randomly on every page reload, but it always features an associated <label> reading 'Email Address'.",
      question:
        "Which Playwright locator is the most resilient approach to select this input?",
      options: [
        "page.locator('input[type=\"email\"]')",
        "page.getByLabel('Email Address')",
        "page.locator('//form/div/input[1]')",
        "page.locator('#email_field_9876')",
      ],
      correctIndex: 1,
      explanation:
        "Playwright recommends semantic, user-facing locators like getByLabel over CSS or XPath for maximum stability, especially when HTML attributes are highly dynamic.",
    },
    {
      id: "pw-02",
      code: "test('example', async ({ page, context }) => {\n  // test body\n});",
      question:
        "In the context of Playwright fixtures, what exactly does the `context` parameter represent?",
      options: [
        "The global configuration settings loaded from playwright.config.ts.",
        "The underlying Node.js runtime environment for executing test scripts.",
        "An isolated browser session that behaves similarly to an incognito window.",
        "A completely fresh physical browser process launched just for this test.",
      ],
      correctIndex: 2,
      explanation:
        "The context fixture provides a BrowserContext, which is a fast, isolated browser session that shares no cookies, cache, or local storage with other contexts.",
    },
    {
      id: "pw-03",
      scenario:
        "After submitting a form, a success banner takes an unpredictable amount of time (1 to 4 seconds) to animate onto the screen.",
      question:
        "How should you correctly verify that this banner eventually appears?",
      options: [
        "Insert await page.waitForTimeout(5000) before checking.",
        "Write a custom JavaScript while-loop to poll the DOM state.",
        "Use await expect(page.locator('.banner')).toBeVisible().",
        "Rely on the implicit wait of page.locator('.banner').isVisible().",
      ],
      correctIndex: 2,
      explanation:
        "Playwright's web-first assertions (like toBeVisible) automatically poll and retry until the condition is met or the global timeout expires, avoiding brittle hardcoded sleeps.",
    },
    {
      id: "pw-04",
      code: "await expect.soft(page.locator('.error-msg')).toBeVisible();\nawait page.getByRole('button', { name: 'Continue' }).click();",
      question:
        "What is the specific runtime effect of using `.soft` in this assertion block?",
      options: [
        "The test execution aborts immediately upon failure of the assertion.",
        "The assertion is completely ignored if the element is not found.",
        "The test retries the assertion infinitely without timing out.",
        "The test continues executing but is marked as failed at the end.",
      ],
      correctIndex: 3,
      explanation:
        "Soft assertions log the failure but do not throw an immediate exception. This allows the script to continue running subsequent steps, reporting all collected failures at the end.",
    },
    {
      id: "pw-05",
      scenario:
        "You are explaining Playwright's core architecture to a junior developer who is migrating tests from an older tool like Selenium.",
      question:
        "How does Playwright communicate directly with the underlying browser processes?",
      options: [
        "By utilizing the standardized W3C WebDriver REST API protocol.",
        "By injecting a custom JavaScript library directly into the webpage.",
        "By using the DevTools Protocol (CDP) and custom WebSockets.",
        "By running native OS-level macro commands to simulate clicks.",
      ],
      correctIndex: 2,
      explanation:
        "Playwright uses a modern client-server architecture communicating via the DevTools Protocol (CDP) for Chromium and custom WebSocket protocols for Firefox and WebKit.",
    },
    {
      id: "pw-06",
      scenario:
        "A user action triggers a native JavaScript alert() popup. Your script lacks specific code to handle it.",
      question:
        "What is Playwright's default behavior when encountering an unhandled native dialog?",
      options: [
        "It automatically clicks the 'OK' button and proceeds immediately.",
        "It automatically clicks 'Cancel' and logs a warning to the console.",
        "The test execution pauses and hangs indefinitely waiting for user input.",
        "It instantly fails the test and throws a 'Dialog Intercepted' exception.",
      ],
      correctIndex: 2,
      explanation:
        "Native browser dialogs require explicit handling via the page.on('dialog', handler) listener. Without a listener to accept or dismiss it, the browser waits, and the test will eventually time out.",
    },
    {
      id: "pw-07",
      code: "await page.route('**/api/v1/config', route => {\n  route.fulfill({ status: 200, body: '{\"theme\":\"dark\"}' });\n});",
      question:
        "What is the primary technical purpose of utilizing the `page.route()` method above?",
      options: [
        "To test the application's UI behavior independently of the real backend API.",
        "To permanently modify the production database records during test execution.",
        "To bypass strict browser cross-origin resource sharing (CORS) security policies.",
        "To dynamically change the test suite's baseURL depending on the environment.",
      ],
      correctIndex: 0,
      explanation:
        "Network interception allows you to intercept outgoing requests and provide mocked responses. This makes UI tests faster and less flaky by removing dependencies on backend stability.",
    },
    {
      id: "pw-08",
      scenario:
        "Your web application embeds a secure, third-party payment gateway inside an <iframe> tag. You need to type a credit card number.",
      question:
        "How must you interact with the input field located inside this embedded frame?",
      options: [
        "page.locator('iframe > input[name=\"card\"]').fill('1111');",
        "page.frameLocator('#gateway').getByLabel('Card').fill('1111');",
        "page.switchToWindow('gateway'); page.fill('#card', '1111');",
        "page.getByLabel('Card Number').fill('1111', { force: true });",
      ],
      correctIndex: 1,
      explanation:
        "Elements inside an iframe cannot be queried directly from the main page context. You must use page.frameLocator() to explicitly target the iframe before locating elements within it.",
    },
    {
      id: "pw-09",
      scenario:
        "Your team wants to modularize setup steps (like logging in) to avoid code duplication across 100 different test files.",
      question:
        "What is the primary architectural advantage of creating and utilizing Custom Fixtures?",
      options: [
        "They allow developers to execute Playwright tests natively on iOS/Android devices.",
        "They completely replace the need for maintaining a playwright.config.ts file.",
        "They enable compiling test scripts into multiple different programming languages.",
        "They encapsulate reusable setup logic, such as authentication, reducing code duplication.",
      ],
      correctIndex: 3,
      explanation:
        "Custom fixtures extend base fixtures to create reusable environments. For example, a `loggedInPage` fixture executes the login flow once and provides the authenticated page to any test that requests it.",
    },
    {
      id: "pw-10",
      scenario:
        "You have a JSON array containing 15 different user credential sets. You want to execute the same login test scenario for every user.",
      question:
        "What is the recommended Data-Driven Testing (DDT) approach in Playwright?",
      options: [
        "Copy and paste the test() function block 15 times, changing variables manually.",
        "Iterate over the JSON array using a for...of loop enclosing a single test() block.",
        "Set the parallel workers configuration value to 15 in the playwright.config.ts file.",
        "Pass the entire JSON array directly into a single page.fill() method call.",
      ],
      correctIndex: 1,
      explanation:
        "By wrapping a test() block inside a standard JavaScript loop over an array of data, Playwright dynamically generates and reports a separate, distinct test execution for each dataset.",
    },
    {
      id: "pw-11",
      code: "await page.getByLabel('Country').selectOption({ value: 'US' });",
      question:
        "Which specific type of HTML element is the `selectOption` method designed to interact with?",
      options: [
        "A standardized group of linked radio button input elements.",
        "A custom-built dropdown menu constructed using unordered lists.",
        "A native HTML <select> element containing <option> tags.",
        "An auto-suggest text input field powered by a backend API.",
      ],
      correctIndex: 2,
      explanation:
        "The selectOption() method works exclusively with native <select> elements. Custom React/Angular dropdowns typically require explicitly clicking the container and then clicking the desired option element.",
    },
    {
      id: "pw-12",
      scenario:
        "You are implementing the Page Object Model (POM) pattern to improve test maintainability across a suite of 100 automated scripts.",
      question:
        "In a standard POM class, where should element locators ideally be initialized?",
      options: [
        "Directly inside the top level of each individual *.spec.ts test file.",
        "Inside the global use configuration block in playwright.config.ts.",
        "As read-only properties assigned within the Page Object's constructor.",
        "Inside a shared JSON test-data file imported at the top of the script.",
      ],
      correctIndex: 2,
      explanation:
        "In POM, locators are defined as class properties and initialized in the constructor (e.g., `this.loginBtn = page.getByRole('button')`). This keeps locators centralized and decoupled from the actual test logic.",
    },
    {
      id: "pw-13",
      scenario:
        "A test fails randomly in CI/CD. You need to inspect DOM snapshots, network requests, and console logs from the exact moment of failure.",
      question:
        "When debugging a flaky test failure, what specific diagnostic assets does Playwright's Trace Viewer provide?",
      options: [
        "Only high-resolution screenshots captured at the exact moment of failure.",
        "A continuous MP4 video recording of the browser's graphical execution.",
        "Navigable DOM snapshots, detailed network requests, and console logs.",
        "Backend server performance metrics, including CPU and memory utilization.",
      ],
      correctIndex: 2,
      explanation:
        "A Playwright trace is a comprehensive debugging artifact containing a timeline of action execution, complete DOM snapshots for time-travel debugging, network logs, and console output.",
    },
    {
      id: "pw-14",
      code: "test.skip(browserName === 'webkit', 'Feature unsupported on Safari');",
      question:
        "What is the functional consequence of placing this code inside your test block?",
      options: [
        "It prevents the Playwright CLI from downloading the WebKit browser binaries.",
        "It automatically marks the test execution as failed when run on WebKit.",
        "It prevents the test from executing when the configured browser is WebKit.",
        "It dynamically bypasses all expect() assertions if the browser is WebKit.",
      ],
      correctIndex: 2,
      explanation:
        "Conditional test annotations like test.skip() evaluate the provided condition at runtime. If true, the test runner gracefully skips the test block without marking it as a failure.",
    },
    {
      id: "pw-15",
      scenario:
        "A specialized UI component requires the user to hold down the 'Control' key while clicking on a specific data grid row.",
      question:
        "How do you accurately simulate this complex mouse interaction in Playwright?",
      options: [
        "await page.keyboard.down('Control'); await page.click('.grid-row');",
        "await page.click('.grid-row', { modifiers: ['Control'] });",
        "await page.locator('.grid-row').press('Control+Click');",
        "await page.mouse.click(100, 200, { keys: ['Control'] });",
      ],
      correctIndex: 1,
      explanation:
        "Playwright's action methods (like click) accept an options object where you can pass an array of keyboard modifiers (Control, Shift, Alt) to simulate complex combined user inputs natively.",
    },
    {
      id: "pw-16",
      code: "const [newPage] = await Promise.all([\n  context.waitForEvent('page'),\n  page.getByRole('link', { name: 'Help' }).click()\n]);",
      question:
        "Why is the `Promise.all` construct absolutely necessary in this code snippet?",
      options: [
        "To ensure the browser does not unexpectedly close the original active tab.",
        "To verify the subsequent click occurs only after the new page fully loads.",
        "To simultaneously click and listen, preventing race condition event misses.",
        "To execute both asynchronous commands across multiple parallel test workers.",
      ],
      correctIndex: 2,
      explanation:
        "If you await the click first, the 'page' event might fire before the listener is registered. Promise.all executes both concurrently, ensuring the listener is ready before the click triggers the new tab.",
    },
    {
      id: "pw-17",
      scenario:
        "You prefer not to manually type out locators and want a tool to actively record your browser interactions and generate code.",
      question:
        "Which Playwright CLI tool opens an interactive browser that converts your manual actions into test scripts?",
      options: [
        "npx playwright test --ui",
        "npx playwright show-report",
        "npx playwright install",
        "npx playwright codegen",
      ],
      correctIndex: 3,
      explanation:
        "The `codegen` command launches the Playwright Inspector alongside an interactive browser. It records user actions and translates them directly into robust Playwright locators and methods.",
    },
    {
      id: "pw-18",
      scenario:
        "You need to scroll a lengthy webpage downwards to trigger lazy-loaded images, without relying on specific element coordinates.",
      question:
        "Which native keyboard action is best suited for achieving this page scroll?",
      options: [
        "await page.keyboard.press('PageDown');",
        "await page.keyboard.type('ScrollDown');",
        "await page.keyboard.press('ArrowRight');",
        "await page.keyboard.press('Shift+Enter');",
      ],
      correctIndex: 0,
      explanation:
        "Pressing navigational keys like 'PageDown', 'End', or 'ArrowDown' leverages native browser behavior to scroll the document viewport without needing to inject custom window.scrollTo() JavaScript.",
    },
    {
      id: "pw-19",
      scenario:
        "You are establishing best practices for your automation team regarding resilient element selection strategies.",
      question:
        "According to official documentation, which locator is considered the most stable and resilient against UI changes?",
      options: [
        "page.getByRole()",
        "page.getByTestId()",
        "page.locator('.class-name')",
        "page.locator('//div/button')",
      ],
      correctIndex: 1,
      explanation:
        "getByTestId relies on custom data-attributes specifically implemented for testing purposes. Because they are decoupled from CSS classes, DOM structure, and visible text, they are the least likely to break.",
    },
    {
      id: "pw-20",
      code: "test.beforeAll(async () => {\n  await seedDatabase();\n});",
      question:
        "When exactly does the code inside the `beforeAll` hook execute during a test suite run?",
      options: [
        "It executes immediately before every single test case within the file.",
        "It executes concurrently alongside the very first test in the execution queue.",
        "It executes exactly once per worker process before any tests begin running.",
        "It executes exactly once globally, regardless of how many workers are active.",
      ],
      correctIndex: 2,
      explanation:
        "test.beforeAll runs once per worker process. It is typically used for heavy, one-time setup tasks like database seeding, contrasting with beforeEach which runs prior to every individual test block.",
    },
  ],
};
