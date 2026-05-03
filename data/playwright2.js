/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  TEST MODULE — playwright-testing-set2.js                    ║
 * ║  30 Questions · Playwright Advanced & Specialised Topics    ║
 * ╚══════════════════════════════════════════════════════════════╝
 * Add to index.html:
 *   <script src="data/playwright-testing-set2.js"></script>
 * Add to window._TESTS / APP_MODULES:
 *   PlaywrightSet2,
 */
const PlaywrightSet2 = {
  meta: {
    id: "playwright-testing-set2",
    testTitle: "Playwright: Advanced Topics & Specialised Scenarios",
    topic: "playwright",
    topicLabel: "Playwright",
    difficulty: "Advanced",
    questionCount: 30,
    estimatedMinutes: 45,
    description:
      "30 advanced scenario-driven questions covering test sharding, keyboard interactions, dialogs, geolocation, clock mocking, soft assertions, parameterised tests, WebSocket interception, cross-browser strategy, component testing, and production-scale test architecture.",
    icon: "🎭",
  },

  questions: [
    // ── TEST SHARDING ────────────────────────────────────────────

    {
      id: "pw2-01",
      scenario:
        "A QA platform team runs a 1,200-test Playwright suite against a release candidate every night. " +
        "Even with 16 workers on a single CI machine, the full run takes 55 minutes — far beyond " +
        "the 15-minute feedback window the release manager requires. The team has budget for four " +
        "separate CI machines in parallel. An engineer proposes a strategy that distributes the " +
        "entire test suite across all four machines simultaneously, not just parallelises within one. " +
        "A colleague asks whether increasing `workers` further on the single machine achieves the same thing.",
      question:
        "What is the distinction between Playwright's `workers` setting and test sharding, and why does sharding across multiple CI machines solve a problem that more workers alone cannot?",
      options: [
        "Workers and sharding are aliases for the same feature — Playwright uses the term 'workers' when running locally and 'shards' when running on CI, but both distribute tests across the same pool of processes on the same operating system.",
        "Increasing workers beyond the machine's CPU core count is the correct approach because Playwright's async model means tests spend most of their time waiting on browser I/O rather than consuming CPU, making hyper-threading the primary lever for reducing total suite duration.",
        "Workers execute tests in parallel by spinning up multiple browser instances; sharding reduces the test count by deduplicating tests that share identical locators and assertions, removing redundant coverage automatically.",
        "Sharding splits the test suite into N equally-sized slices (`--shard=1/4`, `--shard=2/4`, etc.) that run on separate machines simultaneously; workers parallelise within a single machine's CPU cores. Adding more workers hits a diminishing return once all CPU cores are saturated, whereas sharding linearly scales by adding machines.",
      ],
      correctIndex: 3,
      explanation:
        "Workers parallelise within a single machine — bounded by CPU, memory, and network. Once all cores are saturated, more workers yield no further gain. Sharding is a horizontal scaling mechanism: `npx playwright test --shard=1/4` runs exactly one quarter of the suite. Four machines each running one shard complete the full suite in roughly one quarter of the single-machine time. A merge step (`npx playwright merge-reports`) recombines the four shard reports into a single HTML report for stakeholders.",
    },

    // ── KEYBOARD INTERACTIONS ────────────────────────────────────

    {
      id: "pw2-02",
      scenario:
        "An accessibility team at a government portal is writing Playwright tests to verify that " +
        "all critical workflows — submitting a tax form, navigating a multi-step wizard, and " +
        "dismissing notifications — can be completed entirely using a keyboard with no mouse interaction. " +
        "A junior engineer asks how Playwright simulates keyboard-only navigation, specifically " +
        "how to move focus between interactive elements in the order the page's tab order defines.",
      question:
        "What Playwright API accurately simulates a user pressing the Tab key to move focus between elements, and how should the test assert that focus has landed on the correct element?",
      options: [
        "Use `page.keyboard.press('Tab')` to advance focus to the next focusable element, then assert with `await expect(page.getByRole('button', { name: 'Submit' })).toBeFocused()` — which checks that the element currently holds keyboard focus.",
        "Use `page.locator(':focus').press('Tab')` to shift focus from the currently focused element, then call `page.evaluate(() => document.activeElement.tagName)` to retrieve the tag name of the newly focused element and assert it matches the expected element type.",
        "Playwright cannot simulate Tab key navigation because the browser's focus management is handled natively by the OS accessibility layer, which is outside Playwright's DevTools Protocol control surface.",
        "Use `page.focus('button[type=submit]')` to programmatically set focus on the target element without simulating keystrokes, then assert `document.activeElement === submitButton` via `page.evaluate()`.",
      ],
      correctIndex: 0,
      explanation:
        "`page.keyboard.press('Tab')` dispatches a genuine Tab keydown/keyup event that triggers the browser's native focus management, advancing focus exactly as a real user would. `expect(locator).toBeFocused()` is Playwright's web-first assertion for checking focus state — it retries until the element holds focus or the timeout expires. This combination correctly validates keyboard navigation order without bypassing the browser's actual focus handling.",
    },

    // ── DIALOGS ──────────────────────────────────────────────────

    {
      id: "pw2-03",
      scenario:
        "A QA engineer is automating a test for a project management tool. When a user clicks " +
        "'Delete Project,' the application triggers a native browser `confirm()` dialog asking " +
        "'Are you sure? This action cannot be undone.' The test needs to accept the dialog and " +
        "verify the project is removed from the list. When the engineer runs the test without " +
        "any dialog handling, Playwright auto-dismisses the dialog and the deletion never happens, " +
        "causing the assertion to fail.",
      question:
        "What is Playwright's mechanism for intercepting and responding to native browser dialogs like `alert`, `confirm`, and `prompt`, and what event must be registered before the action that triggers the dialog?",
      options: [
        "Playwright intercepts native dialogs automatically and always clicks the primary action button (OK/Accept) by default; engineers only need to add explicit dialog handlers when they want to dismiss or cancel the dialog instead of accepting it.",
        "Use `page.waitForEvent('dialog')` after the triggering action in a `Promise.all` call, then call `dialog.accept()` on the resolved dialog object — this guarantees the handler is active regardless of whether the dialog opens before or after the awaited action completes.",
        "Register a `page.on('dialog', dialog => dialog.accept())` listener before triggering the action that opens the dialog; if the handler is registered after the dialog opens, Playwright will have already auto-dismissed it and the handler will never fire.",
        "Native browser dialogs block all Playwright interactions; the correct approach is to mock `window.confirm` using `page.addInitScript()` to replace it with a function that always returns `true`, bypassing the dialog entirely without needing an event listener.",
      ],
      correctIndex: 2,
      explanation:
        "Playwright emits a `'dialog'` event on the page when a native dialog appears. The handler must be registered before the action that triggers the dialog — otherwise Playwright auto-dismisses it (by default) before the listener has a chance to respond. The `Promise.all` pattern (`[page.waitForEvent('dialog'), page.click()]`) is the race-condition-safe alternative when you're unsure of the exact timing, but a pre-registered `page.on('dialog', ...)` listener is simpler for straightforward cases.",
    },

    // ── FILE UPLOADS ─────────────────────────────────────────────

    {
      id: "pw2-04",
      scenario:
        "A QA engineer at a document processing startup is automating the test for a bulk CSV import feature. " +
        "Users select a file from their local filesystem via a standard `<input type='file'>` element, and the " +
        "application parses the CSV and renders a preview table. The engineer needs to simulate uploading a " +
        "specific test fixture file without any actual file system dialog appearing during the test run. " +
        "She also needs to verify that uploading a malformed CSV triggers the correct error banner.",
      question:
        "How does Playwright handle file uploads through a standard `<input type='file'>` element, and what approach allows testing error states without maintaining multiple fixture files on disk?",
      options: [
        "Use `inputLocator.setInputFiles(path)` to set one or more files directly on the input element without opening the OS dialog; for testing error states with malformed content, pass a `{ name, mimeType, buffer }` object to create an in-memory file without a physical fixture on disk.",
        "Playwright cannot interact with `<input type='file'>` elements because they are controlled by the OS file picker dialog, which is outside the browser's JavaScript sandbox; the recommended workaround is to drag-and-drop a file object created via `page.evaluate()`.",
        "Intercept the form's `submit` event using `page.route()` and inject a pre-built multipart body containing the fixture CSV bytes, bypassing the file input element entirely and simulating the server-side file upload directly.",
        "Use `page.keyboard.type(filePath)` after clicking the file input to type the absolute path into the OS dialog's filename field, which works across all operating systems because Playwright's keyboard emulation is OS-level.",
      ],
      correctIndex: 0,
      explanation:
        "`setInputFiles()` is Playwright's dedicated API for file inputs. It bypasses the OS dialog entirely and sets the file(s) directly on the element. For testing error paths without maintaining many fixture files, the `{ name: 'bad.csv', mimeType: 'text/csv', buffer: Buffer.from('malformed,data') }` overload creates an in-memory file object — the application receives it identically to a real upload. This is one of the cleanest Playwright patterns for data-driven upload testing.",
    },

    // ── DRAG AND DROP ────────────────────────────────────────────

    {
      id: "pw2-05",
      scenario:
        "An automation engineer is writing a test for a Kanban board where tasks are moved between " +
        "'To Do,' 'In Progress,' and 'Done' columns via drag and drop. She tries using `page.dragAndDrop()` " +
        "but finds it works on some browser/framework combinations and fails on others — specifically on " +
        "React Beautiful DnD and Sortable.js implementations where the drag logic listens to `pointerdown`, " +
        "`pointermove`, and `pointerup` events rather than the HTML5 drag-and-drop API.",
      question:
        "When `page.dragAndDrop()` fails for component-library drag implementations that use pointer events, what lower-level Playwright API gives engineers full control over the drag sequence?",
      options: [
        "Use `page.mouse.move()` combined with `page.mouse.down()` and `page.mouse.up()` to manually synthesise the pointer event sequence — move to the source element, hold the mouse button, move incrementally to the target coordinates, then release.",
        "Switch to Playwright's `page.touchscreen.tap()` API, which triggers the pointer event chain that component libraries expect, as touch events share the same underlying browser pointer model as mouse drag interactions.",
        "Use `page.dispatchEvent(selector, 'dragstart')` followed by `page.dispatchEvent(targetSelector, 'drop')` to fire the HTML5 drag events directly, bypassing Playwright's high-level drag API and triggering the component's event handlers at the DOM level.",
        "Drag-and-drop is fundamentally untestable with Playwright for React-based libraries; the correct approach is to add a keyboard shortcut to the application code that moves items between columns, then test the keyboard interaction instead.",
      ],
      correctIndex: 0,
      explanation:
        "The `page.mouse` API provides granular control: `mouse.move(x, y)` to position, `mouse.down()` to press, a series of `mouse.move()` calls to simulate dragging, and `mouse.up()` to release. Component libraries like React Beautiful DnD respond to `pointerdown`/`pointermove`/`pointerup` — which the mouse API dispatches correctly. `page.dragAndDrop()` uses the HTML5 drag-and-drop API (`dragstart`, `dragover`, `drop`), which is a different event system that many component libraries deliberately ignore.",
    },

    // ── GEOLOCATION MOCKING ──────────────────────────────────────

    {
      id: "pw2-06",
      scenario:
        "A QA team at a ride-sharing company needs to write automated tests for the 'Find drivers near me' " +
        "feature. The feature calls the browser's Geolocation API to get the user's current coordinates and " +
        "then queries the backend for nearby drivers. Testing this feature on CI is impossible with real GPS, " +
        "and the developers want to verify that the feature correctly renders drivers near specific test " +
        "coordinates — for example, central London at 51.5074° N, 0.1278° W.",
      question:
        "How does Playwright allow tests to control the coordinates returned by the browser's Geolocation API, and what context-level permission must also be granted for the mock to work?",
      options: [
        "Mock `navigator.geolocation.getCurrentPosition` using `page.addInitScript()` to replace the native implementation with a stub function that calls its success callback with the desired coordinates — no additional permissions are needed since the script runs before the page code.",
        "Playwright does not support geolocation mocking because the Geolocation API is classified as a hardware sensor, and Playwright's DevTools Protocol interface does not expose sensor simulation capabilities outside of headful browser mode.",
        "Intercept the backend API call using `page.route()` and return a mocked response containing pre-seeded driver locations near central London, bypassing the Geolocation API entirely since the coordinates are only used to construct the backend request URL.",
        "Set `geolocation: { latitude: 51.5074, longitude: -0.1278 }` in the browser context options or call `context.setGeolocation({ latitude, longitude })` at runtime, and grant the `'geolocation'` permission via `context.grantPermissions(['geolocation'])` — otherwise the browser denies the API call before returning mock coordinates.",
      ],
      correctIndex: 3,
      explanation:
        "Playwright provides first-class geolocation control at the BrowserContext level. `context.setGeolocation()` injects mock coordinates that the browser's Geolocation API returns to the page. Critically, `context.grantPermissions(['geolocation'])` must also be called — without it, the browser blocks the API access and the feature never requests coordinates. Both can be set in `browser.newContext({ geolocation: {...}, permissions: ['geolocation'] })` to apply from the first page load.",
    },

    // ── CLOCK / TIME MOCKING ─────────────────────────────────────

    {
      id: "pw2-07",
      scenario:
        "A QA engineer at an insurance company is testing the policy renewal notification system. " +
        "Policies expire exactly 30 days after purchase, and the system displays a 'Renew before expiry' " +
        "banner starting 7 days before expiration. Testing this in a real environment would require " +
        "waiting 23 days after creating a test policy — completely impractical for a CI pipeline that " +
        "runs on every merge. The engineer needs to make the browser believe it is 7 days before a " +
        "specific policy's expiration date without changing any application code.",
      question:
        "What Playwright API allows tests to control the browser's system clock, and what categories of time-dependent JavaScript APIs does it affect?",
      options: [
        "Playwright does not provide clock control; the standard approach is to pass a `testDate` query parameter in the URL and modify the application to read its 'current time' from this parameter in non-production environments, keeping test logic out of Playwright entirely.",
        "Use `page.addInitScript(() => { Date.now = () => fixedTimestamp; })` to replace `Date.now` before the application code runs, which covers most date-based UI logic without needing a dedicated Playwright clock API.",
        "Use `page.clock.setFixedTime(date)` or `page.clock.install({ time: date })` to freeze or advance the browser's clock; this intercepts `Date`, `setTimeout`, `setInterval`, `performance.now()`, and `requestAnimationFrame` timers — ensuring all time-dependent UI logic behaves as if running at the specified moment.",
        "Inject a fake clock by intercepting the application's date utility module using `page.route()` — replace the module's response with a patched version that returns a fixed timestamp, affecting all downstream date calculations without touching the browser's native `Date` object.",
      ],
      correctIndex: 2,
      explanation:
        "Playwright's `page.clock` API (added in Playwright 1.45) provides comprehensive time control. `clock.install({ time: new Date('2025-03-24') })` freezes the browser clock at that moment. Unlike patching `Date.now` alone, the clock API also controls `setTimeout` and `setInterval` — critical for testing countdowns, session timeouts, and polling intervals. `clock.fastForward(ms)` or `clock.tick(ms)` can advance time within a test to trigger timer-dependent logic.",
    },

    // ── CONSOLE LOG ASSERTIONS ───────────────────────────────────

    {
      id: "pw2-08",
      scenario:
        "A frontend monitoring team wants to add automated regression tests that verify their application " +
        "does not emit unexpected JavaScript errors or console warnings in production-critical user flows — " +
        "checkout, authentication, and payment. Currently these errors are only caught when customers report " +
        "them. The team wants Playwright tests to automatically fail if any `console.error` or uncaught " +
        "exception occurs during the tested flow, providing an early-warning layer in CI.",
      question:
        "How does a Playwright test intercept and assert on browser console messages and uncaught JavaScript exceptions within a test?",
      options: [
        "Playwright automatically fails any test where a `console.error` occurs in the browser; no additional configuration is needed because console error detection is part of Playwright's default assertion behaviour since version 1.30.",
        "Use `page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); })` to collect console messages, and `page.on('pageerror', err => errors.push(err.message))` for uncaught exceptions; assert that the `errors` array is empty after the flow completes.",
        "Use `page.evaluate(() => window.onerror = (msg) => console.log(msg))` to redirect uncaught errors to the console, then call `page.evaluate(() => console.history)` at the end of the test to retrieve a complete log of all console output.",
        "Playwright's `expect(page).toHaveNoConsoleErrors()` matcher runs at the end of every test automatically when `failOnConsoleError: true` is set in `playwright.config.ts`, without requiring any event listeners in individual test files.",
      ],
      correctIndex: 1,
      explanation:
        "Playwright exposes two separate events for browser-side errors: `'console'` fires for all `console.*` calls (type can be `'error'`, `'warn'`, `'log'`, etc.) and `'pageerror'` fires for uncaught JavaScript exceptions that bubble to `window.onerror`. Registering listeners at the start of a test or in a fixture and collecting into an array, then asserting emptiness at the end, is the standard pattern. There is no built-in automatic failing on console errors — it must be explicitly wired.",
    },

    // ── SOFT ASSERTIONS ──────────────────────────────────────────

    {
      id: "pw2-09",
      scenario:
        "A QA team is writing a comprehensive test for a product detail page that validates multiple " +
        "independent UI elements: the product title, price, availability badge, image alt text, and " +
        "five customer review snippets. Currently, if the product title assertion fails, the test " +
        "stops immediately and the engineer has no visibility into whether the other nine elements " +
        "are also broken. After a deployment, the team needs to see all failures at once to " +
        "accurately scope the blast radius of a regression.",
      question:
        "What Playwright assertion mechanism allows all assertions in a test to execute and collect failures without stopping at the first failure, and how is the final pass/fail state reported?",
      options: [
        "Wrap each assertion in an individual `try/catch` block and push error messages to an array; at the end of the test, check if the array is empty and call `test.fail()` if it is not — this provides a full list of failures without using any Playwright-specific API.",
        "Use `test.step('assert title', async () => { ... })` for each assertion; steps that fail are marked as failed in the report but do not halt subsequent steps, giving a step-level breakdown of which assertions passed and which failed.",
        "Set `bail: false` in `playwright.config.ts`, which instructs Playwright to continue running all assertions within a test even after the first failure, collecting results without stopping execution mid-test.",
        "Use `expect.soft(locator).toHaveText(value)` for each assertion; soft assertions do not throw immediately on failure but accumulate all failures internally. The test is marked as failed at the end once Playwright flushes the collected soft assertion errors, providing a complete list of every failed assertion in a single test run.",
      ],
      correctIndex: 3,
      explanation:
        "`expect.soft()` is Playwright's built-in soft assertion API. Unlike regular `expect()`, a soft assertion failure does not throw and does not stop the test. All soft failures are collected and reported together when the test finishes. If any soft assertion failed, the test is marked as failed. This is ideal for page-level validation tests where you want a complete picture of all broken elements in a single run rather than fix-one-see-next iteration.",
    },

    // ── PARAMETERISED TESTS ──────────────────────────────────────

    {
      id: "pw2-10",
      scenario:
        "A QA team is testing a multi-currency e-commerce platform that supports USD, GBP, EUR, JPY, and INR. " +
        "The checkout flow must work correctly for every currency, with correct symbol display, decimal " +
        "formatting, and total calculation. Writing five separate test functions that are structurally " +
        "identical except for the currency code is creating significant duplication. The team lead asks " +
        "for a single test definition that runs five times, once per currency, with distinct test names " +
        "in the report.",
      question:
        "What Playwright feature enables a single test definition to execute multiple times with different input data sets, producing individually named results in the test report?",
      options: [
        "Use a `for` loop inside a single test function that iterates over the currency array and calls each assertion in turn — Playwright will report all five currency results as separate line items because each assertion is internally tracked as a sub-test.",
        "Use `test.each` (or the table syntax `test.each([...])`) to define a data-driven test; Playwright executes the test once per row of data and names each run with the interpolated test title, e.g., `'checkout flow - USD'`, `'checkout flow - GBP'`, appearing as five separate test entries in the report.",
        "Place all five currency test cases in a `test.describe` block; Playwright automatically detects structurally identical tests in the same describe block and generates a parameterised matrix execution plan without additional syntax.",
        "Define a shared `runCurrencyTest(currency)` helper function and call it from five separate `test()` declarations, each with a distinct name — this is the only approach that guarantees distinct named entries in the Playwright HTML report.",
      ],
      correctIndex: 1,
      explanation:
        "`test.each([['USD', '$'], ['GBP', '£'], ...])('checkout flow - %s', async ({ page }, [code, symbol]) => { ... })` runs the test once per data row. Each run is independently named, timed, retried, and reported. This eliminates duplication while giving full individual traceability per data set — failures show exactly which currency broke. The `for` loop approach produces a single test entry that stops at the first failing currency, losing visibility into the rest.",
    },

    // ── CUSTOM EXPECT MATCHERS ───────────────────────────────────

    {
      id: "pw2-11",
      scenario:
        "A QA architect at a fintech company notices that across 80 test files, the same multi-step " +
        "assertion pattern appears dozens of times: check that a monetary amount element contains a " +
        "correctly formatted string — correct symbol, correct decimal places, no extra whitespace, " +
        "and within a specified range. Each occurrence uses 4-5 chained assertions. She wants to " +
        "package this logic into a single reusable matcher so tests can write " +
        "`expect(locator).toDisplayAmount({ symbol: '£', min: 10, max: 500 })` instead.",
      question:
        "What Playwright mechanism allows teams to add domain-specific assertion methods like `toDisplayAmount()` to the global `expect` object so they are available across all test files?",
      options: [
        "Add the custom assertion as a regular TypeScript function in a shared utilities file; call it at the end of tests as `await assertDisplayAmount(locator, options)` — Playwright's `expect` object is sealed and cannot be extended with custom matchers.",
        "Use `expect.extend({ async toDisplayAmount(locator, options) { ... } })` in a setup file, then import and call `expect.extend()` at the top of every test file that needs the custom matcher — the extension applies only within the file scope where it is called.",
        "Use `expect.extend({ async toDisplayAmount(locator, options) { ... } })` in a file referenced by `expect` in the test's import, combined with declaration merging in TypeScript (`interface Matchers<R> { toDisplayAmount(...): R }`) so the matcher is globally available and fully typed across the entire suite.",
        "Playwright Custom matchers can only be defined for primitive values (string, number, boolean); assertions on Locator objects require the built-in Playwright assertion API and cannot be encapsulated in custom `expect.extend` matchers.",
      ],
      correctIndex: 2,
      explanation:
        "`expect.extend()` is Playwright's mechanism for adding domain-specific matchers. Defined once in a `custom-matchers.ts` file and imported in `playwright.config.ts`'s `require` or via a global setup import, it becomes available in all test files. The TypeScript declaration merge (`declare global { namespace PlaywrightTest { interface Matchers<R> { toDisplayAmount(...): R } } }`) adds full IDE autocompletion and type safety. This is how large enterprise suites build reusable, domain-readable assertion vocabularies.",
    },

    // ── TEST LIFECYCLE HOOKS ─────────────────────────────────────

    {
      id: "pw2-12",
      scenario:
        "A test suite for a project management SaaS has a `beforeAll` hook that creates a test workspace " +
        "via API and a `beforeEach` hook that navigates to the workspace dashboard. After running for " +
        "three months, the team notices that tests in certain files occasionally interfere with each other — " +
        "state from one test leaks into the next. A principal engineer reviews the architecture and " +
        "identifies that the team has confused what should go in `beforeAll` vs `beforeEach`.",
      question:
        "What is the precise distinction between `beforeAll` and `beforeEach` in Playwright's hook model, and what category of setup actions belongs unambiguously in each?",
      options: [
        "`beforeAll` runs once before the first test in a file and shares its state with all subsequent tests in the same file; `beforeEach` runs before every individual test. Anything that mutates state — like navigating to a page or selecting UI options — must go in `beforeEach` to guarantee a clean starting point for each test.",
        "`beforeAll` and `beforeEach` are functionally interchangeable; the only difference is performance — `beforeAll` is faster because it runs fewer times. Teams should move as much setup as possible into `beforeAll` to reduce test suite duration.",
        "`beforeAll` is scoped to the test file and its state is automatically reset between tests by Playwright's isolation model; `beforeEach` is for operations that must run after Playwright's automatic reset has completed.",
        "`beforeAll` is the correct hook for operations that modify shared infrastructure (creating database records, seeding test data, provisioning API tokens) that are expensive and safe to share; `beforeEach` is for per-test state (navigating to a URL, clearing local storage, selecting a user role) that must be independent between tests to prevent interference.",
      ],
      correctIndex: 3,
      explanation:
        "`beforeAll` runs once per describe block — its setup is shared across all tests in that block. This is appropriate for expensive, idempotent operations: creating a test organisation via API, generating a JWT token, seeding reference data. `beforeEach` runs before every individual test — this is where page navigation, form state, and any mutable UI state must live, because each test needs a clean, independent starting point. Putting mutable UI operations in `beforeAll` is the root cause of test state leakage.",
    },

    // ── TEST ISOLATION ANTI-PATTERNS ─────────────────────────────

    {
      id: "pw2-13",
      scenario:
        "A test engineer notices that a specific test in a suite passes when run in isolation with " +
        "`npx playwright test my-test.spec.ts` but fails when the full suite runs. Examining the failure, " +
        "she finds the test assumes the application database contains a specific record created by " +
        "a previous test in a different file. A code review reveals that tests across multiple files " +
        "share a single long-running browser context and that one test's `afterEach` hook was removed " +
        "to 'speed things up.'",
      question:
        "What fundamental test design principle does this scenario violate, and what Playwright-native configuration ensures each test starts in a genuinely isolated state?",
      options: [
        "Each Playwright test should be fully independent: it must own its setup and teardown and make no assumptions about state created by other tests. Playwright's default behaviour of creating a new BrowserContext per test enforces browser-level isolation; database state should be seeded via API in `beforeEach` and torn down in `afterEach` — never delegated to a sibling test.",
        "The scenario violates the DRY (Don't Repeat Yourself) principle — setup code is duplicated across files instead of being centralised in a single `globalSetup` function, causing inconsistent state depending on execution order.",
        "The correct fix is to enforce test execution order by prefixing test file names with numbers (e.g., `01-create.spec.ts`, `02-verify.spec.ts`), ensuring the creating test always runs before the dependent test in any pipeline configuration.",
        "Playwright's `test.serial()` decorator should be applied to all tests in the suite, which enables a global shared context that persists state across files while preventing concurrent access that causes the intermittent failures.",
      ],
      correctIndex: 0,
      explanation:
        "Test independence (the 'I' in F.I.R.S.T. principles) is the foundation of a reliable suite. A test that depends on state created by another test creates an invisible ordering dependency — it fails whenever that dependency runs later or not at all. Playwright creates a fresh BrowserContext per test by default, giving browser-level isolation. Database/API state must be seeded in the test's own setup hooks. Removing `afterEach` teardown to save time is a well-known source of state leakage that compounds as suites grow.",
    },

    // ── WEBSOCKET INTERCEPTION ───────────────────────────────────

    {
      id: "pw2-14",
      scenario:
        "A QA engineer at a stock trading platform is testing the real-time price feed component. " +
        "The component connects to a WebSocket server that streams live ticker updates every 500ms. " +
        "In the CI environment, the WebSocket server is not deployed — tests run against the frontend " +
        "build only. She needs to simulate the WebSocket connection and push specific price update " +
        "messages from the test to verify the component renders correctly under different market " +
        "conditions — a sudden price spike, a circuit breaker halt, and a zero-price error.",
      question:
        "How does Playwright support WebSocket interception, and what API allows a test to push controlled messages from the server-side of a mocked WebSocket connection?",
      options: [
        "Playwright does not support WebSocket interception; the recommended approach is to replace the application's WebSocket client with a polling HTTP API in the test environment, then use `page.route()` to mock the polling responses.",
        "Intercept the HTTP Upgrade request that initiates the WebSocket handshake using `page.route()`, respond with a mocked HTTP 200 instead of 101 Switching Protocols, and then use `page.evaluate()` to inject fake message events directly into the WebSocket object on the window.",
        "Use `page.routeWebSocket(urlPattern, ws => { ws.onConnect(socket => { socket.send(JSON.stringify(priceUpdate)); }) })` to intercept WebSocket connections matching a URL pattern; the `socket` object allows the test to send messages to the client, close the connection, or block the upgrade entirely.",
        "Use `context.grantPermissions(['websocket'])` to enable WebSocket interception, then call `page.waitForEvent('websocket')` to obtain a reference to the WebSocket object, and use `webSocket.send(data)` to push messages from the test's Node.js process to the page's WebSocket listener.",
      ],
      correctIndex: 2,
      explanation:
        "`page.routeWebSocket()` was added in Playwright 1.48 to provide first-class WebSocket control. The handler receives a `WebSocketRoute` object; calling `ws.onConnect(socket => socket.send(data))` allows the test to send specific messages to the component. `socket.close()` simulates disconnection, and the route can be configured to `ws.connectToServer()` to proxy to the real server while still intercepting messages. This enables testing all WebSocket-driven states without a live server.",
    },

    // ── COOKIE MANAGEMENT ────────────────────────────────────────

    {
      id: "pw2-15",
      scenario:
        "A test team is building a suite for a multi-brand retail platform where the same application " +
        "serves three different brand experiences based on a `brand_preference` cookie. Brand A shows " +
        "a minimalist UI, Brand B shows a premium layout, and Brand C shows a discount-focused design. " +
        "The team needs to write tests for all three brand variants without duplicating test logic or " +
        "navigating through a brand-selection UI in every test.",
      question:
        "How can Playwright tests programmatically set specific cookies on a browser context before the first page load, so the application reads the correct brand cookie on the initial request?",
      options: [
        "Use `page.goto('/set-brand?brand=A')` to navigate to a setup endpoint on the application that sets the cookie server-side, then redirect to the test start URL — this is more reliable than client-side cookie injection because it mirrors how real users acquire the brand cookie.",
        "Cookies can only be set on a browser context before `browser.newContext()` is called; once the context is created, cookies are immutable and the only way to change them is to create a new context with the desired cookie values in the `storageState` option.",
        "Use `page.evaluate(() => document.cookie = 'brand_preference=brand-a')` after navigating to the base URL to set the cookie via JavaScript, then reload the page so the server receives the cookie on the subsequent request.",
        "Call `context.addCookies([{ name: 'brand_preference', value: 'brand-a', domain: 'localhost', path: '/' }])` before calling `page.goto()` — the cookie is present in the browser context from the first request, so the server receives it on the initial page load without any UI interaction.",
      ],
      correctIndex: 3,
      explanation:
        "`context.addCookies()` injects cookies before any navigation, so the very first HTTP request the browser makes carries the cookie — the server sees it as if the user already had the cookie from a prior session. This is the correct approach for brand/locale/feature-flag cookies that control server-rendered responses. `page.evaluate()` sets cookies after the initial load, too late for server-side rendering decisions. `addCookies` also works with saved storage states for combining cookie setup with pre-authenticated sessions.",
    },

    // ── LOCAL STORAGE MANIPULATION ───────────────────────────────

    {
      id: "pw2-16",
      scenario:
        "A QA engineer is testing a onboarding wizard that uses `localStorage` to track which of " +
        "five onboarding steps the user has completed. She needs to test the scenario where a user " +
        "returns mid-wizard — they have completed steps 1-3 but not 4 and 5. Setting this state " +
        "through the UI would require executing steps 1-3 in every test, adding over 90 seconds to " +
        "the suite. She wants to inject the localStorage state programmatically before the page loads.",
      question:
        "What is the most reliable Playwright pattern for pre-seeding `localStorage` values so that they are available when the application's JavaScript first executes on page load?",
      options: [
        "Navigate to the page with `page.goto(url)`, then immediately call `page.evaluate(() => localStorage.setItem('onboarding_step', '3'))` before the application's JavaScript reads the value — the synchronous nature of `page.evaluate()` guarantees it runs before any application code.",
        "Use `page.addInitScript(() => { localStorage.setItem('onboarding_progress', JSON.stringify({ completed: [1,2,3] })) })` before calling `page.goto()` — init scripts run in the page context before any other scripts, including the application bundle, so localStorage is pre-populated when the application first reads it.",
        "Configure the localStorage values in `playwright.config.ts` under `use.localStorage` and they will be automatically injected into every new page before navigation, without requiring any per-test setup code.",
        "Use `context.storageState()` to capture localStorage from a previous test run where steps 1-3 were completed manually, then load that state in subsequent tests via `browser.newContext({ storageState: 'wizard-state.json' })` — this is the only approach that correctly serialises localStorage across test runs.",
      ],
      correctIndex: 1,
      explanation:
        "`page.addInitScript()` injects a JavaScript function into the page that runs before any page scripts — including the application's own JavaScript bundle. This is the only reliable way to pre-seed `localStorage`, `sessionStorage`, or any global browser state that must exist when the application first initialises. `page.evaluate()` after `goto()` races against the application's startup code and can arrive too late if the app reads localStorage synchronously during initialisation.",
    },

    // ── NETWORK THROTTLING ───────────────────────────────────────

    {
      id: "pw2-17",
      scenario:
        "A mobile UX team wants to validate that their progressive web app displays a meaningful " +
        "loading skeleton rather than a blank screen when users on 3G connections open the product " +
        "catalogue. They want to automate this check in Playwright to prevent regressions where the " +
        "skeleton is accidentally removed during refactoring. The test needs to simulate a slow " +
        "network and assert that the skeleton component is visible during the loading phase.",
      question:
        "What Playwright API simulates constrained network conditions like 3G bandwidth and latency within a test, and how does it integrate with the standard assertion model?",
      options: [
        "Call `await context.setNetworkConditions({ downloadThroughput: 40000, uploadThroughput: 10000, latency: 400 })` (via CDP session) to configure bandwidth and latency limits; then assert `expect(page.getByTestId('skeleton')).toBeVisible()` immediately after navigation before the data loads.",
        "Use `context.route('**/*', async route => { await new Promise(r => setTimeout(r, 300)); await route.continue() })` to add latency to every network request, effectively simulating slow network conditions without requiring any browser-level network throttling API.",
        "Set the `slowMo` option in `browser.newContext()` to 3000ms — this delays every Playwright action by 3 seconds, simulating the sluggish responsiveness of a 3G device from the user's perspective.",
        "Playwright cannot simulate network conditions because bandwidth throttling is controlled by the OS network stack, not the browser; use a proxy tool like Charles Proxy or mitmproxy to throttle the connection externally and point `playwright.config.ts`'s `proxy` setting at it.",
      ],
      correctIndex: 0,
      explanation:
        "Playwright exposes network condition simulation via a Chrome DevTools Protocol (CDP) session: `const client = await context.newCDPSession(page); await client.send('Network.emulateNetworkConditions', { downloadThroughput: 40000/8, uploadThroughput: 10000/8, latency: 400, offline: false })`. The `route()` delay approach works as a practical alternative for adding artificial latency, and is often simpler. Both approaches let you assert that loading states appear correctly during the slow load window using standard web-first assertions.",
    },

    // ── CROSS-BROWSER PROJECT CONFIGURATION ─────────────────────

    {
      id: "pw2-18",
      scenario:
        "A QA architect at a financial services company is designing the Playwright configuration " +
        "for a new online banking portal. Regulatory requirements mandate that the portal must work " +
        "correctly on Chrome, Firefox, and Safari (desktop) as well as Mobile Safari on iOS. " +
        "The architect needs to structure the `playwright.config.ts` so that the full suite runs " +
        "on all four targets in CI while still allowing developers to quickly run only Chrome locally " +
        "during development, without modifying the config file each time.",
      question:
        "How should the Playwright config be structured to support multi-browser, multi-device targeting in CI while allowing developers to override the target browser via the command line for local runs?",
      options: [
        "Create four separate `playwright.config.ts` files — one per browser — and configure the CI pipeline to run all four in parallel, using `--config=playwright.chrome.config.ts` to select the appropriate file per CI job.",
        "Define all four targets as named projects in the `projects` array of `playwright.config.ts`; in CI, run `npx playwright test` with no flags to execute all projects; locally, developers use `npx playwright test --project=chromium` to target a single browser without changing the config file.",
        "Use environment variables to select browsers: set `BROWSERS=chromium,webkit,firefox,Mobile Safari` in CI and `BROWSERS=chromium` locally, then dynamically generate the `projects` array in config using `process.env.BROWSERS.split(',')` — the config file remains static and environment-driven.",
        "Configure `projects` with a single `chromium` entry and add Firefox and WebKit as optional plugins installed separately via `npm install @playwright/firefox @playwright/webkit`; CI installs all plugins while local dev installs only the default.",
      ],
      correctIndex: 1,
      explanation:
        "Playwright's `projects` array is the canonical mechanism for multi-browser/device configuration. Each project defines a browser, device, and any project-specific `use` overrides. `npx playwright test` runs all projects; `--project=chromium` scopes to one. This keeps a single config file as the source of truth, avoids environment-variable complexity, and makes the full cross-browser matrix reproducible by running the same command in CI as locally with a single flag difference.",
    },

    // ── COMPONENT TESTING ────────────────────────────────────────

    {
      id: "pw2-19",
      scenario:
        "A frontend team at a design system company maintains a library of 200 React components. " +
        "Their current testing approach uses Jest and React Testing Library for unit tests, but they " +
        "find that many interaction bugs only manifest in a real browser — hover states, focus traps, " +
        "and CSS transitions behave differently in jsdom. A tech lead evaluates Playwright Component " +
        "Testing as an alternative that runs components in a real browser without requiring a full " +
        "application to be deployed.",
      question:
        "How does Playwright Component Testing differ from Playwright's standard end-to-end testing, and what is the core architectural reason it can test individual components without deploying a full application?",
      options: [
        "Playwright Component Testing is identical to standard E2E testing — the difference is only that component tests import React components directly into the test file and Playwright renders them using a built-in React runtime bundled with the framework.",
        "Playwright Component Testing replaces the browser with a headless Node.js DOM environment — similar to jsdom — but with better CSS support than Jest's jsdom, bridging the gap between unit and E2E testing without requiring real browser processes.",
        "Playwright Component Testing uses `@playwright/experimental-ct-react` (or Vue/Svelte equivalents) to mount individual components into a real browser using a Vite-based dev server at test time; tests use `mount(Component, { props })` to render in isolation, then interact and assert using the same Playwright locator and assertion APIs used in E2E tests.",
        "Component Testing in Playwright requires the full application to be running because components depend on the app's routing context, authentication state, and API layer; the feature is primarily useful for testing components in the context of a deployed staging environment.",
      ],
      correctIndex: 2,
      explanation:
        "Playwright CT spins up a Vite dev server (or webpack) that builds only the component under test and mounts it in an iframe served to a real browser. `mount(<Button onClick={fn}>Click me</Button>)` returns a Locator pointing to the mounted component, and all standard Playwright interactions and assertions work on it. This catches real browser rendering bugs (CSS, focus, animations) that jsdom cannot replicate, while testing components in full isolation without a running backend.",
    },

    // ── MULTIPLE TABS COORDINATION ───────────────────────────────

    {
      id: "pw2-20",
      scenario:
        "A QA engineer is testing a real-time collaboration feature in a document editor. The test " +
        "scenario requires two users to be logged in simultaneously in separate browser tabs. When " +
        "User A types a sentence in Tab 1, the text should appear in User B's view in Tab 2 within " +
        "2 seconds. She needs to coordinate actions across two simultaneously open tabs in a single test.",
      question:
        "What Playwright pattern correctly manages two simultaneously open pages (tabs) in a single test and allows the engineer to alternate interactions and assertions between them?",
      options: [
        "Each Playwright test can only hold a reference to a single page object; to test two tabs, the engineer must write two separate tests and use a shared database fixture to pass state between them.",
        "Open both tabs in the same browser context using `const page2 = await context.newPage()`, load the second user's URL in `page2`, then alternate between `page1.fill(...)` and `await expect(page2.getByText(...)).toBeVisible()` within the same test — both pages share the same context event loop and can be awaited sequentially.",
        "Create two browser contexts — `const context1 = await browser.newContext()` and `const context2 = await browser.newContext()`, each loaded with their respective user's auth state — open a page in each context, and interact with `page1` and `page2` as independent variables, switching between them freely within the same `async` test function.",
        "Use `page.bringToFront()` to switch the active tab, and then all subsequent Playwright commands automatically target the front tab until `bringToFront()` is called again — this is how Playwright's tab model works in multi-tab tests.",
      ],
      correctIndex: 1,
      explanation:
        "For a two-user collaboration test, both users in the same browser context is the simplest approach: `const page2 = await context.newPage()`. If the users need separate auth states, two separate contexts each with their own `storageState` is the correct pattern. Either way, `page1` and `page2` are independent variables in the test function — you interact with one, then the other, using normal `await` sequencing. There is no concept of an 'active tab' that must be switched; Playwright targets whichever page object you reference.",
    },

    // ── HOVER AND TOOLTIP TESTING ────────────────────────────────

    {
      id: "pw2-21",
      scenario:
        "A QA engineer is testing a financial dashboard where hovering over a chart data point " +
        "reveals a tooltip showing the exact value and date. She writes `page.hover('[data-point]')` " +
        "followed by `expect(page.locator('.tooltip')).toBeVisible()`, but the tooltip flickers in " +
        "CI — sometimes the assertion passes, sometimes it fails because the hover state is not " +
        "held long enough for the tooltip CSS transition to complete. She wants to make this " +
        "assertion deterministic.",
      question:
        "What approach makes a hover-triggered, CSS-transition-animated tooltip assertion reliable in Playwright?",
      options: [
        "Add `page.waitForTimeout(500)` after `page.hover()` to give the CSS transition enough time to complete before asserting visibility — this is an acceptable exception to the no-sleep rule for CSS animation scenarios.",
        "Chain `.waitFor({ state: 'visible' })` on the tooltip locator before the hover, which pre-registers a visibility observer that activates the moment the hover triggers the tooltip, removing the timing gap between hover and assertion.",
        "Disable CSS transitions globally in the test environment by injecting `* { transition: none !important; animation: none !important; }` via `page.addStyleTag()` before the test, eliminating transition timing as a source of flakiness while preserving the tooltip's visibility logic.",
        "Use `page.hover('[data-point]')` to trigger the hover, then immediately assert `await expect(page.locator('.tooltip')).toBeVisible()` — Playwright's web-first assertion retries for up to the configured timeout and will wait for the tooltip to become visible after the CSS transition completes, without any sleep.",
      ],
      correctIndex: 3,
      explanation:
        "`expect(locator).toBeVisible()` retries continuously until the element becomes visible or the timeout expires — it does not require the tooltip to be visible instantly. The CSS transition merely delays when the element reaches visible state; Playwright's retry loop handles this naturally. However, if CI is particularly slow, setting a reasonable `expect` timeout via `expect(locator).toBeVisible({ timeout: 3000 })` or disabling transitions via `addStyleTag` (option C) is also a valid engineering trade-off for test speed and determinism.",
    },

    // ── SELECT AND DROPDOWN INTERACTIONS ────────────────────────

    {
      id: "pw2-22",
      scenario:
        "An automation engineer is testing a form with multiple dropdowns. One is a native HTML " +
        "`<select>` element for country selection. Another is a custom React Select component that " +
        "renders a `<div>` container with a searchable input — it has no native `<select>` tag. " +
        "She uses `page.selectOption()` for the first and it works perfectly. For the second, " +
        "`selectOption()` throws because there is no `<select>` element to target.",
      question:
        "Why does `page.selectOption()` not work for custom dropdown components, and what interaction sequence correctly selects an option from a custom React Select dropdown?",
      options: [
        "Custom dropdowns require `page.locator('select').selectOption()` to be scoped to the nearest ancestor `<select>` element; React Select wraps its native select in a div but still maintains a hidden `<select>` for form submission that `selectOption()` can target.",
        "`page.selectOption()` is deprecated in Playwright v1.40+; for all dropdown types the correct API is `page.getByRole('combobox').click()` followed by `page.getByRole('option', { name: 'value' }).click()`.",
        "`page.selectOption()` is designed exclusively for native HTML `<select>` elements and dispatches the `change` event on them. For custom dropdowns, interact as a user would: click the trigger to open the dropdown, type in the search input if present, then click the desired option using a locator that matches its text or role.",
        "Custom React Select dropdowns can only be controlled by dispatching synthetic events using `page.evaluate()` to call React's internal state setter — Playwright's browser interactions cannot trigger React's synthetic event system reliably.",
      ],
      correctIndex: 2,
      explanation:
        "`selectOption()` works exclusively with native `<select>` elements — it dispatches the browser's native select mechanism. Custom dropdown components (React Select, Headless UI, Ant Design Select) render custom DOM without a native `<select>`. These must be interacted with as a real user: click the trigger element to open, optionally type to filter, then click the desired option. Playwright's `getByRole('option', { name: 'Canada' }).click()` is the idiomatic selector for the option once the dropdown is open.",
    },

    // ── ENVIRONMENT-SPECIFIC CONFIG ──────────────────────────────

    {
      id: "pw2-23",
      scenario:
        "A QA team runs their Playwright suite against three environments: `dev` (local), `staging`, " +
        "and `production` (smoke tests only). Each environment has a different base URL, different " +
        "API credentials, and in production the test run should be read-only — no tests that create, " +
        "update, or delete data should execute. The team currently maintains three separate config files " +
        "and manually switches between them, which frequently causes the wrong environment to be used.",
      question:
        "What pattern in `playwright.config.ts` uses environment variables to select the correct base URL and behaviour without maintaining multiple config files?",
      options: [
        "Read `process.env.TEST_ENV` in `playwright.config.ts` to derive `baseURL`, credentials, and project filtering: `const env = process.env.TEST_ENV || 'dev'`; a lookup object maps each environment to its URL. For production, conditionally include only projects tagged `@smoke` using `grep: /@smoke/`. A single config file serves all environments, selected entirely by the environment variable at run time.",
        "Create a `playwright.env.ts` file that exports the environment config object, and import it in `playwright.config.ts`; developers set `ENV=staging` before running tests and the config file reads the exported object matching that key.",
        "Use Playwright's built-in `--env` CLI flag: `npx playwright test --env=staging` automatically reads `playwright.staging.env` and merges those variables into the config without any custom code in `playwright.config.ts`.",
        "Store all environment configurations as GitHub Actions secrets mapped to environment names; Playwright's CI integration reads these secrets automatically when running in GitHub Actions, but local development requires a separate `local.config.ts` because secrets are not available outside CI.",
      ],
      correctIndex: 0,
      explanation:
        "Reading `process.env.TEST_ENV` in a single `playwright.config.ts` is the industry standard for environment-aware Playwright configuration. The config file dynamically sets `baseURL`, `use.extraHTTPHeaders` for credentials, and even which projects or test subsets to run. Running `TEST_ENV=staging npx playwright test` or `TEST_ENV=production npx playwright test --grep @smoke` drives the entire behaviour from one file. This eliminates config drift between multiple files and makes environment selection explicit and auditable in CI pipeline YAML.",
    },

    // ── CUSTOM REPORTERS ─────────────────────────────────────────

    {
      id: "pw2-24",
      scenario:
        "A QA team at an enterprise company wants to integrate Playwright test results directly " +
        "into their internal engineering dashboard — a proprietary system that accepts results via " +
        "a REST API in a custom JSON schema. The built-in HTML, JSON, and JUnit reporters produce " +
        "output in formats the dashboard cannot parse without significant transformation. The team " +
        "needs the results posted to the dashboard's API at the exact moment each test completes, " +
        "not as a post-processing step after the full run.",
      question:
        "What Playwright mechanism allows teams to write code that executes in response to individual test lifecycle events — test start, test pass, test failure — and can make external API calls during the test run?",
      options: [
        "Add an `afterEach` hook in a global setup file that calls the dashboard API after every test; since `afterEach` runs after each test regardless of outcome, it provides the same per-test reporting granularity as a custom reporter.",
        "Implement a custom Playwright reporter by creating a class with `onTestBegin`, `onTestEnd`, `onError`, and `onEnd` methods, then reference it in `playwright.config.ts` under `reporter`; `onTestEnd(test, result)` receives the full test result including status, duration, and errors, enabling real-time API calls to the dashboard without any post-processing.",
        "Use Playwright's `--reporter=json` flag and write a post-processing script that reads the output JSON file after the full suite completes, transforms it into the dashboard schema, and posts it — this is equivalent to a custom reporter but simpler to implement.",
        "Custom reporters in Playwright only receive aggregate suite-level data, not individual test results; per-test granularity requires parsing the JUnit XML output file which records one `<testcase>` element per test with status, timing, and failure messages.",
      ],
      correctIndex: 1,
      explanation:
        "Playwright's reporter interface (`Reporter`) defines lifecycle methods: `onBegin`, `onTestBegin`, `onTestEnd`, `onStepBegin`, `onStepEnd`, `onError`, and `onEnd`. A custom reporter class implementing these methods and registered in `playwright.config.ts` as `reporter: [['./my-reporter.ts']]` receives rich result objects in real time. `onTestEnd` receives `TestCase` and `TestResult` — including status, duration, attachments, and error details — enabling immediate API calls, Slack notifications, or custom metric recording after each test.",
    },

    // ── TEST.STEP FOR STRUCTURED TESTS ──────────────────────────

    {
      id: "pw2-25",
      scenario:
        "A QA team writes end-to-end tests for a complex insurance quote workflow — 8 steps from " +
        "personal details through risk assessment to final quote generation. Each test is 60-80 " +
        "lines long. When a test fails in CI, the error message shows the failing assertion but " +
        "not which logical section of the flow it belongs to, making it hard to pinpoint whether " +
        "the bug is in the applicant details section, the coverage selection, or the payment setup. " +
        "The lead wants to add logical grouping to test steps that surfaces in the HTML report.",
      question:
        "What Playwright API organises actions within a single test into named, reportable logical groups that appear as collapsible sections in the HTML report and trace viewer?",
      options: [
        "Wrap each section in a `test.describe` block nested inside the test function — Playwright renders nested describe labels as section headers in the HTML report, providing the logical grouping visible to the team.",
        "Add `// STEP: Personal Details` comments above each section — Playwright's HTML reporter parses inline comments and uses them as collapsible group headers in the step timeline view of the trace output.",
        "Create a separate test file for each of the 8 workflow steps with a naming convention like `01-personal-details.spec.ts`; Playwright renders file names as section headers in the HTML report, giving the same logical grouping with zero code changes.",
        "Use `await test.step('Step name', async () => { ... })` to wrap each logical section; named steps appear as collapsible rows in the HTML report, the trace viewer, and error messages — so a failure reads 'Step: Coverage Selection > expect toHaveText failed' rather than a bare assertion error with no context.",
      ],
      correctIndex: 3,
      explanation:
        "`test.step('Section name', async () => { ... })` is Playwright's built-in mechanism for structuring long tests into named logical units. Steps appear in the HTML report as collapsible rows, in trace viewer as named blocks on the timeline, and in failure messages with full context. They can be nested (`step` within `step`), enabling a hierarchy like `'Checkout Flow > Payment Section > Apply Promo Code'`. This dramatically improves failure readability for complex multi-step business workflows.",
    },

    // ── WORKERS VS SHARDING DEEP DIVE ────────────────────────────

    {
      id: "pw2-26",
      scenario:
        "A principal engineer is reviewing the CI configuration for a 600-test suite that needs " +
        "to complete in under 8 minutes on a budget of exactly two CI machines, each with 8 CPU cores. " +
        "One team member proposes using 16 workers on a single machine. Another proposes 2 shards " +
        "with 8 workers each. A third suggests 4 shards with 4 workers each across 4 machines. " +
        "The principal needs to explain which option makes the most efficient use of the available budget.",
      question:
        "Given exactly two CI machines each with 8 cores, which configuration most effectively utilises the available hardware to minimise total suite run time?",
      options: [
        "2 shards with 8 workers each across both machines — each machine runs one shard concurrently with 8 workers, giving 16 total parallel test slots; total wall-clock time is approximately the single-machine 8-worker time divided by 2.",
        "16 workers on one machine — using all 16 virtual CPU threads on a single 8-core machine with hyperthreading maximises in-process concurrency; the second machine is held in reserve for re-running failures.",
        "4 shards with 4 workers each requires 4 machines, exceeding the budget; this option is invalid and would require negotiating additional CI resources before it can be considered as a viable configuration.",
        "1 shard with 8 workers — sharding adds orchestration overhead that negates any parallelism benefit for suites under 1,000 tests; the single-machine 8-worker approach is both faster and simpler for this suite size.",
      ],
      correctIndex: 0,
      explanation:
        "2 shards × 2 machines = both machines working simultaneously. Each machine runs 300 tests with 8 workers, so the total wall-clock time is roughly half the single-machine duration. 16 workers on one machine still processes 600 tests sequentially at the machine level — the second machine is idle. Sharding is the horizontal scaling mechanism; workers provide vertical scaling within each machine. The optimal strategy is always max shards (one per machine) with workers matching available cores.",
    },

    // ── ADVANCED SCREENSHOT / VISUAL DIFF ───────────────────────

    {
      id: "pw2-27",
      scenario:
        "A design QA team uses Playwright's `toHaveScreenshot()` for visual regression testing. " +
        "After a legitimate redesign of the checkout button — colour changed from grey to green, " +
        "border radius increased — the visual test correctly fails. The team updates the baseline " +
        "with `--update-snapshots`. Three weeks later, they notice their visual tests are never " +
        "failing even when CSS regressions are clearly introduced in review demos. An engineer " +
        "investigates and discovers the team's `playwright.config.ts` has a `maxDiffPixelRatio: 0.9` setting.",
      question:
        "What does `maxDiffPixelRatio: 0.9` do to visual regression sensitivity, and what is an appropriate production setting for detecting meaningful CSS regressions?",
      options: [
        "`maxDiffPixelRatio: 0.9` means the test passes if 90% or more of pixels match the baseline — allowing up to 10% of pixels to differ before failing. For a 1280×720 screenshot, this permits roughly 92,160 pixels to change, easily masking button colour, spacing, or font changes. A production setting of `maxDiffPixelRatio: 0.001` (0.1% tolerance) or a fixed `maxDiffPixels` count of 50-100 catches genuine CSS regressions while tolerating minor antialiasing differences.",
        "`maxDiffPixelRatio: 0.9` instructs Playwright to compare only 90% of the screenshot pixels, randomly sampling the image to speed up the comparison computation; the remaining 10% is skipped. This creates blind spots in large screenshots, explaining why some regressions are missed.",
        "`maxDiffPixelRatio: 0.9` means the test fails if any pixel has a colour difference greater than 90% on the RGB scale — it is a per-pixel colour distance threshold, not a count of differing pixels. A value of 0.1 would be stricter, failing on any pixel that differs by more than 10% in RGB value.",
        "`maxDiffPixelRatio: 0.9` is the recommended production default from Playwright's documentation for CI environments because font rendering and antialiasing vary between OS versions; lowering it below 0.5 causes more false positives than genuine regressions on cross-platform CI.",
      ],
      correctIndex: 0,
      explanation:
        "`maxDiffPixelRatio` is the fraction of total pixels allowed to differ. At 0.9 (90%), nearly any visual change passes — making the test essentially useless as a regression guard. A practical production setting is `maxDiffPixelRatio: 0.001` (0.1% of pixels) or `maxDiffPixels: 50-100` for small focused components. Antialiasing and subpixel rendering differences between environments are typically 5-20 pixels, not thousands, so a tight threshold with a small absolute tolerance catches real regressions without false positives.",
    },

    // ── REQUEST HEADER MODIFICATION ──────────────────────────────

    {
      id: "pw2-28",
      scenario:
        "A QA team at a SaaS platform tests a feature that is gated behind a request header: " +
        "`X-Feature-Flag: new-dashboard-beta`. The feature flag service reads this header on every " +
        "request and enables the new dashboard UI only when it is present. The QA team wants to " +
        "write a focused test for the new dashboard without enabling the flag in the feature flag " +
        "service's configuration, to avoid affecting other parallel test runs.",
      question:
        "How can Playwright inject a custom HTTP request header into every request made by a specific browser context without modifying the application code or feature flag service configuration?",
      options: [
        "Use `page.route('**/*', async route => { const headers = { ...route.request().headers(), 'X-Feature-Flag': 'new-dashboard-beta' }; await route.continue({ headers }) })` to intercept and modify headers on every request.",
        "Add the header to `playwright.config.ts` under `use.defaultHeaders`; Playwright appends these headers to every HTTP request made by every test in the suite, simulating the flag being enabled globally across all parallel test runs.",
        "Set `extraHTTPHeaders: { 'X-Feature-Flag': 'new-dashboard-beta' }` in the browser context options or call `context.setExtraHTTPHeaders({ 'X-Feature-Flag': 'new-dashboard-beta' })` — all requests from that context automatically include the header without requiring individual route intercepts.",
        "Intercept only the initial page navigation request using `page.route(baseURL, route => route.continue({ headers: { 'X-Feature-Flag': 'new-dashboard-beta' } }))` — feature flags only need to be present on the document request, not on subsequent API or asset requests.",
      ],
      correctIndex: 2,
      explanation:
        "`context.setExtraHTTPHeaders()` (or the `extraHTTPHeaders` option on `browser.newContext()`) adds specified headers to every HTTP request made by that context — page navigations, fetch calls, image requests, API calls. This is the cleanest solution: scoped to a single test context, requires no route setup, and ensures the header is present on every request including XHR and fetch calls that load the feature-gated data, not just the initial navigation.",
    },

    // ── TYPESCRIPT IN PLAYWRIGHT TESTS ───────────────────────────

    {
      id: "pw2-29",
      scenario:
        "A senior QA engineer is onboarding a team of backend developers onto Playwright. The " +
        "backend developers are comfortable with Java and Python but new to TypeScript. They ask " +
        "whether they need to learn TypeScript to use Playwright, what specific benefits TypeScript " +
        "brings to a test suite beyond what plain JavaScript offers, and whether it is worth the " +
        "additional tooling setup for a team that will primarily write tests rather than application code.",
      question:
        "What are the concrete, practical benefits TypeScript provides in a Playwright test suite that plain JavaScript does not, and what is the one area where TypeScript adds friction that teams must budget for?",
      options: [
        "TypeScript compiles Playwright tests to native machine code, making test execution faster than JavaScript. The friction is the compilation step, which adds 30-60 seconds to every `npx playwright test` run.",
        "TypeScript provides IDE autocompletion and inline documentation for all Playwright APIs (so `page.` shows all available methods with parameter types), catches type errors in test code at compile time (e.g., passing a number where a string is expected), and makes POM classes self-documenting. The friction is the initial `tsconfig.json` setup and the learning curve for developers unfamiliar with type annotations.",
        "TypeScript is required for Playwright to function correctly; JavaScript tests run in compatibility mode with reduced feature access — specifically, fixtures and custom matchers are only available in TypeScript test files.",
        "TypeScript's primary benefit in Playwright is enabling multi-file compilation so that POM classes in one file can be imported by test files in another — plain JavaScript does not support cross-file imports in Playwright's module resolution model.",
      ],
      correctIndex: 1,
      explanation:
        "TypeScript's practical value in test suites is IDE intelligence and early error detection. With TypeScript, typing `page.` in VS Code shows all Playwright API methods with their parameter types and JSDoc descriptions — a significant productivity gain for developers learning the API. Type errors in fixture definitions, POM method signatures, and assertion matchers are caught before runtime. The friction is genuine: `tsconfig.json` configuration, understanding `interface` declarations for custom matchers, and type error debugging. For most teams, the productivity gain outweighs the setup cost.",
    },

    // ── PLAYWRIGHT DECISION FRAMEWORK ───────────────────────────

    {
      id: "pw2-30",
      scenario:
        "A technology director at a mid-sized software company is setting the testing strategy for " +
        "three new products being built simultaneously: (A) a customer-facing React SPA with complex " +
        "multi-tab and OAuth flows, (B) a server-side rendered marketing site with minimal JavaScript, " +
        "and (C) a desktop Electron application used by internal operations teams. She asks the QA " +
        "architect to recommend whether Playwright is the right tool for all three, and to articulate " +
        "the capability that makes it uniquely positioned for each.",
      question:
        "Which assessment of Playwright's applicability across these three products is most technically accurate?",
      options: [
        "Playwright is ideal for Product A (React SPA) only. Product B should use a lightweight HTTP-level tool like Cypress because server-rendered pages need no browser automation, and Product C requires a native desktop testing framework like WinAppDriver because Playwright cannot interact with Electron apps.",
        "Playwright is best suited for Product B (simple SSR site) only. Complex React SPAs with OAuth require Cypress because Cypress's in-browser execution model provides better access to the application's React state tree, and Electron apps are better tested with their built-in DevTools Protocol without a separate test framework wrapper.",
        "Playwright is suitable for Products A and B but not C. Electron applications require Spectron (built on WebdriverIO) as the officially supported testing framework, and Playwright's Electron support is experimental with known limitations on Windows that make it unsuitable for production use in operations-critical tooling.",
        "Playwright is the appropriate primary tool for all three: its multi-tab and multi-origin support handles Product A's OAuth flows natively; its full browser engine correctly renders and tests server-side HTML, CSS, and forms in Product B; and its Electron integration via the `electron` launcher and `_electron.launch()` API enables testing the desktop app's UI and IPC communication in Product C.",
      ],
      correctIndex: 3,
      explanation:
        "Playwright covers all three scenarios. For Product A, `context.waitForEvent('page')` handles new OAuth tabs, and multi-origin support manages redirects. For Product B, Playwright's full browser engine renders server-side HTML with complete fidelity — it has no limitation to SPAs. For Product C, Playwright's `_electron.launch({ executablePath })` API starts Electron apps and exposes both `ElectronApplication` for app-level interactions (evaluating in the main process) and `Page` for each renderer window. This broad coverage is one of Playwright's defining architectural advantages over single-context tools.",
    },
  ],
};
