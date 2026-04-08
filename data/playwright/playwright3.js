const PlaywrightWeek3Set1 = {
  meta: {
    id: "playwright-w3-set1",
    testTitle: "Playwright Week 3: Configuration & Architecture",
    topic: "playwright",
    topicLabel: "Week 3 - Set 1",
    difficulty: "Intermediate",
    questionCount: 20,
    estimatedMinutes: 25,
    description:
      "Covers utility functions, Playwright configuration, hooks, and basic Page Object Model concepts.",
    icon: "⚙️",
  },
  questions: [
    {
      id: "pw3-1-01",
      question:
        "What is the primary purpose of a 'barrel file' (index.ts) in a Playwright utility folder?",
      options: [
        "To compile TypeScript into JavaScript.",
        "To re-export everything from a directory, giving consumers a single import path.",
        "To store global environment variables.",
        "To run tests sequentially.",
      ],
      correctIndex: 1,
      explanation:
        "A barrel file re-exports everything from a directory, giving consumers a single import path (e.g., `import { loginUser } from '../utils'`).",
    },
    {
      id: "pw3-1-02",
      code: "export async function waitAndClick(page: Page, selector: string, timeout = 5000) {\n  const el = page.locator(selector);\n  await el.waitFor({ state: 'visible', timeout });\n  await el.click();\n}",
      question:
        "In the provided utility function, what happens if the element is not visible within 5000 milliseconds?",
      options: [
        "The script will click a hidden element.",
        "The script will ignore the step and continue to the next action.",
        "The `waitFor` method will throw a timeout error, failing the test.",
        "The timeout will automatically double to 10000ms.",
      ],
      correctIndex: 2,
      explanation:
        "The `waitFor({ state: 'visible', timeout })` command explicitly waits for the element to be visible. If it isn't within the specified timeout, it throws an error.",
    },
    {
      id: "pw3-1-03",
      question:
        "Which array in `playwright.config.ts` allows you to execute the exact same tests across Chromium, Firefox, and WebKit without modifying the test files?",
      options: ["browsers", "use", "projects", "environments"],
      correctIndex: 2,
      explanation:
        "Cross-browser testing is achieved through the `projects` array in the configuration file; no extra code is needed in the tests.",
    },
    {
      id: "pw3-1-04",
      scenario:
        "You have a test file with 10 tests, and you need to ensure they execute one after another in strict order rather than simultaneously.",
      question: "How do you enforce file-level serial execution in Playwright?",
      options: [
        "Add `test.describe.configure({ mode: 'serial' });` at the top of the test file.",
        "Run the CLI command `npx playwright test --serial`.",
        "Set `fullyParallel: false` inside the specific test block.",
        "Use a `beforeEach` hook to pause execution.",
      ],
      correctIndex: 0,
      explanation:
        "To force serial execution in a specific file only, you use `test.describe.configure({ mode: 'serial' });`.",
    },
    {
      id: "pw3-1-05",
      question:
        "Which Playwright hook runs exactly once before all tests in a `describe` block?",
      options: ["beforeEach", "beforeAll", "setup", "init"],
      correctIndex: 1,
      explanation:
        "The `beforeAll` hook runs once before all tests in the block, often used for expensive setup like seeding a database.",
    },
    {
      id: "pw3-1-06",
      scenario:
        "You want to attach a screenshot to the Playwright HTML report every time a specific important action (like placing an order) happens, regardless of whether the test passes or fails.",
      question: "How can you manually attach a screenshot to the HTML report?",
      options: [
        "Change `screenshot: 'on'` in the config file.",
        "Use `await page.screenshot({ report: true });`.",
        "Capture the screenshot bytes and use `await testInfo.attach('name', { body, contentType })`.",
        "Use `console.log(await page.screenshot());`.",
      ],
      correctIndex: 2,
      explanation:
        "You can manually attach screenshots at any point using `testInfo.attach()` by providing the screenshot bytes and the content type 'image/png'.",
    },
    {
      id: "pw3-1-07",
      code: "test('Slow integration test', async ({ page }) => {\n  test.slow();\n  // test logic\n});",
      question:
        "What is the specific effect of adding `test.slow()` inside a test block?",
      options: [
        "It slows down browser actions by 500ms to allow for visual debugging.",
        "It moves the test to the end of the execution queue.",
        "It triples the configured timeout for that specific test automatically.",
        "It sets the network emulation to 'Slow 3G'.",
      ],
      correctIndex: 2,
      explanation:
        "The annotation `test.slow()` automatically triples the timeout for that specific test.",
    },
    {
      id: "pw3-1-08",
      question: "What is Playwright Trace?",
      options: [
        "A real-time video stream of the test execution.",
        "A ZIP file that records a full timeline of a test, including network requests, DOM snapshots, and console logs.",
        "A command line tool to generate TypeScript types.",
        "A database that stores historical test results.",
      ],
      correctIndex: 1,
      explanation:
        "Playwright Trace is a ZIP file that records a full timeline of your test: every action, network request, DOM snapshot, screenshot, and console log.",
    },
    {
      id: "pw3-1-09",
      scenario:
        "Your test is failing on CI, and you want to open the Playwright Inspector GUI locally to step through the test line by line.",
      question:
        "Which environment variable command opens the Playwright Inspector before each action?",
      options: [
        "INSPECT=true npx playwright test",
        "PWDEBUG=1 npx playwright test",
        "PLAYWRIGHT_INSPECT=1 npx playwright test",
        "npx playwright test --gui",
      ],
      correctIndex: 1,
      explanation:
        "Running `PWDEBUG=1 npx playwright test` opens the Playwright Inspector and pauses before each action.",
    },
    {
      id: "pw3-1-10",
      code: "export class LoginPage {\n  constructor(page: Page) {\n    this.page = page;\n    this.submitBtn = page.locator('button[type=submit]');\n  }\n}",
      question:
        "In the Page Object Model (POM) pattern, what is the primary purpose of the class constructor?",
      options: [
        "To execute the login API call.",
        "To wait for the page to load completely.",
        "To initialize the page instance and define the locators as class properties.",
        "To attach the HTML reporter.",
      ],
      correctIndex: 2,
      explanation:
        "In POM, the constructor is used to pass in the `Page` object and assign locators to class properties (e.g., `this.submitBtn = page.locator(...)`).",
    },
    {
      id: "pw3-1-11",
      question:
        "Which underlying protocol does Playwright use to communicate with and control the Chromium browser?",
      options: [
        "WebDriver Protocol",
        "Chrome DevTools Protocol (CDP)",
        "JSON Wire Protocol",
        "WebSocket DOM Protocol",
      ],
      correctIndex: 1,
      explanation:
        "Playwright uses the Chrome DevTools Protocol (CDP) for Chromium, and equivalent protocols for Firefox and WebKit.",
    },
    {
      id: "pw3-1-12",
      question:
        "How can you programmatically detect if a test is currently running as a retry attempt after a failure?",
      options: [
        "By checking the boolean `test.isRetry()`.",
        "By examining the value of `test.info().retry`.",
        "By catching an exception in the `beforeEach` hook.",
        "By checking `process.env.RETRY`.",
      ],
      correctIndex: 1,
      explanation:
        "You can use `test.info().retry` to detect whether a test is being retried and take conditional action (e.g., `if (test.info().retry > 0)`).",
    },
    {
      id: "pw3-1-13",
      scenario:
        "You want your tests to run headless in CI, but visibly (headed) on your local machine for debugging.",
      question:
        "Which CLI flag overrides the configuration to run tests in headed mode?",
      options: ["--ui", "--show-browser", "--headed", "--visible"],
      correctIndex: 2,
      explanation:
        "The `--headed` flag runs tests in headed (visible) mode, overriding the `headless: true` config.",
    },
    {
      id: "pw3-1-14",
      code: "test.use({ locale: 'fr-FR', timezoneId: 'Europe/Paris' });\ntest('French locale checkout', async ({ page }) => { ... });",
      question:
        "What is the scope of the configuration override shown in this snippet?",
      options: [
        "It applies to all tests in the entire project.",
        "It applies to all tests in the current file.",
        "It is an inline option override that applies only to the tests immediately following it in the specific block.",
        "It only applies to Firefox tests.",
      ],
      correctIndex: 2,
      explanation:
        "Using `test.use()` allows individual tests or suites to override global config (like viewport or locale) for that specific block.",
    },
    {
      id: "pw3-1-15",
      question:
        "Why might a testing team store an `auth/admin.json` file generated by `npx playwright codegen`?",
      options: [
        "To back up the test database.",
        "To store API mocking definitions.",
        "To save authenticated storage state so tests can skip the login UI flow and run much faster.",
        "To configure parallel worker limits.",
      ],
      correctIndex: 2,
      explanation:
        "Storing `auth/admin.json` allows tests to use a pre-logged-in state via `storageState`, allowing tests to skip the login flow and run faster.",
    },
    {
      id: "pw3-1-16",
      question:
        "What is the recommended approach to listen for and log unhandled page errors directly from the browser context?",
      options: [
        "Wrap every Playwright action in a try/catch block.",
        "Use `page.on('pageerror', err => console.error(err.message));`.",
        "Check the HTML report after execution.",
        "Use the `expect().toThrow()` assertion on page load.",
      ],
      correctIndex: 1,
      explanation:
        "You can listen to console messages and page errors from the browser using event listeners like `page.on('pageerror', ...)`.",
    },
    {
      id: "pw3-1-17",
      scenario:
        "You want to completely disable test timeouts while debugging locally to prevent the test runner from killing your session while you inspect elements.",
      question: "Which CLI option achieves this?",
      options: ["--timeout=0", "--no-timeout", "--debug-wait", "--infinite"],
      correctIndex: 0,
      explanation:
        "The flag `--timeout=0` disables the test timeout, providing an infinite wait useful for debugging.",
    },
    {
      id: "pw3-1-18",
      question: "What does `test.describe` do in Playwright?",
      options: [
        "It executes the tests inside it in parallel.",
        "It groups related tests into a suite, which can be nested and carry its own configuration.",
        "It generates documentation from comments.",
        "It skips all tests within the block.",
      ],
      correctIndex: 1,
      explanation:
        "Playwright uses `test.describe()` to group related tests into a suite, which can be nested and carry its own configuration, annotations, and hooks.",
    },
    {
      id: "pw3-1-19",
      question:
        "According to the framework architecture, what does a `BrowserContext` represent?",
      options: [
        "The physical machine running the test.",
        "An isolated browser session, similar to an incognito window, ensuring no state leaks between tests.",
        "The HTML reporter output.",
        "A single UI element on a page.",
      ],
      correctIndex: 1,
      explanation:
        "Each test gets an isolated browser context (like an incognito window), ensuring no state leaks between tests.",
    },
    {
      id: "pw3-1-20",
      code: "await context.tracing.stop({ path: 'traces/checkout.zip' });",
      question:
        "Once a trace file like `checkout.zip` is generated, how do you view it locally?",
      options: [
        "Extract the ZIP and open `index.html` in Chrome.",
        "Run `npx playwright show-trace traces/checkout.zip`.",
        "Upload it to the Playwright cloud dashboard.",
        "Run `npx playwright test --trace`.",
      ],
      correctIndex: 1,
      explanation:
        "You can open the trace viewer for a specific trace file by running the CLI command `npx playwright show-trace traces/checkout.zip`.",
    },
  ],
};

