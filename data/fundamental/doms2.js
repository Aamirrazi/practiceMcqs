const WebDevSet6 = {
  meta: {
    id: "dom-medium",
    testTitle: "DOM Traversal & Events",
    topic: "javascript",
    topicLabel: "DOM Medium",
    difficulty: "Medium",
    questionCount: 20,
    estimatedMinutes: 25,
    description:
      "Tests understanding of event propagation, DOM traversal, element creation, and intermediate DOM APIs.",
    icon: "🧭",
  },
  questions: [
    {
      id: "dm-01",
      question:
        "What is the primary difference between `e.target` and `e.currentTarget` in an event handler?",
      options: [
        "e.target is the element that triggered the event, while e.currentTarget is the element the listener is attached to.",
        "They are strictly identical in all scenarios.",
        "e.currentTarget is the element that triggered the event, while e.target is the document root.",
        "e.target refers to the mouse coordinates, while e.currentTarget refers to the HTML element.",
      ],
      correctIndex: 0,
      explanation:
        "`e.target` identifies the element on which the event occurred, whereas `e.currentTarget` always refers to the element to which the event handler has been attached.",
    },
    {
      id: "dm-02",
      question: "Which phase of the event propagation model occurs first?",
      options: [
        "Target Phase",
        "Bubbling Phase",
        "Capturing Phase",
        "Delegation Phase",
      ],
      correctIndex: 2,
      explanation:
        "The standard event flow consists of three phases: the Capturing phase (down to the element), the Target phase (at the element), and the Bubbling phase (up from the element).",
    },
    {
      id: "dm-03",
      code: "event.stopPropagation();",
      question:
        "What does this specific method do when called inside an event listener?",
      options: [
        "It prevents the default browser behavior for that event.",
        "It stops the event from propagating (bubbling or capturing) further up or down the DOM tree.",
        "It removes the event listener from the element.",
        "It pauses the JavaScript execution execution context.",
      ],
      correctIndex: 1,
      explanation:
        "`event.stopPropagation()` prevents further propagation of the current event in the capturing and bubbling phases.",
    },
    {
      id: "dm-04",
      question: "What is 'Event Delegation'?",
      options: [
        "Assigning multiple event listeners to a single element.",
        "Attaching a single event listener to a parent element to handle events from its current and future children.",
        "Passing event objects as arguments to nested functions.",
        "Creating custom events and dispatching them to the window object.",
      ],
      correctIndex: 1,
      explanation:
        "Event delegation leverages event bubbling to attach a single event listener to a parent element, which can then handle events triggered by its descendant elements.",
    },
    {
      id: "dm-05",
      question:
        "Which of the following creates a new, empty HTML element in memory but does NOT automatically place it on the page?",
      options: [
        "document.write('<div></div>')",
        "document.createElement('div')",
        "document.appendChild('div')",
        "document.querySelector('div').clone()",
      ],
      correctIndex: 1,
      explanation:
        "`document.createElement(tagName)` creates the HTML element specified by tagName, but it only exists in memory until it is explicitly appended to the DOM.",
    },
    {
      id: "dm-06",
      question:
        "What is the difference between `Node.appendChild()` and `Element.append()`?",
      options: [
        "`appendChild` can append multiple nodes at once, while `append` cannot.",
        "`append` can append string objects (text) as well as DOM nodes, and can append multiple items at once. `appendChild` only accepts a single Node.",
        "There is no difference; `append` is just a shorthand alias for `appendChild`.",
        "`appendChild` is used for Elements, while `append` is used for attributes.",
      ],
      correctIndex: 1,
      explanation:
        "`Element.append()` allows you to append multiple string objects and DOM nodes at once, whereas `Node.appendChild()` only accepts one DOM Node.",
    },
    {
      id: "dm-07",
      question:
        'Which property allows you to read custom data attributes (e.g., `data-user-id="123"`) on an HTML element?',
      options: [
        "element.customData",
        "element.dataset",
        "element.attributes.data",
        "element.getCustomAttribute",
      ],
      correctIndex: 1,
      explanation:
        "The `dataset` read-only property provides read/write access to custom data attributes (`data-*`) on elements.",
    },
    {
      id: "dm-08",
      question: "What does the `element.closest(selector)` method do?",
      options: [
        "It finds the nearest child element matching the selector.",
        "It traverses the element and its parents (heading toward the document root) until it finds a node that matches the provided CSS selector.",
        "It returns the element immediately preceding the target element.",
        "It finds the closest element geometrically on the screen.",
      ],
      correctIndex: 1,
      explanation:
        "`closest()` searches up the DOM tree, starting with the element itself, to find the closest ancestor that matches a given CSS selector.",
    },
    {
      id: "dm-09",
      question:
        "What is the difference between `element.children` and `element.childNodes`?",
      options: [
        "`children` returns an array, while `childNodes` returns an object.",
        "`childNodes` includes text nodes and comments, while `children` only includes HTML element nodes.",
        "`children` includes text nodes, while `childNodes` only includes elements.",
        "They are identical and can be used interchangeably.",
      ],
      correctIndex: 1,
      explanation:
        "`childNodes` returns a NodeList containing all child nodes (including text and comment nodes), while `children` returns an HTMLCollection containing only Element nodes.",
    },
    {
      id: "dm-10",
      code: "const clone = element.cloneNode(true);",
      question:
        "What does passing `true` as an argument to `cloneNode` signify?",
      options: [
        "It clones the element's event listeners as well.",
        "It performs a deep clone, copying the element, its attributes, and all of its descendants.",
        "It strictly enforces validation on the cloned node.",
        "It automatically appends the clone to the document body.",
      ],
      correctIndex: 1,
      explanation:
        "`cloneNode(true)` creates a deep copy of the node, including all of its child nodes. `cloneNode(false)` copies only the node itself.",
    },
    {
      id: "dm-11",
      question:
        "Which method is used to insert raw HTML text at a specific position relative to the element (e.g., 'beforebegin', 'beforeend')?",
      options: [
        "element.innerHTML",
        "element.appendHTML",
        "element.insertAdjacentHTML",
        "element.outerHTML",
      ],
      correctIndex: 2,
      explanation:
        "`insertAdjacentHTML(position, text)` parses the specified text as HTML and inserts the resulting nodes into the DOM tree at a specified position.",
    },
    {
      id: "dm-12",
      question:
        "If you want to remove an element from the DOM using modern JavaScript, which is the most direct method to call on the element itself?",
      options: [
        "element.remove()",
        "element.parentNode.removeChild(element)",
        "element.delete()",
        "element.destroy()",
      ],
      correctIndex: 0,
      explanation:
        "The `element.remove()` method removes the element directly from the DOM, superseding the older `element.parentNode.removeChild(element)` pattern.",
    },
    {
      id: "dm-13",
      question:
        "Which API provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element or with a top-level document's viewport?",
      options: [
        "MutationObserver",
        "ResizeObserver",
        "IntersectionObserver",
        "PerformanceObserver",
      ],
      correctIndex: 2,
      explanation:
        "The Intersection Observer API provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element or the viewport.",
    },
    {
      id: "dm-14",
      question: "What is the purpose of `DocumentFragment`?",
      options: [
        "To securely isolate third-party scripts.",
        "To act as a lightweight, invisible document object that can hold a portion of the document structure, improving performance when making multiple DOM insertions.",
        "To break a large webpage into smaller downloadable chunks.",
        "To create a shadow DOM tree.",
      ],
      correctIndex: 1,
      explanation:
        "A DocumentFragment is a minimal document object that has no parent. Appending children to it and then appending the fragment to the DOM triggers only one reflow, improving performance.",
    },
    {
      id: "dm-15",
      question:
        "Which DOM method checks if an element matches a specific CSS selector, returning a boolean?",
      options: [
        "element.test(selector)",
        "element.includes(selector)",
        "element.is(selector)",
        "element.matches(selector)",
      ],
      correctIndex: 3,
      explanation:
        "The `matches()` method checks to see if the Element would be selected by the provided selector string; it returns true or false.",
    },
    {
      id: "dm-16",
      question: "How do `nextSibling` and `nextElementSibling` differ?",
      options: [
        "`nextSibling` searches parents, while `nextElementSibling` searches children.",
        "`nextSibling` returns the next node of any type (including text nodes like whitespace), while `nextElementSibling` strictly returns the next HTML Element node.",
        "`nextSibling` is deprecated and `nextElementSibling` is the modern replacement.",
        "They are functionally identical in modern browsers.",
      ],
      correctIndex: 1,
      explanation:
        "`nextSibling` returns the next node in the tree (which is often a whitespace text node), whereas `nextElementSibling` skips non-element nodes to find the next actual HTML tag.",
    },
    {
      id: "dm-17",
      question:
        "Which event fires when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading?",
      options: [
        "window.onload",
        "document.onready",
        "DOMContentLoaded",
        "readystatechange",
      ],
      correctIndex: 2,
      explanation:
        "The `DOMContentLoaded` event fires when the HTML is parsed and the DOM is built, unlike `load` which waits for all external resources like images and CSS to finish.",
    },
    {
      id: "dm-18",
      question:
        "How do you programmatically read the final, computed CSS values (like pixel width or exact color) applied to an element?",
      options: [
        "element.style",
        "window.getComputedStyle(element)",
        "document.getCSS(element)",
        "element.computedStyles()",
      ],
      correctIndex: 1,
      explanation:
        "`window.getComputedStyle()` returns an object containing the values of all CSS properties of an element, after applying active stylesheets and resolving any basic computation.",
    },
    {
      id: "dm-19",
      code: "element.replaceWith(newElement);",
      question: "What is the function of the `replaceWith` method?",
      options: [
        "It swaps the text content of two elements.",
        "It replaces the element in the children list of its parent with a set of Node or string objects.",
        "It changes the tag name of an element (e.g., from <div> to <span>).",
        "It replaces all child nodes of the element with a single new node.",
      ],
      correctIndex: 1,
      explanation:
        "`Element.replaceWith()` replaces the element it is called on with the specified node or string.",
    },
    {
      id: "dm-20",
      question:
        "What is the `parentElement` property of the `<html>` (document root) element?",
      options: [
        "The `window` object",
        "The `document` object",
        "null",
        "The `<body>` element",
      ],
      correctIndex: 2,
      explanation:
        "The `parentElement` of the `<html>` element is `null` because its parent (`document`) is a Document node, not an Element node. Its `parentNode`, however, is the `document`.",
    },
  ],
};

