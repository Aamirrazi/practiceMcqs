/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║   Playwright M1 — Medium Difficulty   (60 Questions)        ║
 * ║   Capgemini Excellencer Training Batch                       ║
 * ║   Topics: TypeScript + Playwright (as per TOC)               ║
 * ╚══════════════════════════════════════════════════════════════╝
 */
const PlaywrightM1Medium = {
  meta: {
    id: "playwright-m1-medium",
    testTitle: "Playwright M1 — Medium",
    topic: "M1 Style Mock Test",
    topicLabel: "Playwright + TypeScript",
    difficulty: "Intermediate",
    questionCount: 60,
    estimatedMinutes: 75,
    description:
      "Scenario and code-based questions covering TypeScript fundamentals, Playwright locators, assertions, POM, hooks, fixtures, and browser automation — aligned to the Capgemini M1 syllabus.",
    icon: "🎭",
  },

  questions: [
    // ── TYPESCRIPT — Types, Inference, Functions (Q1–Q10) ──────────────────

    {
      id: "m1-med-01",
      code:
        "function getLength(value: string | string[]): number {\n" +
        "  return value.length;\n" +
        "}\n" +
        'console.log(getLength("hello"));\n' +
        'console.log(getLength(["a", "b", "c"]));',
      question:
        "What values are printed by the two console.log calls respectively?",
      options: [
        "5 and 3",
        "5 and undefined",
        "Error: length does not exist on type union",
        "undefined and 3",
      ],
      correctIndex: 0,
      explanation:
        "Both string and string[] have a .length property, so TypeScript allows this union without a type guard. 'hello'.length is 5 and ['a','b','c'].length is 3.",
    },

    {
      id: "m1-med-02",
      code:
        "const multiply = (a: number, b: number = 2): number => a * b;\n" +
        "console.log(multiply(5));\n" +
        "console.log(multiply(5, 3));",
      question: "What is the output of the two console.log statements?",
      options: ["10 and 15", "5 and 15", "NaN and 15", "10 and 10"],
      correctIndex: 0,
      explanation:
        "b has a default value of 2. multiply(5) uses the default, giving 5*2=10. multiply(5,3) overrides it, giving 5*3=15.",
    },

    {
      id: "m1-med-03",
      code:
        "interface Vehicle {\n" +
        "  brand: string;\n" +
        "  speed?: number;\n" +
        "}\n" +
        "interface ElectricVehicle extends Vehicle {\n" +
        "  batteryRange: number;\n" +
        "}\n" +
        'const ev: ElectricVehicle = { brand: "Tesla", batteryRange: 400 };',
      question: "Which statement about this code is CORRECT?",
      options: [
        "Compile error: speed is required in Vehicle",
        "Compile error: ElectricVehicle must re-declare brand",
        "Valid — speed is optional, so the object satisfies both interfaces",
        "Runtime error: ElectricVehicle cannot extend Vehicle",
      ],
      correctIndex: 2,
      explanation:
        "speed is marked optional with '?', so it can be omitted. ElectricVehicle inherits brand (required) and speed (optional) from Vehicle, plus its own batteryRange. The object satisfies all constraints.",
    },

    {
      id: "m1-med-04",
      code:
        "class BankAccount {\n" +
        "  private balance: number = 0;\n" +
        "  deposit(amount: number): void {\n" +
        "    this.balance += amount;\n" +
        "  }\n" +
        "  getBalance(): number {\n" +
        "    return this.balance;\n" +
        "  }\n" +
        "}\n" +
        "const acc = new BankAccount();\n" +
        "acc.deposit(500);\n" +
        "console.log(acc.balance);",
      question: "What happens when this code is compiled?",
      options: [
        "Prints 500",
        "Compile error: Property 'balance' is private and only accessible within class 'BankAccount'",
        "Prints 0",
        "Runtime error: balance is not defined",
      ],
      correctIndex: 1,
      explanation:
        "balance is marked private, meaning it can only be accessed inside the BankAccount class. Accessing acc.balance from outside the class causes a TypeScript compile-time error.",
    },

    {
      id: "m1-med-05",
      code:
        "async function fetchUser(id: number): Promise<string> {\n" +
        '  if (id <= 0) throw new Error("Invalid ID");\n' +
        "  return `User_${id}`;\n" +
        "}\n\n" +
        "async function main() {\n" +
        "  try {\n" +
        "    const name = await fetchUser(0);\n" +
        "    console.log(name);\n" +
        "  } catch (e: any) {\n" +
        '    console.log("Caught:", e.message);\n' +
        "  }\n" +
        "}",
      question: "What does main() print when called?",
      options: [
        "User_0",
        "Caught: Invalid ID",
        "undefined",
        "UnhandledPromiseRejection",
      ],
      correctIndex: 1,
      explanation:
        "fetchUser(0) throws because id <= 0. The await causes the rejection to propagate, and the try/catch block catches it, printing 'Caught: Invalid ID'.",
    },

    {
      id: "m1-med-06",
      code:
        "const user = {\n" +
        '  name: "Ravi",\n' +
        "  address: {\n" +
        '    city: "Mumbai"\n' +
        "  }\n" +
        "};\n\n" +
        'const city = user?.address?.city ?? "Unknown";\n' +
        "console.log(city);",
      question: "What is printed?",
      options: ["undefined", "null", "Mumbai", "Unknown"],
      correctIndex: 2,
      explanation:
        "Optional chaining (?.) safely navigates the nested object. Since address and city both exist, city evaluates to 'Mumbai'. The nullish coalescing operator (??) only falls back to 'Unknown' if the result is null or undefined.",
    },

    {
      id: "m1-med-07",
      code:
        "interface Shape {\n" +
        "  readonly sides: number;\n" +
        "  color: string;\n" +
        "}\n" +
        'const square: Shape = { sides: 4, color: "red" };\n' +
        'square.color = "blue";\n' +
        "square.sides = 5;",
      question: "Which line causes a TypeScript compile error?",
      options: [
        "square.color = 'blue'",
        "square.sides = 5",
        "Both lines cause errors",
        "Neither line causes an error",
      ],
      correctIndex: 1,
      explanation:
        "readonly applies only to sides. color has no such modifier, so it can be reassigned freely. Attempting to assign to square.sides after initialization produces a compile error.",
    },

    {
      id: "m1-med-08",
      code:
        "function identity<T>(value: T): T {\n" +
        "  return value;\n" +
        "}\n" +
        'const result1 = identity<string>("hello");\n' +
        "const result2 = identity(42);",
      question: "What are the inferred types of result1 and result2?",
      options: [
        "any and any",
        "string and number",
        "string and any",
        "T and T",
      ],
      correctIndex: 1,
      explanation:
        "identity is a generic function. result1 is explicitly typed as string. result2 uses type inference — TypeScript infers T as number from the argument 42.",
    },

    {
      id: "m1-med-09",
      code:
        "class Animal {\n" +
        "  constructor(protected name: string) {}\n" +
        "  speak(): string { return `${this.name} makes a sound`; }\n" +
        "}\n" +
        "class Dog extends Animal {\n" +
        "  speak(): string { return `${this.name} barks`; }\n" +
        "}\n" +
        'const d: Animal = new Dog("Rex");\n' +
        "console.log(d.speak());",
      question: "What is the output?",
      options: [
        "Rex makes a sound",
        "Rex barks",
        "Compile error: Dog does not implement Animal",
        "undefined barks",
      ],
      correctIndex: 1,
      explanation:
        "Dog overrides speak(). Even though d is typed as Animal, it holds a Dog instance at runtime — TypeScript uses polymorphism, so d.speak() calls Dog's implementation. protected allows name to be accessed in subclasses.",
    },

    {
      id: "m1-med-10",
      code:
        'import { add } from "./mathUtils";\n\n' +
        "// mathUtils.ts\n" +
        "export function add(a: number, b: number): number {\n" +
        "  return a + b;\n" +
        "}\n" +
        "export default function subtract(a: number, b: number): number {\n" +
        "  return a - b;\n" +
        "}",
      question:
        "A teammate writes `import subtract from './mathUtils'`. Which import style does this use and what does it import?",
      options: [
        "Named import — imports the subtract function",
        "Default import — imports the subtract function",
        "Named import — imports the add function",
        "Default import — imports the add function",
      ],
      correctIndex: 1,
      explanation:
        "import subtract from './mathUtils' is a default import. The file exports subtract as its default export, so this correctly imports the subtract function.",
    },

    // ── TYPESCRIPT — Interfaces, Classes, Async (Q11–Q15) ──────────────────

    {
      id: "m1-med-11",
      code:
        'type Status = "active" | "inactive" | "pending";\n\n' +
        "function getLabel(s: Status): string {\n" +
        "  switch (s) {\n" +
        '    case "active": return "✅ Active";\n' +
        '    case "inactive": return "❌ Inactive";\n' +
        '    default: return "⏳ Pending";\n' +
        "  }\n" +
        "}\n" +
        'console.log(getLabel("pending"));',
      question: "What is the output?",
      options: ["✅ Active", "❌ Inactive", "⏳ Pending", "undefined"],
      correctIndex: 2,
      explanation:
        "'pending' does not match 'active' or 'inactive', so it falls to the default case, returning '⏳ Pending'.",
    },

    {
      id: "m1-med-12",
      code:
        "const p1 = new Promise<number>((resolve) => {\n" +
        "  setTimeout(() => resolve(10), 100);\n" +
        "});\n" +
        "const p2 = new Promise<number>((resolve) => {\n" +
        "  setTimeout(() => resolve(20), 50);\n" +
        "});\n\n" +
        "Promise.all([p1, p2]).then(([a, b]) => console.log(a + b));",
      question: "What is printed after both promises resolve?",
      options: ["10", "20", "30", "undefined"],
      correctIndex: 2,
      explanation:
        "Promise.all waits for all promises and resolves with an array of results in the original order [10, 20]. Destructured as a and b, a+b = 30.",
    },

    {
      id: "m1-med-13",
      scenario:
        "A TypeScript class `LoginPage` has a method `login(username: string, password: string): Promise<void>`. A teammate calls it as `loginPage.login('admin')` without a second argument.",
      question: "What happens at compile time?",
      options: [
        "No error — password defaults to undefined at runtime",
        "Compile error: Expected 2 arguments, but got 1",
        "Runtime error: Cannot read property of undefined",
        "TypeScript infers the missing argument as an empty string",
      ],
      correctIndex: 1,
      explanation:
        "password is a required parameter (no default, no ? modifier). TypeScript enforces the argument count at compile time and raises an error for the missing argument.",
    },

    {
      id: "m1-med-14",
      code:
        "class Counter {\n" +
        "  private static count: number = 0;\n" +
        "  increment(): void { Counter.count++; }\n" +
        "  static getCount(): number { return Counter.count; }\n" +
        "}\n" +
        "const c1 = new Counter();\n" +
        "const c2 = new Counter();\n" +
        "c1.increment();\n" +
        "c2.increment();\n" +
        "console.log(Counter.getCount());",
      question: "What is printed?",
      options: [
        "0",
        "1",
        "2",
        "Compile error: static member accessed on instance",
      ],
      correctIndex: 2,
      explanation:
        "count is a static property shared across all instances. Both c1 and c2 increment the same Counter.count. The final value is 2.",
    },

    {
      id: "m1-med-15",
      code:
        "async function loadItems(): Promise<string[]> {\n" +
        '  return ["apple", "banana", "cherry"];\n' +
        "}\n\n" +
        "async function run() {\n" +
        "  const items = await loadItems();\n" +
        "  items.forEach(item => console.log(item.toUpperCase()));\n" +
        "}",
      question: "What is printed when run() is called?",
      options: [
        "apple banana cherry",
        "APPLE BANANA CHERRY (each on its own line)",
        "['APPLE', 'BANANA', 'CHERRY']",
        "Compile error: toUpperCase is not in string[]",
      ],
      correctIndex: 1,
      explanation:
        "loadItems resolves with a string array. forEach iterates each item and calls toUpperCase(). console.log prints each result on a separate line: APPLE, BANANA, CHERRY.",
    },

    // ── PLAYWRIGHT — Locators & Basic Actions (Q16–Q28) ────────────────────

    {
      id: "m1-med-16",
      code:
        "await page.goto('https://example.com/login');\n" +
        "await page.getByLabel('Email').fill('test@mail.com');\n" +
        "await page.getByLabel('Password').fill('secret123');\n" +
        "await page.getByRole('button', { name: 'Sign In' }).click();",
      question:
        "Which locator strategy is being used to find the Sign In button?",
      options: [
        "CSS selector",
        "XPath",
        "ARIA role with accessible name",
        "Text content match",
      ],
      correctIndex: 2,
      explanation:
        "getByRole('button', { name: 'Sign In' }) uses ARIA role-based locating. It finds a button element whose accessible name matches 'Sign In' — the most resilient built-in Playwright locator.",
    },

    {
      id: "m1-med-17",
      scenario:
        "A Playwright test needs to select an option from a <select> dropdown with id 'country'. The developer writes: `await page.locator('#country').click()`. The test passes locally but is flaky in CI.",
      question:
        "What is the correct Playwright approach for selecting a dropdown option?",
      options: [
        "await page.locator('#country').fill('India')",
        "await page.locator('#country').selectOption('India')",
        "await page.locator('#country').check('India')",
        "await page.locator('#country').type('India')",
      ],
      correctIndex: 1,
      explanation:
        "selectOption() is the correct Playwright API for <select> elements. It accepts a value, label, or index. Using click() on a native select and then clicking an option is fragile; selectOption() handles it reliably.",
    },

    {
      id: "m1-med-18",
      code:
        "const rows = page.locator('table tbody tr');\n" +
        "console.log(await rows.count());\n" +
        "const secondRow = rows.nth(1);",
      question: "What does rows.nth(1) return?",
      options: [
        "The first row (index 0 = first)",
        "The second row (index 1 = second)",
        "A count of rows equal to 1",
        "The last row in the table",
      ],
      correctIndex: 1,
      explanation:
        "nth() uses zero-based indexing. nth(0) is the first row, nth(1) is the second row. This is a common off-by-one mistake to watch for.",
    },

    {
      id: "m1-med-19",
      scenario:
        "A developer needs to click a 'Submit' button only after hovering over a tooltip that reveals it. They write the actions in sequence but the button is not found.",
      question: "What is the CORRECT sequence of Playwright actions?",
      options: [
        "click() → hover()",
        "hover() → waitForSelector() → click()",
        "hover() → click() without any wait",
        "waitForTimeout(2000) → hover() → click()",
      ],
      correctIndex: 1,
      explanation:
        "hover() triggers the UI state that reveals the button. waitForSelector() (or Playwright's built-in auto-wait via the locator) ensures the button is in the DOM before click(). Relying on a fixed timeout is fragile.",
    },

    {
      id: "m1-med-20",
      code:
        "await page.goto('https://app.com/dashboard');\n" +
        "const link = page.getByRole('link', { name: /report/i });\n" +
        "await link.click();",
      question: "What does the regex /report/i do in this locator?",
      options: [
        "Matches the exact string 'report' case-sensitively",
        "Matches any link containing 'report' regardless of case",
        "Matches only links with the id 'report'",
        "Causes a compile error — getByRole only accepts strings",
      ],
      correctIndex: 1,
      explanation:
        "Playwright's getByRole (and other get-by methods) accept a string or RegExp. /report/i is a case-insensitive regex that matches any accessible name containing 'report' in any case — e.g., 'Monthly Report', 'REPORT'.",
    },

    {
      id: "m1-med-21",
      scenario:
        "A test checks a 'Remember Me' checkbox before submitting a form. The developer uses `await page.locator('#rememberMe').click()`. A senior engineer suggests using `check()` instead.",
      question:
        "What is the advantage of using check() over click() for checkboxes?",
      options: [
        "check() is faster than click()",
        "check() ensures the checkbox is checked regardless of its current state; click() only toggles",
        "check() bypasses auto-waiting",
        "click() does not work on checkbox elements",
      ],
      correctIndex: 1,
      explanation:
        "check() makes the action idempotent — it only checks if currently unchecked, preventing accidental unchecking on a retry. click() blindly toggles the state, which can cause flakiness if the test runs after a previous state change.",
    },

    {
      id: "m1-med-22",
      code:
        "const items = page.locator('.product-card');\n" +
        "const sale = items.filter({ hasText: 'SALE' });\n" +
        "console.log(await sale.count());",
      question: "What does the filter() method do here?",
      options: [
        "Finds all .product-card elements that contain the text 'SALE'",
        "Removes all .product-card elements with 'SALE' from the DOM",
        "Returns only the first .product-card matching 'SALE'",
        "Throws an error — filter() is not a Playwright Locator method",
      ],
      correctIndex: 0,
      explanation:
        "Locator.filter({ hasText }) narrows down the matched elements to only those that contain the specified text. The count() then returns how many sale items are on the page.",
    },

    {
      id: "m1-med-23",
      scenario:
        "A page has a navigation menu that expands only after clicking a hamburger icon. The test must click a menu item inside the expanded nav. The test is written as: click(hamburger) → click(menuItem). It passes 60% of the time.",
      question: "What is the MOST LIKELY cause of the flakiness?",
      options: [
        "getByRole is not suitable for menu items",
        "The menu animation has not completed before the menu item click is attempted",
        "Playwright does not support multi-step navigation",
        "The hamburger icon uses CSS, which Playwright cannot locate",
      ],
      correctIndex: 1,
      explanation:
        "After clicking the hamburger, the menu may have a CSS transition or animation. If Playwright attempts to click the menu item before it is fully visible/interactive, the click fails or hits the wrong element. Using locator.waitFor({ state: 'visible' }) on the menu item before clicking fixes this.",
    },

    {
      id: "m1-med-24",
      code:
        "await page.keyboard.press('Control+A');\n" +
        "await page.keyboard.press('Control+C');\n" +
        "await page.locator('#target').click();\n" +
        "await page.keyboard.press('Control+V');",
      question: "What does this sequence of keyboard actions simulate?",
      options: [
        "Selects all text, copies it, focuses a field, then pastes",
        "Cuts all text, navigates to target, then undoes",
        "Selects all, deletes, focuses field, types 'V'",
        "Opens a context menu and selects Paste",
      ],
      correctIndex: 0,
      explanation:
        "Control+A selects all, Control+C copies to clipboard, the click focuses the target element, and Control+V pastes the clipboard content. This pattern is used to copy content from one field to another.",
    },

    {
      id: "m1-med-25",
      code: "await page.goto('https://shop.com', { waitUntil: 'networkidle' });",
      question: "What does the waitUntil: 'networkidle' option mean?",
      options: [
        "Waits until the page HTML is downloaded",
        "Waits until no network requests have been made for at least 500ms",
        "Waits until the DOM content is loaded",
        "Waits until all images are rendered on screen",
      ],
      correctIndex: 1,
      explanation:
        "'networkidle' waits until there are no ongoing network requests for at least 500ms. It is useful for SPAs with lazy-loaded data but can be slow. 'domcontentloaded' and 'load' are faster alternatives for many cases.",
    },

    {
      id: "m1-med-26",
      code:
        "const frame = page.frameLocator('#chatIframe');\n" +
        "await frame.getByPlaceholder('Type a message').fill('Hello');",
      question: "What is frameLocator() used for in Playwright?",
      options: [
        "To navigate to a different browser tab",
        "To interact with elements inside an <iframe> embedded in the page",
        "To create a new browser context",
        "To locate frames in a video element",
      ],
      correctIndex: 1,
      explanation:
        "frameLocator() creates a locator scoped to a specific <iframe>. Actions chained after it operate within that frame's DOM, allowing interaction with embedded content like chat widgets, payment iframes, etc.",
    },

    {
      id: "m1-med-27",
      scenario:
        "A test needs to verify that a specific row in a data table contains both the text 'John Doe' and 'Active' status in the same row. The developer locates all rows with getByRole('row').",
      question:
        "What is the BEST Playwright approach to find this specific row?",
      options: [
        "page.locator('tr').nth(0)",
        "page.getByRole('row').filter({ hasText: 'John Doe' }).filter({ hasText: 'Active' })",
        "page.getByText('John Doe Active')",
        "page.locator('td:has-text(\"John Doe\")').locator('td:has-text(\"Active\")')",
      ],
      correctIndex: 1,
      explanation:
        "Chaining filter() calls narrows the locator progressively. The first filter selects rows containing 'John Doe', the second further narrows to those also containing 'Active', giving a precise match for a multi-cell row.",
    },

    {
      id: "m1-med-28",
      code:
        "await page.locator('input[name=\"search\"]').fill('laptop');\n" +
        "await page.locator('input[name=\"search\"]').press('Enter');\n" +
        "await expect(page).toHaveURL(/search\\?q=laptop/);",
      question:
        "What does page.locator('input[name=\"search\"]') use to find the element?",
      options: [
        "ARIA role selector",
        "Text content selector",
        "CSS attribute selector",
        "XPath expression",
      ],
      correctIndex: 2,
      explanation:
        "input[name=\"search\"] is a CSS attribute selector that matches an <input> element whose name attribute equals 'search'. It is a valid CSS selector supported natively by Playwright's locator().",
    },

    // ── PLAYWRIGHT — Assertions & Synchronization (Q29–Q38) ────────────────

    {
      id: "m1-med-29",
      code:
        "await expect(page.getByText('Welcome, Admin')).toBeVisible();\n" +
        "await expect(page.locator('#spinner')).not.toBeVisible();",
      question: "What do these two assertions verify?",
      options: [
        "That the element exists in the DOM and is absent from the DOM",
        "That 'Welcome, Admin' is displayed and #spinner is hidden or absent",
        "Both check for element existence only",
        "toBeVisible() also verifies that the text is correct",
      ],
      correctIndex: 1,
      explanation:
        "toBeVisible() asserts an element is rendered and visible to the user. not.toBeVisible() passes if the element is hidden (display:none, visibility:hidden) or not present in the DOM. Together they confirm a successful login state and loading completion.",
    },

    {
      id: "m1-med-30",
      scenario:
        "A developer runs a test suite and one test fails at: `await expect(page.locator('.result')).toHaveText('42')`. The element contains ' 42 ' (with whitespace). The test is not passing.",
      question: "What is the BEST fix?",
      options: [
        "Use toContainText('42') instead of toHaveText('42')",
        "Use toHaveText(/42/)",
        "Trim the element text in the locator",
        "Both A and B are valid fixes",
      ],
      correctIndex: 3,
      explanation:
        "toHaveText() does a full match and is sensitive to surrounding whitespace by default. toContainText('42') checks for substring containment. Using the regex /42/ also matches regardless of surrounding whitespace. Both are valid approaches.",
    },

    {
      id: "m1-med-31",
      code:
        "test('cart badge updates', async ({ page }) => {\n" +
        "  await page.goto('/shop');\n" +
        "  await page.getByRole('button', { name: 'Add to Cart' }).first().click();\n" +
        "  await expect(page.locator('.cart-count')).toHaveText('1');\n" +
        "});",
      question:
        "If the cart count updates asynchronously after the click, does this test handle it correctly?",
      options: [
        "No — a manual waitForTimeout must be added before the assertion",
        "Yes — Playwright's expect automatically retries the assertion until it passes or times out",
        "No — the assertion needs await page.waitForSelector('.cart-count') first",
        "Yes — toHaveText checks the DOM in real-time with no retry",
      ],
      correctIndex: 1,
      explanation:
        "Playwright's web-first assertions (those using expect(locator)) automatically retry until the condition is met or the assertion timeout expires (default 5s). No manual wait is needed for async DOM updates.",
    },

    {
      id: "m1-med-32",
      code:
        "test('form validation', async ({ page }) => {\n" +
        "  await page.goto('/register');\n" +
        "  await page.getByRole('button', { name: 'Submit' }).click();\n" +
        "  \n" +
        "  const errors = page.locator('.error-message');\n" +
        "  await expect(errors).toHaveCount(3);\n" +
        "});",
      question: "What does toHaveCount(3) assert?",
      options: [
        "The locator returns exactly 3 DOM nodes matching .error-message",
        "The page has exactly 3 form fields",
        "The error message text contains the number 3",
        "There are at most 3 error messages",
      ],
      correctIndex: 0,
      explanation:
        "toHaveCount(n) asserts that the locator matches exactly n elements in the DOM. Here it confirms that submitting an empty form triggers exactly 3 validation error messages.",
    },

    {
      id: "m1-med-33",
      scenario:
        "A Playwright test needs to verify that a button is disabled after a form is submitted. The developer uses `expect(button).toBeDisabled()` but the test fails intermittently because the page takes 1–2 seconds to process.",
      question: "How does Playwright handle this automatically?",
      options: [
        "It does not — a waitForTimeout(2000) must be inserted",
        "expect() assertions retry automatically within the default assertion timeout",
        "toBeDisabled() requires an explicit timeout parameter",
        "The developer must use waitForSelector with state:'disabled'",
      ],
      correctIndex: 1,
      explanation:
        "Playwright's web-first assertions retry until the expectation is met or the timeout (default 5000ms) is reached. For slower processing, the timeout can be increased globally in playwright.config.ts or per-assertion via { timeout: 10000 }.",
    },

    {
      id: "m1-med-34",
      code:
        "test('soft assertion demo', async ({ page }) => {\n" +
        "  await page.goto('/profile');\n" +
        "  await expect.soft(page.locator('#name')).toHaveText('Alice');\n" +
        "  await expect.soft(page.locator('#email')).toHaveText('alice@test.com');\n" +
        "  await page.getByRole('button', { name: 'Save' }).click();\n" +
        "});",
      question:
        "What is the key difference between expect.soft() and expect() here?",
      options: [
        "expect.soft() skips the assertion entirely",
        "expect.soft() failures are recorded but do not stop test execution; hard expect() halts the test",
        "expect.soft() has a shorter timeout than expect()",
        "expect.soft() works only with locator assertions, not page assertions",
      ],
      correctIndex: 1,
      explanation:
        "Soft assertions collect failures without stopping the test. The Save button click still executes even if the name or email assertions fail. The overall test is marked as failed at the end, but all assertions are evaluated.",
    },

    {
      id: "m1-med-35",
      code:
        "await expect(page).toHaveURL('https://app.com/dashboard');\n" +
        "await expect(page).toHaveTitle('Dashboard | MyApp');",
      question: "What do these two page-level assertions verify?",
      options: [
        "The HTTP response status and the page h1 tag",
        "The current browser URL and the document <title> element",
        "The URL path and the first heading on the page",
        "The full page content and the browser tab label",
      ],
      correctIndex: 1,
      explanation:
        "toHaveURL() checks the current browser URL against the expected value (string or regex). toHaveTitle() checks the document's <title> element. Both support auto-retry until the page state matches.",
    },

    {
      id: "m1-med-36",
      code:
        "const btn = page.getByRole('button', { name: 'Delete' });\n" +
        "await expect(btn).toHaveAttribute('data-confirm', 'true');",
      question: "What does toHaveAttribute() verify here?",
      options: [
        "That the button has a CSS class named 'data-confirm'",
        "That the button element has the attribute data-confirm with value 'true'",
        "That the button's text includes 'true'",
        "That a data-confirm event listener is attached to the button",
      ],
      correctIndex: 1,
      explanation:
        "toHaveAttribute(name, value) asserts that the element has the specified HTML attribute with the specified value. This is commonly used to verify state stored as data attributes (e.g., data-confirm, aria-expanded).",
    },

    {
      id: "m1-med-37",
      scenario:
        "A test navigates to a results page where data loads asynchronously. The test immediately asserts the count of results. It fails with 'Expected: 10, Received: 0'.",
      question: "What is the BEST Playwright fix?",
      options: [
        "Add await page.waitForTimeout(3000) before the assertion",
        "Use await expect(page.locator('.result-item')).toHaveCount(10), which retries automatically",
        "Use page.reload() and then assert",
        "Add a manual loop checking count every 500ms",
      ],
      correctIndex: 1,
      explanation:
        "Web-first assertions like toHaveCount() retry until the condition is met. This is the idiomatic Playwright way to handle async data loading — no manual waits or loops needed. Hard-coded timeouts are fragile.",
    },

    {
      id: "m1-med-38",
      code:
        "await page.locator('#toggle').click();\n" +
        "await expect(page.locator('#menu')).toBeVisible();\n" +
        "await page.locator('#toggle').click();\n" +
        "await expect(page.locator('#menu')).toBeHidden();",
      question: "What scenario does this test verify?",
      options: [
        "The menu opens on first click and stays open on second click",
        "The toggle opens the menu and a second click hides it",
        "The menu element is removed from the DOM after two clicks",
        "The toggle button becomes hidden after clicking twice",
      ],
      correctIndex: 1,
      explanation:
        "The test verifies a toggle behavior: first click makes #menu visible, second click hides it. toBeHidden() passes if the element is display:none, visibility:hidden, or outside the viewport — even if still in the DOM.",
    },

    // ── PLAYWRIGHT — Page Object Model (Q39–Q46) ──────────────────────────

    {
      id: "m1-med-39",
      code:
        "// pages/LoginPage.ts\n" +
        "import { Page } from '@playwright/test';\n\n" +
        "export class LoginPage {\n" +
        "  constructor(private page: Page) {}\n\n" +
        "  async goto() {\n" +
        "    await this.page.goto('/login');\n" +
        "  }\n\n" +
        "  async login(user: string, pass: string) {\n" +
        "    await this.page.getByLabel('Username').fill(user);\n" +
        "    await this.page.getByLabel('Password').fill(pass);\n" +
        "    await this.page.getByRole('button', { name: 'Login' }).click();\n" +
        "  }\n" +
        "}",
      question:
        "What is the PRIMARY benefit of using a Page Object class like LoginPage?",
      options: [
        "Reduces test execution time by parallelizing steps",
        "Encapsulates page interactions so tests stay readable and selector changes are fixed in one place",
        "Prevents Playwright from throwing auto-wait errors",
        "Allows running tests without a browser",
      ],
      correctIndex: 1,
      explanation:
        "POM centralizes selectors and actions in one class. If the login button's accessible name changes, only LoginPage needs updating — not every test that uses it. This improves maintainability and readability.",
    },

    {
      id: "m1-med-40",
      scenario:
        "A team has LoginPage, DashboardPage, and ProfilePage classes. A developer adds a `logout()` method directly inside each page class even though the logout button appears in a shared navigation bar on all pages.",
      question: "What is the BETTER design approach?",
      options: [
        "Keep logout() in each page class for clarity",
        "Create a NavigationComponent or BasePage class with logout(), and have all pages extend or compose it",
        "Create a standalone test helper function outside all page classes",
        "Use beforeEach to call logout() before every test",
      ],
      correctIndex: 1,
      explanation:
        "Shared UI components (like a navigation bar) should be modeled as a reusable component class or base page. Having each page class duplicate the logout logic violates DRY and makes maintenance harder.",
    },

    {
      id: "m1-med-41",
      code:
        "export class ProductPage {\n" +
        "  readonly addToCartBtn = this.page.getByRole('button', { name: 'Add to Cart' });\n" +
        "  readonly priceLabel = this.page.locator('.price');\n\n" +
        "  constructor(private page: Page) {}\n\n" +
        "  async addToCart() {\n" +
        "    await this.addToCartBtn.click();\n" +
        "  }\n" +
        "}",
      question:
        "Why are addToCartBtn and priceLabel declared as readonly class fields rather than created inside each method?",
      options: [
        "readonly makes the locators execute faster",
        "Defining locators as class fields avoids redeclaring them in every method and prevents accidental reassignment",
        "Playwright requires locators to be readonly to enable auto-waiting",
        "This pattern prevents the locators from being garbage collected",
      ],
      correctIndex: 1,
      explanation:
        "Declaring locators as readonly class fields is a POM best practice. It centralizes selector definitions, prevents accidental reassignment, and makes them reusable across multiple methods in the page class.",
    },

    {
      id: "m1-med-42",
      scenario:
        "A test file imports LoginPage and uses it like this: `const loginPage = new LoginPage(page); await loginPage.goto(); await loginPage.login('user', 'pass');`. The test then needs to assert the dashboard heading.",
      question:
        "What should LoginPage.login() ideally return to support chaining to dashboard assertions?",
      options: [
        "void — tests should create a new DashboardPage instance themselves",
        "A new DashboardPage instance so the test can chain dashboard assertions",
        "A boolean indicating whether login was successful",
        "The page URL after login",
      ],
      correctIndex: 1,
      explanation:
        "Returning a new DashboardPage(this.page) from login() enables a fluent API: `const dashboard = await loginPage.login(...)`. This pattern makes tests read like user stories and avoids the test manually managing page transitions.",
    },

    {
      id: "m1-med-43",
      code:
        "// test.spec.ts\n" +
        "import { LoginPage } from '../pages/LoginPage';\n" +
        "import { DashboardPage } from '../pages/DashboardPage';\n\n" +
        "test('user sees dashboard', async ({ page }) => {\n" +
        "  const login = new LoginPage(page);\n" +
        "  await login.goto();\n" +
        "  await login.login('admin', 'admin123');\n" +
        "  const dashboard = new DashboardPage(page);\n" +
        "  await expect(dashboard.heading).toBeVisible();\n" +
        "});",
      question:
        "What is the correct way to expose the heading locator in DashboardPage for this assertion?",
      options: [
        "readonly heading = this.page.getByRole('heading', { name: 'Dashboard' });",
        "heading = await this.page.getByRole('heading').textContent();",
        "heading() { return document.querySelector('h1'); }",
        "static heading = 'h1.dashboard-title';",
      ],
      correctIndex: 0,
      explanation:
        "Locators should be exposed as readonly properties returning a Locator object (not a resolved value). The locator is evaluated lazily when the assertion runs, supporting auto-waiting.",
    },

    {
      id: "m1-med-44",
      scenario:
        "A POM test suite has 20 test files. A selector used across 15 page classes breaks because the dev team changed a CSS class from `.btn-primary` to `.btn-main`.",
      question: "What does this situation demonstrate about POM?",
      options: [
        "POM makes selector changes harder because they are spread across more files",
        "POM reduces the blast radius — only the affected page class(es) need updating, not 15 test files",
        "POM would have prevented the CSS class change from affecting tests",
        "This shows POM is only useful for small projects",
      ],
      correctIndex: 1,
      explanation:
        "This is the core value of POM. If each test file had inline selectors, all 15 files would need updating. With POM, the selector is defined once in its page class — only that one class needs changing, regardless of how many tests use it.",
    },

    {
      id: "m1-med-45",
      code:
        "export class CartPage {\n" +
        "  constructor(private page: Page) {}\n\n" +
        "  async getItemCount(): Promise<number> {\n" +
        "    const text = await this.page.locator('.cart-count').innerText();\n" +
        "    return parseInt(text, 10);\n" +
        "  }\n" +
        "}",
      question: "What does this method do and what does it return?",
      options: [
        "Returns a Locator pointing to .cart-count",
        "Returns the count element's full HTML",
        "Reads the text content of .cart-count, parses it as an integer, and returns the number",
        "Returns a Promise<string> of the cart count",
      ],
      correctIndex: 2,
      explanation:
        "innerText() resolves the visible text content asynchronously. parseInt converts the string to a number. The method returns a Promise<number> — useful for conditional logic in tests (e.g., if cart count > 0).",
    },

    {
      id: "m1-med-46",
      scenario:
        "Two page classes — CheckoutPage and OrderConfirmationPage — share a 'Continue Shopping' button. A junior developer copies the locator into both classes.",
      question: "What refactoring approach best addresses this duplication?",
      options: [
        "Create a shared utility file exporting the locator string",
        "Create a BasePage class with the shared locator and have both classes extend it",
        "Keep the duplication — it makes each class self-contained",
        "Use a global variable for the locator",
      ],
      correctIndex: 1,
      explanation:
        "A BasePage class that defines shared locators and actions (like navigation links, headers, footers) and is extended by specific page classes is the standard POM pattern for sharing common UI elements.",
    },

    // ── PLAYWRIGHT — Hooks, Fixtures & Config (Q47–Q53) ───────────────────

    {
      id: "m1-med-47",
      code:
        "import { test, expect } from '@playwright/test';\n\n" +
        "test.describe('Cart tests', () => {\n" +
        "  test.beforeEach(async ({ page }) => {\n" +
        "    await page.goto('/shop');\n" +
        "    await page.getByRole('button', { name: 'Add to Cart' }).first().click();\n" +
        "  });\n\n" +
        "  test('cart count is 1', async ({ page }) => {\n" +
        "    await expect(page.locator('.cart-count')).toHaveText('1');\n" +
        "  });\n\n" +
        "  test('checkout button is visible', async ({ page }) => {\n" +
        "    await expect(page.getByRole('button', { name: 'Checkout' })).toBeVisible();\n" +
        "  });\n" +
        "});",
      question:
        "What does test.beforeEach() ensure for each test in this describe block?",
      options: [
        "It runs once before the entire describe block",
        "It navigates to /shop and adds an item to the cart before each individual test",
        "It runs after each test to clean up the cart",
        "It runs only if the previous test passed",
      ],
      correctIndex: 1,
      explanation:
        "beforeEach runs before EVERY test within the same describe block (or file). Each test starts with a fresh 'Add to Cart' state — isolated and repeatable, regardless of test order.",
    },

    {
      id: "m1-med-48",
      scenario:
        "A test suite spins up a test database before all tests and tears it down after all tests complete. The developer is choosing between beforeAll and beforeEach.",
      question: "Which hook is APPROPRIATE for this use case and why?",
      options: [
        "beforeEach — to ensure a fresh database for every test",
        "beforeAll — to set up the database once for the entire suite, reducing setup time",
        "afterEach — to create the database after each test needs it",
        "afterAll — to create the database only after all tests run",
      ],
      correctIndex: 1,
      explanation:
        "beforeAll runs once before any test in the suite. It is appropriate for expensive one-time setup like database spin-up. beforeEach would re-create the database before every test — wasteful for a shared resource. afterAll handles teardown.",
    },

    {
      id: "m1-med-49",
      code:
        "// fixtures.ts\n" +
        "import { test as base } from '@playwright/test';\n" +
        "import { LoginPage } from './pages/LoginPage';\n\n" +
        "export const test = base.extend<{ loginPage: LoginPage }>({\n" +
        "  loginPage: async ({ page }, use) => {\n" +
        "    const lp = new LoginPage(page);\n" +
        "    await lp.goto();\n" +
        "    await use(lp);\n" +
        "  },\n" +
        "});",
      question: "What does await use(lp) do in this fixture?",
      options: [
        "Navigates to the login page",
        "Provides the LoginPage instance to the test as a fixture parameter",
        "Asserts that login was successful",
        "Destroys the LoginPage instance after the test",
      ],
      correctIndex: 1,
      explanation:
        "In Playwright fixtures, calling await use(value) hands the value to the test that requested the fixture. Code before use() is setup; code after use() is teardown. This pattern replaces beforeEach/afterEach boilerplate.",
    },

    {
      id: "m1-med-50",
      code:
        "// playwright.config.ts\n" +
        "export default defineConfig({\n" +
        "  use: {\n" +
        "    baseURL: 'https://staging.myapp.com',\n" +
        "    headless: true,\n" +
        "    screenshot: 'only-on-failure',\n" +
        "    video: 'retain-on-failure',\n" +
        "  },\n" +
        "  timeout: 30000,\n" +
        "});",
      question: "What happens to videos and screenshots when a test PASSES?",
      options: [
        "Both are saved for all tests regardless",
        "Screenshots are saved; videos are discarded",
        "Both are discarded — they are only retained on failure",
        "Videos are saved; screenshots are discarded",
      ],
      correctIndex: 2,
      explanation:
        "'only-on-failure' for screenshots and 'retain-on-failure' for videos both mean the artifacts are kept only when a test fails. For passing tests they are discarded, keeping CI artifact storage clean.",
    },

    {
      id: "m1-med-51",
      scenario:
        "A Playwright project config has two projects: 'chromium' and 'firefox'. A developer adds `test.use({ browserName: 'webkit' })` at the top of one test file.",
      question: "What does test.use() do in this context?",
      options: [
        "Overrides the browser for all tests in that file to WebKit",
        "Adds WebKit as a third parallel project",
        "Causes a compile error — test.use() cannot override browser settings",
        "Sets WebKit only for the first test in the file",
      ],
      correctIndex: 0,
      explanation:
        "test.use() overrides configuration options for the current file (or describe block). Placing it at the top of the file applies the override to every test in that file, allowing file-level browser or viewport customization.",
    },

    {
      id: "m1-med-52",
      code:
        "test.afterEach(async ({ page }, testInfo) => {\n" +
        "  if (testInfo.status !== testInfo.expectedStatus) {\n" +
        "    await page.screenshot({ path: `screenshots/${testInfo.title}.png` });\n" +
        "  }\n" +
        "});",
      question: "When does this afterEach hook take a screenshot?",
      options: [
        "After every test unconditionally",
        "Only when the test result (status) does not match the expected outcome — i.e., when the test fails or was unexpectedly skipped",
        "Only when the test times out",
        "Only when testInfo.title contains 'error'",
      ],
      correctIndex: 1,
      explanation:
        "testInfo.status reflects the actual result; testInfo.expectedStatus is usually 'passed'. If they differ (failure, flaky, unexpected skip), a screenshot is taken. This avoids saving screenshots for every passing test.",
    },

    {
      id: "m1-med-53",
      code:
        "// playwright.config.ts\n" +
        "projects: [\n" +
        "  { name: 'chromium', use: { ...devices['Desktop Chrome'] } },\n" +
        "  { name: 'mobile', use: { ...devices['iPhone 13'] } },\n" +
        "]",
      question:
        "What does spreading devices['iPhone 13'] into the use block achieve?",
      options: [
        "Installs the iPhone 13 browser on the machine",
        "Emulates the iPhone 13's screen size, user agent, and touch settings in the browser",
        "Runs tests on a real connected iPhone 13 device",
        "Sets the test timeout to match iOS performance",
      ],
      correctIndex: 1,
      explanation:
        "Playwright's devices dictionary contains preset viewport dimensions, user agent strings, device scale factors, and touch capabilities for real devices. Spreading it into use emulates that device in the browser — no physical device needed.",
    },

    // ── PLAYWRIGHT — Navigation, Storage & Sessions (Q54–Q60) ─────────────

    {
      id: "m1-med-54",
      code:
        "// global-setup.ts\n" +
        "import { chromium } from '@playwright/test';\n\n" +
        "async function globalSetup() {\n" +
        "  const browser = await chromium.launch();\n" +
        "  const page = await browser.newPage();\n" +
        "  await page.goto('/login');\n" +
        "  await page.fill('#username', 'admin');\n" +
        "  await page.fill('#password', 'pass');\n" +
        "  await page.click('#submit');\n" +
        "  await page.context().storageState({ path: 'auth.json' });\n" +
        "  await browser.close();\n" +
        "}\n" +
        "export default globalSetup;",
      question: "What is the purpose of storageState({ path: 'auth.json' })?",
      options: [
        "Saves the page HTML to a file",
        "Serializes cookies, localStorage, and sessionStorage to a JSON file for reuse in tests",
        "Takes a screenshot and saves it as JSON",
        "Saves the browser's network logs",
      ],
      correctIndex: 1,
      explanation:
        "storageState() captures the authenticated session state (cookies + storage) and saves it to a file. Tests can then load this file via storageState: 'auth.json' in their context config, skipping the login flow entirely.",
    },

    {
      id: "m1-med-55",
      scenario:
        "A Playwright test opens a settings page and clicks 'Export Data', which opens a new browser tab with a download link. The test needs to interact with the new tab.",
      question:
        "What is the correct Playwright approach to capture and work with the new tab?",
      options: [
        "await page.goto('/new-tab-url')",
        "const [newPage] = await Promise.all([context.waitForEvent('page'), page.click('Export Data button')])",
        "await page.waitForSelector('new-tab')",
        "context.newPage() creates the export tab automatically",
      ],
      correctIndex: 1,
      explanation:
        "When a click triggers a new tab, the page event fires on the context. Wrapping the click and waitForEvent('page') in Promise.all ensures the event listener is registered before the click fires, preventing a race condition.",
    },

    {
      id: "m1-med-56",
      code:
        "await page.evaluate(() => {\n" +
        "  localStorage.setItem('theme', 'dark');\n" +
        "});\n" +
        "await page.reload();\n" +
        "const theme = await page.evaluate(() => localStorage.getItem('theme'));\n" +
        "console.log(theme);",
      question: "What does this sequence do and what is printed?",
      options: [
        "Sets a cookie named 'theme', reloads, and prints 'dark'",
        "Sets localStorage 'theme' to 'dark', reloads, reads it back, and prints 'dark'",
        "Clears localStorage on reload; prints null",
        "Prints 'dark' only in Chrome; fails in other browsers",
      ],
      correctIndex: 1,
      explanation:
        "page.evaluate() executes JavaScript in the browser context. localStorage persists across page reloads within the same origin and context. After reload, the value is still available, so 'dark' is printed.",
    },

    {
      id: "m1-med-57",
      scenario:
        "A test suite authenticates via login in beforeAll. After each test, a test deletes items from the UI. By the third test, no items remain and subsequent tests fail.",
      question: "What storage/session strategy fixes this?",
      options: [
        "Use storageState to preserve auth and reset the database or app state between tests via an API call in beforeEach",
        "Run all tests sequentially without parallelism",
        "Add a 5-second sleep in afterEach",
        "Use separate browser instances for each test file",
      ],
      correctIndex: 0,
      explanation:
        "storageState handles authentication reuse. Test data isolation is a separate concern — resetting state via an API (e.g., POST /api/reset) in beforeEach ensures each test starts with a known clean state, independent of previous tests.",
    },

    {
      id: "m1-med-58",
      code:
        "const context = await browser.newContext({\n" +
        "  storageState: 'auth.json',\n" +
        "});\n" +
        "const page = await context.newPage();",
      question: "What does passing storageState to newContext() achieve?",
      options: [
        "The page navigates automatically to the login page",
        "The browser context is pre-loaded with saved cookies/storage, simulating an already-authenticated session",
        "It prevents cookies from being written during the test",
        "It loads a previously saved screenshot",
      ],
      correctIndex: 1,
      explanation:
        "Passing storageState when creating a context initializes it with saved session data — cookies, localStorage, sessionStorage. The new page acts as if the user already logged in, skipping the login flow and speeding up tests.",
    },

    {
      id: "m1-med-59",
      code:
        "await page.goto('/cart');\n" +
        "const cookies = await page.context().cookies();\n" +
        "console.log(cookies.find(c => c.name === 'session_id')?.value);",
      question: "What does this snippet do?",
      options: [
        "Deletes the session_id cookie",
        "Reads all cookies from the current context and prints the session_id cookie's value",
        "Sets a new cookie named session_id",
        "Clears the browser context cookies",
      ],
      correctIndex: 1,
      explanation:
        "context.cookies() returns all cookies for the current browser context. The find() call locates the cookie with name 'session_id' and optional chaining (?.) safely accesses its value, printing it or undefined if not found.",
    },

    {
      id: "m1-med-60",
      scenario:
        "A Playwright test for a SPA navigates using page.goto('/dashboard') but the URL never changes — the app uses hash-based routing (#/dashboard). The test fails because toHaveURL('/dashboard') does not match.",
      question: "What URL pattern should be used in the assertion?",
      options: [
        "await expect(page).toHaveURL('/dashboard')",
        "await expect(page).toHaveURL(/#\\/dashboard/)",
        "await expect(page).toHaveURL('hash:/dashboard')",
        "await expect(page).toHaveURL({ path: '/dashboard' })",
      ],
      correctIndex: 1,
      explanation:
        "Hash-based routing appends the route after #. The actual URL is something like http://app.com/#/dashboard. Using a regex like /#\\/dashboard/ correctly matches the hash fragment. Plain string '/dashboard' would not match.",
    },
  ],
};
