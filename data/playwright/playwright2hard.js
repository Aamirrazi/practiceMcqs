const PlaywrightPart2Hard = {
  meta: {
    id: "playwright-p2-hard",
    testTitle: "Playwright Advanced - Part 2 (Hard)",
    topic: "playwright",
    topicLabel: "Architect & Edge Cases",
    difficulty: "Hard",
    questionCount: 20,
    estimatedMinutes: 30,
    description:
      "Evaluates complex DDT integrations, nested iFrames, custom validations, and advanced POM implementations.",
    icon: "🔥",
  },
  questions: [
    {
      id: "p2h-01",
      code: "const target = items.filter({ hasText: 'Product A' });",
      question:
        "When dealing with a list of elements, what does the `filter` method do in this context?",
      options: [
        "It deletes all elements except 'Product A' from the DOM.",
        "It narrows down a locator's matching results to only include elements that contain the specified text.",
        "It prevents 'Product A' from being clicked.",
        "It retrieves the text content of 'Product A'.",
      ],
      correctIndex: 1,
      explanation:
        "The filter() method is used to narrow down locator results, such as filtering a list to find an element containing specific text[cite: 505, 603].",
    },
    {
      id: "p2h-02",
      question:
        "If you need to extract the `value` attributes from multiple options in a dropdown simultaneously, which approach is correct?",
      options: [
        "const values = await page.getByRole('option').allValues();",
        "const values = await page.getByRole('option').evaluateAll(els => els.map(el => el.value));",
        "const values = await page.getByRole('option').getText();",
        "const values = await page.map('option');",
      ],
      correctIndex: 1,
      explanation:
        "To extract properties from multiple matched elements at once, you use evaluateAll to run JavaScript in the browser context across all matches[cite: 600].",
    },
    {
      id: "p2h-03",
      scenario:
        "You are testing a dashboard where an item count updates asynchronously based on a backend job. You want to repeatedly check the count until it equals 5, failing only if a timeout is reached.",
      question: "Which mechanism is best suited for this?",
      options: [
        "A standard while loop with `page.waitForTimeout`.",
        "expect.soft()",
        "expect.poll()",
        "page.waitForLoadState('networkidle')",
      ],
      correctIndex: 2,
      explanation:
        "The expect.poll() mechanism is used to poll a function repeatedly until a condition is true or the timeout expires, perfect for asynchronous backend updates[cite: 660, 661].",
    },
    {
      id: "p2h-04",
      code: "expect.extend({\n  async toBeWithinRange(received: number, floor: number, ceiling: number) { ... }\n});",
      question: `What is the purpose of \`expect.extend\` in Playwright?`,
      options: [
        "To extend the test execution timeout.",
        "To add a custom validation method to the expect assertion library.",
        "To inherit properties from a Page Object Model.",
        "To override the default reporting mechanism.",
      ],
      correctIndex: 1,
      explanation:
        "You can create custom validations and add them to Playwright's assertion library by using expect.extend()[cite: 688].",
    },
    {
      id: "p2h-05",
      scenario:
        "You are testing a complex web canvas that uses a custom Drag & Drop library, and standard `dragTo()` is failing.",
      question:
        "How can you manually simulate a drag and drop using coordinates?",
      options: [
        "By utilizing `boundingBox()` to get element coordinates and executing `mouse.move()`, `mouse.down()`, and `mouse.up()` sequentially.",
        "By injecting a custom jQuery script via `page.evaluate`.",
        "By using the `keyboard.press('Drag')` command.",
        "Custom libraries cannot be automated by Playwright.",
      ],
      correctIndex: 0,
      explanation:
        "For complex D&D libraries, you can simulate the action manually by getting the boundingBox() of the elements and issuing raw mouse events (move, down, up)[cite: 776, 777, 782, 785].",
    },
    {
      id: "p2h-06",
      scenario:
        "You are interacting with a custom React-based dropdown that consists of `<div>` and `<ul>` elements, not a native `<select>` tag.",
      question:
        "What is the typical sequence of actions required to select an option in this custom dropdown?",
      options: [
        "Use `page.selectOption()` directly on the wrapper div.",
        "Click the dropdown trigger, wait for the listbox options to become visible, then click the desired option.",
        "Type the desired option into the hidden input field.",
        "Evaluate a JavaScript function to change the DOM value.",
      ],
      correctIndex: 1,
      explanation:
        "For custom div/ul dropdowns, you must first click the trigger to open it, wait for the options to appear, and then click the desired option[cite: 861, 863, 865].",
    },
    {
      id: "p2h-07",
      code: "const outerFrame = page.frameLocator('#outer');\nconst innerFrame = outerFrame.frameLocator('#inner');\nawait innerFrame.getByRole('button').click();",
      question: "What Playwright concept does this code demonstrate?",
      options: [
        "Handling multiple browser windows.",
        "Chaining frameLocator calls to interact with elements inside nested iFrames.",
        "Bypassing cross-origin resource sharing (CORS).",
        "Mocking iframe network requests.",
      ],
      correctIndex: 1,
      explanation:
        "This code demonstrates handling nested frames by chaining frameLocator() calls to reach elements deep inside child iFrames[cite: 948, 949].",
    },
    {
      id: "p2h-08",
      question:
        "When intercepting a `prompt` dialog, how can you retrieve the pre-filled text that the browser displays in the input field?",
      options: [
        "dialog.message()",
        "dialog.text()",
        "dialog.defaultValue()",
        "dialog.input()",
      ],
      correctIndex: 2,
      explanation:
        "When handling a prompt dialog, you can read the pre-filled text by calling dialog.defaultValue()[cite: 996].",
    },
    {
      id: "p2h-09",
      question:
        "If your test clicks a button that requests browser notification permissions, how do you prevent the browser popup from blocking your test execution?",
      options: [
        "Click 'Accept' using `page.getByRole('dialog')`.",
        "Use `await page.context().grantPermissions(['notifications'])` before the page loads.",
        "Disable JavaScript in the browser context.",
        "Use `page.on('notification')` to dismiss it.",
      ],
      correctIndex: 1,
      explanation:
        "You can handle and bypass permission popups by explicitly granting the necessary permissions at the context level using grantPermissions() before the test runs[cite: 1009].",
    },
    {
      id: "p2h-10",
      scenario:
        'A file upload button does not use an `<input type="file">` tag directly. Instead, clicking the button triggers the OS-level file explorer.',
      question: "How do you handle this upload pattern in Playwright?",
      options: [
        "Use `page.keyboard.type()` to type the file path blindly.",
        "Set up a `Promise.all` block to wait for the 'filechooser' event while clicking the button, then call `setFiles()` on the resulting chooser object.",
        "It cannot be handled; OS level dialogs are strictly blocked by Playwright.",
        "Drag and drop the file from the local file system into the browser window.",
      ],
      correctIndex: 1,
      explanation:
        "For custom upload buttons that trigger OS dialogs, you wait for the 'filechooser' event alongside the click, and then use fileChooser.setFiles()[cite: 1055, 1056, 1060].",
    },
    {
      id: "p2h-11",
      code: "const content = fs.readFileSync(savePath, 'utf-8');\nexpect(content).toContain('Name, Email, Date');",
      question: "What is this code accomplishing?",
      options: [
        "Mocking a network response with fake CSV data.",
        "Reading a downloaded file from the local file system to validate its contents using the Node.js `fs` module.",
        "Writing test results to a CSV report.",
        "Injecting a script into the page DOM.",
      ],
      correctIndex: 1,
      explanation:
        "This code uses the native Node.js fs module (readFileSync) to read a downloaded file from the disk and validate its contents against expected text[cite: 1125, 1126, 1127].",
    },
    {
      id: "p2h-12",
      question:
        "When performing Data-Driven Testing using an Excel file, which external library is recommended in the study guide to parse the file into a JSON array?",
      options: [
        "csv-parser",
        "exceljs",
        "xlsx (XLSX.utils.sheet_to_json)",
        "playwright-excel",
      ],
      correctIndex: 2,
      explanation:
        "The study guide recommends using the xlsx package and its XLSX.utils.sheet_to_json method to read Excel data and convert it to an array of objects[cite: 1195, 1204].",
    },
    {
      id: "p2h-13",
      code: "const ENV = process.env.TEST_ENV || 'staging';\nawait page.goto(BASE_URLS[ENV]);",
      question:
        "How do you trigger this parameterised script to run against the production environment from the command line?",
      options: [
        "npx playwright test --env=prod",
        "TEST_ENV=prod npx playwright test",
        "npx playwright test -p prod",
        "npx playwright test prod",
      ],
      correctIndex: 1,
      explanation:
        "When using environment variables for parameterisation, you pass the variable in the command line before the execution command: TEST_ENV=prod npx playwright test[cite: 1233, 1243].",
    },
    {
      id: "p2h-14",
      scenario:
        "You have created multiple Page Objects (LoginPage, DashboardPage). You want to inject them directly into your test functions like `test('my test', async ({ loginPage }) => {...})`.",
      question: "What is the Playwright mechanism used to achieve this?",
      options: [
        "Global setup scripts.",
        "Creating custom fixtures by extending the base test object (`test = base.extend<Pages>`).",
        "Importing the classes directly and using `new LoginPage()` inside every `beforeEach` hook.",
        "Adding them to `playwright.config.ts`.",
      ],
      correctIndex: 1,
      explanation:
        "The gold standard for POM integration is creating custom fixtures by extending the base test object, which automatically instantiates and provides the page objects to the tests[cite: 1333, 1340, 1392].",
    },
    {
      id: "p2h-15",
      question:
        "If an element is strictly disabled but you need to bypass Playwright's actionability checks to force a click (perhaps for a negative testing scenario), how do you do it?",
      options: [
        "await btn.click({ force: true });",
        "await btn.forceClick();",
        "await btn.click({ bypass: true });",
        "You must use `page.evaluate()`.",
      ],
      correctIndex: 0,
      explanation:
        "You can bypass the built-in actionability checks (like checking if an element is disabled) by using { force: true } inside the click method[cite: 585, 586].",
    },
    {
      id: "p2h-16",
      code: "const [response] = await Promise.all([\n  page.waitForResponse('**/api/users'),\n  page.getByRole('button', { name: 'Load Users' }).click(),\n]);",
      question:
        "Why is `Promise.all` critical when waiting for network responses based on a UI click?",
      options: [
        "It speeds up the test execution.",
        "It prevents a race condition by setting up the listener *before* the click action triggers the request.",
        "It automatically asserts that the response status is 200 OK.",
        "It suppresses console errors.",
      ],
      correctIndex: 1,
      explanation:
        "Using Promise.all sets up the wait listener (waitForResponse) simultaneously with the action (click), preventing race conditions where the response happens before the listener is ready[cite: 644, 645].",
    },
    {
      id: "p2h-17",
      question:
        "How do you select multiple options in a native HTML `<select multiple>` element?",
      options: [
        "Call `selectOption` multiple times consecutively.",
        "Pass an array of values/labels to `selectOption()`.",
        "Hold down 'Control' using keyboard events and click each option.",
        "Use a `for` loop to check checkboxes.",
      ],
      correctIndex: 1,
      explanation:
        "For a multi-select dropdown, you handle multiple selections by passing an array of options directly into selectOption(), for example: selectOption(['Python', 'Java'])[cite: 854, 855].",
    },
    {
      id: "p2h-18",
      scenario:
        "You type into an auto-suggest search box and an asynchronous list of suggestions appears. You want to click the first suggestion.",
      question:
        "What is a crucial synchronization step before attempting to count or click the suggestions?",
      options: [
        "Waiting 5 seconds.",
        "Pressing 'Enter'.",
        "Waiting for the suggestion container (e.g., listbox) to reach a 'visible' state.",
        "Scrolling to the bottom of the page.",
      ],
      correctIndex: 2,
      explanation:
        "When handling auto-suggestions, it is crucial to wait for the suggestion list container to explicitly reach a 'visible' state before trying to interact with the options[cite: 886, 889].",
    },
    {
      id: "p2h-19",
      question:
        "If an element is located far down a page and is heavily obscured by lazy-loaded DOM elements, which specific method forces the browser to scroll until the element is in the viewport?",
      options: [
        "await page.scrollToBottom()",
        "await element.scrollIntoViewIfNeeded()",
        "await page.mouse.wheel(0, 10000)",
        "await element.focus()",
      ],
      correctIndex: 1,
      explanation:
        "The scrollIntoViewIfNeeded() method explicitly scrolls the page until the target locator is inside the visible viewport[cite: 795, 796].",
    },
    {
      id: "p2h-20",
      code: "const isValid = await page.evaluate(() => {\n  const email = document.querySelector('#email');\n  return email.validity.valid;\n});\nexpect(isValid).toBe(true);",
      question: "What Playwright testing technique is being utilized here?",
      options: [
        "Data-Driven Testing.",
        "Soft Assertions.",
        "Executing raw DOM JavaScript in the browser context to perform a custom HTML5 validation check.",
        "Mocking a network request.",
      ],
      correctIndex: 2,
      explanation:
        "The page.evaluate() method is used to execute native JavaScript inside the browser context, allowing you to access DOM properties like HTML5 validity states for custom validations[cite: 705, 706, 709].",
    },
  ],
};
