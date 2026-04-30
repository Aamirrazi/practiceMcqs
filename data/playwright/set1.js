/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║    PLAYWRIGHT ENTERPRISE MODULES (SETS 1-3)                  ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

const PlaywrightEnterpriseSet1 = {
  meta: {
    id: "pw-ent-core-ui-v1",
    testTitle: "Playwright Set 1: Advanced UI, Locators, & Architecture",
    topic: "playwright specific",
    topicLabel: "UI & Architecture",
    difficulty: "Advanced",
    questionCount: 20,
    estimatedMinutes: 30,
    description:
      "Focuses on complex DOM interactions, custom fixtures, Page Object Models, and cross-context automation.",
    icon: "🏗️",
  },
  questions: [
    {
      id: "pw-set1-01",
      scenario:
        "Your enterprise dashboard features a deeply nested, dynamic data grid. You need to locate a 'Delete' button specifically in the row where the 'Status' column is 'Pending' and the 'User' column is 'John Doe'.",
      question:
        "Which Playwright locator strategy is the most resilient and performant for this scenario?",
      options: [
        "Use an XPath traversing up to the parent row and back down to the button: `//td[text()='John Doe']/../td[text()='Pending']/..//button`.",
        "Use `page.locator('tr').filter({ hasText: 'John Doe' }).filter({ hasText: 'Pending' }).getByRole('button', { name: 'Delete' })`.",
        "Fetch all rows using `page.$$('tr')` and iterate through them with a standard `for` loop, checking the innerText of each.",
        'Use `page.locator(\'table > tbody > tr:has(td:text-is("John Doe")):has(td:text-is("Pending")) button\')`.',
      ],
      correctIndex: 1,
      explanation:
        "Chaining locators with `.filter()` leverages Playwright's auto-waiting engine effectively while remaining highly readable. It avoids brittle XPath traversals and the performance/flakiness issues of resolving elements to an array asynchronously.",
    },
    {
      id: "pw-set1-02",
      scenario:
        'Your SaaS application utilizes a third-party file upload widget that hides the native `<input type="file">` element and replaces it with a styled canvas.',
      question:
        "How should you automate the file upload process in Playwright when the input is hidden?",
      options: [
        "Use `page.mouse.click()` on the canvas, then use `page.keyboard.type('C:/path/to/file.pdf')`.",
        "Use `page.locator('input[type=\"file\"]').setInputFiles('path/to/file.pdf')` regardless of its visibility.",
        "Evaluate a Javascript snippet to change the input's CSS `display` property to `block`, then click it.",
        "Simulate drag-and-drop events using `page.evaluate()` on the canvas element.",
      ],
      correctIndex: 1,
      explanation:
        "`setInputFiles` is designed to interact with the underlying DOM node directly, completely bypassing visibility checks that usually apply to click actions.",
    },
    {
      id: "pw-set1-03",
      question:
        "To scale your test suite, you are implementing custom fixtures. What is the primary advantage of utilizing Playwright fixtures over traditional `beforeEach`/`afterEach` setup blocks?",
      options: [
        "Fixtures bypass the browser and interact directly with the Node.js runtime.",
        "Fixtures inherently execute faster because they are written in Rust.",
        "Fixtures are lazily evaluated (only initializing when a test requests them) and encapsulate their own teardown logic, preventing global state pollution.",
        "Fixtures automatically generate trace files for the specific block of code they wrap.",
      ],
      correctIndex: 2,
      explanation:
        "Fixtures provide composable, reusable, and lazily evaluated setup/teardown logic. If a test doesn't declare a fixture in its signature, the fixture's setup isn't executed, optimizing performance.",
    },
    {
      id: "pw-set1-04",
      scenario:
        "During an E2E test, clicking a 'Generate Report' button opens a new browser tab containing a PDF viewer.",
      question:
        "What is the correct asynchronous pattern to capture and assert against this newly spawned page?",
      options: [
        "`await page.getByText('Generate Report').click(); const newPage = await context.waitForEvent('page');`",
        "`const newPage = await page.getByText('Generate Report').click();`",
        "`const [newPage] = await Promise.all([context.waitForEvent('page'), page.getByText('Generate Report').click()]);`",
        "`const newPage = await context.pages()[1]; await page.getByText('Generate Report').click();`",
      ],
      correctIndex: 2,
      explanation:
        "Using `Promise.all` ensures the listener for the new page event is established simultaneously with the action that triggers it, avoiding race conditions where the page might open before the listener is ready.",
    },
    {
      id: "pw-set1-05",
      scenario:
        "A test asserts that a toast notification appears. The notification disappears after 3 seconds. The test is failing because Playwright checks for the element before the animation fully renders it into the DOM.",
      question:
        "How should you correctly assert the transient element's presence?",
      options: [
        "`expect(await page.isVisible('.toast')).toBeTruthy()`",
        "`await page.waitForTimeout(1000); expect(page.locator('.toast')).toBeVisible()`",
        "`await expect(page.locator('.toast')).toBeVisible()`",
        "`const toast = await page.$('.toast'); expect(toast).not.toBeNull()`",
      ],
      correctIndex: 2,
      explanation:
        "Web-first assertions like `await expect(locator).toBeVisible()` automatically retry the assertion until the condition is met or the timeout is reached, handling animations and rendering delays seamlessly.",
    },
    {
      id: "pw-set1-06",
      question:
        "When writing a Page Object Model (POM) in Playwright, what is the best practice regarding the storage of locators?",
      options: [
        "Store them as raw string selectors (e.g., `this.submitBtn = '#submit'`) and pass them to `page.click()` in methods.",
        "Initialize them as `Locator` objects in the constructor (e.g., `this.submitBtn = page.locator('#submit')`).",
        "Fetch them inside the methods using `page.$('#submit')` to ensure they are fresh.",
        "Store them in a global JSON dictionary imported by all POMs.",
      ],
      correctIndex: 1,
      explanation:
        "Initializing Locators in the constructor is best practice because Locators are strict recipes (not active DOM nodes). They are evaluated dynamically at execution time, maintaining clean, readable POM architecture without staleness.",
    },
    {
      id: "pw-set1-07",
      scenario:
        "A suite contains 10 independent tests testing various tabs on a settings page. Running them sequentially takes too long.",
      question:
        "How can you run tests within the *same* file concurrently while ensuring they don't share the same page state?",
      options: [
        "Add `test.describe.parallel('Settings', () => { ... })` around the tests.",
        "Use `test.describe.configure({ mode: 'parallel' })` at the top of the file.",
        "Set `workers: 10` in the configuration file.",
        "It is impossible; tests within a single file must run sequentially. You must split them into different files.",
      ],
      correctIndex: 1,
      explanation:
        "`test.describe.configure({ mode: 'parallel' })` allows tests inside the same file to run concurrently in separate worker processes, each with an isolated browser context.",
    },
    {
      id: "pw-set1-08",
      scenario:
        "You need to verify the layout of an analytical chart. Standard DOM assertions are insufficient to guarantee the chart rendered correctly visually.",
      question:
        "When utilizing Playwright's visual comparison (`toHaveScreenshot`), how do you handle a dynamically updating timestamp overlay on the chart that causes false positives?",
      options: [
        "Use the `mask` option to obscure the locator containing the timestamp.",
        "Lower the `maxDiffPixels` threshold to ignore the timestamp area.",
        "Use `page.evaluate()` to delete the timestamp node from the DOM before capturing.",
        "Use the `clip` option to crop the image around the timestamp.",
      ],
      correctIndex: 0,
      explanation:
        "The `mask` array takes a list of locators and covers them with a solid color block before taking the screenshot, specifically designed to handle dynamic but localized visual elements.",
    },
    {
      id: "pw-set1-09",
      question:
        "In Playwright, what is the fundamental difference between `expect(locator).toBeVisible()` and `expect(locator).toBeAttached()`?",
      options: [
        "`toBeVisible` checks if the element is in the viewport, while `toBeAttached` checks if it's in the DOM tree.",
        "`toBeAttached` ensures the element is present in the DOM, even if it has `display: none` or `opacity: 0`, whereas `toBeVisible` requires it to be visually painted and unobstructed.",
        "There is no functional difference; they are aliases.",
        "`toBeAttached` is synchronous, while `toBeVisible` is asynchronous.",
      ],
      correctIndex: 1,
      explanation:
        "An element can be attached to the DOM but entirely hidden from the user (e.g., `visibility: hidden`). `toBeVisible` enforces strict visual presence, aligning with what an actual user can see.",
    },
    {
      id: "pw-set1-10",
      scenario:
        "You are testing a checkout flow where the 'Place Order' button requires 3 distinct API calls to resolve before it transitions from `disabled` to active.",
      question:
        "Instead of waiting for network idle, what is the most deterministic way to click the button?",
      options: [
        "`await page.waitForResponse('**/checkout/validate'); await page.getByRole('button').click();`",
        "`await page.getByRole('button', { name: 'Place Order' }).click();`",
        "`await expect(page.getByRole('button')).toBeEnabled(); await page.getByRole('button').click();`",
        "`await page.waitForTimeout(5000); await page.getByRole('button').click();`",
      ],
      correctIndex: 1,
      explanation:
        "Playwright's default `click()` actionability checks inherently auto-wait for the element to become visible, stable, and *enabled*. Explicitly waiting for it to be enabled is redundant unless you are isolating an assertion.",
    },
    {
      id: "pw-set1-11",
      question:
        "When automating drag-and-drop operations on complex, custom-built Kanban boards, the `locator.dragTo()` method occasionally fails to trigger the framework's native drop event.",
      options: [
        "Execute a sequence of `hover()`, `mouse.down()`, `hover()` to the target, and `mouse.up()`.",
        "Use `dispatchEvent('dragstart')` and `dispatchEvent('drop')` directly on the locators.",
        "Decrease the `animations` setting in the Playwright config.",
        "Switch to the WebDriver protocol for mouse interactions.",
      ],
      correctIndex: 0,
      explanation:
        "Some complex front-end frameworks (like those using custom pointer events instead of HTML5 drag-and-drop) don't respond to `dragTo()`. Manually simulating the precise mouse pipeline provides maximum control and reliability.",
    },
    {
      id: "pw-set1-12",
      scenario:
        "An element occasionally obscures a checkbox you need to interact with, but clicking the element itself doesn't cause any adverse effects. You want a robust script that ignores the obscuring element.",
      question:
        "Which locator action modifier bypasses actionability checks regarding visibility and obstruction?",
      options: [
        "`click({ force: true })`",
        "`click({ noWaitAfter: true })`",
        "`click({ position: { x: 0, y: 0 } })`",
        "`dispatchEvent('click')`",
      ],
      correctIndex: 0,
      explanation:
        "`{ force: true }` instructs Playwright to bypass all actionability checks, including whether the element is visibly obstructed by another DOM element.",
    },
    {
      id: "pw-set1-13",
      question:
        "To ensure full end-to-end accessibility compliance during a critical release, which standard approach integrates accessibility checks into a Playwright test?",
      options: [
        "Using `page.evaluate()` to parse ARIA tags against a custom regex dictionary.",
        "Injecting `@axe-core/playwright` and running `new AxeBuilder({ page }).analyze()`.",
        "Enabling `accessibility: true` in `playwright.config.ts`.",
        "Using Playwright's native `page.metrics()` to calculate an accessibility score.",
      ],
      correctIndex: 1,
      explanation:
        "Playwright officially recommends integrating the `@axe-core/playwright` library, which injects the industry-standard axe engine into the page context to generate comprehensive accessibility violation reports.",
    },
    {
      id: "pw-set1-14",
      scenario:
        "You are validating a 50-field financial form. If field #3 fails validation, you don't want the test to abort immediately; you want to collect all validation errors across all 50 fields before failing.",
      question: "What Playwright feature is designed for this?",
      options: [
        "Wrapping assertions in a `try/catch` block and pushing errors to an array.",
        "Soft assertions using `expect.soft(locator).toHaveText(...)`.",
        "Using `test.step()` with the `{ continueOnFail: true }` flag.",
        "Setting `retries: 50` in the test config.",
      ],
      correctIndex: 1,
      explanation:
        "Soft assertions log the failure but allow the test execution to continue. The test will eventually be marked as failed at the end, providing a comprehensive list of all soft assertion failures.",
    },
    {
      id: "pw-set1-15",
      question:
        "When evaluating complex logic inside the browser context, what is the distinction between `page.evaluate()` and `page.evaluateHandle()`?",
      options: [
        "`evaluate` returns a serializable JSON value, whereas `evaluateHandle` returns a JSHandle object pointing to an in-browser object (like a DOM node or Function) that cannot be serialized.",
        "`evaluate` runs synchronously; `evaluateHandle` runs asynchronously.",
        "`evaluateHandle` is deprecated in favor of `locator.evaluate()`.",
        "There is no difference; they are used interchangeably.",
      ],
      correctIndex: 0,
      explanation:
        "If you need to return complex, non-serializable objects (like a Window object or a DOM element) back to your Node.js test environment to pass into subsequent Playwright methods, you must use `evaluateHandle`.",
    },
    {
      id: "pw-set1-16",
      scenario:
        "Your application renders data differently depending on whether the user's OS is configured for dark mode or light mode.",
      question:
        "How can you explicitly emulate 'dark mode' in a Playwright test context?",
      options: [
        "By navigating to the app's settings page and clicking the dark mode toggle.",
        "By setting `colorScheme: 'dark'` in the `test.use()` configuration block or context options.",
        "By utilizing `page.emulateMedia({ type: 'screen' })`.",
        "By injecting a custom CSS file using `page.addStyleTag()`.",
      ],
      correctIndex: 1,
      explanation:
        "Playwright natively supports emulating OS-level media features like `prefers-color-scheme` directly through the context options, ensuring the app renders exactly as it would for a dark-mode user.",
    },
    {
      id: "pw-set1-17",
      question:
        "You want to create a locator that targets a `<button>` containing the exact text 'Submit', ignoring buttons that contain 'Submit Application'.",
      options: [
        "`page.getByRole('button', { name: 'Submit' })`",
        "`page.getByRole('button', { name: 'Submit', exact: true })`",
        "`page.locator('button', { hasText: 'Submit' })`",
        "`page.locator('button:text(\"Submit\")')`",
      ],
      correctIndex: 1,
      explanation:
        "The `exact: true` flag in `getByRole` or `getByText` ensures Playwright performs a strict string match rather than a substring match, preventing unintended interactions with similarly named elements.",
    },
    {
      id: "pw-set1-18",
      scenario:
        "During a test, you execute `await page.goto('/dashboard')`. The test frequently times out right here, even though the UI appears to load visually within 2 seconds.",
      question: "What is the most likely cause, and how do you resolve it?",
      options: [
        "The DOM is too large; increase the timeout. Resolution: `page.setDefaultTimeout(60000)`.",
        "A background tracker or long-polling API is keeping the network connection open. Resolution: change the wait condition using `await page.goto('/dashboard', { waitUntil: 'domcontentloaded' })`.",
        "The page is utilizing WebGL. Resolution: disable animations.",
        "The `goto` method requires absolute URLs. Resolution: provide the full `https://` string.",
      ],
      correctIndex: 1,
      explanation:
        "By default, `goto` waits for the `load` event. If a site has persistent background network requests, the `load` or `networkidle` states may never trigger. Lowering the threshold to `domcontentloaded` allows the script to proceed once the HTML is parsed.",
    },
    {
      id: "pw-set1-19",
      question:
        "What is the specific purpose of the `test.step()` API in Playwright?",
      options: [
        "To break a test into multiple chunks that can be distributed across different CI runners.",
        "To pause test execution manually during debugging.",
        "To group a sequence of actions logically in the test runner output and trace viewer, aiding in readability and debugging of complex workflows.",
        "To explicitly define retry boundaries inside a single test file.",
      ],
      correctIndex: 2,
      explanation:
        '`test.step()` provides semantic grouping in reports. If a test fails, the report clearly indicates which logical "step" (e.g., "Login via SSO", "Add items to cart") failed, rather than just pointing to a raw line of code.',
    },
    {
      id: "pw-set1-20",
      scenario:
        "You are testing a micro-frontend architecture where content is loaded dynamically inside custom HTML elements (e.g., `<my-header>`).",
      question:
        "Does Playwright require special syntax to locate elements inside open Web Components (Shadow DOM)?",
      options: [
        "Yes, you must use the `::part` CSS pseudo-element.",
        "Yes, you must prefix selectors with `shadow=`.",
        "No, Playwright's locator engine automatically pierces open Shadow DOMs seamlessly.",
        "Yes, you must use `page.evaluate()` to traverse the `.shadowRoot` property manually.",
      ],
      correctIndex: 2,
      explanation:
        "One of Playwright's distinct advantages is its default behavior of piercing open Shadow DOM roots automatically, allowing standard CSS and text locators to work without any special configuration.",
    },
  ],
};

