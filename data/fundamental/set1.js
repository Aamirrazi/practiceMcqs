/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║          WEB DEVELOPMENT ADVANCED TEST MODULE — 3 SETS          ║
 * ║          CSS Mastery · JavaScript Internals · Integration        ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */

// ═══════════════════════════════════════════════════════════════════════════════
// SET 1 — CSS: Architecture, Layout & Visual Engineering
// ═══════════════════════════════════════════════════════════════════════════════

const CSSAdvancedModule = {
  meta: {
    id: "css-advanced-v1",
    testTitle: "CSS: Architecture, Layout & Visual Engineering",
    topic: "webdev-integration",
    topicLabel: "Styling & Design Systems",
    difficulty: "Advanced",
    questionCount: 20,
    estimatedMinutes: 25,
    description:
      "Complex CSS scenarios covering cascade architecture, layout engines, custom properties, performance, and production-scale design systems.",
    icon: "🎨",
  },

  questions: [
    // ─── Q1 ───
    {
      id: "css-adv-01",
      scenario:
        "Your design system team is migrating a legacy application. Components built by different squads use identical class names like `.btn-primary`, causing unpredictable visual overrides across feature modules bundled into the same SPA.",
      question:
        "Which CSS architectural strategy most effectively eliminates cross-squad selector conflicts at the component boundary?",
      options: [
        "Enforce BEM naming conventions across all teams and audit via a shared linting config.",
        "Switch to CSS Modules or CSS-in-JS (e.g., styled-components), which scope class names to their component at compile or runtime.",
        "Use higher specificity on each squad's styles by nesting within a unique wrapper `#squad-id` selector.",
        "Increase the z-index and `!important` usage to ensure the correct squad's styles take effect.",
      ],
      correctIndex: 1,
      explanation:
        "CSS Modules hash class names at build time (e.g., `.btn-primary_3xK9`) and CSS-in-JS generates unique identifiers at runtime, providing true local scope. BEM is a convention that still relies on discipline, while specificity hacks and `!important` compound technical debt.",
    },
    // ─── Q2 ───
    {
      id: "css-adv-02",
      scenario:
        "The performance engineering team flags that the marketing site's Cumulative Layout Shift (CLS) score on Core Web Vitals is 0.38, well above the 'Good' threshold of 0.1. The main culprit is a hero image above the fold.",
      question:
        "Which CSS technique is the most direct fix to eliminate layout shift caused by the image loading without reserved space?",
      options: [
        "Set `display: block` on the `<img>` element.",
        "Apply `aspect-ratio: 16/9` (or the correct ratio) to the `<img>` element in CSS, paired with `width: 100%` and `height: auto`.",
        "Use `position: absolute` and hardcode the pixel height in a parent container.",
        "Set `loading='lazy'` on the image to defer it below the fold.",
      ],
      correctIndex: 1,
      explanation:
        "The `aspect-ratio` property instructs the browser to reserve the correct intrinsic space for the image before it downloads, which is the canonical CSS fix for image-related CLS. `loading='lazy'` defers loading but does not reserve space.",
    },
    // ─── Q3 ───
    {
      id: "css-adv-03",
      scenario:
        "A senior engineer reviews a PR for a product grid. The implementation uses `float: left` for the layout and clearfix hacks. They request a rewrite using a 'modern layout primitive that handles both axes simultaneously'.",
      question:
        "In what precise scenario should a developer choose CSS Grid over Flexbox?",
      options: [
        "Grid should be used for buttons and small inline components; Flexbox for page layouts.",
        "Grid is the correct choice when the layout is defined on two axes (rows AND columns) and items must align to a shared track structure, e.g., a product card grid where rows across different cards must align.",
        "Grid can only be used when the number of columns is fixed and known in advance.",
        "Flexbox is always superior; Grid is a legacy spec retained for backward compatibility.",
      ],
      correctIndex: 1,
      explanation:
        "Flexbox is a single-axis layout model (primary axis + cross-axis for alignment). CSS Grid is a true two-dimensional layout engine where both rows and columns are explicitly defined on the container, making it ideal for card grids, dashboards, and any layout where independent rows must share alignment across columns.",
    },
    // ─── Q4 ───
    {
      id: "css-adv-04",
      scenario:
        "A product manager requests a dark mode toggle. The current theming approach uses a global `.dark-mode` class that overrides dozens of hardcoded hex color values scattered across hundreds of CSS rules.",
      question:
        "What refactor makes dark mode sustainable and maintainable at scale?",
      options: [
        "Create a separate `dark.css` stylesheet and load it dynamically via JavaScript.",
        "Refactor all color declarations to use CSS Custom Properties (variables) like `var(--color-surface)`, and then redefine only those variables under a `[data-theme='dark']` selector or `@media (prefers-color-scheme: dark)` block.",
        "Use `filter: invert(1)` on the `<body>` element to flip all colors to dark mode.",
        "Store color values in a JavaScript config file and inject them as inline styles.",
      ],
      correctIndex: 1,
      explanation:
        "CSS Custom Properties cascade and inherit, meaning redefining a token like `--color-surface` in a single scoped block cascades everywhere it is consumed. This is the industry-standard approach for design tokens and theme switching, as seen in systems like Tailwind's dark mode and Material Design 3.",
    },
    // ─── Q5 ───
    {
      id: "css-adv-05",
      scenario:
        "A developer is building a responsive pricing table. On mobile, the three-column plan layout should collapse to a single column. They write `grid-template-columns: repeat(3, 1fr)` and then add a media query. A colleague suggests using a 'responsive one-liner' that needs no media query.",
      question:
        "What CSS Grid pattern creates a responsive multi-column layout without any media queries?",
      options: [
        "`grid-template-columns: repeat(auto-fill, minmax(250px, 1fr))`",
        "`grid-template-columns: 1fr 1fr 1fr; flex-wrap: wrap;`",
        "`grid-template-columns: repeat(3, clamp(200px, 33%, 400px))`",
        "`display: flex; flex-direction: column; gap: 1rem;`",
      ],
      correctIndex: 0,
      explanation:
        "`auto-fill` with `minmax(250px, 1fr)` instructs the browser to fit as many columns as possible where each is at least 250px wide. When the container shrinks below 500px, only one 250px+ column fits, naturally collapsing to a single column — all without a media query.",
    },
    // ─── Q6 ───
    {
      id: "css-adv-06",
      scenario:
        "A checkout form has a 'Pay Now' button that animates on hover. QA reports the animation causes the page to jank on low-end Android devices. Chrome DevTools shows 'Layout' and 'Paint' are being triggered every frame.",
      question:
        "Which specific CSS properties should the animation be restricted to in order to achieve GPU-composited, jank-free motion?",
      options: [
        "`width`, `height`, and `margin` — as these are the most direct spatial properties.",
        "`transform` and `opacity`, as these are the only two properties that can be animated exclusively on the compositor thread without triggering layout or paint.",
        "`background-color` and `border-color` — as color changes are GPU-accelerated.",
        "`top`, `left`, `right`, `bottom` — as positional properties are hardware-accelerated.",
      ],
      correctIndex: 1,
      explanation:
        "The browser rendering pipeline is: JavaScript → Style → Layout → Paint → Composite. Animating `transform` and `opacity` skips the Layout and Paint steps entirely, running only on the Compositor thread on the GPU. Animating width, position, or colors forces full re-layout or re-paint every frame, causing dropped frames.",
    },
    // ─── Q7 ───
    {
      id: "css-adv-07",
      scenario:
        "An accessibility audit of the company's e-commerce site raises a WCAG 2.1 AA failure. The dev team's custom focus styles were removed with `outline: none` on all interactive elements to match the visual design mock-ups, satisfying designers but breaking keyboard navigation.",
      question:
        "What is the modern CSS approach to remove the default browser outline only for mouse users while preserving it for keyboard users?",
      options: [
        "Use JavaScript to detect `mousedown` events and dynamically toggle a class that sets `outline: none`.",
        "Use the `:focus-visible` pseudo-class to style focus. Apply a custom `outline` to `:focus-visible` and optionally suppress the default ring on `:focus:not(:focus-visible)`.",
        "Apply `outline: none` globally and add a custom `box-shadow` instead since box-shadow is not an 'outline' under WCAG.",
        "Rely on `tabindex='-1'` to remove elements from keyboard flow.",
      ],
      correctIndex: 1,
      explanation:
        "`:focus-visible` is the CSS pseudo-class specifically designed for this scenario. Browsers apply it based on a heuristic: if the interaction was mouse-based, `:focus-visible` is not applied; if keyboard-based, it is. This satisfies both the designer's visual requirement and WCAG 2.4.7 (Focus Visible).",
    },
    // ─── Q8 ───
    {
      id: "css-adv-08",
      scenario:
        "A front-end architect is designing a component library. They want container queries instead of viewport media queries so a 'card' component can respond to the size of its own parent container, not the viewport — enabling it to be used in both a sidebar and a full-width section.",
      question:
        "What is the correct CSS syntax to enable a container query on a card component?",
      options: [
        "Apply `@container-query: true` to the card element and reference `@container (min-width: 400px)` inside the card's CSS.",
        "Define `container-type: inline-size` (or `size`) on the *parent/wrapper* element, then use `@container (min-width: 400px) { ... }` to style the *card's children*.",
        "Container queries use viewport units (`cqvw`, `cqvh`) applied directly to child elements; no parent declaration is needed.",
        "Use `@media container(min-width: 400px)` as the standard media query syntax with a `container` keyword.",
      ],
      correctIndex: 1,
      explanation:
        "Container queries have two parts: (1) establishing a containment context on the *parent* via `container-type: inline-size`, and (2) querying that context within the *child's* CSS using `@container`. The card's styles can now react to its parent's width, not the viewport.",
    },
    // ─── Q9 ───
    {
      id: "css-adv-09",
      scenario:
        "The UX team requests a layout where a sidebar is always 280px wide, and the main content area fills all remaining horizontal space, without using JavaScript to calculate widths.",
      question:
        "What is the canonical one-line CSS Flexbox declaration on the main content area to achieve this?",
      options: [
        "`flex: 0 0 calc(100% - 280px)`",
        "`width: auto; margin-left: 280px;`",
        "`flex: 1` (shorthand for `flex-grow: 1; flex-shrink: 1; flex-basis: 0%`)",
        "`flex: 1 0 auto`",
      ],
      correctIndex: 2,
      explanation:
        "`flex: 1` sets `flex-grow: 1`, instructing the element to grow and consume all available space in the flex container after fixed-width siblings (the 280px sidebar) have been sized. This is the idiomatic pattern for 'fill remaining space' in Flexbox.",
    },
    // ─── Q10 ───
    {
      id: "css-adv-10",
      scenario:
        "A developer notices the `::before` pseudo-element they created on a `<span>` is not rendering at all in the browser, despite having `content`, `display: block`, and color styles defined.",
      question:
        "On which HTML element categories do CSS pseudo-elements (`::before`, `::after`) NOT render, and why?",
      options: [
        "They do not render on block-level elements; only inline elements support pseudo-elements.",
        "They do not render on replaced elements (e.g., `<img>`, `<input>`, `<video>`, `<br>`), because these elements have no content box of their own for pseudo-elements to be inserted into.",
        "They do not render on `<span>` unless the span has `position: relative` applied.",
        "They do not render if the parent has `overflow: hidden`.",
      ],
      correctIndex: 1,
      explanation:
        "Pseudo-elements insert generated content *inside* an element's content model. Replaced elements (`<img>`, `<input>`, etc.) are atomic, self-contained elements whose rendering is outside CSS's control — they have no 'before' or 'after' content area. `<span>` is not a replaced element, so if it's not rendering, the likely culprit is a missing `content: ''` or `display` value.",
    },
    // ─── Q11 ───
    {
      id: "css-adv-11",
      scenario:
        "A front-end team is adopting a utility-first approach using Tailwind CSS in a large Next.js application. The production CSS bundle is reported to be 4.2MB, severely impacting First Contentful Paint.",
      question:
        "Why is a 4.2MB Tailwind CSS bundle a misconfiguration, and what is the root fix?",
      options: [
        "Tailwind's default bundle is always large; it must be used with a CDN to compress the size.",
        "The `content` array in `tailwind.config.js` is likely missing or misconfigured. Without specifying the file paths to scan, Tailwind's purge/tree-shaking cannot remove unused utilities, including all 10,000+ generated classes in the full stylesheet.",
        "Tailwind v3 removed tree-shaking; developers must manually delete utility files they don't use.",
        "Next.js does not support Tailwind's JIT compiler, so the full stylesheet is always included.",
      ],
      correctIndex: 1,
      explanation:
        "Tailwind uses a scanner (via the `content` config key) to detect which utility classes are used in your source files. It then generates *only* those classes. A misconfigured or missing `content` array causes Tailwind to emit its entire stylesheet. A correct production build should yield a CSS bundle under 20kb for most applications.",
    },
    // ─── Q12 ───
    {
      id: "css-adv-12",
      scenario:
        "A developer uses `z-index: 9999` on a modal overlay to ensure it appears above all content. However, a dropdown component inside a different section still renders on top of the modal.",
      question:
        "What CSS concept explains why a high `z-index` alone does not guarantee the element appears above all other elements?",
      options: [
        "The `z-index` property only works on absolutely positioned elements, so the modal must also have `position: absolute`.",
        "Stacking Contexts. Certain CSS properties (like `transform`, `opacity < 1`, `isolation: isolate`, `will-change`) create a new stacking context, which acts as a local z-index ceiling. An element inside one stacking context can never render above an element in a sibling stacking context that has a higher z-index, regardless of its own z-index value.",
        "Browsers cap `z-index` at 1000; values above that are ignored.",
        "The `z-index` of the modal's parent overrides the child's z-index when the values conflict.",
      ],
      correctIndex: 1,
      explanation:
        "Stacking contexts are isolated z-index scopes. If a parent has `transform: translateZ(0)` (a common GPU-acceleration hack), it creates a new stacking context. No child inside it, regardless of its z-index, can escape that context. The standard fix is `isolation: isolate` on the portal container and rendering modals at the `<body>` root level.",
    },
    // ─── Q13 ───
    {
      id: "css-adv-13",
      scenario:
        "The design team introduces a new typography system. A junior developer implements all font sizes using absolute pixel values (e.g., `font-size: 16px`). A senior developer requests they be converted to `rem` units.",
      question:
        "What is the precise technical and accessibility rationale for using `rem` over `px` for font sizes?",
      options: [
        "`rem` is required by all modern CSS frameworks and is a mandatory part of the CSS specification.",
        "`rem` is relative to the root element's (`<html>`) font size. When a user increases their browser's default font size in accessibility settings, `rem`-based fonts scale accordingly. `px` values are absolute and will not respect the user's font size preference, failing WCAG 1.4.4 (Resize Text).",
        "`rem` values are automatically compressed by gzip, reducing the total CSS file size.",
        "`px` units are deprecated in CSS3 and will be removed in future browser releases.",
      ],
      correctIndex: 1,
      explanation:
        "This is a critical accessibility principle. Many users with low vision increase their browser's default font size (e.g., from 16px to 20px). If your CSS uses `px`, those texts will not scale with the user's preference. `rem` units respect the root font size, inherently supporting user-defined scaling.",
    },
    // ─── Q14 ───
    {
      id: "css-adv-14",
      scenario:
        "A developer wants to apply styles based on a condition in CSS without JavaScript — specifically, showing an `.error-message` element only when a sibling `<input>` is in an invalid state and has been interacted with (not on initial page load).",
      question:
        "What CSS pseudo-class combination achieves 'show error only after the user has touched the field'?",
      options: [
        "`input:invalid + .error-message { display: block; }` — applied on page load.",
        "`input:invalid:not(:placeholder-shown) + .error-message { display: block; }` — shows error only when the field has been interacted with (placeholder is hidden, meaning user typed) and is invalid.",
        "`input:required + .error-message { display: block; }` — triggers whenever the field is required.",
        "This behavior requires JavaScript event listeners; it cannot be implemented in pure CSS.",
      ],
      correctIndex: 1,
      explanation:
        "`:placeholder-shown` is true when the placeholder is visible — i.e., the field is empty and untouched. Combining `:invalid:not(:placeholder-shown)` means: 'the field is invalid AND the user has started typing' (placeholder hidden). This pure-CSS pattern delivers UX-friendly validation without JavaScript.",
    },
    // ─── Q15 ───
    {
      id: "css-adv-15",
      scenario:
        "A news site wants to display a multi-column article layout like a newspaper on desktop — text flowing across three columns automatically — without JavaScript text-splitting libraries.",
      question:
        "Which CSS property creates a native multi-column text flow layout?",
      options: [
        "`display: grid; grid-template-columns: repeat(3, 1fr);` with each paragraph as a grid item.",
        "`column-count: 3` or `columns: 3 200px` on the article container, allowing the browser to automatically flow text content across all columns.",
        "`flex-wrap: wrap` with each sentence assigned `flex: 0 0 33%`.",
        "`text-align: justify` with `word-spacing: auto` on the article body.",
      ],
      correctIndex: 1,
      explanation:
        "The CSS Multi-column Layout module (`column-count`, `column-width`, `column-gap`, `column-rule`) is purpose-built for newspaper-style text columns. Content flows naturally from the bottom of one column to the top of the next — no JavaScript splitting required.",
    },
    // ─── Q16 ───
    {
      id: "css-adv-16",
      scenario:
        "The engineering team wants to lazy-load non-critical CSS to improve page load performance. A developer proposes using `<link rel='stylesheet' media='print' onload='this.media=\"all\"'>`.",
      question: "Why does this pattern successfully defer render-blocking CSS?",
      options: [
        "The `media='print'` attribute forces the browser to skip downloading the stylesheet entirely until the user triggers the print dialog.",
        "Browsers do not render-block stylesheets whose media type does not match the current environment. Setting `media='print'` prevents the stylesheet from blocking the initial render; the `onload` callback then changes the media to `all`, making it apply immediately once downloaded in the background.",
        "The `onload` attribute on a `<link>` tag is a non-standard extension that only works in Chrome-based browsers.",
        "The stylesheet is downloaded into the service worker cache and applied after the page becomes interactive.",
      ],
      correctIndex: 1,
      explanation:
        "Render-blocking CSS is a major FCP bottleneck. The `media` attribute signals to the browser whether a stylesheet is critical for the current rendering context. `media='print'` is known to be irrelevant for screen rendering, so the browser downloads it with low priority without blocking paint. The `onload` switch to `all` then applies the styles seamlessly.",
    },
    // ─── Q17 ───
    {
      id: "css-adv-17",
      scenario:
        "A design system uses CSS Custom Properties. A developer sets `--color-brand: #0057FF` on `:root`. A component deep in the tree sets `--color-brand: red` on itself. Its child elements all render the brand color as red, even though they never declared it.",
      question:
        "What fundamental CSS Custom Property behavior explains this outcome?",
      options: [
        "CSS Custom Properties are global and the last declaration always wins regardless of scope.",
        "CSS Custom Properties participate in the standard CSS cascade and inherit. When a property is redefined on an element, all its descendants consume the new value through normal CSS inheritance, overriding the `:root` value for that subtree.",
        "This is a browser bug. Custom properties defined on an element should only apply to that element, not its descendants.",
        "Custom Properties follow BEM block scoping rules.",
      ],
      correctIndex: 1,
      explanation:
        "Unlike preprocessor variables (which are compiled away), CSS Custom Properties are live runtime values that cascade and inherit down the DOM tree. This is a feature, not a bug — it enables the scoped theming pattern where a component can override a token for all its descendants without affecting the rest of the page.",
    },
    // ─── Q18 ───
    {
      id: "css-adv-18",
      scenario:
        "The performance team discovers a page using scroll-based animations. The animations are implemented using a `scroll` event listener in JavaScript that reads `scrollTop` and updates element `style.top` values. On mid-range devices, the animation lags noticeably behind the user's scroll.",
      question:
        "What native CSS feature eliminates the JavaScript scroll listener overhead for scroll-driven animations?",
      options: [
        "CSS `@keyframes` with `animation-trigger: scroll` in the keyframe definition.",
        "The CSS `@scroll-timeline` at-rule combined with the `animation-timeline` property (or the newer `scroll()` and `view()` animation timeline functions), which attach CSS animations directly to the scroll offset natively in the browser's compositor.",
        "Setting `transform: translateZ(0)` on the animated element forces scroll tracking to the GPU.",
        "Using `position: sticky` with `top` and `bottom` offsets to create the illusion of scroll animation.",
      ],
      correctIndex: 1,
      explanation:
        "CSS Scroll-Driven Animations (using `animation-timeline: scroll()` or `view()`) run entirely off the main thread in the browser's compositor. This eliminates the JS event → style recalculation loop that causes scroll jank, delivering perfectly smooth animations tied to scroll position.",
    },
    // ─── Q19 ───
    {
      id: "css-adv-19",
      scenario:
        "A developer needs to override styles from a third-party CSS library. They find the only way to override a rule is to add `!important` to their own style. Their tech lead flags this as creating 'specificity debt'.",
      question:
        "What modern CSS at-rule provides a formal, cascade-aware mechanism for managing style layering priorities without `!important` escalation?",
      options: [
        "`@scope` — to confine the third-party styles to a specific subtree.",
        "`@layer` — which allows defining explicit named cascade layers (e.g., `base`, `utilities`, `components`). Styles in a later-declared layer always win over earlier layers, regardless of selector specificity.",
        "`@import url() layer()` — which prevents imported stylesheets from participating in the cascade at all.",
        "`@property` — which allows redefining custom property inheritance to resolve specificity conflicts.",
      ],
      correctIndex: 1,
      explanation:
        "`@layer` introduces the concept of *cascade layers* to CSS. You declare layers in order: `@layer third-party, overrides;`. Any styles in the `overrides` layer win over `third-party`, regardless of specificity. This is the architectural solution to specificity wars.",
    },
    // ─── Q20 ───
    {
      id: "css-adv-20",
      scenario:
        "A SaaS dashboard requires a sidebar that is always visible on desktop but collapses off-screen on mobile. A junior developer toggles `display: none` / `display: block` via JavaScript. A senior engineer asks for a CSS-only, animation-friendly solution.",
      question:
        "Why is animating `display: none` to `display: block` a limitation, and what CSS pattern achieves an animated entrance/exit?",
      options: [
        "`display` is not animatable because it is a discrete (non-interpolatable) property — there is no intermediate state between 'none' and 'block'. Use `transform: translateX(-100%)` combined with `visibility: hidden / visible` and a CSS transition to slide the sidebar off-screen smoothly.",
        "Use `opacity: 0` instead of `display: none`, as they are functionally identical but `opacity` is animatable.",
        "Use JavaScript's `requestAnimationFrame` to incrementally change `display` from `none` to `block` over 300 frames.",
        "`display` can be animated using `@keyframes` by specifying `display: none` at `0%` and `display: block` at `100%`.",
      ],
      correctIndex: 0,
      explanation:
        "`display` is a discrete CSS property — it has no in-between states, so transitions have no effect on it. The standard pattern is: keep the element in flow with `transform: translateX(-100%)` and `visibility: hidden` for the hidden state. Transitioning `transform` is GPU-composited and smooth. Note: CSS `@starting-style` (a newer spec) is now enabling entry transitions from `display: none`, but the transform pattern remains the most broadly supported.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// SET 2 — JavaScript: Runtime Internals, Async & Engineering Patterns
// ═══════════════════════════════════════════════════════════════════════════════

const JavaScriptAdvancedModule = {
  meta: {
    id: "js-advanced-v1",
    testTitle: "JavaScript: Runtime Internals, Async & Engineering Patterns",
    topic: "webdev-integration",
    topicLabel: "Language & Runtime",
    difficulty: "Advanced",
    questionCount: 20,
    estimatedMinutes: 25,
    description:
      "Deep-dive scenarios on the V8 engine, event loop, closures, prototype chain, memory management, async patterns, and production JavaScript architecture.",
    icon: "⚙️",
  },

  questions: [
    // ─── Q1 ───
    {
      id: "js-adv-01",
      scenario:
        "A real-time trading dashboard fetches market prices every 500ms using `setInterval`. After running for several hours, the engineering team observes steadily increasing memory consumption. Heap snapshots reveal thousands of detached DOM nodes and retained Promise chains.",
      question:
        "What is the most likely root cause of the memory growth, and what is the correct remediation?",
      options: [
        "The `setInterval` ID is never cleared. Each interval fires a fetch, and if prior Promises haven't resolved before the next interval fires, pending Promise microtasks accumulate. Additionally, if the callback references DOM elements that are later removed, they are retained in closure scope, creating detached node leaks.",
        "JavaScript's garbage collector does not collect data fetched from external APIs; a manual `.destroy()` method must be called on each response object.",
        "The dashboard is using too many `async/await` keywords, which disable garbage collection for async function scopes.",
        "Memory growth over time in a browser tab is normal and expected; the OS will reclaim the memory when the tab is closed.",
      ],
      correctIndex: 0,
      explanation:
        "This is a compound memory leak pattern: (1) Uncleared intervals that accumulate if the previous async operation is still pending, (2) Closures inside interval callbacks capturing references to DOM nodes, keeping them alive even after removal. The fix involves using `clearInterval` in a cleanup effect, implementing abort controllers to cancel in-flight fetches, and nullifying DOM references.",
    },
    // ─── Q2 ───
    {
      id: "js-adv-02",
      scenario:
        "A developer writes the following code expecting all three `console.log` calls to output their respective index values: `for (var i = 0; i < 3; i++) { setTimeout(() => console.log(i), 0); }`. The output is `3 3 3` instead of `0 1 2`.",
      question:
        "What is the precise JavaScript runtime mechanism causing this behavior, and what are two ways to fix it?",
      options: [
        "`setTimeout` executes in parallel threads, so `i` is always evaluated at a random point. Fix: use Web Workers.",
        "`var` is function-scoped (not block-scoped), so all three closures reference the same single variable `i`. By the time the event loop runs the callbacks (after the synchronous loop completes), `i` is already `3`. Fix 1: Replace `var` with `let` (which is block-scoped, creating a new `i` binding per iteration). Fix 2: Use an IIFE to capture the current value: `(function(j) { setTimeout(() => console.log(j), 0); })(i)`.",
        "The closures are evaluated synchronously at definition time. The bug is in the `< 3` comparison. Fix: change the loop to `i <= 3`.",
        "`setTimeout` with `0ms` delay fires before the loop completes due to microtask queue priority. Fix: increase the delay to `100ms`.",
      ],
      correctIndex: 1,
      explanation:
        "This is the canonical JavaScript closure-in-loop gotcha. `var` hoists to the function scope, so one binding of `i` is shared across all closures. `let` creates a new lexical binding per block iteration, each closure capturing its own snapshot of `i`. This is one of the primary reasons `let` was introduced in ES6.",
    },
    // ─── Q3 ───
    {
      id: "js-adv-03",
      scenario:
        "A fintech application's critical payment processing function needs to call three independent API services simultaneously (fraud check, balance verification, payment gateway) and proceed only when all three resolve successfully. If any one fails, the entire operation should abort immediately.",
      question:
        "Which `Promise` combinator is architecturally correct for this requirement?",
      options: [
        "`Promise.allSettled()` — waits for all to complete regardless of outcome, then processes the results array.",
        "`Promise.race()` — resolves as soon as the first Promise settles, whether fulfilled or rejected.",
        "`Promise.all()` — returns a Promise that resolves only when *all* input Promises have fulfilled, and rejects immediately (short-circuiting) if *any* input Promise rejects.",
        "`Promise.any()` — resolves as soon as any one Promise fulfills, perfect for the 'first success wins' scenario.",
      ],
      correctIndex: 2,
      explanation:
        "`Promise.all()` implements the 'all-or-nothing' contract: concurrent execution, a single resolved value array if all succeed, and fast-fail rejection the moment any Promise rejects. `allSettled` would require manual inspection of each result's `.status`, adding latency; `race` is for first-to-respond scenarios.",
    },
    // ─── Q4 ───
    {
      id: "js-adv-04",
      scenario:
        "A product search bar calls an API on every keystroke. With 60 keystrokes per minute from a power user, the server is receiving 60 requests per minute per user, most of which are redundant. The DevOps team reports elevated server load.",
      question:
        "What is the correct technique to reduce redundant API calls from high-frequency input events, and what is the precise behavioral difference between the two main approaches?",
      options: [
        "Use `throttle`: fires the function at most once per interval. Use `debounce`: delays firing until the event has stopped for a specified duration. For a search bar, **debounce** is correct because you want to fire only after the user *stops* typing, not on a fixed interval.",
        "Use `throttle`: delays the function until the event stops. Use `debounce`: fires on a fixed interval. For a search bar, **throttle** is correct.",
        "Both throttle and debounce produce identical outcomes for input events. Either can be used interchangeably.",
        "The correct solution is to use a `Web Worker` to batch keystrokes before forwarding them to the main thread for API calls.",
      ],
      correctIndex: 0,
      explanation:
        "Debounce 'waits for the storm to pass' — the function fires only after `n` milliseconds of silence, making it ideal for search inputs. Throttle 'fires at most once per interval' regardless of event volume — useful for scroll events or resize handlers. Applying a 300ms debounce to a search input reduces API calls to roughly one per search query instead of one per keystroke.",
    },
    // ─── Q5 ───
    {
      id: "js-adv-05",
      scenario:
        "A developer discovers a critical function that is called hundreds of times per second with the same arguments in a computation-heavy 3D visualization tool. They propose caching the function's outputs to avoid redundant computation.",
      question:
        "What functional programming pattern implements this caching strategy, and what is a critical constraint on which functions it can be applied to?",
      options: [
        "Currying — transforms a multi-argument function into a sequence of single-argument functions. It can be applied to any function.",
        "Memoization — caches the return value for a given set of inputs and returns the cached result on subsequent calls with identical inputs. It can only be correctly applied to **pure functions** (deterministic, no side effects), as impure functions may produce different outputs for the same inputs at different times.",
        "Debouncing — delays the function call, which effectively reduces the number of executions. It can be applied to any function.",
        "Lazy evaluation — defers computation until the result is actually needed. It requires Generator functions and `yield` syntax.",
      ],
      correctIndex: 1,
      explanation:
        "Memoization is the performance pattern for expensive pure functions. A cache (typically a `Map`) stores `(arguments → result)` pairs. On subsequent calls with the same arguments, the cached result is returned immediately. The purity constraint is critical: a memoized function that reads from a database or has side effects would return stale, incorrect cached values.",
    },
    // ─── Q6 ───
    {
      id: "js-adv-06",
      scenario:
        "A developer adds `console.log(a)` at the top of a function before `var a = 5;` is declared. Instead of a `ReferenceError`, the output is `undefined`.",
      question:
        "What V8 engine compilation phase produces this behavior, and how does it differ with `let` and `const`?",
      options: [
        "The JavaScript parser reads files twice — first to handle `console.log` calls, then to handle variable declarations. On the second pass, `a` gets the value `5`.",
        "This is **hoisting**. During the compilation phase, the V8 engine hoists `var` declarations to the top of their function scope and initializes them to `undefined`. By runtime, `a` exists in scope but has not yet been assigned. With `let` and `const`, declarations are hoisted to the top of the block but are placed in a **Temporal Dead Zone (TDZ)** — accessing them before their declaration line throws a `ReferenceError`.",
        "This is expected behavior for all variable declarations in JavaScript. `let` and `const` would also output `undefined`.",
        "This is a browser-specific bug in the V8 engine. SpiderMonkey (Firefox) would throw a `ReferenceError`.",
      ],
      correctIndex: 1,
      explanation:
        "Hoisting is a fundamental V8 compilation step. `var` is forgiving — it hoists and initializes to `undefined`. `let` and `const` are stricter — they hoist but are uninitialized in the TDZ, making their behavior more predictable and bugs easier to catch. This is why `let`/`const` are preferred in modern code.",
    },
    // ─── Q7 ───
    {
      id: "js-adv-07",
      scenario:
        "A senior architect reviews code where `Object.prototype` has been modified directly — `Object.prototype.deepClone = function() {...}`. They reject the PR immediately, flagging it as a critical anti-pattern.",
      question:
        "What are the two primary dangers of modifying built-in prototypes like `Object.prototype` in production applications?",
      options: [
        "The method will be slower because prototype chain lookups are linear in complexity.",
        "(1) **Enumeration pollution**: `for...in` loops iterate over all enumerable properties on an object, including inherited ones. Adding custom methods to `Object.prototype` makes them appear in all `for...in` loops across the codebase and all third-party libraries, causing unpredictable bugs. (2) **Global namespace collision**: if another library adds a method with the same name or the spec later adopts that name natively (as happened with `Array.prototype.contains` vs `Array.prototype.includes`), it creates hard-to-debug conflicts.",
        "JavaScript does not allow modification of built-in prototypes; the assignment is silently ignored.",
        "It prevents TypeScript from inferring the correct types for all Object instances.",
      ],
      correctIndex: 1,
      explanation:
        "Modifying `Object.prototype` is a globally destructive operation — every object in the JavaScript runtime inherits from it. The `for...in` pollution issue has historically broken many production applications and jQuery plugins. It is universally considered one of the most dangerous JavaScript anti-patterns.",
    },
    // ─── Q8 ───
    {
      id: "js-adv-08",
      scenario:
        "A developer is implementing a notification permission request. The UI calls `Notification.requestPermission()`. In Chrome, it returns a Promise. In an older Safari, it uses a callback pattern. The developer needs a single interface to handle both.",
      question:
        "What JavaScript pattern normalizes a function that may return either a Promise or accept a callback into a unified Promise-based API?",
      options: [
        "Use `try/catch` to determine which pattern is in use at runtime.",
        "Wrap the function in a `new Promise((resolve, reject) => { ... })` constructor, explicitly calling `resolve` in the callback path and letting the native `.then()` chain handle the Promise path — this is called **promisification**.",
        "Use `async/await` syntax; it automatically handles both callbacks and Promises transparently.",
        "Call the function twice — once with a callback and once awaiting the Promise — and use whichever resolves first.",
      ],
      correctIndex: 1,
      explanation:
        "Promisification is the process of wrapping callback-based APIs in a `new Promise()` to modernize them. Node.js provides `util.promisify()` for this. This is the exact pattern used to bridge legacy callback APIs (like the old `Notification.requestPermission`) into a consistent async/await flow.",
    },
    // ─── Q9 ───
    {
      id: "js-adv-09",
      scenario:
        "A developer implements a deep-copy utility with `const copy = JSON.parse(JSON.stringify(original))`. In QA testing, it is discovered that `Date` objects become strings, `undefined` values and functions are silently dropped, and `Map` and `Set` instances become empty objects `{}`.",
      question:
        "What are the limitations of `JSON.parse(JSON.stringify())` for deep cloning, and what are the production-grade alternatives?",
      options: [
        "This utility is completely broken and will throw an error; `JSON.stringify` cannot serialize object graphs.",
        "`JSON.stringify` only serializes JSON-safe values. It silently drops `undefined`, `Symbol`, and `Function` values; converts `Date` to ISO strings; and reduces `Map`, `Set`, `RegExp` to `{}` or `[]`. Production alternatives: (1) `structuredClone()` — the native browser/Node API designed for this, supporting Dates, Maps, Sets, and typed arrays. (2) Libraries like Lodash `_.cloneDeep()` for complex graphs with circular references.",
        "The limitation is only with `undefined` values; all other types are handled correctly. Fix: replace `undefined` with `null` before cloning.",
        "`JSON.parse` is asynchronous in modern browsers, so the copy operation needs to be awaited.",
      ],
      correctIndex: 1,
      explanation:
        "`JSON.stringify` was designed for data serialization (network transfer), not object cloning. `structuredClone()` was added to both browsers and Node.js specifically to solve this, handling the full range of cloneable types including transferable objects. It also correctly throws on non-cloneable types (like functions) rather than silently dropping them.",
    },
    // ─── Q10 ───
    {
      id: "js-adv-10",
      scenario:
        "An application's UI freezes for ~1.5 seconds when processing a large CSV file (100,000 rows) in the main thread. During this time, user interactions (button clicks, scrolling) are completely unresponsive.",
      question:
        "What Web API is specifically designed to move CPU-intensive computation off the main thread to prevent UI blocking?",
      options: [
        "`requestAnimationFrame()` — which schedules work during the browser's render cycle.",
        "`setTimeout(fn, 0)` — which yields control back to the browser before continuing execution.",
        "A **Web Worker** — which runs a separate JavaScript execution context in a background OS thread, communicating with the main thread via `postMessage()` / `onmessage` events, completely freeing the UI thread.",
        "An `async` function with `await` — which moves the computation to the microtask queue, unblocking the UI.",
      ],
      correctIndex: 2,
      explanation:
        "JavaScript is single-threaded on the main thread. `async/await` and `setTimeout` are still bound to the main event loop; they yield between tasks but don't parallelize CPU work. Web Workers are true OS-level threads with separate memory, designed for exactly this use case. Results are marshalled back to the main thread via the structured clone algorithm.",
    },
    // ─── Q11 ───
    {
      id: "js-adv-11",
      scenario:
        "A data analytics dashboard holds a reference to a large dataset object in a module-level variable. The dataset is refreshed every 15 minutes by assigning a new object. However, Chrome's Memory panel shows the old objects are never garbage collected.",
      question:
        "What type of JavaScript reference pattern causes this, and how does `WeakMap` or `WeakRef` address it?",
      options: [
        "Module-level variables are stored in the OS page file, not JavaScript memory, so the GC doesn't manage them.",
        "A strong reference from a module-level variable prevents garbage collection indefinitely since the variable itself is never dereferenced. `WeakMap` and `WeakRef` hold **weak references** — they do not prevent the garbage collector from reclaiming the object. If the only remaining reference to an object is a `WeakRef`, the GC is free to collect it. This is used for caches and event listeners that should not keep objects alive artificially.",
        "JavaScript module-level variables are automatically garbage collected after a 15-minute idle period by the V8 GC.",
        "The solution is to call `delete window.dataset` after each refresh cycle.",
      ],
      correctIndex: 1,
      explanation:
        "Strong references (normal variable assignments) form reachability roots that prevent GC. When you reassign a module variable, the old object is dereferenced *from that variable*, but if any other strong reference exists (e.g., in a closure, event listener, or Map key), it survives. `WeakRef` and `WeakMap` are designed for this: they allow the GC to collect the object when no strong references remain.",
    },
    // ─── Q12 ───
    {
      id: "js-adv-12",
      scenario:
        "A React application's context API broadcasts a shared user authentication object. Every time any property of the user object changes (e.g., `lastSeenAt` timestamp updates every minute), all consuming components re-render, causing visible performance issues.",
      question:
        "At a fundamental JavaScript level, why do components always re-render even when the data they use hasn't changed, and what is the root cause?",
      options: [
        "React's Virtual DOM diffing algorithm has a bug when dealing with nested objects.",
        "Context consumers re-render when the context value changes. Since a new user object is created on each update (`{ ...user, lastSeenAt: now }`), the **reference equality** check (`===`) always returns `false` even if the data is semantically identical. JavaScript's `===` on objects compares by *reference*, not by *value*. The fix involves memoizing the context value with `useMemo`, splitting contexts, or using atomic state management.",
        "Re-rendering all consumers on any context update is the architecturally correct behavior; it ensures data consistency.",
        "This is caused by `lastSeenAt` being an impure function. Pure functions should be used in context values.",
      ],
      correctIndex: 1,
      explanation:
        "This is a direct consequence of JavaScript's reference equality semantics for objects. `{ a: 1 } === { a: 1 }` is `false` because they are different objects in memory. React's context and `memo` checks use `Object.is` (strict equality), so a newly constructed object always triggers consumers, even with identical data. This is one of the most common React performance pitfalls.",
    },
    // ─── Q13 ───
    {
      id: "js-adv-13",
      scenario:
        "A developer builds a plugin system for an enterprise SaaS product. Each plugin can register custom event handlers. When a plugin is uninstalled, its event handlers should be removed. They are using `element.addEventListener('click', handler)`. After uninstalling, the handlers are still firing.",
      question:
        "What JavaScript rule must be observed to successfully `removeEventListener`, and what pattern guarantees it?",
      options: [
        "`removeEventListener` requires the element to be hidden with `display: none` first.",
        "**`removeEventListener` requires a reference to the exact same function object used in `addEventListener`.** Anonymous functions and arrow functions defined inline create a new function object each time, making removal impossible. The fix: store the handler in a named variable or closure, or use an `AbortController` with `signal: controller.signal` in `addEventListener`, and call `controller.abort()` to remove all associated handlers atomically.",
        "Event listeners are removed automatically when the plugin module is unloaded from memory.",
        "You must pass `{ once: true }` to `addEventListener` to enable the remove functionality.",
      ],
      correctIndex: 1,
      explanation:
        "Function identity is the foundation of event listener management. The `AbortController` pattern (introduced for fetch cancellation, now extended to DOM events) is particularly elegant for plugin systems: one `controller.abort()` call removes all listeners registered with that signal, without needing to track individual function references.",
    },
    // ─── Q14 ───
    {
      id: "js-adv-14",
      scenario:
        "A security audit of a company's JavaScript frontend flags the use of `eval()` in a data transformation utility as a P0 (critical) security vulnerability.",
      question:
        "Why is `eval()` considered a critical security risk, and what specific attack vector does it enable?",
      options: [
        "`eval()` is deprecated in ES6 and will throw an error in strict mode.",
        "`eval()` executes a string as JavaScript code in the current scope. If the input string is influenced by user-provided data (e.g., from URL parameters, form inputs, or API responses), an attacker can inject arbitrary JavaScript — this is **Code Injection (a form of XSS)**. The injected code runs with the full privileges of the application, enabling cookie theft, local storage exfiltration, or remote code execution via dynamic script injection.",
        "The security risk of `eval()` is limited to performance degradation, as it prevents V8 JIT optimizations.",
        "`eval()` is only dangerous in Node.js environments; in the browser sandbox, it cannot access system resources.",
      ],
      correctIndex: 1,
      explanation:
        "`eval()` is the browser equivalent of SQL injection — it converts data into executable code. Even indirect eval patterns like `new Function(str)`, `setTimeout('string', 0)`, or `setInterval('string', 0)` carry the same risk. The Content Security Policy (CSP) header with `script-src: 'unsafe-eval'` blocked is an infrastructure-level defense, but the correct fix is eliminating `eval()` from the codebase.",
    },
    // ─── Q15 ───
    {
      id: "js-adv-15",
      scenario:
        "A developer exposes a configuration object from a module and wants to guarantee that neither the consuming code nor third-party plugins can modify, add, or delete properties on it at runtime.",
      question:
        "What is the difference between `Object.seal()`, `Object.freeze()`, and the `const` keyword regarding object mutability?",
      options: [
        "`const`, `seal`, and `freeze` are all identical — they all create completely immutable objects.",
        "`const` prevents reassignment of the *variable binding* but does **not** prevent mutation of the object's properties. `Object.seal()` prevents adding or deleting properties but allows modifying existing values. `Object.freeze()` prevents adding, deleting, AND modifying properties (making it shallowly immutable). For a deep, fully immutable config object, `Object.freeze()` must be applied recursively to all nested objects.",
        "`const` creates a new execution context for the object, preventing external access. `Object.freeze()` and `Object.seal()` are only applicable in strict mode.",
        "`Object.freeze()` is for Arrays; `Object.seal()` is for plain Objects; `const` is for primitives.",
      ],
      correctIndex: 1,
      explanation:
        "This is a critical distinction. `const obj = {}; obj.key = 'value'` works perfectly — `const` protects the binding (you can't `obj = {}`), not the contents. `Object.freeze()` is the correct tool for immutable objects, but it is *shallow* — nested objects must be frozen recursively (deep freeze) for complete immutability.",
    },
    // ─── Q16 ───
    {
      id: "js-adv-16",
      scenario:
        "A public SDK is being designed. The team wants to expose an iterable `UserCollection` class that developers can use with `for...of` loops and the spread operator `[...userCollection]`, just like native Arrays.",
      question:
        "What JavaScript protocol must a custom object implement to be compatible with `for...of`, destructuring, and the spread operator?",
      options: [
        "The object must extend `Array` and call `super()` in the constructor.",
        "The object must implement the **Iterable protocol** by defining a `[Symbol.iterator]()` method that returns an **Iterator** — an object with a `next()` method that returns `{ value: any, done: boolean }` objects.",
        "The object must define a `forEach` method, as `for...of` internally calls `forEach`.",
        "The object must have a `length` property greater than zero.",
      ],
      correctIndex: 1,
      explanation:
        "`for...of`, spread (`...`), and destructuring all operate on the Iterable protocol, not array-specific APIs. Any object with `[Symbol.iterator]()` returning a valid iterator is iterable. This is how native `Map`, `Set`, `String`, and `NodeList` achieve `for...of` support. Generator functions (`function*`) provide syntactic sugar for implementing iterators.",
    },
    // ─── Q17 ───
    {
      id: "js-adv-17",
      scenario:
        "The QA team identifies that a form validation library is throwing unhandled Promise rejections in production. `window.unhandledrejection` events are logged, but the source is unclear since they appear far from the original rejection site.",
      question:
        "What is an 'unhandled Promise rejection' and what are the two patterns that create them?",
      options: [
        "An unhandled rejection occurs when a `.then()` callback returns `undefined` instead of a value.",
        "An **unhandled Promise rejection** is a rejected Promise that has no `.catch()` handler or `try/catch` in an `async` function attached to it. It is created by: (1) Calling an `async` function but not awaiting it — the returned Promise carries any rejection silently (`fireAndForget()`). (2) Attaching a `.then()` without a corresponding `.catch()`, where an exception thrown inside `.then()` creates a rejected Promise with no handler. In Node.js, unhandled rejections crash the process by default in recent versions.",
        "An unhandled rejection is thrown only when a Promise rejects with a non-Error object (e.g., a string or number).",
        "They are caused by calling `reject()` more than once on the same Promise executor.",
      ],
      correctIndex: 1,
      explanation:
        "The 'fire and forget' async call pattern is the most common production source of unhandled rejections. Wrapping every `async` call with `try/catch` and attaching `.catch()` to every non-awaited Promise chain is essential. Global `window.addEventListener('unhandledrejection', ...)` and error monitoring tools (Sentry, Datadog) are used to surface these in production.",
    },
    // ─── Q18 ───
    {
      id: "js-adv-18",
      scenario:
        "A developer wants to build a reactive state management system from scratch. When a state property (e.g., `state.count`) changes, all registered observer functions should be notified automatically without explicit publish/subscribe calls.",
      question:
        "What native JavaScript mechanism enables automatic change detection when an object's property is read or written?",
      options: [
        "Polling `JSON.stringify(state)` every 100ms and comparing the output to detect changes.",
        "The **`Proxy`** object — which allows defining custom traps for fundamental operations on an object (e.g., `get`, `set`, `deleteProperty`). A `set` trap intercepts all property writes, enabling automatic notification of subscribers. This is the mechanism underlying Vue 3's Composition API (`reactive()`) and MobX's observable system.",
        "Using `Object.defineProperty()` with a custom `setter` for each property — though this requires knowing all property names at initialization time.",
        "Both B and C are valid. `Proxy` is the modern approach (handles dynamic properties); `Object.defineProperty` with setters is the legacy ES5 approach (used in Vue 2).",
      ],
      correctIndex: 3,
      explanation:
        "Both answers B and C are historically accurate. Vue 2 used `Object.defineProperty` (which is why adding new properties to reactive objects required `Vue.set()`). Vue 3 and MobX migrated to `Proxy`, which intercepts all property access dynamically, including newly added properties and array index mutations.",
    },
    // ─── Q19 ───
    {
      id: "js-adv-19",
      scenario:
        "A developer is writing a mixin utility: `function mixin(target, ...sources) { Object.assign(target, ...sources); }`. The QA team reports that `instanceof` checks on the mixed object fail, and methods from the source objects' prototypes are not being copied.",
      question:
        "What is the fundamental limitation of `Object.assign()` for implementing true mixins or deep extension?",
      options: [
        "`Object.assign()` performs a deep recursive copy of all properties including nested objects.",
        "`Object.assign()` copies only **own, enumerable properties** from source objects to the target. It does **not** copy prototype chain methods, non-enumerable properties (like those set via `Object.defineProperty` with `enumerable: false`), or property descriptors (getters/setters are invoked and their value is copied, not the descriptor itself).",
        "`Object.assign()` requires all arguments to be of the same object type.",
        "`Object.assign()` is not a valid mixing technique because it mutates the target, which is an anti-pattern.",
      ],
      correctIndex: 1,
      explanation:
        "`Object.assign` is a shallow, enumerable-own-property copier. For mixin-based systems, `Object.getOwnPropertyDescriptors()` combined with `Object.defineProperties()` preserves getters and setters correctly. For prototype chain integration, class mixins using `extends` with factory functions are the modern idiomatic approach.",
    },
    // ─── Q20 ───
    {
      id: "js-adv-20",
      scenario:
        "A developer needs to add metadata to a function — specifically, a 'permission level' tag — without modifying the function itself or adding properties to it. The metadata should not be accessible or iterable through normal object property enumeration.",
      question:
        "What JavaScript primitive is specifically designed to create unique, non-colliding, non-enumerable property keys for exactly this use case?",
      options: [
        "A private class field using `#` notation.",
        "A `WeakMap` with the function as the key and the metadata as the value.",
        "**`Symbol()`** — which creates a globally unique, non-string primitive value that can be used as an object property key. Symbol-keyed properties do not appear in `for...in` loops, `Object.keys()`, or `JSON.stringify()`, and cannot collide with string keys or other Symbols, making them ideal for metadata, capability flags, and library-internal properties.",
        "Both B and C are valid architectural approaches. `Symbol` stores metadata *on* the object; `WeakMap` stores it *alongside* the object in a separate structure without requiring the object to be mutable.",
      ],
      correctIndex: 3,
      explanation:
        "Both approaches are legitimate, with different trade-offs. `Symbol` is simpler and keeps metadata co-located with the object, but requires the object to be mutable. `WeakMap` is the preferred pattern when you want to associate metadata with an object you don't own (like a third-party function) without mutating it, and it also allows GC to collect the function-metadata pair once the function is unreachable.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// SET 3 — Integration: Browser APIs, Security, Performance & Architecture
// ═══════════════════════════════════════════════════════════════════════════════

const WebDevIntegrationModule = {
  meta: {
    id: "webdev-integration-v1",
    testTitle: "Web Dev Integration: Browser APIs, Security & Architecture",
    topic: "webdev-integration",
    topicLabel: "Full-Stack Frontend Engineering",
    difficulty: "Advanced",
    questionCount: 20,
    estimatedMinutes: 25,
    description:
      "Cross-cutting scenarios integrating browser APIs, web security models, rendering pipelines, network performance, and modern web architecture patterns.",
    icon: "🌐",
  },

  questions: [
    // ─── Q1 ───
    {
      id: "int-adv-01",
      scenario:
        "A developer builds a multi-origin microfrontend architecture. A child application hosted on `app.widget.io` tries to call `window.parent.postMessage()` and read data from `document.cookie` from the parent hosted on `shell.company.io`. Security restrictions are blocking the communication.",
      question:
        "What is the browser security model preventing this, and what is the correct API for secure cross-origin communication?",
      options: [
        "CORS headers on the shell server would resolve this by granting `app.widget.io` access to the parent's cookies.",
        "The **Same-Origin Policy (SOP)** prevents scripts from one origin (scheme + hostname + port) from reading data from another origin. Cross-origin cookie access is blocked by design. The correct API for secure, intentional cross-origin communication is `window.postMessage(data, targetOrigin)`. The receiving frame validates the `event.origin` in the `message` event listener, establishing a controlled message channel without violating SOP.",
        "iframes from different origins share the same JavaScript execution context; the restriction is only on network requests.",
        "Setting `document.domain` to a shared parent domain on both frames enables direct DOM and cookie access.",
      ],
      correctIndex: 1,
      explanation:
        "The Same-Origin Policy is the browser's most fundamental security boundary. `postMessage` was specifically introduced to enable structured, safe cross-origin communication. Always validate `event.origin` in the listener — failure to do so opens a cross-window scripting vulnerability where any origin can inject commands.",
    },
    // ─── Q2 ───
    {
      id: "int-adv-02",
      scenario:
        "A banking portal stores a user's sensitive authentication token in `localStorage`. A security audit flags this as a High-severity finding, noting XSS vulnerability as the attack vector.",
      question:
        "Why is `localStorage` considered insecure for authentication tokens, and what is the recommended storage mechanism?",
      options: [
        "`localStorage` data is unencrypted at the OS level and accessible to any user on the same machine, making it vulnerable to physical access attacks.",
        "`localStorage` is accessible to **any JavaScript running on that origin**, meaning a single successful XSS payload can exfiltrate the token with `localStorage.getItem('authToken')`. The recommended mechanism is storing tokens in **`HttpOnly` cookies** — a flag that instructs the browser to block JavaScript access to the cookie entirely, meaning XSS cannot read it. The trade-off: `HttpOnly` cookies require careful `SameSite` and `Secure` attribute configuration to prevent CSRF.",
        "The flaw is that `localStorage` sends the token automatically with every request, exposing it in network logs.",
        "`localStorage` should be replaced with `sessionStorage`, which is cleared on tab close and is therefore secure.",
      ],
      correctIndex: 1,
      explanation:
        "The `HttpOnly` cookie flag is the primary defense against token theft via XSS, as it creates a browser-enforced wall around the token. The `Secure` flag (HTTPS-only transmission) and `SameSite=Strict` or `Lax` (CSRF prevention) complete the secure cookie triad. `sessionStorage` is equally accessible to JavaScript and provides no security benefit over `localStorage`.",
    },
    // ─── Q3 ───
    {
      id: "int-adv-03",
      scenario:
        "The product team wants to add a feature where the SaaS app continues to function offline and loads instantly on repeat visits — similar to a native app. A senior engineer proposes 'making it a PWA'.",
      question:
        "What specific browser technology is the architectural cornerstone of Progressive Web App offline capabilities and instant loading?",
      options: [
        "The `Application Cache` (AppCache) manifest file, which pre-defines which assets to cache.",
        "A **Service Worker** — a JavaScript file that runs in a separate OS thread, intercepts all network requests from the page, and serves responses from a programmatic `Cache Storage` API. It can implement caching strategies (Cache First, Network First, Stale-While-Revalidate) to deliver offline-capable, instant-loading experiences.",
        "The browser's built-in HTTP cache (controlled by `Cache-Control` headers) is sufficient for offline functionality without additional code.",
        "A Web Worker combined with IndexedDB can replicate all Service Worker functionality.",
      ],
      correctIndex: 1,
      explanation:
        "AppCache is deprecated and removed from browsers. The Service Worker is the modern, scriptable network proxy that makes PWAs possible. Unlike the HTTP cache (which is browser-managed and evictable), the Service Worker's Cache Storage is developer-controlled and persists for offline use. The `stale-while-revalidate` strategy is the industry standard for balancing freshness with instant load performance.",
    },
    // ─── Q4 ───
    {
      id: "int-adv-04",
      scenario:
        "An e-commerce site suffers a successful XSS attack via a vulnerable product review field. The injected script calls `document.cookie` and exfiltrates session data to an attacker-controlled server (`evil.attacker.com`) via `fetch()`.",
      question:
        "Which HTTP response header, if correctly configured, would have prevented the injected script from executing in the first place?",
      options: [
        "`X-Frame-Options: DENY` — which prevents the page from being embedded in an iframe.",
        "`Content-Security-Policy (CSP)` with a `script-src 'self'` directive — which instructs the browser to only execute scripts from the same origin as the page, refusing to run any injected inline scripts or scripts loaded from `attacker.com`.",
        "`X-XSS-Protection: 1; mode=block` — which activates the browser's built-in XSS filter.",
        "`Referrer-Policy: no-referrer` — which prevents the referrer URL from being sent with outgoing requests.",
      ],
      correctIndex: 1,
      explanation:
        "CSP is the primary defense-in-depth XSS mitigation. `script-src 'self'` blocks inline script injection and scripts from untrusted origins. `connect-src` can additionally restrict which origins `fetch()` and XHR can communicate with, blocking exfiltration even if a script somehow executes. `X-XSS-Protection` is deprecated in modern browsers and was never a reliable defense.",
    },
    // ─── Q5 ───
    {
      id: "int-adv-05",
      scenario:
        "A developer notices that `font-size` changes and DOM insertions in a JavaScript animation loop are causing severe jank. Chrome's Performance timeline shows alternating 'Recalculate Style' and 'Layout' entries tightly interleaved in every frame.",
      question:
        "What is the term for this performance anti-pattern, and what is the correct approach to avoid it?",
      options: [
        "This is **Layout Thrashing** (also called Forced Synchronous Layout). It occurs when JavaScript alternately *reads* layout-dependent properties (e.g., `offsetWidth`, `getBoundingClientRect`) and *writes* DOM/style changes in the same synchronous call stack. Each read forces the browser to flush pending style/layout changes to return an accurate value. The fix is to **batch all reads first**, then **batch all writes**, or use `requestAnimationFrame` to schedule writes at the correct point in the rendering pipeline.",
        "This is called a 'Style Recalculation Loop' and is caused by using CSS transitions instead of JavaScript animations.",
        "This is caused by `font-size` being a GPU-accelerated property that triggers repaints on every frame.",
        "This is expected behavior during JavaScript animations. Using `requestIdleCallback` will resolve the jank.",
      ],
      correctIndex: 0,
      explanation:
        "Layout thrashing is one of the most impactful, diagnosable performance issues in JavaScript animations. The pattern 'read a geometry property → write a style → read again → write again' in a tight loop is the culprit. The `fastdom` library formalizes the batch-reads/batch-writes pattern. Libraries like GSAP handle this internally.",
    },
    // ─── Q6 ───
    {
      id: "int-adv-06",
      scenario:
        "A React-based SaaS application has a Time to Interactive (TTI) of 8.2 seconds on a 4G mobile connection. The JavaScript bundle is 3.4MB. The application routes are a monolith — the entire bundle is parsed and executed before any interaction is possible.",
      question:
        "What architectural strategy directly addresses a monolithic bundle's impact on TTI?",
      options: [
        "Minify and gzip the bundle. These techniques alone will reduce the 3.4MB to under 500KB.",
        "**Code Splitting with lazy loading.** Split the bundle at route and component boundaries using dynamic `import()`. The user downloads only the code needed for the initial view. Subsequent routes are loaded on-demand. Combined with React's `Suspense` and `lazy()`, this reduces the critical-path JS significantly. This is the primary technique recommended by Lighthouse for improving TTI.",
        "Migrate the entire application to Vue.js, which has a smaller runtime than React.",
        "Move all API calls from `useEffect` to `componentDidMount` to reduce the JavaScript execution budget.",
      ],
      correctIndex: 1,
      explanation:
        "Parse and execution time scales with bundle size. Code splitting (or 'lazy loading routes') reduces the amount of JS that must be parsed, compiled, and executed before the page is interactive. A well-code-split React app typically delivers the initial route in under 200KB of JS. Route-based splitting is the minimum viable strategy; component-level splitting of heavy libraries (rich text editors, chart libraries) is the advanced extension.",
    },
    // ─── Q7 ───
    {
      id: "int-adv-07",
      scenario:
        "A developer notices that browser navigation between pages in their single-page application (SPA) causes the back button to not behave as users expect — pressing 'Back' exits the application entirely instead of navigating to the previous view.",
      question:
        "What browser API must client-side routers use to integrate with the browser's native navigation history, and what is the difference between its two primary methods?",
      options: [
        "The `location.href` property — assigning a new URL triggers a full page reload but also adds to history.",
        "The **History API** (`window.history`). `history.pushState(state, title, url)` adds a new entry to the session history stack (enabling the back button), while `history.replaceState(state, title, url)` modifies the *current* history entry without adding a new one (used for redirects or correcting URLs without creating a back-nav step). `popstate` events are fired when the user navigates back/forward.",
        "The `Navigation API` (`navigation.navigate()`) — a newer API that replaces the History API entirely in all modern browsers.",
        "Client-side routers use `location.hash` (the `#` fragment) to manage navigation, as hash changes don't trigger network requests.",
      ],
      correctIndex: 1,
      explanation:
        "The History API is the foundational mechanism for all modern SPA routers (React Router, Vue Router, Next.js). `pushState` for new navigations, `replaceState` for redirects, and listening to `popstate` for back/forward form the complete browser navigation integration contract. The Navigation API is the next-generation replacement, but the History API remains the current universal standard.",
    },
    // ─── Q8 ───
    {
      id: "int-adv-08",
      scenario:
        "A government compliance requirement mandates that the web application must work on Internet Explorer 11 in addition to modern browsers. The codebase uses ES2022 features like optional chaining (`?.`), nullish coalescing (`??`), and `Promise.allSettled()`.",
      question:
        "What two-part toolchain strategy compiles modern JavaScript and polyfills missing APIs for legacy browser compatibility?",
      options: [
        "Use only ES5 syntax from the start; no tooling is needed.",
        "(1) **Babel** (or SWC/esbuild) as a **transpiler** — converts modern JavaScript syntax (`?.`, `??`, `class fields`) into ES5-compatible syntax that IE11 can parse. (2) **`core-js`** (via `@babel/preset-env`) as a **polyfill library** — adds missing runtime APIs (`Promise.allSettled`, `Array.prototype.flatMap`) to older environments at runtime. Babel handles syntax; polyfills handle missing built-ins.",
        "TypeScript alone is sufficient for IE11 compatibility, as it compiles to ES5 by default.",
        "Setting `<meta http-equiv='X-UA-Compatible' content='IE=Edge'>` enables IE11 to use Edge's rendering engine natively.",
      ],
      correctIndex: 1,
      explanation:
        "The transpiler vs. polyfill distinction is critical: a transpiler transforms *syntax* at build time (static transformation), while a polyfill patches missing *runtime APIs* at execution time (dynamic injection). Both are needed for full legacy compatibility. `@babel/preset-env` with a `browserslist` target automates the optimal combination, only including what's actually needed for the target browser set.",
    },
    // ─── Q9 ───
    {
      id: "int-adv-09",
      scenario:
        "A social media web application is embedded in a parent site using an iframe. The DevOps team discovers that a phishing site is wrapping their application in an iframe and overlaying invisible elements on top to trick users into clicking buttons they didn't intend to (like 'Transfer Funds').",
      question:
        "What specific attack is this, and what HTTP header(s) mitigate it?",
      options: [
        "This is **Clickjacking**. It is mitigated by the `X-Frame-Options` HTTP header (with values `DENY` or `SAMEORIGIN`) or the more modern `Content-Security-Policy: frame-ancestors 'self'` directive, both of which instruct the browser to refuse to render the page inside a cross-origin frame.",
        "This is Cross-Site Request Forgery (CSRF), mitigated by the `SameSite` cookie attribute.",
        "This is an Insecure Direct Object Reference (IDOR) attack, mitigated by server-side authorization checks.",
        "This is a CSS overlay attack, mitigated by setting `z-index: 99999` on all critical UI elements.",
      ],
      correctIndex: 0,
      explanation:
        "Clickjacking is the act of embedding a site in a transparent iframe and overlaying deceptive elements. `X-Frame-Options` was the original defense; `CSP frame-ancestors` is the modern, more flexible replacement (it supports more than two options and works correctly with legacy `X-Frame-Options` as a fallback). Both should be set for defense in depth.",
    },
    // ─── Q10 ───
    {
      id: "int-adv-10",
      scenario:
        "A developer needs to implement an 'Infinite Scroll' product feed. Their current implementation attaches a `scroll` event listener that calls `getBoundingClientRect()` on the last list item every scroll event to determine if it's near the viewport. On mobile devices, the page scrolling becomes sluggish.",
      question:
        "What native browser API eliminates the need for scroll event listeners and `getBoundingClientRect()` polling for this use case?",
      options: [
        "The `ResizeObserver` API — which fires a callback when an element's size changes.",
        "The **`IntersectionObserver` API** — which asynchronously fires a callback when a target element enters or exits the viewport (or a specified ancestor element). By observing the last list item, you receive a notification when it becomes visible, with zero scroll event overhead, running off the main thread.",
        "The `MutationObserver` API — which fires when the DOM tree changes, including when new list items are added.",
        "The `PerformanceObserver` API — which tracks rendering performance metrics including scroll frame rate.",
      ],
      correctIndex: 1,
      explanation:
        "`IntersectionObserver` was built specifically to replace inefficient scroll + `getBoundingClientRect` patterns. It is natively implemented in the browser compositor, not tied to the scroll event loop. It is the foundational API for lazy image loading, infinite scroll, analytics impression tracking, and sticky header logic.",
    },
    // ─── Q11 ───
    {
      id: "int-adv-11",
      scenario:
        "A developer building a real-time collaborative document editor (think Notion or Figma) needs persistent, bidirectional, low-latency communication between the client and server — where both the client AND server can push messages at any time without a new HTTP request.",
      question:
        "What web communication technology is architecturally suited for this requirement, and how does it differ from Server-Sent Events (SSE)?",
      options: [
        "HTTP Long Polling — the client makes a request, the server holds it open until data is available, then responds. Repeat.",
        "**WebSockets** — which establish a single, persistent, full-duplex TCP connection after an HTTP upgrade handshake. Both client and server can push data frames at any time with minimal overhead. **Server-Sent Events (SSE)** is a simpler, HTTP-based alternative that provides **unidirectional** server-to-client streaming only; the client cannot push data back over the SSE channel.",
        "HTTP/2 Server Push — where the server proactively sends CSS/JS assets before the client requests them.",
        "Both WebSockets and SSE provide full-duplex communication; SSE is preferred for its lower implementation complexity.",
      ],
      correctIndex: 1,
      explanation:
        "WebSockets (full-duplex) vs. SSE (server-to-client unidirectional) is a fundamental architectural choice. SSE is ideal for dashboards, notification feeds, and live score updates. WebSockets are required for collaborative editing, chat, multiplayer games, and any scenario where the client also sends frequent messages. SSE uses standard HTTP; WebSockets require a server that supports the WS upgrade protocol.",
    },
    // ─── Q12 ───
    {
      id: "int-adv-12",
      scenario:
        "An analytics script built by a third-party vendor is being loaded synchronously in the `<head>` of the company's marketing site. Lighthouse reports it as a render-blocking resource contributing 1.2 seconds to First Contentful Paint.",
      question:
        "What is the functional difference between the `async` and `defer` attributes on a `<script>` tag, and which is more appropriate for a non-critical analytics library?",
      options: [
        "`async` compresses the script during download; `defer` defers the script to run during the browser's idle time.",
        "Both `async` and `defer` download the script in parallel without blocking HTML parsing. The difference is execution: **`async`** executes the script *as soon as it is downloaded*, potentially interrupting HTML parsing. **`defer`** executes the script *after the HTML document has been fully parsed*, maintaining script order. For an analytics library that should not block rendering or alter the DOM, **`defer`** is correct — it guarantees the DOM is ready and executes after DOMContentLoaded.",
        "`async` is for external scripts; `defer` is for inline scripts.",
        "Both are identical; the difference only applies to module scripts (`type='module'`).",
      ],
      correctIndex: 1,
      explanation:
        "`defer` is the standard recommendation for non-critical third-party scripts. It removes render-blocking while ensuring the script runs in order after HTML parsing. `async` is better for truly independent scripts (like an A/B testing tool) where execution order doesn't matter and the earliest possible execution is desired.",
    },
    // ─── Q13 ───
    {
      id: "int-adv-13",
      scenario:
        "A developer needs to implement a color picker where users can sample any pixel color from anywhere on their screen — not just from within the browser window. This feature is part of a web-based design tool.",
      question:
        "What browser API provides native, OS-level color sampling capabilities from any pixel on the user's display?",
      options: [
        "The `<canvas>` API with `getImageData()` — which can sample pixel colors from a canvas element.",
        "The **EyeDropper API** — `new EyeDropper().open()` which triggers the OS-native color picker, allows the user to sample any pixel on the screen (including outside the browser), and returns the hex color value as a resolved Promise.",
        "The `CSS Color Level 5` `color-mix()` function, which resolves blended color values from CSS properties.",
        "The `MediaDevices.getDisplayMedia()` API — which captures the screen as a video stream, from which individual pixel colors can be extracted using a canvas.",
      ],
      correctIndex: 1,
      explanation:
        "The EyeDropper API is a purpose-built browser API for screen color sampling, enabling native desktop-class experiences in web tools like Figma. It handles the complex OS permissions required for screen-wide pixel access. The `getDisplayMedia` approach is technically possible but requires user consent for full screen recording — a much heavier permission than color sampling.",
    },
    // ─── Q14 ───
    {
      id: "int-adv-14",
      scenario:
        "A search results page loads a list of 10,000 items into the DOM. Users report that initial render takes 4+ seconds and scrolling is choppy, even though most items are far below the visible viewport.",
      question:
        "What rendering technique renders only the DOM nodes currently visible in the viewport, vastly reducing DOM size and paint time?",
      options: [
        "CSS `content-visibility: auto` — instructs the browser to skip rendering off-screen elements, improving initial render time.",
        "**Virtual scrolling (Windowing)** — only DOM nodes visible in the viewport are rendered. As the user scrolls, the component dynamically renders incoming items and recycles outgoing nodes. Libraries like `react-window` and `@tanstack/virtual` implement this, reducing a 10,000-item DOM to ~20 visible nodes at any time.",
        "Pagination — divide the list into pages of 50 items, preventing more than 50 items from being in the DOM.",
        "Both A and B are valid. `content-visibility: auto` is a CSS-only zero-code solution; Virtual Scrolling is a JavaScript approach with more precise control.",
      ],
      correctIndex: 3,
      explanation:
        "Both techniques address the same problem from different layers. `content-visibility: auto` is a newer CSS primitive that instructs the browser's rendering engine to skip layout and paint for off-screen sections — it's a near-zero-effort win. Virtual scrolling provides more control, supports accurate scroll height estimation, and handles cases where item heights are variable. In practice, both can be combined for maximum performance.",
    },
    // ─── Q15 ───
    {
      id: "int-adv-15",
      scenario:
        "An engineering team is adding client-side form validation. They use `element.innerHTML = userInput` to display error messages below fields, because a designer wants the messages to support bold and italic formatting.",
      question:
        "What specific security vulnerability does this introduce, and what is the safe alternative?",
      options: [
        "This introduces a **Cross-Site Scripting (XSS)** vulnerability. If `userInput` contains `<script>alert(1)</script>` or event-handler payloads like `<img src=x onerror='stealCookies()'>`, the browser will execute the script. The safe alternatives are: (1) `element.textContent = userInput` — which treats all content as plain text, never executing HTML. (2) If HTML formatting is required, use `DOMParser` to parse the input in a sandboxed context, or a trusted sanitization library like DOMPurify (`DOMPurify.sanitize(userInput)`) before assigning to `innerHTML`.",
        "This is a CSRF vulnerability. The fix is to add a CSRF token to each form field.",
        "This is an SQL injection vulnerability. Fix: escape all special characters before display.",
        "There is no security risk. `innerHTML` sanitizes content automatically in modern browsers.",
      ],
      correctIndex: 0,
      explanation:
        "DOM-based XSS via `innerHTML` is one of the most prevalent client-side vulnerabilities. `textContent` is the safest default for user-supplied text. DOMPurify is the battle-tested industry standard when HTML rendering is genuinely required (rich text, markdown rendering). Trusted Types (a newer browser API) enforces that only sanitized values can be assigned to dangerous sinks like `innerHTML`.",
    },
    // ─── Q16 ───
    {
      id: "int-adv-16",
      scenario:
        "A developer is building a photo editing application. Users import large image files (up to 50MB) and apply filters. The filter processing runs in the main thread and locks the UI for several seconds.",
      question:
        "Beyond Web Workers (for JS processing), what specialized API enables GPU-accelerated, off-main-thread image and graphics processing directly in the browser?",
      options: [
        "The `<canvas>` 2D context API, which is GPU-accelerated for all operations by default.",
        "**WebGL** (or **WebGPU**) — which provides direct access to the device's GPU via shader programs (GLSL for WebGL, WGSL for WebGPU). Image filters, convolutions, and transformations run thousands of times faster on the GPU than in JavaScript CPU loops. WebGPU is the next-generation successor with better compute shader support.",
        "The `CSS filter` property (e.g., `filter: blur(10px)`) — which applies GPU-accelerated filter effects through CSS without any JavaScript.",
        "The `OffscreenCanvas` API — which moves canvas rendering to a Web Worker thread, unblocking the main thread.",
      ],
      correctIndex: 3,
      explanation:
        "All four options have merit, but `OffscreenCanvas` most directly solves the stated problem (UI locked by main-thread processing). It transfers canvas rendering to a Worker, freeing the main thread. WebGL/WebGPU provide GPU acceleration but are far more complex to implement for image filters. `CSS filter` is GPU-accelerated but cannot process and export modified pixel data programmatically. The ideal production solution combines OffscreenCanvas + WebGL shaders.",
    },
    // ─── Q17 ───
    {
      id: "int-adv-17",
      scenario:
        "A developer implements API calls using `fetch()` inside a React `useEffect` hook. During development, they notice that in React 18 Strict Mode, every component mount triggers the API call twice — causing duplicate entries in the database.",
      question:
        "Why does React 18 Strict Mode fire effects twice, and what is the correct pattern to handle this for network requests?",
      options: [
        "This is a React 18 bug that only appears in development. The duplicate calls will not occur in production, so no fix is required.",
        "React 18 Strict Mode intentionally **mounts, unmounts, and remounts** components in development to surface bugs in effects that lack proper cleanup. Since `fetch` has no cleanup, the effect fires twice. The correct pattern is to return a cleanup function from `useEffect` that calls `abortController.abort()`, cancelling the in-flight request on unmount. This also prevents 'can't update state on unmounted component' warnings.",
        "The fix is to disable Strict Mode in `index.js` for production builds only, as it serves no purpose outside development.",
        "Move the `fetch` call to a `useMemo` hook, which only re-runs when its dependency array changes.",
      ],
      correctIndex: 1,
      explanation:
        "The double-invoke behavior is intentional and valuable — it exposes effects that assume they will only run once (a common bug). The `AbortController` pattern makes `fetch` cleanup explicit: `const controller = new AbortController(); fetch(url, { signal: controller.signal }); return () => controller.abort();`. This is the canonical React 18 data-fetching pattern and handles both Strict Mode double-mounting and navigation-during-fetch scenarios.",
    },
    // ─── Q18 ───
    {
      id: "int-adv-18",
      scenario:
        "A TypeScript/React component library is being published to npm. The library maintainers want consumers to be able to use named imports (`import { Button, Modal } from 'our-library'`) while ensuring that unused components are tree-shaken from the consumer's bundle.",
      question:
        "What configuration in the library's `package.json` instructs bundlers (Webpack, Rollup, esbuild) to safely tree-shake unused exports?",
      options: [
        'Set `"main": "dist/index.umd.js"` to ensure a UMD bundle is used, as UMD supports tree-shaking natively.',
        'Set `"sideEffects": false` in `package.json` — this informs bundlers that no module in the library has side effects (e.g., global CSS injection or polyfill application at import time), making it safe to eliminate any unused export. Additionally, publish an ES Module format (`"module": "dist/index.esm.js"`) as ESM\'s static import/export syntax is required for static analysis tree-shaking.',
        "Tree-shaking is handled automatically by TypeScript; no `package.json` configuration is needed.",
        'Set `"exports": { "tree-shake": true }` in the `package.json` exports map.',
      ],
      correctIndex: 1,
      explanation:
        "Tree-shaking requires two prerequisites: (1) **ES Modules format** (static `import`/`export`, not CommonJS `require`), because ESM's static analysis allows bundlers to determine at build time what is and isn't used. (2) **`\"sideEffects\": false`** to declare that unused modules can be safely removed without breaking the app. Without this flag, a bundler must assume any import might have side effects and includes it anyway.",
    },
    // ─── Q19 ───
    {
      id: "int-adv-19",
      scenario:
        "The front-end team is adopting a 'micro-frontend' architecture where independently deployed teams expose their features as modules. At runtime, Team A's shell application needs to dynamically load Team B's checkout module without knowing its URL at build time.",
      question:
        "What Webpack 5 feature enables runtime module federation between independently deployed JavaScript applications?",
      options: [
        "Webpack's Code Splitting with `import()` — which loads JS chunks on demand from the same build.",
        "**Module Federation** — a Webpack 5 plugin that allows a JavaScript application to dynamically load code from a separate, independently deployed build at runtime. Each app can expose modules as 'remotes' and consume modules from 'hosts'. This enables true micro-frontend architecture with shared dependencies, independent deployments, and zero build-time coordination between teams.",
        "The `externals` configuration — which excludes a dependency from the bundle, expecting it to be provided by the host environment.",
        "Dynamic `import()` with a URL pointing to a CDN-hosted script — which is functionally equivalent to Module Federation.",
      ],
      correctIndex: 1,
      explanation:
        "Module Federation is the architectural cornerstone of modern micro-frontend systems. It goes beyond `import()` (same-build chunks) by resolving modules from separately deployed, version-independent builds. The `shared` configuration prevents duplicate dependencies (e.g., both apps loading their own copy of React). Alternatives include import maps (native browser spec) and single-spa framework.",
    },
    // ─── Q20 ───
    {
      id: "int-adv-20",
      scenario:
        "A developer reviews browser DevTools and notices that the application is making 47 separate HTTP/1.1 requests for individual SVG icons. Each request has ~80ms of TCP connection overhead. A colleague suggests 'HTTP/2 will fix this, no code changes needed'.",
      question:
        "While HTTP/2 multiplexing reduces the impact of many small requests, what front-end resource optimization strategy still provides benefits in HTTP/2 environments for this specific icon scenario?",
      options: [
        "Base64-encoding all SVG icons into a single CSS file eliminates network requests entirely.",
        "**SVG Sprite sheets** or **icon fonts** bundle all icons into a single HTTP request regardless of protocol version. While HTTP/2 multiplexing reduces per-request overhead, 47 HTTP round trips still mean 47 server-side processes and browser resource discovery delays. A sprite sheet also enables CSS-controlled styling of each icon. Additionally, caching one sprite file is more efficient than managing 47 individual cache entries.",
        "HTTP/2 server push will automatically send all 47 icons with the initial HTML response, making no optimization necessary.",
        "Switching from SVG to WebP format eliminates the parsing overhead associated with SVG's XML structure.",
      ],
      correctIndex: 1,
      explanation:
        "HTTP/2 multiplexing reduces *connection* overhead, but server processing, cache validation, and resource discovery costs remain for each resource. SVG sprites, icon components (inline SVG), or systems like Iconify that deliver single-file icon sets are still the optimization of choice. The modern preferred approach is inline SVG components (zero HTTP requests) via tools like SVGR in React projects.",
    },
  ],
};

// ─── EXPORT ALL THREE MODULES ─────────────────────────────────────────────────
module.exports = {
  CSSAdvancedModule,
  JavaScriptAdvancedModule,
  WebDevIntegrationModule,
};
