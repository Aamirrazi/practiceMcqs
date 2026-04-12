const WebDevSet1 = {
  meta: {
    id: "html-fundamentals",
    testTitle: "HTML Fundamentals",
    topic: "html",
    topicLabel: "HTML Fundamentals",
    difficulty: "Beginner",
    questionCount: 25,
    estimatedMinutes: 25,
    description:
      "Covers webpage structure, basic tags, text formatting, and lists.",
    icon: "🌐",
  },
  questions: [
    {
      id: "hf-01",
      question:
        "What is the primary purpose of the `<!DOCTYPE html>` declaration?",
      options: [
        "It acts as the root HTML tag.",
        "It instructs the browser on what version of HTML the page is written in.",
        "It imports external CSS stylesheets.",
        "It defines the language of the document.",
      ],
      correctIndex: 1,
      explanation:
        "The doctype declaration is an instruction to the web browser about the HTML version, ensuring it renders in standard mode. [cite: 1399, 1400]",
    },
    {
      id: "hf-02",
      question:
        "Which section of an HTML document contains metadata, title, and links to stylesheets?",
      options: ["<body>", "<html>", "<head>", "<meta>"],
      correctIndex: 2,
      explanation:
        "The <head> section contains metadata, stylesheet links, title, and scripts, which are not directly displayed in the main viewport. [cite: 1404, 1405]",
    },
    {
      id: "hf-03",
      question:
        "Why is it crucial to include a `lang` attribute in the `<html>` root element?",
      options: [
        "To apply default CSS styling based on region.",
        "It is crucial for accessibility (screen readers) and search engine optimization (SEO).",
        "To translate the page automatically.",
        "To declare the character encoding.",
      ],
      correctIndex: 1,
      explanation:
        "The lang attribute declares the primary language, which is crucial for accessibility and SEO. [cite: 1402]",
    },
    {
      id: "hf-04",
      code: '<img src="image.jpg" alt="A beautiful scenery">',
      question: "In the code snippet above, what are `src` and `alt`?",
      options: ["Elements", "Tags", "Attributes", "Values"],
      correctIndex: 2,
      explanation:
        "Attributes like src and alt provide additional information or modifiers for HTML elements and are specified in the opening tag. [cite: 1430, 1435]",
    },
    {
      id: "hf-05",
      question:
        "Which of the following is an example of a 'self-closing' or 'empty' HTML element?",
      options: ["<p>", "<h1>", "<img>", "<div>"],
      correctIndex: 2,
      explanation:
        "Some tags are 'self-closing' or 'empty', meaning they don't wrap content and don't require a closing tag, such as <img>, <br>, and <meta>. [cite: 1426]",
    },
    {
      id: "hf-06",
      question:
        "Where should all the visible content that users interact with (text, images, links) be placed?",
      options: ["<head>", "<body>", "<main>", "<title>"],
      correctIndex: 1,
      explanation:
        "The <body> section contains all the visible content that users interact with. [cite: 1406]",
    },
    {
      id: "hf-07",
      question:
        "Which `<head>` element is essential for SEO and shows text in the browser tab?",
      options: ["<meta>", "<link>", "<title>", "<style>"],
      correctIndex: 2,
      explanation:
        "The <title> element defines the document's title shown in the browser tab and is essential for SEO. [cite: 1442]",
    },
    {
      id: "hf-08",
      question:
        "Which tag is used primarily to link external CSS stylesheets to an HTML document?",
      options: ["<style>", "<script>", "<meta>", "<link>"],
      correctIndex: 3,
      explanation:
        "The <link> tag is primarily used to link external CSS stylesheets or website icons. [cite: 1444]",
    },
    {
      id: "hf-09",
      question:
        "What is the difference between semantic and physical text formatting tags?",
      options: [
        "Physical formatting dictates visual orientation, while semantic formatting dictates meaning.",
        "Semantic tags are used in the head, physical in the body.",
        "Physical tags are required for SEO, semantic tags are not.",
        "There is no difference; they are interchangeable.",
      ],
      correctIndex: 0,
      explanation:
        "Physical formatting deals with visual orientation (like bold or italic), while semantic formatting is meaning-oriented, reinforcing the meaning of information for SEO and accessibility. [cite: 1455, 1462, 1502]",
    },
    {
      id: "hf-10",
      question:
        "Which semantic tag indicates strong importance and is usually rendered as bold by browsers?",
      options: ["<b>", "<strong>", "<em>", "<mark>"],
      correctIndex: 1,
      explanation:
        "The <strong> tag indicates strong importance and is usually rendered as bold by browsers, while screen readers may change intonation. [cite: 1463]",
    },
    {
      id: "hf-11",
      question:
        "Which tag is used to preserve spaces and line breaks exactly as written in the HTML file?",
      options: ["<code>", "<blockquote>", "<pre>", "<p>"],
      correctIndex: 2,
      explanation:
        "The <pre> tag defines preformatted text, preserving spaces and line breaks exactly as written, which is crucial for code blocks. [cite: 1476]",
    },
    {
      id: "hf-12",
      scenario:
        "You are writing a recipe on a webpage and need to list the steps in sequential order.",
      question: "Which HTML list element should you use?",
      options: ["<ul>", "<dl>", "<ol>", "<li>"],
      correctIndex: 2,
      explanation:
        "Ordered Lists (<ol>) are used when the sequence is important, such as steps in a recipe. [cite: 1485]",
    },
    {
      id: "hf-13",
      question:
        "In an HTML table, which tag defines a standard table data cell?",
      options: ["<tr>", "<th>", "<table>", "<td>"],
      correctIndex: 3,
      explanation:
        "The <td> tag defines a standard table data cell within a table. [cite: 1497]",
    },
    {
      id: "hf-14",
      question:
        "What is the primary purpose of semantic HTML elements like `<article>` and `<form>`?",
      options: [
        "To apply default CSS colors to the page.",
        "To act as generic containers without meaning.",
        "To clearly define their content to both the browser and the developer.",
        "To replace the need for JavaScript.",
      ],
      correctIndex: 2,
      explanation:
        "Semantic elements clearly define their content to both the browser and the developer, unlike non-semantic elements like <div>. [cite: 1504]",
    },
    {
      id: "hf-15",
      question: "Which tag is an example of a non-semantic element?",
      options: ["<form>", "<table>", "<span>", "<header>"],
      correctIndex: 2,
      explanation:
        "Non-semantic elements like <div> and <span> tell us nothing about their content and act as generic containers. [cite: 1503]",
    },
    {
      id: "hf-16",
      question: "Why is semantic HTML important for visually impaired users?",
      options: [
        "It increases the default font size.",
        "Screen readers use semantic tags to help them navigate the page efficiently.",
        "It automatically adds high-contrast colors.",
        "It converts text to braille.",
      ],
      correctIndex: 1,
      explanation:
        "Semantic HTML is important for accessibility because screen readers use tags like <nav> and <header> to help visually impaired users navigate efficiently. [cite: 1506, 1507]",
    },
    {
      id: "hf-17",
      question:
        "Which physical formatting tag is used for italic text but is often used for technical terms?",
      options: ["<em>", "<i>", "<u>", "<s>"],
      correctIndex: 1,
      explanation:
        "The <i> tag provides physical italic formatting and is often used for technical terms or thoughts. [cite: 1458]",
    },
    {
      id: "hf-18",
      question:
        "Which list type contains `<dt>` (defining term) and `<dd>` (description details)?",
      options: [
        "Unordered Lists",
        "Ordered Lists",
        "Description Lists",
        "Table Lists",
      ],
      correctIndex: 2,
      explanation:
        "Description Lists (<dl>) contain <dt> (defining term) and <dd> (description details). [cite: 1491, 1492]",
    },
    {
      id: "hf-19",
      question: "What does the HTML element `<q>` define?",
      options: [
        "A quoted block of text.",
        "A question.",
        "An inline short quote.",
        "A query string.",
      ],
      correctIndex: 2,
      explanation:
        "The <q> tag is used to define an inline short quote. [cite: 1472]",
    },
    {
      id: "hf-20",
      code: '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
      question: "What is the primary purpose of this specific meta tag?",
      options: [
        "To define the document's character encoding.",
        "To establish viewport settings for responsive design.",
        "To link an external stylesheet.",
        "To describe the page for SEO.",
      ],
      correctIndex: 1,
      explanation:
        "Meta tags can define viewport settings, which are essential for responsive design. [cite: 1443]",
    },
    {
      id: "hf-21",
      question:
        "What tag usually represents the largest, most important heading on a page?",
      options: ["<header>", "<h1>", "<h6>", "<title>"],
      correctIndex: 1,
      explanation:
        "The <body> section contains headings ranging from <h1> to <h6>, with <h1> generally being the highest level. [cite: 1451]",
    },
    {
      id: "hf-22",
      question: "Which of the following is an attribute, NOT an element?",
      options: ["href", "head", "body", "title"],
      correctIndex: 0,
      explanation:
        "The href in <a> tags is an attribute that indicates the destination URL, while head, body, and title are elements. [cite: 1434]",
    },
    {
      id: "hf-23",
      question: "What is the correct syntax for an HTML closing tag?",
      options: ["<tag>", "<\\tag>", "</tag>", "{/tag}"],
      correctIndex: 2,
      explanation:
        "Tags usually come in pairs: an opening tag and a closing tag. The closing tag has a forward slash before the tag name, like </p>. [cite: 1424, 1425]",
    },
    {
      id: "hf-24",
      question:
        "Which tags are used to group header, body, and footer content within a complex table?",
      options: [
        "<header>, <main>, <footer>",
        "<thead>, <tbody>, <tfoot>",
        "<top>, <middle>, <bottom>",
        "<th>, <tr>, <td>",
      ],
      correctIndex: 1,
      explanation:
        "Advanced table structures use <thead>, <tbody>, and <tfoot> to group content and make large tables manageable. [cite: 1498]",
    },
    {
      id: "hf-25",
      question:
        "True or False: The `<style>` tag is used to write internal CSS directly within the HTML file.",
      options: ["True", "False", "Only in the body", "Only in HTML4"],
      correctIndex: 0,
      explanation:
        "The <style> element is used within the <head> section for writing internal CSS directly in the HTML file. [cite: 1446]",
    },
  ],
};

