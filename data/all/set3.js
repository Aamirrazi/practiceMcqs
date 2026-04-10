// ========================= MEDIUM LEVEL TEST =========================
const MediumLevelTest = {
  meta: {
    id: "capg-emt-medium",
    testTitle: "Capgemini Excelerator – Playwright & Web Fundamentals (Medium)",
    topic: "M1 Style Mock Test",
    topicLabel: "Playwright + TS",
    difficulty: "Medium",
    questionCount: 60,
    estimatedMinutes: 60,
    description:
      "60 mixed‑difficulty questions on DOM, TypeScript, Playwright, OOP, and performance.",
    icon: "🎭",
  },

  questions: [
    // DOM BASICS (Q1–10)
    {
      id: "med-001",
      question: "What does the DOM represent?",
      options: [
        "A binary copy of the HTML file",
        "An in‑memory tree structure of the HTML document",
        "The CSS styling rules only",
        "The browser's network cache",
      ],
      correctIndex: 1,
      explanation:
        "The Document Object Model (DOM) is a tree‑structured representation of the HTML document, allowing JavaScript to access and modify content, structure, and styles.",
    },
    {
      id: "med-002",
      code: "const elem = document.getElementById('title');\nelem.textContent = 'New Heading';",
      question: "What happens after this code runs?",
      options: [
        "The HTML attribute 'title' is changed",
        "The inner text of the element with id='title' becomes 'New Heading'",
        "A new element with id='title' is created",
        "The page throws an error because textContent is read‑only",
      ],
      correctIndex: 1,
      explanation:
        "getElementById selects the element, and textContent updates its visible text content.",
    },
    {
      id: "med-003",
      scenario:
        "A developer uses `document.querySelectorAll('.card')` on a page that has 5 elements with class 'card'.",
      question: "What type of value does the method return?",
      options: [
        "A single HTML element",
        "An array of HTML elements",
        "A NodeList (static) of matching elements",
        "A live HTMLCollection",
      ],
      correctIndex: 2,
      explanation:
        "querySelectorAll returns a static NodeList, not a live collection, and not a plain array (though it is iterable).",
    },
    {
      id: "med-004",
      code: "<button id='btn'>Click</button>\n<script>\ndocument.getElementById('btn').addEventListener('click', () => alert('Hi'));\n</script>",
      question: "What will happen when the button is clicked?",
      options: [
        "Nothing, because the event listener is not attached correctly",
        "A browser alert with 'Hi' will appear",
        "The page will reload",
        "An error: addEventListener is not a function",
      ],
      correctIndex: 1,
      explanation:
        "addEventListener correctly attaches a click handler, showing the alert.",
    },
    {
      id: "med-005",
      scenario:
        "A junior writes `element.style = 'color: red;'` to change an element's text colour.",
      question: "What is the recommended alternative?",
      options: [
        "element.setAttribute('style', 'color: red;')",
        "element.style.color = 'red'",
        "element.cssText = 'color: red'",
        "element.className = 'red-text' (with a predefined CSS class)",
      ],
      correctIndex: 3,
      explanation:
        "Using a CSS class is cleaner and more maintainable. Direct style assignment works but is less scalable.",
    },
    {
      id: "med-006",
      code: "const parent = document.getElementById('parent');\nconst newChild = document.createElement('div');\nparent.appendChild(newChild);",
      question: "Where does the new div appear in the DOM?",
      options: [
        "Before the first child of parent",
        "After the last child of parent",
        "Outside the parent element",
        "It replaces the parent's content",
      ],
      correctIndex: 1,
      explanation:
        "appendChild adds the new element as the last child of the parent node.",
    },
    {
      id: "med-007",
      question:
        "Which property returns the number of child nodes an element has (including text nodes)?",
      options: [
        "childElementCount",
        "children.length",
        "childNodes.length",
        "length",
      ],
      correctIndex: 2,
      explanation:
        "childNodes.length gives the count of all child nodes (elements, text, comments). childElementCount counts only element nodes.",
    },
    {
      id: "med-008",
      code: "<div id='box'></div>\n<script>\nconst box = document.getElementById('box');\nbox.classList.add('hidden');\n</script>",
      question: "What does `classList.add('hidden')` do?",
      options: [
        "Replaces all existing classes with 'hidden'",
        "Adds the class 'hidden' while preserving other classes",
        "Creates a new style rule",
        "Removes the element if 'hidden' already exists",
      ],
      correctIndex: 1,
      explanation:
        "classList.add appends the given class without removing existing ones.",
    },
    {
      id: "med-009",
      scenario:
        "A form has an input with id='email'. You want to get the current typed value.",
      question: "Which code correctly retrieves it?",
      options: [
        "document.getElementById('email').value",
        "document.getElementById('email').innerHTML",
        "document.getElementById('email').textContent",
        "document.getElementById('email').getAttribute('value')",
      ],
      correctIndex: 0,
      explanation:
        "For form inputs, .value returns the current user‑entered value. .getAttribute('value') returns the initial default value.",
    },
    {
      id: "med-010",
      code: "const items = document.querySelectorAll('li');\nitems.forEach(item => item.style.backgroundColor = 'yellow');",
      question: "Is this code valid? Why?",
      options: [
        "No, NodeList does not have forEach in older browsers",
        "Yes, NodeList now supports forEach in modern environments",
        "No, style.backgroundColor is read‑only",
        "Yes, but it will only affect the first <li>",
      ],
      correctIndex: 1,
      explanation:
        "Modern NodeLists have forEach (they are iterable). The code works and colours every <li>.",
    },

    // TYPESCRIPT BASICS (Q11–20)
    {
      id: "med-011",
      code: "let message: string = 'Hello';\nmessage = 42;",
      question: "What will TypeScript report?",
      options: [
        "No error, because TypeScript allows any type",
        "Error: Type 'number' is not assignable to type 'string'",
        "Runtime error when assigning 42",
        "It automatically converts 42 to '42'",
      ],
      correctIndex: 1,
      explanation:
        "TypeScript enforces static types; assigning a number to a string variable causes a compile‑time error.",
    },
    {
      id: "med-012",
      code: "function add(a: number, b: number): number { return a + b; }",
      question: "What is the return type of this function?",
      options: ["any", "void", "number", "string"],
      correctIndex: 2,
      explanation:
        "The `: number` after the parameter list declares the return type as number.",
    },
    {
      id: "med-013",
      scenario:
        "A variable is declared as `let count;` without a type annotation.",
      question: "What type does TypeScript infer for `count`?",
      options: ["any", "unknown", "undefined", "null"],
      correctIndex: 0,
      explanation:
        "When no type is given and no initial value, TypeScript infers `any` (implicit any).",
    },
    {
      id: "med-014",
      code: "const greet = (name: string = 'Guest'): string => `Hello ${name}`;",
      question: "What does the `= 'Guest'` syntax represent?",
      options: [
        "A required parameter with a default value",
        "An optional parameter that defaults to 'Guest'",
        "A rest parameter",
        "A type assertion",
      ],
      correctIndex: 1,
      explanation:
        "Default parameters allow the argument to be omitted; then the default value is used.",
    },
    {
      id: "med-015",
      code: "function printId(id: number | string) {\n  console.log(`ID: ${id}`);\n}",
      question: "What kind of type is `number | string`?",
      options: [
        "Intersection type",
        "Union type",
        "Generic type",
        "Literal type",
      ],
      correctIndex: 1,
      explanation:
        "The union type (|) allows a variable to hold either a number or a string.",
    },
    {
      id: "med-016",
      scenario: "You have an array `const scores = [10, 20, 30];`",
      question: "What type does TypeScript infer for `scores`?",
      options: ["any[]", "number[]", "Array<number>", "Both B and C"],
      correctIndex: 3,
      explanation:
        "TypeScript infers `number[]` which is the same as `Array<number>`.",
    },
    {
      id: "med-017",
      code: "let value: unknown = 'hello';\nlet strLength: number = value.length;",
      question: "Will TypeScript allow this assignment?",
      options: [
        "Yes, because unknown can hold any value",
        "No, because unknown is not safe – you must narrow the type first",
        "Yes, if you add a type assertion",
        "No, length does not exist on unknown",
      ],
      correctIndex: 1,
      explanation:
        "`unknown` requires type narrowing (e.g., `if (typeof value === 'string')`) before accessing properties.",
    },
    {
      id: "med-018",
      code: "const multiply = (x: number, y: number): number => x * y;",
      question: "What is the name of this function syntax?",
      options: [
        "Function declaration",
        "Function expression",
        "Arrow function",
        "Anonymous generator",
      ],
      correctIndex: 2,
      explanation:
        "The `=>` syntax defines an arrow function, which lexically binds `this`.",
    },
    {
      id: "med-019",
      scenario: "You have a callback that takes a `string` and returns `void`.",
      question: "Which type correctly describes this callback?",
      options: [
        "(string) => void",
        "callback(string): void",
        "(arg: string) => any",
        "Function<void, string>",
      ],
      correctIndex: 0,
      explanation:
        "The correct TypeScript syntax for a function type is `(param: type) => returnType`.",
    },
    {
      id: "med-020",
      code: "let tuple: [string, number] = ['Alice', 30];\ntuple[1] = 'thirty';",
      question: "What error will TypeScript produce?",
      options: [
        "No error, because tuple elements can change type",
        "Error: Type 'string' is not assignable to type 'number' at index 1",
        "Error: Tuples are read‑only",
        "Error: Index 1 is out of bounds",
      ],
      correctIndex: 1,
      explanation:
        "Tuples fix the type per position; index 1 must always be a number.",
    },

    // INTERFACES & OBJECT TYPES (Q21–25)
    {
      id: "med-021",
      code: "interface User { name: string; age: number; }",
      question: "What does this interface define?",
      options: [
        "A class that must be implemented",
        "A contract for objects that have name (string) and age (number)",
        "A runtime type check",
        "An abstract class with two properties",
      ],
      correctIndex: 1,
      explanation:
        "Interfaces describe the shape of an object – compile‑time only, no runtime effect.",
    },
    {
      id: "med-022",
      code: "interface Car { brand: string; model?: string; }",
      question: "What does the `?` after `model` mean?",
      options: [
        "The model property is required but can be null",
        "The model property is optional",
        "The model property is read‑only",
        "The model property must be a boolean",
      ],
      correctIndex: 1,
      explanation: "Optional properties (?) may be omitted from the object.",
    },
    {
      id: "med-023",
      code: "interface Animal { name: string; }\ninterface Dog extends Animal { breed: string; }",
      question: "Which properties does a `Dog` object need?",
      options: [
        "Only breed",
        "Only name",
        "Both name and breed",
        "Neither – interfaces are not enforced",
      ],
      correctIndex: 2,
      explanation:
        "Extending an interface inherits all properties from the parent interface.",
    },
    {
      id: "med-024",
      code: "type Point = { x: number; y: number; };\nconst p: Point = { x: 10, y: 20 };",
      question:
        "What is the difference between `type` and `interface` in this example?",
      options: [
        "No difference – they are identical for object shapes",
        "interface can be extended, type cannot",
        "type cannot describe objects, only primitives",
        "interface is runtime, type is compile‑time",
      ],
      correctIndex: 0,
      explanation:
        "For simple object types, `type` and `interface` are often interchangeable, but interfaces have better merging and extension capabilities.",
    },
    {
      id: "med-025",
      scenario:
        "You want to define an object that can have any string keys but values must be numbers.",
      question: "Which TypeScript construct fits best?",
      options: [
        "interface Dict { [key: string]: number; }",
        "type Dict = Record<number, string>",
        "interface Dict { key: string; value: number; }",
        "type Dict = Map<string, number>",
      ],
      correctIndex: 0,
      explanation:
        "Index signatures allow any string key with a fixed value type (number).",
    },

    // CLASSES & OOP (Q26–30)
    {
      id: "med-026",
      code: "class Animal { constructor(public name: string) {} }",
      question: "What does `public name: string` in the constructor do?",
      options: [
        "Declares a parameter but does nothing else",
        "Declares a property `name` and initialises it automatically",
        "Only makes the parameter available inside the constructor",
        "Creates a private field",
      ],
      correctIndex: 1,
      explanation:
        "TypeScript shorthand automatically creates a class property with the same name and assigns the constructor argument.",
    },
    {
      id: "med-027",
      code: "class Counter { private count = 0; increment() { this.count++; } }",
      question: "Can `count` be accessed outside the class?",
      options: [
        "Yes, because it is public by default",
        "No, because private restricts access to within the class",
        "Only if you use reflection",
        "Yes, using `counter['count']`",
      ],
      correctIndex: 1,
      explanation:
        "`private` fields are only accessible inside the class body; TypeScript enforces this at compile time.",
    },
    {
      id: "med-028",
      scenario:
        "A base class `Vehicle` has a method `start()`. A `Car` class extends `Vehicle`.",
      question: "How does `Car` inherit `start()`?",
      options: [
        "It must redeclare start() manually",
        "It automatically inherits the method unless overridden",
        "It can only inherit if start is public",
        "Inheritance does not work for methods",
      ],
      correctIndex: 1,
      explanation:
        "Classes inherit all methods from their parent (unless overridden).",
    },
    {
      id: "med-029",
      code: "abstract class Shape { abstract area(): number; }",
      question: "What is true about this class?",
      options: [
        "It can be instantiated directly",
        "It cannot be instantiated; it must be extended and the abstract method implemented",
        "The area method is optional",
        "It is the same as an interface",
      ],
      correctIndex: 1,
      explanation:
        "Abstract classes cannot be instantiated. Derived classes must implement abstract members.",
    },
    {
      id: "med-030",
      code: "class MathUtils { static PI = 3.14; }",
      question: "How do you access `PI`?",
      options: [
        "new MathUtils().PI",
        "MathUtils.PI",
        "PI is private",
        "MathUtils['PI'] only",
      ],
      correctIndex: 1,
      explanation:
        "Static properties belong to the class itself, not instances, accessed via `ClassName.property`.",
    },

    // PLAYWRIGHT & TEST RUNNER (Q31–45)
    {
      id: "med-031",
      code: "test('example', async ({ page }) => {\n  await page.goto('https://example.com');\n});",
      question: "What does the `{ page }` parameter provide?",
      options: [
        "A reference to the test file",
        "A Playwright Page object to interact with the browser",
        "The test context",
        "The global configuration",
      ],
      correctIndex: 1,
      explanation:
        "Playwright Test passes a `page` fixture that represents a single browser tab.",
    },
    {
      id: "med-032",
      scenario: "You want to verify that a heading text equals 'Dashboard'.",
      question: "Which assertion is correct?",
      options: [
        "expect(page.locator('h1')).toBe('Dashboard')",
        "await expect(page.locator('h1')).toHaveText('Dashboard')",
        "assert(page.locator('h1').innerText() === 'Dashboard')",
        "page.locator('h1').shouldHaveText('Dashboard')",
      ],
      correctIndex: 1,
      explanation:
        "Playwright's `toHaveText` is an auto‑retrying assertion that matches the element's text.",
    },
    {
      id: "med-033",
      code: "test.describe('Login suite', () => {\n  test.beforeEach(async ({ page }) => {\n    await page.goto('/login');\n  });\n});",
      question: "When does `beforeEach` run?",
      options: [
        "Once before all tests in the describe block",
        "Before every individual test inside the describe block",
        "After each test",
        "Only if the previous test failed",
      ],
      correctIndex: 1,
      explanation:
        "`beforeEach` runs before each test, ensuring a fresh state.",
    },
    {
      id: "med-034",
      code: "await expect(page.locator('.spinner')).toBeHidden();",
      question: "What does `toBeHidden()` check?",
      options: [
        "The element does not exist in the DOM",
        "The element is present but not visible (e.g., display: none)",
        "The element has opacity:0",
        "The element is removed from the DOM",
      ],
      correctIndex: 1,
      explanation:
        "toBeHidden matches elements that are attached but not visible (hidden by CSS).",
    },
    {
      id: "med-035",
      scenario:
        "A test clicks a button that triggers a navigation. You need to wait for the new page to load.",
      question: "What is the best practice?",
      options: [
        "Use `page.waitForTimeout(5000)`",
        "Use `await Promise.all([page.waitForNavigation(), page.click('button')])`",
        "Use `page.waitForSelector('body')` after click",
        "Navigation is automatic, no extra wait needed",
      ],
      correctIndex: 1,
      explanation:
        "Waiting for navigation concurrently with the click ensures the action and navigation are synchronised.",
    },
    {
      id: "med-036",
      code: "const button = page.locator('button', { hasText: 'Submit' });",
      question: "What does `{ hasText: 'Submit' }` do?",
      options: [
        "Filters the locator to only buttons that contain the text 'Submit'",
        "Clicks the button with that exact text",
        "Sets an attribute filter",
        "Throws an error if the button does not have that text",
      ],
      correctIndex: 0,
      explanation:
        "The `hasText` option narrows the locator to elements whose text matches the given string.",
    },
    {
      id: "med-037",
      code: "test.only('critical test', () => { ... });",
      question: "What effect does `.only` have?",
      options: [
        "The test will be skipped",
        "Only this test will run; all others are skipped",
        "The test runs with higher priority",
        "It marks the test as flaky",
      ],
      correctIndex: 1,
      explanation:
        "`test.only` tells the test runner to execute only that specific test, ignoring others.",
    },
    {
      id: "med-038",
      scenario:
        "You have a test that fills a form and submits it. You want to run it three times with different data.",
      question: "Which Playwright feature helps?",
      options: [
        "test.describe.parallel",
        "test.each`",
        "test.beforeEach",
        "test.concurrent",
      ],
      correctIndex: 1,
      explanation:
        "`test.each` allows parameterised tests – the test runs once per row of data.",
    },
    {
      id: "med-039",
      code: "await expect(page.locator('#result')).toContainText('Success');",
      question: "What does `toContainText` verify?",
      options: [
        "The element's text exactly equals 'Success'",
        "The element's text includes the substring 'Success'",
        "The element contains a child with text 'Success'",
        "Both B and C",
      ],
      correctIndex: 3,
      explanation:
        "`toContainText` checks that the element (or its descendants) contains the given text anywhere.",
    },
    {
      id: "med-040",
      scenario:
        "A test fails intermittently because an element appears after a short delay.",
      question: "What is the recommended fix?",
      options: [
        "Add `page.waitForTimeout(2000)`",
        "Use an assertion that auto‑retries, e.g., `await expect(locator).toBeVisible()`",
        "Increase the global timeout to 60 seconds",
        "Disable the test",
      ],
      correctIndex: 1,
      explanation:
        "Playwright assertions retry until the condition is met or a timeout is reached, handling delays gracefully.",
    },
    {
      id: "med-041",
      code: "test('screenshot', async ({ page }) => {\n  await page.screenshot({ path: 'home.png' });\n});",
      question: "Where is the screenshot saved?",
      options: [
        "In memory only",
        "In the current working directory as home.png",
        "In a temporary folder",
        "Only in the test report",
      ],
      correctIndex: 1,
      explanation:
        "The `path` option writes the screenshot to the specified file path relative to the execution directory.",
    },
    {
      id: "med-042",
      scenario:
        "You need to run the same test on Chromium, Firefox, and WebKit.",
      question: "How does Playwright handle this by default?",
      options: [
        "You must write separate test files",
        "Playwright runs tests across all configured projects automatically",
        "Only Chromium is supported",
        "You need to set a `browser` flag in each test",
      ],
      correctIndex: 1,
      explanation:
        "Playwright Test uses projects defined in config; tests run on all projects unless filtered.",
    },
    {
      id: "med-043",
      code: "test('API call', async ({ request }) => {\n  const res = await request.get('/api/users');\n  expect(res.ok()).toBeTruthy();\n});",
      question: "What is the `request` fixture used for?",
      options: [
        "Simulating HTTP requests without a browser",
        "Modifying the browser's network requests",
        "Creating a new page context",
        "Capturing request logs",
      ],
      correctIndex: 0,
      explanation:
        "The `request` fixture provides an API client for making direct HTTP requests, useful for API testing.",
    },
    {
      id: "med-044",
      scenario:
        "You want to reuse a logged‑in state across multiple test files.",
      question: "What is the best approach?",
      options: [
        "Login in every test's beforeEach",
        "Use `storageState` to save and load session",
        "Store credentials in environment variables",
        "Use global `beforeAll`",
      ],
      correctIndex: 1,
      explanation:
        "Playwright can save browser context storage state (cookies, localStorage) and reuse it, speeding up tests.",
    },
    {
      id: "med-045",
      code: "test('retry example', async () => {\n  // ...\n});\n// Config: retries: 2",
      question: "If the test fails, how many times will it be retried?",
      options: ["0", "1", "2", "3"],
      correctIndex: 2,
      explanation:
        "`retries: 2` means the test will run up to 3 times total (original + 2 retries).",
    },

    // PERFORMANCE ENGINEERING (Q46–50)
    {
      id: "med-046",
      question: "What is the primary goal of performance engineering?",
      options: [
        "To write code as fast as possible",
        "To ensure the system meets response time, throughput, and resource utilisation requirements",
        "To reduce the number of lines of code",
        "To maximise CPU usage",
      ],
      correctIndex: 1,
      explanation:
        "Performance engineering focuses on meeting non‑functional requirements like speed, scalability, and efficiency.",
    },
    {
      id: "med-047",
      scenario: "A web page takes 5 seconds to load. Users are complaining.",
      question: "Which metric is directly affected?",
      options: [
        "Time to First Byte (TTFB)",
        "Largest Contentful Paint (LCP)",
        "First Input Delay (FID)",
        "Cumulative Layout Shift (CLS)",
      ],
      correctIndex: 1,
      explanation:
        "LCP measures loading performance – a 5s load likely means poor LCP.",
    },
    {
      id: "med-048",
      code: "// Before: synchronous loops + DOM updates\nfor(let i=0; i<1000; i++) {\n  document.body.innerHTML += '<div>' + i + '</div>';\n}",
      question: "What performance issue does this code have?",
      options: [
        "No issue, it's fine for 1000 items",
        "Forced synchronous reflows on each iteration (bad for performance)",
        "Memory leak",
        "It will never finish because innerHTML is slow",
      ],
      correctIndex: 1,
      explanation:
        "Repeatedly modifying innerHTML triggers layout recalculations each time. Better to build a string and assign once.",
    },
    {
      id: "med-049",
      question:
        "Which tool can be used to measure runtime performance of a Playwright test?",
      options: [
        "Playwright Trace Viewer",
        "Chrome DevTools",
        "Lighthouse",
        "All of the above",
      ],
      correctIndex: 3,
      explanation:
        "Trace Viewer records actions, DevTools gives profiling, Lighthouse gives performance scores.",
    },
    {
      id: "med-050",
      scenario:
        "You notice that the database query for a dashboard takes 2 seconds.",
      question: "What is a typical first step to improve it?",
      options: [
        "Add an index on the filtered column",
        "Rewrite the query in a different language",
        "Cache the entire dashboard",
        "Increase server memory",
      ],
      correctIndex: 0,
      explanation:
        "Missing indexes are a common cause of slow queries; adding proper indexes can drastically reduce time.",
    },

    // MORE ADVANCED QUESTIONS (Q51–60) – still medium level
    {
      id: "med-051",
      code: "const elem = document.querySelector('#app');\nelem.innerHTML = '<span>Hello</span>';",
      question: "What happens to existing event listeners on children of #app?",
      options: [
        "They remain intact",
        "They are detached and lost because innerHTML removes old content",
        "They are automatically reattached",
        "They move to the new span",
      ],
      correctIndex: 1,
      explanation:
        "Setting innerHTML destroys all descendants, so any attached event listeners are removed.",
    },
    {
      id: "med-052",
      code: "type Status = 'pending' | 'completed' | 'failed';\nlet taskStatus: Status = 'pending';",
      question: "What is `Status` called?",
      options: ["Union type", "String enum", "Literal union type", "Interface"],
      correctIndex: 2,
      explanation:
        "This is a union of string literal types – a powerful way to restrict to specific strings.",
    },
    {
      id: "med-053",
      scenario:
        "You have a Playwright test that fails due to a race condition – the element appears but is not yet enabled.",
      question: "Which assertion is most appropriate?",
      options: ["toBeVisible", "toBeEnabled", "toHaveAttribute", "toHaveValue"],
      correctIndex: 1,
      explanation:
        "`toBeEnabled` waits for the element to become enabled (not disabled).",
    },
    {
      id: "med-054",
      code: "class Logger { log(message: string): void { console.log(message); } }\nclass FileLogger extends Logger { log(message: string): void { fs.writeFileSync(...); } }",
      question: "This demonstrates which OOP principle?",
      options: [
        "Encapsulation",
        "Polymorphism (method overriding)",
        "Abstraction",
        "Composition",
      ],
      correctIndex: 1,
      explanation:
        "The derived class overrides the parent method, a form of polymorphism.",
    },
    {
      id: "med-055",
      code: "await page.locator('input').fill('John');\nawait page.locator('input').press('Enter');",
      question: "What does `press('Enter')` do?",
      options: [
        "Types the word 'Enter' into the input",
        "Simulates pressing the Enter/Return key on the focused element",
        "Clicks a button labelled 'Enter'",
        "Nothing, press is not a valid method",
      ],
      correctIndex: 1,
      explanation:
        "`press` sends a keyboard event for a single key (e.g., 'Enter', 'Tab', 'ArrowDown').",
    },
    {
      id: "med-056",
      scenario:
        "Your test suite has 100 tests, and one of them is extremely slow (30s).",
      question: "What is a good strategy?",
      options: [
        "Increase the global timeout",
        "Use `test.slow()` to triple the timeout for that test only",
        "Skip the test",
        "Run only that test with `test.only`",
      ],
      correctIndex: 1,
      explanation:
        "`test.slow()` marks a test as slow, giving it triple the default timeout without affecting others.",
    },
    {
      id: "med-057",
      code: "const [page1] = await context.newPage();\nconst [page2] = await context.newPage();",
      question: "Do page1 and page2 share the same session (cookies, storage)?",
      options: [
        "Yes, because they belong to the same browser context",
        "No, each page has its own isolated storage",
        "Only if they are same origin",
        "Yes, but only if you set `shareStorage: true`",
      ],
      correctIndex: 0,
      explanation:
        "Pages within the same context share storage (cookies, localStorage).",
    },
    {
      id: "med-058",
      code: "function greet(person: { name: string; age: number }) {\n  return `Hello ${person.name}`;\n}",
      question: "How could you rewrite this using an interface?",
      options: [
        "interface Person { name: string; age: number; }\ngreet(person: Person)",
        "type Person = { name: string; age: number }",
        "Both A and B",
        "It is already an interface",
      ],
      correctIndex: 2,
      explanation:
        "Both interface or type alias can replace the inline object type.",
    },
    {
      id: "med-059",
      scenario:
        "You need to test that a dropdown has exactly three options: 'Red', 'Green', 'Blue'.",
      question: "Which Playwright method gives you all option texts?",
      options: [
        "page.locator('select option').allTextContents()",
        "page.locator('select').innerText()",
        "page.selectOption()",
        "page.locator('select').getAttribute('options')",
      ],
      correctIndex: 0,
      explanation:
        "`allTextContents()` returns an array of text contents for all matched elements.",
    },
    {
      id: "med-060",
      code: "test('example', async ({ page }) => {\n  await page.route('**/api/data', route => route.fulfill({ body: 'mocked' }));\n});",
      question: "What does `page.route` do?",
      options: [
        "Navigates to that URL",
        "Intercepts and mocks network requests matching the pattern",
        "Logs all network requests",
        "Blocks the request",
      ],
      correctIndex: 1,
      explanation:
        "`page.route` enables network interception, allowing you to mock responses.",
    },
  ],
};
