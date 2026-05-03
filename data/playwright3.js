/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  TEST MODULE — playwright-testing-set3.js                    ║
 * ║  30 Questions · Playwright Deep Internals & Edge Cases      ║
 * ╚══════════════════════════════════════════════════════════════╝
 * Add to index.html:
 *   <script src="data/playwright-testing-set3.js"></script>
 * Add to window._TESTS / APP_MODULES:
 *   PlaywrightSet3,
 */
const PlaywrightSet3 = {
  meta: {
    id: "playwright-testing-set3",
    testTitle: "Playwright: Internals, Edge Cases & Expert Patterns",
    topic: "playwright",
    topicLabel: "Playwright",
    difficulty: "Advanced",
    questionCount: 30,
    estimatedMinutes: 45,
    description:
      "30 advanced scenario-driven questions covering Playwright Inspector, page.evaluate, test annotations, timeout hierarchy, GraphQL interception, right-click menus, clipboard API, ARIA snapshots, PWA offline testing, performance metrics, expect.poll, locator chaining, and production-scale architectural decisions.",
    icon: "🎭",
  },

  questions: [
    // ── PLAYWRIGHT INSPECTOR & PAUSING ───────────────────────────

    {
      id: "pw3-01",
      scenario:
        "A QA engineer is writing a Playwright test for a complex multi-step registration form. " +
        "She is struggling to identify the correct locator for a dynamically rendered field that " +
        "only appears after a specific radio button selection. Running the full test repeatedly to " +
        "reach the failing step is taking 45 seconds each time. She wants to freeze the browser " +
        "at a specific point mid-test so she can manually inspect the DOM and try locators " +
        "interactively in real time without restarting from scratch.",
      question:
        "What Playwright command pauses test execution at a specific point and launches the interactive Playwright Inspector, and what can engineers do inside the Inspector that they cannot do with a breakpoint alone?",
      options: [
        "Insert `await page.pause()` at the desired point in the test — execution halts and the Playwright Inspector opens, giving the engineer a live locator explorer where they can type selectors and see them highlighted in the browser in real time, copy validated locators directly into the test, and step through subsequent actions one at a time.",
        "Run `npx playwright test --headed` to launch the browser in headed mode; this automatically pauses at the first `page.click()` call and opens DevTools so the engineer can inspect the DOM before execution continues.",
        "Set a Node.js debugger breakpoint using `debugger;` in the test file and run with `node --inspect`, which attaches Chrome DevTools to the Node.js process and freezes the browser at that line while exposing the page DOM in the DevTools Elements panel.",
        "Use `await page.waitForTimeout(60000)` to give the engineer a 60-second window to manually inspect the browser before the test continues — this is functionally equivalent to `page.pause()` but does not require launching a separate Inspector window.",
      ],
      correctIndex: 0,
      explanation:
        "`page.pause()` is Playwright's dedicated interactive debugging primitive. It halts execution and opens the Playwright Inspector — a purpose-built tool with a locator input field that highlights matching elements live in the browser, a step-through action panel, and a console. Unlike a Node.js breakpoint (which pauses the Node process but leaves the browser running), `page.pause()` freezes both the test and the browser, allowing safe DOM inspection and locator experimentation at that exact application state.",
    },

    // ── PAGE.EVALUATE ────────────────────────────────────────────

    {
      id: "pw3-02",
      scenario:
        "A test engineer at a data analytics company is writing a test that must assert on " +
        "a calculated value that is only available inside the browser's JavaScript runtime — " +
        "specifically, the output of a third-party charting library's internal `getDataSeries()` " +
        "method attached to a global object (`window.chartInstance.getDataSeries()`). " +
        "This value is never rendered to the DOM; it exists only as a JavaScript object in memory. " +
        "The engineer asks how to access runtime JavaScript values from within a Playwright test.",
      question:
        "What Playwright API executes a JavaScript function inside the browser's page context and returns its result to the Node.js test process, and what is the key constraint on values it can return?",
      options: [
        "Use `page.locator('window').evaluate('chartInstance.getDataSeries()')` — Playwright's `evaluate` method can be chained on any locator including the `window` object, and it returns the JavaScript value directly as a Node.js object with no serialisation constraints.",
        "Use `await page.evaluate(() => window.chartInstance.getDataSeries())` — this executes the arrow function inside the browser's JavaScript runtime and serialises the return value back to Node.js via the DevTools Protocol. The key constraint is that return values must be JSON-serialisable; non-serialisable types like functions, DOM elements, and circular references cannot be transferred and must be handled with `page.evaluateHandle()` instead.",
        "Use `page.addInitScript(() => { window.__testResult = window.chartInstance.getDataSeries(); })` to capture the value before the page loads, then read `window.__testResult` using a standard Playwright locator assertion after navigation completes.",
        "Playwright cannot access in-memory JavaScript values that are not reflected in the DOM — it exclusively interacts with elements and attributes. Browser runtime state must be exposed via an API endpoint or localStorage entry for Playwright tests to read it.",
      ],
      correctIndex: 1,
      explanation:
        "`page.evaluate(fn)` injects and executes `fn` in the page's JavaScript context, then transfers the return value back to Node.js using the structured clone algorithm. The critical constraint: only JSON-serialisable values (objects, arrays, strings, numbers, booleans, null) can be returned. DOM elements, class instances with methods, and circular references require `page.evaluateHandle()`, which returns an `ElementHandle` or `JSHandle` that keeps the reference alive in the browser without serialising it.",
    },

    // ── TEST ANNOTATIONS ─────────────────────────────────────────

    {
      id: "pw3-03",
      scenario:
        "A QA team is managing a 400-test suite during a turbulent sprint. Three tests are " +
        "broken because of a known backend bug that is scheduled to be fixed next week — they " +
        "want the tests to remain in the suite but not block the pipeline. Two other tests " +
        "cover a feature that is not yet built — they should be clearly marked as expected to " +
        "fail rather than silently skipped. And six slow integration tests need to run with " +
        "triple the default timeout without changing `playwright.config.ts` globally.",
      question:
        "Which Playwright test annotations address all three of these scenarios, and what is the behavioural difference between `test.fail()` and `test.fixme()`?",
      options: [
        "All three scenarios should use `test.skip()` — it is the only annotation that prevents a test from blocking the pipeline. The distinction between 'known bug,' 'not built,' and 'slow' is purely documentary and has no impact on test runner behaviour.",
        "`test.fixme()` skips the test entirely and removes it from the report; `test.skip()` runs the test but suppresses its failure from the final pipeline exit code. `test.slow()` requires a corresponding `workers: 1` setting to take effect, since timeout multiplication only applies in single-worker mode.",
        "Use `test.fail()` for the known-bug tests — they run but the suite expects them to fail, so an unexpected pass is flagged. Use `test.fixme()` for the unbuilt feature tests — they are skipped entirely with a documented intention to fix them. Use `test.slow()` for the integration tests — it multiplies the default timeout by 3 without any config change. `test.fixme()` excludes the test; `test.fail()` marks it as a known failure and still runs it.",
        "Use `test.fail()` for the known-bug tests, `test.fixme()` for the unbuilt feature tests, and increase `test.setTimeout(90000)` for the slow tests. `test.fail()` and `test.fixme()` are aliases — both run the test and expect a failure — while `test.skip()` and `test.slow()` control execution timing.",
      ],
      correctIndex: 2,
      explanation:
        "`test.fail()` marks a test as intentionally failing — Playwright runs it and expects it to fail; if it unexpectedly passes, the test fails. `test.fixme()` completely aborts/skips the test from execution (like `test.skip()`) but specifically marks it in the report as needing work. `test.slow()` is a built-in multiplier (default ×3) for the test's timeout, ideal for known slow tests without touching global config.",
    },

    // ── TIMEOUT HIERARCHY ────────────────────────────────────────

    {
      id: "pw3-04",
      scenario:
        "A senior engineer is debugging a Playwright test that fails with a timeout error, but " +
        "she cannot determine whether the timeout is coming from the overall test limit, an " +
        "individual action limit, or an assertion retry limit. The error message reads " +
        "`TimeoutError: Test timeout of 30000ms exceeded` in one run, and " +
        "`TimeoutError: Locator.click: Timeout 5000ms exceeded` in another identical run. " +
        "She asks a junior engineer to explain Playwright's timeout architecture.",
      question:
        "What are the three distinct timeout types in Playwright's hierarchy, what each controls, and which takes precedence when they conflict?",
      options: [
        "Playwright has a single unified timeout controlled by `timeout` in `playwright.config.ts`; the different error messages are generated by different internal modules but all count against the same timer. Changing `timeout` is the only configuration needed to address all timeout failures.",
        "There are two timeouts: a browser-level timeout set by the OS for all DevTools Protocol calls, and a test-level timeout set in `playwright.config.ts`. The `expect` timeout is derived by dividing the test timeout by the number of assertions in the test, so more assertions automatically get less time each.",
        "Playwright uses a cascading timeout system where the action timeout must always be shorter than the test timeout, and the expect timeout must always be shorter than the action timeout. Setting any timeout larger than its parent automatically clamps it to the parent's value, which is why different error messages appear — each is clamped to a different ceiling.",
        "There are three independent timeouts: (1) **Test timeout** (`timeout` in config or `test.setTimeout()`) — the total wall-clock time the entire test function is allowed; (2) **Action timeout** (`actionTimeout` in config or per-action `{ timeout }` option) — the time a single interaction like `click` or `fill` waits for actionability; (3) **Expect timeout** (`expect.timeout` in config or per-assertion `{ timeout }` option) — the time a web-first assertion retries before failing. They are independent — a long action can exhaust the test timeout without hitting the action timeout, and vice versa.",
      ],
      correctIndex: 3,
      explanation:
        "Playwright's three independent timeout tiers are: **Test timeout** (the full test budget — `test.setTimeout(ms)`), **Action timeout** (per-interaction — `actionTimeout` in config or `{ timeout: ms }` on each action), and **Expect timeout** (assertion retry duration — `expect: { timeout: ms }` in config). They are truly independent: a `click` with a 5s action timeout inside a 30s test runs its own 5s countdown — if the click hangs for 6s, the action times out first; if 10 actions each take 3s, the test timeout fires. Understanding which tier fired tells engineers exactly where the bottleneck is.",
    },

    // ── GRAPHQL INTERCEPTION ─────────────────────────────────────

    {
      id: "pw3-05",
      scenario:
        "A QA team at a social platform is testing a feed component that fetches data via a " +
        "GraphQL API. Unlike REST endpoints where the URL uniquely identifies the resource, " +
        "all GraphQL requests go to a single endpoint (`/graphql`). The team needs to intercept " +
        "only the `GetUserFeed` operation to return a fixture, while letting all other GraphQL " +
        "operations like `GetUserProfile` and `UpdateSettings` pass through to the real server.",
      question:
        "How does Playwright's `page.route()` API selectively intercept specific GraphQL operations on a shared endpoint while allowing all other GraphQL requests to proceed normally?",
      options: [
        "Use `page.route('**/graphql', async route => { const body = route.request().postDataJSON(); if (body?.operationName === 'GetUserFeed') { await route.fulfill({ json: fixture }); } else { await route.continue(); } })` — inspect the POST body for the operation name and selectively fulfill or continue based on the match.",
        "GraphQL operations cannot be distinguished at the network layer because they all use the same HTTP method and URL; the correct approach is to deploy a mock GraphQL server that routes operations by name and point `playwright.config.ts`'s `baseURL` at the mock server during tests.",
        "Use `page.route('/graphql', async route => { route.fulfill({ body: fixture }) })` to intercept the entire `/graphql` endpoint; Playwright's route handler automatically parses the operation name from the request body and only fulfills requests whose `operationName` matches a configured allowlist.",
        "Set `interceptGraphQL: true` in `playwright.config.ts` and define an `operationHandlers` map that Playwright uses to automatically route each operation name to its corresponding fixture file without requiring any inline route handler logic in the test.",
      ],
      correctIndex: 0,
      explanation:
        "GraphQL requests always POST to one endpoint, so URL-based interception alone cannot distinguish operations. The correct pattern reads the request body using `route.request().postDataJSON()`, extracts `operationName`, and branches: `route.fulfill()` for the target operation, `route.continue()` for all others. This is a universal pattern for GraphQL mocking in Playwright — selective, transparent to the server, and requiring zero infrastructure changes.",
    },

    // ── RIGHT-CLICK / CONTEXT MENUS ──────────────────────────────

    {
      id: "pw3-06",
      scenario:
        "A QA engineer is testing a file manager application where users right-click on files " +
        "to reveal a context menu with options like Rename, Delete, and Share. The engineer " +
        "uses `page.click()` on a file item but the context menu never appears. She then tries " +
        "`page.locator('.file-item').click()` with various options and still gets no result. " +
        "A colleague explains that right-click is a distinct interaction from left-click that " +
        "requires a different Playwright API.",
      question:
        "What Playwright API simulates a right-click to trigger context menus, and what is the alternative approach when the application listens to the `contextmenu` DOM event directly?",
      options: [
        "Right-click is not supported in Playwright's headless browser mode because native OS context menus are rendered by the operating system's window manager, not by the browser's JavaScript runtime; switch to headed mode using `--headed` to enable right-click interactions.",
        "Use `page.locator('.file-item').click({ button: 'right' })` to dispatch a right-click — this fires `mousedown`, `mouseup`, and `contextmenu` events with `button: 2` just as a real right-click does. If the application listens specifically to the `contextmenu` event rather than `mousedown`, `page.dispatchEvent('.file-item', 'contextmenu')` triggers it directly without the full mouse sequence.",
        "Use `page.locator('.file-item').dblclick()` followed by `page.keyboard.press('ContextMenu')` to open the context menu — the double-click selects the element and the ContextMenu key triggers the native right-click behaviour in all supported browsers.",
        "Use `page.mouse.click(x, y, { button: 'right' })` with absolute page coordinates; Playwright's locator-based click does not support the `button` option and always performs a left-click regardless of additional options passed to it.",
      ],
      correctIndex: 1,
      explanation:
        "`click({ button: 'right' })` is Playwright's first-class right-click API — it works on any locator and fires all associated pointer events including `contextmenu`. For applications that use JavaScript-rendered context menus (React-powered dropdowns triggered by `contextmenu` events), this is the primary approach. `page.dispatchEvent()` is the fallback for programmatically firing a specific event when the full pointer sequence is not needed or causes interference.",
    },

    // ── CLIPBOARD API ────────────────────────────────────────────

    {
      id: "pw3-07",
      scenario:
        "A QA engineer is testing a code documentation portal where users click a 'Copy' button " +
        "next to each code snippet to copy the code to the system clipboard. The engineer needs " +
        "to assert that clicking 'Copy' places the exact expected string on the clipboard. " +
        "In her first attempt she tries to read `navigator.clipboard.readText()` from within " +
        "a `page.evaluate()` call but gets a `NotAllowedError` because clipboard access " +
        "requires a browser permission grant in automated environments.",
      question:
        "What combination of browser context configuration and test pattern reliably tests clipboard write operations in Playwright?",
      options: [
        "Clipboard testing requires a real OS clipboard and cannot be automated in Playwright's browser sandbox; the recommended approach is to assert on the UI feedback after the copy action (e.g., a 'Copied!' tooltip appearing) rather than verifying the actual clipboard contents.",
        "Use `page.keyboard.press('Control+V')` into a visible `<textarea>` to paste clipboard contents, then assert `textarea.inputValue()` — this avoids the clipboard permission issue entirely because paste does not require the `clipboard-read` permission grant.",
        "Grant the `'clipboard-read'` permission using `context.grantPermissions(['clipboard-read'])` before the test, then after clicking the Copy button call `await page.evaluate(() => navigator.clipboard.readText())` to retrieve the clipboard contents and assert they match the expected code string.",
        "Set `ignoreHTTPSErrors: true` in the browser context and use `page.evaluate(() => navigator.clipboard.readText())` — clipboard access fails due to a TLS context issue in headless mode, not a permission error, and ignoring HTTPS errors restores full clipboard API access.",
      ],
      correctIndex: 2,
      explanation:
        "Browser clipboard APIs are gated by the Permissions API. In Playwright, `context.grantPermissions(['clipboard-read'])` grants the permission programmatically (equivalent to a user clicking 'Allow' in the browser permission dialog). After granting, `navigator.clipboard.readText()` is accessible via `page.evaluate()` and returns the current clipboard contents. This is the canonical pattern for asserting clipboard write behaviour. Alternatively, for applications that set clipboard contents via `document.execCommand('copy')` rather than the async Clipboard API, no permission is needed.",
    },

    // ── EXPECT.POLL ──────────────────────────────────────────────

    {
      id: "pw3-08",
      scenario:
        "A QA engineer is testing a background job processing system. After a user uploads " +
        "a document, the system queues an asynchronous job that processing the file server-side " +
        "and updates a status API endpoint (`/api/jobs/{id}/status`) from `pending` to `complete`. " +
        "The UI polls this endpoint every 5 seconds and updates a status badge. The engineer " +
        "wants to assert that the job reaches `complete` within 2 minutes, but the standard " +
        "`expect(locator).toHaveText()` approach only works for DOM elements, not for API calls " +
        "the test itself needs to make.",
      question:
        "What Playwright assertion API allows engineers to retry an arbitrary async function — including an API call — until it returns an expected value or a timeout is reached?",
      options: [
        "Use `page.waitForFunction(() => fetch('/api/jobs/123/status').then(r => r.json()).then(j => j.status === 'complete'))` — this evaluates the `fetch` call inside the browser context on every retry until the condition is truthy, with Playwright's default timeout governing the retry window.",
        "Write a `while` loop in the test that calls `request.get('/api/jobs/123/status')`, checks `response.json().status`, sleeps 5 seconds, and breaks on `complete` — this is the standard polling pattern for asynchronous background jobs and does not require any Playwright-specific retry API.",
        "Set `expect.timeout = 120000` globally in `playwright.config.ts` and use a standard `expect(await request.get('/api/jobs/123/status').then(r => r.json())).toHaveProperty('status', 'complete')` — the global timeout extension makes all `expect` calls retry for 2 minutes.",
        "Use `await expect.poll(async () => { const r = await request.get('/api/jobs/123/status'); return (await r.json()).status; }, { timeout: 120000 }).toBe('complete')` — `expect.poll` wraps any async function in Playwright's retry engine with a configurable timeout and interval, failing only when the timeout is exhausted.",
      ],
      correctIndex: 3,
      explanation:
        "`expect.poll(() => asyncFn(), { timeout, intervals })` is Playwright's retry engine for arbitrary async conditions — it accepts any function that returns a value, calls it repeatedly at configurable intervals until the assertion matcher passes or the timeout expires. This is the correct tool for polling external systems, APIs, databases, or any condition not directly observable in the DOM. `waitForFunction` executes inside the browser's JS context, so it cannot use Node.js `request` objects or access test-process resources.",
    },

    // ── LOCATOR CHAINING WITH `has` ──────────────────────────────

    {
      id: "pw3-09",
      scenario:
        "A test engineer is working on a notification centre UI. The page displays a list of " +
        "notification cards. Each card has a title, a timestamp, and an 'Archive' button. " +
        "She needs to target the Archive button on the card that contains the title " +
        "'Your subscription renews tomorrow' — but unlike a data table, these are `<div>` " +
        "elements without row structure, making `filter({ hasText })` return the entire card " +
        "div including children she does not want to click accidentally.",
      question:
        "How does Playwright's `locator({ has })` option differ from `filter({ hasText })`, and when is it the more precise tool for scoping nested element interactions?",
      options: [
        "`locator({ has })` accepts another locator as its argument and matches elements that contain at least one element matching the inner locator — enabling structural scoping: `page.locator('.notification-card', { has: page.getByText('Your subscription renews tomorrow') }).getByRole('button', { name: 'Archive' })` finds the card containing that specific text and then targets the Archive button within it.",
        "`filter({ hasText })` and `locator({ has })` are functionally identical — both narrow a locator to elements containing specific text. The `has` option is simply a newer syntax introduced in Playwright 1.35 that replaces the deprecated `filter` method.",
        "`filter({ hasText })` searches across the entire page DOM regardless of nesting; `locator({ has })` restricts the search to a single level of children, making it more performant but less flexible for deeply nested component trees like notification card lists.",
        "`locator({ has })` can only be used with `getByRole` locators; passing a `getByText` locator as the `has` argument throws a TypeError because text-based locators are not compatible with the structural `has` filtering mechanism in Playwright's locator engine.",
      ],
      correctIndex: 0,
      explanation:
        "`locator(selector, { has: innerLocator })` matches outer elements that contain at least one element satisfying `innerLocator`. Unlike `filter({ hasText })` which matches any text anywhere in the element's subtree, `{ has }` accepts a full Playwright locator — enabling structural, role-aware scoping. This is more precise and composable: `page.locator('.card', { has: page.getByText('renewal') }).getByRole('button', { name: 'Archive' })` targets only the card containing that text, then finds the specific button inside it.",
    },

    // ── `toContainText` vs `toHaveText` ─────────────────────────

    {
      id: "pw3-10",
      scenario:
        "A test engineer writes `expect(page.locator('.status-banner')).toHaveText('Processing')` " +
        "to check a status banner. In production the banner reads 'Processing your request... ' " +
        "with trailing spaces and ellipsis. The assertion fails because the full text does not " +
        "exactly match. A colleague suggests switching to `toContainText`. The engineer asks " +
        "what the behavioural difference is between the two matchers before changing her test.",
      question:
        "What is the precise semantic difference between `expect(locator).toHaveText()` and `expect(locator).toContainText()`, and when does using the wrong one lead to false passes in a test suite?",
      options: [
        "`toHaveText()` is case-sensitive; `toContainText()` is case-insensitive. For the production banner, switching to `toContainText('processing')` (lowercase) would resolve the mismatch without needing to match the full string including ellipsis.",
        "`toHaveText()` performs an exact full-string match (after normalising whitespace); `toContainText()` checks that the element's text includes the given substring. The risk of `toContainText`: a banner reading 'Error: Processing failed' also contains the word 'Processing' and would pass the assertion — potentially masking an error state. `toHaveText` is stricter and safer for status validations where the full content is meaningful.",
        "`toHaveText()` matches any element whose text includes the given string; `toContainText()` requires the entire element text to exactly match, including all whitespace and punctuation. The engineer should use `toHaveText('Processing your request...')` for an exact match.",
        "There is no functional difference between the two matchers — both normalise whitespace identically and match the full element text. The test failure is caused by the ellipsis character being a Unicode character (`U+2026`) that Playwright's text comparison treats as three separate periods, and the fix is to escape it in the expected string.",
      ],
      correctIndex: 1,
      explanation:
        "`toHaveText(string)` checks that the element's entire normalised text matches the pattern (exact or regex). `toContainText(substring)` checks only that the element's text includes the substring somewhere. The false-pass risk is real: `toContainText('Processing')` passes for 'Processing complete', 'Processing failed', and 'Error: Processing timed out' — all very different states. For status badges, error messages, and confirmation text, `toHaveText` with the full expected string is the safer choice.",
    },

    // ── HEADED vs HEADLESS ───────────────────────────────────────

    {
      id: "pw3-11",
      scenario:
        "A junior QA engineer notices that several Playwright tests pass consistently when " +
        "she runs them with `--headed` on her MacBook but fail intermittently in CI where " +
        "tests run in headless mode. A senior engineer explains that this is a recognised " +
        "class of problem sometimes called 'headed/headless parity' and that understanding " +
        "the cause prevents a common debugging antipattern — always running CI in headed mode " +
        "to make failures reproducible.",
      question:
        "What are the primary causes of headed vs headless behavioural differences in Playwright tests, and what is the correct diagnostic and remediation approach?",
      options: [
        "Headless mode uses a completely different browser binary than headed mode; the two share a codebase but have separate rendering engines, which causes CSS computed values, font metrics, and JavaScript APIs to behave differently — the only reliable fix is to run all CI tests in headed mode using a virtual display server like Xvfb.",
        "The difference is caused exclusively by network latency — headed mode runs against a local development server while CI headless runs hit the staging network, introducing variable response times. Switching CI to use the same local server as development eliminates all headed/headless discrepancies.",
        "Differences arise from: (1) Rendering: headless may produce slightly different font rendering and subpixel positioning affecting visual tests; (2) Timing: headed browsers render at real frame rate — elements animate at real speed — while headless may skip animation frames, affecting hover and CSS transition timing; (3) Focus: headless contexts may not receive OS focus events affecting `focus`/`blur` handlers. Remediation: use web-first assertions with sufficient timeout rather than fixed sleeps, disable CSS animations in test environments, and investigate specific failures rather than switching all CI to headed.",
        "Headless browsers do not support JavaScript modules (`type='module'` scripts), so any application using ES module imports will silently fail to load in headless mode. Adding `--experimental-modules` to the Playwright CLI call restores ES module support and resolves all headed/headless parity issues.",
      ],
      correctIndex: 2,
      explanation:
        "Headed/headless differences have several root causes: rendering (font metrics, subpixel antialiasing affect screenshot comparisons), animation timing (headed browsers render at monitor frame rate; headless may process frames differently), and OS focus events (some `focus`/`blur` handlers only fire when a real window receives focus). The remediation is targeted: use `page.addStyleTag({ content: '* { animation: none !important; transition: none !important; }' })` for animation-related failures, and `expect(locator).toBeVisible({ timeout: 5000 })` for timing-related ones — not switching all CI to headed mode.",
    },

    // ── BROWSER LAUNCH OPTIONS ───────────────────────────────────

    {
      id: "pw3-12",
      scenario:
        "A security QA team is testing a web application that implements Content Security Policy " +
        "headers with strict `script-src` directives. Their Playwright tests inject helper scripts " +
        "using `page.addInitScript()` but these are blocked by the CSP, causing test setup to " +
        "fail. Additionally, the application requires a self-signed SSL certificate in the " +
        "test environment, and Playwright refuses to load the page due to certificate errors. " +
        "The team needs to configure the browser to handle both issues without modifying the " +
        "application's security configuration.",
      question:
        "What browser context and launch options address CSP blocking of Playwright's injected scripts and self-signed certificate rejections in a test environment?",
      options: [
        "Switch from Chromium to Firefox in `playwright.config.ts` — Firefox's security model allows `page.addInitScript()` to bypass CSP restrictions, and Firefox accepts self-signed certificates by default in headless mode without any additional configuration.",
        "Set `args: ['--disable-web-security', '--ignore-certificate-errors']` in `browser.launch()` — these Chromium flags disable the same-origin policy and certificate validation globally for all pages opened in that browser process, resolving both issues simultaneously.",
        "Add the self-signed certificate's public key to `playwright.config.ts` under `use.certificate` and grant the `'unsafe-inline-scripts'` permission via `context.grantPermissions()` — these configuration options are specifically designed for handling test-environment SSL and CSP scenarios.",
        "Set `ignoreHTTPSErrors: true` in `browser.newContext()` options to bypass certificate validation for self-signed certs. For CSP bypassing `page.addInitScript()`, use the specific context option: `bypassCSP: true`. Both are test-only overrides that must never be applied in production pipelines testing real security posture.",
      ],
      correctIndex: 3,
      explanation:
        "`ignoreHTTPSErrors: true` on the context is the correct scoped SSL override — it applies only to that context, not the entire browser process. For CSP bypass, Playwright exposes `bypassCSP: true` as a direct context option that disables CSP enforcement for the context. The `--disable-web-security` flag is a blunt instrument that also disables CORS, same-origin policy, and other protections — acceptable in isolated test VMs but riskier in shared environments. Both overrides should be explicitly documented and excluded from security-posture-testing pipelines.",
    },

    // ── ARIA SNAPSHOTS ───────────────────────────────────────────

    {
      id: "pw3-13",
      scenario:
        "A QA architect at an accessibility-focused consultancy is designing a testing strategy " +
        "for a screen-reader-dependent client portal. The team uses `@axe-core/playwright` for " +
        "automated WCAG checks, but the client also wants tests that verify the semantic structure " +
        "of the page as a screen reader would experience it — not just individual element attributes, " +
        "but the entire landmark and heading hierarchy. A Playwright engineer proposes using " +
        "ARIA snapshots as a new layer of semantic regression testing.",
      question:
        "What does Playwright's `expect(locator).toMatchAriaSnapshot()` assert, and how does it complement `@axe-core` accessibility testing rather than replacing it?",
      options: [
        "`toMatchAriaSnapshot()` serialises the ARIA tree of a locator (roles, names, states, hierarchical structure) into a human-readable YAML-like string and compares it against a stored snapshot baseline. It catches structural regressions — a heading becoming a paragraph, a button losing its accessible name, a landmark being removed — that axe-core's rule-based checks might not flag. Together: axe-core catches WCAG rule violations; ARIA snapshots catch structural changes in semantic hierarchy over time.",
        "`toMatchAriaSnapshot()` is identical to `toHaveScreenshot()` but renders the page using a screen-reader simulator that converts visual rendering to audio output, which is then compared against a recorded audio baseline — it requires a dedicated accessibility testing add-on.",
        "`toMatchAriaSnapshot()` generates a complete automated screen reader walkthrough by simulating Tab key navigation and recording the spoken output of each focused element, storing it as a text transcript that serves as the semantic regression baseline for subsequent test runs.",
        "`toMatchAriaSnapshot()` and `@axe-core` test the same layer of the accessibility stack and produce overlapping results; using both creates duplicated test coverage that increases suite maintenance cost without adding meaningful additional signal.",
      ],
      correctIndex: 0,
      explanation:
        "ARIA snapshots (introduced in Playwright 1.49) serialise the accessibility tree of an element — every role, name, level, state, and child in hierarchical structure — into a snapshot file. `toMatchAriaSnapshot()` compares the current tree against the baseline, catching regressions like role changes, missing accessible names, and structural reordering that functional tests and axe-core rules cannot detect. axe-core enforces WCAG rules (contrast ratios, ARIA attribute validity); ARIA snapshots enforce structural stability of the semantic layer over time — they are complementary, not redundant.",
    },

    // ── GETBYALTEXT / GETBYTITLE ─────────────────────────────────

    {
      id: "pw3-14",
      scenario:
        "A QA engineer is writing Playwright tests for an image-heavy product catalogue. " +
        "Product images use descriptive `alt` attributes ('Red leather handbag, front view') " +
        "rather than `data-testid` attributes, and the design system uses `title` attributes " +
        "on icon buttons for their accessible tooltip labels ('Add to wishlist'). The engineer " +
        "wants to use Playwright's semantic locator APIs rather than CSS selectors for both cases.",
      question:
        "Which Playwright locators target elements by `alt` text and `title` attribute respectively, and what element types are each scoped to by default?",
      options: [
        "`page.getByAltText('Red leather handbag')` targets any element with a matching `alt` attribute — not limited to `<img>` tags; `page.getByTitle('Add to wishlist')` similarly matches any element with that `title` value. Both are unrestricted by element type, making them suitable for custom components that use these attributes non-standardly.",
        "`page.getByAltText('description')` is primarily designed for `<img>` elements (and other elements with `alt` attributes like `<input type='image'>`); `page.getByTitle('tooltip')` matches any element with a matching `title` attribute. Both return Locators that participate in Playwright's auto-waiting and web-first assertion model like any other semantic locator.",
        "`page.getByAltText()` can only target `<img>` elements; it throws a `SelectorError` if the matching `alt` attribute exists on a non-image element. `page.getByTitle()` is an alias for `page.getByLabel()` in Playwright's API and matches form elements whose `<label>` text equals the title string.",
        "`getByAltText` and `getByTitle` are identical to `page.locator('[alt=\"...\"]')` and `page.locator('[title=\"...\"]')` in behaviour — they are syntactic sugar with no semantic difference and no additional retry or auto-waiting behaviour compared to raw attribute CSS selectors.",
      ],
      correctIndex: 1,
      explanation:
        "`page.getByAltText()` locates elements via their `alt` attribute — primarily `<img>`, `<input type='image'>`, and `<area>` elements. It is the semantic alternative to `page.locator('[alt=\"...\"]')` and participates fully in Playwright's auto-waiting model. `page.getByTitle()` locates elements by their `title` attribute, which is commonly used for icon buttons and tooltips. Both return `Locator` objects with all the same chainability, filtering, and assertion capabilities as any other Playwright locator — they are not mere CSS shorthands.",
    },

    // ── CONTEXT-LEVEL VS PAGE-LEVEL ROUTING ─────────────────────

    {
      id: "pw3-15",
      scenario:
        "A QA team is setting up network mocking for a multi-page application. Some API " +
        "responses need to be mocked for the entire test session regardless of which page " +
        "the user navigates to — including after a full page reload or a navigation to a " +
        "different route. The engineer initially adds `page.route()` handlers but discovers " +
        "they stop working after a navigation that creates a new document. She asks whether " +
        "there is a context-scoped alternative.",
      question:
        "What is the difference between `page.route()` and `context.route()` in Playwright's network interception model, and which should be used for mocks that must persist across navigations?",
      options: [
        "`page.route()` and `context.route()` intercept at identical scope — both apply to all network requests made by any page in the context. The distinction is only syntactic; engineers should prefer `page.route()` as the more readable API and only use `context.route()` when `page` is not available in the current scope.",
        "`page.route()` is the recommended API for all network interception scenarios; `context.route()` is a legacy API from Playwright v0.x that is deprecated but retained for backwards compatibility. All new tests should exclusively use `page.route()` regardless of navigation requirements.",
        "`page.route()` registers a handler scoped to the page's current document lifecycle — it persists across soft navigations (SPA route changes) but is reset on full page reloads (new document creation). `context.route()` registers at the BrowserContext level and intercepts all requests from all pages in that context, surviving full navigations and new page openings — it is the correct choice for session-wide mocks.",
        "`context.route()` intercepts only requests made before the first navigation (`page.goto()`); after the first navigation, `page.route()` must be used because the context's network layer hands over to the page's document network stack.",
      ],
      correctIndex: 2,
      explanation:
        "`page.route()` survives SPA navigations (pushState, replaceState) but is tied to the page object's lifetime within a document. `context.route()` operates at the BrowserContext level — it intercepts all requests from all pages in the context, including after full reloads and new page openings. For authentication tokens, feature flags, and global API mocks that must be consistent throughout a test session, `context.route()` is the correct scope. For page-specific mocks (testing one page's error state without affecting others), `page.route()` is appropriate.",
    },

    // ── TEST.INFO() METADATA ─────────────────────────────────────

    {
      id: "pw3-16",
      scenario:
        "A QA team is building a custom Playwright fixture that automatically attaches additional " +
        "context to failing tests — the test environment name, the authenticated user's role, " +
        "and a screenshot of the page state at the moment the first assertion failed. They also " +
        "want fixtures and `afterEach` hooks to be able to determine whether the currently running " +
        "test has already failed so they can skip teardown steps that are only meaningful for " +
        "passing tests.",
      question:
        "What Playwright API provides access to runtime test metadata — including test status, title, file path, and the ability to attach files or annotations — from within fixtures, hooks, and helper functions?",
      options: [
        "Import `process.env.PLAYWRIGHT_TEST_TITLE` and `process.env.PLAYWRIGHT_TEST_STATUS` — Playwright injects these environment variables before each test so that any code in any module can read the current test context without importing Playwright-specific APIs.",
        "Playwright does not expose test metadata to fixtures and hooks; only the test function itself has access to the current test's status. Fixtures that need status-conditional logic must accept a `testStatus` parameter injected by the calling test using `test.use()` configuration.",
        "Access test metadata via `global.__PLAYWRIGHT_TEST_INFO__` — Playwright sets this global before each test and clears it after, making it accessible from any JavaScript module without importing `@playwright/test` or using the `test.info()` function.",
        "Use `test.info()` — it returns a `TestInfo` object containing the test's title, file path, project name, retry number, current status (`passed`, `failed`, `timedOut`, `interrupted`), and methods like `attach(name, { body/path })` for adding artefacts and `annotations.push({ type, description })` for adding structured metadata to the HTML report.",
      ],
      correctIndex: 3,
      explanation:
        "`test.info()` is callable from within any test function, fixture, or hook during a test's lifecycle. It provides: `title`, `file`, `project.name`, `retry`, `status` (the current outcome), `errors`, `attachments`, and methods `attach()`, `addAnnotation()`. Checking `test.info().status === 'failed'` inside `afterEach` allows conditional teardown — for example, taking a debug screenshot only on failure. `attach()` adds files (screenshots, logs, HAR files) directly to the HTML report's test detail page.",
    },

    // ── GLOBAL TEARDOWN ──────────────────────────────────────────

    {
      id: "pw3-17",
      scenario:
        "A QA platform team runs a Playwright suite that creates real resources in a cloud " +
        "environment before tests — a test organisation, three user accounts, and two API tokens. " +
        "The global setup creates these via API calls. The team notices that when the CI pipeline " +
        "is cancelled mid-run or the suite crashes unexpectedly, the cloud resources are left " +
        "behind, accumulating costs and polluting the test environment. They need a guaranteed " +
        "cleanup mechanism that runs even when the suite exits abnormally.",
      question:
        "What Playwright configuration option guarantees that resource cleanup code runs after the entire suite completes — whether it passes, fails, or is forcibly terminated?",
      options: [
        "Configure `globalTeardown: './global-teardown.ts'` in `playwright.config.ts`; the referenced file exports a default `async function` that Playwright calls after all tests have completed. It receives the same `config` object as global setup and runs even when the suite is interrupted, making it the appropriate location for resource cleanup, environment reset, and external service deregistration.",
        "Add cleanup logic to `afterAll` hooks in the test files — these are Playwright's suite-level teardown mechanism and are guaranteed to run regardless of how the test process exits, including SIGTERM signals and unhandled exceptions.",
        "Use Node.js `process.on('exit', cleanupFn)` and `process.on('SIGTERM', cleanupFn)` in the global setup file to register cleanup handlers at the OS process level — these execute regardless of how the process terminates and are more reliable than Playwright-level teardown hooks.",
        "Playwright does not guarantee teardown execution when a CI pipeline is cancelled because a SIGKILL signal cannot be intercepted by the Node.js process; the correct approach is to implement an idempotent resource cleanup script as a separate CI pipeline step that runs in the `post` phase of the workflow.",
      ],
      correctIndex: 0,
      explanation:
        "`globalTeardown` in `playwright.config.ts` is Playwright's guaranteed post-suite cleanup hook. It runs after all workers complete (or after the suite is interrupted), regardless of the suite outcome. Unlike `afterAll` (which runs per-file and may not execute if a worker crashes) or process signal handlers (which `SIGKILL` bypasses), Playwright's global teardown is the appropriate location for cloud resource cleanup, test database truncation, and external service deregistration. Its pairing with `globalSetup` makes the lifecycle symmetric.",
    },

    // ── PWA OFFLINE TESTING ──────────────────────────────────────

    {
      id: "pw3-18",
      scenario:
        "A QA team at a field service company is testing a Progressive Web App that workers " +
        "use on tablets in locations with no internet connectivity. The app uses a service " +
        "worker to cache resources and an IndexedDB store to queue actions taken offline. " +
        "The team needs to write automated Playwright tests that verify the app correctly " +
        "shows the cached UI, queues a work order creation in IndexedDB, and syncs it to the " +
        "server when connectivity is restored — all within a single test.",
      question:
        "How does Playwright simulate offline mode, and what combination of APIs allows a test to transition from online to offline and back within the same test?",
      options: [
        "Playwright cannot simulate offline mode because service worker interception and IndexedDB are part of the browser's storage layer, which is controlled by the OS network stack rather than Playwright's DevTools Protocol interface.",
        "Use `await context.setOffline(true)` to cut all network access for the context — page navigations and fetch calls fail immediately as if the network is unavailable. Interact with the offline UI, assert that queued actions appear in IndexedDB via `page.evaluate(() => /* IndexedDB query */)`, then call `await context.setOffline(false)` to restore connectivity and assert the sync completes.",
        "Intercept all network requests using `context.route('**/*', route => route.abort())` to simulate offline mode, then call `context.unrouteAll()` to restore network access — route interception is the only reliable mechanism for offline simulation because `setOffline` does not affect service worker fetch events.",
        "Use `page.evaluate(() => navigator.onLine = false)` to set the browser's online status flag to false, which triggers `window.offline` events and causes the service worker to activate its offline logic, then set `navigator.onLine = true` to restore connectivity and trigger the sync flow.",
      ],
      correctIndex: 1,
      explanation:
        "`context.setOffline(true)` is Playwright's native offline simulation — it configures the browser context to fail all network requests at the network level (not via route interception), triggering proper offline events and service worker offline logic. `page.evaluate()` with IndexedDB queries allows assertions on queued client-side state. `context.setOffline(false)` restores connectivity, and the test can then assert synchronisation behaviour. This is the complete pattern for PWA offline/online lifecycle testing.",
    },

    // ── PERFORMANCE METRICS ──────────────────────────────────────

    {
      id: "pw3-19",
      scenario:
        "A performance-focused QA team at an e-commerce company wants to add lightweight " +
        "performance regression tests to their Playwright suite. Specifically, they want to " +
        "assert that the home page's Largest Contentful Paint (LCP) does not exceed 2500ms " +
        "on a fast 4G connection and that the total JavaScript transfer size does not grow " +
        "beyond a defined budget. They want these checks in the same Playwright pipeline " +
        "as their functional tests rather than a separate performance testing tool.",
      question:
        "How can a Playwright test access browser performance metrics like LCP and resource sizes, and what are the limitations of this approach compared to dedicated performance testing tools?",
      options: [
        "Playwright has a dedicated `page.metrics()` API that returns all Core Web Vitals (LCP, FID, CLS, TTFB) as a structured object after navigation completes; engineers can assert directly on these values using standard `expect()` matchers without any additional scripts.",
        "Playwright automatically records LCP, FID, and CLS in the trace file when `trace: 'on'` is configured; `npx playwright show-trace` displays a Core Web Vitals panel alongside the action timeline, and the metrics are available programmatically via `page.tracing.exportConfig()`.",
        "Use `page.evaluate(() => performance.getEntriesByType('navigation'))` for navigation timing and `new PerformanceObserver` via `page.evaluate()` to collect LCP from the browser's PerformanceObserver API; resource sizes come from `performance.getEntriesByType('resource')`. Limitations: Playwright runs in a local environment with no CPU throttling by default — results differ from real-device or Lighthouse conditions, making absolute thresholds unreliable without consistent CPU/network emulation.",
        "Performance metrics cannot be collected from Playwright tests because the browser's Performance API is restricted to same-origin pages and Playwright's DevTools Protocol connection is treated as a cross-origin context by the browser's security model.",
      ],
      correctIndex: 2,
      explanation:
        "Playwright provides access to the full Web Performance API via `page.evaluate()` — `PerformanceObserver`, `performance.getEntries()`, `navigation` and `resource` timing, and LCP observation. This enables basic performance budget assertions in CI. The key limitation: local Playwright runs reflect the CI machine's hardware and network — without CPU throttling (via CDP's `Emulation.setCPUThrottlingRate`) and network throttling, absolute LCP thresholds are environment-dependent and may not correlate with real-user experience. Dedicated tools like Lighthouse provide standardised audit conditions that Playwright-based performance checks cannot replicate without significant additional configuration.",
    },

    // ── MULTIPLE ASSERTIONS SAME ELEMENT ─────────────────────────

    {
      id: "pw3-20",
      scenario:
        "A QA engineer is testing a user profile card component. She needs to assert five " +
        "properties of the same element in sequence: that it is visible, contains specific text, " +
        "has a specific CSS class applied, has an `aria-expanded` attribute set to `true`, and " +
        "is not disabled. She writes five separate locator chains referencing the same selector " +
        "string. A colleague suggests a more concise approach that reduces repetition without " +
        "losing individual assertion clarity.",
      question:
        "What Playwright pattern reduces repetition when asserting multiple properties of the same element while preserving individual assertion error messages for each specific failure?",
      options: [
        "Chain all assertions onto a single `expect()` call using method chaining: `expect(locator).toBeVisible().toHaveText('...').toHaveClass('...')` — Playwright's assertion builder supports fluent chaining of multiple matchers in a single expression.",
        "Use `expect.soft(locator)` for all five assertions with a final `expect(test.info().errors).toHaveLength(0)` at the end — `soft` assertions are designed for multi-property validation of the same element and automatically group their error messages by element identity in the report.",
        "Use `page.evaluate()` to read all five properties in a single browser round-trip and return them as an object, then assert on the returned object with a single `expect(result).toMatchObject({ visible: true, text: '...', class: '...' })` — this reduces DevTools Protocol calls and produces a single consolidated assertion error.",
        "Store the locator in a variable — `const card = page.getByTestId('profile-card')` — then use `expect(card).toBeVisible()`, `expect(card).toHaveText(...)`, `expect(card).toHaveClass(...)`, etc. Locators are lazy and reusable: each `expect(card)` call re-evaluates the locator fresh, and each assertion produces its own specific error message on failure.",
      ],
      correctIndex: 3,
      explanation:
        "Storing a locator in a variable and using it across multiple `expect()` calls is idiomatic Playwright. Locators are lazy descriptors — they do not resolve until an action or assertion is made — so `const card = page.getByTestId('profile-card')` creates zero browser calls. Each `expect(card).toBeVisible()`, `expect(card).toHaveText()` etc. independently evaluates and retries the locator, producing clear individual error messages on failure. This is the balance between DRY code and assertion granularity. Playwright does not support fluent chaining of multiple different matchers on a single `expect()` call.",
    },

    // ── HEADING-LEVEL & NESTED ROLE LOCATORS ────────────────────

    {
      id: "pw3-21",
      scenario:
        "A test engineer is writing tests for a documentation site that has multiple `<h2>` " +
        "headings on a single page — 'Installation,' 'Configuration,' 'Examples,' and 'API Reference.' " +
        "Using `page.getByRole('heading', { name: 'Configuration' })` works correctly. However, " +
        "she also needs to assert that the 'Configuration' heading is specifically level 2 (not an " +
        "`<h1>` or `<h3>` that might have the same text) and that a specific subsection heading " +
        "within 'Configuration' is correctly marked as an `<h3>`.",
      question:
        "How does Playwright's `getByRole` API allow filtering by both accessible name AND heading level, and why does heading level validation matter for accessibility regression tests?",
      options: [
        "Use `page.getByRole('heading', { name: 'Configuration', level: 2 })` — the `level` option filters headings by their numeric level (1-6). This validates both the accessible name and the heading level in a single locator, catching regressions where a heading is demoted from `<h2>` to `<h3>` or promoted to `<h1>`, which would break screen reader document navigation without any visible UI change.",
        "Playwright's `getByRole` does not support heading level filtering; to distinguish between `<h1>` and `<h2>` elements with the same text, engineers must fall back to CSS selectors like `page.locator('h2:text(\"Configuration\")')` because ARIA role-based locators treat all heading levels as the same `heading` role.",
        "The `level` option is not part of Playwright's `getByRole` API; heading level filtering requires using `page.getByRole('heading').filter({ hasText: 'Configuration' }).first()` and then asserting `.evaluate(el => el.tagName)` returns `'H2'` in a separate step.",
        "Heading levels are irrelevant to Playwright's role-based locator engine because ARIA assigns all headings the same `heading` role regardless of level; the `name` option is sufficient to uniquely identify any heading, and level validation belongs exclusively in axe-core accessibility audits rather than functional Playwright tests.",
      ],
      correctIndex: 0,
      explanation:
        "`getByRole('heading', { name: 'Configuration', level: 2 })` is Playwright's built-in heading level filter — it matches only `<h2>` elements (or elements with `role='heading' aria-level='2'`) with that accessible name. Heading level regression matters for screen reader users: a page where `<h2>` sections become `<h3>` elements breaks the document outline and navigation, and this change is often invisible to sighted users. Combining `getByRole` level filtering with ARIA snapshot tests provides structural accessibility regression coverage.",
    },

    // ── RESPONSE ASSERTION IN API TESTS ─────────────────────────

    {
      id: "pw3-22",
      scenario:
        "A backend QA engineer is writing Playwright API tests for a RESTful service. He needs " +
        "to assert that a `POST /api/orders` call returns HTTP 201, that the `Content-Type` " +
        "header is `application/json`, that the response body contains an `orderId` property " +
        "that is a non-empty string, and that the `total` field equals the sum of the line " +
        "items he submitted. He asks whether Playwright's API testing supports rich response " +
        "assertions or just status code checking.",
      question:
        "What assertion APIs does Playwright's `APIResponse` object expose for validating HTTP status, headers, and body in API tests?",
      options: [
        "Playwright's API testing is limited to status code assertions via `expect(response).toBeOK()` (2xx status); header and body assertions require calling `response.json()` and asserting with standard Jest matchers imported separately, as Playwright's `expect` does not extend to HTTP response properties.",
        "Use `expect(response).toBeOK()` for 2xx status, `expect(response.status()).toBe(201)` for exact status codes, `expect(response.headers()['content-type']).toContain('application/json')` for headers, and `const body = await response.json(); expect(body.orderId).toBeTruthy(); expect(body.total).toBe(expectedTotal)` for body assertions — Playwright's standard `expect` works on all values derived from the response object.",
        "Playwright's `APIResponse` object has dedicated assertion methods: `response.assertStatus(201)`, `response.assertHeader('content-type', 'application/json')`, and `response.assertBodyContains({ orderId: expect.any(String) })` — these are the preferred methods as they produce more descriptive error messages than generic `expect()` assertions.",
        "Playwright API test assertions require wrapping `response` in `expect(response).toMatchObject({ status: 201, headers: { 'content-type': 'application/json' }, body: { orderId: String } })` — the `toMatchObject` matcher is the only way to assert multiple response properties simultaneously without multiple separate `expect()` calls.",
      ],
      correctIndex: 1,
      explanation:
        "Playwright's `APIResponse` exposes `status()`, `headers()`, `json()`, `text()`, and `body()` methods. `expect(response).toBeOK()` asserts 2xx status. For richer assertions, derive values from these methods and pass them to standard `expect()`: `expect(response.status()).toBe(201)`, `expect(response.headers()['content-type']).toContain('application/json')`, and body assertions via `const body = await response.json(); expect(body).toMatchObject({ orderId: expect.any(String) })`. There are no dedicated `assertStatus`/`assertHeader` chained methods — Playwright uses the same `expect` engine for API and UI assertions.",
    },

    // ── PAGE.WAITFORFUNCTION ──────────────────────────────────────

    {
      id: "pw3-23",
      scenario:
        "A QA engineer at a fintech company is testing a WebAssembly-powered encryption module. " +
        "After a user submits a large file for encryption, the WASM module runs asynchronously " +
        "and sets `window.__encryptionDone = true` when complete. There is no DOM update — " +
        "no spinner, no status badge, no network request to intercept. The test must pause " +
        "until this JavaScript-level flag is set before asserting on the encrypted output, " +
        "without using a fixed `waitForTimeout()`.",
      question:
        "What Playwright API evaluates a JavaScript condition inside the browser context repeatedly until it returns a truthy value, and how does it differ from `expect.poll` in terms of execution context?",
      options: [
        "Use `await expect(page).toHaveTitle('Encryption Complete')` — Playwright's `toHaveTitle` matcher is a web-first assertion that retries until the page title changes to the expected string, which encryption-complete pages conventionally update to signal process completion.",
        "Use `await page.evaluate(() => { return new Promise(resolve => { const interval = setInterval(() => { if (window.__encryptionDone) { clearInterval(interval); resolve(true); } }, 100); }); })` — this is equivalent to `waitForFunction` but gives the engineer explicit control over the polling interval without relying on Playwright's internal retry scheduler.",
        "Use `await page.waitForFunction(() => window.__encryptionDone === true, { timeout: 30000 })` — this evaluates the arrow function inside the browser's JavaScript context on every poll until it returns truthy or the timeout expires. Unlike `expect.poll`, which runs in the Node.js test process and must use Playwright APIs or `request` to access external data, `waitForFunction` runs in the page's runtime and can access `window`, `document`, and all browser globals directly.",
        "`page.waitForFunction` and `expect.poll` are identical in execution context — both run callbacks in the Node.js process. The only difference is that `waitForFunction` accepts a timeout in milliseconds while `expect.poll` accepts a `{ timeout, intervals }` options object with configurable retry intervals.",
      ],
      correctIndex: 2,
      explanation:
        "`page.waitForFunction(fn)` runs `fn` inside the browser's JavaScript execution context on every poll — it can access `window.__encryptionDone`, DOM properties, and any browser API. It resolves when `fn` returns a truthy value. `expect.poll(() => fn)` runs in the Node.js test process — it cannot access browser globals directly but can call Playwright APIs like `request.get()` or read environment variables. The choice depends on where the condition lives: browser runtime → `waitForFunction`; external API or test-process state → `expect.poll`.",
    },

    // ── GLOBAL SETUP RETURN VALUE ────────────────────────────────

    {
      id: "pw3-24",
      scenario:
        "A QA team runs a Playwright suite against a cloud environment where an API token " +
        "must be fetched from a secrets manager before any test begins. The token has a " +
        "30-minute TTL and must be shared with all workers — fetching it once per worker " +
        "in `beforeAll` would exhaust rate limits. The token also needs to be available to " +
        "`globalTeardown` for cleanup. The team lead asks how to pass data produced in " +
        "`globalSetup` to both the test workers and `globalTeardown`.",
      question:
        "What mechanism does Playwright provide for passing data from `globalSetup` to test workers and `globalTeardown` without using environment variables or shared files?",
      options: [
        "Write the token to a JSON file in `globalSetup` and read it in worker `beforeAll` hooks — this is the only mechanism Playwright provides for inter-process data sharing because each worker runs in a separate Node.js process with no shared memory.",
        "Set `process.env.API_TOKEN = token` in `globalSetup` — environment variables are propagated from the main process to all worker processes by Node.js's `child_process.fork()`, making them the recommended cross-worker communication mechanism in Playwright's architecture.",
        "Use a global variable `global.__playwrightSetupData = { token }` in `globalSetup` — since Playwright's workers are threads rather than separate processes, they share the same JavaScript heap and global scope, making `global` object mutation a reliable data-passing mechanism.",
        "Return a serialisable value from the `globalSetup` function — Playwright serialises it and makes it available in tests via `test.info().config.globalSetupResult` and in `globalTeardown` as the first argument to the teardown function, enabling type-safe data sharing without side effects.",
      ],
      correctIndex: 3,
      explanation:
        "Playwright's `globalSetup` function can return a JSON-serialisable value. Playwright captures this return value, serialises it, and makes it available in two places: (1) in tests via `test.info().config` or by using `process.env` (Playwright also supports passing the result through `testConfig.globalSetupResult` in some versions); (2) as the first argument to the `globalTeardown` function. Each worker is a separate process, so `global` mutation and in-memory values do not cross process boundaries — file or environment variable strategies are fallbacks, but the return value pattern is the cleanest Playwright-native approach.",
    },

    // ── HANDLING PRINT DIALOGS ───────────────────────────────────

    {
      id: "pw3-25",
      scenario:
        "A QA team at a legal document company needs to test that clicking the 'Print Contract' " +
        "button triggers a print action and that the print preview contains the correct " +
        "document content. When running the test, the browser's native print dialog blocks " +
        "execution indefinitely. The test hangs because Playwright cannot interact with " +
        "OS-level print dialogs. A solution that tests the print flow without hanging is needed.",
      question:
        "What is the practical Playwright strategy for testing print functionality when the native browser print dialog blocks automated test execution?",
      options: [
        "Override `window.print` using `page.addInitScript(() => { window.print = () => { window.__printCalled = true; } })` before navigation to suppress the native dialog, then assert `await page.evaluate(() => window.__printCalled)` after clicking the button, and separately assert the printable content's CSS media query visibility using `expect(page.locator('.print-only-section')).toBeVisible()`.",
        "Use `page.on('dialog', dialog => dialog.accept())` before clicking Print — the print dialog is classified as a browser dialog in Playwright's event model and is dismissed by the standard dialog acceptance handler.",
        "Playwright fully supports print dialog interaction via `page.waitForEvent('printdialog')` — this event fires when the browser opens the print dialog and provides a `PrintDialog` object with `accept()` and `cancel()` methods analogous to the standard dialog API.",
        "Navigate to `javascript:window.print()` as the page URL — this triggers the print dialog in a context Playwright can intercept, allowing the test to use `page.route('javascript:*', route => route.fulfill({ body: 'print suppressed' }))` to prevent the dialog from appearing.",
      ],
      correctIndex: 0,
      explanation:
        "Native OS print dialogs are outside Playwright's control — they are OS-level windows, not browser dialogs. The practical solution is to mock `window.print` via `page.addInitScript()` before the page loads, suppressing the dialog entirely. The test then has two assertion layers: (1) that `window.print` was called (the button worked), and (2) that the content visible in `@media print` CSS rules is correct (the printable content is right). Many teams also test the print-specific CSS by temporarily applying `@media print` styles via `page.emulateMedia({ media: 'print' })` and taking a screenshot.",
    },

    // ── EMULATING MEDIA TYPE ─────────────────────────────────────

    {
      id: "pw3-26",
      scenario:
        "A design QA team at a publishing company wants to write automated tests that verify " +
        "the print layout of their articles — specifically that `@media print` CSS rules hide " +
        "the navigation and advertisements, increase font size for readability, and apply " +
        "correct page breaks between sections. They want to screenshot the print layout " +
        "without triggering the OS print dialog or generating a real PDF.",
      question:
        "What Playwright API changes the CSS media type that the page renders against, enabling tests to see and screenshot the `@media print` layout in the browser without triggering any printing mechanism?",
      options: [
        "Pass `mediaType: 'print'` as an option to `page.screenshot()` — Playwright applies `@media print` CSS rules for the duration of the screenshot capture and reverts to `screen` media for subsequent actions.",
        "Use `await page.emulateMedia({ media: 'print' })` to switch the page's CSS media type to `print`; all CSS rules scoped to `@media print` become active and `@media screen` rules are suppressed. Take a screenshot with `page.screenshot()` or use visual assertions to verify the print layout. Call `page.emulateMedia({ media: 'screen' })` to revert.",
        "Add `?media=print` to the page URL — all modern browsers respect this query parameter to switch CSS media type, which Playwright then captures in its standard screenshot without needing any additional API calls.",
        "Use `page.pdf()` to generate a PDF of the current page — this automatically applies `@media print` CSS rules during PDF generation and the resulting file can be compared against a visual baseline using `expect(pdfBuffer).toMatchSnapshot()`.",
      ],
      correctIndex: 1,
      explanation:
        "`page.emulateMedia({ media: 'print' })` is Playwright's dedicated API for switching the CSS media environment. After calling it, the browser recalculates all CSS to apply `@media print` rules — navigation hides, advertisements disappear, print-specific fonts and page break rules activate — and this state is captured by `page.screenshot()`. This is the correct approach for automated print layout regression testing without PDF generation or OS print dialog involvement. `page.pdf()` generates a PDF but its visual output is harder to diff than a PNG screenshot.",
    },

    // ── HANDLING AUTHENTICATION POPUPS (HTTP BASIC AUTH) ─────────

    {
      id: "pw3-27",
      scenario:
        "A QA team is testing a staging environment protected by HTTP Basic Authentication — " +
        "a browser-native popup that asks for username and password before rendering any page. " +
        "The engineer navigates to the staging URL and the basic auth popup blocks the page load, " +
        "causing Playwright to hang because it has no page to interact with until credentials " +
        "are supplied. The team needs to programmatically supply credentials without interacting " +
        "with the OS-level dialog.",
      question:
        "How does Playwright handle HTTP Basic Authentication credentials so that the browser never shows the native authentication popup to the test?",
      options: [
        "Register a `page.on('dialog', dialog => dialog.authenticate({ username, password }))` handler before navigation — HTTP Basic Auth prompts are classified as dialogs in Playwright's event model and can be dismissed with the credential-accepting dialog handler.",
        "Use `page.route('**/*', async route => { await route.continue({ headers: { 'Authorization': 'Basic ' + btoa('user:pass') } }) })` to add the Authorization header to every request, which pre-authenticates all requests without triggering the browser popup.",
        "Pass `httpCredentials: { username: 'user', password: 'pass' }` to `browser.newContext()` — Playwright intercepts the `401 WWW-Authenticate` response and automatically resends the request with the correct `Authorization` header, so the native popup never appears and the page loads directly.",
        "Navigate to `https://username:password@staging.example.com` — embedding credentials in the URL is the standard approach for suppressing HTTP Basic Auth popups in all browsers, and Playwright passes them through to the browser process without any additional configuration.",
      ],
      correctIndex: 2,
      explanation:
        "`httpCredentials: { username, password }` in `browser.newContext()` (or `browser.launch()` options) configures Playwright to handle HTTP Basic and Digest authentication challenges automatically. When the server returns a `401 Unauthorized` with `WWW-Authenticate`, Playwright intercepts it, constructs the `Authorization` header, and resends the request — the native browser popup is never shown. URL-embedded credentials (`user:pass@domain`) are deprecated in modern browsers and stripped by many for security reasons, making the context option the correct approach.",
    },

    // ── LOCATOR STRICT MODE ──────────────────────────────────────

    {
      id: "pw3-28",
      scenario:
        "A QA engineer writes `await page.locator('.submit-btn').click()` and the test passes " +
        "on the staging environment. After a feature flag enables a new secondary submit button, " +
        "the same test starts throwing `Error: locator.click: Error: strict mode violation — " +
        "locator('.submit-btn') resolved to 2 elements`. The engineer asks whether this error " +
        "is a Playwright bug, a misuse of the API, or an intentional safety feature.",
      question:
        "What is Playwright's strict mode for locators, why was it introduced, and what are the two correct ways to resolve the strict mode violation in this scenario?",
      options: [
        "Strict mode is a Playwright beta feature that must be explicitly enabled in `playwright.config.ts`; by default, Playwright clicks the first matching element when multiple are found, which is the same behaviour as Selenium. Enable strict mode only for suites where precise element targeting is explicitly required.",
        "Strict mode violations are thrown only in headed browser mode; in headless mode Playwright silently clicks the first match. The error in staging occurred because this team's CI uses headed mode while local development runs headless — switching both to the same mode resolves the inconsistency.",
        "Strict mode fires when a locator matches more than five elements; for two elements it uses a heuristic to select the most recently added DOM node. The violation error indicates the two submit buttons were added at exactly the same DOM insertion timestamp, creating an ambiguous tie that Playwright cannot resolve automatically.",
        "Strict mode is Playwright's default behaviour for all interaction methods (`click`, `fill`, `hover`, etc.) — if a locator matches multiple elements, Playwright throws rather than silently clicking an arbitrary one, preventing tests from interacting with the wrong element. Resolution options: (1) make the locator more specific so it uniquely identifies one element; (2) use `.first()`, `.last()`, or `.nth(index)` to explicitly declare intent when multiple matches are valid.",
      ],
      correctIndex: 3,
      explanation:
        "Playwright's strict mode is always enabled for actions — it is not opt-in. This is a deliberate safety feature: if `click()` silently clicked the first of two elements, the test would pass while interacting with the wrong element (the new secondary submit button instead of the primary one). The two resolutions are: (1) narrow the locator to uniquely identify the intended button (e.g., `page.getByRole('button', { name: 'Submit Order' })` if the buttons have different labels); (2) use `.first()` or `.nth(0)` explicitly if the first match is always intentional. The second option is less maintainable as it hides the ambiguity.",
    },

    // ── TEST ORDERING AND RANDOMISATION ─────────────────────────

    {
      id: "pw3-29",
      scenario:
        "A QA lead discovers that tests in her suite only fail when run in a specific order. " +
        "Test A passes alone, Test B passes alone, but when Test A runs before Test B, Test B " +
        "fails because Test A leaves state in `localStorage` that Test B does not expect. " +
        "She fixes the immediate issue but wants to add a structural safeguard to her CI " +
        "pipeline that continuously detects order-dependent test failures before they reach " +
        "production, without manually testing every permutation.",
      question:
        "What Playwright configuration option randomises test execution order on each run, and why does consistent test randomisation in CI help surface order-dependent failures over time?",
      options: [
        "Set `fullyParallel: true` combined with `repeatEach` or use a third-party Playwright plugin for test randomisation that shuffles spec file execution order — Playwright itself does not natively randomise test order but the `--shuffle` flag (if available in your version) or `fullyParallel: true` with multiple workers provides de facto ordering variation that surfaces hidden dependencies across repeated CI runs.",
        "Set `fullyParallel: true` in `playwright.config.ts` — parallel execution inherently randomises the order tests run across workers, ensuring that any order-dependent failures surface on every CI run because workers pick up tests from the queue in an indeterminate sequence.",
        "Set `retries: 3` in `playwright.config.ts` — each retry runs the failed test in isolation, which effectively tests it independently of surrounding test order and reveals whether the failure is order-dependent by comparing results across the original run and the retries.",
        "Set `shard` options in the CI configuration to split tests across multiple machines — the order tests run on each shard differs from single-machine execution, and order-dependent failures surface when the same test lands on a different shard with a different preceding test set.",
      ],
      correctIndex: 0,
      explanation:
        "Playwright's `--shuffle` flag (available in recent versions) randomises the order of test execution per run, ensuring that over multiple CI runs all tests experience different preceding tests. `fullyParallel: true` with multiple workers also creates non-deterministic ordering across workers. Running tests in randomised order consistently over many CI runs is a form of chaos testing for test isolation — any test that assumes a specific predecessor will fail on some fraction of runs, surfacing the dependency. The correct fix is always to add proper setup/teardown to each test, not to rely on a specific execution order.",
    },

    // ── TRACE VIEWER ADVANCED USE ────────────────────────────────

    {
      id: "pw3-30",
      scenario:
        "A QA engineering team has adopted Playwright Trace Viewer for debugging CI failures. " +
        "After three months of use, they notice that their trace zip files are frequently " +
        "15-30MB each, causing significant CI artefact storage costs and slow upload times. " +
        "A junior engineer suggests setting `trace: 'off'` permanently to reduce costs. " +
        "The lead engineer wants a more nuanced approach that balances debugging capability " +
        "with storage cost, and explains that there are several trace configuration options " +
        "between 'always on' and 'always off.'",
      question:
        "What are the four `trace` configuration values Playwright supports and what is the recommended production CI setting that minimises storage cost while preserving full debugging capability for failures?",
      options: [
        "Playwright supports two trace modes: `'on'` (always record) and `'off'` (never record). The recommended CI approach is `'off'` for all runs combined with `--debug` mode for investigating specific failures locally, since trace files cannot be generated for completed CI runs anyway.",
        "Playwright supports `'on'` (every test), `'off'` (never), `'retain-on-failure'` (record always but delete on pass), and `'on-first-retry'` (only record when a test retries). The recommended production setting is `'on-first-retry'`: zero overhead for passing tests, full trace captured precisely when a test first indicates instability — the most useful moment for debugging — without generating traces for the stable 99%.",
        "Playwright supports `'on'`, `'off'`, `'on-first-retry'`, and `'retain-on-failure'`. The recommended production setting is `'retain-on-failure'` because it generates traces for every test run (ensuring complete coverage) but automatically deletes passing test traces before uploading artefacts, giving zero storage cost for passes while preserving all failure traces.",
        "Playwright trace configuration accepts only boolean values (`true` for on, `false` for off) in `playwright.config.ts`; string values like `'on-first-retry'` are only valid when passed as `--trace` CLI flags and are not serialisable to the config file format.",
      ],
      correctIndex: 1,
      explanation:
        "Playwright's four trace modes: `'off'` (no traces), `'on'` (every test — high storage cost), `'retain-on-failure'` (traces recorded for all tests but deleted for passes — moderate storage), `'on-first-retry'` (traces recorded only when a test runs a retry — minimal storage, maximum signal). `'on-first-retry'` is the Playwright team's recommended production CI setting: it has zero overhead and zero storage cost for the 99% of tests that pass consistently, and automatically captures the full action/network/DOM trace precisely at the moment a test shows signs of instability. `'retain-on-failure'` incurs recording overhead even for passing tests.",
    },
  ],
};
