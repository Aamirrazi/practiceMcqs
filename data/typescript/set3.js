/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║            TYPESCRIPT — LEVEL 3 (ADVANCED)                  ║
 * ║  File: typescript-level3.js                                  ║
 * ║  Questions: 25  |  Mix: scenario + code                      ║
 * ╚══════════════════════════════════════════════════════════════╝
 */
const TypeScriptLevel3 = {
  meta: {
    id: "typescript-level3",
    testTitle: "TypeScript Advanced",
    topic: "typescript",
    topicLabel: "TypeScript",
    difficulty: "Advanced",
    questionCount: 25,
    estimatedMinutes: 40,
    description:
      "Advanced TypeScript: template literal types, discriminated unions, " +
      "recursive mapped types, module augmentation, infer, satisfies, " +
      "contravariance, abstract classes, and branding patterns.",
    icon: "🔷",
  },

  questions: [
    // ── Q1 ──────────────────────────────────────────────────────────────
    {
      id: "ts3-01",
      code:
        `type EventName = "click" | "focus" | "blur";\n` +
        `type Handler  = \`on\${Capitalize<EventName>}\`;`,
      question: "What are the values of `Handler`?",
      options: [
        '"onClick" | "onFocus" | "onBlur"',
        '"click" | "focus" | "blur"',
        '"on_click" | "on_focus" | "on_blur"',
        "string",
      ],
      correctIndex: 0,
      explanation:
        "Template literal types can embed other types inside backtick strings. " +
        "`Capitalize<EventName>` uppercases the first character of each union member, " +
        "then `on` is prepended — distributing across the union to produce " +
        '`"onClick" | "onFocus" | "onBlur"`.',
    },

    // ── Q2 ──────────────────────────────────────────────────────────────
    {
      id: "ts3-02",
      scenario:
        "A developer has a discriminated union:\n" +
        '`type Result = { kind: "ok"; value: number } | { kind: "error"; message: string }`.\n' +
        'A switch over `kind` handles `"ok"` but omits the `"error"` branch. ' +
        "The team wants a compile-time error if any future variant is not handled.",
      question: "Which technique enforces exhaustive handling at compile time?",
      options: [
        "Using `typeof` guards inside each switch case",
        "Adding a `default` branch that assigns the leftover value to a `never`-typed variable",
        "Using `Object.keys()` to iterate over union members at runtime",
        "Wrapping the switch in a generic function typed over the union",
      ],
      correctIndex: 1,
      explanation:
        "In the `default` branch, if all cases are handled, the discriminant type " +
        "narrows to `never`. Assigning it to a `const x: never = exhaustiveCheck(val)` " +
        "helper (or directly to `never`) causes a compile error when a new variant " +
        "is added but not handled.",
    },

    // ── Q3 ──────────────────────────────────────────────────────────────
    {
      id: "ts3-03",
      code:
        `type DeepReadonly<T> = {\n` +
        `  readonly [K in keyof T]: T[K] extends object\n` +
        `    ? DeepReadonly<T[K]>\n` +
        `    : T[K];\n` +
        `};`,
      question: "What does this recursive mapped type accomplish?",
      options: [
        "It removes all nested objects, leaving only primitive properties",
        "It makes top-level properties readonly while leaving nested ones mutable",
        "It recursively makes every nested property readonly at all depths",
        "It converts all nested object properties to the `unknown` type",
      ],
      correctIndex: 2,
      explanation:
        "For each key, if the value type extends `object`, the mapped type recurses with " +
        "`DeepReadonly`. This propagates the `readonly` modifier all the way down the " +
        "type tree, not just at the first level.",
    },

    // ── Q4 ──────────────────────────────────────────────────────────────
    {
      id: "ts3-04",
      code:
        `type Process<T extends string | number> =\n` +
        `  T extends string ? string[] : number[];\n\n` +
        `type R = Process<number>;`,
      question: "What does `R` resolve to?",
      options: ["string[]", "string | number[]", "T[]", "number[]"],
      correctIndex: 3,
      explanation:
        "The conditional type checks `T extends string`. When `T` is `number`, the check " +
        "is false, so the `else` branch is taken and the result is `number[]`.",
    },

    // ── Q5 ──────────────────────────────────────────────────────────────
    {
      id: "ts3-05",
      code:
        `// In a .d.ts file that contains: export {}\n` +
        `declare global {\n` +
        `  interface Window { appVersion: string; }\n` +
        `}`,
      question: "What TypeScript feature is this pattern called?",
      options: [
        "Global module augmentation — extending an existing global interface",
        "Declaration shadowing — replacing the original `Window` type",
        "Namespace merging with the ambient `Window` constructor",
        "Type alias override for the `Window` interface",
      ],
      correctIndex: 0,
      explanation:
        "Placing an interface declaration inside `declare global {}` in a module file " +
        "uses TypeScript's declaration merging to augment the existing global `Window` " +
        "interface. The `export {}` makes the file a module, which is required for " +
        "`declare global` to be valid.",
    },

    // ── Q6 ──────────────────────────────────────────────────────────────
    {
      id: "ts3-06",
      scenario:
        "A developer uses the `satisfies` operator (TypeScript 4.9+):\n" +
        '`const palette = { red: [255, 0, 0], green: "#00ff00" }' +
        " satisfies Record<string, string | number[]>`.\n" +
        "Compare this to annotating the variable as `Record<string, string | number[]>` directly.",
      question:
        "What advantage does `satisfies` offer over a direct type annotation?",
      options: [
        "It removes the need for `as const` assertions entirely",
        "It validates the type while still preserving each property's literal/narrowed type",
        "It converts the object to a class instance at runtime",
        "It enables structural subtyping checks on mutable objects",
      ],
      correctIndex: 1,
      explanation:
        "A plain annotation widens the type to `Record<string, string | number[]>`, losing " +
        "the knowledge that `palette.red` is `number[]` and `palette.green` is `string`. " +
        "`satisfies` validates the shape against the type without widening, preserving the " +
        "narrower inferred types for downstream use.",
    },

    // ── Q7 ──────────────────────────────────────────────────────────────
    {
      id: "ts3-07",
      code:
        `type UnpackPromise<T> = T extends Promise<infer U> ? U : T;\n` +
        `type A = UnpackPromise<Promise<string>>;\n` +
        `type B = UnpackPromise<number>;`,
      question: "What are the resolved types of `A` and `B`?",
      options: [
        "A = Promise<string>, B = Promise<number>",
        "A = unknown, B = number",
        "A = string, B = number",
        "A = string | number, B = never",
      ],
      correctIndex: 2,
      explanation:
        "`Promise<string>` matches `Promise<infer U>`, so `U` is inferred as `string` — " +
        "giving `A = string`. `number` does not extend `Promise<...>`, so the else branch " +
        "returns `T` itself: `B = number`.",
    },

    // ── Q8 ──────────────────────────────────────────────────────────────
    {
      id: "ts3-08",
      code:
        `type UserId = string & { readonly __brand: unique symbol };\n` +
        `function makeUserId(s: string): UserId { return s as UserId; }`,
      question:
        "What is the primary purpose of the `__brand` property in this pattern?",
      options: [
        "It adds a visible property to every string at runtime",
        "It creates a subtype that coerces automatically from plain strings",
        "It prevents accidental usage of plain strings where a UserId is expected, at the type level",
        "It registers the type with TypeScript's nominal type registry",
      ],
      correctIndex: 2,
      explanation:
        "TypeScript's type system is structural, so two `string` types are always compatible. " +
        "Adding a phantom `__brand` property that can only be set via `makeUserId` creates a " +
        "nominal-like distinction at compile time — a plain `string` cannot be assigned to " +
        "`UserId` without going through the constructor function.",
    },

    // ── Q9 ──────────────────────────────────────────────────────────────
    {
      id: "ts3-09",
      code:
        `abstract class Serializer<T> {\n` +
        `  abstract serialize(data: T): string;\n` +
        `  log(data: T): void { console.log(this.serialize(data)); }\n` +
        `}\n\n` +
        `const s = new Serializer();`,
      question: "What does TypeScript report on the last line?",
      options: [
        "Cannot create an instance of an abstract class",
        "An empty serializer with a no-op `serialize` is created silently",
        "TypeScript allows it but warns at runtime",
        "The class inherits `serialize` from `Object.prototype`",
      ],
      correctIndex: 0,
      explanation:
        "Abstract classes are blueprints — they cannot be instantiated directly. " +
        "TypeScript reports a compile-time error on any `new AbstractClass()` call. " +
        "A concrete subclass that implements all abstract members must be used instead.",
    },

    // ── Q10 ─────────────────────────────────────────────────────────────
    {
      id: "ts3-10",
      scenario:
        "A team adds a custom property to Express's `Request` type:\n" +
        "`declare module 'express' { interface Request { currentUser?: User; } }`\n" +
        "The augmentation is placed in a separate `express.d.ts` file.",
      question:
        "What must be true for this module augmentation to work correctly?",
      options: [
        "The augmentation must be in the same file that imports Express",
        "The `.d.ts` file must be a module — it must contain at least one import or export",
        "The new property name must not conflict with any existing Express property",
        "TypeScript 4.0 or newer is required for module augmentation syntax",
      ],
      correctIndex: 1,
      explanation:
        "For `declare module 'express'` to augment an existing module (rather than create " +
        "a new ambient module), the containing file must itself be a module, meaning it has " +
        "at least one top-level `import` or `export`. Without that, TypeScript treats it as " +
        "a script file and the augmentation behaves differently.",
    },

    // ── Q11 ─────────────────────────────────────────────────────────────
    {
      id: "ts3-11",
      code: `type Mutable<T> = { -readonly [K in keyof T]: T[K] };`,
      question: "What does the `-readonly` modifier accomplish?",
      options: [
        "It marks all properties as required (removes `?`)",
        "It converts all properties to the `never` type",
        "It removes the `readonly` modifier from every mapped property",
        "It deep-clones the type and strips all type information",
      ],
      correctIndex: 2,
      explanation:
        "In mapped types, modifiers can be prefixed with `+` (add) or `-` (remove). " +
        "`-readonly` removes the `readonly` flag from every property, producing a fully " +
        "mutable version of `T`. Similarly, `-?` would remove optionality.",
    },

    // ── Q12 ─────────────────────────────────────────────────────────────
    {
      id: "ts3-12",
      code:
        `function parse(x: number): string;\n` +
        `function parse(x: string): number;\n` +
        `function parse(x: unknown): unknown {\n` +
        `  if (typeof x === "number") return String(x);\n` +
        `  return (x as string).length;\n` +
        `}\n\n` +
        `const r = parse(42);`,
      question: "What is the TypeScript type of `r`?",
      options: ["unknown", "number | string", "number", "string"],
      correctIndex: 3,
      explanation:
        "Overload resolution applies the first matching signature. `42` is a `number`, " +
        "so the first overload `(x: number): string` is selected — `r` is typed as `string`. " +
        "The implementation signature is never exposed to callers.",
    },

    // ── Q13 ─────────────────────────────────────────────────────────────
    {
      id: "ts3-13",
      scenario:
        "A developer notices that assigning a `Cat` value to an `Animal` variable compiles " +
        "without issues, but assigning an `Animal` value to a `Cat` variable fails — " +
        "even though `Cat` is defined with `interface Cat extends Animal`.",
      question:
        "Which TypeScript concept explains this one-directional compatibility?",
      options: [
        "Structural subtyping: a Cat has at least all members Animal requires, so it is compatible",
        "Nominal typing: TypeScript checks class names, not member shapes",
        "Covariance in function return types causes the asymmetry",
        "The `extends` keyword creates an invariant relationship between the two types",
      ],
      correctIndex: 0,
      explanation:
        "TypeScript uses structural (duck) typing: a value is assignable to a type if it " +
        "has at least all the required members. `Cat` has everything `Animal` has (plus more), " +
        "so `Cat → Animal` works. `Animal` is missing `Cat`-specific members, " +
        "so `Animal → Cat` fails.",
    },

    // ── Q14 ─────────────────────────────────────────────────────────────
    {
      id: "ts3-14",
      code:
        `type Keys   = keyof { a: 1; b: 2; c: 3 };\n` +
        `type Values = { a: 1; b: 2; c: 3 }[Keys];`,
      question: "What are the resolved types of `Keys` and `Values`?",
      options: [
        "Keys = string, Values = number",
        'Keys = "a" | "b" | "c", Values = 1 | 2 | 3',
        'Keys = ["a", "b", "c"], Values = [1, 2, 3]',
        'Keys = "a" | "b" | "c", Values = number',
      ],
      correctIndex: 1,
      explanation:
        "`keyof` of a literal object type produces a union of its string literal keys: " +
        '`"a" | "b" | "c"`. Indexed access with that union distributes over each key, ' +
        "collecting each value's literal type into a union: `1 | 2 | 3`.",
    },

    // ── Q15 ─────────────────────────────────────────────────────────────
    {
      id: "ts3-15",
      code:
        `type StringsOnly<T> = {\n` +
        `  [K in keyof T as T[K] extends string ? K : never]: T[K]\n` +
        `};\n` +
        `type Filtered = StringsOnly<{ name: string; age: number; email: string }>;`,
      question: "What does `Filtered` resolve to?",
      options: [
        "{ name: never; age: never; email: never }",
        "{ name: string; age: number; email: string }",
        "{ name: string; email: string }",
        "{ age: number }",
      ],
      correctIndex: 2,
      explanation:
        "The `as T[K] extends string ? K : never` clause is a key remapping filter. " +
        "Keys whose value type is not `string` are remapped to `never`, which removes them " +
        "from the result. Only `name` and `email` survive, both typed as `string`.",
    },

    // ── Q16 ─────────────────────────────────────────────────────────────
    {
      id: "ts3-16",
      scenario:
        "A developer enables `strictFunctionTypes` in tsconfig. " +
        "They try to assign a value of type `(animal: Animal) => void` " +
        "to a variable typed as `(cat: Cat) => void`, where `Cat extends Animal`.",
      question: "What happens and why?",
      options: [
        "It compiles fine; covariance allows wider parameter types in assignments",
        "It compiles fine; TypeScript ignores parameter types in function assignments",
        "It fails because `Cat` is more specific and therefore smaller than `Animal`",
        "It fails because function parameters are checked contravariantly under strictFunctionTypes",
      ],
      correctIndex: 3,
      explanation:
        "Under `strictFunctionTypes`, function parameter types are checked contravariantly. " +
        "A `(cat: Cat) => void` handler promises it will only receive `Cat`s. Assigning a " +
        "`(animal: Animal) => void` function is unsafe because the caller may pass any " +
        "`Cat`-specific member the wider `Animal` handler doesn't know about.",
    },

    // ── Q17 ─────────────────────────────────────────────────────────────
    {
      id: "ts3-17",
      code:
        `type Awaited2<T> = T extends PromiseLike<infer U> ? Awaited2<U> : T;\n` +
        `type R = Awaited2<Promise<Promise<string>>>;`,
      question: "What does `R` resolve to?",
      options: [
        "string",
        "Promise<string>",
        "Promise<Promise<string>>",
        "unknown",
      ],
      correctIndex: 0,
      explanation:
        "The recursive conditional type keeps unwrapping `PromiseLike<U>` until the inner " +
        "type no longer extends `PromiseLike`. `Promise<Promise<string>>` → unwrap once → " +
        "`Promise<string>` → unwrap again → `string`. This mirrors the built-in `Awaited<T>`.",
    },

    // ── Q18 ─────────────────────────────────────────────────────────────
    {
      id: "ts3-18",
      scenario:
        "A developer uses `const` type parameters (TypeScript 5.0+): " +
        '`function id<const T>(val: T): T`. They call `id(["a", "b"])`.',
      question:
        "How does the inferred return type differ from calling `id` without `const`?",
      options: [
        "Without `const`: string[], with `const`: readonly string[]",
        'Without `const`: string[], with `const`: readonly ["a", "b"]',
        'Without `const`: ["a", "b"], with `const`: string[]',
        "Both calls produce the same inferred type",
      ],
      correctIndex: 1,
      explanation:
        "Without `const`, TypeScript widens the array to `string[]`. With the `const` " +
        "modifier on the type parameter, TypeScript infers the narrowest possible type — " +
        'the readonly tuple `readonly ["a", "b"]` — without requiring `as const` at ' +
        "the call site.",
    },

    // ── Q19 ─────────────────────────────────────────────────────────────
    {
      id: "ts3-19",
      code:
        `interface Repository<T> {\n` +
        `  findById(id: number): Promise<T>;\n` +
        `  save(entity: T): Promise<void>;\n` +
        `  findAll(): Promise<T[]>;\n` +
        `}\n\n` +
        `class UserRepo implements Repository<User> {\n` +
        `  findById(id: number) { return Promise.resolve(new User()); }\n` +
        `  save(entity: User)   { return Promise.resolve(); }\n` +
        `  // findAll not implemented\n` +
        `}`,
      question: "What does TypeScript report about `UserRepo`?",
      options: [
        "No error; unimplemented interface methods default to `undefined`",
        "Error on `UserRepo`: the class must be declared `abstract`",
        "Error: Property 'findAll' is missing in type 'UserRepo' but required in type 'Repository<User>'",
        "Error: Return type of 'save' is incompatible with the interface",
      ],
      correctIndex: 2,
      explanation:
        "When a class uses `implements`, it must provide a concrete implementation for every " +
        "method and property in the interface. Omitting `findAll` results in a specific " +
        "'Property is missing' compile error on the class declaration.",
    },

    // ── Q20 ─────────────────────────────────────────────────────────────
    {
      id: "ts3-20",
      code:
        `type Head<T extends any[]> =\n` +
        `  T extends [infer H, ...any[]] ? H : never;\n\n` +
        `type T1 = Head<[string, number, boolean]>;\n` +
        `type T2 = Head<[]>;`,
      question: "What are the resolved types of `T1` and `T2`?",
      options: [
        "T1 = any, T2 = any",
        "T1 = [string], T2 = []",
        "T1 = string | number | boolean, T2 = unknown",
        "T1 = string, T2 = never",
      ],
      correctIndex: 3,
      explanation:
        "The variadic tuple pattern `[infer H, ...any[]]` matches any non-empty array, " +
        "binding the first element to `H`. For `[string, number, boolean]`, `H` is `string`. " +
        "An empty tuple `[]` cannot match `[infer H, ...any[]]`, so the else branch returns `never`.",
    },

    // ── Q21 ─────────────────────────────────────────────────────────────
    {
      id: "ts3-21",
      scenario:
        "A Playwright test helper is typed as:\n" +
        "`async function getInput<T extends HTMLInputElement>(selector: string): Promise<T>`.\n" +
        "The team debates why the constraint `T extends HTMLInputElement` is on the return type " +
        "rather than accepting it as `Promise<HTMLInputElement>` directly.",
      question:
        "What does the generic constraint `T extends HTMLInputElement` enable here?",
      options: [
        "Callers can specify a more specific subtype (e.g., HTMLTextAreaElement) and get that type back",
        "The function can only run inside a Playwright browser context",
        "TypeScript infers `T` as `HTMLInputElement` at every call site automatically",
        "The constraint prevents `T` from ever being `null` or `undefined`",
      ],
      correctIndex: 0,
      explanation:
        "The constraint allows callers to pass a specific subtype: " +
        "`getInput<HTMLTextAreaElement>(...)` and receive `Promise<HTMLTextAreaElement>` back. " +
        "Without the generic, they would always get `HTMLInputElement` and need to cast — " +
        "the generic preserves the more specific type through the call.",
    },

    // ── Q22 ─────────────────────────────────────────────────────────────
    {
      id: "ts3-22",
      code: `type Prettify<T> = { [K in keyof T]: T[K] } & {};`,
      question:
        "This utility appears in many TypeScript codebases. What is its practical effect?",
      options: [
        "It converts all intersections into flattened standalone named types",
        "It forces TypeScript's IDE tooltip to display the resolved object shape instead of an opaque intersection",
        "It removes all `undefined` values from each property in the type",
        "It deep-copies the type, stripping all generic parameters",
      ],
      correctIndex: 1,
      explanation:
        "When TypeScript shows a type in a tooltip it may display `TypeA & TypeB` opaquely. " +
        "Mapping over `keyof T` forces the compiler to evaluate and display the fully resolved " +
        "set of properties. The `& {}` is a no-op intersect used to trigger the evaluation. " +
        "This is a purely compile-time / DX trick with no runtime effect.",
    },

    // ── Q23 ─────────────────────────────────────────────────────────────
    {
      id: "ts3-23",
      code:
        `type Path<T, Prefix extends string = ""> = {\n` +
        `  [K in keyof T & string]:\n` +
        `    T[K] extends object\n` +
        `      ? Path<T[K], \`\${Prefix}\${K}.\`>\n` +
        `      : \`\${Prefix}\${K}\`\n` +
        `}[keyof T & string];`,
      question:
        "Given `type Obj = { a: { b: string }; c: number }`, what does `Path<Obj>` resolve to?",
      options: ['"a" | "c"', '"a.b" | "c"', '"a" | "a.b" | "c"', '"a.b.c"'],
      correctIndex: 1,
      explanation:
        "The recursive mapped type walks the object tree. For `a`, its value is an object, " +
        'so it recurses with prefix `"a."` and returns `"a.b"`. For `c`, it is a leaf ' +
        '(number), so it returns `"c"` directly. The result is the union `"a.b" | "c"`. ' +
        'Note: intermediate nodes like `"a"` are not returned — only leaf paths.',
    },

    // ── Q24 ─────────────────────────────────────────────────────────────
    {
      id: "ts3-24",
      scenario:
        'A project\'s tsconfig includes `"noUncheckedIndexedAccess": true`. ' +
        "A developer accesses `arr[0]` where `arr` is typed as `string[]`.",
      question: "What is the inferred TypeScript type of `arr[0]`?",
      options: [
        "string",
        "string | null",
        "string | never",
        "string | undefined",
      ],
      correctIndex: 3,
      explanation:
        "With `noUncheckedIndexedAccess` enabled, every index-based array access is " +
        "considered potentially out-of-bounds. TypeScript appends `| undefined` to the " +
        "element type, so `arr[0]` has type `string | undefined` even though `arr` is `string[]`.",
    },

    // ── Q25 ─────────────────────────────────────────────────────────────
    {
      id: "ts3-25",
      code:
        `type PickByValue<T, V> = {\n` +
        `  [K in keyof T as T[K] extends V ? K : never]: T[K]\n` +
        `};\n` +
        `type NumberFields = PickByValue<\n` +
        `  { id: number; name: string; score: number },\n` +
        `  number\n` +
        `>;`,
      question: "What does `NumberFields` resolve to?",
      options: [
        "{ name: string }",
        "{ id: number; score: number }",
        "{ id: number; name: string; score: number }",
        "{ id: never; score: never }",
      ],
      correctIndex: 1,
      explanation:
        "Key remapping with `as T[K] extends V ? K : never` filters out keys whose value " +
        "type does not extend `V`. Only `id` and `score` have type `number`, so only those " +
        "keys survive. `name: string` is excluded because `string` does not extend `number`.",
    },
  ],
};
