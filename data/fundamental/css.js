const CSSset1 = {
  meta: {
    id: "css-fundamentals",
    testTitle: "CSS Fundamentals",
    topic: "css",
    topicLabel: "CSS Fundamentals",
    difficulty: "Beginner",
    questionCount: 25,
    estimatedMinutes: 25,
    description:
      "Covers CSS syntax, the box model, display properties, and flexbox layouts.",
    icon: "🎨",
  },
  questions: [
    {
      id: "cf-01",
      code: "selector { property: value; }",
      question:
        "In the CSS rule above, what is the sequence enclosed in curly braces called?",
      options: [
        "A function",
        "A declaration block",
        "An HTML element",
        "A style loop",
      ],
      correctIndex: 1,
      explanation:
        "The declaration block is enclosed in curly braces {} and contains one or more declarations. [cite: 1608]",
    },
    {
      id: "cf-02",
      question:
        "Which CSS selector targets elements based on a specific 'id' attribute and is preceded by a hash (#)?",
      options: [
        "Class Selector",
        "Element Selector",
        "ID Selector",
        "Universal Selector",
      ],
      correctIndex: 2,
      explanation:
        "The ID Selector selects a single, unique element on the page with a specific id attribute and is preceded by a hash #. [cite: 1614]",
    },
    {
      id: "cf-03",
      question: "What CSS property defines the typeface used for text?",
      options: ["text-style", "font-family", "typeface", "font-weight"],
      correctIndex: 1,
      explanation:
        "The font-family property defines the typeface for text. [cite: 1622]",
    },
    {
      id: "cf-04",
      question:
        "Moving from the inside out, what is the correct order of the CSS Box Model?",
      options: [
        "Margin, Border, Padding, Content",
        "Content, Margin, Padding, Border",
        "Content, Padding, Border, Margin",
        "Padding, Content, Margin, Border",
      ],
      correctIndex: 2,
      explanation:
        "Going from the inside out, the Box Model consists of Content, Padding, Border, and Margin. [cite: 1629, 1630, 1631, 1632, 1633]",
    },
    {
      id: "cf-05",
      question:
        "Which area of the box model clears an area outside the border, creating space between surrounding elements?",
      options: ["Padding", "Content", "Margin", "Border"],
      correctIndex: 2,
      explanation:
        "The Margin clears an area outside the border, creating space between the element and surrounding elements. [cite: 1633]",
    },
    {
      id: "cf-06",
      question:
        "Applying `box-sizing: border-box;` changes the default CSS behavior. What does it do?",
      options: [
        "It removes the margin completely.",
        "It factors padding and border into the set width and height, shrinking the inner content area.",
        "It forces the element to display as an inline block.",
        "It rounds the corners of the border.",
      ],
      correctIndex: 1,
      explanation:
        "Applying box-sizing: border-box; factors padding and border into the set width and height, shrinking the inner content area instead of expanding the outer box. [cite: 1634]",
    },
    {
      id: "cf-07",
      question:
        "Which `display` property value forces an element to start on a new line and take up the full available width?",
      options: ["inline", "inline-block", "block", "flex"],
      correctIndex: 2,
      explanation:
        "The display: block; property dictates that an element starts on a new line and takes up the full width available. [cite: 1636, 1637]",
    },
    {
      id: "cf-08",
      question:
        "What is the behavior of an element with `display: inline-block;`?",
      options: [
        "It is removed from the document flow.",
        "It acts like a flex container.",
        "It takes up the full width but allows other elements to float.",
        "It sits side-by-side like an inline element but respects width, height, margins, and padding.",
      ],
      correctIndex: 3,
      explanation:
        "An inline-block element sits side-by-side like an inline element but fully respects width, height, margins, and padding like a block element. [cite: 1640]",
    },
    {
      id: "cf-09",
      question:
        "Which CSS property activates the Flexible Box Layout (Flexbox) model on a parent container?",
      options: [
        "layout: flex;",
        "display: flexbox;",
        "display: flex;",
        "align: flex;",
      ],
      correctIndex: 2,
      explanation:
        "To activate flexbox, you apply display: flex; to the parent container element. [cite: 1645]",
    },
    {
      id: "cf-10",
      question:
        "In Flexbox, which property aligns items along the *main axis*?",
      options: [
        "align-items",
        "justify-content",
        "flex-direction",
        "flex-wrap",
      ],
      correctIndex: 1,
      explanation:
        "The justify-content property aligns items along the main axis in a Flexbox container. [cite: 1648]",
    },
    {
      id: "cf-11",
      question: "What is the purpose of the `flex-wrap: wrap;` property?",
      options: [
        "It aligns items to the center.",
        "It allows flex items to flow onto multiple lines instead of squeezing onto one.",
        "It wraps text inside a single flex item.",
        "It reverses the direction of the flex container.",
      ],
      correctIndex: 1,
      explanation:
        "By default, flex items try to fit on one single line; flex-wrap: wrap; allows them to flow onto multiple lines. [cite: 1650, 1651]",
    },
    {
      id: "cf-12",
      question: "What does the `a` in `rgba(255, 0, 0, 0.5)` stand for?",
      options: ["Array", "Axis", "Alpha channel for transparency", "Algorithm"],
      correctIndex: 2,
      explanation:
        "In RGBA, the 'A' stands for an alpha channel used for transparency. [cite: 1620]",
    },
    {
      id: "cf-13",
      question:
        "Which selector type is preceded by a period (.) and can be used multiple times on a page?",
      options: [
        "ID Selector",
        "Class Selector",
        "Type Selector",
        "Universal Selector",
      ],
      correctIndex: 1,
      explanation:
        "The Class Selector is preceded by a period (.) and can be used multiple times on a page to select elements with a specific class attribute. [cite: 1612, 1613]",
    },
    {
      id: "cf-14",
      question:
        "Which of these is NOT a valid property for aligning items along the cross axis in Flexbox?",
      options: ["stretch", "center", "flex-start", "space-around"],
      correctIndex: 3,
      explanation:
        "align-items aligns items along the cross axis using properties like stretch, center, flex-start, and flex-end. space-around is used by justify-content. [cite: 1648, 1649]",
    },
    {
      id: "cf-15",
      question:
        "How do you completely remove an element from the visual document flow using CSS?",
      options: [
        "visibility: hidden;",
        "opacity: 0;",
        "display: none;",
        "margin: -9999px;",
      ],
      correctIndex: 2,
      explanation:
        "The display: none; property completely removes the element from the document flow. [cite: 1641]",
    },
    {
      id: "cf-16",
      question: "What is the correct hexadecimal representation for white?",
      options: ["#000000", "#FFFFFF", "#FF0000", "#111111"],
      correctIndex: 1,
      explanation:
        "Hexadecimal colors use #RRGGBB values between 00 and FF, making #FFFFFF solid white (max red, green, blue). [cite: 1619]",
    },
    {
      id: "cf-17",
      question:
        "In the CSS Box Model, what sits immediately between the Content and the Border?",
      options: ["Margin", "Padding", "Background", "Outline"],
      correctIndex: 1,
      explanation:
        "Padding clears an area inside the box, surrounding the content and sitting before the border. [cite: 1631, 1632]",
    },
    {
      id: "cf-18",
      question: "The `font-weight` property is used to control:",
      options: [
        "The size of the text.",
        "The typeface of the text.",
        "The thickness of the text (e.g., bold).",
        "The color of the text.",
      ],
      correctIndex: 2,
      explanation:
        "The font-weight property controls the thickness of the text, such as normal, bold, 400, or 700. [cite: 1625]",
    },
    {
      id: "cf-19",
      question:
        "A rule consisting of a selector and a declaration block is the core syntax of what language?",
      options: ["HTML", "JavaScript", "CSS", "TypeScript"],
      correctIndex: 2,
      explanation:
        "CSS is a rule-based language where a rule consists of a selector and a declaration block. [cite: 1601]",
    },
    {
      id: "cf-20",
      question:
        "Which flex container property establishes whether items are laid out in a row or a column?",
      options: [
        "justify-content",
        "flex-wrap",
        "flex-direction",
        "align-content",
      ],
      correctIndex: 2,
      explanation:
        "The flex-direction property establishes the primary axis, such as row or column. [cite: 1647]",
    },
    {
      id: "cf-21",
      question: "Which selector targets all paragraph tags `<p>` on a page?",
      options: [".p", "#p", "p", "*p"],
      correctIndex: 2,
      explanation:
        "The Element or Type Selector selects all elements of a specific type by simply using the tag name (like p). [cite: 1611]",
    },
    {
      id: "cf-22",
      question:
        "Is it a best practice to rely on IDs or Classes for general CSS styling across multiple elements?",
      options: [
        "IDs, because they are faster.",
        "Classes, because IDs must be unique per page.",
        "Neither, you should use inline styles.",
        "It doesn't matter, they are the same.",
      ],
      correctIndex: 1,
      explanation:
        "Classes can be used multiple times on a page, while IDs must be unique per page, making classes better for general styling. [cite: 1613, 1615]",
    },
    {
      id: "cf-23",
      question:
        "Which of the following is an example of an inline element by default?",
      options: ["<div>", "<p>", "<span>", "<h1>"],
      correctIndex: 2,
      explanation:
        "Inline elements sit side-by-side and take up only as much width as necessary, which is typical for tags like span (implied by typical HTML/CSS knowledge based on display types). [cite: 1638, 1639]",
    },
    {
      id: "cf-24",
      question:
        "When applying `font-size`, which unit is relative to the root element's font size?",
      options: ["px", "em", "rem", "pt"],
      correctIndex: 2,
      explanation:
        "While the text mentions px, em, and rem, rem stands for 'root em', which is relative to the root element. [cite: 1624]",
    },
    {
      id: "cf-25",
      question:
        "To align flex items horizontally to the far right inside a row container, which property and value should you use?",
      options: [
        "justify-content: flex-end;",
        "align-items: right;",
        "float: right;",
        "justify-content: right;",
      ],
      correctIndex: 0,
      explanation:
        "justify-content aligns items along the main axis; 'flex-end' pushes them to the end of the flex container. [cite: 1648]",
    },
  ],
};