const PlaywrightEnterpriseSet2 = {
  meta: {
    id: "pw-ent-net-api-v1",
    testTitle: "Playwright Set 2: Network Interception, API Testing & State",
    topic: "playwright specific",
    topicLabel: "Network & API",
    difficulty: "Advanced",
    questionCount: 20,
    estimatedMinutes: 30,
    description:
      "Deep dive into page.route(), APIRequestContext, mocking, authentication states, and traffic analysis.",
    icon: "🌐",
  },
  questions: [
    {
      id: "pw-set2-01",
      scenario:
        "A third-party tracking script hosted on `analytics.vendor.com` frequently hangs, causing your E2E tests to timeout.",
      question:
        "How can you comprehensively block all requests to this domain across your test?",
      options: [
        "`await page.route('**/*analytics.vendor.com*/**', route => route.abort());`",
        "`await page.unroute('**/*analytics.vendor.com*/**');`",
        "`page.setExtraHTTPHeaders({ 'Block-Domain': 'analytics.vendor.com' })`",
        "`await page.context().clearCookies({ domain: 'analytics.vendor.com' })`",
      ],
      correctIndex: 0,
      explanation:
        "`page.route()` combined with `route.abort()` intercepts requests matching the glob pattern and drops them at the network layer, completely preventing the browser from attempting the connection.",
    },
    {
      id: "pw-set2-02",
      scenario:
        "You are testing an error-handling UI state. The application makes a GET request to `/api/v1/user/profile`.",
      question:
        "How can you mock this specific network response to force a 500 Internal Server Error using Playwright?",
      options: [
        "`await page.route('**/api/v1/user/profile', route => route.fulfill({ status: 500, body: 'Internal Error' }));`",
        "`await page.route('**/api/v1/user/profile', route => route.continue({ status: 500 }));`",
        "`await page.mock('/api/v1/user/profile', { status: 500 });`",
        "`await request.post('/api/v1/user/profile', { data: { status: 500 } });`",
      ],
      correctIndex: 0,
      explanation:
        "`route.fulfill()` intercepts the request and instantly responds to the browser with the provided status code, headers, and body, bypassing the actual network.",
    },
    {
      id: "pw-set2-03",
      question:
        "What is the primary operational difference between using `page.request.get()` and using an isolated `request` fixture provided by `@playwright/test`?",
      options: [
        "`page.request` shares cookies, context, and storage state with the current browser page, whereas the `request` fixture is a completely independent API context.",
        "`page.request` can only be used for GET requests, while the `request` fixture supports all HTTP methods.",
        "There is no difference; they point to the exact same underlying object.",
        "`page.request` uses standard fetch, while the `request` fixture uses Axios.",
      ],
      correctIndex: 0,
      explanation:
        "If you want an API call to act 'as the logged-in user' currently navigating the browser, use `page.request`. If you want a clean, isolated API context (e.g., to seed a database as an admin), use the `request` fixture.",
    },
    {
      id: "pw-set2-04",
      scenario:
        "You have a suite of 500 tests. Logging into the application via UI takes 5 seconds. To save time, you want to log in once and share that authenticated state across all tests.",
      question:
        "Which Playwright capability facilitates this pattern securely?",
      options: [
        "Saving the JWT into a standard Node.js global variable.",
        "Using `page.context().storageState({ path: 'auth.json' })` in a setup script, and injecting it via `use: { storageState: 'auth.json' }` in the config.",
        "Disabling web security via Chromium launch args.",
        "Using `test.beforeAll` to write the cookies to a `.txt` file.",
      ],
      correctIndex: 1,
      explanation:
        "Playwright's `storageState` feature extracts cookies and localStorage from an authenticated context and allows subsequent browser contexts to instantiate with those tokens already injected, entirely skipping the UI login.",
    },
    {
      id: "pw-set2-05",
      scenario:
        "During an E2E test, the application queries an inventory API. You want to let the request hit the real server, but you want to dynamically alter the server's JSON response to inject a simulated 'Out of Stock' condition before the browser processes it.",
      question: "How can you achieve this 'modify-on-the-fly' behavior?",
      options: [
        "You cannot modify a response after it returns from the server; you must fully mock it using `route.fulfill()`.",
        "Use `route.continue()` and pass a callback to the `response` property.",
        "Fetch the real response using `route.fetch()`, modify the JSON payload, and then pass it into `route.fulfill({ response, json: modifiedData })`.",
        "Intercept the response using `page.on('response')` and rewrite the buffer.",
      ],
      correctIndex: 2,
      explanation:
        "`route.fetch()` makes the actual network call. You can then parse the returned response, mutate the data in Node.js, and fulfill the route with the modified data, effectively acting as a man-in-the-middle proxy.",
    },
    {
      id: "pw-set2-06",
      question:
        "When testing a GraphQL endpoint using Playwright, why is wildcard routing (`**/graphql`) often problematic for mocking?",
      options: [
        "GraphQL does not support HTTP POST methods.",
        "Playwright cannot parse JSON bodies.",
        "Because almost all GraphQL operations target the same single endpoint (`/graphql`), requiring you to inspect the `route.request().postDataJSON().operationName` to determine what to mock.",
        "GraphQL requests are encrypted by default.",
      ],
      correctIndex: 2,
      explanation:
        "Unlike REST where different resources have different URLs, GraphQL multiplexes queries over a single URL. Network interceptors must parse the request payload to identify the specific query or mutation before mocking.",
    },
    {
      id: "pw-set2-07",
      scenario:
        "Your application downloads a dynamically generated CSV report. You must assert that the HTTP headers of the download request included an authorization token.",
      question:
        "How can you capture both the download file and the request that initiated it?",
      options: [
        "Use `page.waitForEvent('download')`, then use `download.page().request().headers()`.",
        "The `download` object doesn't expose the request directly. You should use `page.on('request')` to listen for the specific URL triggered by the UI action.",
        "Parse the downloaded CSV file; the headers are usually embedded in the metadata.",
        "Use `page.context().cookies()`.",
      ],
      correctIndex: 1,
      explanation:
        "While Playwright handles the file stream gracefully via the `download` event, asserting on the specific network mechanics (headers, preflights) of the download requires standard network event listeners like `page.on('request')`.",
    },
    {
      id: "pw-set2-08",
      question:
        "What is the primary advantage of generating HAR (HTTP Archive) files during a Playwright test execution?",
      options: [
        "HAR files automatically convert into Playwright test scripts.",
        "They record a complete, structured log of all network traffic (requests and responses), which can be used later to mock the entire backend for offline, deterministic testing using `page.routeFromHAR()`.",
        "They compress the trace viewer output to save disk space.",
        "They automatically analyze the network for security vulnerabilities.",
      ],
      correctIndex: 1,
      explanation:
        "`page.routeFromHAR()` allows teams to record a golden path of network responses from a live environment and replay them perfectly in CI, decoupling UI tests from backend instability.",
    },
    {
      id: "pw-set2-09",
      scenario:
        "A test clicks a button that triggers a background API call. You want to ensure the test does not proceed until this specific POST request to `/api/submit` returns a 200 OK status.",
      question: "Which approach is most reliable?",
      options: [
        "`await page.waitForResponse(res => res.url().includes('/api/submit') && res.status() === 200);`",
        "`await page.waitForLoadState('networkidle');`",
        "`await page.waitForTimeout(3000);`",
        "`expect(await page.request.post('/api/submit')).toBeOK();`",
      ],
      correctIndex: 0,
      explanation:
        "`waitForResponse` with a predicate function ensures the test execution halts until the exact network condition (URL match and specific HTTP status) is fulfilled by the browser's traffic.",
    },
    {
      id: "pw-set2-10",
      question:
        "When using the `APIRequestContext` for heavy API testing (e.g., validating hundreds of endpoints), what is a best practice regarding resource management?",
      options: [
        "Always dispose of the context manually using `await request.dispose()` at the end of the test to prevent memory leaks in Node.js.",
        "Only use `APIRequestContext` inside a `beforeAll` block.",
        "Clear the Node.js event loop using `process.nextTick()`.",
        "Configure the API context to use Firefox, as it handles HTTP/2 better.",
      ],
      correctIndex: 0,
      explanation:
        "When instantiating standalone API contexts (e.g., `request.newContext()`), they consume memory and maintain active network connections. Manually disposing of them ensures resources are freed promptly.",
    },
    {
      id: "pw-set2-11",
      scenario:
        "You are testing a checkout API that requires an `Idempotency-Key` header generated dynamically per test. The standard UI workflow is too slow.",
      question:
        "How do you inject this header using the Playwright API context?",
      options: [
        "`await request.post('/checkout', { headers: { 'Idempotency-Key': uuid() } });`",
        "`request.setHeader('Idempotency-Key', uuid()); await request.post('/checkout');`",
        "`await page.setExtraHTTPHeaders({ 'Idempotency-Key': uuid() });`",
        "`await request.post('/checkout', { data: { idempotencyKey: uuid() } });`",
      ],
      correctIndex: 0,
      explanation:
        "When utilizing `request.get()` or `request.post()`, you pass an options object containing the `headers` property to specify per-request custom headers safely.",
    },
    {
      id: "pw-set2-12",
      question:
        "To test how the UI gracefully degrades when the network connection is severely throttled (e.g., 3G speeds), how do you configure Playwright?",
      options: [
        "Use `page.route()` to inject a `setTimeout` delay inside the `route.continue()` callback.",
        "Establish a CDP (Chrome DevTools Protocol) session and send the `Network.emulateNetworkConditions` command.",
        "Set `throttle: '3G'` in the `playwright.config.ts`.",
        "Both A and B are valid approaches to simulate latency.",
      ],
      correctIndex: 3,
      explanation:
        "While CDP provides native browser-level throttling (accurate but Chromium-only), intercepting requests via `page.route` and adding a programmatic `setTimeout` is a cross-browser alternative to simulate high latency.",
    },
    {
      id: "pw-set2-13",
      scenario:
        "You want to assert the schema of a JSON response returned from an API call using Playwright's `APIResponse` object.",
      question: "What is the correct way to parse the response body?",
      options: [
        "`const body = await response.text(); JSON.parse(body);`",
        "`const body = response.body();`",
        "`const body = await response.json();`",
        "Both A and C are correct, but C is the native convenience method.",
      ],
      correctIndex: 3,
      explanation:
        "Playwright provides `await response.json()` as a built-in convenience method to resolve the stream and parse the payload into a Javascript object.",
    },
    {
      id: "pw-set2-14",
      question:
        "When intercepting a request using `page.route()`, what happens if you fail to call `route.continue()`, `route.abort()`, or `route.fulfill()` within the handler callback?",
      options: [
        "Playwright automatically calls `continue()` after 5 seconds.",
        "The request hangs indefinitely, eventually causing the test to fail due to a timeout.",
        "The browser ignores the interceptor and uses the cache.",
        "An exception is immediately thrown synchronously.",
      ],
      correctIndex: 1,
      explanation:
        "Routing is absolute. If a route handler is triggered, the request is paused in the network stack. Failing to explicitly handle the route will cause the request to stall, breaking the page load.",
    },
    {
      id: "pw-set2-15",
      scenario:
        "You are attempting to extract a verification link from an email via a 3rd-party Mailtrap API. The API might take up to 10 seconds to receive the email.",
      question:
        "Using Playwright API context, how do you reliably poll the endpoint?",
      options: [
        "Use `expect.poll(async () => await request.get(...)).toBeOK()`.",
        "Use a `while` loop with `page.waitForTimeout()`.",
        "Use `expect(await request.get(...)).toPass()`.",
        "Use `request.waitForResponse()`.",
      ],
      correctIndex: 0,
      explanation:
        "`expect.poll` is explicitly designed for synchronous and asynchronous polling. It repeatedly executes the provided function until the assertion passes or the timeout is exceeded.",
    },
    {
      id: "pw-set2-16",
      question:
        "If multiple `page.route()` handlers match the exact same URL pattern, which one takes precedence?",
      options: [
        "The first one registered.",
        "The last one registered.",
        "Playwright throws an 'overlapping routes' error.",
        "They are executed sequentially in a chain.",
      ],
      correctIndex: 1,
      explanation:
        "Route handlers are evaluated in reverse order of registration. The most recently added handler that matches the URL will intercept the request first, allowing you to override global routes with test-specific routes.",
    },
    {
      id: "pw-set2-17",
      scenario:
        "A test needs to navigate to `https://admin.example.com`, but the server requires Basic Authentication.",
      question:
        "How do you handle Basic Auth transparently in Playwright without interacting with the browser's native prompt?",
      options: [
        "Pass `{ httpCredentials: { username: 'admin', password: 'pwd' } }` in the context options.",
        "Construct the URL as `https://admin:pwd@admin.example.com`.",
        "Use `page.setExtraHTTPHeaders({ 'Authorization': 'Basic ...' })`.",
        "All of the above are valid ways to bypass the Basic Auth dialog.",
      ],
      correctIndex: 3,
      explanation:
        "Playwright explicitly supports the `httpCredentials` context option. Standard HTTP practices like URL embedding or manual header injection also successfully bypass the browser prompt.",
    },
    {
      id: "pw-set2-18",
      question:
        "You want to test a Server-Sent Events (SSE) data stream. How does Playwright handle SSE traffic?",
      options: [
        "Via `page.on('websocket', ...)`.",
        "SSEs are just continuous HTTP responses; you can read the stream via `response.body()` but cannot intercept individual events easily without custom buffer parsing.",
        "Playwright provides a native `page.on('server-sent-event', ...)` listener.",
        "Playwright currently blocks SSE traffic by default.",
      ],
      correctIndex: 1,
      explanation:
        "Unlike WebSockets which have a dedicated protocol/API in Playwright, SSEs are long-lived HTTP GET requests. To test them deeply, you must intercept the response and parse the raw data stream using Node.js readable streams.",
    },
    {
      id: "pw-set2-19",
      scenario:
        "Your application sets an `HttpOnly` cookie containing the session ID.",
      question:
        "How can you read the value of this cookie to assert its presence?",
      options: [
        "Use `await page.evaluate(() => document.cookie)`.",
        "Use `await page.context().cookies()`.",
        "Extract it from the DOM storage via `page.evaluate(() => localStorage.getItem('session'))`.",
        "You cannot read HttpOnly cookies via automation frameworks for security reasons.",
      ],
      correctIndex: 1,
      explanation:
        "`HttpOnly` cookies are blocked from JavaScript `document.cookie` access by design. However, Playwright operates outside the browser context via CDP, allowing `context.cookies()` to access all cookies securely.",
    },
    {
      id: "pw-set2-20",
      question:
        "When fulfilling a mocked route, how do you simulate a Cross-Origin Resource Sharing (CORS) error?",
      options: [
        "By aborting the route with the code 'failed'.",
        "By fulfilling the route with a 200 status but omitting the `Access-Control-Allow-Origin` header.",
        "By throwing a JavaScript Error inside the `page.route` callback.",
        "By fulfilling with a 403 Forbidden status.",
      ],
      correctIndex: 1,
      explanation:
        "CORS is a browser-level security mechanism. If the server (or your mocked response) fails to return the required CORS headers for a cross-origin request, the browser's fetch API will automatically throw a CORS error.",
    },
  ],
};

