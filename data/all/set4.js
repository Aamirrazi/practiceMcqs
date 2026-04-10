// ========================= HARD LEVEL TEST =========================
const HardLevelTest = {
  meta: {
    id: "capg-emt-hard",
    testTitle:
      "Capgemini Excelerator - Advanced Playwright & TypeScript (Hard)",
    topic: "M1 Style Mock Test",
    topicLabel: "Playwright + TS Advanced",
    difficulty: "Hard",
    questionCount: 60,
    estimatedMinutes: 75,
    description:
      "Challenging questions on DOM internals, advanced TypeScript, Playwright patterns, performance tuning, and OOP design.",
    icon: "🔥",
  },

  questions: [
    // HARD DOM & BROWSER APIS (1-10)
    {
      id: "hard-001",
      code: "document.body.addEventListener('click', () => console.log('body'), true);\ndocument.body.addEventListener('click', () => console.log('body bubble'));\nconst btn = document.createElement('button');\ndocument.body.appendChild(btn);\nbtn.click();",
      question: "What is the console output order?",
      options: [
        "'body' then 'body bubble'",
        "'body bubble' then 'body'",
        "Only 'body' because capturing prevents bubbling",
        "'body' twice",
      ],
      correctIndex: 0,
      explanation:
        "The first listener uses `true` (capturing phase), so it fires before the bubbling listener.",
    },
    {
      id: "hard-002",
      code: "const div = document.getElementById('container');\nconst clone = div.cloneNode(true);\ndocument.body.appendChild(clone);",
      question:
        "Does `clone` include event listeners that were attached to the original div?",
      options: [
        "Yes, cloneNode(true) copies all event listeners",
        "No, event listeners are never copied",
        "Only inline event handlers (onclick) are copied",
        "Only if the original listener was added with useCapture=true",
      ],
      correctIndex: 1,
      explanation:
        "cloneNode does not copy event listeners added with addEventListener. Only attributes like onclick are preserved.",
    },
    {
      id: "hard-003",
      scenario:
        "You have a <div> with 10,000 children. You need to remove all children efficiently.",
      question: "Which method is fastest and avoids memory leaks?",
      options: [
        "while(div.firstChild) div.removeChild(div.firstChild)",
        "div.innerHTML = ''",
        "div.replaceChildren()",
        "Both B and C are equally good, but replaceChildren is modern and fast",
      ],
      correctIndex: 3,
      explanation:
        "replaceChildren() is the most direct modern API; innerHTML = '' works but can cause side effects.",
    },
    {
      id: "hard-004",
      code: "const observer = new MutationObserver(callback);\nobserver.observe(target, { attributes: true, childList: true, subtree: true });",
      question: "What kind of changes will trigger the callback?",
      options: [
        "Only attribute changes on target",
        "Changes to attributes, addition/removal of child nodes anywhere in the subtree",
        "Only text content changes",
        "Only when the target is removed from DOM",
      ],
      correctIndex: 1,
      explanation:
        "The options enable observation of attributes, child list changes, and deep (subtree) changes.",
    },
    {
      id: "hard-005",
      scenario:
        "You call `getComputedStyle(element).color` right after changing the class. The value is stale.",
      question: "What is the most likely reason?",
      options: [
        "A bug in the browser",
        "You need to force a reflow by reading `element.offsetHeight` before getComputedStyle",
        "The class change hasn't been applied yet because of style batching",
        "getComputedStyle returns only inline styles",
      ],
      correctIndex: 2,
      explanation:
        "Browsers batch style recalculations. Reading `offsetHeight` forces a synchronous reflow, updating styles.",
    },
    {
      id: "hard-006",
      code: "let elements = document.getElementsByClassName('item');\nconsole.log(elements.length);\ndocument.body.appendChild(document.createElement('div')).className = 'item';\nconsole.log(elements.length);",
      question: "What will be logged?",
      options: [
        "0 then 1",
        "0 then 0 (because the new div is not in the live collection?)",
        "0 then 1 because HTMLCollection is live",
        "Error: getElementsByClassName returns a NodeList",
      ],
      correctIndex: 2,
      explanation:
        "getElementsByClassName returns a live HTMLCollection that automatically updates when the DOM changes.",
    },
    {
      id: "hard-007",
      scenario:
        "You want to measure the exact time when the first paint occurred on a page.",
      question: "Which browser API provides this?",
      options: [
        "performance.now()",
        "PerformancePaintTiming via performance.getEntriesByType('paint')",
        "window.load event",
        "DOMContentLoaded",
      ],
      correctIndex: 1,
      explanation:
        "The Paint Timing API gives 'first-paint' and 'first-contentful-paint' entries.",
    },
    {
      id: "hard-008",
      code: "const shadowHost = document.getElementById('host');\nconst shadowRoot = shadowHost.attachShadow({ mode: 'open' });\nshadowRoot.innerHTML = '<p>Inside shadow</p>';",
      question:
        "Can you use `document.querySelector('p')` to select the paragraph inside the shadow DOM?",
      options: [
        "Yes, because querySelector pierces shadow boundaries",
        "No, shadow DOM encapsulates styling and query selection",
        "Only if mode is 'closed'",
        "Only if you use shadowRoot.querySelector",
      ],
      correctIndex: 1,
      explanation:
        "Standard DOM queries do not cross shadow boundaries. You need to access the shadowRoot first.",
    },
    {
      id: "hard-009",
      code: "window.requestAnimationFrame(() => console.log('raf'));\nsetTimeout(() => console.log('timeout'), 0);\nconsole.log('sync');",
      question: "What is the correct order?",
      options: [
        "sync, raf, timeout",
        "sync, timeout, raf",
        "raf, sync, timeout",
        "timeout, sync, raf",
      ],
      correctIndex: 0,
      explanation:
        "Sync code first, then microtasks, then requestAnimationFrame (before paint), then setTimeout.",
    },
    {
      id: "hard-010",
      scenario:
        "You have a large table and want to add a thousand rows without freezing the UI.",
      question: "Which technique is most appropriate?",
      options: [
        "Use document.createDocumentFragment and append all rows at once",
        "Use setTimeout or requestIdleCallback to batch rows",
        "Use virtual scrolling",
        "All of the above, depending on the exact requirements",
      ],
      correctIndex: 3,
      explanation:
        "Fragment reduces reflows; batching avoids long tasks; virtual scrolling is best for huge datasets.",
    },

    // ADVANCED TYPESCRIPT (11-20)
    {
      id: "hard-011",
      code: "type DeepReadonly<T> = { readonly [P in keyof T]: DeepReadonly<T[P]> };",
      question: "What does this mapped type do?",
      options: [
        "It makes all properties optional",
        "It recursively makes all properties readonly",
        "It removes all readonly modifiers",
        "It only affects top‑level properties",
      ],
      correctIndex: 1,
      explanation:
        "The recursive mapped type applies readonly to every nested property as well.",
    },
    {
      id: "hard-012",
      code: "function identity<T extends { length: number }>(arg: T): T { return arg; }",
      question: "What constraint does T have?",
      options: [
        "T must be a number",
        "T must have a numeric length property (e.g., string, array)",
        "T must be an object",
        "No constraint",
      ],
      correctIndex: 1,
      explanation:
        "The generic constraint `{ length: number }` means T must have a length property of type number.",
    },
    {
      id: "hard-013",
      code: "type EventMap = { click: (e: MouseEvent) => void; keyup: (e: KeyboardEvent) => void };\ntype EventNames = keyof EventMap;",
      question: "What is the type of `EventNames`?",
      options: [
        "'click' | 'keyup'",
        "string",
        "MouseEvent | KeyboardEvent",
        "never",
      ],
      correctIndex: 0,
      explanation:
        "keyof on an object type returns a union of its keys (string literals).",
    },
    {
      id: "hard-014",
      scenario:
        "You want a function that accepts any number of arguments and returns the same type as the first argument.",
      question: "Which signature correctly expresses this?",
      options: [
        "function first<T>(...args: T[]): T",
        "function first<T>(arg1: T, ...rest: any[]): T",
        "function first<T extends any[]>(...args: T): T[0]",
        "function first<T>(...args: T): T",
      ],
      correctIndex: 1,
      explanation:
        "The first parameter is of type T, the rest can be any; the return type is T.",
    },
    {
      id: "hard-015",
      code: "interface User { id: number; name: string; email?: string; }\ntype RequiredUser = Required<User>;",
      question: "What does Required<User> do?",
      options: [
        "Makes all properties optional",
        "Makes all properties required (removes optionality)",
        "Adds a required flag",
        "Creates a new interface with only required properties",
      ],
      correctIndex: 1,
      explanation:
        "Required<T> is a utility type that constructs a type with all properties of T set to required.",
    },
    {
      id: "hard-016",
      code: "type Result<T> = T extends (infer U)[] ? U : never;\ntype A = Result<string[]>; // ?\ntype B = Result<number>;   // ?",
      question: "What are A and B?",
      options: [
        "A = string, B = never",
        "A = string[], B = number",
        "A = never, B = never",
        "A = string, B = unknown",
      ],
      correctIndex: 0,
      explanation:
        "Conditional type with infer extracts the element type of an array; for non‑arrays it returns never.",
    },
    {
      id: "hard-017",
      scenario:
        "You have a class with private fields. You want to expose a method that returns a copy of an internal array, but prevent external mutation.",
      question: "Which return type is safest?",
      options: [
        "return this.items;",
        "return [...this.items] as const;",
        "return this.items.slice();",
        "return this.items.map(x => x)",
      ],
      correctIndex: 2,
      explanation:
        "slice() returns a shallow copy, preventing the caller from mutating the original array.",
    },
    {
      id: "hard-018",
      code: "const fn = (x: unknown) => {\n  if (typeof x === 'string') return x.length;\n  if (Array.isArray(x)) return x.length;\n  return 0;\n};",
      question: "What is the return type of fn?",
      options: ["number", "number | undefined", "any", "number | void"],
      correctIndex: 0,
      explanation: "All branches return a number, so TypeScript infers number.",
    },
    {
      id: "hard-019",
      code: "type Nullable<T> = T | null;\ntype StringOrNumber = Nullable<string | number>;",
      question: "What type does StringOrNumber represent?",
      options: [
        "string | number | null",
        "string | null",
        "number | null",
        "string | number",
      ],
      correctIndex: 0,
      explanation:
        "Nullable adds null to the union, so final type = string | number | null.",
    },
    {
      id: "hard-020",
      scenario:
        "You want to ensure that an object has exactly the keys 'x' and 'y', no more, no less.",
      question: "Which type accomplishes this?",
      options: [
        "type Point = { x: number; y: number }",
        "type Point = Record<'x' | 'y', number>",
        "type Point = { x: number; y: number; [key: string]: never }",
        "Both A and B",
      ],
      correctIndex: 3,
      explanation:
        "Both A and B define exact shape; C uses an index signature with never to forbid extra keys.",
    },

    // PLAYWRIGHT HARD (21-40)
    {
      id: "hard-021",
      code: "await page.route('**/api/data', route => route.continue({ headers: { 'X-Custom': 'test' } }));",
      question: "What does this route handler do?",
      options: [
        "Aborts the request",
        "Fulfills the request with a custom response",
        "Continues the request but modifies request headers",
        "Logs the request and then continues",
      ],
      correctIndex: 2,
      explanation:
        "route.continue() allows you to modify the request (headers, method, postData) before sending it to the server.",
    },
    {
      id: "hard-022",
      scenario:
        "A test needs to wait for a network request that matches a specific URL and then assert its response body.",
      question: "Which pattern is correct?",
      options: [
        "await page.waitForResponse(response => response.url().includes('/api')); const body = await response.json();",
        "const response = await page.waitForResponse('/api');",
        "Both A and B, but B returns the response object directly",
        "page.on('response', ... )",
      ],
      correctIndex: 2,
      explanation:
        "waitForResponse can take a URL string or a predicate; it returns the response object.",
    },
    {
      id: "hard-023",
      code: "const download = await page.waitForEvent('download');\nawait download.saveAs('./file.pdf');",
      question:
        "What happens if the download does not occur within the timeout?",
      options: [
        "The test continues and download is null",
        "The test throws a timeout error",
        "The download is queued indefinitely",
        "It creates an empty file",
      ],
      correctIndex: 1,
      explanation:
        "waitForEvent throws a timeout error if the event is not emitted within the timeout period.",
    },
    {
      id: "hard-024",
      scenario:
        "You have a flaky test that fails because a popup window opens and you need to interact with it.",
      question: "What is the best way to handle the popup?",
      options: [
        "Use `const popup = await page.waitForEvent('popup')` before clicking the button that opens it",
        "Use `page.context().pages()[1]` after a delay",
        "Use `page.on('popup', ...)`",
        "Disable popups via browser flags",
      ],
      correctIndex: 0,
      explanation:
        "waitForEvent('popup') sets up a listener before the action, ensuring you capture the popup page object.",
    },
    {
      id: "hard-025",
      code: "test('trace', async ({ page, browser }) => {\n  await browser.startTracing(page, { screenshots: true });\n  // ... actions\n  await browser.stopTracing();\n});",
      question: "What does `startTracing` capture?",
      options: [
        "Playwright trace (snapshots, actions)",
        "Chrome DevTools trace (performance timeline)",
        "A video recording",
        "Network HAR file",
      ],
      correctIndex: 1,
      explanation:
        "browser.startTracing captures Chromium's internal performance trace (timeline, events).",
    },
    {
      id: "hard-026",
      scenario:
        "You need to run the same test with two different user roles (admin and viewer) without duplicating code.",
      question: "Which Playwright feature is most suitable?",
      options: [
        "test.describe.configure",
        "test.each with parameterised roles and storageState",
        "test.beforeEach with conditionals",
        "test.concurrent",
      ],
      correctIndex: 1,
      explanation:
        "test.each can iterate over role configurations; each can load a different storageState.",
    },
    {
      id: "hard-027",
      code: "await expect(page.locator('.toast')).toHaveText('Saved', { timeout: 10000 });",
      question: "What does the `{ timeout: 10000 }` option do?",
      options: [
        "Sets the maximum time to wait for the condition to become true (10s)",
        "Sets the test's overall timeout",
        "Waits exactly 10 seconds and then checks",
        "Ignores the default timeout",
      ],
      correctIndex: 0,
      explanation:
        "Each assertion can override the default timeout; it retries until the condition is met or timeout is reached.",
    },
    {
      id: "hard-028",
      code: "test('serial', async () => {\n  test.step('Step 1', async () => { await page.click('button'); });\n  test.step('Step 2', async () => { await page.fill('input', 'text'); });\n});",
      question: "What is the benefit of using `test.step`?",
      options: [
        "It makes the test run faster",
        "It groups actions in the report and trace viewer, improving debugging",
        "It isolates each step's error handling",
        "It allows parallel execution of steps",
      ],
      correctIndex: 1,
      explanation:
        "Steps appear as nested blocks in the HTML report and trace, making it easier to see which part failed.",
    },
    {
      id: "hard-029",
      scenario:
        "You have a test that clicks an element, but the element is covered by an overlay that disappears after 500ms.",
      question: "How can you make the test reliable?",
      options: [
        "Use `page.click('button', { trial: true })` to check without clicking",
        "Use `page.waitForSelector('overlay', { state: 'hidden' })` before clicking",
        "Add a fixed delay",
        "Use `page.evaluate` to click via JavaScript",
      ],
      correctIndex: 1,
      explanation:
        "Waiting for the overlay to be hidden ensures the target element is clickable.",
    },
    {
      id: "hard-030",
      code: "await page.locator('input').evaluate(el => el.value = 'test');",
      question:
        "How does this differ from `await page.locator('input').fill('test')`?",
      options: [
        "They are identical",
        "fill triggers input events, evaluate does not (by default)",
        "evaluate is faster but less reliable",
        "fill only works on text inputs",
      ],
      correctIndex: 1,
      explanation:
        "fill simulates real user input (focus, key events). evaluate directly sets the property, bypassing events.",
    },
    {
      id: "hard-031",
      code: "test('viewport', async ({ page }) => {\n  await page.setViewportSize({ width: 1920, height: 1080 });\n});",
      question: "When should you call setViewportSize?",
      options: [
        "Only before page.goto",
        "Any time, but it triggers a resize event",
        "Only in a beforeEach hook",
        "It is deprecated",
      ],
      correctIndex: 1,
      explanation:
        "You can change viewport at any time; the page will resize accordingly.",
    },
    {
      id: "hard-032",
      scenario:
        "A test fails with 'Locator resolved to <button> but is not visible'.",
      question: "Which debug technique gives the most insight?",
      options: [
        "console.log(await page.locator('button').isVisible())",
        "Use `await page.pause()` and then inspect the element in the Playwright inspector",
        "Increase timeout",
        "Take a screenshot",
      ],
      correctIndex: 1,
      explanation:
        "page.pause() opens the Playwright inspector, allowing you to inspect the DOM, check visibility, and evaluate locators live.",
    },
    {
      id: "hard-033",
      code: "await page.locator('button').click({ force: true });",
      question: "What does `force: true` do?",
      options: [
        "Clicks even if the button is disabled",
        "Clicks even if the button is not visible or covered",
        "Clicks multiple times",
        "Forces a mouse event instead of a touch event",
      ],
      correctIndex: 1,
      explanation:
        "force: true bypasses actionability checks (visibility, stability, covered by other elements). Use sparingly.",
    },
    {
      id: "hard-034",
      scenario:
        "You want to capture a trace that includes all network requests, console logs, and DOM snapshots.",
      question: "Which Playwright configuration enables that?",
      options: [
        "trace: 'on'",
        "trace: 'retain-on-failure'",
        "trace: 'on-first-retry'",
        "trace: 'off'",
      ],
      correctIndex: 0,
      explanation:
        "'on' captures a trace for every test; 'retain-on-failure' only for failed tests. Both include full data.",
    },
    {
      id: "hard-035",
      code: "await page.locator('select').selectOption('blue');",
      question: "What if there are multiple options with the same value?",
      options: [
        "It selects the first matching option",
        "It throws an error",
        "It selects all matching options",
        "It does nothing",
      ],
      correctIndex: 0,
      explanation:
        "If multiple options share the same value, Playwright selects the first one.",
    },
    {
      id: "hard-036",
      scenario:
        "Your test suite runs in CI. One test often fails because the environment is slow.",
      question: "What is the recommended way to make it more resilient?",
      options: [
        "Increase the default timeout via config",
        "Use `expect.poll` with a custom predicate",
        "Add `await page.waitForTimeout(2000)`",
        "Both A and B are valid; B is more precise",
      ],
      correctIndex: 3,
      explanation:
        "Increasing timeout globally helps, but `expect.poll` allows retrying a custom asynchronous condition.",
    },
    {
      id: "hard-037",
      code: "const newContext = await browser.newContext({ locale: 'fr-FR' });\nconst page = await newContext.newPage();",
      question: "What effect does the locale option have?",
      options: [
        "It changes the browser UI language",
        "It sets the Accept-Language header and affects date/number formatting",
        "It only affects the page title",
        "It does nothing in headless mode",
      ],
      correctIndex: 1,
      explanation:
        "Locale influences how the page formats dates, numbers, and sends language headers.",
    },
    {
      id: "hard-038",
      scenario:
        "You need to run a test against a specific build deployed to a dynamic URL (e.g., preview environment).",
      question: "How can you pass that URL without hardcoding?",
      options: [
        "Use environment variables and `process.env.BASE_URL` in the test",
        "Hardcode and change before each run",
        "Use a custom fixture",
        "Both A and C are viable",
      ],
      correctIndex: 3,
      explanation:
        "Environment variables are common; custom fixtures can also inject the base URL from config.",
    },
    {
      id: "hard-039",
      code: "test('auto-wait', async ({ page }) => {\n  await page.locator('.dynamic').click();\n});",
      question: "What does Playwright automatically do before the click?",
      options: [
        "Waits for the element to be attached, visible, stable, and enabled",
        "Waits 1 second",
        "Only waits for the element to exist",
        "Nothing, you must add explicit waits",
      ],
      correctIndex: 0,
      explanation:
        "Playwright has auto‑waiting for actionability: attached, visible, stable (not moving), and enabled.",
    },
    {
      id: "hard-040",
      scenario:
        "You have a test that fails only when running in headless mode.",
      question: "What could be a common cause?",
      options: [
        "Headless mode has different viewport size",
        "Headless mode executes JavaScript faster, exposing race conditions",
        "CSS animations behave differently",
        "All of the above",
      ],
      correctIndex: 3,
      explanation:
        "Differences in timing, rendering, and default viewport can cause headless‑only failures.",
    },

    // OOP & DESIGN (41-45)
    {
      id: "hard-041",
      code: "class Repository<T> { private items: T[] = []; add(item: T) { this.items.push(item); } }",
      question: "What is the benefit of using a generic class here?",
      options: [
        "It avoids code duplication for different data types",
        "It improves runtime performance",
        "It allows private items to be any type",
        "No benefit, could just use any[]",
      ],
      correctIndex: 0,
      explanation:
        "Generics allow the same class to work with any type while preserving type safety.",
    },
    {
      id: "hard-042",
      scenario:
        "You need to enforce that a class has only one instance across the application.",
      question: "Which pattern is appropriate?",
      options: ["Factory", "Singleton", "Observer", "Builder"],
      correctIndex: 1,
      explanation:
        "The Singleton pattern restricts instantiation to a single object.",
    },
    {
      id: "hard-043",
      code: "class A { method() { console.log('A'); } }\nclass B extends A { method() { super.method(); console.log('B'); } }",
      question: "When `new B().method()` is called, what is logged?",
      options: ["A then B", "B only", "B then A", "Error: super not allowed"],
      correctIndex: 0,
      explanation:
        "super.method() calls the parent method, so both logs appear in order.",
    },
    {
      id: "hard-044",
      scenario:
        "You have a complex object creation logic (many optional parameters).",
      question: "Which design pattern simplifies this?",
      options: ["Prototype", "Builder", "Adapter", "Decorator"],
      correctIndex: 1,
      explanation:
        "Builder pattern allows step‑by‑step construction with clarity and flexibility.",
    },
    {
      id: "hard-045",
      code: "interface Logger { log(message: string): void; }\nclass ConsoleLogger implements Logger { log(message) { console.log(message); } }",
      question: "What principle is demonstrated?",
      options: [
        "Dependency Inversion (depending on abstraction, not concrete class)",
        "Liskov Substitution",
        "Interface Segregation",
        "Single Responsibility",
      ],
      correctIndex: 0,
      explanation:
        "Code that uses `Logger` abstraction can be decoupled from the concrete implementation.",
    },

    // PERFORMANCE ENGINEERING HARD (46-50)
    {
      id: "hard-046",
      scenario:
        "You have a Node.js API endpoint that processes a large file. The memory usage spikes and the process crashes.",
      question: "What is the most likely issue and fix?",
      options: [
        "Using synchronous file read (readFileSync) – replace with streams",
        "Too many concurrent requests – add a queue",
        "Memory leak in a third‑party library – upgrade it",
        "CPU overload – add more cores",
      ],
      correctIndex: 0,
      explanation:
        "Reading entire large files into memory causes high memory usage. Streams process chunks.",
    },
    {
      id: "hard-047",
      code: "// Inefficient loop\nfor (let i = 0; i < 1000000; i++) {\n  document.getElementById('counter').innerText = i;\n}",
      question: "Why is this bad for performance?",
      options: [
        "It forces a DOM reflow on every iteration",
        "The loop is too fast, it will cause a stack overflow",
        "getElementById is slow",
        "innerText cannot be set in a loop",
      ],
      correctIndex: 0,
      explanation:
        "Updating textContent/innerText inside a loop triggers layout recalculation each time. Use a virtual representation and update once.",
    },
    {
      id: "hard-048",
      scenario:
        "A web application loads 50 large images. The user experiences layout shifts as images load.",
      question: "Which attribute can mitigate this?",
      options: [
        "loading='lazy'",
        "width and height attributes (or CSS aspect‑ratio)",
        "decoding='async'",
        "All of the above help, but width/height reserve space",
      ],
      correctIndex: 3,
      explanation:
        "Specifying width/height or using aspect‑ratio reserves space, preventing layout shift. Lazy loading improves loading time but does not prevent shift by itself.",
    },
    {
      id: "hard-049",
      code: "performance.mark('start');\n// ... long task\nperformance.mark('end');\nperformance.measure('task', 'start', 'end');",
      question: "Where can you retrieve the measured duration?",
      options: [
        "performance.getEntriesByName('task')[0].duration",
        "performance.timing",
        "performance.now() after the task",
        "console.log(performance.measure)",
      ],
      correctIndex: 0,
      explanation:
        "PerformanceMeasure entries are stored and can be retrieved with getEntriesByName.",
    },
    {
      id: "hard-050",
      scenario:
        "Your test suite runs 200 tests, and you notice the CI pipeline takes 30 minutes. Many tests repeat the same login.",
      question: "What is the most effective optimisation?",
      options: [
        "Use a single shared browser context with storageState to reuse the logged‑in session",
        "Run tests in parallel with workers",
        "Reduce the number of tests",
        "Use a faster CI machine",
      ],
      correctIndex: 0,
      explanation:
        "Reusing authentication state (storageState) eliminates repetitive login steps, drastically cutting total time.",
    },

    // FINAL HARD QUESTIONS (51-60)
    {
      id: "hard-051",
      code: "type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]> };",
      question: "What does this type do to nested objects?",
      options: [
        "Makes only top‑level properties optional",
        "Makes all properties and nested properties optional recursively",
        "Makes all properties required",
        "Removes optional properties",
      ],
      correctIndex: 1,
      explanation:
        "DeepPartial recursively applies Partial to every sub‑object.",
    },
    {
      id: "hard-052",
      scenario:
        "You have a Playwright test that must ensure no unexpected network requests (e.g., analytics) are made.",
      question: "Which approach works best?",
      options: [
        "page.route('**', route => route.abort()) and then allow only specific routes",
        "page.on('request', request => expect(request.url()).not.toContain('analytics'))",
        "Use a service worker to block requests",
        "It's impossible",
      ],
      correctIndex: 0,
      explanation:
        "Block all routes by default, then selectively allow required ones. This guarantees no unexpected calls.",
    },
    {
      id: "hard-053",
      code: "await page.locator('button').click({ position: { x: 10, y: 10 } });",
      question: "What does the `position` option do?",
      options: [
        "Clicks at an offset relative to the top‑left corner of the element",
        "Clicks at an absolute position on the page",
        "Clicks at the center of the element plus offset",
        "It is invalid for click",
      ],
      correctIndex: 0,
      explanation:
        "position specifies the click coordinates relative to the element's bounding box.",
    },
    {
      id: "hard-054",
      scenario:
        "Your test needs to verify that a certain string does NOT appear anywhere on the page.",
      question: "Which assertion is most efficient?",
      options: [
        "expect(page.locator('body')).not.toContainText('error')",
        "expect(page.content()).not.toMatch(/error/)",
        "await expect(page.locator('text=error')).toHaveCount(0)",
        "All are acceptable; the locator version is idiomatic",
      ],
      correctIndex: 3,
      explanation:
        "Using toHaveCount(0) on a locator that looks for the text is clear and auto‑retries.",
    },
    {
      id: "hard-055",
      code: "test('parallel', async ({ browser }) => {\n  const context1 = await browser.newContext();\n  const context2 = await browser.newContext();\n  // ... run actions in parallel\n});",
      question: "Do context1 and context2 share cookies?",
      options: [
        "Yes, because they belong to the same browser instance",
        "No, each context is fully isolated",
        "Only if they have the same storageState",
        "They share localStorage but not cookies",
      ],
      correctIndex: 1,
      explanation:
        "Browser contexts are completely isolated (cookies, local storage, etc.) unless you manually reuse storageState.",
    },
    {
      id: "hard-056",
      code: "function exhaustiveCheck(x: never): never { throw new Error('Unexpected value'); }",
      question: "How is this function used in TypeScript?",
      options: [
        "To cause a runtime error for debugging",
        "To ensure exhaustiveness in switch/union types",
        "To convert any type to never",
        "To create infinite loops",
      ],
      correctIndex: 1,
      explanation:
        "In a switch over a union, the default case can call exhaustiveCheck to catch unhandled union members.",
    },
    {
      id: "hard-057",
      scenario:
        "A test clicks a button that opens a file picker. You want to upload a file.",
      question: "What is the correct Playwright method?",
      options: [
        "page.setInputFiles('input[type=file]', 'file.pdf')",
        "page.locator('button').uploadFile('file.pdf')",
        "page.fileChooser('file.pdf')",
        "Use page.waitForEvent('filechooser') before click, then setFiles",
      ],
      correctIndex: 3,
      explanation:
        "Listen for file chooser event, then set the file path. This works even if the input is hidden.",
    },
    {
      id: "hard-058",
      code: "test('timeout', async ({ page }) => {\n  await page.waitForSelector('.slow', { timeout: 1000 });\n}).setTimeout(5000);",
      question: "Which timeout takes precedence for the waitForSelector?",
      options: [
        "The test timeout (5000ms)",
        "The explicit 1000ms passed to waitForSelector",
        "Both are combined (6000ms)",
        "The default global timeout",
      ],
      correctIndex: 1,
      explanation:
        "Explicit timeout overrides the test's default for that specific wait.",
    },
    {
      id: "hard-059",
      scenario:
        "You have a single‑page app that uses client‑side routing (hash or history API). You want to test that navigating to a deep URL shows the right content.",
      question: "How should you load the page?",
      options: [
        "page.goto('http://localhost:3000/#/users')",
        "page.goto('/') and then page.click('a[href=\"#/users\"]')",
        "page.goto('/users') and rely on the router",
        "Use page.evaluate to change the hash",
      ],
      correctIndex: 2,
      explanation:
        "Modern SPAs often support direct deep linking. Use page.goto directly with the desired route.",
    },
    {
      id: "hard-060",
      code: "const frame = page.frame('iframe-name');\nawait frame.locator('button').click();",
      question: "What happens if the iframe name is not found?",
      options: [
        "frame returns null and the click fails with a helpful error",
        "frame throws an exception",
        "page.frame returns undefined; subsequent locator will throw",
        "Playwright automatically waits for the frame to appear",
      ],
      correctIndex: 2,
      explanation:
        "page.frame returns undefined if no frame matches; then calling .locator on undefined causes an error.",
    },
  ],
};
