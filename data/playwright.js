/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  TEST MODULE — playwright-testing.js                        ║
 * ║  30 Questions · Playwright End-to-End Testing               ║
 * ╚══════════════════════════════════════════════════════════════╝
 * Add to index.html:
 *   <script src="data/playwright-testing.js"></script>
 * Add to APP_MODULES:
 *   PlaywrightTestingModule,
 */
const PlaywrightTestingModule = {
  meta: {
    id: "playwright-testing",
    testTitle: "Playwright End-to-End Testing",
    topic: "playwright",
    topicLabel: "Playwright",
    difficulty: "Intermediate",
    questionCount: 30,
    estimatedMinutes: 45,
    description:
      "30 scenario-driven questions covering the full Playwright testing spectrum — from architecture and locator strategy to CI/CD integration, network interception, and debugging flaky tests. Framed in real engineering and business contexts.",
    icon: "🎭",
  },

  questions: [
    // ── WHAT IS PLAYWRIGHT / WHY IT MATTERS ──────────────────────

    {
      id: "pw-01",
      scenario:
        "A QA lead at a fast-growing e-commerce company is presenting a business case to " +
        "engineering leadership for replacing their aging Selenium test suite. The suite takes " +
        "over two hours to run on CI, requires a dedicated Selenium Grid to parallelise, and " +
        "the team spends nearly 30% of every sprint debugging flaky tests caused by timing issues. " +
        "The lead proposes migrating to Playwright and is asked to justify the specific " +
        "architectural advantages that address all three pain points simultaneously.",
      question:
        "Which architectural features of Playwright most directly address long run times, Grid infrastructure costs, and timing-related flakiness in a single framework?",
      options: [
        "Playwright's built-in recorder generates test code automatically from user interactions, eliminating the manual effort of writing locators and dramatically reducing the time engineers spend on suite maintenance.",
        "Playwright ships with a built-in test runner that supports parallel execution across multiple workers out of the box, auto-waiting on every action so timing assertions become unnecessary, and a unified API that runs across Chromium, Firefox, and WebKit without a separate Grid service.",
        "Playwright uses a REST-based protocol to communicate with browsers rather than WebDriver's JSON Wire Protocol, which reduces network round-trips and makes each individual test action execute approximately ten times faster than equivalent Selenium commands.",
        "Playwright integrates natively with every major CI platform — GitHub Actions, Jenkins, CircleCI — and automatically provisions cloud browser instances, eliminating the need to configure any browser infrastructure within the team's own pipeline.",
      ],
      correctIndex: 1,
      explanation:
        "Playwright's three headline architectural advantages map directly to the three pain points: its built-in parallel test runner with multiple workers shrinks run time without a Grid; auto-waiting (Playwright waits for elements to be actionable before interacting) eliminates the root cause of most timing flakiness; and its multi-browser support from a single installation removes Selenium Grid infrastructure costs. These are intrinsic to Playwright's design, not optional plugins.",
    },

    {
      id: "pw-02",
      scenario:
        "During a tooling evaluation, a senior engineer who has used Cypress extensively asks " +
        "the team's Playwright advocate to explain the structural difference between how the two " +
        "tools interact with browsers. He specifically wants to understand why Playwright tests " +
        "can control multiple browser tabs, multiple origins, and even desktop Electron apps, " +
        "while his Cypress tests have historically been restricted to a single browser tab " +
        "on the application's own origin.",
      question:
        "What is the fundamental protocol-level reason Playwright supports multi-tab, multi-origin, and non-browser contexts that Cypress's architecture makes difficult?",
      options: [
        "Playwright is built in TypeScript while Cypress is built in JavaScript, and TypeScript's type system enables more complex asynchronous coordination patterns required for multi-tab and multi-origin scenarios.",
        "Playwright communicates with browsers over the Chrome DevTools Protocol (CDP) and browser-native protocols out-of-process, giving it full control over browser internals from outside the browser's JavaScript sandbox — so there is no same-origin restriction or single-tab limitation.",
        "Playwright supports Firefox and WebKit in addition to Chromium, and the multi-browser support incidentally provides the multi-tab and multi-origin capabilities that a Chromium-only tool like Cypress cannot replicate.",
        "Playwright runs each test in a separate Node.js worker process with its own event loop, which allows it to spawn and coordinate multiple browser instances independently in a way that Cypress's single-process architecture structurally prevents.",
      ],
      correctIndex: 1,
      explanation:
        "Playwright runs out-of-process and communicates via CDP and browser-native protocols. Because it sits outside the browser's JavaScript runtime, it is not bound by the browser's same-origin policy or sandboxing restrictions. Cypress, by contrast, executes test code inside the browser's own JavaScript context, which is why it inherits same-origin limitations and cannot natively coordinate across tabs or origins.",
    },

    // ── INSTALLATION & PROJECT SETUP ─────────────────────────────

    {
      id: "pw-03",
      scenario:
        "A DevOps engineer is onboarding a new front-end team onto Playwright. She runs " +
        "`npm init playwright@latest` on the project and notices it generates several files " +
        "and a directory structure she wasn't expecting. A junior developer on the team asks " +
        "what the `playwright.config.ts` file is for and why changing it matters more than " +
        "editing individual test files when configuring the entire suite's behaviour.",
      question:
        "What is the role of `playwright.config.ts` and which categories of configuration have the highest impact on suite-level behaviour?",
      options: [
        "It is the TypeScript compiler configuration file that controls how Playwright's source code is transpiled before execution, and the most impactful settings are `strict` mode and `moduleResolution`.",
        "It is the central suite configuration file where engineers define projects (browser/device targets), base URL, global timeouts, retry counts, reporter types, and test parallelism — settings that apply to every test without requiring changes to individual spec files.",
        "It is a lock file automatically generated by Playwright that records the exact browser binary versions installed so that `npx playwright install` can reproduce the same environment on any machine.",
        "It stores authentication credentials and environment variable mappings so that tests running on CI can access staging APIs without hard-coding secrets inside test files, following the twelve-factor app methodology.",
      ],
      correctIndex: 1,
      explanation:
        "`playwright.config.ts` is the suite-level control plane. Settings like `projects` (which browsers and devices to run), `baseURL` (so tests use relative paths), `retries` (flaky test recovery), `timeout`, `reporter`, and `workers` (parallelism) all live here and govern every test without touching individual specs. This separation keeps test files focused on business logic while infrastructure decisions stay centralised.",
    },

    // ── BROWSER CONTEXTS AND PAGES ────────────────────────────────

    {
      id: "pw-04",
      scenario:
        "An automation engineer at a SaaS company is writing a test that validates the entire " +
        "checkout flow for two different user roles simultaneously — a standard customer and a " +
        "premium subscriber — to confirm that the pricing logic is applied correctly for each. " +
        "A colleague suggests using two separate browser contexts rather than two separate " +
        "browser instances, and the engineer asks what practical difference that makes " +
        "for this test's performance and isolation.",
      question:
        "What does a Playwright BrowserContext represent, and why is it more efficient than launching a new browser instance for each isolated user session?",
      options: [
        "A BrowserContext is a named grouping of test files that share the same base URL configuration, making it easier to organise large test suites without repeating the same `use` block in every spec.",
        "A BrowserContext is an isolated browser session — its own cookies, localStorage, and authentication state — that runs within a single browser process, so spinning up two contexts costs a fraction of the memory and startup time of two full browser processes.",
        "A BrowserContext is Playwright's wrapper around a browser tab that automatically clears all network cache and service workers between actions, ensuring each interaction starts from a pristine network state without any persistent caching artefacts.",
        "A BrowserContext is a snapshot of browser state captured at a fixed point in time that can be serialised to disk and replayed in subsequent test runs, providing deterministic test conditions regardless of changes to the application under test.",
      ],
      correctIndex: 1,
      explanation:
        "A BrowserContext is Playwright's equivalent of an incognito profile — isolated cookies, storage, and auth state — but it runs inside an already-launched browser process. Creating a second context is nearly instant compared to launching a second browser. For multi-user scenarios, two contexts in one browser gives full session isolation at a fraction of the resource cost, which is why Playwright creates a new context per test by default.",
    },

    {
      id: "pw-05",
      scenario:
        "A test engineer is writing an automated test for a banking application's two-factor " +
        "authentication flow. The flow opens a confirmation dialog in a new browser tab " +
        "when the user clicks 'Confirm Transfer.' In the past with Selenium, handling this " +
        "new tab required switching window handles manually and was a common source of " +
        "race conditions. She wants to understand how Playwright models this interaction.",
      question:
        "How does Playwright's event-driven page model handle a new tab opening, and what is the recommended pattern for capturing and interacting with the new page reliably?",
      options: [
        "Playwright automatically merges new tabs into the current page object and re-evaluates all locators against the combined DOM, so engineers interact with the new tab's content using the same page variable without any additional code.",
        "Engineers must poll `context.pages()` in a loop with a fixed sleep interval until the new tab appears in the list, then take the last element of the array as the new page — the same pattern used in Selenium's `getWindowHandles()`.",
        "Playwright exposes a `context.waitForEvent('page')` promise that resolves with the new Page object the moment it is created; pairing this with the action that triggers the new tab in a `Promise.all` call ensures the event is captured without any race condition.",
        "Playwright does not support multi-tab workflows natively; the recommended approach is to configure the application to open confirmation dialogs in modal overlays rather than new tabs so that the test remains within a single page context.",
      ],
      correctIndex: 2,
      explanation:
        "`context.waitForEvent('page')` is Playwright's idiomatic solution. Because the new tab may open before or after the triggering click resolves, the correct pattern is `const [newPage] = await Promise.all([context.waitForEvent('page'), page.click('#confirm')])`. This ensures the event listener is registered before the action fires, completely eliminating the race condition that plagued Selenium's handle-polling approach.",
    },

    // ── LOCATORS ──────────────────────────────────────────────────

    {
      id: "pw-06",
      scenario:
        "A QA team at a healthcare portal is performing a code review on a batch of new " +
        "Playwright tests written by an outsourced team. The reviewer notices that almost " +
        "every locator is written as `page.locator('#id-7f3a2b')` or `page.locator('div > " +
        "div:nth-child(3) > span')` — dynamically generated IDs and brittle CSS paths. " +
        "Within a week of the tests being merged, a minor front-end refactor breaks sixty " +
        "tests. The QA manager calls a session to define a locator strategy going forward.",
      question:
        "Which locator strategy is most resilient to front-end refactoring and best aligns with how real users perceive and interact with the application?",
      options: [
        "Switch to XPath locators with absolute paths like `//html/body/div[2]/form/input[1]` because XPath is a W3C standard that all browsers implement identically, making tests portable across the team's Chromium, Firefox, and WebKit browser targets.",
        "Use `data-testid` attributes exclusively and request that the front-end team add a `data-testid` to every interactive element, because test-specific attributes are immune to CSS class and ID changes since they exist solely for automation purposes.",
        "Prefer Playwright's built-in role-based and semantic locators — `getByRole`, `getByLabel`, `getByText`, `getByPlaceholder` — because they query elements the same way assistive technologies do, coupling tests to user-visible semantics rather than implementation details that change with every UI refactor.",
        "Replace all locators with `page.locator('css=[data-component]')` attribute selectors scoped to the design system's component taxonomy, which ties tests to the component architecture rather than DOM structure and survives any restyling or ID regeneration.",
      ],
      correctIndex: 2,
      explanation:
        "Playwright's semantic locators (`getByRole`, `getByLabel`, `getByText`) are the framework's recommended first choice because they target elements based on their ARIA role and visible content — exactly what users and screen readers interact with. These survive CSS refactors, ID regeneration, and DOM restructuring as long as the element's purpose and label remain the same. `data-testid` is a valid fallback but requires front-end team buy-in; semantic locators require nothing extra.",
    },

    {
      id: "pw-07",
      scenario:
        "An automation engineer is writing a test for an admin dashboard that has multiple " +
        "'Edit' buttons on the page — one per row in a data table. Using `page.getByRole('button', " +
        "{ name: 'Edit' })` matches all six buttons and the test fails because Playwright " +
        "refuses to act on a locator that matches more than one element. The engineer needs " +
        "to target the Edit button for a specific row identified by the customer name 'Priya Sharma.'",
      question:
        "What is the most readable and maintainable Playwright pattern for scoping a locator to a specific row in a table to avoid multi-match errors?",
      options: [
        "Use `page.locator('tr').nth(2).getByRole('button', { name: 'Edit' })` and hard-code the row index, since the table always renders in the same alphabetical order and the index will be stable across test runs.",
        "Chain `filter` on the row locator: `page.getByRole('row').filter({ hasText: 'Priya Sharma' }).getByRole('button', { name: 'Edit' })` — this scopes the button locator to only the row containing the customer's name.",
        "Add a unique `id` attribute to every Edit button in the application source code, then use `page.locator('#edit-btn-priya-sharma')`, because test-specific IDs are the only reliable way to disambiguate identical elements in a dynamic table.",
        "Call `page.getByRole('button', { name: 'Edit' }).all()` to get an array of all Edit buttons, then iterate over each one and check its surrounding text with `elementHandle.innerText()` until finding the one adjacent to 'Priya Sharma.'",
      ],
      correctIndex: 1,
      explanation:
        "Playwright's `filter({ hasText: '...' })` is the idiomatic solution for scoping a locator within a row. The chain `getByRole('row').filter({ hasText: 'Priya Sharma' }).getByRole('button', { name: 'Edit' })` is readable, resilient to row reordering, and requires no application code changes. Hard-coded `nth()` indexes break when data order changes; iterating with `elementHandle` is verbose and escapes Playwright's auto-waiting model.",
    },

    // ── AUTO-WAITING ──────────────────────────────────────────────

    {
      id: "pw-08",
      scenario:
        "A team migrating from Selenium is reviewing their old test code. A senior engineer " +
        "points out that nearly every interaction in their Selenium suite is preceded by an " +
        "explicit `WebDriverWait` call — waiting for elements to be visible, clickable, or " +
        "present. One developer asks whether they need to migrate all these wait calls into " +
        "their new Playwright tests or whether there is a different philosophy at work.",
      question:
        "What is Playwright's auto-waiting model and under what specific circumstances should engineers still write explicit waits?",
      options: [
        "Playwright has no waiting mechanism and relies on the test runner to retry failed assertions at fixed 100ms intervals; engineers must write explicit `page.waitForTimeout()` calls before every interaction to prevent race conditions during page transitions.",
        "Playwright auto-waits for elements to be attached, visible, stable, enabled, and receive events before executing any action; explicit waits are still needed for conditions Playwright cannot observe directly — such as a network request completing, a specific URL being reached, or a background state change with no visible DOM indicator.",
        "Playwright auto-waiting works only for `click` and `fill` actions; all other interactions like `hover`, `selectOption`, and `press` require the engineer to manually call `waitForSelector` first to ensure the element is ready before the action is dispatched.",
        "Playwright replaces all explicit waits with a universal 5-second implicit wait configured globally in `playwright.config.ts`; engineers should increase this to 30 seconds for slow CI environments to prevent false failures on cloud-hosted pipelines.",
      ],
      correctIndex: 1,
      explanation:
        "Playwright's actionability checks run automatically before every interaction — it verifies the element is attached to DOM, visible, stable (not animating), enabled, and not obscured. This eliminates the bulk of Selenium's explicit waits. However, engineers still need explicit waits for conditions outside the DOM: `page.waitForURL()`, `page.waitForResponse()`, `expect(page).toHaveURL()`, or `waitForFunction()` for custom JavaScript state. These cover scenarios Playwright's automatic checks cannot infer.",
    },

    // ── ASSERTIONS ────────────────────────────────────────────────

    {
      id: "pw-09",
      scenario:
        "A junior automation engineer on a retail team writes a test that checks whether a " +
        "success toast notification appears after adding an item to the cart. She writes: " +
        "`const text = await page.locator('.toast').textContent(); expect(text).toBe('Item added!');` " +
        "In CI the test fails intermittently because the toast appears 800ms after the click " +
        "and sometimes the locator evaluates before the toast is visible. A senior engineer " +
        "suggests rewriting the assertion using Playwright's web-first assertions instead.",
      question:
        "Why do Playwright's web-first assertions like `expect(locator).toHaveText()` resolve the intermittent failure, and how do they differ from evaluating a locator's value and asserting on it?",
      options: [
        "Web-first assertions run in the browser's main thread rather than in Node.js, so they have direct access to the DOM without any serialisation overhead and can read element state faster than `textContent()` calls across the DevTools Protocol bridge.",
        "Web-first assertions have a built-in retry loop with a configurable timeout — they repeatedly poll the locator's state until it matches the expected condition or the timeout expires, converting an inherently asynchronous DOM state into a stable, race-condition-free assertion.",
        "Web-first assertions automatically screenshot the page when they fail, producing visual evidence of the actual state at failure time, whereas `textContent()` assertions produce only a text diff that lacks the visual context needed to diagnose toast animation timing issues.",
        "Web-first assertions bypass the auto-waiting model entirely and evaluate the locator synchronously at the exact millisecond they are called, which makes them faster and more predictable than waiting for the element to pass actionability checks first.",
      ],
      correctIndex: 1,
      explanation:
        "The core difference is retrying. `await page.locator('.toast').textContent()` evaluates once at call time — if the toast isn't present yet, it throws. `expect(locator).toHaveText('Item added!')` retries the assertion for up to the configured timeout (default 5s), polling until the condition is met. This built-in retry loop makes web-first assertions inherently tolerant of asynchronous UI state, eliminating the timing-related flakiness entirely.",
    },

    // ── PAGE OBJECT MODEL ─────────────────────────────────────────

    {
      id: "pw-10",
      scenario:
        "An automation suite at a travel booking company has grown to 200 tests. The " +
        "application's login page recently updated — the email input's placeholder changed " +
        "from 'Enter email' to 'Work email address.' This single change broke 47 tests " +
        "because each one directly referenced `page.getByPlaceholder('Enter email')`. " +
        "The QA architect calls a redesign session to prevent this class of breakage " +
        "from happening again.",
      question:
        "How does the Page Object Model pattern resolve this maintenance problem, and what is the single most important structural rule when implementing POM in Playwright?",
      options: [
        "POM resolves the problem by moving all locators into a shared constants file that every test imports; when a locator changes, engineers update one string in the constants file and all 47 tests automatically use the new value.",
        "POM encapsulates all locators and interaction methods for a page into a dedicated class; tests call methods like `loginPage.fillEmail()` rather than using locators directly — so when the placeholder changes, only the POM class is updated, and all tests consuming it are unaffected.",
        "POM resolves the problem by generating locators dynamically at runtime using the Playwright codegen tool, which always produces the current selector matching the live application state and never stores static locator strings that can go stale.",
        "POM encapsulates locators in a base class that every test extends via inheritance; the locator resolution logic is moved into a `beforeEach` hook in the base class so that selectors are re-evaluated fresh before every individual test assertion.",
      ],
      correctIndex: 1,
      explanation:
        "POM's value is the single point of change: all locators and interactions for a page live in one class. When the placeholder changes, only `LoginPage.ts` is updated — not the 47 test files. The key structural rule is that POM classes should expose intent-revealing methods (`fillEmail`, `submitLogin`) rather than exposing raw locators to tests, keeping test logic at a business-scenario level and hiding DOM-level details inside the page object.",
    },

    {
      id: "pw-11",
      scenario:
        "A principal engineer is reviewing a Playwright Page Object implementation submitted " +
        "by a contractor. The POM class constructor accepts a `Page` object and stores it. " +
        "However, the contractor has also added `await page.goto('/login')` inside the " +
        "constructor and scattered `await page.waitForLoadState('networkidle')` calls " +
        "throughout several POM methods. The principal flags both patterns as antipatterns " +
        "during code review.",
      question:
        "Why are navigation calls inside POM constructors and excessive `waitForLoadState('networkidle')` calls antipatterns in a Playwright test suite?",
      options: [
        "Constructors in JavaScript cannot contain `await` calls because they are synchronous and return the object immediately; the `await` keyword is silently ignored inside constructors, causing navigation to proceed without the test waiting for the page to finish loading.",
        "Navigation in constructors violates the principle that constructors should not have side effects — it prevents reusing the page object without navigating and makes test setup order-dependent. `waitForLoadState('networkidle')` is fragile because modern SPAs never fully reach networkidle due to polling and analytics requests, causing unnecessary timeouts.",
        "Navigation inside constructors makes the POM class incompatible with Playwright's parallel execution model because each worker creates its own context, and a constructor-triggered navigation in one worker will overwrite the URL state being used by another worker in the same test run.",
        "Calling `page.goto()` inside a POM constructor is only an antipattern in TypeScript; in JavaScript Playwright tests it is an accepted pattern because the absence of async/await enforcement means constructor side effects are handled predictably by the event loop.",
      ],
      correctIndex: 1,
      explanation:
        "Constructors should initialise state, not perform async operations — JavaScript constructors are synchronous and `await` in them doesn't work as intended without wrapping the class in a factory function. More importantly, coupling navigation to instantiation means you can't use the POM on a page that's already loaded. `networkidle` is unreliable for modern SPAs that maintain persistent WebSocket connections or analytics heartbeats, leading to 30-second timeouts. Prefer `waitForLoadState('domcontentloaded')` or specific element assertions.",
    },

    // ── API TESTING WITH PLAYWRIGHT ───────────────────────────────

    {
      id: "pw-12",
      scenario:
        "A test team at a fintech company is debating their testing strategy. Their application " +
        "has a REST API backend and a React frontend. They currently have a Postman collection " +
        "for API tests and a Playwright suite for UI tests, managed as two completely separate " +
        "test assets by two different teams. A tech lead proposes consolidating API testing " +
        "into Playwright using `request` context, and needs to explain the tactical advantage " +
        "this brings to the test suite beyond just reducing tools.",
      question:
        "What testing capability does Playwright's `request` context enable that requires a combination of API and UI tooling when the two are managed separately?",
      options: [
        "Playwright's request context can run API assertions 40% faster than Postman because it uses the same DevTools Protocol connection as the browser rather than making separate HTTP connections through the operating system's network stack.",
        "Using Playwright's request context for API calls within UI tests enables hybrid scenarios: seeding test data via API before a UI test, tearing down state via API after a test, or bypassing the UI login flow to pre-authenticate a browser context — dramatically speeding up test setup without needing a separate tool or team.",
        "Playwright's request context automatically validates responses against an OpenAPI specification file and fails the test if the API returns an undocumented field, providing contract testing capabilities that Postman requires a paid plan to enable.",
        "Consolidating API tests into Playwright means the test results are reported in a single HTML report, which satisfies the compliance audit requirement that all test evidence for a release must appear in a single artefact with a unified pass/fail status.",
      ],
      correctIndex: 1,
      explanation:
        "The strategic value of Playwright's `request` context is the ability to blend API and UI interactions in a single test. The most impactful application is API-driven setup: rather than clicking through a registration form and email verification to set up a user, a test can call the API directly to create a pre-verified user in milliseconds, then use `page.goto()` for the actual UI scenario being tested. This is also how Playwright recommends handling login — set authentication state via API once, save to `storageState`, and reuse across hundreds of tests.",
    },

    // ── NETWORK INTERCEPTION AND MOCKING ──────────────────────────

    {
      id: "pw-13",
      scenario:
        "A QA engineer at a media company is testing the user interface for a video recommendation " +
        "feature. The backend recommendation engine is still under development and returns " +
        "different results each day based on trending content. This makes the UI tests " +
        "non-deterministic — they pass on Tuesday but fail on Wednesday because the " +
        "recommended titles change. The team needs a way to test the UI component in " +
        "isolation without waiting for the backend to stabilise.",
      question:
        "How does Playwright's network interception feature solve this non-determinism problem, and what is the correct API to intercept and replace a network response?",
      options: [
        "Playwright's network interception pauses all outbound network requests and queues them until the test explicitly releases them, allowing the test to control the exact order and timing of API responses to simulate race conditions and loading states.",
        "Use `page.route()` to intercept requests matching a URL pattern and call `route.fulfill()` with a fixed JSON payload — this replaces the real API response with deterministic mock data, making the UI test completely independent of backend state.",
        "Configure a `msw` (Mock Service Worker) instance in the test's `beforeEach` hook, which installs a service worker in the browser that intercepts all fetch calls and returns stubbed responses registered via `rest.get()` handler definitions.",
        "Set `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1` in the CI environment and point `baseURL` to a local JSON server that serves static fixture files, effectively replacing the backend for the duration of the test run without changing any test code.",
      ],
      correctIndex: 1,
      explanation:
        "`page.route(urlPattern, handler)` is Playwright's built-in interception API. The handler receives a `Route` object and the engineer calls `route.fulfill({ contentType: 'application/json', body: JSON.stringify(fixture) })` to return deterministic mock data. This runs entirely within the test process — no service workers, no separate mock servers, no infrastructure. It's ideal for testing UI components against controlled data states (empty list, error, pagination edge cases) independent of backend availability.",
    },

    {
      id: "pw-14",
      scenario:
        "A payments team needs to write an automated test that validates the UI correctly " +
        "displays a 'Payment gateway unavailable' error message when the external payment " +
        "provider's API returns a 503 status code. The real payment provider cannot be " +
        "reliably forced into a 503 state in any test environment, and using the live " +
        "provider would incur transaction fees and compliance risk. The team wants to " +
        "simulate the failure condition purely within the test.",
      question:
        "What Playwright network interception approach simulates a specific HTTP error response from a third-party API without any changes to application code or test infrastructure?",
      options: [
        "Temporarily update the application's environment configuration file to point to a broken internal URL that returns 503 by design, run the test, then restore the original URL — this requires no Playwright-specific code and works across all test frameworks.",
        "Use `page.route()` matching the payment provider's API URL and call `route.fulfill({ status: 503, body: 'Service Unavailable' })` to return the simulated error response, then assert that the expected error UI appears.",
        "Use `page.route()` with `route.abort('connectionrefused')` to simulate a network-level connection failure, which causes the application's fetch call to throw a network error rather than receiving an HTTP response, testing a slightly different but equivalent error path.",
        "Mock the payment module at the JavaScript module level using `page.addInitScript()` to replace the payment SDK's exported function with a version that throws a 503 error object before any network request is made, keeping the test independent of Playwright's network layer.",
      ],
      correctIndex: 1,
      explanation:
        "`route.fulfill({ status: 503 })` is the direct solution for simulating specific HTTP status codes from third-party APIs. The test intercepts the URL pattern of the payment provider, returns a controlled 503 response, and then asserts on the application's error handling UI. This requires zero application code changes and zero infrastructure. `route.abort()` simulates a different failure mode (network-level, not HTTP), which may test a different code path in the application's error handling.",
    },

    // ── AUTHENTICATION HANDLING ───────────────────────────────────

    {
      id: "pw-15",
      scenario:
        "A test suite for an enterprise SaaS platform has 180 UI tests, all of which require " +
        "the user to be authenticated before the test logic begins. Currently, each test " +
        "navigates to the login page and fills in credentials using the UI. On CI, the " +
        "login sequence alone accounts for 38 minutes of the total 95-minute suite run time. " +
        "The lead engineer wants to eliminate this overhead without compromising test isolation.",
      question:
        "What is Playwright's recommended strategy for sharing authenticated state across tests without repeating the login UI flow in every test?",
      options: [
        "Use a `beforeAll` hook at the top of every test file that performs the login once per file and stores the resulting cookies in a module-level variable, then inject those cookies into `page.context()` at the start of each test using `context.addCookies()`.",
        "Perform login once in a global setup file, save the resulting browser storage state to a JSON file using `context.storageState()`, then configure `playwright.config.ts` to load this state file as the starting context for every test — giving each test a pre-authenticated session without any login UI interaction.",
        "Hard-code the session token obtained from the authentication API directly into the `Authorization` header of every `page.goto()` call using Playwright's `extraHTTPHeaders` option, bypassing cookie-based authentication entirely and eliminating the need for any login flow.",
        "Create a single long-running test that logs in once at the start and then executes all 180 test scenarios sequentially in the same browser session, eliminating repeated login overhead by reusing the authenticated state throughout the entire test run.",
      ],
      correctIndex: 1,
      explanation:
        "Playwright's storage state pattern is the official recommended approach. A `global-setup.ts` file logs in via UI or API once, then calls `context.storageState({ path: 'auth.json' })` to serialise cookies and localStorage. `playwright.config.ts` sets `use: { storageState: 'auth.json' }` so every test starts with a pre-authenticated context. Each test still gets its own isolated BrowserContext (so tests don't share state), but they all start already authenticated — eliminating 38 minutes of redundant login flows.",
    },

    // ── FIXTURES ──────────────────────────────────────────────────

    {
      id: "pw-16",
      scenario:
        "A test engineer notices that across her team's 12 spec files, the same setup code " +
        "appears in almost every `beforeEach` hook: creating a database record via API, " +
        "navigating to a specific page, and initialising two Page Object instances. She " +
        "wants to share this setup logic across files in a type-safe, reusable way without " +
        "creating a utility file that every spec imports and calls manually.",
      question:
        "What Playwright-native mechanism is designed specifically for sharing and extending setup logic across test files in a type-safe and composable way?",
      options: [
        "A shared `beforeEach` function exported from a `test-utils.ts` file that each spec imports and calls at the top of its own `beforeEach` hook — this is the standard JavaScript module pattern and does not require any Playwright-specific features.",
        "Playwright fixtures, defined using `test.extend({})`, allow engineers to declare custom setup and teardown logic as named dependencies that are injected into test functions automatically — composable, scoped, and TypeScript-typed without any import ceremony in the test file.",
        "Playwright's global setup file (`globalSetup` in config) can export any number of shared setup functions that Playwright automatically runs as `beforeEach` hooks for every test in the suite, injecting the return values into test arguments.",
        "A base test class that each spec extends via TypeScript class inheritance, overriding the `setUp` method to inject shared page objects and data — the base class manages the lifecycle and each subclass spec only defines its own test cases.",
      ],
      correctIndex: 1,
      explanation:
        "Playwright fixtures are the idiomatic solution. `const test = base.extend({ myPage: async ({ page }, use) => { /* setup */ await use(new MyPage(page)); /* teardown */ } })` creates a named fixture. Any test that declares `myPage` in its arguments receives it automatically — no imports, no explicit calls. Fixtures are composable (one fixture can depend on another), scoped (test, worker, or session lifetime), and fully TypeScript-typed, making them far more powerful than shared `beforeEach` functions.",
    },

    // ── VISUAL TESTING & SCREENSHOTS ──────────────────────────────

    {
      id: "pw-17",
      scenario:
        "A design team at a fintech company recently made a CSS change that was reviewed " +
        "and approved by engineering but silently introduced a 4px misalignment in the " +
        "mobile layout of the loan application form. The bug reached production and was " +
        "reported by a customer. The QA manager asks the automation team to implement a " +
        "testing layer that would have caught this visual regression before deployment.",
      question:
        "What Playwright capability enables automated detection of unintended visual changes, and how does the baseline comparison workflow operate in a CI pipeline?",
      options: [
        "Playwright's accessibility checker (`page.accessibility.snapshot()`) detects when element positions deviate from their expected coordinates in the ARIA tree, catching layout shifts that CSS changes introduce without requiring any visual comparison.",
        "Playwright's `expect(page).toHaveScreenshot()` captures a screenshot on first run as a baseline, then on subsequent runs performs a pixel-by-pixel diff against that baseline — if pixels differ beyond a configurable threshold, the assertion fails, and the diff image is included in the report.",
        "Playwright integrates with Percy or Applitools by automatically sending every `page.screenshot()` call to those services for AI-powered visual diffing, without engineers needing to write any additional comparison code beyond the standard screenshot API.",
        "Playwright compares the current page's DOM snapshot against a serialised JSON baseline of element positions and computed styles, flagging any element whose `getBoundingClientRect()` values differ from the baseline by more than the configured pixel tolerance.",
      ],
      correctIndex: 1,
      explanation:
        "`toHaveScreenshot()` is Playwright's built-in visual regression tool. On the first run (`--update-snapshots`), it saves a PNG baseline to the project. On every subsequent run, it takes a new screenshot and diffs it pixel-by-pixel. If the diff exceeds the threshold, the test fails and Playwright outputs the actual, expected, and diff images to the test report. Baseline images are committed to version control, making visual regressions reviewable in the same pull request as code changes.",
    },

    // ── TRACING & DEBUGGING ───────────────────────────────────────

    {
      id: "pw-18",
      scenario:
        "A CI pipeline at a logistics company shows that a specific Playwright test consistently " +
        "fails on the second retry in the GitHub Actions environment but always passes locally " +
        "on developer machines. The test engineers have no visibility into what the browser is " +
        "doing during the CI run. The team lead asks them to enable the tooling that will give " +
        "a complete, replayable record of every action, network request, and DOM snapshot " +
        "from the failing CI run.",
      question:
        "What Playwright feature provides a comprehensive, replayable artefact of a test run including every action, screenshot, network request, and console log, and how is it configured for CI failures?",
      options: [
        "Playwright's `--reporter=html` flag generates an HTML report that includes a timeline of all test steps with their pass/fail status, duration, and any error messages captured at the point of failure during the CI run.",
        "Playwright Trace Viewer — enabled via `trace: 'on-first-retry'` in `playwright.config.ts` — records a full trace zip for any test that fails its first attempt; engineers download the trace artefact from CI and open it in `npx playwright show-trace` to replay every action, DOM state, network call, and console output frame by frame.",
        "Playwright's `--debug` flag launches tests in headed mode with the Playwright Inspector attached, allowing engineers to step through each action interactively and inspect the DOM state at any point, even when running in a remote CI environment over SSH.",
        "Setting `video: 'on'` in `playwright.config.ts` captures a full video recording of every test run; engineers review the MP4 file attached to the CI artefacts to visually identify the moment the test diverges from the expected behaviour.",
      ],
      correctIndex: 1,
      explanation:
        "Playwright Trace Viewer is the most powerful debugging tool for CI failures. `trace: 'on-first-retry'` is the recommended setting — it incurs no overhead on passing tests and automatically captures a trace for any test that needs a retry. The trace zip contains screenshots before and after every action, full network request/response logs, console output, and source code snapshots. It's designed specifically for the 'passes locally, fails in CI' scenario where interactive debugging is impossible.",
    },

    // ── PARALLEL EXECUTION ────────────────────────────────────────

    {
      id: "pw-19",
      scenario:
        "An engineering team has a Playwright suite of 300 tests. Running with a single worker " +
        "takes 48 minutes on CI. The DevOps lead wants to reduce this to under 10 minutes " +
        "using parallel execution. However, the QA lead raises a concern: 40 of the 300 tests " +
        "modify shared database records and will corrupt each other's data if they run " +
        "concurrently. The team needs a strategy that maximises parallelism while protecting " +
        "the fragile 40 tests.",
      question:
        "What combination of Playwright configuration settings addresses both the parallelism goal and the shared-state isolation concern?",
      options: [
        "Set `workers: 8` globally and add a distributed lock mechanism in `beforeEach` that acquires a semaphore from a Redis instance before each test, serialising access to shared database records while still allowing independent tests to run concurrently across workers.",
        "Set `workers: 8` in `playwright.config.ts` to parallelise the independent 260 tests, and annotate the 40 database-mutating tests with `test.describe.configure({ mode: 'serial' })` or place them in a separate project with `workers: 1` so they run sequentially while the rest benefit from full parallelism.",
        "Set `fullyParallel: true` globally and add a `test.setTimeout(120000)` to the 40 fragile tests so they have extra time to complete before the next test begins, relying on the extended timeout to create enough spacing between mutations to avoid data conflicts.",
        "Move the 40 database-mutating tests into a separate `beforeAll` hook that runs before the parallel test suite, clearing and seeding the database to a known state so that by the time parallel workers start, all mutations have already been applied and no concurrent conflicts are possible.",
      ],
      correctIndex: 1,
      explanation:
        "Playwright's `test.describe.configure({ mode: 'serial' })` is the built-in mechanism for marking a group of tests to run sequentially even when the suite-level worker count is greater than 1. Combined with a high worker count for the independent tests, this gives the best of both worlds: maximum parallelism where safe, and guaranteed serialisation where shared state would cause corruption. Separate projects with different `workers` settings achieve the same result with cleaner configuration boundaries.",
    },

    // ── CI/CD INTEGRATION ─────────────────────────────────────────

    {
      id: "pw-20",
      scenario:
        "A platform engineering team is setting up Playwright in a GitHub Actions pipeline for " +
        "the first time. The pipeline fails immediately because the Ubuntu runner does not have " +
        "the browser dependencies that Playwright requires. A developer familiar with Cypress " +
        "suggests simply installing Chrome via `apt-get`, but the DevOps lead says there is " +
        "a better approach specific to Playwright.",
      question:
        "What is the correct and officially recommended approach for provisioning browser dependencies in a GitHub Actions CI pipeline for Playwright?",
      options: [
        "Use the `browser: chrome` option in the workflow file's `uses: actions/setup-node` step to instruct the GitHub Actions runner to install Chrome as part of the Node.js setup process before running any Playwright commands.",
        "Add `npx playwright install --with-deps` as a pipeline step after installing npm dependencies; this command downloads Playwright's own managed browser binaries and all required system libraries for the current OS in a single command.",
        "Use the `mcr.microsoft.com/playwright` Docker image as the job container in the workflow — it comes with all browsers and system dependencies pre-installed, eliminating the need for any manual browser installation steps in the pipeline YAML.",
        "Check the Playwright browser binaries into the repository's `node_modules/.cache` directory using `git lfs`, so that CI runners pull pre-built binaries from the repository cache rather than downloading them from Playwright's CDN on every pipeline run.",
      ],
      correctIndex: 1,
      explanation:
        "`npx playwright install --with-deps` is the canonical CI step in Playwright's official GitHub Actions documentation. It installs Playwright's managed browser binaries (Chromium, Firefox, WebKit) along with all system-level dependencies (fonts, codecs, shared libraries) required by those browsers on the CI runner's OS. While the Docker image approach also works, `install --with-deps` is simpler for projects already using `actions/setup-node` and doesn't require container configuration.",
    },

    {
      id: "pw-21",
      scenario:
        "A release engineering team runs a 500-test Playwright suite on every pull request. " +
        "Twelve of those tests fail intermittently — they pass 8 out of 10 runs with no code " +
        "changes between runs. These flaky tests are causing developers to re-trigger CI " +
        "pipelines manually, costing an average of 35 minutes of developer time per PR. " +
        "The engineering manager wants an immediate tactical mitigation while the root causes " +
        "are investigated.",
      question:
        "What Playwright configuration setting provides immediate relief from flaky test failures on CI without hiding the failures permanently or masking genuine bugs?",
      options: [
        "Set `timeout: 120000` for the flaky tests to give slow operations more time to complete, on the assumption that the flakiness is caused by timing issues that longer timeouts will resolve without requiring any test code changes.",
        "Set `retries: 2` in `playwright.config.ts` (or per flaky test using `test.describe` options) so that failing tests are automatically retried up to two times before being marked as failed — genuine bugs fail consistently across all attempts while transient flakiness passes on a retry, preventing unnecessary pipeline failures.",
        "Use `test.skip(process.env.CI === 'true', 'Skipped on CI due to flakiness')` to conditionally skip the twelve flaky tests in CI environments, ensuring the pipeline remains green while developers investigate the root causes at their own pace.",
        "Split the pipeline into two parallel jobs — a 'stable' job running the 488 reliable tests that blocks the PR merge, and a 'flaky' job running the 12 suspect tests in non-blocking mode so their failures generate notifications but do not prevent deployment.",
      ],
      correctIndex: 1,
      explanation:
        "`retries: 2` is the correct tactical mitigation. Playwright's retry mechanism re-runs a failing test up to N times; if it passes on any retry, it is reported as 'flaky' rather than 'failed' — the pipeline proceeds and the flakiness is flagged in the report for investigation. This is fundamentally different from skipping (which hides problems) or non-blocking jobs (which require pipeline restructuring). The 'flaky' status in HTML reports makes it easy to identify which tests need attention.",
    },

    // ── CODEGEN ───────────────────────────────────────────────────

    {
      id: "pw-22",
      scenario:
        "A business analyst with no coding background but deep knowledge of the application " +
        "is being asked to help the automation team by demonstrating user workflows that " +
        "are difficult to document in text. The QA lead wants to use this opportunity to " +
        "generate initial test scaffolding that the automation engineers can then refine " +
        "into maintainable tests. She mentions that Playwright has a tool designed exactly " +
        "for this kind of workflow capture.",
      question:
        "What does `npx playwright codegen` produce, and what are the critical limitations engineers must understand before treating its output as production-ready test code?",
      options: [
        "`playwright codegen` produces a complete test suite with assertions, Page Object Model classes, and fixture definitions based on the observed interactions, requiring only minor adjustments to variable names and hardcoded test data before merging into the repository.",
        "`playwright codegen` records browser interactions and generates the corresponding Playwright API calls as a test script; it is a useful starting point and accelerates writing mechanical interaction code, but it produces brittle CSS/XPath locators and no assertions — engineers must replace locators with semantic alternatives and add meaningful assertions before the output has real testing value.",
        "`playwright codegen` is primarily a network recording tool that captures all HTTP requests made during the browser session and generates a mock server configuration that can replay those exact responses, making it most useful for API mocking rather than UI test creation.",
        "`playwright codegen` generates fully deterministic, assertion-complete tests by inferring the expected state from the application's responses during the recording session, including automatic snapshot assertions for every page state observed during the recorded workflow.",
      ],
      correctIndex: 1,
      explanation:
        "Codegen records interactions and generates the mechanical interaction code — `click`, `fill`, `goto` — quickly. Its practical limitations are that it defaults to brittle attribute-based locators (IDs, CSS classes) rather than semantic ones, and it generates zero assertions because it cannot know what the engineer intends to verify. The output is a scaffold: useful for capturing the interaction sequence, but requiring engineer judgment to add `expect` assertions and replace auto-generated locators with resilient `getByRole`/`getByLabel` equivalents.",
    },

    // ── MOBILE TESTING & EMULATION ────────────────────────────────

    {
      id: "pw-23",
      scenario:
        "A product manager reports that the mobile version of the company's checkout flow " +
        "has a significantly higher cart abandonment rate than desktop. The QA team currently " +
        "has no automated tests specifically for mobile viewports. A developer asks whether " +
        "the team needs to purchase real mobile devices or use a cloud device farm to add " +
        "mobile coverage to their Playwright suite.",
      question:
        "How does Playwright's device emulation work, and what are the honest limitations of emulation compared to testing on real physical devices?",
      options: [
        "Device emulation in Playwright works by proxying browser traffic through Browserstack's device cloud automatically when a `devices` configuration is detected in `playwright.config.ts`, providing real-device results without engineers needing to set up a separate Browserstack account.",
        "Playwright's device emulation installs a custom browser engine derived from iOS Safari and Android Chrome that executes JavaScript through a mobile-specific V8 runtime, providing native mobile rendering fidelity equivalent to testing on actual devices.",
        "Playwright ships with a `devices` dictionary (e.g., `devices['iPhone 14']`) that configures viewport, user-agent, touch events, and device pixel ratio for a given device profile; emulation is excellent for catching layout and interaction bugs at scale, but it cannot replicate hardware-specific behaviours like real GPS sensors, battery APIs, or the performance characteristics of mobile CPUs.",
        "Playwright's device emulation only changes the viewport dimensions and CSS media query breakpoints; it does not emulate touch events, so any test that involves swipe gestures or pinch-to-zoom must be run on a real device or a cloud device farm regardless of emulation settings.",
      ],
      correctIndex: 2,
      explanation:
        "Playwright's `devices` dictionary configures multiple emulation dimensions simultaneously: viewport size, user-agent string, touch support, device pixel ratio, and default browser context settings. This catches a large class of mobile-specific bugs (responsive layout, touch targets, mobile navigation patterns) cheaply at scale. The honest limitations: emulation runs on a desktop Chromium engine, not a real mobile CPU — it won't catch performance regressions on low-end hardware, and platform-specific WebKit rendering differences require a real iOS device or a cloud service.",
    },

    // ── REPORTING ─────────────────────────────────────────────────

    {
      id: "pw-24",
      scenario:
        "A QA manager is presenting the weekly test results to engineering leadership and " +
        "the product team. She currently pastes screenshots of terminal output into a slide " +
        "deck. An engineer on her team suggests generating a proper HTML report automatically " +
        "as part of the CI pipeline so that stakeholders can drill into failures without " +
        "interpreting raw terminal logs.",
      question:
        "How is Playwright's built-in HTML reporter configured and what information does it surface for a failed test that is unavailable in terminal output?",
      options: [
        "The HTML reporter generates an interactive test matrix that automatically cross-references failing tests against recent Git commits using the repository's blame history, surfacing the most likely code change responsible for each failure without manual investigation.",
        "Playwright's default reporter is already HTML; switching to `reporter: 'list'` is required for terminal output, and reverting to the default (no reporter setting) in `playwright.config.ts` will automatically re-enable the HTML report generation without any additional configuration.",
        "The HTML reporter is enabled by running `npx playwright test --reporter=html` or setting `reporter: 'html'` in config; it generates a self-contained HTML file with a filterable test list, step-level timings, attached screenshots, videos, and trace viewer links for any failing test — providing complete visual and network context that terminal output cannot convey.",
        "Playwright's HTML reporter requires the `@playwright/test-reporter` npm package to be installed separately and configured with a licence key; once activated it publishes results to a Playwright-hosted web dashboard accessible via a shareable URL for up to 30 days.",
      ],
      correctIndex: 2,
      explanation:
        "Setting `reporter: [['html', { open: 'never' }]]` in `playwright.config.ts` (or using the CLI flag) generates a self-contained `playwright-report/index.html` after each run. For failed tests it includes: attached screenshots (on failure), video recordings (if configured), the full action log with step durations, and a direct link to open the Playwright Trace Viewer — none of which appear in terminal output. The report is a single artefact that can be uploaded as a CI build artefact and shared directly with stakeholders.",
    },

    // ── ACCESSIBILITY TESTING ─────────────────────────────────────

    {
      id: "pw-25",
      scenario:
        "A government digital services team is legally required under WCAG 2.1 AA to ensure " +
        "their web application is accessible. A compliance officer asks the QA team to include " +
        "automated accessibility checks in their Playwright test suite to catch regressions " +
        "before deployment. A developer asks whether Playwright can run accessibility audits " +
        "natively or whether an additional library is required.",
      question:
        "How can automated accessibility testing be integrated into a Playwright suite, and what is a critical business caveat about automated accessibility auditing that the compliance officer must understand?",
      options: [
        "Accessibility testing cannot be meaningfully automated for WCAG compliance; Playwright should be used exclusively for functional testing while a dedicated manual QA team with screen reader expertise performs all accessibility audits on a quarterly schedule.",
        "The `@axe-core/playwright` library integrates axe-core's ruleset into Playwright tests via `checkA11y(page)`, catching a significant subset of WCAG violations automatically; however, automated tools can detect only 30-40% of all accessibility issues — manual testing with assistive technologies remains essential for full WCAG compliance.",
        "Playwright natively validates every page against WCAG 2.1 AA rules when `accessibility: true` is set in the config; it automatically fails any test where the page contains an accessibility violation, with no additional libraries required.",
        "Playwright's `page.accessibility.snapshot()` method returns the full ARIA tree and engineers manually compare it against a baseline snapshot file, flagging any structural changes as potential accessibility regressions without requiring any third-party libraries.",
      ],
      correctIndex: 1,
      explanation:
        "`@axe-core/playwright` is the standard integration — it brings Deque's axe-core engine into Playwright tests and runs automated ARIA, contrast, landmark, and labelling checks. The critical caveat for the compliance officer: automated tools catch approximately 30-40% of WCAG violations. Colour contrast and ARIA attribute errors are automatable; but whether a screen reader flow makes sense, whether keyboard navigation is logical, or whether complex interactions are usable — these require human testing with actual assistive technologies. Automation prevents regressions; it does not certify compliance.",
    },

    // ── HANDLING DYNAMIC CONTENT ──────────────────────────────────

    {
      id: "pw-26",
      scenario:
        "A test engineer is writing a Playwright test for a data-intensive dashboard that " +
        "displays a table of 500 rows fetched asynchronously from an API. After clicking " +
        "'Load Data,' there is a loading spinner visible for 2-4 seconds before the table " +
        "renders. The engineer's first attempt — clicking the button then immediately " +
        "asserting on the table row count — fails because the assertion runs before the " +
        "data has loaded. She wants to fix this without using `page.waitForTimeout()`.",
      question:
        "What is the correct Playwright pattern for waiting for asynchronously loaded content to appear before making assertions, and why is `waitForTimeout()` explicitly discouraged?",
      options: [
        "`waitForTimeout()` is only discouraged in Playwright's documentation for aesthetic reasons; in practice, a 5000ms timeout before the row count assertion is the most reliable approach for production suites because it accommodates variability in both network latency and rendering time across different CI environments.",
        "Chain `.first()` to the locator to ensure it resolves against the first matching element as soon as any row is attached to the DOM, then use the row count assertion; `.first()` has a built-in 30-second wait that covers any realistic data load time.",
        "Call `await page.waitForResponse(url => url.includes('/api/dashboard-data'))` before the row count assertion to pause test execution until the API response has been received, ensuring the data is in the browser before any DOM assertions are made.",
        "Use `await expect(page.getByRole('row')).toHaveCount(500)` — Playwright's web-first assertion retries until the row count matches or times out, naturally waiting for the asynchronous data to render without any explicit sleep or timeout call.",
      ],
      correctIndex: 3,
      explanation:
        "`expect(locator).toHaveCount(500)` is the idiomatic solution. It retries repeatedly until the row count matches, intrinsically waiting for the async data to render. `waitForTimeout()` is explicitly discouraged because it introduces an arbitrary fixed delay — too short on a slow CI server, wastefully long on a fast one — making tests simultaneously flaky and slow. `waitForResponse` is also valid for the network wait, but combining it with a web-first assertion on the rendered output is the most robust approach.",
    },

    // ── IFRAMES AND SHADOW DOM ────────────────────────────────────

    {
      id: "pw-27",
      scenario:
        "A QA engineer is automating a test for a payment checkout page that embeds a " +
        "third-party Stripe card entry form inside an iframe. When she tries to use " +
        "`page.getByLabel('Card number')` to fill in the card details, Playwright cannot " +
        "find the element because it lives inside the iframe's separate document context. " +
        "She needs to understand how Playwright models cross-frame interactions.",
      question:
        "What is Playwright's API for accessing and interacting with elements inside an iframe, and how does it differ from Playwright's handling of Shadow DOM elements?",
      options: [
        "Both iframes and Shadow DOM require the engineer to first call `page.evaluateHandle()` to obtain a JavaScript handle to the shadow root or iframe document, then pass that handle to `page.locator()` as a scope parameter before any locator operations can be performed.",
        "Playwright cannot interact with third-party embedded iframes from a different origin due to browser same-origin security restrictions; the recommended workaround is to use `page.route()` to intercept the iframe's src URL and replace it with a same-origin test double that exposes the card fields without an iframe boundary.",
        "Playwright automatically pierces all iframes and Shadow DOM boundaries using its locator engine, so `page.getByLabel('Card number')` works identically regardless of whether the input is on the main page, inside an iframe, or nested in a Shadow DOM — no special API calls are required.",
        "For iframes, engineers use `const frame = page.frameLocator('iframe[name=\"stripe\"]')` and then chain locators on the returned FrameLocator — `frame.getByLabel('Card number')`. Playwright's standard locators already pierce Shadow DOM boundaries by default, so Shadow DOM elements require no special syntax.",
      ],
      correctIndex: 3,
      explanation:
        "Playwright uses `page.frameLocator(selector)` to create a FrameLocator that scopes all subsequent locator calls to the iframe's document context. `page.frameLocator('iframe').getByLabel('Card number').fill('4242...')` works across the frame boundary. Shadow DOM is handled differently and more transparently: Playwright's CSS engine pierces shadow roots by default, so `page.getByLabel()` finds elements inside Shadow DOM without any special API — the asymmetry is intentional and reflects the different security models of the two technologies.",
    },

    // ── FILE UPLOAD AND DOWNLOAD ──────────────────────────────────

    {
      id: "pw-28",
      scenario:
        "A test engineer is automating the verification of a document export feature on an " +
        "HR platform. The test must click 'Export to PDF,' wait for the browser download " +
        "to complete, and then verify that the downloaded file is a valid PDF with a " +
        "filename matching a specific pattern. She is unsure how to handle browser downloads " +
        "in Playwright since the file is saved to disk rather than appearing in the DOM.",
      question:
        "What is Playwright's API for intercepting and asserting on a browser-initiated file download without relying on OS-level file system polling or fixed sleep timers?",
      options: [
        "Set `downloadsPath` in `playwright.config.ts` to a known directory, then after clicking the export button, use `fs.readdirSync(downloadsPath)` to poll until a new file appears, and assert on its name and content using Node.js file system APIs.",
        "Configure `acceptDownloads: false` in the browser context options to prevent the file from being saved to disk; Playwright then intercepts the download stream and exposes it as a Buffer that can be asserted against using `expect(buffer).toMatchSnapshot()`.",
        "Intercept the network response that triggers the download using `page.route()` and call `route.fetch()` followed by `response.body()` to capture the file bytes before they are written to disk, enabling inline assertions without any file system interaction.",
        "Use `page.waitForEvent('download')` paired with the action that triggers the download in a `Promise.all` call; the resolved Download object provides `download.suggestedFilename()` for filename assertions and `download.path()` to get the local file path for content validation.",
      ],
      correctIndex: 3,
      explanation:
        "`Promise.all([page.waitForEvent('download'), page.click('#export-pdf')])` captures the download event the moment it fires without a race condition. The `Download` object provides `suggestedFilename()` for name assertions and `path()` for accessing the saved file. `acceptDownloads` must be `true` (default) in the context options. This pattern avoids OS-level polling and fixed sleeps — the test proceeds exactly when the download is available, not after an arbitrary wait.",
    },

    // ── TAGS AND TEST ORGANISATION ────────────────────────────────

    {
      id: "pw-29",
      scenario:
        "A QA team has a 400-test Playwright suite categorised into smoke, regression, and " +
        "performance categories. On every commit they want to run only the 30 smoke tests " +
        "to get fast feedback within 2 minutes. The full regression suite runs nightly. " +
        "Currently, smoke tests are in a separate directory, but some smoke tests share " +
        "setup fixtures with regression tests, making directory-based separation awkward " +
        "to maintain. The team wants a tagging approach instead.",
      question:
        "What Playwright mechanism allows engineers to tag tests for selective execution without restructuring the file system, and how are tagged tests run in the pipeline?",
      options: [
        "Tags are defined in a separate JSON manifest file (`test-tags.json`) that maps test file paths to category arrays; Playwright reads this manifest when `--tagged` is passed on the CLI and builds a filtered test execution plan before the test runner starts.",
        "Playwright's `projects` feature in `playwright.config.ts` supports a `grep` property per project, allowing engineers to define a 'smoke' project that filters by a naming convention like `SMOKE_` at the start of test file names, running matched files across configured browsers.",
        "Playwright supports test tags via the `@tag` annotation syntax in test titles — e.g., `test('validates login @smoke', ...)` — and tagged subsets are executed using the `--grep` CLI flag: `npx playwright test --grep @smoke` runs only tests whose title matches the pattern.",
        "Playwright uses Jest-compatible `describe.only` and `test.only` syntax for selective test execution; tagging is achieved by wrapping smoke tests in `test.only` blocks and setting `testPathIgnorePatterns` in the config to exclude non-tagged files from the smoke run.",
      ],
      correctIndex: 2,
      explanation:
        "Playwright's `--grep` flag matches against test titles using a regex or string pattern. The convention is to embed tags in test titles as `@tagname`: `test('user can checkout @smoke @critical', ...)`. Running `npx playwright test --grep @smoke` executes only matching tests regardless of which file they live in. In `playwright.config.ts` the same filter can be set per project via `grep: /@smoke/`. This approach requires zero file reorganisation and allows tests to carry multiple tags simultaneously.",
    },

    // ── TEST DATA MANAGEMENT ──────────────────────────────────────

    {
      id: "pw-30",
      scenario:
        "A QA lead is defining best practices for a new Playwright suite at a SaaS startup. " +
        "One team member wants to hard-code test user credentials and API keys directly in " +
        "test files for simplicity. Another argues for reading them from environment " +
        "variables. A third suggests checking in a `.env` file alongside the tests. " +
        "The QA lead knows this decision has security and portability implications " +
        "beyond just where the values are stored.",
      question:
        "What is the industry-standard pattern for managing sensitive test data like credentials and API keys in a Playwright suite, and which approach must be explicitly avoided?",
      options: [
        "All credentials should be stored in the `playwright.config.ts` file under a `testData` key and accessed via `test.info().config.testData` inside tests, because centralising secrets in the config file makes them easy to audit and rotate without searching across multiple test files.",
        "Credentials should be stored in a password-protected ZIP file committed to the repository; the CI pipeline's first step decrypts the ZIP using a passphrase stored as a CI environment variable, making the credentials available to the test run while keeping them encrypted at rest in the repository.",
        "Test credentials should be generated fresh for each test run using the application's registration API in a `globalSetup` function, creating ephemeral test accounts that are deleted in `globalTeardown` — this eliminates the need to store any long-lived credentials anywhere in the project.",
        "Credentials and secrets must never be hard-coded in test files or committed to version control in any form including `.env` files; they should be injected as environment variables from a secrets manager (CI secrets, Vault, AWS Secrets Manager) and accessed via `process.env` in tests and config — with `dotenv` used only for local development with a `.env` file excluded by `.gitignore`.",
      ],
      correctIndex: 3,
      explanation:
        "The industry rule is absolute: secrets must never be committed to version control — not in test files, not in config, not in `.env` files without `.gitignore`. CI secrets (GitHub Actions Secrets, GitLab CI Variables, etc.) inject values as environment variables at runtime without exposing them in the repository. `process.env.TEST_PASSWORD` in test code, populated by the CI secrets store, is the correct pattern. A local `.env` file (gitignored) allows developers to run tests locally. The ephemeral account approach is also excellent but adds infrastructure complexity — it's complementary, not a replacement for secrets management.",
    },
  ],
};
