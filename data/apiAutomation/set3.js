const APISet3 = {
  meta: {
    id: "playwright-api",
    testTitle: "Playwright API Testing",
    topic: "api",
    topicLabel: "Playwright API",
    difficulty: "Advanced",
    questionCount: 20,
    estimatedMinutes: 30,
    description:
      "Tests knowledge on utilizing Playwright's APIRequestContext, making CRUD calls, extracting responses, and advanced expect() assertions.",
    icon: "🎭",
  },
  questions: [
    {
      id: "pa-01",
      question:
        "What is the primary benefit of using Playwright's `APIRequestContext` for API testing?",
      options: [
        "It allows you to bypass server security.",
        "It makes HTTP requests directly without launching a browser, and uses the same `expect()` assertions as UI tests.",
        "It automatically generates Postman collections.",
        "It is the only way to test GraphQL.",
      ],
      correctIndex: 1,
      explanation:
        "APIRequestContext makes HTTP requests directly without launching a browser and is fully integrated with Playwright's assertion library `expect()`.",
    },
    {
      id: "pa-02",
      code: "await request.get('/users', {\n  params: { role: 'admin', active: 'true' }\n});",
      question: "How does Playwright resolve the URL in the snippet above?",
      options: [
        "It sends the params in the JSON body.",
        "It resolves to `/users/admin/true`.",
        "It resolves to `/users?role=admin&active=true`.",
        "It adds them as HTTP headers.",
      ],
      correctIndex: 2,
      explanation:
        "Passing `params` automatically formats them as query parameters in the URL: `/users?role=admin&active=true`.",
    },
    {
      id: "pa-03",
      code: "const response = await request.post('/users', {\n  data: { name: 'Alice', age: 28 }\n});",
      question:
        "When passing the `data` object in a POST request, what does Playwright do automatically?",
      options: [
        "It converts it to XML.",
        "It auto-serializes it into a JSON body and sets the correct Content-Type header.",
        "It sends it as form-data.",
        "It encrypts the payload.",
      ],
      correctIndex: 1,
      explanation:
        "Playwright automatically serializes the `data` object into a JSON body and sets the appropriate headers.",
    },
    {
      id: "pa-04",
      question:
        "If you need to send `application/x-www-form-urlencoded` data (form data) instead of JSON, which property should you use in Playwright?",
      options: ["data:", "json:", "body:", "form:"],
      correctIndex: 3,
      explanation:
        "For form data, Playwright provides the `form:` property (e.g., `form: { field1: 'value' }`).",
    },
    {
      id: "pa-05",
      question: "What does the `response.ok()` method in Playwright return?",
      options: [
        "The string 'OK' if successful.",
        "true if the status code is strictly 200.",
        "true if the HTTP status code is in the 200-299 range.",
        "A JSON representation of the response.",
      ],
      correctIndex: 2,
      explanation:
        "`response.ok()` returns true if the HTTP status is in the success range (200-299).",
    },
    {
      id: "pa-06",
      question:
        "Which Playwright method parses the response body directly into a JavaScript object?",
      options: [
        "response.text()",
        "response.body()",
        "response.parse()",
        "response.json()",
      ],
      correctIndex: 3,
      explanation:
        "`response.json()` parses the response body as JSON and returns a Promise that resolves to an object.",
    },
    {
      id: "pa-07",
      code: "const headers = response.headersArray();",
      question: "What format does `headersArray()` return?",
      options: [
        "A single string of comma-separated headers.",
        "An object with key-value pairs.",
        "An array of { name, value } objects.",
        "A Buffer object.",
      ],
      correctIndex: 2,
      explanation:
        "`response.headersArray()` returns the headers as an array of `{ name, value }` objects.",
    },
    {
      id: "pa-08",
      code: "expect(response.status()).toBeGreaterThanOrEqual(200);\nexpect(response.status()).toBeLessThan(300);",
      question:
        "What is the functional equivalent of the two assertions above?",
      options: [
        "expect(response.json()).toBeTruthy();",
        "expect(response.ok()).toBeTruthy();",
        "expect(response).toBe(200);",
        "expect(response.headers()).toBeDefined();",
      ],
      correctIndex: 1,
      explanation:
        "`response.ok()` internally checks if the status code is >= 200 and < 300, making it the equivalent check.",
    },
    {
      id: "pa-09",
      code: "expect(body.items).toHaveLength(5);",
      question: "What does this assertion specifically validate?",
      options: [
        "That the string 'items' has 5 characters.",
        "That the JSON payload size is 5 bytes.",
        "That the 'items' array inside the response body contains exactly 5 elements.",
        "That the request took 5 milliseconds.",
      ],
      correctIndex: 2,
      explanation:
        "The `toHaveLength(5)` assertion checks the length of an array, verifying that `body.items` contains exactly 5 elements.",
    },
    {
      id: "pa-10",
      code: "expect(body).toHaveProperty('address.city', 'Bangalore');",
      question: "What Playwright testing capability does this demonstrate?",
      options: [
        "Checking response headers.",
        "Validating nested object properties and their specific values simultaneously.",
        "Measuring API latency.",
        "Mocking a database response.",
      ],
      correctIndex: 1,
      explanation:
        "`toHaveProperty('address.city', 'Bangalore')` directly checks a nested property path and its corresponding value.",
    },
    {
      id: "pa-11",
      scenario:
        "You receive a massive JSON response with 50 fields, but you only want to validate that `name` is 'Alice' and `active` is true. You don't care about the other 48 fields.",
      question:
        "Which Playwright assertion is best for validating only a specific subset of properties?",
      options: [
        "expect(body).toEqual({...})",
        "expect(body).toBe({...})",
        "expect(body).toMatchObject({...})",
        "expect(body).toContain({...})",
      ],
      correctIndex: 2,
      explanation:
        "`expect(body).toMatchObject({...})` validates a subset of properties while ignoring extra fields like IDs or timestamps.",
    },
    {
      id: "pa-12",
      question:
        "How does Playwright natively expose the exact 'response time' of an API request?",
      options: [
        "Using `response.responseTime()`",
        "Using `response.time()`",
        "Using `request.duration()`",
        "Playwright does not expose it natively; you must measure it manually using `Date.now()`.",
      ],
      correctIndex: 3,
      explanation:
        "Playwright doesn't expose response time natively. You must measure it manually by comparing `Date.now()` before and after the request.",
    },
    {
      id: "pa-13",
      code: "const response = await request.delete('/users/1');\nexpect(response.status()).toBe(204);",
      question:
        "In this standard REST API test, what does the 204 status represent?",
      options: [
        "The user was not found.",
        "The deletion was successful and there is no content to return.",
        "The deletion was accepted but is pending.",
        "The client lacks authorization.",
      ],
      correctIndex: 1,
      explanation:
        "204 No Content is the expected status code for a successful DELETE operation that does not return a body.",
    },
    {
      id: "pa-14",
      question:
        "If an API returns a raw binary file (like a PDF) rather than text or JSON, which Playwright method should you use to capture the response?",
      options: [
        "response.binary()",
        "response.text()",
        "response.body()",
        "response.stream()",
      ],
      correctIndex: 2,
      explanation:
        "`response.body()` returns the raw body as a Buffer, which is necessary for handling binary data like files.",
    },
    {
      id: "pa-15",
      code: "const apicontext = await request.newContext({\n  baseURL: 'https://api.example.com',\n  extraHTTPHeaders: { 'Authorization': 'Bearer 123' }\n});",
      question:
        "What is the benefit of creating a global `apicontext` like this?",
      options: [
        "It allows you to bypass CORS restrictions.",
        "It automatically writes tests for you.",
        "It sets up a shared base URL and authentication headers that apply to all requests made with this context.",
        "It intercepts UI traffic.",
      ],
      correctIndex: 2,
      explanation:
        "Creating a new RequestContext allows you to define a `baseURL` and `extraHTTPHeaders` once, sharing auth state and config across multiple tests.",
    },
    {
      id: "pa-16",
      question:
        "When writing assertions, what does `expect(typeof body.id).toBe('number');` do?",
      options: [
        "It forces the ID to become a number.",
        "It validates the data type of the 'id' field in the JSON response.",
        "It checks if the ID is strictly equal to the string 'number'.",
        "It measures the length of the ID.",
      ],
      correctIndex: 1,
      explanation:
        "Using `typeof` inside an `expect` block performs type checking, validating that the field is indeed a numeric type.",
    },
    {
      id: "pa-17",
      code: "const response = await request.get(`/users/${userId}`);",
      question:
        "What mechanism is being used here to construct the URL dynamically?",
      options: [
        "Query Strings",
        "Path Parameters via JavaScript template literals",
        "Header Injection",
        "Form Data",
      ],
      correctIndex: 1,
      explanation:
        "This uses JavaScript template literals to inject a dynamic Path Parameter directly into the URL string (e.g., `/users/42`).",
    },
    {
      id: "pa-18",
      question:
        "Which of the following is true about Playwright's `APIRequestContext` relative to E2E browser tests?",
      options: [
        "They cannot be used in the same test suite.",
        "API requests must always launch a headless browser first.",
        "It is ideal for API testing within the same test suite as E2E tests, allowing them to share auth state.",
        "It requires Selenium to function.",
      ],
      correctIndex: 2,
      explanation:
        "It is ideal for API testing within the same test suite as E2E browser tests, sharing auth state and intercepting network traffic seamlessly.",
    },
    {
      id: "pa-19",
      question:
        "In Playwright, what HTTP method function would you call to replace an entire resource on the server?",
      options: [
        "request.post()",
        "request.patch()",
        "request.put()",
        "request.replace()",
      ],
      correctIndex: 2,
      explanation:
        "PUT is the HTTP method used to replace an entire resource, accessed via `request.put()` in Playwright.",
    },
    {
      id: "pa-20",
      code: "expect(headers['x-rate-limit-remaining']).toBeDefined();",
      question: "What does this assertion check?",
      options: [
        "That the rate limit has been exceeded.",
        "That the server responded with exactly 200.",
        "That the response included a specific custom header for rate limiting.",
        "That the header is formatted as JSON.",
      ],
      correctIndex: 2,
      explanation:
        "This checks that a specific custom response header (`x-rate-limit-remaining`) exists and was returned by the server.",
    },
  ],
};