const WebDevSet7 = {
  meta: {
    id: "dom-hard",
    testTitle: "Advanced DOM & Performance",
    topic: "javascript",
    topicLabel: "DOM Hard",
    difficulty: "Hard",
    questionCount: 20,
    estimatedMinutes: 30,
    description:
      "Evaluates deep knowledge of DOM performance (reflow/repaint), Shadow DOM, Custom Elements, and advanced API mechanics.",
    icon: "🔥",
  },
  questions: [
    {
      id: "dh-01",
      question:
        "In browser rendering, what is the difference between a 'Reflow' (or Layout) and a 'Repaint'?",
      options: [
        "Reflow deals with colors and visibility, while Repaint calculates element positions and dimensions.",
        "Reflow calculates the layout, positions, and dimensions of elements, while Repaint deals with visual updates like colors and outlines that don't affect layout.",
        "They are two names for the exact same process.",
        "Reflow happens on the server, while Repaint happens on the client.",
      ],
      correctIndex: 1,
      explanation:
        "Reflow (Layout) recalculates element positions and geometry. Repaint draws pixels to the screen based on visual changes (like color) that do not affect the document's geometry.",
    },
    {
      id: "dh-02",
      question:
        "Which of the following actions is most likely to force an immediate, synchronous Reflow (Layout Thrashing)?",
      options: [
        "Adding a class to a detached DOM node.",
        "Changing the `color` property of an element.",
        "Reading the `offsetWidth` or `scrollTop` property of an element.",
        "Using `requestAnimationFrame`.",
      ],
      correctIndex: 2,
      explanation:
        "Reading layout properties like `offsetWidth` or `scrollTop` forces the browser to synchronously calculate the current layout to return accurate values, potentially causing layout thrashing.",
    },
    {
      id: "dh-03",
      question:
        "What is the primary purpose of the `requestAnimationFrame` API?",
      options: [
        "To pause all animations on the page to save battery.",
        "To tell the browser you wish to perform an animation and request that the browser call a specified function to update an animation before the next repaint.",
        "To automatically generate CSS keyframes via JavaScript.",
        "To increase the frame rate of the browser beyond 60fps.",
      ],
      correctIndex: 1,
      explanation:
        "`requestAnimationFrame` schedules a callback to run right before the browser performs its next repaint, ensuring animations are smooth and synchronized with the display refresh rate.",
    },
    {
      id: "dh-04",
      question:
        "What does it mean when a NodeList returned by a DOM method is 'live'?",
      options: [
        "It automatically streams data to the server.",
        "It updates automatically to reflect changes in the DOM tree, whereas a static NodeList does not.",
        "It includes elements that are currently animating.",
        "It allows real-time editing by the user.",
      ],
      correctIndex: 1,
      explanation:
        "A live NodeList (like one returned by `getElementsByTagName`) automatically updates when the underlying document changes. A static NodeList (like from `querySelectorAll`) is a snapshot.",
    },
    {
      id: "dh-05",
      question:
        "Which collection is returned by `document.querySelectorAll()`?",
      options: [
        "A live HTMLCollection",
        "A static NodeList",
        "A live NodeList",
        "An Array of Elements",
      ],
      correctIndex: 1,
      explanation:
        "`querySelectorAll` returns a static (non-live) NodeList, meaning it represents a snapshot of the document at the time the method was called.",
    },
    {
      id: "dh-06",
      question:
        "What is the Shadow DOM primarily used for in modern web development?",
      options: [
        "To apply dark mode themes automatically.",
        "To encrypt HTML data before sending it over the network.",
        "To encapsulate CSS styles and HTML markup, preventing them from bleeding out to or being affected by the main document.",
        "To render 3D graphics in a hidden canvas.",
      ],
      correctIndex: 2,
      explanation:
        "Shadow DOM provides encapsulation for DOM and CSS in Web Components, keeping hidden trees separate from the main document to prevent style and script collisions.",
    },
    {
      id: "dh-07",
      code: "element.attachShadow({ mode: 'open' });",
      question:
        "What does the `mode: 'open'` configuration do when attaching a Shadow root?",
      options: [
        "It allows the shadow root to be accessed from JavaScript outside the root via `element.shadowRoot`.",
        "It makes the shadow DOM render faster but consumes more memory.",
        "It permits cross-origin resource sharing (CORS) within the shadow tree.",
        "It keeps the shadow root strictly hidden from any outside JavaScript.",
      ],
      correctIndex: 0,
      explanation:
        "A mode of 'open' means that you can access the shadow DOM using JavaScript written in the main page context via the `shadowRoot` property. 'closed' denies this access.",
    },
    {
      id: "dh-08",
      question:
        "When creating a Custom Element, which lifecycle callback is invoked each time the custom element is appended into a document-connected element?",
      options: [
        "createdCallback",
        "connectedCallback",
        "attributeChangedCallback",
        "adoptedCallback",
      ],
      correctIndex: 1,
      explanation:
        "`connectedCallback` is one of the custom element lifecycle callbacks. It is invoked each time the custom element is appended into a document-connected element.",
    },
    {
      id: "dh-09",
      code: "element.addEventListener('wheel', handler, { passive: true });",
      question:
        "What performance benefit does the `{ passive: true }` option provide for scrolling events?",
      options: [
        "It automatically throttles the event to 60 times per second.",
        "It tells the browser the listener will NOT call `preventDefault()`, allowing the browser to scroll the page immediately without waiting for JavaScript execution.",
        "It delegates the event to a Web Worker thread.",
        "It caches the event object in memory to prevent garbage collection pauses.",
      ],
      correctIndex: 1,
      explanation:
        "Marking a touch or wheel listener as passive tells the browser it won't block scrolling by calling `preventDefault()`, leading to significantly smoother scrolling performance.",
    },
    {
      id: "dh-10",
      question:
        "What is the numeric value of `Node.ELEMENT_NODE` and `Node.TEXT_NODE` respectively?",
      options: ["1 and 2", "0 and 1", "1 and 3", "8 and 9"],
      correctIndex: 2,
      explanation:
        "In the DOM API, `Node.ELEMENT_NODE` is represented by the constant 1, and `Node.TEXT_NODE` is represented by the constant 3.",
    },
    {
      id: "dh-11",
      question:
        "Which API is specifically designed to efficiently monitor changes to the DOM tree, such as nodes being added/removed or attributes being modified?",
      options: [
        "EventSource",
        "MutationObserver",
        "DOMNodeInserted (Event)",
        "Proxy API",
      ],
      correctIndex: 1,
      explanation:
        "`MutationObserver` is the modern, performant API designed to watch for changes being made to the DOM tree, replacing the deprecated DOM3 Mutation Events.",
    },
    {
      id: "dh-12",
      question: "What does the `Node.compareDocumentPosition()` method return?",
      options: [
        "A boolean indicating if two nodes are siblings.",
        "A string detailing the CSS selector path between two nodes.",
        "A bitmask value indicating the relative position (e.g., precedes, follows, contains) of the specified node to the reference node.",
        "An integer representing the pixel distance between two elements.",
      ],
      correctIndex: 2,
      explanation:
        "`compareDocumentPosition()` returns an integer value representing a bitmask that details the relative positioning of the two nodes in the document.",
    },
    {
      id: "dh-13",
      code: "const event = new CustomEvent('build', { detail: { elem: dataset.id } }); \n elem.dispatchEvent(event);",
      question:
        "In the code snippet, what is the purpose of the `detail` property within the CustomEvent configuration?",
      options: [
        "It sets the internal ID of the event for debugging.",
        "It determines whether the event will bubble up the DOM tree.",
        "It passes custom data associated with the event to the event listeners.",
        "It specifies which elements are allowed to listen to the event.",
      ],
      correctIndex: 2,
      explanation:
        "The `detail` property is used in a `CustomEvent` to pass an arbitrary payload of custom data to any listeners handling the event.",
    },
    {
      id: "dh-14",
      question:
        "How does removing a DOM element affect event listeners attached directly to it?",
      options: [
        "The listeners are immediately moved to the element's parent.",
        "The listeners remain in memory unless explicitly removed or the element is garbage collected.",
        "The listeners are automatically removed and garbage collected immediately upon DOM removal.",
        "An error is thrown if the listeners are not removed before the element.",
      ],
      correctIndex: 1,
      explanation:
        "Removing an element from the DOM does not automatically destroy the event listeners. If you retain a reference to the element in JavaScript, the listeners (and the element) cause a memory leak.",
    },
    {
      id: "dh-15",
      question:
        "Which of the following describes the behavior of `document.contains(node)`?",
      options: [
        "It searches the entire document for a specific text string.",
        "It returns true if the node is a descendant of the document (or is the document itself).",
        "It checks if an external script is currently loaded.",
        "It verifies if a CSS class exists within the global stylesheet.",
      ],
      correctIndex: 1,
      explanation:
        "`Node.contains()` returns a boolean value indicating whether a node is a descendant of a given node, or the node itself.",
    },
    {
      id: "dh-16",
      question:
        "When writing Web Components, what is the purpose of the `<template>` tag?",
      options: [
        "It acts as a structural container that is parsed but not rendered, allowing its content to be cloned and inserted into the document later.",
        "It automatically binds data variables to the DOM.",
        "It defines the styling rules for a shadow DOM.",
        "It restricts the execution of inner JavaScript for security purposes.",
      ],
      correctIndex: 0,
      explanation:
        "The `<template>` element holds HTML that is not rendered immediately when a page is loaded but can be instantiated subsequently during runtime using JavaScript.",
    },
    {
      id: "dh-17",
      question: "In the context of the Shadow DOM, what is a `<slot>`?",
      options: [
        "A placeholder inside a web component that you can fill with your own markup, enabling content composition.",
        "A memory register for storing variable states.",
        "A specific CSS grid area designated for custom elements.",
        "An API for scheduling microtasks.",
      ],
      correctIndex: 0,
      explanation:
        "A `<slot>` is a placeholder inside a web component that allows users to pass their own HTML into the component's Shadow DOM, facilitating content projection.",
    },
    {
      id: "dh-18",
      question:
        "If you call `e.stopImmediatePropagation()` inside an event listener, what happens?",
      options: [
        "It acts like `stopPropagation()`, but also prevents any other listeners attached to the *same* element for the *same* event type from executing.",
        "It instantly halts the browser's JavaScript execution engine.",
        "It prevents all events on the page from firing for the next animation frame.",
        "It unbinds the event listener so it never fires again.",
      ],
      correctIndex: 0,
      explanation:
        "`stopImmediatePropagation()` prevents other listeners of the same event from being called, even if they are attached to the same element.",
    },
    {
      id: "dh-19",
      question:
        "What interface allows you to select a portion of a document (potentially spanning multiple nodes) and manipulate it as a unit?",
      options: [
        "The Fragment API",
        "The Boundary API",
        "The Range API",
        "The Slice API",
      ],
      correctIndex: 2,
      explanation:
        "The `Range` interface represents a fragment of a document that can contain nodes and parts of text nodes, allowing complex selection and manipulation.",
    },
    {
      id: "dh-20",
      question:
        "Which of the following is true regarding Microtasks (like Promise callbacks) and DOM rendering?",
      options: [
        "The browser renders the DOM after every single microtask executes.",
        "Microtasks execute asynchronously in parallel with DOM rendering.",
        "All queued microtasks are executed before the browser performs the next UI render/repaint.",
        "DOM rendering always takes precedence and pauses microtasks.",
      ],
      correctIndex: 2,
      explanation:
        "In the Event Loop, the microtask queue is completely drained before the browser is allowed to move on to the rendering phase, meaning DOM updates in microtasks are batched before repaint.",
    },
  ],
};