const CSSset2 = {
  meta: {
    id: "css-medium",
    testTitle: "CSS Layouts & Specificity",
    topic: "css",
    topicLabel: "CSS Medium",
    difficulty: "Medium",
    questionCount: 20,
    estimatedMinutes: 25,
    description:
      "Tests intermediate CSS concepts including Specificity, Positioning, CSS Grid basics, Pseudo-classes, and Transitions.",
    icon: "📐",
  },
  questions: [
    {
      id: "cm-01",
      question:
        "Which of the following is the primary conceptual difference between CSS Flexbox and CSS Grid?",
      options: [
        "Flexbox is for mobile layouts, Grid is for desktop layouts.",
        "Flexbox is designed for 1-dimensional layouts (a row or a column), while Grid is designed for 2-dimensional layouts (rows and columns simultaneously).",
        "Grid relies on HTML tables, while Flexbox relies on divs.",
        "Flexbox cannot align items vertically, whereas Grid can.",
      ],
      correctIndex: 1,
      explanation:
        "Flexbox operates primarily on a single axis (1D) at a time, whereas CSS Grid is optimized to handle both rows and columns (2D) concurrently.",
    },
    {
      id: "cm-02",
      question:
        "When an element has `position: absolute;`, relative to what is it positioned?",
      options: [
        "The viewport (browser window).",
        "The <body> element.",
        "Its nearest positioned ancestor (an ancestor with a position other than 'static').",
        "The exact spot it would have normally rendered in the document flow.",
      ],
      correctIndex: 2,
      explanation:
        "An absolutely positioned element is removed from the normal document flow and positioned relative to its closest positioned ancestor. If none exists, it defaults to the initial containing block.",
    },
    {
      id: "cm-03",
      question: "How do you calculate CSS Specificity?",
      options: [
        "By counting the number of lines of CSS applied to the element.",
        "By a weight system based on Inline Styles, IDs, Classes/Attributes/Pseudo-classes, and Elements/Pseudo-elements.",
        "The rule at the very bottom of the stylesheet always wins, regardless of selectors.",
        "By counting the number of characters in the selector name.",
      ],
      correctIndex: 1,
      explanation:
        "Specificity is calculated using a 4-category weighting system: Inline styles (highest), IDs, Classes/Pseudo-classes/Attributes, and Type/Element selectors (lowest).",
    },
    {
      id: "cm-04",
      question:
        "What does the `>` combinator do in a CSS selector (e.g., `div > p`)?",
      options: [
        "Selects all `<p>` elements that are descendants of a `<div>`, regardless of depth.",
        "Selects only `<p>` elements that are direct children of a `<div>`.",
        "Selects the very first `<p>` element immediately following a `<div>`.",
        "Selects any `<p>` element that comes after a `<div>`.",
      ],
      correctIndex: 1,
      explanation:
        "The child combinator (>) targets only direct children, whereas a space (descendant combinator) targets all descendants regardless of nesting depth.",
    },
    {
      id: "cm-05",
      code: "button { transition: background-color 0.3s ease-in; }",
      question: "What does the `ease-in` timing function do?",
      options: [
        "The transition starts fast and slows down at the end.",
        "The transition starts slowly and accelerates until the end.",
        "The transition maintains a constant speed.",
        "The transition bounces before completing.",
      ],
      correctIndex: 1,
      explanation:
        "The `ease-in` timing function begins the transition slowly and accelerates toward the end.",
    },
    {
      id: "cm-06",
      question:
        "In CSS, what is required for the `z-index` property to have an effect on an element?",
      options: [
        "The element must have a display of `flex` or `grid`.",
        "The element must be a block-level element.",
        "The element must have its `position` property set to `relative`, `absolute`, `fixed`, or `sticky`.",
        "The element must have an explicitly defined width and height.",
      ],
      correctIndex: 2,
      explanation:
        "The `z-index` property only applies to positioned elements (elements with a position value other than the default `static`).",
    },
    {
      id: "cm-07",
      code: ".grid-container { grid-template-columns: repeat(3, 1fr); }",
      question: "What does `1fr` represent in CSS Grid?",
      options: [
        "1 frame rate.",
        "1 fraction of the available free space in the grid container.",
        "1 pixel relative to the font-size of the root element.",
        "1 percentage point.",
      ],
      correctIndex: 1,
      explanation:
        "The `fr` unit represents a fraction of the available space in the grid container, allowing for flexible, responsive grid tracks.",
    },
    {
      id: "cm-08",
      question:
        "Which of the following is a pseudo-element used to insert cosmetic content before an element's actual content?",
      options: [":hover", ":first-child", "::before", ":active"],
      correctIndex: 2,
      explanation:
        "Pseudo-elements (like `::before` and `::after`) are used to style specific parts of an element or insert content. They require the `content` property to render.",
    },
    {
      id: "cm-09",
      question:
        "What must be included in a `::before` or `::after` rule for it to successfully render on the page?",
      options: [
        "display: block;",
        "content: '';",
        "position: absolute;",
        "visibility: visible;",
      ],
      correctIndex: 1,
      explanation:
        "The `content` property is strictly required for pseudo-elements to generate a box and render. Even an empty string `content: '';` works.",
    },
    {
      id: "cm-10",
      code: "width: calc(100% - 50px);",
      question: "What is the function of the CSS `calc()` method?",
      options: [
        "It executes a JavaScript function to determine layout.",
        "It allows you to perform basic math operations (addition, subtraction, multiplication, division) to determine CSS property values.",
        "It converts pixel values into rems automatically.",
        "It calculates the aspect ratio of images.",
      ],
      correctIndex: 1,
      explanation:
        "The `calc()` function enables dynamic calculation of CSS values, often mixing different units (e.g., subtracting pixels from percentages).",
    },
    {
      id: "cm-11",
      question: "What is the primary behavior of `position: sticky;`?",
      options: [
        "It permanently glues the element to the top of the viewport.",
        "It behaves like `relative` positioning until it reaches a specified offset threshold during scrolling, at which point it behaves like `fixed`.",
        "It floats the element to the right and wraps text around it.",
        "It removes the element from the document flow completely.",
      ],
      correctIndex: 1,
      explanation:
        "Sticky positioning is a hybrid: the element toggles between relative and fixed depending on the scroll position and its containing block.",
    },
    {
      id: "cm-12",
      question: "Which CSS unit is relative to the width of the viewport?",
      options: ["vh", "rem", "vw", "ch"],
      correctIndex: 2,
      explanation:
        "The `vw` (viewport width) unit represents 1% of the width of the browser's viewport.",
    },
    {
      id: "cm-13",
      question:
        "What is the difference between `em` and `rem` units for font sizing?",
      options: [
        "`em` is relative to the parent element's font size, while `rem` is relative to the root (`<html>`) element's font size.",
        "`rem` is relative to the parent element, while `em` is relative to the root.",
        "`em` is responsive, while `rem` is a fixed, absolute unit.",
        "They are identical; the 'r' simply stands for 'responsive'.",
      ],
      correctIndex: 0,
      explanation:
        "`em` units compound based on their specific parent's font size, while `rem` (root em) always references the global root font size, preventing unexpected scaling issues.",
    },
    {
      id: "cm-14",
      question:
        "If multiple CSS rules target the exact same element with the exact same specificity, which rule takes precedence?",
      options: [
        "The first rule written in the stylesheet.",
        "The rule with the most properties defined inside its block.",
        "The last rule written in the stylesheet (the cascade).",
        "The browser will ignore both rules.",
      ],
      correctIndex: 2,
      explanation:
        "The 'Cascade' in CSS dictates that when specificity is tied, the rule declared last (lowest down) in the stylesheet wins.",
    },
    {
      id: "cm-15",
      code: "h1 + p { color: red; }",
      question: "What does the `+` combinator select?",
      options: [
        "All `<p>` elements nested inside an `<h1>`.",
        "The very first `<p>` element that is placed immediately after an `<h1>` (Adjacent Sibling).",
        "All `<p>` elements that share the same parent as the `<h1>` (General Sibling).",
        "Both the `<h1>` and the `<p>` elements.",
      ],
      correctIndex: 1,
      explanation:
        "The adjacent sibling combinator (+) separates two selectors and matches the second element only if it immediately follows the first element.",
    },
    {
      id: "cm-16",
      question: "Which of these selectors has the HIGHEST specificity?",
      options: ["div ul li", ".navigation li", "#main-nav a", "a:hover"],
      correctIndex: 2,
      explanation:
        "IDs (#main-nav) carry a significantly higher specificity weight than classes, pseudo-classes, or element tags.",
    },
    {
      id: "cm-17",
      question:
        "What is a standard technique to make an image responsive so it scales down with its container but never scales up past its original size?",
      options: [
        "width: 100vw;",
        "display: block;",
        "max-width: 100%; height: auto;",
        "object-fit: cover;",
      ],
      correctIndex: 2,
      explanation:
        "`max-width: 100%;` ensures the image shrinks to fit its container if the container is smaller, but never stretches larger than its intrinsic pixel size. `height: auto;` maintains the aspect ratio.",
    },
    {
      id: "cm-18",
      question: "How do CSS Variables (Custom Properties) natively inherit?",
      options: [
        "They do not inherit; they are strictly scoped to the element they are declared on.",
        "They inherit from parent to child, allowing you to define them on `:root` to make them globally available.",
        "They must be imported using an `@import` rule.",
        "They inherit based on the z-index of the container.",
      ],
      correctIndex: 1,
      explanation:
        "CSS custom properties cascade and inherit like standard CSS properties, which is why declaring them on `:root` makes them accessible throughout the entire document.",
    },
    {
      id: "cm-19",
      question:
        "Which property is used to change the background color of an element when a user hovers their mouse pointer over it?",
      options: [
        "::hover { background-color: blue; }",
        ":hover { background-color: blue; }",
        "onHover: background-color blue;",
        "hover: true { background-color: blue; }",
      ],
      correctIndex: 1,
      explanation:
        "The `:hover` pseudo-class (written with a single colon) is used to style an element when the user points to it.",
    },
    {
      id: "cm-20",
      code: "top: 50%; left: 50%; transform: translate(-50%, -50%);",
      question:
        "When applied to an absolutely positioned element, what does this snippet accomplish?",
      options: [
        "It hides the element completely off-screen.",
        "It perfectly centers the element horizontally and vertically within its relative parent.",
        "It rotates the element by 50 degrees.",
        "It scales the element to half of its original size.",
      ],
      correctIndex: 1,
      explanation:
        "`top` and `left` push the top-left corner of the element to the center of the parent. The `translate` then pulls the element back by 50% of its *own* width and height, centering it perfectly.",
    },
  ],
};