const PlaywrightEnterpriseSet3 = {
  meta: {
    id: "pw-ent-infra-cicd-v1",
    testTitle: "Playwright Set 3: CI/CD, Tracing, & Infrastructure",
    topic: "playwright specific",
    topicLabel: "Infrastructure",
    difficulty: "Advanced",
    questionCount: 20,
    estimatedMinutes: 30,
    description:
      "Configuring Playwright for scale: reporters, sharding, Docker, GitHub Actions, and artifact management.",
    icon: "🚀",
  },
  questions: [
    {
      id: "pw-set3-01",
      scenario:
        "Your team pushes code 50 times a day. Running the full Playwright suite takes 45 minutes on a single GitHub Actions runner, slowing down velocity.",
      question:
        "What is the optimal Playwright-native strategy to reduce this wall-clock time?",
      options: [
        "Increase the `workers` count in `playwright.config.ts` to 20.",
        "Use the `--shard=1/N` CLI flag across a matrix of multiple concurrent CI runners.",
        "Disable trace viewing and video recording.",
        "Convert all E2E tests into Component Tests.",
      ],
      correctIndex: 1,
      explanation:
        "Sharding allows you to distribute the test suite across multiple separate CI machines. A 45-minute suite distributed across 5 shards can complete in roughly 9 minutes, drastically improving feedback loops.",
    },
    {
      id: "pw-set3-02",
      question:
        "When running tests in an alpine Linux Docker container, tests consistently fail with 'Browser closed unexpectedly' or 'Missing shared libraries' (like libgbm).",
      options: [
        "Switch to the official `mcr.microsoft.com/playwright` Docker image, which pre-installs all required OS dependencies.",
        "Run the tests with the `--headed` flag.",
        "Disable GPU hardware acceleration in the launch options.",
        "Run `npm install playwright-core` instead of `playwright`.",
      ],
      correctIndex: 0,
      explanation:
        "Browsers require deep OS-level dependencies (fonts, graphics libraries) to render, even in headless mode. The official Playwright Docker image guarantees parity between the framework version and the necessary Ubuntu/Debian libraries.",
    },
    {
      id: "pw-set3-03",
      scenario:
        "A test is incredibly flaky on CI but passes perfectly locally. You want to debug it visually, but you cannot VNC into the CI runner.",
      question:
        "What is the most robust diagnostic artifact Playwright can generate for post-mortem debugging?",
      options: [
        "The standard output terminal logs.",
        "A full-page screenshot on failure.",
        "The Playwright Trace Viewer zip file (`trace.zip`).",
        "A HAR file.",
      ],
      correctIndex: 2,
      explanation:
        "The Trace Viewer captures a complete timeline of the execution, including DOM snapshots at every action, network requests, console logs, and source code execution, allowing offline 'time-travel' debugging.",
    },
    {
      id: "pw-set3-04",
      question:
        "In the `playwright.config.ts`, what does the `fullyParallel: true` configuration achieve?",
      options: [
        "It runs all tests inside a single file concurrently, in addition to running different files concurrently.",
        "It launches multiple instances of the application backend.",
        "It bypasses Node.js asynchronous limits.",
        "It forces tests to run across all installed browsers (Chrome, Firefox, Safari) simultaneously.",
      ],
      correctIndex: 0,
      explanation:
        "By default, Playwright runs test *files* in parallel, but tests *within* a file sequentially. `fullyParallel: true` opts-in to parallelizing everything, maximizing CPU utilization if tests are truly independent.",
    },
    {
      id: "pw-set3-05",
      scenario:
        "You are utilizing Playwright's sharding feature across 4 GitHub Actions runners. You want a single, unified HTML report at the end.",
      question: "How do you consolidate the reports from the different shards?",
      options: [
        "Playwright handles this automatically in the cloud.",
        "Upload the `blob` report from each shard as a CI artifact, download them in a final job, and run `npx playwright merge-reports`.",
        "Write a custom Python script to merge the HTML files.",
        "It is not possible; you must view 4 separate reports.",
      ],
      correctIndex: 1,
      explanation:
        "The `blob` reporter is specifically designed for sharded environments. It outputs raw data that can be efficiently collected and merged by the CLI into a cohesive HTML report in a final aggregation CI job.",
    },
    {
      id: "pw-set3-06",
      question:
        "Why is it recommended to set `RETRIES=2` only in the CI environment and not in local development?",
      options: [
        "Local development environments cannot handle retries due to memory constraints.",
        "Retries mask underlying flakiness. Locally, you want a test to fail immediately so you can fix the root cause; in CI, you want resilience against transient network/infrastructure blips.",
        "Playwright requires a commercial license to use retries locally.",
        "Retries corrupt local trace files.",
      ],
      correctIndex: 1,
      explanation:
        "Retries are an operational safety net for unpredictable CI infrastructure. Locally, developers need strict, deterministic feedback. Hiding a failure behind a retry locally prevents proper debugging.",
    },
    {
      id: "pw-set3-07",
      scenario:
        "Your test suite includes a 'Smoke' subset and an 'Extended' subset. You want to execute only the smoke tests after a minor hotfix deployment.",
      question: "How do you natively tag and filter tests in Playwright?",
      options: [
        "Append tags like `@smoke` to the test title and use the `--grep` CLI flag (e.g., `npx playwright test --grep @smoke`).",
        "Place smoke tests in a folder named `/smoke` and run that directory exclusively.",
        "Use `test.describe.smoke(...)`.",
        "Both A and B are common and valid strategies.",
      ],
      correctIndex: 3,
      explanation:
        "Tagging titles with `@xyz` and using regex filtering via `--grep` is the built-in annotation strategy. Organizing by directory is also a standard structural approach. Both are highly effective.",
    },
    {
      id: "pw-set3-08",
      question:
        "When configuring multiple 'projects' in `playwright.config.ts`, what is a primary use case?",
      options: [
        "To test against different backend databases simultaneously.",
        "To run the same test suite against multiple browser engines (Chromium, Firefox, WebKit) or device emulations (Mobile Safari).",
        "To separate frontend code from backend code.",
        "To define different billing accounts.",
      ],
      correctIndex: 1,
      explanation:
        "Projects allow you to define execution matrices. You can run your entire suite against Desktop Chrome, Mobile Safari, and Firefox in parallel by defining them as separate projects in the config.",
    },
    {
      id: "pw-set3-09",
      scenario:
        "Your CI pipeline generates an HTML report, but you also want to push test results to a third-party Test Management System (like Jira/Xray) formatted as a JUnit XML file.",
      question:
        "How can Playwright output multiple report formats simultaneously?",
      options: [
        "You must run the test suite twice, specifying a different reporter each time.",
        "Define an array of reporters in the config: `reporter: [['html'], ['junit', { outputFile: 'results.xml' }]]`.",
        "Convert the HTML report to XML using a third-party CLI tool.",
        "Playwright does not support JUnit output natively.",
      ],
      correctIndex: 1,
      explanation:
        "Playwright's reporter architecture allows chaining multiple built-in or custom reporters in a multi-dimensional array within the config, executing them all in a single test run.",
    },
    {
      id: "pw-set3-10",
      question:
        "If a test is designed to verify that an external service is offline (e.g., expecting a timeout or 500 error), but someone fixes the service, the test should fail to alert you. Which annotation handles this?",
      options: [
        "`test.fail()`",
        "`test.skip()`",
        "`test.fixme()`",
        "`test.slow()`",
      ],
      correctIndex: 0,
      explanation:
        "`test.fail()` marks a test as 'expected to fail'. If the test actually passes (e.g., the service comes back online), Playwright flags it as a test suite failure, enforcing strict state validation.",
    },
    {
      id: "pw-set3-11",
      scenario:
        "You are running Visual Regression Tests (VRT) via `toHaveScreenshot()`. You notice font rendering differences cause tests to fail on CI (Linux) while passing locally (macOS).",
      question:
        "What is the recommended approach to stabilize visual comparisons across different OS environments?",
      options: [
        "Increase the `maxDiffPixels` threshold to 5000.",
        "Generate and store baseline snapshots explicitly inside the Linux Docker container used by CI.",
        "Disable all CSS styling before taking snapshots.",
        "Force macOS runners in GitHub Actions, regardless of cost.",
      ],
      correctIndex: 1,
      explanation:
        "Anti-aliasing and font rendering vary fundamentally at the OS kernel level. The most deterministic way to perform VRT is to ensure baselines are generated in the exact same environment (e.g., Docker container) where they will be verified.",
    },
    {
      id: "pw-set3-12",
      question:
        "What is the function of the `@playwright/test` `globalTeardown` script?",
      options: [
        "It executes after every single test file.",
        "It closes the browser window automatically.",
        "It runs exactly once after all tests and workers have finished, making it ideal for cleaning up seeded databases or deleting temporary cloud infrastructure.",
        "It formats the code using Prettier.",
      ],
      correctIndex: 2,
      explanation:
        "Global teardown is a worker-agnostic hook executed at the very end of the suite lifecycle, ensuring clean environments regardless of whether tests passed or failed.",
    },
    {
      id: "pw-set3-13",
      scenario:
        "You want to fail the CI pipeline immediately if any `console.error` is triggered by the front-end application during a test run.",
      question: "How can you globally enforce this strict policy?",
      options: [
        "Add a `page.on('console', msg => { if (msg.type() === 'error') throw new Error(msg.text()) })` listener inside a custom `page` fixture.",
        "Set `failOnConsoleError: true` in `playwright.config.ts`.",
        "Use a custom reporter to parse the logs post-execution.",
        "Search the trace file for red text.",
      ],
      correctIndex: 0,
      explanation:
        "Injecting an event listener into a custom `page` fixture ensures that every test inherits this strict check. If the browser emits a console error, the listener synchronously throws a Node.js error, failing the test instantly.",
    },
    {
      id: "pw-set3-14",
      question:
        "When configuring `video: 'retain-on-failure'`, how does Playwright manage the video recording processing overhead?",
      options: [
        "It records the screen continuously to memory and dumps it to an mp4 file only if an assertion fails.",
        "It records directly to an mp4 file on disk, but deletes the file at the end of the test if it passes.",
        "It uses an external service (like AWS Kinesis) to stream the video.",
        "It records via Chrome extensions.",
      ],
      correctIndex: 1,
      explanation:
        "Playwright streams the screenframes to a file on disk to prevent VRAM bloat. If the test finishes successfully, the framework's cleanup routine deletes the `.webm` file to conserve storage space.",
    },
    {
      id: "pw-set3-15",
      scenario:
        "Your test suite needs to access sensitive environment variables (like Stripe API keys).",
      question:
        "What is the secure way to load these in a local Playwright environment?",
      options: [
        "Hardcode them into a `secrets.ts` file and add it to `.gitignore`.",
        "Use the `dotenv` npm package to load variables from a `.env` file directly into Node's `process.env` inside the `playwright.config.ts`.",
        "Pass them as plaintext CLI arguments (e.g., `npx playwright test --stripe-key=123`).",
        "Store them in the browser's localStorage.",
      ],
      correctIndex: 1,
      explanation:
        "Integrating `dotenv` in the configuration file is the industry standard for 12-factor apps, allowing secure injection of environment variables without exposing secrets in version control or process execution logs.",
    },
    {
      id: "pw-set3-16",
      question:
        "What does the Playwright command `npx playwright install-deps` do?",
      options: [
        "It runs `npm install` to fetch Node.js dependencies.",
        "It installs required system-level dependencies (like X11 libraries, GStreamer, and font packages) necessary for Chromium, Firefox, and WebKit to run on Linux.",
        "It updates Playwright to the latest version.",
        "It installs third-party plugins like the Axe accessibility checker.",
      ],
      correctIndex: 1,
      explanation:
        "Especially in raw CI environments (like GitHub Actions Ubuntu runners), the OS might lack the libraries required to boot a browser. `install-deps` automates the `apt-get` commands required to satisfy these prerequisites.",
    },
    {
      id: "pw-set3-17",
      scenario:
        "You are setting up Project Dependencies in Playwright (e.g., Project A must run before Project B).",
      question:
        "What is a common real-world use case for defining project dependencies?",
      options: [
        "Running linting before compiling TypeScript.",
        "Creating a 'Setup' project that seeds the database or authenticates users and saves the `storageState`, which the main 'E2E' project then depends on.",
        "Forcing Firefox tests to wait for Chrome tests to finish.",
        "Ensuring the local dev server starts up.",
      ],
      correctIndex: 1,
      explanation:
        "Project dependencies ensure that heavy setup logic runs serially and succeeds before spawning dozens of parallel workers that rely on the artifacts (like auth tokens or seeded data) generated by that setup.",
    },
    {
      id: "pw-set3-18",
      question:
        "When dealing with tests that require sequential execution (e.g., Test 1 creates a user, Test 2 edits the user, Test 3 deletes the user), how do you enforce order?",
      options: [
        "Playwright runs tests sequentially by default; no action is needed.",
        "Wrap the tests inside `test.describe.serial('CRUD Operations', () => { ... })`.",
        "Use `await test.step()`.",
        "It is strictly forbidden to have interdependent tests in Playwright.",
      ],
      correctIndex: 1,
      explanation:
        "`test.describe.serial()` explicitly tells the test runner to execute the contained tests sequentially on a single worker. If one test fails, subsequent tests in the serial block are skipped.",
    },
    {
      id: "pw-set3-19",
      scenario:
        "You want to mock the timezone for a specific test file simulating an Australian user without affecting the global configuration.",
      question: "How do you achieve this per-file setup?",
      options: [
        "Use `test.use({ timezoneId: 'Australia/Sydney' });` at the top level of the test file.",
        "Change the OS clock using `execSync('date -s')`.",
        "It must be done in `playwright.config.ts` globally.",
        "Pass a mock object to `Date.now()` via `page.evaluate()`.",
      ],
      correctIndex: 0,
      explanation:
        "`test.use()` allows localized overriding of context options (like timezone, geolocation, locale) for a specific describe block or file, providing excellent isolation.",
    },
    {
      id: "pw-set3-20",
      question:
        "What is the primary difference between Playwright E2E Testing and Playwright Component Testing (CT)?",
      options: [
        "CT only works with React applications.",
        "E2E navigates to a URL and interacts with a fully deployed app. CT boots up an empty page, dynamically mounts a single frontend component (React/Vue/Svelte) into the DOM, and tests it in isolation.",
        "CT runs in Node.js instead of a real browser.",
        "There is no difference.",
      ],
      correctIndex: 1,
      explanation:
        "Component testing bridges the gap between unit tests and E2E. It leverages Playwright's real browser rendering but isolates the specific UI component via bundlers (Vite/Webpack), completely mocking the backend API and routing.",
    },
  ],
};
