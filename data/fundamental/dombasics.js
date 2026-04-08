const WebDevSet4 = {
  meta: {
    id: "dom-basics",
    testTitle: "DOM Basics",
    topic: "javascript",
    topicLabel: "DOM Fundamentals",
    difficulty: "Beginner",
    questionCount: 25,
    estimatedMinutes: 30,
    description:
      "Evaluates understanding of the Document Object Model, node selection, event handling, and dynamic styling.",
    icon: "⚡",
  },
  questions: [
    {
      id: "db-01",
      question: "What does DOM stand for?",
      options: [
        "Data Object Model",
        "Document Oriented Markup",
        "Document Object Model",
        "Dynamic Object Manipulation",
      ],
      correctIndex: 2,
      explanation:
        "The Document Object Model (DOM) is a programming interface (API) for web documents[cite: 1656].",
    },
    {
      id: "db-02",
      question: "What is the primary purpose of the Document Object Model?",
      options: [
        "To compile CSS into machine code.",
        "To represent the page so that programs can change the document structure, style, and content.",
        "To securely hash user passwords on the frontend.",
        "To host the website on a server.",
      ],
      correctIndex: 1,
      explanation:
        "It represents the page so that programs can change the document structure, style, and content[cite: 1657].",
    },
    {
      id: "db-03",
      question: "In the DOM tree, what represents the root of the tree?",
      options: [
        "The <html> tag",
        "The Element Node",
        "The Document Node",
        "The Text Node",
      ],
      correctIndex: 2,
      explanation:
        "The Document Node is the root of the tree (document object). It represents the entire webpage[cite: 1662].",
    },
    {
      id: "db-04",
      question:
        "What do HTML tags like `<div>` and `<body>` translate to within the DOM tree?",
      options: [
        "Document Nodes",
        "Text Nodes",
        "Attribute Nodes",
        "Element Nodes",
      ],
      correctIndex: 3,
      explanation:
        "Element Nodes represent the HTML tags (like <html>, <body>, <div>) within the DOM tree[cite: 1663].",
    },
    {
      id: "db-05",
      question:
        "Which JavaScript method is used to select a single element based on its unique id attribute?",
      options: [
        "document.querySelector()",
        "document.getElementById()",
        "document.getElementsByClassName()",
        "document.selectNode()",
      ],
      correctIndex: 1,
      explanation:
        "document.getElementById('id-name') selects a single element based on its unique id attribute[cite: 1667].",
    },
    {
      id: "db-06",
      question: "What does `document.getElementsByClassName('card')` return?",
      options: [
        "A single element object.",
        "An HTMLCollection of all elements with the specified class.",
        "A NodeList.",
        "An Array of strings.",
      ],
      correctIndex: 1,
      explanation:
        "document.getElementsByClassName('class-name') returns an HTML Collection of all elements with the specified class[cite: 1668].",
    },
    {
      id: "db-07",
      question:
        "Which of the following is considered the most versatile modern method that returns the *first* element matching a CSS selector?",
      options: [
        "document.querySelectorAll()",
        "document.getElementsByTagName()",
        "document.getElementById()",
        "document.querySelector()",
      ],
      correctIndex: 3,
      explanation:
        "document.querySelector('css-selector') is the most versatile modern method that returns the first element matching the given CSS selector[cite: 1671].",
    },
    {
      id: "db-08",
      question: "What type of list does `document.querySelectorAll()` return?",
      options: [
        "An HTMLCollection",
        "A NodeList",
        "A standard JavaScript Array",
        "A JSON object",
      ],
      correctIndex: 1,
      explanation:
        "document.querySelectorAll('css-selector') returns a NodeList of all elements that match the CSS selector[cite: 1672].",
    },
    {
      id: "db-09",
      question:
        "Which property gets or sets the raw text content of a node and is considered the safest way to change text?",
      options: [
        "element.innerHTML",
        "element.textValue",
        "element.textContent",
        "element.innerText",
      ],
      correctIndex: 2,
      explanation:
        "element.textContent gets or sets the raw text content of a node and its descendants, acting as the safest way to change text[cite: 1675].",
    },
    {
      id: "db-10",
      question: "Why should `element.innerHTML` be used with caution?",
      options: [
        "It is deprecated in modern browsers.",
        "It gets or sets raw HTML markup, which can introduce security vulnerabilities if handling user input.",
        "It can only be used on <div> elements.",
        "It deletes the DOM tree.",
      ],
      correctIndex: 1,
      explanation:
        "element.innerHTML gets or sets the HTML markup contained within the element, and the document explicitly states to use it with caution[cite: 1676].",
    },
    {
      id: "db-11",
      code: "element.setAttribute('src', 'new-image.jpg');",
      question: "What does this code accomplish?",
      options: [
        "It reads the current value of the 'src' attribute.",
        "It updates or adds the 'src' attribute with the value 'new-image.jpg'.",
        "It removes the 'src' attribute entirely.",
        "It creates a new image element in the DOM.",
      ],
      correctIndex: 1,
      explanation:
        "element.setAttribute('attribute-name', 'value') updates or adds an attribute to an element[cite: 1679].",
    },
    {
      id: "db-12",
      question:
        "How do you read the value of an existing attribute (like an `href`) from a selected element?",
      options: [
        "element.readAttribute('href')",
        "element.getAttribute('href')",
        "element.href()",
        "element.fetch('href')",
      ],
      correctIndex: 1,
      explanation:
        "element.getAttribute('attribute-name') reads the value of an attribute[cite: 1678].",
    },
    {
      id: "db-13",
      question: "What is an event in the context of the DOM?",
      options: [
        "A server-side database update.",
        "An action or occurrence that happens in the browser, like a user clicking a button.",
        "A CSS transition sequence.",
        "A syntax error in JavaScript.",
      ],
      correctIndex: 1,
      explanation:
        "Events are actions or occurrences that happen in the browser (e.g., a user clicking a button)[cite: 1681].",
    },
    {
      id: "db-14",
      question:
        "Which method is used to attach an event handler to a specified element without overwriting existing handlers?",
      options: [
        "element.addEventListener()",
        "element.onEvent()",
        "element.attachEvent()",
        "element.listen()",
      ],
      correctIndex: 0,
      explanation:
        "element.addEventListener('event-type', callbackFunction) attaches an event handler without overwriting existing event handlers[cite: 1683].",
    },
    {
      id: "db-15",
      question: "Which of the following is considered a 'Mouse' event?",
      options: ["keyup", "submit", "dblclick", "resize"],
      correctIndex: 2,
      explanation:
        "Common mouse events include click, dblclick, mouseenter, mouseleave, and mousemove[cite: 1685].",
    },
    {
      id: "db-16",
      question:
        "Which of the following events would be triggered by a user typing on their physical keyboard?",
      options: ["blur", "keydown", "change", "scroll"],
      correctIndex: 1,
      explanation:
        "Keyboard events include keydown, keyup, and keypress[cite: 1686].",
    },
    {
      id: "db-17",
      question:
        "The `submit`, `change`, and `focus` events are primarily associated with which type of HTML element?",
      options: ["Images", "Videos", "Forms", "Tables"],
      correctIndex: 2,
      explanation:
        "Form events include submit, change, input, focus, and blur[cite: 1687].",
    },
    {
      id: "db-18",
      question: "Which of the following is classified as a 'Window' event?",
      options: ["mouseenter", "resize", "submit", "keypress"],
      correctIndex: 1,
      explanation:
        "Window events include load, resize, and scroll[cite: 1688].",
    },
    {
      id: "db-19",
      question:
        "What is considered a cleaner and more maintainable way to alter styles using JavaScript, rather than manipulating the `style` property directly?",
      options: [
        "Writing inline styles with innerHTML.",
        "Using the `.classList` API to add, remove, or toggle CSS classes.",
        "Using `document.write()`.",
        "Linking a new stylesheet dynamically on every click.",
      ],
      correctIndex: 1,
      explanation:
        "The .classList API is a cleaner and more maintainable way to alter styles by defining styles in CSS as classes and using JS to toggle them[cite: 1692, 1693].",
    },
    {
      id: "db-20",
      code: "element.classList.toggle('active');",
      question: "What does this specific code do?",
      options: [
        "It adds the 'active' class if it is missing, or removes it if it is already present.",
        "It removes all classes and adds 'active'.",
        "It creates a CSS animation called 'active'.",
        "It disables the element temporarily.",
      ],
      correctIndex: 0,
      explanation:
        "element.classList.toggle('class-name') flips a class—adding it if it is missing, or removing it if it is present (deduced from standard toggle functionality and listed API methods)[cite: 1694].",
    },
    {
      id: "db-21",
      question:
        "Which programming language uses the DOM to make web pages interactive?",
      options: ["HTML", "CSS", "Python", "JavaScript"],
      correctIndex: 3,
      explanation:
        "JavaScript is the programming language that makes web pages interactive by using the DOM to interact with HTML and CSS[cite: 1653, 1654].",
    },
    {
      id: "db-22",
      question:
        "If you needed to select every single `<p>` tag on a webpage, which method would return an HTMLCollection of them?",
      options: [
        "document.getElementsByTagName('p')",
        "document.getElementById('p')",
        "document.querySelector('p')",
        "document.getParagraphs()",
      ],
      correctIndex: 0,
      explanation:
        "document.getElementsByTagName('tag-name') returns an HTMLCollection of all elements of a specific tag type[cite: 1669, 1670].",
    },
    {
      id: "db-23",
      question: "In the DOM hierarchy, what is a Text Node?",
      options: [
        "An HTML tag like <b>.",
        "The root of the document.",
        "An attribute like 'src'.",
        "The actual text inside an element.",
      ],
      correctIndex: 3,
      explanation:
        "Text Nodes represent the actual text inside an element[cite: 1663].",
    },
    {
      id: "db-24",
      question:
        "To strip an existing CSS class named 'hidden' from an element, you would use:",
      options: [
        "element.classList.add('hidden')",
        "element.classList.remove('hidden')",
        "element.removeClass('hidden')",
        "element.setAttribute('hidden', 'false')",
      ],
      correctIndex: 1,
      explanation:
        "The element.classList.remove('class-name') method is used to remove a specific class from an element[cite: 1694].",
    },
    {
      id: "db-25",
      code: "document.querySelector('.submit-btn')",
      question:
        "In this code snippet, what does the period (.) inside the string signify?",
      options: [
        "It looks for an element with the ID 'submit-btn'.",
        "It specifies a CSS class selector.",
        "It targets a specific HTML tag.",
        "It represents a method chain.",
      ],
      correctIndex: 1,
      explanation:
        "The querySelector method takes a CSS selector. A Class Selector is preceded by a period (.)[cite: 1612, 1671].",
    },
  ],
};
