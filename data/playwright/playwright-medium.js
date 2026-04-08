const PlaywrightMediumTest = {
  meta: {
    id: "playwright-medium-1",
    testTitle: "Playwright Core Concepts (Part 1)",
    topic: "playwright",
    topicLabel: "Playwright Basics",
    difficulty: "Medium",
    questionCount: 20,
    estimatedMinutes: 25,
    description:
      "Tests core understanding of Playwright architecture, fixtures, basic locators, and test execution.",
    icon: "🎭",
  },
  questions: [
    {
      id: "pm-01",
      question:
        "Which communication protocol does Playwright use to communicate with Chromium browsers?",
      options: [
        "WebDriver Protocol",
        "DevTools Protocol (CDP)",
        "REST API",
        "W3C standard protocol",
      ],
      correctIndex: 1,
      explanation:
        "Playwright's architecture uses a client-server model where it communicates with the Chromium browser process via the DevTools Protocol (CDP). [cite: 65]",
    },
    {
      id: "pm-02",
      question: "By default, how does Playwright execute tests?",
      options: [
        "Sequentially, one file at a time.",
        "In parallel, for fast execution.",
        "Headless mode is disabled by default.",
        "Through a cloud provider.",
      ],
      correctIndex: 1,
      explanation:
        "A key feature of Playwright is parallelism, meaning tests run in parallel by default to ensure fast execution. [cite: 62]",
    },
    {
      id: "pm-03",
      scenario:
        "You are setting up a new Playwright project and deciding on a testing framework to use alongside it.",
      question:
        "Which of the following testing frameworks is required to run Playwright tests?",
      options: [
        "Mocha",
        "Jest",
        "Jasmine",
        "None. Playwright ships with its own test runner.",
      ],
      correctIndex: 3,
      explanation:
        "Playwright ships with its own built-in test runner called @playwright/test, meaning you do NOT need Jest, Mocha, or any other framework. [cite: 124, 125]",
    },
    {
      id: "pm-04",
      code: "test('example test', async ({ page }) => {\n  await page.goto('https://example.com');\n});",
      question: "What does the `page` fixture represent in this test?",
      options: [
        "A shared browser tab used across all tests in the file.",
        "A brand-new, isolated Page object specifically for this test.",
        "An API request context.",
        "The underlying browser driver.",
      ],
      correctIndex: 1,
      explanation:
        "The `page` fixture provides a brand-new Page object automatically for each test, making it the most commonly used fixture. [cite: 161, 162]",
    },
    {
      id: "pm-05",
      question:
        "Which command runs your Playwright tests in an interactive mode that allows you to time-travel through test steps?",
      options: [
        "npx playwright test --debug",
        "npx playwright test --headed",
        "npx playwright test --ui",
        "npx playwright show-trace",
      ],
      correctIndex: 2,
      explanation:
        "Running tests with the `--ui` flag launches an interactive UI mode that shows real-time results and lets you time-travel through test steps. [cite: 143, 298]",
    },
    {
      id: "pm-06",
      scenario:
        "You have a test that intermittently fails because an element hasn't fully loaded in the DOM before Playwright tries to click it.",
      question:
        "How should you handle this according to Playwright's core design?",
      options: [
        "Use hardcoded `page.waitForTimeout(5000)` before the click.",
        "Rely on Playwright's auto-wait feature, which waits for elements to be ready automatically.",
        "Write a custom explicit wait using a while loop.",
        "Use the deprecated WebDriver wait statements.",
      ],
      correctIndex: 1,
      explanation:
        "Playwright features auto-wait, which means it automatically waits for elements to be ready before performing actions on them. [cite: 55]",
    },
    {
      id: "pm-07",
      question:
        "According to Playwright's best practices, which locator strategy is the MOST recommended for accessible and stable tests?",
      options: ["getByRole", "getByTestId", "getByText", "XPath"],
      correctIndex: 0,
      explanation:
        "Playwright recommends `getByRole` as the most preferred locator because it matches how screen readers see the page, finding accessible elements like buttons and links. [cite: 363, 364, 442]",
    },
    {
      id: "pm-08",
      code: "await page.locator('button').click({ button: 'right' });",
      question: "What action does this specific code snippet perform?",
      options: [
        "Clicks the button aligned to the right side of the page.",
        "Performs a right-click on the targeted button.",
        "Double-clicks the button.",
        "Forces a click on a hidden right button.",
      ],
      correctIndex: 1,
      explanation:
        "Passing `{ button: 'right' }` to the interaction method performs a right-click action on the element. [cite: 317]",
    },
    {
      id: "pm-09",
      question:
        "Which of the following describes the difference between `page.fill()` and `page.type()`?",
      options: [
        "`page.type()` simulates human-like typing with an optional delay, while `page.fill()` sets the value immediately.",
        "`page.fill()` requires an XPath, while `page.type()` requires a CSS selector.",
        "`page.fill()` is for dropdowns, `page.type()` is for text boxes.",
        "There is no difference; they are aliases for the same function.",
      ],
      correctIndex: 0,
      explanation:
        "The `page.fill()` method is generally used to fill inputs quickly, while `page.type()` simulates human-like typing, which can include a delay parameter (e.g., `{ delay: 100 }`). [cite: 318, 319, 320]",
    },
    {
      id: "pm-10",
      scenario:
        "You need to select 'India' from a dropdown menu that has the HTML id 'country'.",
      question: "Which Playwright method correctly selects this option?",
      options: [
        "await page.click('#country', 'IN');",
        "await page.choose('#country', 'IN');",
        "await page.selectOption('#country', 'IN');",
        "await page.fill('#country', 'IN');",
      ],
      correctIndex: 2,
      explanation:
        "The `page.selectOption()` method is specifically designed for interacting with dropdowns and select elements. [cite: 328, 329]",
    },
    {
      id: "pm-11",
      question: "What is the purpose of the `browser` fixture?",
      options: [
        "To make HTTP API requests.",
        "To access the raw Browser object, allowing you to create custom contexts or pages manually.",
        "To automatically clear cookies after every test.",
        "To provide a single page for the test.",
      ],
      correctIndex: 1,
      explanation:
        "The `browser` fixture provides access to the raw Browser instance, which is used to manually create custom contexts and pages. [cite: 160, 167]",
    },
    {
      id: "pm-12",
      question:
        "Which configuration block allows you to run the same tests across Chromium, Firefox, and WebKit automatically?",
      options: [
        "The `use` object in `playwright.config.ts`.",
        "The `projects` array in `playwright.config.ts`.",
        "The `fullyParallel` flag in `playwright.config.ts`.",
        "The test execution command `--all-browsers`.",
      ],
      correctIndex: 1,
      explanation:
        "The `projects` array in the configuration file lets you define and run the same tests across multiple browsers automatically. [cite: 115, 120]",
    },
    {
      id: "pm-13",
      code: "await expect(page).toHaveURL(/.*intro/);",
      question: "What does this assertion check?",
      options: [
        "That the page contains a text element matching 'intro'.",
        "That the current URL of the page matches the provided regular expression.",
        "That the page title contains 'intro'.",
        "That an HTTP request was sent to an 'intro' endpoint.",
      ],
      correctIndex: 1,
      explanation:
        "The `toHaveURL` assertion checks if the current page URL matches a specific string or regular expression pattern. [cite: 210, 224]",
    },
    {
      id: "pm-14",
      question:
        "You want to find an element that contains an exact placeholder text. Which locator method is best?",
      options: [
        "page.getByPlaceholder('...')",
        "page.getByText('...')",
        "page.getByRole('textbox')",
        "page.getByLabel('...')",
      ],
      correctIndex: 0,
      explanation:
        "The `page.getByPlaceholder()` method is specifically designed to locate input elements by their placeholder text. [cite: 366, 367]",
    },
    {
      id: "pm-15",
      scenario:
        "You have a test that should only execute when running against the Firefox browser due to a specific bug.",
      question:
        "How can you conditionally skip this test in Chromium and WebKit?",
      options: [
        "Wrap the test inside an `if(browserName === 'firefox')` block.",
        "Use `test.skip(browserName !== 'firefox', 'Only runs on Firefox');` inside the test.",
        "Delete the Chromium and WebKit project configurations.",
        "Use `test.only()` and run it manually.",
      ],
      correctIndex: 1,
      explanation:
        "You can skip tests conditionally by using `test.skip()` and passing a boolean condition based on the `browserName` fixture. [cite: 250, 252]",
    },
    {
      id: "pm-16",
      question:
        "Which CSS selector targets an element that has an attribute starting with 'https'?",
      options: [
        "[href*='https']",
        "[href^='https']",
        "[href$='https']",
        "[href='https']",
      ],
      correctIndex: 1,
      explanation:
        "The CSS selector syntax `[attr^='val']` is used to select elements where the attribute starts with the specified value. [cite: 383]",
    },
    {
      id: "pm-17",
      question:
        "Which of the following is an advantage of Locator API over traditional string selectors?",
      options: [
        "Locators are evaluated synchronously immediately upon declaration.",
        "Locators are strict and throw errors if more than one element matches.",
        "Locators are lazy, auto-waiting, and auto-retrying.",
        "Locators cannot use XPath.",
      ],
      correctIndex: 2,
      explanation:
        "Playwright's Locators are lazy (they don't search the DOM immediately upon creation), auto-waiting, and auto-retrying, making tests far more stable. [cite: 361]",
    },
    {
      id: "pm-18",
      code: "test.afterEach(async ({ page }) => {\n  await page.close();\n});",
      question: "When does the code inside `test.afterEach` execute?",
      options: [
        "Once, after all the tests in the file have completed.",
        "After every single test within the specific test suite or file finishes.",
        "Only when a test fails.",
        "Before every test begins.",
      ],
      correctIndex: 1,
      explanation:
        "The `test.afterEach` hook runs immediately after EACH test completes, which is useful for cleanup tasks. [cite: 132, 133, 233, 234]",
    },
    {
      id: "pm-19",
      question:
        "How do you instruct Playwright to run tests only matching a specific tag, like '@smoke'?",
      options: [
        "npx playwright test --tag @smoke",
        "npx playwright test --grep @smoke",
        "npx playwright test -t @smoke",
        "npx playwright test run @smoke",
      ],
      correctIndex: 1,
      explanation:
        "To run tests with a specific tag, you use the `--grep` command line flag followed by the tag name, for example: `npx playwright test --grep @smoke`. [cite: 267, 280]",
    },
    {
      id: "pm-20",
      question: "What is a Trace Viewer in Playwright used for?",
      options: [
        "Auto-generating test scripts from browser clicks.",
        "Viewing a rich debugging report that includes screenshots, DOM snapshots, and network logs.",
        "Emulating mobile device geolocation.",
        "Managing parallel test execution queues.",
      ],
      correctIndex: 1,
      explanation:
        "The Trace Viewer is a powerful debugging tool that captures and displays DOM snapshots, network requests, console logs, and screenshots to help troubleshoot CI failures. [cite: 60, 61, 356]",
    },
  ],
};