const WebDevSet2 = {
  meta: {
    id: "intermediate-html",
    testTitle: "Intermediate HTML + Forms",
    topic: "html",
    topicLabel: "HTML Fundamentals",
    difficulty: "Intermediate",
    questionCount: 25,
    estimatedMinutes: 30,
    description:
      "Deep dive into semantic structures, form inputs, validation, and media embedding.",
    icon: "📝",
  },
  questions: [
    {
      id: "ih-01",
      question:
        "Which semantic element specifies the dominant, primary content of the body and should be unique per page?",
      options: ["<header>", "<section>", "<main>", "<article>"],
      correctIndex: 2,
      explanation:
        "The <main> element specifies the dominant, primary content of the body and should be unique per page. [cite: 1517, 1518]",
    },
    {
      id: "ih-02",
      question:
        "Which element represents a self-contained, independent piece of content that could be syndicated (like a blog post)?",
      options: ["<section>", "<article>", "<aside>", "<div>"],
      correctIndex: 1,
      explanation:
        "An <article> represents a complete or self-contained piece of content that could theoretically be reused independently, like a blog entry. [cite: 1521]",
    },
    {
      id: "ih-03",
      question:
        "What is the correct semantic tag for a sidebar containing tangentially related content?",
      options: ["<nav>", "<footer>", "<aside>", "<section>"],
      correctIndex: 2,
      explanation:
        "The <aside> element represents a portion of a document indirectly related to the main content, often used for sidebars. [cite: 1522, 1523]",
    },
    {
      id: "ih-04",
      question:
        "In an HTML `<form>`, what does the `action` attribute specify?",
      options: [
        "The HTTP method used (GET or POST).",
        "The URL or server script where the form data should be sent.",
        "The validation rules for the form.",
        "The submit button's behavior.",
      ],
      correctIndex: 1,
      explanation:
        "The action attribute specifies the URL or server script where form data should be sent when submitted. [cite: 1529]",
    },
    {
      id: "ih-05",
      scenario:
        "You are designing a login form that handles sensitive passwords.",
      question: "Which HTTP method should you specify in the form tag?",
      options: ["GET", "POST", "PUT", "PATCH"],
      correctIndex: 1,
      explanation:
        "The POST method sends data within the HTTP request body (invisible in the URL) and is used for sending sensitive information like passwords. [cite: 1533, 1534]",
    },
    {
      id: "ih-06",
      question:
        "Which `<input>` type restricts the user to selecting exactly one option from a set?",
      options: ["checkbox", "radio", "select", "text"],
      correctIndex: 1,
      explanation:
        "The radio input type allows the user to select exactly one option from a set that defines the same name attribute. [cite: 1541, 1542]",
    },
    {
      id: "ih-07",
      question:
        "Which element creates a multi-line text input control ideal for long comments?",
      options: [
        '<input type="text">',
        "<textarea>",
        "<select>",
        '<input type="longtext">',
      ],
      correctIndex: 1,
      explanation:
        "The <textarea> defines a multi-line text input control, ideal for long comments, and content sits between the opening and closing tags. [cite: 1548, 1549]",
    },
    {
      id: "ih-08",
      question:
        "To link a `<label>` to its corresponding `<input>` for accessibility, the `for` attribute of the label must match what property of the input?",
      options: ["class", "name", "id", "type"],
      correctIndex: 2,
      explanation:
        "The 'for' attribute of the <label> must match the 'id' attribute of the <input> control to activate it properly. [cite: 1551, 1552]",
    },
    {
      id: "ih-09",
      question:
        "Which HTML5 form validation attribute allows you to define a Regular Expression (Regex) that the input must match?",
      options: ["required", "pattern", "maxlength", "format"],
      correctIndex: 1,
      explanation:
        "The 'pattern' attribute allows you to define a Regular Expression (Regex) that the input value must match to be considered valid. [cite: 1559]",
    },
    {
      id: "ih-10",
      question:
        "Why is server-side validation still absolutely necessary even if HTML5 client-side validation is implemented?",
      options: [
        "Client-side validation doesn't check email formats.",
        "Because users can bypass browser client-side validation, making server-side checks critical for security.",
        "HTML5 validation is deprecated.",
        "Browsers cannot run Regular Expressions.",
      ],
      correctIndex: 1,
      explanation:
        "Server-side validation is still absolutely necessary for security because users can bypass browser-based client-side validation. [cite: 1561]",
    },
    {
      id: "ih-11",
      code: '<img src="photo.jpg" alt="Dog" loading="lazy">',
      question: 'What is the benefit of the `loading="lazy"` attribute?',
      options: [
        "It prevents the image from ever downloading.",
        "It delays fetching the image until it is close to entering the viewport, improving initial page load times.",
        "It blurs the image until it is clicked.",
        "It reduces the file size of the image on the server.",
      ],
      correctIndex: 1,
      explanation:
        'The loading="lazy" attribute delays fetching the image until it is close to entering the viewport, significantly improving initial page load times. [cite: 1568]',
    },
    {
      id: "ih-12",
      question:
        "When embedding a `<video>`, what does the `poster` attribute do?",
      options: [
        "It plays a sound when the video ends.",
        "It provides a text transcript of the video.",
        "It specifies an image to be shown while the video is downloading or until the user hits play.",
        "It loops the video endlessly.",
      ],
      correctIndex: 2,
      explanation:
        "The poster attribute specifies an image to be shown while the video is downloading or until the user hits play. [cite: 1580, 1581]",
    },
    {
      id: "ih-13",
      question:
        "Which HTML element is used as an 'Inline Frame' to load another separate HTML document inside the current one (like a Google Map)?",
      options: ["<embed>", "<object>", "<iframe>", "<canvas>"],
      correctIndex: 2,
      explanation:
        "An Inline Frame (<iframe>) is an HTML element that loads another separate HTML document inside the current one. [cite: 1587, 1588]",
    },
    {
      id: "ih-14",
      question:
        "Which iframe attribute is essential for accessibility, describing the content of the frame?",
      options: ["src", "alt", "title", "name"],
      correctIndex: 2,
      explanation:
        "The title attribute is essential for accessibility, describing the content of the iframe. [cite: 1595]",
    },
    {
      id: "ih-15",
      question:
        "If a user needs to pick a date from a calendar interface natively in the browser, which input type should be used?",
      options: [
        '<input type="calendar">',
        '<input type="datetime">',
        '<input type="date">',
        '<input type="time">',
      ],
      correctIndex: 2,
      explanation:
        'The <input type="date"> element provides a date picker interface in supported browsers. [cite: 1543]',
    },
    {
      id: "ih-16",
      question:
        "Which form element is used alongside `<select>` to define the individual selectable items in a dropdown list?",
      options: ["<list>", "<option>", "<item>", "<li>"],
      correctIndex: 1,
      explanation:
        "The <select> and <option> elements are used together; <select> creates the menu, and <option> defines each selectable item. [cite: 1550]",
    },
    {
      id: "ih-17",
      question:
        'How does the `<input type="email">` behave specifically on mobile devices?',
      options: [
        "It automatically sends an email.",
        "It hides the user's input with dots.",
        "It brings up an email-specific keyboard (with an @ symbol).",
        "It validates against an external DNS server.",
      ],
      correctIndex: 2,
      explanation:
        'The <input type="email"> is optimized for email addresses, and on mobile, it brings up an email-specific keyboard. [cite: 1538]',
    },
    {
      id: "ih-18",
      question:
        'If a form uses `method="GET"`, where is the form data appended when submitted?',
      options: [
        "In the HTTP request body.",
        "To the URL, making it visible in the address bar.",
        "In a local cookie.",
        "In the server's database automatically.",
      ],
      correctIndex: 1,
      explanation:
        "The GET method appends form data to the URL, making it visible in the address bar, and is used for retrieving data. [cite: 1531, 1532]",
    },
    {
      id: "ih-19",
      question:
        "Which audio attribute is generally discouraged because it harms user experience by playing sound immediately?",
      options: ["loop", "controls", "autoplay", "muted"],
      correctIndex: 2,
      explanation:
        "The autoplay attribute starts playing immediately and is generally discouraged for user experience. [cite: 1573]",
    },
    {
      id: "ih-20",
      question:
        "Why might you include multiple `<source>` tags within an `<audio>` or `<video>` element?",
      options: [
        "To play multiple media files simultaneously.",
        "To create a playlist that plays sequentially.",
        "To provide fallback formats (like .mp4 and .webm) for maximum cross-browser compatibility.",
        "To increase the video resolution.",
      ],
      correctIndex: 2,
      explanation:
        "Multiple <source> tags are used to fall back on different media formats for maximum cross-browser compatibility. [cite: 1571, 1572]",
    },
    {
      id: "ih-21",
      question: "The `<nav>` element should be used for:",
      options: [
        "Every single link on the page.",
        "Only major navigational blocks.",
        "The breadcrumbs only.",
        "The logo image.",
      ],
      correctIndex: 1,
      explanation:
        "The <nav> element represents a section for navigation links, but not all groups of links should be wrapped in it—only major navigational blocks. [cite: 1515, 1516]",
    },
    {
      id: "ih-22",
      question:
        "Which boolean attribute forces a user to fill out a field before the form can be submitted?",
      options: ["validate", "mandatory", "required", "strict"],
      correctIndex: 2,
      explanation:
        "The 'required' boolean attribute indicates that the user must fill out the field before submitting. [cite: 1556]",
    },
    {
      id: "ih-23",
      question:
        "What represents introductory content or a set of navigational links, often containing a logo?",
      options: ["<head>", "<header>", "<title>", "<section>"],
      correctIndex: 1,
      explanation:
        "The <header> element represents introductory content or navigational links, often containing a logo or search form. [cite: 1513, 1514]",
    },
    {
      id: "ih-24",
      question:
        "Which `<input>` type restricts user input to numeric values and often features up/down spinner arrows?",
      options: [
        '<input type="digit">',
        '<input type="number">',
        '<input type="integer">',
        '<input type="math">',
      ],
      correctIndex: 1,
      explanation:
        'The <input type="number"> restricts input to numeric values and often features up/down spinner arrows. [cite: 1539]',
    },
    {
      id: "ih-25",
      question:
        "To prevent an iframe video from overtaking the screen, which attribute should you omit?",
      options: ["src", "width", "allowfullscreen", "title"],
      correctIndex: 2,
      explanation:
        "The 'allowfullscreen' attribute is used to allow the iframe content to take over the screen. [cite: 1596]",
    },
  ],
};
