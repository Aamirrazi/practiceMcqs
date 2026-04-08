window.TestBank.push({
  id: "pw_basics",
  title: "Playwright Core Concepts",
  topic: "playwright",
  level: "Intermediate",
  questions: [
    {
      s: "An input field's ID attribute changes randomly on every page reload...",
      q: "Which Playwright locator is the most resilient approach to select this input?",
      o: [
        "A) page.locator('input[type=\"email\"]')",
        "B) page.getByLabel('Email Address')",
        "C) page.locator('//form/div/input[1]')",
        "D) page.locator('#email_field_9876')",
      ],
      a: 1,
      e: "Playwright recommends semantic, user-facing locators like getByLabel over CSS or XPath for maximum stability.",
    },
    // Add more questions here...
  ],
});