const CSSset3 = {
  meta: {
    id: "css-hard",
    testTitle: "Advanced CSS & Architecture",
    topic: "css",
    topicLabel: "CSS Hard",
    difficulty: "Hard",
    questionCount: 20,
    estimatedMinutes: 30,
    description:
      "Evaluates deep knowledge of Stacking Contexts, Advanced Grid formulas, Modern Pseudo-classes, Logical Properties, and Performance.",
    icon: "🔥",
  },
  questions: [
    {
      id: "ch-01",
      question:
        "Which of the following actions will create a new 'Stacking Context' in CSS, altering how `z-index` layers are resolved?",
      options: [
        "Setting `display: block` on an element.",
        "Setting `opacity` to a value less than 1.",
        "Setting `overflow: hidden`.",
        "Adding a standard `margin-top`.",
      ],
      correctIndex: 1,
      explanation:
        "Setting `opacity` to less than 1, using `transform`, `filter`, or having a `position` (other than static) with a `z-index` other than `auto` all spawn a new Stacking Context.",
    },
    {
      id: "ch-02",
      code: "grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));",
      question:
        "In CSS Grid, what is the difference between `auto-fit` and `auto-fill`?",
      options: [
        "`auto-fit` is for columns, `auto-fill` is for rows.",
        "`auto-fill` creates empty tracks if there is extra space, while `auto-fit` collapses empty tracks and expands the remaining items to fill the space.",
        "They are purely aliases for each other.",
        "`auto-fit` ignores the minmax constraint, while `auto-fill` respects it.",
      ],
      correctIndex: 1,
      explanation:
        "`auto-fill` keeps the generated empty grid tracks taking up space. `auto-fit` drops the empty tracks and expands the remaining elements to fill the available space.",
    },
    {
      id: "ch-03",
      question:
        "What is the main advantage of 'Container Queries' (`@container`) over standard 'Media Queries' (`@media`)?",
      options: [
        "Container queries load faster than media queries.",
        "Container queries allow an element to apply styles based on the size of its parent container, rather than the global browser viewport.",
        "Container queries natively support polyfills.",
        "Container queries can query the user's operating system.",
      ],
      correctIndex: 1,
      explanation:
        "While Media Queries respond to the browser viewport size, Container Queries allow components to adapt their layout based on the dimensions of the specific container they are placed inside.",
    },
    {
      id: "ch-04",
      question:
        "In the BEM (Block Element Modifier) methodology, how is a Modifier structurally represented in a class name?",
      options: [
        "With a single hyphen (e.g., `block-modifier`)",
        "With a double underscore (e.g., `block__modifier`)",
        "With a double hyphen (e.g., `block--modifier`)",
        "With camelCase (e.g., `blockModifier`)",
      ],
      correctIndex: 2,
      explanation:
        "In BEM, Blocks and Elements are separated by double underscores (`block__element`), and Modifiers are designated by double hyphens (`block--modifier`).",
    },
    {
      id: "ch-05",
      code: "font-size: clamp(1rem, 2.5vw, 2rem);",
      question: "What does the `clamp()` function dictate in this code block?",
      options: [
        "The font size will be 2.5vw, but will never shrink below 1rem or grow above 2rem.",
        "The font size will transition between 1rem, 2.5vw, and 2rem every few seconds.",
        "The font size will add 1rem and 2rem, then multiply by 2.5vw.",
        "The text will be clamped (truncated) to 2 lines.",
      ],
      correctIndex: 0,
      explanation:
        "`clamp(MIN, VAL, MAX)` resolves to the preferred value (2.5vw) as long as it sits between the minimum (1rem) and maximum (2rem) boundaries.",
    },
    {
      id: "ch-06",
      question:
        "What is the purpose of CSS Logical Properties, like `margin-inline-start`?",
      options: [
        "They execute boolean logic (if/else) within stylesheets.",
        "They adapt physical dimensions (like left/right/top/bottom) based on the writing mode, direction, and text orientation of the document.",
        "They automatically calculate specificity.",
        "They are required for hardware-accelerated animations.",
      ],
      correctIndex: 1,
      explanation:
        "Logical properties abstract physical directions (left/right). For example, `margin-inline-start` applies to the left in English (LTR), but automatically applies to the right in Arabic (RTL).",
    },
    {
      id: "ch-07",
      question:
        "Which CSS pseudo-class matches elements that are in an invalid state according to HTML5 form validation?",
      options: [":required", ":error", ":invalid", ":unvalidated"],
      correctIndex: 2,
      explanation:
        "The `:invalid` pseudo-class represents any `<input>` or other form element whose contents fail to validate according to the input's type or pattern constraints.",
    },
    {
      id: "ch-08",
      question:
        "What is a major difference between the `:is()` and `:where()` functional pseudo-classes?",
      options: [
        ":where() requires JavaScript to execute, :is() does not.",
        ":is() takes the specificity of its most specific argument, while :where() always has a specificity of 0.",
        ":is() can only be used on form elements.",
        ":where() can select pseudo-elements, while :is() cannot.",
      ],
      correctIndex: 1,
      explanation:
        "Both group selectors, but `:where()` has 0 specificity, making it ideal for base resets that are easy to override. `:is()` adopts the specificity of the highest-weight selector in its list.",
    },
    {
      id: "ch-09",
      question: "What does the `@supports` rule (Feature Queries) do in CSS?",
      options: [
        "It checks if the user's subscription supports premium features.",
        "It detects if the browser has a specific version number.",
        "It checks if the browser supports a specific CSS property and value pair before applying a block of styles.",
        "It tests if a specific font has been successfully downloaded.",
      ],
      correctIndex: 2,
      explanation:
        "`@supports` allows developers to apply CSS rules only if the browser natively supports a particular property/value combination, useful for progressive enhancement.",
    },
    {
      id: "ch-10",
      question:
        "How do you define a fallback value when using a CSS Custom Property via the `var()` function?",
      options: [
        "var(--main-color || red)",
        "var(--main-color, red)",
        "var(--main-color fallback red)",
        "var(--main-color: red)",
      ],
      correctIndex: 1,
      explanation:
        "The `var()` function accepts a second parameter as a fallback value, separated by a comma. If `--main-color` is not defined, `red` will be used.",
    },
    {
      id: "ch-11",
      question:
        "What visual effect does the `backdrop-filter` property achieve that standard `filter` does not?",
      options: [
        "It applies filters exclusively to images inside a div.",
        "It applies filters (like blur) to the area *behind* an element, creating a 'frosted glass' effect, rather than blurring the element itself.",
        "It removes backgrounds from PNG images.",
        "It acts only on the box-shadow of an element.",
      ],
      correctIndex: 1,
      explanation:
        "`filter` applies effects to the element's own content. `backdrop-filter` applies effects to what is visible *through* the element, requiring the element to have a partially transparent background.",
    },
    {
      id: "ch-12",
      question:
        "Which combination of CSS properties is most commonly recommended for smooth, hardware-accelerated animations (avoiding layout thrashing)?",
      options: [
        "top, left, width, height",
        "margin, padding, border",
        "transform, opacity",
        "background-color, color",
      ],
      correctIndex: 2,
      explanation:
        "Animating `transform` and `opacity` is handled by the browser's compositor thread (often utilizing the GPU), meaning they do not trigger costly reflows or repaints.",
    },
    {
      id: "ch-13",
      question: "What does the `aspect-ratio` CSS property do?",
      options: [
        "It auto-crops images to make them square.",
        "It locks the ratio of an element's width to its height, allowing one dimension to scale automatically based on the other.",
        "It queries the aspect ratio of the user's monitor.",
        "It forces video elements to play in 16:9.",
      ],
      correctIndex: 1,
      explanation:
        "The `aspect-ratio` property establishes a preferred proportional relationship between width and height, effectively replacing older 'padding-bottom' hacks for responsive containers.",
    },
    {
      id: "ch-14",
      question:
        "When setting `line-height: 1.5;` (unitless), how does the browser calculate the line height for descendant elements?",
      options: [
        "It calculates 1.5 pixels total line height.",
        "It sets the line height to exactly 1.5 times the font size of the root element (`<html>`).",
        "The multiplier (1.5) is inherited, and the actual pixel value is dynamically re-calculated based on each descendant's specific font size.",
        "It adds 1.5em to the margin of the element.",
      ],
      correctIndex: 2,
      explanation:
        "A unitless `line-height` acts as a multiplier that is inherited dynamically. If you use `1.5em`, the computed pixel value of the parent is locked and inherited, which often causes text overlap in children.",
    },
    {
      id: "ch-15",
      question: "The `ch` CSS unit represents:",
      options: [
        'The width of the "0" (zero) character of the element\'s current font.',
        "Characters hidden (the number of characters clipped by overflow).",
        "The width of a standard space character.",
        "The exact height of uppercase letters.",
      ],
      correctIndex: 0,
      explanation:
        "The `ch` unit is relative to the advance measure (width) of the glyph '0' (zero) in the current font, making it highly useful for setting text column widths (e.g., `max-width: 60ch`).",
    },
    {
      id: "ch-16",
      code: "white-space: nowrap; \noverflow: hidden; \ntext-overflow: ellipsis;",
      question:
        "What visual result is achieved by combining these three CSS properties on a block element containing text?",
      options: [
        "The text wraps perfectly around images.",
        "The text fades out gradually at the bottom of the container.",
        "The text stays on a single line, and if it exceeds the container width, it is cut off and appended with '...'",
        "The text shrinks its font size until it fits inside the container.",
      ],
      correctIndex: 2,
      explanation:
        "This classic three-property combo prevents text from breaking to a new line, hides the overflow, and renders an ellipsis (...) to indicate truncated text.",
    },
    {
      id: "ch-17",
      question:
        "Which keyword is used to reset a CSS property to its browser default, completely ignoring any values inherited from the parent?",
      options: ["inherit", "unset", "revert", "initial"],
      correctIndex: 3,
      explanation:
        "`initial` resets the property to the initial value defined in the official CSS specification. `inherit` takes the parent's value, and `unset` acts like `inherit` if the property is naturally inherited, or `initial` if it is not.",
    },
    {
      id: "ch-18",
      question: "What is the primary function of the CSS `contain` property?",
      options: [
        "It strictly enforces the CSS Box Model boundaries.",
        "It restricts a background image from repeating.",
        "It isolates the element's internals from the rest of the DOM, allowing the browser to optimize rendering (layout/paint) by treating it as an independent box.",
        "It forces an element to stay within the viewport.",
      ],
      correctIndex: 2,
      explanation:
        "The `contain` property provides a way to explicitly indicate to the browser that an element and its contents are strictly independent, allowing massive performance optimizations in complex layouts.",
    },
    {
      id: "ch-19",
      question:
        "What does the media feature `@media (prefers-reduced-motion: reduce)` target?",
      options: [
        "Browsers running on mobile devices with slow processors.",
        "Users who have requested, via their OS settings, that the system minimize the amount of non-essential animation or movement.",
        "Frames dropping below 30fps during heavy CSS animations.",
        "Only older browsers that cannot process CSS transitions.",
      ],
      correctIndex: 1,
      explanation:
        "This media feature taps into system-level accessibility settings, allowing developers to disable parallax effects, heavy transitions, and continuous animations for users sensitive to motion.",
    },
    {
      id: "ch-20",
      code: "input { appearance: none; }",
      question:
        "What does the `appearance: none;` property do on form elements?",
      options: [
        "It makes the form element invisible (opacity 0).",
        "It strips away the operating system and browser's native styling (like the default dropdown arrow on a select or bevel on a button).",
        "It prevents the user from clicking or interacting with the element.",
        "It disables the element from being submitted with the form.",
      ],
      correctIndex: 1,
      explanation:
        "`appearance: none;` removes platform-native styling from UI controls, giving developers a blank slate to apply entirely custom CSS styling to things like checkboxes, radios, and buttons.",
    },
  ],
};
