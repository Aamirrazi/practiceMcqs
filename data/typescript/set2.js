/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║           TYPESCRIPT — LEVEL 2 (INTERMEDIATE)               ║
 * ║  File: typescript-level2.js                                  ║
 * ║  Questions: 20  |  Mix: scenario + code                      ║
 * ╚══════════════════════════════════════════════════════════════╝
 */
const TypeScriptLevel2 = {
  meta: {
    id: "typescript-level2",
    testTitle: "TypeScript Intermediate",
    topic: "typescript",
    topicLabel: "TypeScript",
    difficulty: "Intermediate",
    questionCount: 20,
    estimatedMinutes: 30,
    description:
      "Utility types, generics constraints, keyof/typeof, type predicates, " +
      "function overloads, mapped types, and conditional types.",
    icon: "🔷",
  },

  questions: [
    // ── Q1 ──────────────────────────────────────────────────────────────
    {
      id: "ts2-01",
      code:
        `interface User { id: number; name: string; email: string; }\n` +
        `type Preview = Pick<User, "id" | "name">;`,
      question: "What properties does `Preview` contain?",
      options: [
        "`id` and `name` only",
        "All properties from `User` unchanged",
        "Every property except `id` and `name`",
        "Optional versions of `id` and `name` only",
      ],
      correctIndex: 0,
      explanation:
        "`Pick<T, K>` creates a new type containing only the properties whose keys are " +
        "listed in `K`. Here that is `id` and `name`; `email` is excluded entirely.",
    },

    // ── Q2 ──────────────────────────────────────────────────────────────
    {
      id: "ts2-02",
      code:
        `interface Config { host: string; port: number; debug: boolean; }\n` +
        `type PartialConfig = Partial<Config>;`,
      question: "What does `Partial<Config>` produce?",
      options: [
        "A type where every property remains required",
        "A type where every property becomes optional (`?`)",
        "A type where every property becomes `null | undefined`",
        "A type where only boolean properties are made optional",
      ],
      correctIndex: 1,
      explanation:
        "`Partial<T>` is a built-in mapped type that appends `?` to every property of `T`, " +
        "making them all optional. None are set to `null`; the change is purely structural.",
    },

    // ── Q3 ──────────────────────────────────────────────────────────────
    {
      id: "ts2-03",
      scenario:
        'A developer uses `Omit<User, "password">` to create a safe DTO for API responses. ' +
        "`User` has properties: `id`, `name`, `email`, and `password`.",
      question: "What does the resulting type contain?",
      options: [
        "Only the `password` field",
        "All fields including `password`, but typed as `never`",
        "All fields from `User` except `password`",
        "An empty object type `{}`",
      ],
      correctIndex: 2,
      explanation:
        "`Omit<T, K>` produces a type with all keys of `T` except those listed in `K`. " +
        "The result here has `id`, `name`, and `email` — `password` is removed entirely.",
    },

    // ── Q4 ──────────────────────────────────────────────────────────────
    {
      id: "ts2-04",
      code:
        `type Grid = Record<string, number[]>;\n` +
        `const g: Grid = { row1: [1, 2], row2: [3, 4] };`,
      question: "What does `Record<string, number[]>` describe?",
      options: [
        "An array of tuples where each tuple is [string, number]",
        "A fixed object with only the keys 'row1' and 'row2'",
        "A mapped type where values must be plain numbers",
        "An object with any string keys and number-array values",
      ],
      correctIndex: 3,
      explanation:
        "`Record<K, V>` constructs an object type with keys of type `K` and values of type `V`. " +
        "`Record<string, number[]>` accepts any string key and requires each value to be " +
        "an array of numbers.",
    },

    // ── Q5 ──────────────────────────────────────────────────────────────
    {
      id: "ts2-05",
      code:
        `function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {\n` +
        `  return obj[key];\n` +
        `}`,
      question: "What does the constraint `K extends keyof T` enforce?",
      options: [
        "`key` must be one of the known property names of `obj`",
        "`key` must be a numeric index of the object",
        "`T` must extend `K` in the type hierarchy",
        "The function can only be called with string keys",
      ],
      correctIndex: 0,
      explanation:
        "`keyof T` produces a union of all property names of `T`. Constraining `K` to " +
        "`keyof T` ensures `key` is always a valid property name, so `obj[key]` is " +
        "type-safe and returns `T[K]` — the exact type of that property.",
    },

    // ── Q6 ──────────────────────────────────────────────────────────────
    {
      id: "ts2-06",
      scenario:
        "A developer declares two overload signatures for a `parse` function: " +
        "one that takes a `string` and returns `number`, and one that takes a `number` " +
        "and returns `string`. A caller passes a `boolean` value.",
      question: "What happens at compile time?",
      options: [
        "TypeScript picks the closest matching overload automatically",
        "TypeScript errors: No overload matches this call",
        "The boolean is coerced to a number and the first overload fires",
        "TypeScript falls through to the implementation signature",
      ],
      correctIndex: 1,
      explanation:
        "Overload resolution checks each signature in order. A `boolean` argument matches " +
        "neither `string` nor `number`, so TypeScript reports that no overload matches " +
        "the call — the implementation signature is never exposed to callers.",
    },

    // ── Q7 ──────────────────────────────────────────────────────────────
    {
      id: "ts2-07",
      code:
        `function isString(val: unknown): val is string {\n` +
        `  return typeof val === "string";\n` +
        `}`,
      question: "What is `val is string` called in TypeScript?",
      options: [
        "A type alias predicate",
        "A conditional narrowing expression",
        "A type predicate (user-defined type guard)",
        "A structural subtype assertion",
      ],
      correctIndex: 2,
      explanation:
        "The `parameterName is Type` syntax in a return type is a type predicate. When the " +
        "function returns `true`, TypeScript narrows the parameter to the specified type in " +
        "the calling scope. This is how user-defined type guards are written.",
    },

    // ── Q8 ──────────────────────────────────────────────────────────────
    {
      id: "ts2-08",
      code:
        `type IsArray<T> = T extends any[] ? "yes" : "no";\n` +
        `type A = IsArray<string[]>;\n` +
        `type B = IsArray<number>;`,
      question: "What are the resolved types of `A` and `B`?",
      options: [
        'A = "no", B = "yes"',
        "A = string[], B = number",
        "A = any[], B = never",
        'A = "yes", B = "no"',
      ],
      correctIndex: 3,
      explanation:
        '`string[]` extends `any[]`, so `A` resolves to `"yes"`. `number` does not extend ' +
        '`any[]`, so `B` resolves to `"no"`. This is a classic conditional type distribution.',
    },

    // ── Q9 ──────────────────────────────────────────────────────────────
    {
      id: "ts2-09",
      code: `type Readonly2<T> = { readonly [K in keyof T]: T[K] };`,
      question: "What does this mapped type do?",
      options: [
        "Makes every property of `T` readonly",
        "Makes every property of `T` optional",
        "Removes all methods from `T`, keeping only data properties",
        "Deep-clones the type `T` at compile time",
      ],
      correctIndex: 0,
      explanation:
        "The `readonly` modifier in a mapped type prefix makes each iterated property " +
        "immutable. `[K in keyof T]` iterates all keys; the result is equivalent to the " +
        "built-in `Readonly<T>` utility type.",
    },

    // ── Q10 ─────────────────────────────────────────────────────────────
    {
      id: "ts2-10",
      scenario:
        "A team wraps a settings object in `Required<Settings>` before passing it to a " +
        "third-party library that cannot handle `undefined` values.",
      question: "What problem does `Required<Settings>` solve?",
      options: [
        "It removes all optional fields to keep the object minimal",
        "It ensures no property is `undefined`, catching optional fields left unset",
        "It converts optional properties to `null` instead of `undefined`",
        "It validates the property values at runtime using a schema",
      ],
      correctIndex: 1,
      explanation:
        "`Required<T>` removes the `?` modifier from every property, making them all " +
        "mandatory. TypeScript will then error if any previously optional field is omitted, " +
        "catching missing values at compile time instead of at runtime.",
    },

    // ── Q11 ─────────────────────────────────────────────────────────────
    {
      id: "ts2-11",
      code:
        `function fetchData(): Promise<string> {\n` +
        `  return Promise.resolve("ok");\n` +
        `}\n` +
        `type R = ReturnType<typeof fetchData>;`,
      question: "What is the resolved type of `R`?",
      options: [
        "string",
        "string | Promise<string>",
        "Promise<string>",
        "unknown",
      ],
      correctIndex: 2,
      explanation:
        "`ReturnType<F>` extracts the return type of a function type `F`. " +
        "`fetchData` returns `Promise<string>`, so `R` is `Promise<string>`. " +
        "It does not unwrap the promise; use `Awaited<R>` for that.",
    },

    // ── Q12 ─────────────────────────────────────────────────────────────
    {
      id: "ts2-12",
      code: `type Params = Parameters<(a: number, b: string) => void>;`,
      question: "What is the resolved type of `Params`?",
      options: [
        "[number] only",
        "{ a: number; b: string }",
        "number | string",
        "[number, string]",
      ],
      correctIndex: 3,
      explanation:
        "`Parameters<F>` returns a tuple of all parameter types of function `F` in order. " +
        "For `(a: number, b: string) => void`, the result is the tuple `[number, string]`.",
    },

    // ── Q13 ─────────────────────────────────────────────────────────────
    {
      id: "ts2-13",
      scenario:
        "A developer writes a generic constraint: " +
        "`function log<T extends { toString(): string }>(val: T): void`. " +
        "A colleague asks what the constraint guarantees.",
      question: "What does `T extends { toString(): string }` guarantee?",
      options: [
        "`T` must have a `toString()` method that returns a string",
        "`T` must be a primitive type only",
        "`T` must extend the built-in `String` class",
        "`T` can only be `string | number`",
      ],
      correctIndex: 0,
      explanation:
        "Generic constraints use structural typing: `T extends { toString(): string }` " +
        "means any `T` passed in must have a `toString` method returning `string`. " +
        "Classes, objects, and primitives all satisfy this — it is not limited to primitives.",
    },

    // ── Q14 ─────────────────────────────────────────────────────────────
    {
      id: "ts2-14",
      code:
        `interface Shape   { area(): number; }\n` +
        `interface Labeled { label: string; }\n\n` +
        `function describe(s: Shape & Labeled): string {\n` +
        `  return \`\${s.label}: \${s.area()}\`;\n` +
        `}`,
      question: "What type must be passed to `describe`?",
      options: [
        "Any object that has either `area` or `label`",
        "An object that has both `area()` and `label`",
        "A class that separately implements both interfaces",
        "An object that extends `Shape` in the prototype chain",
      ],
      correctIndex: 1,
      explanation:
        "The `&` intersection type requires every property from all constituent types. " +
        "The argument must satisfy both `Shape` (an `area()` method) and `Labeled` " +
        "(a `label` string). A plain object literal with both properties is perfectly valid.",
    },

    // ── Q15 ─────────────────────────────────────────────────────────────
    {
      id: "ts2-15",
      code: `const sym = Symbol("id");\n` + `type Obj = { [sym]: string };`,
      question: "What kind of key is `sym` acting as in the type?",
      options: [
        "A string index signature",
        "A numeric enum member key",
        "A unique symbol property key",
        "A template literal key",
      ],
      correctIndex: 2,
      explanation:
        "TypeScript supports `unique symbol` values as property keys in type definitions. " +
        "When a `const` symbol is used as a computed key in a type, TypeScript treats it as " +
        "a `unique symbol` — different from any other symbol even with the same description.",
    },

    // ── Q16 ─────────────────────────────────────────────────────────────
    {
      id: "ts2-16",
      scenario:
        'A developer evaluates `Extract<"a" | "b" | "c", "a" | "c">` ' +
        "to filter a union type.",
      question: "What does the result contain?",
      options: [
        '"b" — only the value NOT present in the second argument',
        '"a" | "b" | "c" — the full union unchanged',
        "never — because extraction always returns an empty type",
        '"a" | "c" — only values present in both unions',
      ],
      correctIndex: 3,
      explanation:
        "`Extract<T, U>` keeps only the members of `T` that are also assignable to `U`. " +
        'Here `"a"` and `"c"` are in both unions, so the result is `"a" | "c"`. ' +
        "The complement operation is `Exclude`.",
    },

    // ── Q17 ─────────────────────────────────────────────────────────────
    {
      id: "ts2-17",
      code: `type Result = NonNullable<string | null | undefined>;`,
      question: "What is the resolved type of `Result`?",
      options: [
        "string",
        "string | null",
        "string | undefined",
        "string | null | undefined",
      ],
      correctIndex: 0,
      explanation:
        "`NonNullable<T>` removes `null` and `undefined` from a union type. " +
        "Applied to `string | null | undefined`, only `string` survives.",
    },

    // ── Q18 ─────────────────────────────────────────────────────────────
    {
      id: "ts2-18",
      scenario:
        'A developer uses `Exclude<"left" | "right" | "center", "center">` ' +
        "to build a type for directional alignment without a center option.",
      question: "What is the resulting type?",
      options: [
        '"center" only',
        '"left" | "right"',
        '"left" | "right" | "center"',
        "never",
      ],
      correctIndex: 1,
      explanation:
        "`Exclude<T, U>` removes from `T` all members that are assignable to `U`. " +
        'Excluding `"center"` from the three-member union leaves `"left" | "right"`.',
    },

    // ── Q19 ─────────────────────────────────────────────────────────────
    {
      id: "ts2-19",
      code:
        `const user = { name: "Aamir", age: 28 };\n` +
        `type UserKeys = keyof typeof user;`,
      question: "What is the type of `UserKeys`?",
      options: [
        "string",
        "{ name: string; age: number }",
        '"name" | "age"',
        "string | number",
      ],
      correctIndex: 2,
      explanation:
        "`typeof user` infers the object's type `{ name: string; age: number }`. " +
        '`keyof` of that type produces a union of its property names: `"name" | "age"`.',
    },

    // ── Q20 ─────────────────────────────────────────────────────────────
    {
      id: "ts2-20",
      code:
        `type Flatten<T> = T extends Array<infer Item> ? Item : T;\n` +
        `type A = Flatten<string[]>;\n` +
        `type B = Flatten<number>;`,
      question: "What are the resolved types of `A` and `B`?",
      options: [
        "A = string[], B = number[]",
        "A = Array<string>, B = never",
        "A = unknown, B = number",
        "A = string, B = number",
      ],
      correctIndex: 3,
      explanation:
        "`string[]` extends `Array<infer Item>`, so `Item` is inferred as `string` — making " +
        "`A = string`. `number` does not extend any array, so `B` falls through to the else " +
        "branch returning `T` itself: `number`.",
    },
  ],
};
