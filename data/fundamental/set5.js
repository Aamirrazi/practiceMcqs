const WebDevSet5 = {
  meta: {
    id: "recap-integration",
    testTitle: "Mini-Project Recap",
    topic: "custom",
    topicLabel: "Web Dev: Part 5",
    difficulty: "Advanced",
    questionCount: 25,
    estimatedMinutes: 30,
    description:
      "Scenario-based questions combining HTML structure, CSS layouts, and DOM manipulation to test holistic project skills.",
    icon: "🛠️",
  },
  questions: [
    {
      id: "rc-01",
      scenario:
        "You are building a styled webpage and need to create a primary navigation bar at the very top of your site.",
      question:
        "Which HTML5 semantic element is the MOST appropriate container for these links?",
      options: ["<section>", "<aside>", "<nav>", "<footer>"],
      correctIndex: 2,
      explanation:
        "The <nav> element represents a section of a page whose purpose is to provide navigation links (e.g., menus)[cite: 1515].",
    },
    {
      id: "rc-02",
      scenario:
        "Your navigation bar needs to display its links side-by-side evenly across the screen. You apply `display: flex;` to the `<nav>` container.",
      question:
        "Which CSS property will align the items horizontally along the main axis to space them evenly?",
      options: [
        "align-items",
        "justify-content",
        "flex-direction",
        "flex-wrap",
      ],
      correctIndex: 1,
      explanation:
        "The justify-content property aligns items along the main axis (e.g., space-between, space-around)[cite: 1648].",
    },
    {
      id: "rc-03",
      scenario:
        "You are adding a contact form to the webpage. You want the form data to be sent silently in the background, keeping sensitive data out of the URL.",
      question: "Which HTTP method should you specify in the `<form>` tag?",
      options: [
        'method="GET"',
        'method="POST"',
        'action="HIDDEN"',
        'type="secure"',
      ],
      correctIndex: 1,
      explanation:
        "The POST method sends form data within the HTTP request body (invisible in the URL) and is used for sending sensitive information[cite: 1533, 1534].",
    },
    {
      id: "rc-04",
      code: "document.querySelector('#contact-form').addEventListener('submit', function(event) {\n  // logic here\n});",
      question:
        "In this DOM manipulation script, what type of event is the code listening for?",
      options: [
        "A Mouse event",
        "A Window event",
        "A Form event",
        "A Keyboard event",
      ],
      correctIndex: 2,
      explanation:
        "The 'submit' event is classified as a Form event[cite: 1687].",
    },
    {
      id: "rc-05",
      scenario:
        'Inside your form, you have a `<label>` and an `<input type="email">`. You want users to be able to click the label text to automatically focus the email input.',
      question: "How do you correctly link the label to the input?",
      options: [
        "By matching the label's `id` attribute to the input's `class` attribute.",
        "By placing the input tag inside the head section.",
        "By matching the label's `for` attribute to the input's `id` attribute.",
        "By giving them both the same `name` attribute.",
      ],
      correctIndex: 2,
      explanation:
        "The 'for' attribute of the <label> must match the 'id' attribute of the <input> control[cite: 1551, 1552].",
    },
    {
      id: "rc-06",
      scenario:
        "You want to ensure users do not submit the contact form without entering their email address.",
      question: "Which HTML5 attribute should you add to the email `<input>`?",
      options: ["mandatory", "required", "validate", "minlength"],
      correctIndex: 1,
      explanation:
        "The 'required' attribute is a boolean indicating that the user must fill out the field before submitting[cite: 1556].",
    },
    {
      id: "rc-07",
      scenario:
        "You are styling a 'Submit' button. You add a 2px border and 10px padding. However, this causes the button to break out of its container's calculated width.",
      question:
        "Which CSS property fixes this by factoring the padding and border into the button's total width?",
      options: [
        "margin: 0;",
        "display: inline-block;",
        "box-sizing: border-box;",
        "width: 100%;",
      ],
      correctIndex: 2,
      explanation:
        "Applying box-sizing: border-box; changes default behavior so that padding and border are factored into the set width and height[cite: 1634].",
    },
    {
      id: "rc-08",
      code: "const popup = document.getElementById('success-modal');\npopup.classList.add('visible');",
      question:
        "What is the primary advantage of showing the popup this way instead of using `popup.style.display = 'block'`?",
      options: [
        "It prevents the DOM tree from recalculating.",
        "It is a cleaner, more maintainable approach because the visual styles are kept separated in the CSS file.",
        "It executes faster in the browser engine.",
        "It automatically triggers a form submission.",
      ],
      correctIndex: 1,
      explanation:
        "The .classList API is a cleaner and more maintainable way to alter styles by defining styles in CSS as classes[cite: 1692, 1693].",
    },
    {
      id: "rc-09",
      scenario:
        "You are integrating an interactive map widget into your website's footer.",
      question:
        "Which HTML element acts as a 'window' to load another separate HTML document (like Google Maps) inside your page?",
      options: ["<map>", "<iframe>", "<embed>", "<window>"],
      correctIndex: 1,
      explanation:
        "An Inline Frame (<iframe>) is an HTML element that loads another separate HTML document inside the current one, commonly used for Google Maps[cite: 1587, 1588, 1589].",
    },
    {
      id: "rc-10",
      scenario:
        "Your webpage has a list of 'Features'. You want to style each feature card identically.",
      question:
        "Which CSS selector type is best suited for applying the same styles to multiple elements on a page?",
      options: [
        "ID Selector (#)",
        "Class Selector (.)",
        "Element Selector",
        "Universal Selector (*)",
      ],
      correctIndex: 1,
      explanation:
        "The Class Selector is used for elements with a specific class attribute, and classes can be used multiple times on a page[cite: 1612, 1613].",
    },
    {
      id: "rc-11",
      scenario:
        "You are setting up the foundational HTML structure before adding content.",
      question:
        'Where should you place the `<meta name="viewport">` tag to ensure your CSS layout renders responsively on mobile devices?',
      options: [
        "Inside the <body> section.",
        "Inside the <head> section.",
        "Immediately after the <!DOCTYPE html> declaration.",
        "Inside the <header> element.",
      ],
      correctIndex: 1,
      explanation:
        'The <head> section contains setup, styling links, and metadata, including the <meta name="viewport"> tag for responsive design[cite: 1441, 1443].',
    },
    {
      id: "rc-12",
      code: "let themeBtn = document.querySelector('.theme-toggle');\nthemeBtn.addEventListener('click', () => {\n  document.body.classList.toggle('dark-mode');\n});",
      question:
        "If a user clicks the theme toggle button twice, what will be the final state of the `<body>` element?",
      options: [
        "It will have two 'dark-mode' classes.",
        "It will throw a JavaScript error.",
        "It will revert to its original state (the 'dark-mode' class is removed).",
        "It will be permanently stuck in dark mode.",
      ],
      correctIndex: 2,
      explanation:
        "The classList.toggle() method adds a class if it is missing, or removes it if it is present. Clicking twice adds then removes it[cite: 1694].",
    },
    {
      id: "rc-13",
      scenario:
        "You want a specific paragraph to be completely hidden and removed from the document flow, collapsing the space it took up.",
      question: "Which CSS rule accomplishes this?",
      options: [
        "visibility: hidden;",
        "opacity: 0;",
        "display: none;",
        "margin: 0;",
      ],
      correctIndex: 2,
      explanation:
        "The display: none; property completely removes the element from the document flow[cite: 1641].",
    },
    {
      id: "rc-14",
      scenario:
        "You are embedding a promotional video on the homepage. You want an image to display before the user clicks play.",
      question:
        "Which `<video>` attribute allows you to specify this placeholder image?",
      options: ["src", "alt", "poster", "thumbnail"],
      correctIndex: 2,
      explanation:
        "The poster attribute specifies an image to be shown while the video is downloading or until the user hits play[cite: 1580, 1581].",
    },
    {
      id: "rc-15",
      scenario:
        "A user is filling out a multi-line comment section on your blog.",
      question:
        "Which HTML element is designed specifically for this type of long-form text input?",
      options: [
        '<input type="text">',
        '<input type="long">',
        "<textarea>",
        "<comment>",
      ],
      correctIndex: 2,
      explanation:
        "The <textarea> defines a multi-line text input control, ideal for long comments or messages[cite: 1548].",
    },
    {
      id: "rc-16",
      question:
        'To improve initial page load times, you add `loading="lazy"` to your images. What does this attribute do?',
      options: [
        "It reduces the image resolution to load it faster.",
        "It delays fetching the image until it is close to entering the viewport.",
        "It loads the image asynchronously using JavaScript.",
        "It prevents the image from loading entirely.",
      ],
      correctIndex: 1,
      explanation:
        'The loading="lazy" attribute delays fetching the image until it is close to entering the viewport, significantly improving initial page load times[cite: 1568].',
    },
    {
      id: "rc-17",
      scenario:
        "You are using JavaScript to update a welcome message. You want to inject a user's name wrapped in `<strong>` tags so it appears bold.",
      question:
        "Which DOM property allows you to set HTML markup directly into an element?",
      options: [
        "element.textContent",
        "element.innerText",
        "element.innerHTML",
        "element.markup",
      ],
      correctIndex: 2,
      explanation:
        "element.innerHTML gets or sets the HTML markup contained within the element[cite: 1676].",
    },
    {
      id: "rc-18",
      scenario:
        "You are using Flexbox to layout a gallery of 10 images. By default, they are shrinking and trying to squeeze onto a single line.",
      question:
        "Which Flexbox container property will force them to wrap onto multiple lines?",
      options: [
        "flex-direction: column;",
        "align-items: stretch;",
        "flex-wrap: wrap;",
        "justify-content: flex-start;",
      ],
      correctIndex: 2,
      explanation:
        "By default, flex items try to fit on one single line. flex-wrap: wrap; allows them to flow onto multiple lines[cite: 1650, 1651].",
    },
    {
      id: "rc-19",
      question:
        "When writing CSS, what is the correct hexadecimal syntax to set a background color?",
      options: [
        "background-color: rgb(255, 0, 0);",
        "background-color: #RRGGBB;",
        "background-color: hex(red);",
        "background-color: (00,FF,00);",
      ],
      correctIndex: 1,
      explanation:
        "Hexadecimal (Hex) uses the #RRGGBB format, where RR, GG, and BB are hexadecimal values[cite: 1619].",
    },
    {
      id: "rc-20",
      code: "let image = document.querySelector('.hero-img');\nlet url = image.getAttribute('src');",
      question:
        "What is stored in the `url` variable after this code executes?",
      options: [
        "A new image element.",
        "The string value representing the image's source path.",
        "A NodeList.",
        "A boolean indicating if the image loaded.",
      ],
      correctIndex: 1,
      explanation:
        "element.getAttribute('attribute-name') reads the value of an attribute, which in this case is the string path to the image source[cite: 1678].",
    },
    {
      id: "rc-21",
      scenario:
        "You are organizing a large table displaying user data. You want to group the column titles separately from the data rows.",
      question: "Which advanced semantic table tag groups the header content?",
      options: ["<header>", "<thead>", "<th>", "<top>"],
      correctIndex: 1,
      explanation:
        "Advanced table structures use <thead>, <tbody>, and <tfoot> to group header, body, and footer content[cite: 1498].",
    },
    {
      id: "rc-22",
      question:
        "What distinguishes an element with `display: inline-block;` from a standard `inline` element?",
      options: [
        "It forces a line break before and after the element.",
        "It acts like a Flexbox container.",
        "It sits side-by-side but fully respects width, height, margins, and padding.",
        "It becomes invisible to screen readers.",
      ],
      correctIndex: 2,
      explanation:
        "An inline-block sits side-by-side like an inline element, but it fully respects width, height, margins, and padding like a block element[cite: 1640].",
    },
    {
      id: "rc-23",
      scenario:
        "You are building the footer of the webpage and need to include copyright data and author info.",
      question:
        "According to HTML5 semantics, which tag should wrap this specific content?",
      options: ["<bottom>", "<section>", "<footer>", "<aside>"],
      correctIndex: 2,
      explanation:
        "The <footer> element represents a footer and typically contains information about the author, copyright data, or legal disclaimers[cite: 1524].",
    },
    {
      id: "rc-24",
      scenario:
        "You need a dropdown list where a user can select their country.",
      question:
        "Which combination of HTML elements is required to build this dropdown menu?",
      options: [
        "<form> and <input>",
        "<select> and <option>",
        "<ul> and <li>",
        "<list> and <item>",
      ],
      correctIndex: 1,
      explanation:
        "The <select> and <option> elements are used together to create a drop-down list[cite: 1550].",
    },
    {
      id: "rc-25",
      scenario:
        "You want a specific script to run every time a user resizes their browser window.",
      question: "Which 'Window' event type should you listen for?",
      options: ["load", "scroll", "change", "resize"],
      correctIndex: 3,
      explanation:
        "Window events include load, resize, and scroll[cite: 1688].",
    },
  ],
};
