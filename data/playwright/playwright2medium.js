const PlaywrightPart2Medium = {
  meta: {
    id: "playwright-p2-medium",
    testTitle: "Playwright Advanced - Part 2 (Medium)",
    topic: "playwright",
    topicLabel: "Advanced Basics",
    difficulty: "Medium",
    questionCount: 20,
    estimatedMinutes: 25,
    description:
      "Tests knowledge on getBy methods, form controls, soft assertions, and basic dialog handling.",
    icon: "🎭",
  },
  questions: [
    {
      id: "p2m-01",
      question:
        "Which locator method is considered the most stable for automation because it relies on a specific HTML attribute?",
      options: ["getByRole()", "getByTestId()", "getByText()", "getByLabel()"],
      correctIndex: 1,
      explanation:
        "The getByTestId() method finds elements by their data-testid attribute and is considered the most stable option for automation.",
    },
    {
      id: "p2m-02",
      question:
        "Before performing an action like clicking, Playwright's auto-wait feature ensures an element meets several actionability checks. Which of the following is NOT one of those checks?",
      options: [
        "The element must be visible.",
        "The element must have a defined CSS id.",
        "The element must be stable (not animating).",
        "The element must be enabled.",
      ],
      correctIndex: 1,
      explanation:
        "Playwright automatically waits for an element to be Visible, Stable, capable of Receiving Events, and Enabled (or Editable for filling). Having a CSS id is not a requirement.",
    },
    {
      id: "p2m-03",
      scenario:
        "You are validating a large form and want to check multiple fields. If one field validation fails, you want the test to continue and report all failures at the end.",
      question: "Which Playwright feature should you use?",
      options: [
        "Hard assertions",
        "try...catch blocks",
        "Soft assertions using expect.soft()",
        "Explicit waits",
      ],
      correctIndex: 2,
      explanation:
        "Soft assertions collect all failures and report them at the end; the test continues even after a failure.",
    },
    {
      id: "p2m-04",
      code: "await page.getByLabel('Country').selectOption({ label: 'India' });",
      question: "What does this code snippet achieve?",
      options: [
        "Types 'India' into a country text box.",
        "Selects the option with the visible text 'India' from a native HTML select element.",
        "Clicks a div that contains the text 'India'.",
        "Validates that the dropdown contains 'India'.",
      ],
      correctIndex: 1,
      explanation:
        "For a native HTML select element, selectOption() allows you to select an option by its visible text, value attribute, or index.",
    },
    {
      id: "p2m-05",
      question:
        "What is the simplest method provided by Playwright to perform a drag-and-drop action between two locators?",
      options: [
        "await source.dragTo(target);",
        "await page.mouse.drag(source, target);",
        "await page.dispatchEvent('dragdrop');",
        "await source.moveTo(target);",
      ],
      correctIndex: 0,
      explanation:
        "The dragTo() method is the simplest approach for dragging an element to a target location.",
    },
    {
      id: "p2m-06",
      question:
        "How do you correctly locate an iframe by its CSS selector in Playwright to interact with elements inside it?",
      options: [
        "page.locator('iframe').switchTo()",
        "page.frameLocator('#payment-iframe')",
        "page.getByRole('iframe')",
        "page.switchToFrame('#payment-iframe')",
      ],
      correctIndex: 1,
      explanation:
        "You use page.frameLocator() and pass the selector (or name/URL) to interact with elements inside an iframe.",
    },
    {
      id: "p2m-07",
      scenario:
        "A webpage triggers a JavaScript alert popup when a button is clicked.",
      question:
        "How does Playwright handle JavaScript dialogs like alerts, confirms, and prompts?",
      options: [
        "They are handled automatically by default without any code.",
        "They are handled via the 'dialog' event listener.",
        "You must switch windows to interact with them.",
        "You must use a CSS selector to find the OK button.",
      ],
      correctIndex: 1,
      explanation:
        "JavaScript dialogs (alert, confirm, prompt) are handled via the 'dialog' event in Playwright.",
    },
    {
      id: "p2m-08",
      question:
        'What is the standard method used to upload a file to an <input type="file"> element?',
      options: [
        "await page.uploadFile()",
        "await page.getByLabel('Upload File').setInputFiles()",
        "await page.attachFile()",
        "await page.keyboard.type('path/to/file')",
      ],
      correctIndex: 1,
      explanation:
        "The setInputFiles() method is used on a file input element to upload single or multiple files.",
    },
    {
      id: "p2m-09",
      question:
        "What is considered the #1 enemy of reliable test automation that causes tests to pass and fail without code changes?",
      options: [
        "Soft assertions",
        "Flaky tests",
        "Page Object Models",
        "Data-Driven Testing",
      ],
      correctIndex: 1,
      explanation:
        "Flaky tests are tests that sometimes pass and sometimes fail without any code change, making them the #1 enemy of reliable test automation.",
    },
    {
      id: "p2m-10",
      code: "await input.pressSequentially('Hello', { delay: 80 });",
      question: "What behavior does this code simulate?",
      options: [
        "It pastes the word 'Hello' instantly.",
        "It waits 80 seconds before typing.",
        "It types the text character by character, simulating real human typing.",
        "It clears the field before typing 'Hello'.",
      ],
      correctIndex: 2,
      explanation:
        "The pressSequentially() method with a delay option types text character by character to simulate real typing.",
    },
    {
      id: "p2m-11",
      question:
        "Which of the following is the correct syntax for a soft assertion checking if a link is visible?",
      options: [
        "await expect(page.getByRole('link')).toBeVisible({ soft: true });",
        "await expect.soft(page.getByRole('link')).toBeVisible();",
        "await softExpect(page.getByRole('link')).toBeVisible();",
        "await page.getByRole('link').assertVisible({ soft: true });",
      ],
      correctIndex: 1,
      explanation:
        "The correct syntax for a soft assertion is expect.soft(locator).method().",
    },
    {
      id: "p2m-12",
      scenario:
        "You need to simulate a user holding down the 'Shift' key while clicking an item.",
      question: "How can you perform this specific mouse action?",
      options: [
        "await page.getByText('Item').click({ modifiers: ['Shift'] });",
        "await page.keyboard.press('Shift'); await page.click('Item');",
        "await page.mouse.shiftClick('Item');",
        "await page.getByText('Item').click({ key: 'Shift' });",
      ],
      correctIndex: 0,
      explanation:
        "You can execute a click with modifiers by passing an options object: { modifiers: ['Shift'] } to the click method.",
    },
    {
      id: "p2m-13",
      question:
        "If you want to check the state of a checkbox without throwing an assertion error, which method should you use to retrieve its state?",
      options: [
        "await expect(cb).toBeChecked();",
        "await cb.getChecked();",
        "await cb.isChecked();",
        "await cb.getAttribute('checked');",
      ],
      correctIndex: 2,
      explanation:
        "The isChecked() method is used to read the state of a checkbox or radio button, returning a boolean.",
    },
    {
      id: "p2m-14",
      scenario: "Clicking a link opens a brand new browser tab.",
      question:
        "Which Playwright method is recommended to capture and interact with this new page?",
      options: [
        "page.switchToTab(2)",
        "context.waitForEvent('page')",
        "browser.newTab()",
        "page.on('new_tab')",
      ],
      correctIndex: 1,
      explanation:
        "Playwright provides the context.waitForEvent('page') method to capture a new page when a click opens a new tab or window.",
    },
    {
      id: "p2m-15",
      code: "page.on('dialog', async dialog => {\n  await dialog.accept();\n});",
      question: "What does `dialog.accept()` do when an alert pops up?",
      options: [
        "It dismisses the alert.",
        "It clicks the OK / Yes button on the dialog.",
        "It throws an error.",
        "It returns the text of the alert.",
      ],
      correctIndex: 1,
      explanation:
        "Calling dialog.accept() clicks the OK or Yes button to accept the dialog popup.",
    },
    {
      id: "p2m-16",
      question:
        "After waiting for a download event, which method is used to specify exactly where the file should be saved locally?",
      options: [
        "download.saveTo()",
        "download.export()",
        "download.saveAs(path)",
        "download.move()",
      ],
      correctIndex: 2,
      explanation:
        "Once the download event is captured, you use download.saveAs(path) to save it to a specific local path.",
    },
    {
      id: "p2m-17",
      question: "What is the primary benefit of Data-Driven Testing (DDT)?",
      options: [
        "It speeds up browser execution by caching assets.",
        "It separates test logic from test data, allowing you to run hundreds of scenarios with minimal code duplication.",
        "It automatically generates test scripts using codegen.",
        "It mocks API responses.",
      ],
      correctIndex: 1,
      explanation:
        "DDT separates test logic from test data, reducing code duplication and allowing you to run hundreds of scenarios with multiple sets of input data.",
    },
    {
      id: "p2m-18",
      question: "What is the Page Object Model (POM) in Playwright?",
      options: [
        "A network interception library.",
        "A design pattern that creates an abstraction layer between tests and the UI locators/actions.",
        "A built-in reporter for Playwright.",
        "A method for storing passwords securely.",
      ],
      correctIndex: 1,
      explanation:
        "The Page Object Model (POM) is a design pattern that creates an abstraction layer between your tests and the UI by encapsulating locators and actions.",
    },
    {
      id: "p2m-19",
      question: "Which keyboard action simulates a 'Copy' command (Ctrl+C)?",
      options: [
        "await page.keyboard.press('Control+C');",
        "await page.keyboard.copy();",
        "await page.mouse.copy();",
        "await page.keyboard.type('Ctrl+C');",
      ],
      correctIndex: 0,
      explanation:
        "You simulate a copy action using key combinations with the press method: page.keyboard.press('Control+C').",
    },
    {
      id: "p2m-20",
      question:
        "Which method checks if an element is currently visible on the screen and returns a boolean value?",
      options: [
        "await btn.checkVisible();",
        "await btn.isVisible();",
        "await btn.display();",
        "await expect(btn).visible();",
      ],
      correctIndex: 1,
      explanation:
        "The isVisible() method is an element control used to check visibility, returning a boolean value.",
    },
  ],
};
