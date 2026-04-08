/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║   Playwright M1 — Hard Difficulty   (60 Questions)          ║
 * ║   Capgemini Excellencer Training Batch                       ║
 * ║   Topics: TypeScript + Playwright (as per TOC)               ║
 * ╚══════════════════════════════════════════════════════════════╝
 */
const PlaywrightM1Hard = {
  meta: {
    id: "playwright-m1-hard",
    testTitle: "Playwright M1 — Hard",
    topic: "M1 Style Mock Test",
    topicLabel: "Playwright + TypeScript",
    difficulty: "Advanced",
    questionCount: 60,
    estimatedMinutes: 90,
    description:
      "Advanced scenario and code-based questions with edge cases, subtle bugs, and complex design decisions in TypeScript and Playwright — aligned to the Capgemini M1 syllabus.",
    icon: "🔥",
  },

  questions: [
    // ── TYPESCRIPT — Advanced Types & Edge Cases (Q1–Q12) ─────────────────

    {
      id: "m1-hrd-01",
      code:
        "function processInput(value: string | number): string {\n" +
        '  if (typeof value === "string") {\n' +
        "    return value.toUpperCase();\n" +
        "  }\n" +
        "  return value.toFixed(2);\n" +
        "}\n" +
        "console.log(processInput(3.14159));\n" +
        'console.log(processInput("hello"));',
      question: "What are the two outputs in order?",
      options: [
        '"3.14" and "HELLO"',
        '"3.14159" and "hello"',
        '"3.14" and "hello"',
        "Compile error: toFixed is not on number in a union",
      ],
      correctIndex: 0,
      explanation:
        "TypeScript's typeof type guard narrows the union. In the number branch, toFixed(2) formats to 2 decimal places: 3.14. In the string branch, toUpperCase returns 'HELLO'. TypeScript correctly narrows each branch.",
    },

    {
      id: "m1-hrd-02",
      code:
        "interface Config {\n" +
        "  timeout: number;\n" +
        "  retries?: number;\n" +
        "}\n\n" +
        "function run(config: Config) {\n" +
        "  const retries = config.retries ?? 3;\n" +
        "  console.log(retries);\n" +
        "}\n\n" +
        "run({ timeout: 5000, retries: 0 });",
      question: "What is printed and why?",
      options: [
        "3 — because retries is falsy (0), the nullish coalescing falls back",
        "0 — because ?? only falls back on null or undefined, not on 0",
        "undefined — retries is not passed as a valid number",
        "Compile error: retries cannot be 0",
      ],
      correctIndex: 1,
      explanation:
        "The ?? (nullish coalescing) operator falls back ONLY when the left side is null or undefined. 0 is a valid value — not null or undefined — so config.retries ?? 3 evaluates to 0, not 3. A common bug when || is mistakenly used instead.",
    },

    {
      id: "m1-hrd-03",
      code:
        "class Singleton {\n" +
        "  private static instance: Singleton;\n" +
        "  private constructor() {}\n\n" +
        "  static getInstance(): Singleton {\n" +
        "    if (!Singleton.instance) {\n" +
        "      Singleton.instance = new Singleton();\n" +
        "    }\n" +
        "    return Singleton.instance;\n" +
        "  }\n" +
        "}\n\n" +
        "const a = Singleton.getInstance();\n" +
        "const b = Singleton.getInstance();\n" +
        "console.log(a === b);",
      question: "What is printed and what pattern does this implement?",
      options: [
        "false — each getInstance() call returns a new object",
        "true — the Singleton pattern ensures only one instance exists",
        "Compile error: cannot call new on a class with private constructor externally",
        "true — but only because TypeScript caches class instantiations",
      ],
      correctIndex: 1,
      explanation:
        "This is the Singleton pattern. The private constructor prevents external instantiation. getInstance() checks if an instance exists and creates one only if not. Both a and b reference the exact same object — a === b is true.",
    },

    {
      id: "m1-hrd-04",
      code:
        "type Partial<T> = { [K in keyof T]?: T[K] };\n\n" +
        "interface User {\n" +
        "  id: number;\n" +
        "  name: string;\n" +
        "  email: string;\n" +
        "}\n\n" +
        "function updateUser(id: number, data: Partial<User>): void {\n" +
        '  console.log("Updating", id, "with", data);\n' +
        "}\n\n" +
        'updateUser(1, { name: "Priya" });',
      question:
        "Why does passing only { name: 'Priya' } to updateUser NOT cause a compile error?",
      options: [
        "TypeScript ignores extra type safety on function arguments",
        "Partial<User> makes all User properties optional, so any subset is valid",
        "The id field has a default value of 0",
        "TypeScript infers the missing fields as undefined at runtime",
      ],
      correctIndex: 1,
      explanation:
        "Partial<T> is a mapped type that makes every property in T optional (adds ? to each key). So Partial<User> requires none of id, name, or email — any subset (including empty {}) is valid. This is commonly used for PATCH-style update functions.",
    },

    {
      id: "m1-hrd-05",
      code:
        "abstract class TestBase {\n" +
        "  abstract setup(): Promise<void>;\n\n" +
        "  async runAll(): Promise<void> {\n" +
        "    await this.setup();\n" +
        '    console.log("Tests running...");\n' +
        "  }\n" +
        "}\n\n" +
        "class SmokeTest extends TestBase {\n" +
        "  async setup(): Promise<void> {\n" +
        '    console.log("Smoke setup done");\n' +
        "  }\n" +
        "}\n\n" +
        "const t = new SmokeTest();\n" +
        "await t.runAll();",
      question: "What is the output?",
      options: [
        "Tests running...",
        "Smoke setup done\nTests running...",
        "Compile error: cannot instantiate abstract class",
        "Smoke setup done",
      ],
      correctIndex: 1,
      explanation:
        "SmokeTest is a concrete class extending the abstract TestBase. runAll() calls this.setup() which dispatches to SmokeTest's implementation (polymorphism). Output is 'Smoke setup done' then 'Tests running...' on separate lines.",
    },

    {
      id: "m1-hrd-06",
      code:
        "function delay(ms: number): Promise<void> {\n" +
        "  return new Promise(resolve => setTimeout(resolve, ms));\n" +
        "}\n\n" +
        "async function fetchSequential(): Promise<void> {\n" +
        '  console.log("start");\n' +
        "  await delay(100);\n" +
        '  console.log("after 100ms");\n' +
        "  await delay(200);\n" +
        '  console.log("after 300ms total");\n' +
        "}",
      question:
        "What is the total minimum execution time of fetchSequential() and what is the output order?",
      options: [
        "100ms total; start → after 100ms → after 300ms total",
        "300ms total; start → after 100ms → after 300ms total",
        "300ms total; all three lines print simultaneously",
        "200ms total; start → after 300ms total → after 100ms",
      ],
      correctIndex: 1,
      explanation:
        "await pauses execution until each delay resolves. 100ms + 200ms = 300ms minimum. The output is sequential: 'start', then 'after 100ms' after 100ms, then 'after 300ms total' after a further 200ms.",
    },

    {
      id: "m1-hrd-07",
      code:
        "const arr = [1, 2, 3, 4, 5];\n" +
        "const result = arr\n" +
        "  .filter(n => n % 2 === 0)\n" +
        "  .map(n => n * n);\n" +
        "console.log(result);",
      question: "What is printed?",
      options: ["[1, 4, 9, 16, 25]", "[4, 16]", "[2, 4]", "[1, 9, 25]"],
      correctIndex: 1,
      explanation:
        "filter keeps elements where n % 2 === 0, giving [2, 4]. map then squares each: [4, 16]. The odd numbers 1, 3, 5 are filtered out before mapping.",
    },

    {
      id: "m1-hrd-08",
      code:
        "type EventMap = {\n" +
        "  click: { x: number; y: number };\n" +
        "  keypress: { key: string };\n" +
        "};\n\n" +
        "function on<K extends keyof EventMap>(event: K, handler: (e: EventMap[K]) => void): void {\n" +
        "  // register handler\n" +
        "}\n\n" +
        'on("click", (e) => console.log(e.x, e.y));\n' +
        'on("keypress", (e) => console.log(e.key));',
      question:
        "What TypeScript feature makes this type-safe without any type assertions?",
      options: [
        "Union types — EventMap is a union of click and keypress",
        "Generic constraints — K extends keyof EventMap ties the event name to its payload type automatically",
        "Interface merging — the two overloads are merged at compile time",
        "Type casting — TypeScript implicitly casts e in each handler",
      ],
      correctIndex: 1,
      explanation:
        "K extends keyof EventMap constrains K to 'click' | 'keypress'. EventMap[K] then resolves to the correct payload type for each event. In the click handler e is typed as { x: number; y: number }, and in keypress as { key: string } — all inferred without casts.",
    },

    {
      id: "m1-hrd-09",
      code:
        "async function parallel(): Promise<void> {\n" +
        "  const [a, b] = await Promise.all([\n" +
        '    fetch("/api/users"),\n' +
        '    fetch("/api/orders"),\n' +
        "  ]);\n" +
        '  console.log("done");\n' +
        "}\n\n" +
        "async function sequential(): Promise<void> {\n" +
        '  const a = await fetch("/api/users");\n' +
        '  const b = await fetch("/api/orders");\n' +
        '  console.log("done");\n' +
        "}",
      question:
        "If each fetch takes 500ms, what is the execution time difference between parallel() and sequential()?",
      options: [
        "No difference — async/await always runs in parallel",
        "parallel() takes ~500ms; sequential() takes ~1000ms",
        "sequential() takes ~500ms; parallel() takes ~1000ms",
        "Both take ~1000ms because JavaScript is single-threaded",
      ],
      correctIndex: 1,
      explanation:
        "Promise.all fires both fetches simultaneously. Since they run in parallel, total time ≈ max(500ms, 500ms) = 500ms. Sequential awaits each one before starting the next: 500ms + 500ms = 1000ms total.",
    },

    {
      id: "m1-hrd-10",
      code:
        "interface Repo<T> {\n" +
        "  findById(id: number): Promise<T | null>;\n" +
        "  save(entity: T): Promise<T>;\n" +
        "  delete(id: number): Promise<void>;\n" +
        "}\n\n" +
        "class UserRepo implements Repo<User> {\n" +
        "  async findById(id: number): Promise<User | null> { return null; }\n" +
        "  async save(entity: User): Promise<User> { return entity; }\n" +
        "  async delete(id: number): Promise<void> {}\n" +
        "}",
      question:
        "What is the advantage of implementing a generic Repo<T> interface for UserRepo?",
      options: [
        "It allows UserRepo to bypass TypeScript's type checking",
        "It enforces a consistent contract; changing T to another entity type creates a fully typed repo with zero boilerplate changes to method signatures",
        "It automatically generates SQL queries for the methods",
        "It prevents UserRepo from being instantiated directly",
      ],
      correctIndex: 1,
      explanation:
        "The generic interface creates a reusable contract. A new OrderRepo implements Repo<Order> and immediately has correctly typed findById, save, and delete — no method signature duplication. It also enables dependency injection and mocking in tests.",
    },

    {
      id: "m1-hrd-11",
      code:
        "function merge<T extends object, U extends object>(a: T, b: U): T & U {\n" +
        "  return { ...a, ...b };\n" +
        "}\n\n" +
        'const result = merge({ name: "Amit" }, { role: "tester" });\n' +
        "console.log(result.name, result.role);",
      question: "What are the inferred types of result.name and result.role?",
      options: [
        "both are any",
        "name is string, role is string — inferred from arguments",
        "both are unknown until accessed",
        "Compile error: spread of generic types is not supported",
      ],
      correctIndex: 1,
      explanation:
        "The return type T & U is an intersection. TypeScript infers T as { name: string } and U as { role: string }, so the result is { name: string } & { role: string }. Both properties are correctly typed without explicit annotations.",
    },

    {
      id: "m1-hrd-12",
      code:
        "const handlers: Record<string, () => void> = {\n" +
        '  login: () => console.log("login"),\n' +
        '  logout: () => console.log("logout"),\n' +
        "};\n\n" +
        "function dispatch(action: string): void {\n" +
        "  handlers[action]?.();\n" +
        "}\n\n" +
        'dispatch("login");\n' +
        'dispatch("refresh");',
      question:
        "What is printed and why does dispatch('refresh') not throw an error?",
      options: [
        '"login" and a TypeError for refresh',
        '"login" only — optional chaining (?.) silently skips if handlers[action] is undefined',
        '"login" and "undefined"',
        "Compile error: index access on Record may return undefined",
      ],
      correctIndex: 1,
      explanation:
        "handlers['refresh'] is undefined. The optional chaining operator ?. short-circuits the call — undefined?.() returns undefined without throwing. Only 'login' is printed. This is a safe dispatch pattern for event handlers.",
    },

    // ── PLAYWRIGHT — Advanced Locators & Actions (Q13–Q25) ────────────────

    {
      id: "m1-hrd-13",
      code:
        "// The page has two buttons with text 'Submit'\n" +
        "const submitBtn = page.getByRole('button', { name: 'Submit' });\n" +
        "await submitBtn.click();",
      question:
        "This test fails with 'strict mode violation: getByRole resolved to 2 elements'. What is the BEST fix?",
      options: [
        "await submitBtn.first().click()",
        "await page.locator('button').nth(0).click()",
        "Scope the locator to the correct form: page.locator('#checkoutForm').getByRole('button', { name: 'Submit' }).click()",
        "Use page.getByText('Submit').click() instead",
      ],
      correctIndex: 2,
      explanation:
        "Scoping the locator to its parent container (the specific form) is the most robust fix. It preserves the semantic locator strategy while eliminating ambiguity. Using first() or nth(0) is fragile — it assumes DOM order, which can change.",
    },

    {
      id: "m1-hrd-14",
      scenario:
        "A rich text editor renders inside a contenteditable div, not a standard <input>. A developer tries `page.getByLabel('Content').fill('Hello')` and gets an error: 'Element is not an <input>, <textarea> or [contenteditable]'.",
      question: "What actually WORKS for contenteditable elements?",
      options: [
        "page.getByRole('textbox').fill('Hello')",
        "page.locator('[contenteditable]').fill('Hello')",
        "page.locator('[contenteditable]').click(); await page.keyboard.type('Hello')",
        "Both A and B work for contenteditable; C also works but is less idiomatic",
      ],
      correctIndex: 3,
      explanation:
        "Playwright's fill() works on contenteditable elements. getByRole('textbox') also matches contenteditable divs. Typing via keyboard is a valid third approach. All three approaches are functionally valid — D correctly identifies this.",
    },

    {
      id: "m1-hrd-15",
      code: "const locator = page.locator('.item').filter({ has: page.locator('.badge') });",
      question:
        "What does the has option in filter() do differently from hasText?",
      options: [
        "has checks the element's CSS class; hasText checks its text content",
        "has filters to elements that contain a matching child locator; hasText filters by text string",
        "has requires an exact locator match; hasText allows partial matches",
        "They are identical — has and hasText are aliases",
      ],
      correctIndex: 1,
      explanation:
        "filter({ has: locator }) keeps only elements that contain a descendant matching the provided locator — here, .item elements that have a .badge child. hasText filters by text content. has is for structural/child element containment.",
    },

    {
      id: "m1-hrd-16",
      scenario:
        "A test clicks a 'Delete' button that triggers a browser confirm() dialog. The test hangs indefinitely because the dialog blocks page interaction.",
      question: "What is the correct Playwright approach to handle this?",
      options: [
        "await page.waitForTimeout(2000) before clicking",
        "Register page.on('dialog', dialog => dialog.accept()) BEFORE triggering the action that opens the dialog",
        "Use page.evaluate(() => window.confirm = () => true) before clicking",
        "Both B and C are valid approaches",
      ],
      correctIndex: 3,
      explanation:
        "Both approaches work. page.on('dialog', ...) is the idiomatic Playwright way — it handles the dialog event as it fires. Overriding window.confirm via evaluate() also prevents the dialog from appearing. The key is that setup must happen BEFORE the triggering action.",
    },

    {
      id: "m1-hrd-17",
      code:
        "const download = await page.waitForEvent('download', async () => {\n" +
        "  await page.getByRole('button', { name: 'Export CSV' }).click();\n" +
        "});\n" +
        "const path = await download.path();\n" +
        "console.log(path);",
      question:
        "What does waitForEvent('download') do and why must the click be inside the callback?",
      options: [
        "It waits for a network request; the click must be inside to start the request",
        "It sets up a listener for the download event before the click triggers it, preventing a race condition where the download fires before the listener is ready",
        "It prevents the file system from blocking the download",
        "The callback is optional — the click could be placed before waitForEvent",
      ],
      correctIndex: 1,
      explanation:
        "waitForEvent returns a Promise that resolves when the event fires. If the click were placed outside and the download fired immediately, the event could be missed before the listener registers. Placing the trigger inside the callback ensures the listener is active first.",
    },

    {
      id: "m1-hrd-18",
      code:
        "await page.route('**/api/products', async route => {\n" +
        "  await route.fulfill({\n" +
        "    status: 200,\n" +
        "    contentType: 'application/json',\n" +
        "    body: JSON.stringify([{ id: 1, name: 'Mock Product' }]),\n" +
        "  });\n" +
        "});\n" +
        "await page.goto('/products');",
      question: "What does page.route() with route.fulfill() do in this test?",
      options: [
        "Sends a real network request to /api/products with the given body",
        "Intercepts the /api/products network request and responds with mock data instead of hitting the real server",
        "Blocks the /api/products request and logs it",
        "Adds a custom HTTP header to the /api/products request",
      ],
      correctIndex: 1,
      explanation:
        "page.route() intercepts matching network requests. route.fulfill() short-circuits the actual network call and returns a controlled mock response. This isolates UI tests from backend dependencies and enables testing edge cases.",
    },

    {
      id: "m1-hrd-19",
      code:
        "await page.route('**/api/**', route => route.abort());\n" +
        "await page.goto('/dashboard');\n" +
        "await expect(page.locator('.error-banner')).toBeVisible();",
      question: "What scenario is this test designed to verify?",
      options: [
        "That the dashboard loads successfully with all API calls",
        "That the application displays an error banner when all API calls are blocked/fail",
        "That the dashboard works in offline mode",
        "Both B and C are correct interpretations",
      ],
      correctIndex: 3,
      explanation:
        "route.abort() simulates network failure for all /api/** calls. The test verifies the UI handles failed network requests gracefully by showing an error banner. This is equivalent to testing an offline scenario for API-dependent UI.",
    },

    {
      id: "m1-hrd-20",
      code:
        "const locatorA = page.locator('#form').locator('input');\n" +
        "const locatorB = page.locator('#form input');",
      question:
        "Are locatorA and locatorB equivalent? What is the difference in behavior?",
      options: [
        "They are different: locatorA uses strict mode; locatorB does not",
        "They are functionally equivalent — both find input elements that are descendants of #form",
        "locatorA only matches direct children; locatorB matches all descendants",
        "locatorB is a CSS selector and is faster; locatorA uses DOM traversal",
      ],
      correctIndex: 1,
      explanation:
        "Chaining .locator() creates a scoped locator — it searches within the parent. page.locator('#form input') uses a combined CSS selector for the same effect. Both find all input descendants of #form. They are functionally equivalent.",
    },

    {
      id: "m1-hrd-21",
      scenario:
        "A test verifies a 'Load More' pagination feature. Clicking the button appends 10 more items each time. The test needs to click until all 50 items are loaded and then assert the count.",
      question: "What is the CORRECT Playwright pattern?",
      options: [
        "Click the button 5 times with a fixed loop and then assert",
        "while (await page.locator('.item').count() < 50) { await page.getByRole('button', { name: 'Load More' }).click(); await page.locator('.item').nth(await page.locator('.item').count() - 1).waitFor(); }",
        "Use a while loop: check if 'Load More' is visible, click it, wait for new items to appear, repeat until the button disappears or count reaches 50",
        "Both A and C work; B is overly complex",
      ],
      correctIndex: 2,
      explanation:
        "A dynamic while loop that checks button visibility and waits for new items to stabilize is the most robust approach. A fixed loop (A) assumes exactly 5 clicks are needed, which is brittle. Option C properly adapts to the actual page behavior.",
    },

    {
      id: "m1-hrd-22",
      code:
        "await page.locator('#dropdown').selectOption({ label: 'United Kingdom' });\n\n" +
        "// vs\n\n" +
        "await page.locator('#dropdown').selectOption({ value: 'GB' });",
      question: "When would using label vs value matter in selectOption()?",
      options: [
        "They are always interchangeable — label and value are the same thing",
        "label matches the visible text shown to users; value matches the underlying <option value> attribute — use value when the display text may be localized",
        "value is only for numeric dropdowns; label is for text dropdowns",
        "selectOption({ label }) is deprecated in favor of { value }",
      ],
      correctIndex: 1,
      explanation:
        "The <option> element has a value attribute (e.g., 'GB') and a visible label (e.g., 'United Kingdom'). If the app is internationalized, the label might change to a local language while the value remains stable. Using value is more robust for multi-locale testing.",
    },

    {
      id: "m1-hrd-23",
      code:
        "test('drag and drop', async ({ page }) => {\n" +
        "  const source = page.locator('#card-1');\n" +
        "  const target = page.locator('#column-done');\n" +
        "  await source.dragTo(target);\n" +
        "  await expect(target.locator('#card-1')).toBeVisible();\n" +
        "});",
      question:
        "A developer reports this test is flaky on CI. What is the most likely cause and fix?",
      options: [
        "dragTo() is not supported in Playwright — use mouse.move() instead",
        "The card may have a drop animation; add { force: true } to dragTo()",
        "CI rendering may be slower — the target element may not be ready. Use target.waitFor() and consider { sourcePosition } and { targetPosition } options in dragTo() for precision",
        "dragTo() only works in headed mode; CI runs headless",
      ],
      correctIndex: 2,
      explanation:
        "CI environments often run slower. dragTo() may time out or miss the drop zone if the element isn't fully rendered. Explicitly waiting for the target and using position coordinates for precision drag landing points improves CI stability.",
    },

    {
      id: "m1-hrd-24",
      code:
        "const response = await page.waitForResponse(\n" +
        "  resp => resp.url().includes('/api/search') && resp.status() === 200\n" +
        ");\n" +
        "const body = await response.json();\n" +
        "console.log(body.results.length);",
      question: "What does this snippet enable in a Playwright test?",
      options: [
        "It mocks the /api/search endpoint",
        "It waits for a specific network response matching the predicate, then parses the real response body",
        "It blocks the search request until a condition is met",
        "It retries the search request if the status is not 200",
      ],
      correctIndex: 1,
      explanation:
        "waitForResponse() resolves when a network response matches the predicate (URL + status). The test then reads the actual JSON response body. This is useful for asserting API payload content alongside UI state — a powerful integration check.",
    },

    {
      id: "m1-hrd-25",
      scenario:
        "A Playwright test uses page.locator('text=Submit'). The page has two buttons: one with label 'Submit Form' and one with label 'Submit Order'. Only the 'Submit Order' button should be clicked.",
      question:
        "What is the risk of using text=Submit and what is the BEST fix?",
      options: [
        "No risk — text= is an exact match selector",
        "text= is a partial/substring match, so it may match both buttons. Use getByRole('button', { name: 'Submit Order' }) for an exact accessible name match",
        "text= is case-sensitive, so only one button will match",
        "The fix is to use page.locator('button:has-text(\"Submit Order\")')",
      ],
      correctIndex: 1,
      explanation:
        "text=Submit matches any element whose text CONTAINS 'Submit', matching both buttons. getByRole with an exact name is the safest fix. page.locator(':text-is(\"Submit Order\")')' also works for exact text matching but getByRole is more semantic.",
    },

    // ── PLAYWRIGHT — Advanced Assertions & Synchronization (Q26–Q35) ──────

    {
      id: "m1-hrd-26",
      code:
        "await expect(async () => {\n" +
        "  const count = await page.locator('.notification').count();\n" +
        "  expect(count).toBeGreaterThan(0);\n" +
        "}).toPass({ timeout: 10000 });",
      question:
        "What does expect().toPass() achieve that a regular assertion does not?",
      options: [
        "It suppresses assertion errors entirely",
        "It retries the entire async callback until all expectations inside pass or the timeout expires — useful for non-Playwright expect calls inside",
        "It marks the test as expected-to-fail",
        "It converts hard assertions inside to soft assertions",
      ],
      correctIndex: 1,
      explanation:
        "toPass() retries the entire provided function until it completes without throwing, or the timeout expires. This is useful when you need to use non-Playwright assertions (like Jest's expect) with retry semantics, or chain multiple assertions that all need to pass together.",
    },

    {
      id: "m1-hrd-27",
      code:
        "// Test 1 — fails\n" +
        "await expect(page.locator('.price')).toHaveText('$10.00');\n\n" +
        "// Test 2 — passes\n" +
        "await expect(page.locator('.price')).toContainText('10');",
      question:
        "The element's actual text is '  $10.00  ' (with whitespace). Why does Test 1 fail?",
      options: [
        "toHaveText() requires a regex for currency symbols",
        "toHaveText() does an exact full match — surrounding whitespace in the DOM causes a mismatch",
        "toHaveText() is case-sensitive and fails on uppercase letters",
        "toHaveText() and toContainText() behave identically",
      ],
      correctIndex: 1,
      explanation:
        "toHaveText() normalizes whitespace between words but by default compares the full text. If the DOM element has leading/trailing spaces that don't normalize away, the match fails. Use toContainText(), a regex, or add a custom normalizer. toContainText() is a substring match and passes regardless.",
    },

    {
      id: "m1-hrd-28",
      code: "await expect(page.locator('#status')).toHaveText('Complete', { timeout: 60000 });",
      question:
        "When would setting a 60-second timeout on a single assertion be appropriate?",
      options: [
        "Never — Playwright's default 5s is always sufficient",
        "When the page has a known long-running async operation (e.g., file processing, report generation) that legitimately takes up to a minute",
        "Only when running tests on slow CI machines",
        "When the assertion contains a regex pattern",
      ],
      correctIndex: 1,
      explanation:
        "Per-assertion timeouts override the global default for specific steps that are expected to take longer. If a background job runs for up to 60 seconds before the status updates, a targeted high timeout avoids false failures while keeping other assertions fast.",
    },

    {
      id: "m1-hrd-29",
      scenario:
        "A developer writes a test that checks a table's row count using `expect(await page.locator('tr').count()).toBe(10)`. The test is flaky on CI when rows load slowly.",
      question: "Why is this pattern flaky, and what is the fix?",
      options: [
        "count() is unreliable — use length instead",
        "Awaiting count() and passing the number to expect() loses auto-retry. Use `await expect(page.locator('tr')).toHaveCount(10)` which retries automatically",
        "The tr selector is too broad — scope it to tbody first",
        "toBe() does not support numeric comparisons in Playwright",
      ],
      correctIndex: 1,
      explanation:
        "expect(await locator.count()).toBe(n) is an assertion on an already-resolved number — no retry. If rows haven't loaded yet, count() returns 0 and the assertion fails immediately. expect(locator).toHaveCount(n) is a web-first assertion that retries until the count matches.",
    },

    {
      id: "m1-hrd-30",
      code:
        "test('check all field errors', async ({ page }) => {\n" +
        "  await page.goto('/register');\n" +
        "  await page.getByRole('button', { name: 'Register' }).click();\n\n" +
        "  await expect.soft(page.locator('#name-error')).toHaveText('Name is required');\n" +
        "  await expect.soft(page.locator('#email-error')).toHaveText('Email is required');\n" +
        "  await expect.soft(page.locator('#phone-error')).toHaveText('Phone is required');\n\n" +
        "  expect(test.info().errors).toHaveLength(0);\n" +
        "});",
      question:
        "What does the final line `expect(test.info().errors).toHaveLength(0)` check?",
      options: [
        "It verifies that no JavaScript console errors occurred on the page",
        "It fails the test explicitly if any of the preceding soft assertions collected errors, serving as a hard gate after the soft checks",
        "It checks that the API returned no errors",
        "This line is always redundant because soft assertions auto-fail the test",
      ],
      correctIndex: 1,
      explanation:
        "test.info().errors accumulates all soft assertion failures. The final hard assertion explicitly fails the test if any soft assertion failed. While Playwright marks soft-assertion tests as failed automatically, this pattern lets you control where and how the failure is reported.",
    },

    {
      id: "m1-hrd-31",
      code:
        "await page.locator('#submit').click();\n" +
        "await page.waitForLoadState('networkidle');\n" +
        "await expect(page.locator('.success')).toBeVisible();",
      question:
        "In what scenario would waitForLoadState('networkidle') cause this test to time out even when the form submission succeeds?",
      options: [
        "When the form uses POST instead of GET",
        "When the page has background polling (e.g., WebSocket pings or periodic fetch calls) that prevent the network from ever going idle",
        "When the .success element appears immediately",
        "When the browser is Chrome instead of Firefox",
      ],
      correctIndex: 1,
      explanation:
        "'networkidle' waits until no network activity occurs for 500ms. SPAs with long-polling, WebSockets, or background API calls constantly generate network activity, so 'networkidle' never triggers. Use 'domcontentloaded', wait for the specific element, or switch to waitForResponse() instead.",
    },

    {
      id: "m1-hrd-32",
      code:
        "test('verify analytics event', async ({ page }) => {\n" +
        "  const [response] = await Promise.all([\n" +
        "    page.waitForResponse('**/analytics/event'),\n" +
        "    page.getByRole('button', { name: 'Buy Now' }).click(),\n" +
        "  ]);\n" +
        "  expect(response.status()).toBe(200);\n" +
        "});",
      question:
        "What could go wrong if you placed waitForResponse AFTER the click (not inside Promise.all)?",
      options: [
        "Nothing — waitForResponse always waits for future events",
        "The analytics request might resolve before waitForResponse starts listening, causing the test to hang indefinitely",
        "Playwright would retry the click automatically",
        "The response would be null because it was already consumed",
      ],
      correctIndex: 1,
      explanation:
        "If the analytics event fires synchronously or very quickly after the click, the response could arrive before waitForResponse() is called, and the listener would never see it. Promise.all ensures the listener is registered first, then the click triggers the event.",
    },

    {
      id: "m1-hrd-33",
      code:
        "await expect(page.locator('.spinner')).toBeHidden();\n" +
        "await expect(page.locator('.data-table')).toBeVisible();\n" +
        "await expect(page.locator('.data-table tr')).toHaveCount(25);",
      question:
        "What is the idiomatic Playwright rationale for this specific assertion ORDER?",
      options: [
        "The order does not matter — all three assertions are independent",
        "It checks loading state first (spinner gone), then structural presence (table visible), then data completeness (row count) — following the natural render sequence for reliable assertions",
        "Playwright executes the three assertions in parallel, so order is irrelevant",
        "toBeHidden() must always come before toBeVisible()",
      ],
      correctIndex: 1,
      explanation:
        "Asserting in render sequence is a best practice: confirm loading has finished (spinner hidden), confirm the container is present, then verify the data is fully loaded (row count). This creates a natural dependency chain that makes failures easier to diagnose.",
    },

    {
      id: "m1-hrd-34",
      scenario:
        "A Playwright test uses `await page.locator('.modal').waitFor({ state: 'detached' })` after clicking a 'Close' button. A junior developer asks why not just use `toBeHidden()`.",
      question:
        "When is waitFor({ state: 'detached' }) more appropriate than toBeHidden()?",
      options: [
        "They are identical — use either one interchangeably",
        "toBeHidden() passes if the element is hidden (e.g., display:none) but still in the DOM. detached waits for the element to be fully removed from the DOM, which is needed when subsequent actions depend on the element being gone",
        "detached is only for use with iframes",
        "toBeHidden() has a shorter default timeout than waitFor",
      ],
      correctIndex: 1,
      explanation:
        "toBeHidden() passes for invisible elements that are still present in the DOM. If subsequent code tries to interact with the same selector and gets unexpected results from hidden-but-present elements, waiting for detached ensures complete removal. Use detached when DOM absence (not just invisibility) is required.",
    },

    {
      id: "m1-hrd-35",
      code:
        "await expect(page).toHaveURL(/\\/profile\\/\\d+/);\n" +
        "await expect(page.getByRole('heading')).toHaveText(/Welcome, .+/);",
      question: "What do these two regex-based assertions verify?",
      options: [
        "Exact URL and exact heading text",
        "That the URL matches /profile/ followed by one or more digits (a user ID), and the heading starts with 'Welcome, ' followed by any non-empty string",
        "Both assertions use anchored regex — full string must match",
        "Playwright does not support regex in page-level assertions",
      ],
      correctIndex: 1,
      explanation:
        "/\\/profile\\/\\d+/ matches URLs like /profile/42 or /profile/12345. /.+/ matches any characters after 'Welcome, ', e.g., 'Welcome, Meena'. Regex assertions are unanchored by default — they match if the pattern appears anywhere in the string.",
    },

    // ── PLAYWRIGHT — Advanced POM Patterns (Q36–Q44) ──────────────────────

    {
      id: "m1-hrd-36",
      code:
        "export class BasePage {\n" +
        "  constructor(protected page: Page) {}\n\n" +
        "  async waitForPageLoad(): Promise<void> {\n" +
        "    await this.page.waitForLoadState('domcontentloaded');\n" +
        "  }\n\n" +
        "  async getPageTitle(): Promise<string> {\n" +
        "    return this.page.title();\n" +
        "  }\n" +
        "}\n\n" +
        "export class LoginPage extends BasePage {\n" +
        "  readonly emailInput = this.page.getByLabel('Email');\n" +
        "  async login(email: string, password: string): Promise<void> { /* ... */ }\n" +
        "}",
      question:
        "What does using `protected` for the page property in BasePage enable?",
      options: [
        "Prevents subclasses from accessing the page object",
        "Allows subclasses like LoginPage to access this.page directly without re-injecting it through the constructor",
        "Makes the page property readonly in all subclasses",
        "Exposes the page property as a public API for test files",
      ],
      correctIndex: 1,
      explanation:
        "protected members are accessible in the class and its subclasses but not from outside. LoginPage inherits this.page from BasePage and uses it to define locators and methods — without needing to redeclare a page parameter in its own constructor.",
    },

    {
      id: "m1-hrd-37",
      scenario:
        "A team uses POM and has a CheckoutPage with 15 methods. A code review notes that several methods are 30+ lines long, mixing navigation, form filling, and assertions.",
      question:
        "What refactoring principle applies and what is the recommended action?",
      options: [
        "Single Responsibility Principle — extract assertion logic into a separate CheckoutAssertions class; keep navigation and form actions in CheckoutPage",
        "DRY principle — combine all methods into one large execute() method",
        "POM prohibits assertions entirely — move all assertions to test files",
        "Long methods are acceptable in POM as long as they are in page classes",
      ],
      correctIndex: 0,
      explanation:
        "SRP says a class should have one reason to change. Mixing actions and assertions couples UI interaction logic with verification logic. Separating them into an actions class and an assertions/component class (or keeping assertions in test files) makes each piece independently maintainable.",
    },

    {
      id: "m1-hrd-38",
      code:
        "// fixtures.ts\n" +
        "export const test = base.extend<{\n" +
        "  loginPage: LoginPage;\n" +
        "  dashboardPage: DashboardPage;\n" +
        "  authenticatedUser: void;\n" +
        "}>({\n" +
        "  loginPage: async ({ page }, use) => {\n" +
        "    await use(new LoginPage(page));\n" +
        "  },\n" +
        "  dashboardPage: async ({ page }, use) => {\n" +
        "    await use(new DashboardPage(page));\n" +
        "  },\n" +
        "  authenticatedUser: async ({ loginPage }, use) => {\n" +
        "    await loginPage.goto();\n" +
        "    await loginPage.login('admin', 'pass');\n" +
        "    await use();\n" +
        "  },\n" +
        "});",
      question:
        "What does the authenticatedUser fixture demonstrate about fixture dependencies?",
      options: [
        "Fixtures cannot depend on other fixtures",
        "A fixture can declare another fixture (loginPage) as a parameter — Playwright resolves the dependency chain automatically",
        "authenticatedUser must be declared before loginPage in the extend() call",
        "Using void as a fixture type causes a compile error",
      ],
      correctIndex: 1,
      explanation:
        "Playwright fixtures support dependency injection. authenticatedUser declares loginPage as a parameter — Playwright instantiates loginPage first, then passes it to authenticatedUser. Tests that declare authenticatedUser automatically get a logged-in session without writing a single line of auth code.",
    },

    {
      id: "m1-hrd-39",
      code:
        "export class SearchPage {\n" +
        "  constructor(private page: Page) {}\n\n" +
        "  async search(term: string): Promise<ResultsPage> {\n" +
        "    await this.page.getByRole('searchbox').fill(term);\n" +
        "    await this.page.keyboard.press('Enter');\n" +
        "    return new ResultsPage(this.page);\n" +
        "  }\n" +
        "}",
      question:
        "What design pattern does this return value implement and what is its benefit?",
      options: [
        "Factory pattern — creates new page objects on demand",
        "Fluent/Page Transition pattern — search() returns the next page object, making tests read as a chain of user actions",
        "Strategy pattern — delegates the result page selection to the caller",
        "Observer pattern — notifies the test of page changes",
      ],
      correctIndex: 1,
      explanation:
        "Returning the next page object from an action method is the Page Transition / Fluent pattern. The test can write: `const results = await searchPage.search('laptop'); await results.assertHasItems();` — readable, chainable, and type-safe.",
    },

    {
      id: "m1-hrd-40",
      scenario:
        "A POM has 8 page classes and tests run in parallel using Playwright's worker model. A developer uses a module-level variable to store login state shared between page classes.",
      question: "Why is this a problem with parallel execution?",
      options: [
        "Module-level variables are not accessible in TypeScript",
        "Each parallel worker runs in an isolated Node.js context — module-level variables are not shared between workers and can cause stale or race conditions within the same worker if tests share the variable",
        "Playwright does not support module-level imports",
        "Parallel tests automatically reset all variables",
      ],
      correctIndex: 1,
      explanation:
        "Playwright workers are isolated processes. Module-level shared state within one worker can cause one test's state to leak into another test running in the same worker. The correct approach is to scope state to fixtures (which are per-test) or to browser contexts.",
    },

    {
      id: "m1-hrd-41",
      code:
        "export class TableComponent {\n" +
        "  constructor(private root: Locator) {}\n\n" +
        "  row(index: number): Locator {\n" +
        "    return this.root.locator('tr').nth(index);\n" +
        "  }\n\n" +
        "  cell(rowIndex: number, colIndex: number): Locator {\n" +
        "    return this.row(rowIndex).locator('td').nth(colIndex);\n" +
        "  }\n" +
        "}",
      question:
        "What pattern does this represent and why is it better than putting table locators directly in a page class?",
      options: [
        "Decorator pattern — it adds extra methods to the root Locator",
        "Component Object Model — encapsulates a reusable UI component (the table) with its own API, keeping the page class focused on page-level concerns",
        "Factory pattern — creates Locator instances from configuration",
        "It is not better — page classes should contain all locators",
      ],
      correctIndex: 1,
      explanation:
        "Component Object Model (COM) extends POM by creating component classes for reusable UI pieces (tables, modals, navigation bars). TableComponent can be reused across multiple page classes wherever a similar table appears, and table-specific logic is centralized.",
    },

    {
      id: "m1-hrd-42",
      code:
        "// test.spec.ts\n" +
        "test('purchase flow', async ({ page }) => {\n" +
        "  const search = new SearchPage(page);\n" +
        "  const product = new ProductPage(page);\n" +
        "  const cart = new CartPage(page);\n\n" +
        "  await search.goto();\n" +
        "  await search.search('laptop');\n" +
        "  await product.selectFirst();\n" +
        "  await cart.checkout();\n" +
        "});",
      question:
        "A senior engineer says this test still has too much orchestration. What improvement is recommended?",
      options: [
        "Remove all page objects and write raw Playwright code",
        "Use fixtures to inject pre-navigated page objects; use returned page transitions (search returns ProductPage) to remove manual page object creation in the test body",
        "Merge all page classes into one FlowPage class",
        "Add more assertions between each step",
      ],
      correctIndex: 1,
      explanation:
        "The test manually instantiates page objects and manages page transitions. Better: fixtures provide ready-to-use page objects; methods like search.search() return a ProductPage, eliminating the need to manually create it. The test body should read as a business flow, not as a constructor registry.",
    },

    {
      id: "m1-hrd-43",
      scenario:
        "A Playwright test for a modal uses a page object. The modal can appear on multiple pages (product page, cart page, checkout page). The modal has its own locators and methods.",
      question: "What is the MOST maintainable design?",
      options: [
        "Duplicate modal locators in each page class that uses it",
        "Create a ModalComponent class that receives a Locator (the modal root) in its constructor, and compose it into each page class that might show the modal",
        "Create a base class for all three pages that contains the modal methods",
        "Put all modal methods in a global helper file",
      ],
      correctIndex: 1,
      explanation:
        "A ModalComponent class composed into each page (not inherited) is the cleanest approach. Inheritance from a base class adds unnecessary coupling for unrelated pages. A composable component that accepts its root locator is reusable and independent of page hierarchy.",
    },

    {
      id: "m1-hrd-44",
      code:
        "// ProductPage.ts\n" +
        "get addToCartButton(): Locator {\n" +
        "  return this.page.getByRole('button', { name: 'Add to Cart' });\n" +
        "}\n\n" +
        "// vs\n\n" +
        "readonly addToCartButton = this.page.getByRole('button', { name: 'Add to Cart' });",
      question:
        "What is the practical difference between a getter and a readonly field for a locator?",
      options: [
        "Getters are re-evaluated each time they are accessed; readonly fields are evaluated once at construction",
        "readonly fields are faster; getters introduce memory leaks",
        "There is no practical difference — Playwright locators are lazy regardless",
        "Getters work only in abstract classes",
      ],
      correctIndex: 2,
      explanation:
        "Playwright Locators are lazy descriptors — they don't query the DOM until an action or assertion is called on them. Whether defined as a getter or a readonly field, the actual DOM query happens at the same time. Both are valid patterns; the choice is stylistic.",
    },

    // ── PLAYWRIGHT — Advanced Hooks, Fixtures & Config (Q45–Q52) ──────────

    {
      id: "m1-hrd-45",
      code:
        "// playwright.config.ts\n" +
        "export default defineConfig({\n" +
        "  globalSetup: require.resolve('./global-setup'),\n" +
        "  globalTeardown: require.resolve('./global-teardown'),\n" +
        "  use: {\n" +
        "    storageState: 'playwright/.auth/user.json',\n" +
        "  },\n" +
        "});",
      question:
        "What is the execution order of globalSetup, storageState, and individual test beforeEach hooks?",
      options: [
        "beforeEach → globalSetup → storageState loaded",
        "globalSetup → storageState loaded into each new context → beforeEach for each test",
        "storageState → globalSetup → beforeEach",
        "globalSetup and storageState run in parallel; beforeEach is sequential",
      ],
      correctIndex: 1,
      explanation:
        "globalSetup runs once before any tests (typically to create auth.json). storageState is applied when each test's browser context is created. beforeEach then runs before each individual test within that authenticated context. This is the standard auth-reuse pattern.",
    },

    {
      id: "m1-hrd-46",
      code:
        "export const test = base.extend<{ apiClient: APIClient }>({\n" +
        "  apiClient: async ({}, use) => {\n" +
        "    const client = new APIClient(process.env.API_BASE_URL!);\n" +
        "    await client.authenticate();\n" +
        "    await use(client);\n" +
        "    await client.cleanup();\n" +
        "  },\n" +
        "});",
      question:
        "What happens if a test using apiClient throws an error during execution?",
      options: [
        "The cleanup() after use() is skipped because the test threw",
        "Playwright guarantees that code after await use() runs even if the test fails — it is the fixture teardown",
        "cleanup() runs only if the test passes",
        "The fixture is reused for the next test without cleanup",
      ],
      correctIndex: 1,
      explanation:
        "Playwright fixtures guarantee that teardown code (after await use()) always runs, regardless of whether the test passed or threw. This is equivalent to a finally block and ensures resources like API sessions are always cleaned up.",
    },

    {
      id: "m1-hrd-47",
      code:
        "// playwright.config.ts\n" +
        "projects: [\n" +
        "  {\n" +
        "    name: 'setup',\n" +
        "    testMatch: /global\\.setup\\.ts/,\n" +
        "  },\n" +
        "  {\n" +
        "    name: 'chromium',\n" +
        "    use: { storageState: 'playwright/.auth/user.json' },\n" +
        "    dependencies: ['setup'],\n" +
        "  },\n" +
        "]",
      question: "What does the dependencies: ['setup'] field ensure?",
      options: [
        "The chromium project imports code from the setup project",
        "The setup project must finish successfully before the chromium project's tests start — ensuring auth state is ready",
        "The chromium tests run in the same process as the setup tests",
        "It sets up a parent-child relationship for test reporting only",
      ],
      correctIndex: 1,
      explanation:
        "Project dependencies define execution order in Playwright's multi-project setup. The setup project runs the auth script and creates user.json. The chromium project depends on it — Playwright will not start chromium tests until setup completes successfully.",
    },

    {
      id: "m1-hrd-48",
      code:
        "test.describe.configure({ mode: 'serial' });\n\n" +
        "test.describe('Checkout flow', () => {\n" +
        "  test('step 1: add to cart', async ({ page }) => { /* ... */ });\n" +
        "  test('step 2: enter address', async ({ page }) => { /* ... */ });\n" +
        "  test('step 3: confirm order', async ({ page }) => { /* ... */ });\n" +
        "});",
      question: "What does mode: 'serial' mean and when is it appropriate?",
      options: [
        "Tests run in alphabetical order instead of file order",
        "Tests in the describe block run sequentially in the same worker, sharing state — appropriate only for truly sequential user flows where each step depends on the previous",
        "Tests run one-at-a-time globally across all workers",
        "Serial mode enables step-by-step debugging automatically",
      ],
      correctIndex: 1,
      explanation:
        "serial mode runs describe block tests in the same worker sequentially, allowing state to persist (same browser context). It's appropriate for multi-step flows where independence is not possible. However, it reduces parallelism and test isolation — prefer independent tests when possible.",
    },

    {
      id: "m1-hrd-49",
      code:
        "test.use({\n" +
        "  locale: 'de-DE',\n" +
        "  timezoneId: 'Europe/Berlin',\n" +
        "});\n\n" +
        "test('date formatting in German', async ({ page }) => {\n" +
        "  await page.goto('/dashboard');\n" +
        "  await expect(page.locator('.date')).toHaveText(/\\d{1,2}\\.\\d{1,2}\\.\\d{4}/);\n" +
        "});",
      question:
        "What does test.use({ locale, timezoneId }) configure and why is it important for this test?",
      options: [
        "It installs the German language pack in the OS",
        "It sets the browser's locale and timezone, affecting date/number formatting on the page — critical for testing locale-sensitive display logic",
        "It changes the test runner's output language to German",
        "locale only affects network request Accept-Language headers",
      ],
      correctIndex: 1,
      explanation:
        "Setting locale to 'de-DE' makes the browser report German locale, affecting how the JavaScript Intl API (and many frameworks) format dates, numbers, and currencies. The regex matches German date format (d.m.yyyy). Without this, the date would render in the test machine's locale, making the assertion fragile.",
    },

    {
      id: "m1-hrd-50",
      code: "// playwright.config.ts\n" + "retries: process.env.CI ? 2 : 0,",
      question:
        "What is the implication of enabling retries ONLY on CI and not locally?",
      options: [
        "No implication — retries are always a good safety net",
        "Flaky tests may hide locally but appear to pass on CI due to retries — masking underlying reliability issues. Retries should supplement stable tests, not compensate for flaky ones",
        "This is the recommended Playwright configuration for all projects",
        "Retries on CI cause tests to always be marked as 'flaky' in reports",
      ],
      correctIndex: 1,
      explanation:
        "Retries help CI results appear clean but can mask genuine flakiness. If a test consistently needs retries to pass, the root cause (timing, selector, data) should be fixed. Retries are a safety net for environmental flakiness, not a substitute for stable tests. The config is a known trade-off.",
    },

    {
      id: "m1-hrd-51",
      scenario:
        "A Playwright test needs to run cleanup API calls after every test in a specific describe block, but only if the test FAILED. Using afterEach runs regardless of test result.",
      question: "How can the cleanup be made conditional on test failure?",
      options: [
        "Use afterAll instead of afterEach",
        "In afterEach, check testInfo.status — run cleanup only if testInfo.status === 'failed'",
        "Playwright does not support conditional teardown",
        "Use a try/catch inside the test itself",
      ],
      correctIndex: 1,
      explanation:
        "testInfo is available as a parameter in afterEach: `test.afterEach(async ({}, testInfo) => { if (testInfo.status === 'failed') { await cleanup(); } })`. This enables conditional teardown based on the actual test outcome.",
    },

    {
      id: "m1-hrd-52",
      code:
        "const test = base.extend<{ loggedInAs: string }>({\n" +
        "  loggedInAs: ['guest', { option: true }],\n" +
        "});",
      question: "What does { option: true } indicate about this fixture?",
      options: [
        "The fixture is optional and can be omitted by tests",
        "loggedInAs is a configurable option — tests or test.use() can override its default value ('guest') to change behavior without rewriting the fixture",
        "The fixture runs only in debug mode",
        "option: true makes the fixture value readonly",
      ],
      correctIndex: 1,
      explanation:
        "Fixtures marked with { option: true } are configuration fixtures — they define an overridable default. Tests can call `test.use({ loggedInAs: 'admin' })` to change the value, allowing the same fixture to support multiple roles without duplication.",
    },

    // ── PLAYWRIGHT — Complex Scenarios & Debugging (Q53–Q60) ──────────────

    {
      id: "m1-hrd-53",
      scenario:
        "A test suite has 200 tests. On CI it regularly shows 3–5 different tests failing with different errors on different runs. Locally all tests pass consistently.",
      question: "What is the MOST LIKELY root cause and first diagnostic step?",
      options: [
        "The test code has bugs that only appear in specific browsers",
        "Tests have shared mutable state or implicit ordering dependencies — run with --repeat-each=3 and check if the same tests fail repeatedly, or shuffle order with --shuffle",
        "CI has a slower CPU, causing all async operations to time out",
        "Playwright's headless mode behaves differently from headed mode",
      ],
      correctIndex: 1,
      explanation:
        "Random failures of different tests on each CI run is the classic sign of test pollution — tests sharing state (cookies, localStorage, database data, global variables) or having implicit order dependencies. --repeat-each and --shuffle help isolate the pattern before fixing the root cause.",
    },

    {
      id: "m1-hrd-54",
      code:
        "// Test fails with: 'Target closed'\n" +
        "test('check popup', async ({ page, context }) => {\n" +
        "  const [popup] = await Promise.all([\n" +
        "    context.waitForEvent('page'),\n" +
        "    page.getByRole('button', { name: 'Open Help' }).click(),\n" +
        "  ]);\n" +
        "  await popup.waitForLoadState();\n" +
        "  await expect(popup.getByRole('heading')).toHaveText('Help Center');\n" +
        "  // popup is auto-closed by the app after 3 seconds\n" +
        "});",
      question:
        "Why does this test fail with 'Target closed' and what is the fix?",
      options: [
        "context.waitForEvent is the wrong API for popups",
        "The app closes the popup before the assertion completes. Add `await popup.bringToFront()` to keep it open",
        "Assert faster — the heading assertion must complete before the popup auto-closes in 3 seconds. If it takes longer, increase speed or assert earlier after waitForLoadState",
        "Close and reopen the popup to reset the 3-second timer",
      ],
      correctIndex: 2,
      explanation:
        "'Target closed' means the page/popup was closed before the test finished interacting with it. The fix is to ensure assertions complete within the 3-second window. waitForLoadState() adds latency — consider removing it and asserting the heading with a reasonable timeout, or mock the auto-close timer.",
    },

    {
      id: "m1-hrd-55",
      code:
        "await page.route('**/api/user/profile', async (route) => {\n" +
        "  const response = await route.fetch();\n" +
        "  const body = await response.json();\n" +
        "  body.role = 'superadmin';\n" +
        "  await route.fulfill({ response, body: JSON.stringify(body) });\n" +
        "});",
      question: "What does this route handler do that simple fulfill() cannot?",
      options: [
        "It blocks the request entirely",
        "It makes the real network request, modifies specific fields in the actual response body, and returns the modified response — passthrough interception",
        "It caches the response for future requests",
        "It adds an authentication header to the original request",
      ],
      correctIndex: 1,
      explanation:
        "route.fetch() forwards the request to the actual server and returns the real response. The handler then mutates only the role field and fulfills with the modified body. This 'passthrough modification' is ideal for testing permission edge cases without fully mocking all response data.",
    },

    {
      id: "m1-hrd-56",
      scenario:
        "A Playwright test for a file upload feature writes: `await page.locator('input[type=file]').setInputFiles('test-data/sample.pdf')`. The test runs fine in headed mode but fails in headless CI with 'file not found'.",
      question: "What is the MOST LIKELY cause and fix?",
      options: [
        "setInputFiles() does not work in headless mode",
        "The file path is relative to the working directory where the test runner is invoked. On CI, the working directory may differ. Use path.join(__dirname, 'test-data/sample.pdf') for an absolute path relative to the test file",
        "PDF files are not supported by setInputFiles() on Linux CI",
        "The input element must be visible in headed mode for setInputFiles() to work",
      ],
      correctIndex: 1,
      explanation:
        "Relative paths are resolved from the process working directory (cwd), which can differ between local and CI environments. __dirname gives the directory of the current test file, making the path robust regardless of where the test runner is invoked from.",
    },

    {
      id: "m1-hrd-57",
      code:
        "test('accessibility check', async ({ page }) => {\n" +
        "  await page.goto('/home');\n" +
        "  const results = await new AxeBuilder({ page }).analyze();\n" +
        "  expect(results.violations).toHaveLength(0);\n" +
        "});",
      question: "What does this test verify and what library is being used?",
      options: [
        "Visual regression testing using Playwright's built-in snapshot tool",
        "Accessibility compliance using the @axe-core/playwright library — it scans the page for WCAG violations",
        "Performance testing using Lighthouse via Playwright",
        "Network request auditing for broken links",
      ],
      correctIndex: 1,
      explanation:
        "AxeBuilder from @axe-core/playwright runs the axe-core accessibility engine against the current page. analyze() returns violations — elements failing WCAG/ARIA rules. Asserting violations.length === 0 ensures no accessibility regressions. This is common in professional test suites.",
    },

    {
      id: "m1-hrd-58",
      code:
        "test('measure page load', async ({ page }) => {\n" +
        "  await page.goto('/dashboard');\n" +
        "  const timing = await page.evaluate(() =>\n" +
        "    JSON.parse(JSON.stringify(window.performance.timing))\n" +
        "  );\n" +
        "  const loadTime = timing.loadEventEnd - timing.navigationStart;\n" +
        "  expect(loadTime).toBeLessThan(3000);\n" +
        "});",
      question:
        "What is a limitation of using window.performance.timing for measuring page load in Playwright?",
      options: [
        "performance.timing is only available in Chrome",
        "performance.timing is deprecated (Navigation Timing Level 1). It does not capture modern metrics like LCP or FCP. Use performance.getEntriesByType('navigation') or browser CDP for more accurate modern metrics",
        "page.evaluate() cannot access window.performance",
        "The timing values are in microseconds, not milliseconds",
      ],
      correctIndex: 1,
      explanation:
        "window.performance.timing is the legacy Navigation Timing Level 1 API — deprecated in favor of PerformanceNavigationTiming (Level 2). For modern metrics (CWV: LCP, FID, CLS), use performance.getEntriesByType() or integrate tools like Lighthouse or CDP tracing.",
    },

    {
      id: "m1-hrd-59",
      scenario:
        "A Playwright test passes when run alone (`npx playwright test login.spec.ts`) but fails when the full suite runs (`npx playwright test`). The error is 'Expected: logged in, Received: logged out'.",
      question: "What is the MOST LIKELY root cause?",
      options: [
        "Playwright cannot run more than one spec file at a time",
        "Another test in the suite is modifying shared authentication state (e.g., the same auth.json or browser context) that login.spec.ts depends on",
        "login.spec.ts has a bug that only appears in certain run orders",
        "The full suite runs in a different browser than single-file runs",
      ],
      correctIndex: 1,
      explanation:
        "This is a classic test pollution scenario. A test in another spec file is logging out, clearing cookies, or overwriting auth.json before login.spec.ts runs. Solution: ensure each test/worker has its own isolated context and auth state, or identify and fix the test that mutates shared state.",
    },

    {
      id: "m1-hrd-60",
      code:
        "// playwright.config.ts\n" +
        "fullyParallel: true,\n" +
        "workers: process.env.CI ? 4 : undefined,\n\n" +
        "// In a test:\n" +
        "test.describe.configure({ mode: 'serial' });\n\n" +
        "test.describe('Critical purchase flow', () => {\n" +
        "  test('add item', async ({ page }) => { /* ... */ });\n" +
        "  test('checkout', async ({ page }) => { /* ... */ });\n" +
        "  test('confirm', async ({ page }) => { /* ... */ });\n" +
        "});",
      question:
        "With fullyParallel: true and workers: 4 on CI, how does the serial describe block interact with parallelism?",
      options: [
        "The serial block disables parallelism for the entire test suite",
        "The serial block's tests run sequentially in one worker, while other non-serial tests from the suite run in parallel on the remaining workers",
        "serial and fullyParallel cannot be combined — it causes a config error",
        "All 4 workers execute the serial block simultaneously",
      ],
      correctIndex: 1,
      explanation:
        "fullyParallel enables each test to run in its own worker. A serial describe block overrides this locally — its tests share one worker and run in order. Other tests in the suite still run in parallel across available workers. The two settings compose cleanly.",
    },
  ],
};
