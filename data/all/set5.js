/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║     CAPGEMINI EXCELLER — M1 MOCK EXAM (60 Questions)        ║
 * ║  Topics: HTML · CSS · DOM · TypeScript · Playwright         ║
 * ║  Level : Intermediate → Advanced  |  Scenario + Code based  ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * How to plug in:
 *   1. Drop this file next to your other test modules.
 *   2. Register it in index.html just like the sample module.
 */
const CapgeminiM1Mock = {
  // ─── META ────────────────────────────────────────────────────────────────
  meta: {
    id: "capgemini-m1-mock",
    testTitle: "Capgemini Exceller — M1 Mock Exam",
    topic: "M1 Style Mock Test",
    topicLabel: "HTML · CSS · DOM · TypeScript · Playwright",
    difficulty: "Intermediate",
    questionCount: 60,
    estimatedMinutes: 75,
    description:
      "60 scenario- and code-based questions covering the full M1 syllabus: " +
      "HTML/CSS, DOM, TypeScript, and Playwright (with POM, fixtures, assertions, and more).",
    icon: "🎭",
  },

  // ─── QUESTIONS ───────────────────────────────────────────────────────────
  questions: [
    // ════════════════════════════════════════════════════════════════════════
    //  SECTION 1 — HTML & CSS  (Q1 – Q12)
    // ════════════════════════════════════════════════════════════════════════

    {
      id: "m1-01",
      scenario:
        "A QA engineer opens DevTools and notices the browser renders a <div> inside " +
        "a <p> tag as two separate elements, even though the markup clearly nests them. " +
        "The engineer is confused because no CSS is involved.",
      question: "Why does the browser split the <div> out of the <p>?",
      options: [
        "Browsers always separate block elements from inline elements for performance.",
        "A <p> element can only contain phrasing (inline) content; a <div> is block-level, so the parser auto-closes the <p>.",
        "The browser applies the default stylesheet which sets display:block on <div>.",
        "The <p> tag is self-closing in HTML5 and cannot have children.",
      ],
      correctIndex: 1,
      explanation:
        "HTML content models forbid block-level elements inside <p>. " +
        "The HTML parser implicitly closes the open <p> before inserting the <div>, " +
        "producing two sibling elements instead of a parent-child relationship.",
    },

    {
      id: "m1-02",
      code:
        `<form action="/submit" method="POST">\n` +
        `  <input type="email" name="userEmail" required />\n` +
        `  <input type="submit" value="Send" />\n` +
        `</form>`,
      question:
        "A tester submits this form with an empty email field in Chrome. " +
        "Which statement is TRUE?",
      options: [
        "The form submits because the `required` attribute is only enforced server-side.",
        "The browser prevents submission and shows a native validation tooltip.",
        "The form submits but sends an empty string for userEmail.",
        "The browser throws a JavaScript TypeError before submission.",
      ],
      correctIndex: 1,
      explanation:
        "The `required` attribute triggers built-in browser constraint validation. " +
        "Modern browsers block form submission and display a native tooltip when a required " +
        "field is empty, without any JavaScript.",
    },

    {
      id: "m1-03",
      code:
        `<video controls>\n` +
        `  <source src="demo.mp4" type="video/mp4" />\n` +
        `  <source src="demo.webm" type="video/webm" />\n` +
        `  Your browser does not support HTML5 video.\n` +
        `</video>`,
      question:
        "In a browser that supports both MP4 and WebM, which source will be loaded?",
      options: [
        "Both sources are downloaded and the higher-quality one is chosen.",
        "The browser loads demo.mp4 because it is listed first.",
        "The browser always prefers WebM as it is an open format.",
        "The browser randomly selects one of the two sources.",
      ],
      correctIndex: 1,
      explanation:
        "The browser evaluates <source> elements in document order and picks " +
        "the first one whose MIME type it supports. Since both are supported here, " +
        "demo.mp4 wins because it appears first.",
    },

    {
      id: "m1-04",
      scenario:
        "A developer is auditing a page for accessibility. They find a navigation " +
        "landmark built with <div class='nav'> and want to understand the semantic impact.",
      question:
        "What is the key difference between using <div class='nav'> and <nav>?",
      options: [
        "There is no practical difference; class names convey the same meaning.",
        "<nav> creates a scrollable region by default; <div> does not.",
        "<nav> exposes a 'navigation' ARIA landmark role to assistive technologies; <div> does not.",
        "<div> cannot contain anchor tags, so links inside it are inaccessible.",
      ],
      correctIndex: 2,
      explanation:
        "Semantic HTML elements carry implicit ARIA roles. <nav> maps to role='navigation', " +
        "which screen readers announce to users. A <div> has no role, so assistive technologies " +
        "cannot identify it as a navigation region.",
    },

    {
      id: "m1-05",
      code:
        `.box {\n` +
        `  width: 200px;\n` +
        `  padding: 20px;\n` +
        `  border: 5px solid black;\n` +
        `  box-sizing: content-box;\n` +
        `}`,
      question: "What is the total rendered width of .box in the browser?",
      options: ["200px", "220px", "250px", "245px"],
      correctIndex: 2,
      explanation:
        "With box-sizing: content-box, width applies only to the content area. " +
        "Total width = content (200) + left padding (20) + right padding (20) + " +
        "left border (5) + right border (5) = 250px.",
    },

    {
      id: "m1-06",
      code:
        `.container {\n` +
        `  display: flex;\n` +
        `  justify-content: space-between;\n` +
        `  align-items: center;\n` +
        `  height: 200px;\n` +
        `}\n` +
        `.item { height: 50px; }`,
      question:
        "A child .item is placed inside .container. " +
        "Where will it be positioned vertically?",
      options: [
        "At the top of the container (default flex behaviour).",
        "Stretched to fill 200px height.",
        "Centred vertically — 75px from both the top and bottom of the container.",
        "At the bottom of the container.",
      ],
      correctIndex: 2,
      explanation:
        "align-items: center vertically centres flex children along the cross axis. " +
        "Container height is 200px, item height is 50px. The item is offset " +
        "(200 - 50) / 2 = 75px from both top and bottom.",
    },

    {
      id: "m1-07",
      code:
        `<style>\n` +
        `  #header   { color: red; }\n` +
        `  .title    { color: blue; }\n` +
        `  h1        { color: green; }\n` +
        `</style>\n` +
        `<h1 id="header" class="title">Hello</h1>`,
      question: "What colour will 'Hello' be rendered in?",
      options: [
        "green — element selectors have the highest specificity.",
        "blue — class selectors override element selectors.",
        "red — ID selectors have the highest specificity among the three.",
        "The colour is undefined because all three rules conflict.",
      ],
      correctIndex: 2,
      explanation:
        "CSS specificity order (high to low): inline styles > IDs > classes/attributes > elements. " +
        "The ID selector #header (specificity 0,1,0,0) beats .title (0,0,1,0) and h1 (0,0,0,1). " +
        "So 'Hello' renders red.",
    },

    {
      id: "m1-08",
      scenario:
        "A tester notices that hovering over a button changes its background colour, " +
        "but the transition is instantaneous rather than smooth. The relevant CSS is shown below.",
      code:
        `.btn {\n` +
        `  background-color: blue;\n` +
        `}\n` +
        `.btn:hover {\n` +
        `  background-color: red;\n` +
        `  transition: background-color 0.3s ease;\n` +
        `}`,
      question: "Why is the transition not smooth?",
      options: [
        "ease is not a valid timing function; linear should be used.",
        "The transition property must be declared on the base selector (.btn), not on :hover.",
        "background-color transitions are not supported in CSS.",
        "0.3s is too short a duration to be visible.",
      ],
      correctIndex: 1,
      explanation:
        "When the transition is declared only on :hover, it applies when the state is entered " +
        "but not when it exits (because :hover is no longer active). Placing the transition " +
        "on the base .btn rule ensures smooth animation in both directions.",
    },

    {
      id: "m1-09",
      code:
        `<iframe\n` +
        `  src="https://partner-site.com/widget"\n` +
        `  sandbox="allow-scripts"\n` +
        `></iframe>`,
      question:
        "A team embeds a third-party payment widget inside this iframe. " +
        "The widget tries to submit a form to its own origin. What happens?",
      options: [
        "The form submits successfully because allow-scripts is present.",
        "The form submission is blocked because the sandbox does not include allow-forms.",
        "The iframe is blocked entirely by the same-origin policy.",
        "The sandbox attribute has no effect on form submission.",
      ],
      correctIndex: 1,
      explanation:
        "The sandbox attribute restricts iframe capabilities to only what is explicitly allowed. " +
        "Form submission requires allow-forms. Since only allow-scripts is listed, " +
        "any form submit inside the iframe is silently blocked.",
    },

    {
      id: "m1-10",
      code:
        `input:invalid {\n` +
        `  border: 2px solid red;\n` +
        `}\n` +
        `input:valid {\n` +
        `  border: 2px solid green;\n` +
        `}`,
      scenario:
        "A user opens the page for the first time. The email field is empty and has the `required` attribute. " +
        "No JavaScript is used.",
      question:
        "What border colour does the email field show on initial page load before the user interacts?",
      options: [
        "No border — pseudo-classes only apply after user interaction.",
        "Red — the field is technically invalid (empty + required) from the start.",
        "Green — empty fields are considered valid until the form is submitted.",
        "The behaviour depends entirely on the browser.",
      ],
      correctIndex: 1,
      explanation:
        ":invalid matches from the moment the element fails its constraint, including on page load. " +
        "An empty required field is immediately invalid, so it gets a red border even before the user " +
        "has typed anything. The :user-invalid pseudo-class (newer) was introduced to address this UX issue.",
    },

    {
      id: "m1-11",
      code:
        `.parent {\n` +
        `  position: relative;\n` +
        `}\n` +
        `.child {\n` +
        `  position: absolute;\n` +
        `  top: 0;\n` +
        `  right: 0;\n` +
        `}`,
      question: "Where does .child render relative to the page?",
      options: [
        "Top-right corner of the viewport regardless of .parent's position.",
        "Top-right corner of .parent, because .parent is the nearest positioned ancestor.",
        "Top-right corner of the document body.",
        "Directly below .parent due to normal flow rules.",
      ],
      correctIndex: 1,
      explanation:
        "An absolutely-positioned element is placed relative to its nearest positioned ancestor " +
        "(an ancestor with position other than static). Because .parent has position: relative, " +
        ".child anchors to .parent's top-right corner.",
    },

    {
      id: "m1-12",
      scenario:
        "A web form collects a date of birth. The team wants the browser to show a native date picker " +
        "and automatically reject non-date text input without JavaScript.",
      question: "Which input type and attribute combination achieves this?",
      options: [
        `<input type="text" pattern="\\d{4}-\\d{2}-\\d{2}" />`,
        `<input type="date" />`,
        `<input type="datetime-local" />`,
        `<input type="number" min="1900" max="2024" />`,
      ],
      correctIndex: 1,
      explanation:
        'type="date" instructs browsers to render a native date-picker widget and validates ' +
        "that the entered value is a valid date — all without JavaScript. " +
        "datetime-local also includes a time component, which is unnecessary here.",
    },

    // ════════════════════════════════════════════════════════════════════════
    //  SECTION 2 — DOM  (Q13 – Q22)
    // ════════════════════════════════════════════════════════════════════════

    {
      id: "m1-13",
      code: `document.querySelector('#btn').addEventListener('click', handler, true);`,
      question:
        "The third argument `true` changes how the event listener behaves. " +
        "What does it do?",
      options: [
        "It makes the listener fire only once.",
        "It registers the listener in the capture phase instead of the bubble phase.",
        "It enables passive mode, preventing the default action.",
        "It marks the handler as async.",
      ],
      correctIndex: 1,
      explanation:
        "The third argument to addEventListener is useCapture. When true, the listener fires " +
        "during the capture phase (root → target), before reaching the target element. " +
        "When false (default), it fires during the bubble phase (target → root).",
    },

    {
      id: "m1-14",
      code:
        `const parent = document.getElementById('list');\n` +
        `parent.addEventListener('click', (e) => {\n` +
        `  if (e.target.matches('li')) {\n` +
        `    console.log(e.target.textContent);\n` +
        `  }\n` +
        `});`,
      scenario:
        "The <ul id='list'> starts with 3 <li> items. " +
        "JavaScript later appends 3 more <li> items dynamically.",
      question:
        "Will the click handler log text for the dynamically added <li> items?",
      options: [
        "No — event listeners must be re-attached after DOM mutations.",
        "Yes — the handler uses event delegation on the parent, so all current and future children are covered.",
        "Only if MutationObserver is used to detect the new items.",
        "No — e.target.matches() does not work on dynamically created elements.",
      ],
      correctIndex: 1,
      explanation:
        "This is event delegation. The listener sits on the parent <ul>. " +
        "All clicks bubble up from any child <li> — whether original or dynamic — " +
        "and the e.target check filters for <li> elements. " +
        "No re-attachment is needed.",
    },

    {
      id: "m1-15",
      code:
        `const el = document.createElement('div');\n` +
        `el.innerHTML = '<span>Hello</span>';\n` +
        `document.body.appendChild(el);\n` +
        `console.log(document.body.lastChild.firstChild.nodeType);`,
      question: "What does the console.log output?",
      options: [
        "1 — Element node",
        "3 — Text node",
        "8 — Comment node",
        "undefined",
      ],
      correctIndex: 0,
      explanation:
        "body.lastChild is the div we appended; its firstChild is the <span> element. " +
        "Element nodes have nodeType === 1. Text nodes are 3, comments are 8.",
    },

    {
      id: "m1-16",
      code:
        `const items = document.querySelectorAll('.item');\n` +
        `items.forEach(item => item.classList.toggle('active'));\n\n` +
        `// Later in the code:\n` +
        `document.querySelector('.container').innerHTML += '<div class="item"></div>';\n` +
        `console.log(items.length);`,
      question: "What does `items.length` print after the innerHTML change?",
      options: [
        "The updated count including the newly added .item.",
        "The original count — querySelectorAll returns a static NodeList.",
        "0 — innerHTML resets all selections.",
        "It throws a TypeError because the NodeList is stale.",
      ],
      correctIndex: 1,
      explanation:
        "querySelectorAll returns a static NodeList — a snapshot taken at query time. " +
        "It does not update when the DOM changes. The newly added .item is not reflected " +
        "in `items`. To get a live collection, use getElementsByClassName.",
    },

    {
      id: "m1-17",
      scenario:
        "A developer attaches a click listener to a button inside a modal. " +
        "When the modal is removed from the DOM via removeChild(), a memory leak is suspected.",
      question: "What is the most likely cause of the memory leak?",
      options: [
        "removeChild only removes visual rendering but keeps the node in memory.",
        "If a variable in the outer scope holds a reference to the removed element or its listener, the GC cannot reclaim it.",
        "Click event listeners persist in the browser's event queue indefinitely.",
        "innerHTML is required to fully destroy DOM nodes.",
      ],
      correctIndex: 1,
      explanation:
        "Garbage collection can only reclaim objects with no reachable references. " +
        "If a JavaScript variable (e.g., a closure or outer-scope variable) still references " +
        "the removed element or its event handler, neither the DOM node nor the listener " +
        "will be collected — causing a memory leak.",
    },

    {
      id: "m1-18",
      code:
        `document.getElementById('input').addEventListener('input', (e) => {\n` +
        `  console.log(e.target.value);\n` +
        `});\n` +
        `document.getElementById('input').addEventListener('change', (e) => {\n` +
        `  console.log('Changed:', e.target.value);\n` +
        `});`,
      question:
        "A user types 'abc' one character at a time, then clicks away. " +
        "How many times does each event fire?",
      options: [
        "input fires 3 times; change fires 3 times.",
        "input fires 3 times; change fires 1 time (on blur, if value changed).",
        "input fires 1 time; change fires 1 time.",
        "Both events fire the same number of times for text inputs.",
      ],
      correctIndex: 1,
      explanation:
        "The input event fires on every keystroke (3 times for 'a', 'b', 'c'). " +
        "The change event fires once when the element loses focus and its value differs " +
        "from when it gained focus.",
    },

    {
      id: "m1-19",
      code:
        `function handleClick(e) {\n` +
        `  e.stopPropagation();\n` +
        `  console.log('button clicked');\n` +
        `}\n` +
        `document.body.addEventListener('click', () => console.log('body clicked'));\n` +
        `document.querySelector('button').addEventListener('click', handleClick);`,
      question: "When the button is clicked, what is logged?",
      options: [
        "'button clicked' then 'body clicked'",
        "'body clicked' then 'button clicked'",
        "Only 'button clicked'",
        "Only 'body clicked'",
      ],
      correctIndex: 2,
      explanation:
        "e.stopPropagation() prevents the event from bubbling further up the DOM tree. " +
        "The button's own handler runs ('button clicked'), but the event never reaches " +
        "the body listener.",
    },

    {
      id: "m1-20",
      code:
        `const style = document.querySelector('.card').style;\n` +
        `style.backgroundColor = 'tomato';\n` +
        `style.fontSize = '18px';`,
      scenario:
        "The team's code review flags this pattern as a maintenance anti-pattern " +
        "for production code. What is the preferred alternative?",
      question:
        "Which approach is better for applying multiple style changes at once?",
      options: [
        "Use setAttribute('style', ...) with a concatenated string.",
        "Toggle or add a CSS class defined in a stylesheet instead of setting inline styles.",
        "Use requestAnimationFrame before setting each property.",
        "Use element.cssText with all properties combined.",
      ],
      correctIndex: 1,
      explanation:
        "Directly manipulating .style hard-codes presentation in JavaScript. " +
        "Best practice is to define state-based classes in CSS and toggle them with " +
        "classList.add / classList.toggle. This keeps style concerns in CSS, " +
        "simplifies JS, and is easier to maintain.",
    },

    {
      id: "m1-21",
      code:
        `const frag = document.createDocumentFragment();\n` +
        `for (let i = 0; i < 500; i++) {\n` +
        `  const li = document.createElement('li');\n` +
        `  li.textContent = \`Item \${i}\`;\n` +
        `  frag.appendChild(li);\n` +
        `}\n` +
        `document.querySelector('ul').appendChild(frag);`,
      question:
        "Why is DocumentFragment used here instead of appending directly to the <ul> in each loop iteration?",
      options: [
        "DocumentFragment allows asynchronous DOM writes.",
        "Appending to the fragment batches all 500 DOM insertions into a single reflow/repaint, improving performance.",
        "Direct appendChild on <ul> would throw a maximum call stack error at 500 items.",
        "DocumentFragment automatically sorts children alphabetically.",
      ],
      correctIndex: 1,
      explanation:
        "Each appendChild directly on a live DOM node triggers a reflow and repaint. " +
        "DocumentFragment is off-screen; all 500 nodes are built there and inserted " +
        "with a single DOM operation, causing only one reflow.",
    },

    {
      id: "m1-22",
      code:
        `const el = document.querySelector('#box');\n` +
        `el.setAttribute('data-user-id', '42');\n` +
        `console.log(el.dataset.userId);`,
      question: "What does the console.log output?",
      options: [
        "undefined — dataset uses the raw attribute name.",
        "'42' — dataset converts kebab-case attribute names to camelCase.",
        "'data-user-id' — dataset returns the full attribute name.",
        "42 (number) — dataset auto-converts numeric strings.",
      ],
      correctIndex: 1,
      explanation:
        "The HTMLElement.dataset API maps data-* attributes to camelCase properties. " +
        "data-user-id becomes dataset.userId. The value is always a string, so '42' is returned.",
    },

    // ════════════════════════════════════════════════════════════════════════
    //  SECTION 3 — TYPESCRIPT  (Q23 – Q40)
    // ════════════════════════════════════════════════════════════════════════

    {
      id: "m1-23",
      code:
        `function merge<T, U>(obj1: T, obj2: U): T & U {\n` +
        `  return { ...obj1, ...obj2 };\n` +
        `}\n` +
        `const result = merge({ name: 'Ada' }, { age: 36 });\n` +
        `console.log(result.name, result.age);`,
      question: "What does TypeScript infer as the return type of merge()?",
      options: [
        "{ name: string } | { age: number }",
        "{ name: string } & { age: number }",
        "Record<string, unknown>",
        "T | U",
      ],
      correctIndex: 1,
      explanation:
        "The return type T & U is an intersection type — an object that satisfies both T and U. " +
        "TypeScript infers T as { name: string } and U as { age: number }, so the return type " +
        "is { name: string } & { age: number }.",
    },

    {
      id: "m1-24",
      code:
        `interface Animal {\n` +
        `  name: string;\n` +
        `  sound(): string;\n` +
        `}\n` +
        `class Dog implements Animal {\n` +
        `  name: string;\n` +
        `  constructor(n: string) { this.name = n; }\n` +
        `  sound() { return 'Woof'; }\n` +
        `  fetch() { return 'Fetching!'; }\n` +
        `}\n` +
        `const pet: Animal = new Dog('Rex');\n` +
        `pet.fetch();`,
      question: "What happens when `pet.fetch()` is called?",
      options: [
        "It works fine because the underlying object is a Dog.",
        "TypeScript throws a runtime error.",
        "TypeScript shows a compile-time error: Property 'fetch' does not exist on type 'Animal'.",
        "It returns undefined silently.",
      ],
      correctIndex: 2,
      explanation:
        "Even though the runtime object is a Dog, the declared type of `pet` is Animal. " +
        "TypeScript uses structural typing at compile time — `fetch` is not on the Animal " +
        "interface, so accessing it is a compile error.",
    },

    {
      id: "m1-25",
      code:
        `type Status = 'open' | 'closed' | 'pending';\n\n` +
        `function handleStatus(s: Status): string {\n` +
        `  switch (s) {\n` +
        `    case 'open':    return 'In progress';\n` +
        `    case 'closed':  return 'Done';\n` +
        `    default:\n` +
        `      const _check: never = s;\n` +
        `      return _check;\n` +
        `  }\n` +
        `}`,
      question:
        "What is the purpose of assigning `s` to a `never` type in the default case?",
      options: [
        "It is a runtime guard that prevents invalid states from executing.",
        "It is an exhaustiveness check — the compiler errors if a new Status value is added but not handled in the switch.",
        "never is a special type that causes the function to return null.",
        "It prevents the TypeScript compiler from widening the type of `s`.",
      ],
      correctIndex: 1,
      explanation:
        "This is the exhaustive check pattern. If all cases are covered, the default branch " +
        "is unreachable and `s` narrows to `never`. If a new union member (e.g., 'archived') " +
        "is added to Status without a matching case, TypeScript flags `const _check: never = s` " +
        "as an error, forcing the developer to handle it.",
    },

    {
      id: "m1-26",
      code:
        `class ApiService {\n` +
        `  private readonly baseUrl: string;\n` +
        `  constructor(url: string) {\n` +
        `    this.baseUrl = url;\n` +
        `  }\n` +
        `  protected buildPath(path: string): string {\n` +
        `    return \`\${this.baseUrl}/\${path}\`;\n` +
        `  }\n` +
        `}\n` +
        `const svc = new ApiService('https://api.example.com');\n` +
        `svc.baseUrl;\n` +
        `svc.buildPath('users');`,
      question:
        "Which of the two property accesses will produce a TypeScript compile error?",
      options: [
        "Only svc.baseUrl — private members are inaccessible outside the class.",
        "Only svc.buildPath('users') — protected members are inaccessible outside the class.",
        "Both will error.",
        "Neither will error — access modifiers are only enforced inside class bodies.",
      ],
      correctIndex: 2,
      explanation:
        "private restricts access to the declaring class only. " +
        "protected restricts access to the declaring class and its subclasses — " +
        "it is still inaccessible on an instance from outside the class hierarchy. " +
        "Both svc.baseUrl (private) and svc.buildPath (protected) are accessed " +
        "directly on an instance from outside the class, so both produce compile errors.",
    },

    {
      id: "m1-27",
      code:
        `async function fetchUser(id: number): Promise<{ name: string }> {\n` +
        `  const res = await fetch(\`/api/user/\${id}\`);\n` +
        `  return res.json();\n` +
        `}\n` +
        `fetchUser(1).then(u => console.log(u.name));`,
      question:
        "What does TypeScript infer as the type of `u` inside the .then() callback?",
      options: [
        "Promise<{ name: string }>",
        "{ name: string }",
        "unknown",
        "any",
      ],
      correctIndex: 1,
      explanation:
        "When a Promise<T> is resolved via .then(callback), TypeScript infers the callback " +
        "argument as T. Here T is { name: string }, so `u` is typed as { name: string }.",
    },

    {
      id: "m1-28",
      code:
        `type Readonly2<T> = {\n` +
        `  readonly [K in keyof T]: T[K];\n` +
        `};\n` +
        `const config: Readonly2<{ host: string; port: number }> = {\n` +
        `  host: 'localhost',\n` +
        `  port: 3000,\n` +
        `};\n` +
        `config.port = 8080;`,
      question: "What is the outcome of `config.port = 8080`?",
      options: [
        "It updates the port value at runtime.",
        "TypeScript shows a compile error: Cannot assign to 'port' because it is a read-only property.",
        "TypeScript narrows the type of config.port to 8080.",
        "The readonly modifier only applies to class properties, not mapped types.",
      ],
      correctIndex: 1,
      explanation:
        "The mapped type Readonly2 adds readonly to every property. " +
        "Assigning to config.port after initialisation violates the readonly constraint, " +
        "producing a compile-time error.",
    },

    {
      id: "m1-29",
      code:
        `function printLength(value: string | string[]): void {\n` +
        `  if (typeof value === 'string') {\n` +
        `    console.log(value.length);\n` +
        `  } else {\n` +
        `    value.forEach(v => console.log(v.length));\n` +
        `  }\n` +
        `}`,
      question:
        "What TypeScript feature is demonstrated by the `typeof` check inside the function?",
      options: [
        "Type casting",
        "Type narrowing / type guard",
        "Generic constraint",
        "Discriminated union",
      ],
      correctIndex: 1,
      explanation:
        "typeof value === 'string' is a type guard. TypeScript narrows the type of `value` " +
        "inside each branch: it's string in the if-block and string[] in the else-block. " +
        "This is called type narrowing.",
    },

    {
      id: "m1-30",
      code:
        `interface User {\n` +
        `  id: number;\n` +
        `  name: string;\n` +
        `  email?: string;\n` +
        `}\n` +
        `function greet(user: Pick<User, 'id' | 'name'>): string {\n` +
        `  return \`Hello \${user.name}\`;\n` +
        `}`,
      question:
        "If greet() is called with a full User object `{ id: 1, name: 'Ada', email: 'a@b.com' }`, what happens?",
      options: [
        "TypeScript errors because the argument has extra properties not in Pick<User, 'id' | 'name'>.",
        "It works — TypeScript uses structural compatibility; extra properties are allowed when passing an object reference.",
        "It works only if the object is first cast with `as`.",
        "TypeScript strips the email property before passing the argument.",
      ],
      correctIndex: 1,
      explanation:
        "TypeScript's excess property check only applies to object literals passed directly " +
        "as arguments. When you pass a variable, the structural type system is used — " +
        "the variable satisfies Pick<User,'id'|'name'> because it has at minimum the required fields.",
    },

    {
      id: "m1-31",
      code:
        `class EventEmitter {\n` +
        `  private listeners: Map<string, Function[]> = new Map();\n\n` +
        `  on(event: string, fn: Function): void {\n` +
        `    const fns = this.listeners.get(event) ?? [];\n` +
        `    this.listeners.set(event, [...fns, fn]);\n` +
        `  }\n\n` +
        `  emit(event: string, ...args: unknown[]): void {\n` +
        `    this.listeners.get(event)?.forEach(fn => fn(...args));\n` +
        `  }\n` +
        `}`,
      question:
        "What does the `??` operator do in `this.listeners.get(event) ?? []`?",
      options: [
        "It is the logical OR operator — returns [] if the left side is falsy.",
        "It is the nullish coalescing operator — returns [] only if the left side is null or undefined.",
        "It throws a TypeError if the Map does not contain the key.",
        "It merges two arrays together.",
      ],
      correctIndex: 1,
      explanation:
        "The nullish coalescing operator (??) returns the right-hand side only when the left side " +
        "is null or undefined. Unlike ||, it does not trigger on other falsy values (0, '', false). " +
        "So if the Map has no entry for the event, [] is returned.",
    },

    {
      id: "m1-32",
      code:
        `import { fetchData } from './api';\n\n` +
        `async function loadUsers(): Promise<void> {\n` +
        `  try {\n` +
        `    const users = await fetchData('/users');\n` +
        `    console.log(users);\n` +
        `  } catch (err) {\n` +
        `    console.error('Failed:', err);\n` +
        `  }\n` +
        `}`,
      question: "If fetchData rejects with a network error, what happens?",
      options: [
        "The rejection propagates unhandled and crashes the process.",
        "The catch block executes and logs 'Failed:' along with the error.",
        "TypeScript converts the rejection into a resolved Promise with undefined.",
        "The async function returns a rejected Promise silently.",
      ],
      correctIndex: 1,
      explanation:
        "When an awaited Promise rejects, the rejection is converted into a thrown exception " +
        "at the await point. The surrounding try/catch captures it and the catch block runs.",
    },

    {
      id: "m1-33",
      code:
        `export interface Config {\n` +
        `  timeout: number;\n` +
        `  retries: number;\n` +
        `}\n\n` +
        `// In another file:\n` +
        `import type { Config } from './config';\n` +
        `const defaults: Config = { timeout: 3000, retries: 3 };`,
      question:
        "What is the advantage of `import type` over a regular `import`?",
      options: [
        "import type allows importing values as well as types.",
        "import type is erased at compile time and produces no runtime JavaScript — reducing bundle size.",
        "import type enables lazy loading of the module.",
        "import type makes the imported interface immutable.",
      ],
      correctIndex: 1,
      explanation:
        "import type tells the TypeScript compiler that the import is only needed for type checking. " +
        "The import is completely removed from the compiled JavaScript output, which helps " +
        "avoid circular dependency issues and keeps bundles lean.",
    },

    {
      id: "m1-34",
      code:
        `class Repository<T extends { id: number }> {\n` +
        `  private store: T[] = [];\n\n` +
        `  add(item: T): void {\n` +
        `    this.store.push(item);\n` +
        `  }\n\n` +
        `  findById(id: number): T | undefined {\n` +
        `    return this.store.find(item => item.id === id);\n` +
        `  }\n` +
        `}`,
      question: "The constraint `T extends { id: number }` does what?",
      options: [
        "It forces T to be exactly the type { id: number } with no other properties.",
        "It ensures that any type used for T must have at least an `id` property of type number.",
        "It makes the id property readonly on T.",
        "It prevents the class from being instantiated with primitive types.",
      ],
      correctIndex: 1,
      explanation:
        "Generic constraints define a minimum shape. T extends { id: number } means " +
        "T must have an id: number property but may have additional properties. " +
        "This lets the findById method safely access item.id on any stored object.",
    },

    {
      id: "m1-35",
      code:
        `const obj = {\n` +
        `  value: 10,\n` +
        `  double() {\n` +
        `    return this.value * 2;\n` +
        `  }\n` +
        `};\n` +
        `const fn = obj.double;\n` +
        `console.log(fn());`,
      question: "What does `fn()` return in strict TypeScript/JavaScript?",
      options: [
        "20 — this refers to obj.",
        "NaN — this is undefined in strict mode, so this.value is undefined.",
        "0 — this defaults to the global object in strict mode.",
        "A TypeError at compile time.",
      ],
      correctIndex: 1,
      explanation:
        "When a method is extracted into a standalone variable and called without a receiver, " +
        "this is undefined in strict mode. Accessing undefined.value produces undefined, " +
        "and undefined * 2 = NaN.",
    },

    {
      id: "m1-36",
      code:
        `interface Logger {\n` +
        `  log(message: string): void;\n` +
        `}\n` +
        `interface Formatter {\n` +
        `  format(data: unknown): string;\n` +
        `}\n` +
        `class ConsoleLogger implements Logger, Formatter {\n` +
        `  log(message: string) { console.log(message); }\n` +
        `  format(data: unknown) { return JSON.stringify(data); }\n` +
        `}`,
      question:
        "What TypeScript concept allows ConsoleLogger to satisfy both Logger and Formatter?",
      options: [
        "Multiple inheritance — classes can extend multiple base classes.",
        "Interface merging — Logger and Formatter are automatically combined.",
        "A class can implement multiple interfaces, satisfying the contracts of all of them.",
        "Duck typing — TypeScript automatically detects that the class matches both interfaces.",
      ],
      correctIndex: 2,
      explanation:
        "TypeScript allows a class to implement multiple interfaces using a comma-separated list. " +
        "The class must provide all members declared across all implemented interfaces. " +
        "Note: TypeScript does not support extending multiple classes.",
    },

    {
      id: "m1-37",
      code:
        `let x: unknown = 'hello';\n` +
        `// Option A\n` +
        `console.log((x as string).toUpperCase());\n` +
        `// Option B\n` +
        `if (typeof x === 'string') {\n` +
        `  console.log(x.toUpperCase());\n` +
        `}`,
      question: "Which approach is safer and why?",
      options: [
        "Option A — type assertion is faster and produces more optimised code.",
        "Option B — the typeof guard narrows the type at runtime, so toUpperCase() is only called when x truly is a string.",
        "Both are equally safe; they produce identical compiled output.",
        "Neither is safe — unknown cannot be used with string methods.",
      ],
      correctIndex: 1,
      explanation:
        "as string (Option A) is a compile-time assertion that bypasses safety checks. " +
        "If x is not actually a string at runtime, calling toUpperCase() throws. " +
        "Option B uses a runtime check — the method is only called when x is genuinely a string, " +
        "making it the safer approach.",
    },

    {
      id: "m1-38",
      code:
        `function delay(ms: number): Promise<void> {\n` +
        `  return new Promise(resolve => setTimeout(resolve, ms));\n` +
        `}\n\n` +
        `async function runSequence(): Promise<void> {\n` +
        `  console.log('start');\n` +
        `  await delay(1000);\n` +
        `  console.log('after 1s');\n` +
        `  await delay(500);\n` +
        `  console.log('after 0.5s more');\n` +
        `}`,
      question:
        "What is the total minimum elapsed time before 'after 0.5s more' is logged?",
      options: [
        "500ms",
        "1000ms",
        "1500ms",
        "Both delays run in parallel so only 1000ms.",
      ],
      correctIndex: 2,
      explanation:
        "Each await suspends execution until the promise resolves. The delays are sequential, not parallel. " +
        "First delay: 1000ms. Second delay: 500ms. Total: 1500ms minimum.",
    },

    {
      id: "m1-39",
      code:
        `type DeepPartial<T> = {\n` +
        `  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];\n` +
        `};`,
      question: "What does this utility type do?",
      options: [
        "Makes all properties required recursively.",
        "Makes all properties optional at every nesting level recursively.",
        "Makes top-level properties optional but leaves nested objects unchanged.",
        "It is invalid TypeScript — conditional types cannot be recursive.",
      ],
      correctIndex: 1,
      explanation:
        "This is a recursive mapped type. For each property K in T, it adds ?:. " +
        "If the value type is an object, it recursively applies DeepPartial to it. " +
        "Otherwise, it leaves the primitive type as-is. The result: optional properties at all depths.",
    },

    {
      id: "m1-40",
      code:
        `enum Direction {\n` +
        `  Up = 'UP',\n` +
        `  Down = 'DOWN',\n` +
        `  Left = 'LEFT',\n` +
        `  Right = 'RIGHT',\n` +
        `}\n\n` +
        `function move(dir: Direction): string {\n` +
        `  return \`Moving \${dir}\`;\n` +
        `}\n` +
        `move('UP');`,
      question: "Does `move('UP')` compile successfully?",
      options: [
        "Yes — 'UP' is the value of Direction.Up so TypeScript accepts it.",
        "No — TypeScript requires Direction.Up; a raw string literal is not assignable to Direction.",
        "Yes — string enums accept their underlying string values.",
        "Only if the function signature uses string instead of Direction.",
      ],
      correctIndex: 1,
      explanation:
        "String enums in TypeScript are nominal, not structural. Even though Direction.Up has " +
        "the value 'UP', the literal 'UP' is not assignable to type Direction. " +
        "You must use Direction.Up explicitly.",
    },

    // ════════════════════════════════════════════════════════════════════════
    //  SECTION 4 — PLAYWRIGHT  (Q41 – Q60)
    // ════════════════════════════════════════════════════════════════════════

    {
      id: "m1-41",
      code:
        `import { test, expect } from '@playwright/test';\n\n` +
        `test('login flow', async ({ page }) => {\n` +
        `  await page.goto('https://example.com/login');\n` +
        `  await page.fill('#username', 'admin');\n` +
        `  await page.fill('#password', 'secret');\n` +
        `  await page.click('#submit');\n` +
        `  await expect(page).toHaveURL('/dashboard');\n` +
        `});`,
      question:
        "The test fails intermittently because the dashboard URL sometimes takes more than the default timeout to load. " +
        "What is the best fix?",
      options: [
        "Add `await page.waitForTimeout(3000)` before the URL assertion.",
        "Increase the assertion timeout using `expect(page, { timeout: 10000 }).toHaveURL('/dashboard')`.",
        "Wrap the assertion in a try/catch and retry manually.",
        "Use page.reload() before the assertion.",
      ],
      correctIndex: 1,
      explanation:
        "Playwright assertions have their own timeout distinct from the navigation timeout. " +
        "Passing { timeout: 10000 } to expect instructs Playwright to keep retrying the " +
        "assertion for up to 10s. Hard-coded waitForTimeout is an anti-pattern that makes " +
        "tests brittle and slow.",
    },

    {
      id: "m1-42",
      code:
        `test('table row count', async ({ page }) => {\n` +
        `  await page.goto('/reports');\n` +
        `  const rows = page.locator('table tbody tr');\n` +
        `  await expect(rows).toHaveCount(5);\n` +
        `});`,
      scenario:
        "The test runs in CI and occasionally fails with 'Expected: 5 / Received: 3'. " +
        "The page loads the table rows via an async API call after the initial render.",
      question: "How should the test be fixed?",
      options: [
        "Add waitForTimeout(2000) before the locator.",
        "Use page.waitForSelector('table tbody tr:nth-child(5)') before asserting count.",
        "The toHaveCount assertion already auto-retries; the root cause is likely a race in the API, so add a network intercept to mock the response.",
        "Increase the global test timeout in playwright.config.ts.",
      ],
      correctIndex: 2,
      explanation:
        "toHaveCount auto-retries until the expected count is met or the timeout expires. " +
        "Intermittent failures point to a network race, not a locator issue. " +
        "Mocking the API with page.route() makes the test deterministic regardless of network latency.",
    },

    {
      id: "m1-43",
      code:
        `// playwright.config.ts\n` +
        `export default defineConfig({\n` +
        `  use: {\n` +
        `    storageState: 'auth.json',\n` +
        `  },\n` +
        `});`,
      question: "What problem does storageState solve in Playwright?",
      options: [
        "It persists test output artifacts between runs.",
        "It reuses saved cookies and localStorage so tests can skip the login flow and start already authenticated.",
        "It stores the browser binary cache for faster launches.",
        "It enables cross-test shared state management.",
      ],
      correctIndex: 1,
      explanation:
        "storageState allows you to save the browser's authentication state (cookies, localStorage) " +
        "to a JSON file after a one-time login. Subsequent tests load this state and start authenticated, " +
        "avoiding repeated login flows and speeding up the suite.",
    },

    {
      id: "m1-44",
      code:
        `test('intercept API', async ({ page }) => {\n` +
        `  await page.route('**/api/products', route => {\n` +
        `    route.fulfill({\n` +
        `      status: 200,\n` +
        `      contentType: 'application/json',\n` +
        `      body: JSON.stringify([{ id: 1, name: 'Mock Product' }]),\n` +
        `    });\n` +
        `  });\n` +
        `  await page.goto('/shop');\n` +
        `  await expect(page.locator('.product-name')).toHaveText('Mock Product');\n` +
        `});`,
      question: "What does `page.route()` achieve in this test?",
      options: [
        "It records real API traffic for later playback.",
        "It intercepts the network request matching the URL pattern and returns a mocked response, isolating the test from the real backend.",
        "It blocks all network requests to prevent test pollution.",
        "It throttles the API request to simulate slow networks.",
      ],
      correctIndex: 1,
      explanation:
        "page.route() intercepts matching requests before they reach the network. " +
        "route.fulfill() responds with a controlled payload. This isolates UI tests from " +
        "backend instability and allows testing specific data scenarios deterministically.",
    },

    {
      id: "m1-45",
      code:
        `// pages/LoginPage.ts\n` +
        `export class LoginPage {\n` +
        `  constructor(private page: Page) {}\n\n` +
        `  async login(user: string, pass: string) {\n` +
        `    await this.page.fill('#username', user);\n` +
        `    await this.page.fill('#password', pass);\n` +
        `    await this.page.click('#submit');\n` +
        `  }\n` +
        `}\n\n` +
        `// tests/login.spec.ts\n` +
        `test('admin login', async ({ page }) => {\n` +
        `  const login = new LoginPage(page);\n` +
        `  await login.login('admin', 'secret');\n` +
        `  await expect(page).toHaveURL('/dashboard');\n` +
        `});`,
      question:
        "A developer asks: why maintain a LoginPage class instead of duplicating the fill/click calls in every test?",
      options: [
        "Playwright requires POM; tests that don't use it will not run.",
        "POM centralises selectors and actions — if the login form changes, only the LoginPage class needs updating, not every test file.",
        "POM allows tests to run faster by caching element references.",
        "POM classes are automatically shared across parallel test workers.",
      ],
      correctIndex: 1,
      explanation:
        "The Page Object Model (POM) encapsulates page interactions. When UI selectors or flows change, " +
        "only the page class is updated, keeping tests DRY and maintainable. Without POM, " +
        "a selector change requires hunting through every test file.",
    },

    {
      id: "m1-46",
      code:
        `test.describe('Checkout', () => {\n` +
        `  test.beforeEach(async ({ page }) => {\n` +
        `    await page.goto('/cart');\n` +
        `  });\n\n` +
        `  test('verify total', async ({ page }) => { /* ... */ });\n` +
        `  test('apply coupon', async ({ page }) => { /* ... */ });\n` +
        `});`,
      question: "What does test.beforeEach() guarantee in this describe block?",
      options: [
        "The /cart page is visited once before all tests in the block run.",
        "The /cart page is visited before every individual test in the describe block.",
        "It sets a global base URL for the entire test file.",
        "It shares the same page instance between all tests.",
      ],
      correctIndex: 1,
      explanation:
        "beforeEach runs once before each individual test in the enclosing describe block. " +
        "Both 'verify total' and 'apply coupon' will independently navigate to /cart before executing. " +
        "Use beforeAll() if you need setup to run only once.",
    },

    {
      id: "m1-47",
      code:
        `test('soft assertions', async ({ page }) => {\n` +
        `  await page.goto('/profile');\n` +
        `  await expect.soft(page.locator('#name')).toHaveText('Ada');\n` +
        `  await expect.soft(page.locator('#role')).toHaveText('Engineer');\n` +
        `  await expect.soft(page.locator('#email')).toHaveText('ada@example.com');\n` +
        `  await page.click('#save');\n` +
        `});`,
      question: "If the #role assertion fails, what happens next?",
      options: [
        "The test immediately fails and the remaining assertions and actions are skipped.",
        "The failure is recorded but execution continues; subsequent assertions and the #save click still run.",
        "Playwright retries the #role assertion indefinitely.",
        "The other soft assertions are skipped but #save is still clicked.",
      ],
      correctIndex: 1,
      explanation:
        "expect.soft() records assertion failures without stopping the test. " +
        "All remaining steps execute. At the end of the test, Playwright marks it as failed " +
        "if any soft assertion failed, allowing you to see all failures in one run.",
    },

    {
      id: "m1-48",
      code:
        `// playwright.config.ts\n` +
        `export default defineConfig({\n` +
        `  projects: [\n` +
        `    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },\n` +
        `    { name: 'firefox',  use: { ...devices['Desktop Firefox'] } },\n` +
        `    { name: 'webkit',   use: { ...devices['Desktop Safari'] } },\n` +
        `  ]\n` +
        `});`,
      question:
        "A team runs 10 tests with this config. How many total test executions occur?",
      options: [
        "10 — tests are deduplicated across browsers.",
        "20 — Playwright runs in pairs for comparison.",
        "30 — each test runs once per project (3 browsers × 10 tests).",
        "Depends on the `workers` setting.",
      ],
      correctIndex: 2,
      explanation:
        "Each project in the config represents a browser/device configuration. " +
        "Playwright runs every test file against every project. " +
        "3 projects × 10 tests = 30 total test executions.",
    },

    {
      id: "m1-49",
      code:
        `test('dropdown selection', async ({ page }) => {\n` +
        `  await page.goto('/settings');\n` +
        `  await page.selectOption('#timezone', 'Asia/Kolkata');\n` +
        `  await expect(page.locator('#timezone')).toHaveValue('Asia/Kolkata');\n` +
        `});`,
      question:
        "What is the difference between page.selectOption() and page.click() for dropdowns?",
      options: [
        "selectOption() works only on native <select> elements; click() works on both native and custom dropdowns.",
        "click() is preferred because it simulates real user interaction.",
        "They are identical for native <select> elements.",
        "selectOption() fires a change event but click() does not.",
      ],
      correctIndex: 0,
      explanation:
        "page.selectOption() is specifically designed for native HTML <select> elements. " +
        "It sets the value programmatically. For custom dropdown components (built with divs/uls), " +
        "you need to click the trigger and then click the option, as they don't use <select>.",
    },

    {
      id: "m1-50",
      code:
        `test('new tab', async ({ context }) => {\n` +
        `  const [newPage] = await Promise.all([\n` +
        `    context.waitForEvent('page'),\n` +
        `    page.click('#open-new-tab'),\n` +
        `  ]);\n` +
        `  await newPage.waitForLoadState();\n` +
        `  await expect(newPage).toHaveURL('https://docs.example.com');\n` +
        `});`,
      question:
        "Why are context.waitForEvent('page') and page.click() wrapped in Promise.all()?",
      options: [
        "Promise.all is required to use async operations in Playwright tests.",
        "To avoid a race condition — if click() resolves before waitForEvent is registered, the new tab event would be missed.",
        "To run both operations in parallel to speed up the test.",
        "Playwright requires all tab operations to be wrapped in Promise.all.",
      ],
      correctIndex: 1,
      explanation:
        "If click() is awaited first and the new tab opens before waitForEvent is registered, " +
        "the 'page' event fires and is lost. Promise.all registers the listener first " +
        "(synchronously) and then awaits both, ensuring the event is captured.",
    },

    {
      id: "m1-51",
      code:
        `test('file upload', async ({ page }) => {\n` +
        `  await page.goto('/upload');\n` +
        `  await page.setInputFiles('#file-input', 'tests/fixtures/sample.pdf');\n` +
        `  await page.click('#upload-btn');\n` +
        `  await expect(page.locator('.success-msg')).toBeVisible();\n` +
        `});`,
      question:
        "The test passes locally but fails in CI with 'file not found'. What is the most likely cause?",
      options: [
        "setInputFiles() does not work in headless mode.",
        "The file path is relative; in CI the working directory may differ. Use path.join(__dirname, '...') for an absolute path.",
        "CI environments block file system access for security.",
        "PDF files cannot be used with setInputFiles(); only images are supported.",
      ],
      correctIndex: 1,
      explanation:
        "Relative paths resolve against the current working directory (CWD), which differs " +
        "between local runs (project root) and CI. Using path.join(__dirname, 'fixtures/sample.pdf') " +
        "produces an absolute path relative to the test file, ensuring it resolves correctly everywhere.",
    },

    {
      id: "m1-52",
      code:
        `test('localStorage', async ({ page }) => {\n` +
        `  await page.goto('/app');\n` +
        `  await page.evaluate(() => {\n` +
        `    localStorage.setItem('theme', 'dark');\n` +
        `  });\n` +
        `  await page.reload();\n` +
        `  const theme = await page.evaluate(() => localStorage.getItem('theme'));\n` +
        `  expect(theme).toBe('dark');\n` +
        `});`,
      question: "Does localStorage persist across page.reload() in Playwright?",
      options: [
        "No — page.reload() clears all storage by default.",
        "Yes — localStorage persists across reloads within the same browser context.",
        "Only if storageState is configured.",
        "No — evaluate() results are not persisted in the page's storage.",
      ],
      correctIndex: 1,
      explanation:
        "localStorage is a browser-origin-scoped storage that persists across page reloads " +
        "within the same browser context. page.reload() re-fetches the page but does not " +
        "clear localStorage, so the theme value survives.",
    },

    {
      id: "m1-53",
      code:
        `// fixtures.ts\n` +
        `import { test as base } from '@playwright/test';\n` +
        `import { LoginPage } from './pages/LoginPage';\n\n` +
        `type Fixtures = { loginPage: LoginPage };\n\n` +
        `export const test = base.extend<Fixtures>({\n` +
        `  loginPage: async ({ page }, use) => {\n` +
        `    const lp = new LoginPage(page);\n` +
        `    await use(lp);\n` +
        `  },\n` +
        `});`,
      question: "What is the purpose of `await use(lp)` inside the fixture?",
      options: [
        "It calls the loginPage object's default method.",
        "It hands the fixture value to the test body; code before use() is setup, code after is teardown.",
        "It marks the fixture as async and prevents synchronous access.",
        "use() registers the fixture globally for all test files.",
      ],
      correctIndex: 1,
      explanation:
        "In Playwright fixtures, use() is the yield point. Everything before await use(lp) " +
        "is setup code; everything after is teardown. The value passed to use() is injected " +
        "into the test as the fixture parameter.",
    },

    {
      id: "m1-54",
      code:
        `test('visible element', async ({ page }) => {\n` +
        `  await page.goto('/dashboard');\n` +
        `  await expect(page.locator('#alert-banner')).toBeVisible();\n` +
        `  await expect(page.locator('#alert-banner')).toHaveText('Session expires soon');\n` +
        `});`,
      scenario:
        "The alert banner appears only after a 2-second delay on the real page.",
      question:
        "Will toBeVisible() wait for the element to appear, or fail immediately if it's not rendered yet?",
      options: [
        "It fails immediately if the element is not already in the DOM.",
        "It auto-retries until the element is visible or the assertion timeout is exceeded.",
        "It requires an explicit waitForSelector() before it can detect dynamic elements.",
        "It only checks CSS visibility, not DOM presence.",
      ],
      correctIndex: 1,
      explanation:
        "Playwright web-first assertions like toBeVisible() are inherently retrying. " +
        "They poll the element state until the condition is met or the timeout (default 5s) expires. " +
        "No explicit wait is needed for elements that appear asynchronously.",
    },

    {
      id: "m1-55",
      code:
        `test('screenshot on failure', async ({ page }, testInfo) => {\n` +
        `  await page.goto('/checkout');\n` +
        `  // ... test steps ...\n` +
        `  if (testInfo.status !== testInfo.expectedStatus) {\n` +
        `    await page.screenshot({ path: \`screenshots/\${testInfo.title}.png\` });\n` +
        `  }\n` +
        `});`,
      question:
        "What is a cleaner, built-in Playwright way to capture screenshots on test failure?",
      options: [
        "There is no built-in mechanism; manual screenshots are required.",
        "Set `screenshot: 'only-on-failure'` in playwright.config.ts under `use`.",
        "Use test.afterEach() with a manual screenshot call.",
        "Enable `video: 'retain-on-failure'` — Playwright screenshots are derived from video.",
      ],
      correctIndex: 1,
      explanation:
        "Playwright's config supports `screenshot: 'only-on-failure'` under the use block. " +
        "Playwright automatically captures a screenshot when a test fails and attaches it to " +
        "the HTML report. No custom code is needed.",
    },

    {
      id: "m1-56",
      code:
        `test('text locator', async ({ page }) => {\n` +
        `  await page.goto('/products');\n` +
        `  await page.getByRole('button', { name: 'Add to cart' }).click();\n` +
        `});`,
      scenario:
        "The page has 5 product cards, each with its own 'Add to cart' button. " +
        "The test clicks and the assertion fails unexpectedly.",
      question: "Why does the test fail, and how should it be fixed?",
      options: [
        "getByRole doesn't support buttons with multi-word names.",
        "The locator matches multiple elements; Playwright errors when an action targets a non-unique locator. Scope it with .first() or filter by a specific product.",
        "Role-based locators cannot be combined with click().",
        "Add to cart is a reserved keyword in Playwright.",
      ],
      correctIndex: 1,
      explanation:
        "Playwright's action methods require a locator to resolve to a single element. " +
        "When multiple elements match, an error is thrown. " +
        "Fix: scope the locator — e.g., page.locator('.product-card').first().getByRole('button', { name: 'Add to cart' }), " +
        "or filter by product name.",
    },

    {
      id: "m1-57",
      code:
        `test.describe.configure({ mode: 'parallel' });\n\n` +
        `test('test A', async ({ page }) => { /* writes to DB */ });\n` +
        `test('test B', async ({ page }) => { /* reads from DB written by A */ });`,
      question: "What is the risk of running these tests in parallel?",
      options: [
        "Parallel mode is not supported inside describe blocks.",
        "Test B may run before Test A completes, causing it to read stale/absent data and fail non-deterministically.",
        "Playwright cannot run database tests in parallel.",
        "The page fixture cannot be shared across parallel tests.",
      ],
      correctIndex: 1,
      explanation:
        "Parallel execution does not guarantee ordering. If Test B reads data that Test A " +
        "writes, and B starts before A finishes, the data may not exist yet. Tests that " +
        "share state should run serially (mode: 'serial') or use isolated data per test.",
    },

    {
      id: "m1-58",
      code:
        `test('cookie auth', async ({ context }) => {\n` +
        `  await context.addCookies([{\n` +
        `    name: 'session_id',\n` +
        `    value: 'abc123',\n` +
        `    domain: 'example.com',\n` +
        `    path: '/',\n` +
        `  }]);\n` +
        `  const page = await context.newPage();\n` +
        `  await page.goto('https://example.com/dashboard');\n` +
        `  await expect(page).toHaveURL('https://example.com/dashboard');\n` +
        `});`,
      question:
        "Why is context.addCookies() preferred over page.goto('/login') + credential fill for auth setup in large suites?",
      options: [
        "addCookies() is the only way to authenticate; credential-based login is not supported.",
        "Injecting the session cookie skips the login UI flow, making setup faster and more resilient to login-form changes.",
        "Cookies are shared across all browser contexts automatically.",
        "Credential-based tests fail in headless mode.",
      ],
      correctIndex: 1,
      explanation:
        "Authenticating via UI flow adds latency and creates a dependency on the login page's " +
        "stability. Injecting a session cookie directly bypasses the UI, making auth setup " +
        "nearly instantaneous and independent of login page changes.",
    },

    {
      id: "m1-59",
      code:
        `test('dynamic element', async ({ page }) => {\n` +
        `  await page.goto('/notifications');\n` +
        `  await page.click('#load-more');\n` +
        `  await page.waitForSelector('.notification-item:nth-child(10)');\n` +
        `  const count = await page.locator('.notification-item').count();\n` +
        `  expect(count).toBeGreaterThanOrEqual(10);\n` +
        `});`,
      question:
        "A reviewer suggests replacing waitForSelector() with a Playwright assertion. Which refactor is better?",
      options: [
        "await page.locator('.notification-item').nth(9).waitFor();",
        "await expect(page.locator('.notification-item')).toHaveCount(10);",
        "await page.waitForFunction(() => document.querySelectorAll('.notification-item').length >= 10);",
        "Option A is correct — Playwright assertions cannot wait for a minimum count.",
      ],
      correctIndex: 0,
      explanation:
        "Option A uses the locator's built-in waitFor() which auto-retries until the 10th element exists. " +
        "Option B asserts an exact count of 10, which would fail if 11 or more items load. " +
        "Since the test only requires at least 10, .nth(9).waitFor() correctly waits " +
        "for at least the 10th element without over-constraining the count.",
    },

    {
      id: "m1-60",
      code:
        `// playwright.config.ts\n` +
        `export default defineConfig({\n` +
        `  reporter: [\n` +
        `    ['list'],\n` +
        `    ['html', { outputFolder: 'playwright-report', open: 'never' }],\n` +
        `    ['junit', { outputFile: 'results.xml' }],\n` +
        `  ],\n` +
        `  retries: 2,\n` +
        `  workers: 4,\n` +
        `});`,
      question:
        "A test fails on the first attempt but passes on the second retry. How does Playwright classify this test in the report?",
      options: [
        "Passed — the final result is a pass.",
        "Failed — any failure attempt means the test failed.",
        "Flaky — it failed at least once before eventually passing.",
        "Skipped — retried tests are excluded from pass/fail counts.",
      ],
      correctIndex: 2,
      explanation:
        "Playwright distinguishes between 'passed', 'failed', and 'flaky'. " +
        "A test is marked flaky when it fails on some attempts but passes on others within the same run. " +
        "Flaky tests are highlighted separately in the HTML report, helping teams identify " +
        "unstable tests that need attention.",
    },
  ],
};
