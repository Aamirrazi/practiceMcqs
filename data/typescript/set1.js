/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║            TYPESCRIPT — LEVEL 1 (BEGINNER)                  ║
 * ║  File: typescript-level1.js                                  ║
 * ║  Questions: 20  |  Mix: scenario + code                      ║
 * ╚══════════════════════════════════════════════════════════════╝
 */
const TypeScriptLevel1 = {
  meta: {
    id: "typescript-level1",
    testTitle: "TypeScript Fundamentals",
    topic: "typescript",
    topicLabel: "TypeScript",
    difficulty: "Beginner",
    questionCount: 20,
    estimatedMinutes: 25,
    description:
      "Core TypeScript concepts: type annotations, interfaces, enums, generics, " +
      "narrowing, and class modifiers. Scenario- and code-based questions.",
    icon: "🔷",
  },

  questions: [
    // ── Q1 ──────────────────────────────────────────────────────────────
    {
      id: "ts1-01",
      code: `let score: number = "excellent";`,
      question: "What does TypeScript report for this assignment?",
      options: [
        "No error; TypeScript coerces the string to NaN at runtime",
        "Type 'string' is not assignable to type 'number'",
        "Variable 'score' is used before being assigned",
        "Cannot redeclare block-scoped variable 'score'",
      ],
      correctIndex: 1,
      explanation:
        "TypeScript enforces static types. Assigning a string literal to a `number`-annotated " +
        "variable is a compile-time error, not a runtime coercion.",
    },

    // ── Q2 ──────────────────────────────────────────────────────────────
    {
      id: "ts1-02",
      scenario:
        "A developer types a config object as `type Config = { host: string; port: number }`. " +
        "A teammate insists on using `interface Config { ... }` instead. " +
        "Neither declaration merging nor class implementation is needed in this project.",
      question: "Which statement best describes the situation?",
      options: [
        "Both produce the same structural type for this use case; the choice is stylistic",
        "Only `interface` supports optional properties with `?`",
        "`type` aliases cannot represent object shapes — only primitives",
        "`interface` compiles to smaller JavaScript output",
      ],
      correctIndex: 0,
      explanation:
        "For plain object shapes, `type` and `interface` are structurally equivalent. " +
        "Interfaces gain an edge when declaration merging or `implements` is needed; " +
        "otherwise the choice is a matter of team convention.",
    },

    // ── Q3 ──────────────────────────────────────────────────────────────
    {
      id: "ts1-03",
      code:
        `function getUser(id: number): string {\n` +
        `  if (id > 0) return "Alice";\n` +
        `}`,
      question: "With `strict` mode enabled, what compiler error is raised?",
      options: [
        "Parameter 'id' implicitly has an 'any' type",
        "Return type 'string' is too narrow for this function",
        "Variable 'id' is unused inside the function body",
        "Function lacks an ending return statement; 'undefined' is not assignable to 'string'",
      ],
      correctIndex: 3,
      explanation:
        "When a function is annotated to return `string` but has a code path that " +
        "returns nothing (implicit `undefined`), TypeScript reports a missing-return error " +
        "under strict mode.",
    },

    // ── Q4 ──────────────────────────────────────────────────────────────
    {
      id: "ts1-04",
      scenario:
        "An API response model is typed as `{ status: number; errorMessage?: string }`. " +
        "A developer writes `response.errorMessage.toUpperCase()` without any null check. " +
        "`strictNullChecks` is enabled in tsconfig.",
      question: "What does TypeScript report on that line?",
      options: [
        "TypeScript silently ignores optional fields in method chains",
        "Object is possibly 'undefined'",
        "The code compiles but throws at runtime when the field is absent",
        "TypeScript widens the type to `string | null` automatically",
      ],
      correctIndex: 1,
      explanation:
        "With `strictNullChecks`, an optional field (`?`) has type `string | undefined`. " +
        "Calling a method on it directly causes a compile-time error because the value " +
        "may be `undefined`.",
    },

    // ── Q5 ──────────────────────────────────────────────────────────────
    {
      id: "ts1-05",
      code: `const el = document.getElementById("search");\n` + `el.focus();`,
      question:
        "With `strictNullChecks` enabled, what does TypeScript report about `el.focus()`?",
      options: [
        "Property 'focus' does not exist on type 'HTMLElement'",
        "Cannot call methods on a const variable",
        "Object is possibly 'null'",
        "'el' is implicitly typed as 'any'",
      ],
      correctIndex: 2,
      explanation:
        "`document.getElementById` returns `HTMLElement | null`. Without a null guard, " +
        "TypeScript raises 'Object is possibly null' when you try to call any method on it.",
    },

    // ── Q6 ──────────────────────────────────────────────────────────────
    {
      id: "ts1-06",
      scenario:
        "A developer declares `readonly id: number` on an interface. " +
        "After an object is created that satisfies the interface, another function " +
        "attempts `obj.id = 99`.",
      question: "What is the result at compile time?",
      options: [
        "TypeScript reports: Cannot assign to 'id' because it is a read-only property",
        "The assignment succeeds; `readonly` only prevents the field from being omitted initially",
        "TypeScript warns but still emits the JavaScript without changes",
        "The error only surfaces when `strict` is set to false in tsconfig",
      ],
      correctIndex: 0,
      explanation:
        "The `readonly` modifier prevents any post-initialisation assignment to the property. " +
        "TypeScript catches this at compile time regardless of whether strict mode is on.",
    },

    // ── Q7 ──────────────────────────────────────────────────────────────
    {
      id: "ts1-07",
      code: `enum Color { Red, Green, Blue }\n` + `console.log(Color.Green);`,
      question: "What value is logged?",
      options: ['"Green"', "2", "1", "undefined"],
      correctIndex: 2,
      explanation:
        "Numeric enums start at 0 by default. `Red = 0`, `Green = 1`, `Blue = 2`. " +
        'So `Color.Green` logs `1`, not the string `"Green"`.',
    },

    // ── Q8 ──────────────────────────────────────────────────────────────
    {
      id: "ts1-08",
      scenario:
        "A function signature reads `function notify(message: string): void`. " +
        'A developer stores its return value: `const result = notify("done")`.',
      question: "What is the TypeScript type of `result`?",
      options: ["string", "null", "undefined", "void"],
      correctIndex: 3,
      explanation:
        "When a function is typed as returning `void`, the stored result has type `void`. " +
        "This signals that the return value is intentionally unusable, even though JavaScript " +
        "would produce `undefined` at runtime.",
    },

    // ── Q9 ──────────────────────────────────────────────────────────────
    {
      id: "ts1-09",
      code: `const ids: number[] = [1, 2, 3];\n` + `ids.push("four");`,
      question: "What TypeScript error is raised?",
      options: [
        "Array 'ids' is readonly and cannot be mutated",
        "Argument of type 'string' is not assignable to parameter of type 'number'",
        "Index out of bounds: array has 3 elements",
        "Type 'string[]' is not assignable to type 'number[]'",
      ],
      correctIndex: 1,
      explanation:
        "`number[]` only accepts `number` values. Pushing a string literal violates " +
        "the type constraint, producing an 'Argument of type string is not assignable' error.",
    },

    // ── Q10 ─────────────────────────────────────────────────────────────
    {
      id: "ts1-10",
      scenario:
        "A senior engineer types an API payload as `unknown` instead of `any`. " +
        "A junior engineer asks why `unknown` is preferred for external data.",
      question: "Which explanation is most accurate?",
      options: [
        "`unknown` automatically validates JSON against a schema before use",
        "`any` is actually stricter than `unknown` for third-party data",
        "`unknown` requires explicit type checks before its value is used, preserving type safety",
        "`unknown` causes faster JSON.parse execution at runtime",
      ],
      correctIndex: 2,
      explanation:
        "With `unknown`, TypeScript forces you to narrow the type (via `typeof`, `instanceof`, " +
        "or a type predicate) before accessing any property or method. `any` skips all " +
        "checks, silently allowing unsafe access.",
    },

    // ── Q11 ─────────────────────────────────────────────────────────────
    {
      id: "ts1-11",
      code:
        `function format(val: string | number): string {\n` +
        `  if (typeof val === "string") {\n` +
        `    return val.trim();\n` +
        `  }\n` +
        `  return val.toFixed(2);\n` +
        `}`,
      question:
        "What TypeScript feature makes `.trim()` safe to call inside the if-block?",
      options: [
        "Type narrowing via a typeof guard",
        "Explicit cast using the `as` keyword",
        "Function overloading on the parameter type",
        "Structural subtyping between string and number",
      ],
      correctIndex: 0,
      explanation:
        "Inside the `if (typeof val === 'string')` block, TypeScript narrows `val` from " +
        "`string | number` down to `string`, making all string methods available without " +
        "any explicit cast.",
    },

    // ── Q12 ─────────────────────────────────────────────────────────────
    {
      id: "ts1-12",
      scenario:
        "Interface `Vehicle` has `start(): void`. Interface `Electric` extends `Vehicle` " +
        "and adds `charge(): void`. A variable is declared as type `Vehicle` but holds " +
        "an `Electric` instance at runtime. A developer calls `.charge()` on it directly " +
        "without any type assertion.",
      question: "What does TypeScript report?",
      options: [
        "It compiles; TypeScript detects the runtime type of the instance",
        "It warns but compiles; JavaScript calls the method at runtime",
        "It fails at runtime because the instance type is wrong",
        "Property 'charge' does not exist on type 'Vehicle'",
      ],
      correctIndex: 3,
      explanation:
        "TypeScript checks based on the declared type of the variable, which is `Vehicle`. " +
        "Since `Vehicle` has no `charge` method, the call is a compile-time error regardless " +
        "of what the variable actually holds at runtime.",
    },

    // ── Q13 ─────────────────────────────────────────────────────────────
    {
      id: "ts1-13",
      code:
        `const point: [number, number] = [10, 20];\n` +
        `console.log(point[1]);`,
      question: "What is logged and what TypeScript type does `point[1]` have?",
      options: [
        "10 — typed as number",
        "undefined — typed as unknown",
        "20 — typed as number",
        "[10, 20] — typed as number[]",
      ],
      correctIndex: 2,
      explanation:
        "A tuple `[number, number]` is a fixed-length array with known types at each position. " +
        "`point[1]` is the second element, which is `20` with TypeScript type `number`.",
    },

    // ── Q14 ─────────────────────────────────────────────────────────────
    {
      id: "ts1-14",
      scenario:
        "A developer sees a function typed as returning `never`. " +
        "A code reviewer explains when this return type is appropriate.",
      question: "Which scenario best justifies a `never` return type?",
      options: [
        "A function that returns `null` when no result is found",
        "A function that always throws an exception or runs an infinite loop",
        "A function that returns different types based on its input",
        "A function with an optional early-return path",
      ],
      correctIndex: 1,
      explanation:
        "`never` means the function never produces a value — it either throws unconditionally " +
        "or loops forever. It is NOT appropriate for functions that return `null`, `void`, " +
        "or sometimes return early.",
    },

    // ── Q15 ─────────────────────────────────────────────────────────────
    {
      id: "ts1-15",
      code:
        `function wrap<T>(val: T): T[] {\n` +
        `  return [val];\n` +
        `}\n` +
        `const result = wrap(42);`,
      question: "What is the inferred type of `result`?",
      options: ["number[]", "T[]", "any[]", "unknown[]"],
      correctIndex: 0,
      explanation:
        "TypeScript infers the type argument `T` from the call-site argument `42` as `number`. " +
        "Therefore the return type `T[]` resolves to `number[]` — no explicit type argument needed.",
    },

    // ── Q16 ─────────────────────────────────────────────────────────────
    {
      id: "ts1-16",
      code: `let username: string;\n` + `console.log(username.length);`,
      question:
        "With `strict` mode enabled in tsconfig, what TypeScript error is raised?",
      options: [
        "Property 'length' does not exist on type 'string'",
        "Type 'undefined' is not assignable to type 'string'",
        "Cannot read property 'length' before initialization",
        "Variable 'username' is used before being assigned",
      ],
      correctIndex: 3,
      explanation:
        "TypeScript's definite assignment analysis detects that `username` is declared but never " +
        "initialised before it is read. The error is 'Variable is used before being assigned', " +
        "a compile-time check.",
    },

    // ── Q17 ─────────────────────────────────────────────────────────────
    {
      id: "ts1-17",
      code:
        `type WithName = { name: string };\n` +
        `type WithAge  = { age: number };\n` +
        `type Person   = WithName & WithAge;\n\n` +
        `const p: Person = { name: "Sam", age: 25 };`,
      question: "What does the `&` operator produce here?",
      options: [
        "A union where either `name` or `age` alone satisfies the type",
        "An intersection requiring both `name` and `age` to be present",
        "A mapped type that converts each property to optional",
        "A conditional type based on property existence at runtime",
      ],
      correctIndex: 1,
      explanation:
        "The `&` (intersection) operator combines types so that a value must satisfy ALL " +
        "constituent types simultaneously. `Person` therefore requires both `name: string` " +
        "and `age: number`.",
    },

    // ── Q18 ─────────────────────────────────────────────────────────────
    {
      id: "ts1-18",
      scenario:
        'A developer defines `type Role = "admin" | "editor" | "viewer"`. ' +
        'A function accepts a `Role` parameter. A colleague passes the string `"superuser"` ' +
        "as the argument.",
      question: "What does TypeScript report at compile time?",
      options: [
        "TypeScript widens `Role` to accept any string in this scope",
        "A warning is raised, but the code still compiles cleanly",
        "Argument of type '\"superuser\"' is not assignable to parameter of type 'Role'",
        "An error is raised only when `noImplicitAny` is enabled",
      ],
      correctIndex: 2,
      explanation:
        "String literal union types are closed: only the listed members are valid. " +
        'Passing `"superuser"` is a compile-time error with a clear message about ' +
        "assignability, regardless of which strict flags are active.",
    },

    // ── Q19 ─────────────────────────────────────────────────────────────
    {
      id: "ts1-19",
      code:
        `class BankAccount {\n` +
        `  private balance: number = 0;\n` +
        `  deposit(amount: number) { this.balance += amount; }\n` +
        `}\n` +
        `const account = new BankAccount();\n` +
        `console.log(account.balance);`,
      question: "What does TypeScript report on the last line?",
      options: [
        "No error; `private` only restricts subclasses from access",
        "Property 'balance' does not exist on type 'BankAccount'",
        "Cannot access a private member through an instance variable",
        "Property 'balance' is private and only accessible within class 'BankAccount'",
      ],
      correctIndex: 3,
      explanation:
        "TypeScript's `private` keyword restricts property access to the class body itself. " +
        "Accessing `account.balance` from outside the class is a compile-time error, even " +
        "though the property exists on the JavaScript object at runtime.",
    },

    // ── Q20 ─────────────────────────────────────────────────────────────
    {
      id: "ts1-20",
      code:
        `const CONFIG = { retries: 3, timeout: 5000 } as const;\n` +
        `CONFIG.retries = 5;`,
      question: "What TypeScript error does the last line produce?",
      options: [
        "Cannot assign to 'retries' because it is a read-only property",
        "Type '5' is not assignable to type '3'",
        "Object literal may only specify known properties",
        "Property 'retries' does not exist on type 'Readonly<{}>'",
      ],
      correctIndex: 0,
      explanation:
        "`as const` makes every property of the object literal `readonly` and narrows " +
        "their types to literal values. Attempting to reassign `retries` therefore triggers " +
        "the 'Cannot assign to a read-only property' compile error.",
    },
  ],
};