const PlaywrightWeek3Set2 = {
  meta: {
    id: "playwright-w3-set2",
    testTitle: "Playwright Week 3: Advanced Architecture & Customization",
    topic: "playwright",
    topicLabel: "Week 3 - Set 2",
    difficulty: "Advanced",
    questionCount: 25,
    estimatedMinutes: 35,
    description:
      "Scenario-based evaluation of custom fixtures, complex hook orchestration, parallel worker constraints, and trace configurations.",
    icon: "🔥",
  },
  questions: [
    {
      id: "pw3-2-01",
      scenario:
        "You are setting up CI/CD. You want the test suite to retry failed tests twice, but locally on your machine, you want tests to fail immediately without retrying.",
      question:
        "How can you configure `playwright.config.ts` to dynamically handle this?",
      options: [
        "retries: process.env.CI ? 2 : 0",
        "retries: { ci: 2, local: 0 }",
        "retries: test.info().isCI ? 2 : 0",
        "You must maintain two separate config files.",
      ],
      correctIndex: 0,
      explanation:
        "In the config, you can use Node's environment variables to set retries dynamically: `retries: process.env.CI ? 2 : 0`.",
    },
    {
      id: "pw3-2-02",
      code: "test.afterEach(async ({ page }, testInfo) => {\n  if (testInfo.status !== testInfo.expectedStatus) {\n    const screenshot = await page.screenshot();\n    await testInfo.attach('failure-screenshot', { body: screenshot, contentType: 'image/png' });\n  }\n});",
      question: "What is the exact purpose of this `afterEach` hook?",
      options: [
        "It takes a screenshot after every single test, regardless of outcome.",
        "It conditionally captures and attaches a screenshot to the HTML report ONLY if the test fails or behaves unexpectedly.",
        "It retries the test if the status is unexpected.",
        "It modifies the HTML report template to include images.",
      ],
      correctIndex: 1,
      explanation:
        "The conditional `if (testInfo.status !== testInfo.expectedStatus)` ensures the screenshot logic only executes and attaches to the report if the test fails.",
    },
    {
      id: "pw3-2-03",
      scenario:
        "You have a `beforeAll` hook that creates an admin user in your database using an API request. You have an `afterAll` hook to delete that user.",
      question:
        "If a test inside the `describe` block fails and crashes, what happens to the `afterAll` hook?",
      options: [
        "It is bypassed, leaving the test data in the database.",
        "It runs regardless, ensuring resources created in `beforeAll` are cleaned up.",
        "It prompts the user to manually intervene.",
        "It retries the entire test suite.",
      ],
      correctIndex: 1,
      explanation:
        "`afterAll` runs once after all tests in the block complete (or fail), making it the designated place to clean up resources created in `beforeAll`.",
    },
    {
      id: "pw3-2-04",
      code: "export const test = base.extend<Fixtures>({\n  loginPage: async ({ page }, use) => {\n    const lp = new LoginPage(page);\n    await lp.goto();\n    await use(lp);\n  }\n});",
      question:
        "In this custom fixture code, what is the purpose of the `use(lp)` call?",
      options: [
        "It asserts that the login page loaded correctly.",
        "It pauses the test runner until the page is fully interactive.",
        "It provides the initialized `LoginPage` instance to the test function, yielding execution to the test.",
        "It imports the `LoginPage` class into the current file.",
      ],
      correctIndex: 2,
      explanation:
        "In custom fixtures, `use(lp)` yields the execution to the test, providing the instantiated fixture object (`lp`) to the test function.",
    },
    {
      id: "pw3-2-05",
      scenario:
        "You want to capture Trace Viewer data only when a test fails and has to be retried. If it passes on the first try, you don't want to waste disk space.",
      question:
        "Which `trace` configuration setting achieves this exact behavior?",
      options: [
        "trace: 'retain-on-failure'",
        "trace: 'on-first-retry'",
        "trace: 'on-failure'",
        "trace: 'retry-only'",
      ],
      correctIndex: 1,
      explanation:
        "Setting `trace: 'on-first-retry'` ensures the trace is only recorded if the initial test fails and the test runner executes a retry.",
    },
    {
      id: "pw3-2-06",
      question:
        "What does the configuration property `forbidOnly: !!process.env.CI` do?",
      options: [
        "It forbids running tests in serial mode on CI.",
        "It forces all tests to run in isolation.",
        "It fails the build on CI if a developer accidentally committed a test marked with `test.only()`.",
        "It prevents multiple workers from accessing the same file.",
      ],
      correctIndex: 2,
      explanation:
        "The `forbidOnly` config fails the build on CI if you accidentally left `test.only` in your code, preventing the suite from skipping other tests in production.",
    },
    {
      id: "pw3-2-07",
      code: "export function generateUser(overrides?: Partial<UserData>): UserData {\n  const ts = Date.now();\n  return { name: `Test ${ts}`, email: `user${ts}@test.com`, ...overrides };\n}",
      question:
        "How does the `overrides?: Partial<UserData>` parameter benefit this data generation utility?",
      options: [
        "It forces the user to provide all properties of `UserData`.",
        "It prevents the timestamp from being generated.",
        "It allows the caller to optionally pass specific fields to override the defaults, while auto-generating the rest.",
        "It throws a TypeScript error if invalid data is generated.",
      ],
      correctIndex: 2,
      explanation:
        "The `Partial<UserData>` allows the caller to selectively pass specific properties to override the defaults (spread via `...overrides`), while keeping the auto-generated ones.",
    },
    {
      id: "pw3-2-08",
      scenario:
        "You notice that tests are interfering with each other's data when running in parallel. You suspect they are sharing the exact same browser context.",
      question:
        "According to Playwright's architecture, is this suspicion correct?",
      options: [
        "Yes, all parallel workers share one global BrowserContext.",
        "No, each test gets an isolated browser context, ensuring no state leaks between tests.",
        "Yes, but only if they are in the same file.",
        "No, but they share the same local storage.",
      ],
      correctIndex: 1,
      explanation:
        "Playwright's architecture ensures that each test gets an isolated browser context (like an incognito window), ensuring no state leaks between tests.",
    },
    {
      id: "pw3-2-09",
      question:
        "If your GitHub Actions CI machine has 2 CPU cores, what is the default behavior if you configure `workers: 4`?",
      options: [
        "Playwright will crash due to resource exhaustion.",
        "Playwright will ignore the config and default to 1 worker.",
        "Playwright will spin up 4 worker threads, though it may cause context switching overhead on a 2-core machine.",
        "Playwright will mock the extra cores using virtual threads.",
      ],
      correctIndex: 2,
      explanation:
        "The `workers` property controls the number of worker threads. You can set it to a specific number (like 4), but usually, it's tied to CPUs (e.g., `process.env.CI ? 2 : undefined`). Setting it higher forces more threads.",
    },
    {
      id: "pw3-2-10",
      code: "test.beforeAll(async ({ request }) => {\n  await request.post('/api/users', { data: user });\n});",
      question:
        "What is the primary architectural advantage of seeding data via `request.post` in a hook rather than completing the UI registration flow?",
      options: [
        "API requests are visually logged in the HTML report.",
        "It bypasses CORS restrictions entirely.",
        "It drastically speeds up test execution and setup reliability by avoiding UI flakiness for preconditions.",
        "It creates a new BrowserContext.",
      ],
      correctIndex: 2,
      explanation:
        "Seeding test data via API (`request.post`) before tests run is a best practice because it is much faster and less flaky than driving the UI to set up preconditions.",
    },
    {
      id: "pw3-2-11",
      scenario: "You want to organize your custom POMs (Page Object Models).",
      question:
        "Which of the following is NOT a standard practice when implementing a Playwright Page Object class?",
      options: [
        "Passing the `Page` object into the class constructor.",
        "Defining locators as `readonly` class properties.",
        "Using `test.step` inside the POM to define test metadata.",
        "Creating asynchronous methods to encapsulate interactions (e.g., `async login()`).",
      ],
      correctIndex: 2,
      explanation:
        "While the guide defines passing the Page object, defining readonly locators, and creating async methods, `test.step` is a test runner feature and normally belongs in the spec file, not deeply coupled inside the POM class structure.",
    },
    {
      id: "pw3-2-12",
      question:
        "Which command line syntax is used to execute only tests that have the `@smoke` tag in their description?",
      options: [
        "npx playwright test --tag @smoke",
        "npx playwright test -t @smoke",
        'npx playwright test --grep "@smoke"',
        "npx playwright test @smoke",
      ],
      correctIndex: 2,
      explanation:
        'The CLI flag `--grep "pattern"` (e.g., `--grep "@smoke"`) is used to run only tests matching a specific pattern.',
    },
    {
      id: "pw3-2-13",
      code: "test('Known bug - skip for now', async ({ page }) => {\n  test.skip(true, 'BUG-1234: Payment gateway down');\n  // ...\n});",
      question: "What happens when the test runner encounters this block?",
      options: [
        "It runs the test, but marks it as a failure immediately.",
        "It completely bypasses the test logic and annotates the report with the skipped reason.",
        "It pauses the runner waiting for user input.",
        "It retries the test continuously until the bug is fixed.",
      ],
      correctIndex: 1,
      explanation:
        "`test.skip(condition, description)` bypasses the test and annotates the test report with the provided reason.",
    },
    {
      id: "pw3-2-14",
      scenario:
        "Your test suite includes a barrel file `utils/index.ts` containing: `export * from './dateUtils';`. Another file `test.spec.ts` imports a function from it.",
      question: "What is the primary benefit of this module structure?",
      options: [
        "It reduces the compiled size of the TypeScript code.",
        "It allows the consumer to use a single import path `import { func } from '../utils'` instead of mapping multiple deep file paths.",
        "It prevents circular dependencies.",
        "It forces the functions to run synchronously.",
      ],
      correctIndex: 1,
      explanation:
        "A barrel file gives consumers a single import path, so they don't have to write multiple import statements for different files in the same directory.",
    },
    {
      id: "pw3-2-15",
      question:
        "In Playwright, what is the role of the `expect()` function as defined in the framework architecture?",
      options: [
        "It mocks HTTP requests.",
        "It handles auto-retrying, async-aware assertions.",
        "It manages the browser session.",
        "It orchestrates the test scheduling.",
      ],
      correctIndex: 1,
      explanation:
        "In the architecture overview, the `expect()` layer is responsible for 'Auto-retrying, async-aware assertions'.",
    },
    {
      id: "pw3-2-16",
      code: "const rows = page.locator(`${tableSelector} tbody tr`);\nconst count = await rows.count();",
      question: "Why does `rows.count()` require an `await`?",
      options: [
        "Because `count()` is a network request to the DOM.",
        "Because counting elements requires evaluating the state of the live browser DOM asynchronously.",
        "Because it is a Playwright hook.",
        "It doesn't require `await`; it is synchronous.",
      ],
      correctIndex: 1,
      explanation:
        "Interacting with locators to read state (like `.count()`) sends a command via the CDP to the browser to evaluate the live DOM, which is an asynchronous operation.",
    },
    {
      id: "pw3-2-17",
      scenario:
        "You want your HTML report to output to a specific folder named `playwright-report` and never open automatically when tests finish.",
      question: "How do you configure this in `playwright.config.ts`?",
      options: [
        "reporter: ['html', { outputFolder: 'playwright-report', open: 'never' }]",
        "reporter: 'html-quiet'",
        "outputDir: 'playwright-report', reportOpen: false",
        "reporter: ['html', { autoOpen: false }]",
      ],
      correctIndex: 0,
      explanation:
        "The reporter configuration array accepts an options object: `reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]]`.",
    },
    {
      id: "pw3-2-18",
      question:
        "What is the main difference between `beforeAll` and `beforeEach`?",
      options: [
        "`beforeAll` receives the `page` fixture, `beforeEach` does not.",
        "`beforeAll` runs once per file, `beforeEach` runs once per line of code.",
        "`beforeAll` runs once before all tests in a describe block, whereas `beforeEach` runs before every individual test.",
        "`beforeAll` only works with API contexts, `beforeEach` works with UI contexts.",
      ],
      correctIndex: 2,
      explanation:
        "`beforeAll` runs exactly once before all tests in the block. `beforeEach` runs before every individual test.",
    },
    {
      id: "pw3-2-19",
      code: "await page.evaluate(() => localStorage.removeItem('cart'));",
      question:
        "Placed inside an `afterEach` hook, what does this snippet accomplish?",
      options: [
        "It deletes a file named 'cart' from the project directory.",
        "It executes JavaScript inside the browser context to clear the 'cart' item from LocalStorage, resetting state for the next test.",
        "It asserts that the cart is empty.",
        "It intercepts a network call to the cart endpoint.",
      ],
      correctIndex: 1,
      explanation:
        "`page.evaluate()` runs native JS in the browser to manipulate `localStorage`, clearing the cart to ensure a clean state for the next test.",
    },
    {
      id: "pw3-2-20",
      scenario:
        "You created a `LoginPage` POM and imported it into your test. Instead of instantiating `new LoginPage(page)` in every single test, you want it automatically provided as an argument like `async ({ loginPage }) => {}`.",
      question: "What Playwright feature enables this pattern?",
      options: [
        "Global Setup",
        "Test Annotations",
        `Custom Fixtures via "test.extend"`,
        "Barrel Files",
      ],
      correctIndex: 2,
      explanation: `Playwright fixtures extend the test object ("test.extend") to automatically instantiate and inject page objects into tests as arguments.`,
    },
    {
      id: "pw3-2-21",
      question:
        "If a developer writes `await page.pause()` in their test script, what is the expected behavior when running `npx playwright test`?",
      options: [
        "The test will pause for 30 seconds and then time out.",
        "The test will pause indefinitely, opening the Playwright Inspector GUI if running locally.",
        "The browser will disconnect from the CDP.",
        "The test will capture a trace snapshot.",
      ],
      correctIndex: 1,
      explanation:
        "`page.pause()` inserts a breakpoint in the test code, pausing execution and opening the Playwright Inspector.",
    },
    {
      id: "pw3-2-22",
      question:
        "Which of the following describes the recommended project structure for storing JSON test data files according to the guide?",
      options: [
        "Place them directly inside the `pages/` directory.",
        "Store them in the `tests/e2e/` folder next to the specs.",
        "Create a dedicated `test-data/` directory at the project root.",
        "Embed them directly inside `playwright.config.ts`.",
      ],
      correctIndex: 2,
      explanation:
        "The recommended project structure lists a `test-data/` folder at the root for storing JSON test data files (e.g., `users.json`).",
    },
    {
      id: "pw3-2-23",
      code: "const res = await fetch(`${this.baseUrl}/users/${id}`);\nreturn res.json();",
      question:
        "In the context of the `ApiClient` utility class shown in the material, what does this method do?",
      options: [
        "It uses the Playwright `request` fixture to make an API call.",
        "It intercepts a network response from the UI.",
        "It uses standard Node.js/Browser `fetch` to retrieve user data based on the initialized base URL.",
        "It mocks the user data endpoint.",
      ],
      correctIndex: 2,
      explanation:
        "The provided `ApiClient` example uses the standard `fetch` API combined with template literals to make a call to `${this.baseUrl}/users/${id}` and returns the parsed JSON.",
    },
    {
      id: "pw3-2-24",
      scenario:
        "You configure `video: 'retain-on-failure'` in your `playwright.config.ts`.",
      question: "When does Playwright actually record the video?",
      options: [
        "Only when the test runner detects a failure.",
        "It records video for all tests, but immediately deletes the video file if the test passes, retaining it only for failures.",
        "It only records video on CI machines.",
        "It prompts the user to start recording if a failure occurs.",
      ],
      correctIndex: 1,
      explanation:
        "The `retain-on-failure` option tells the browser to record the video for every test, but it discards the artifact upon success and retains it only if the test fails.",
    },
    {
      id: "pw3-2-25",
      question:
        "When creating custom fixtures, you define a type like `type Fixtures = { loginPage: LoginPage }`. Why is this TypeScript interface important?",
      options: [
        "It tells Playwright how to allocate memory.",
        "It provides type safety and autocomplete in your IDE when destructuring `{ loginPage }` in your test parameters.",
        "It converts the fixture into a CommonJS module.",
        "It is required by the Chrome DevTools Protocol.",
      ],
      correctIndex: 1,
      explanation:
        "Providing a TypeScript interface to `test.extend<Fixtures>` ensures type safety, meaning your IDE knows exactly what methods and properties `loginPage` has when you use it in a test.",
    },
  ],
};
