const APISet4 = {
  meta: {
    id: "api-auth-cicd",
    testTitle: "Auth, Test Data & CI/CD",
    topic: "api",
    topicLabel: "Auth & CI/CD",
    difficulty: "Hard",
    questionCount: 20,
    estimatedMinutes: 30,
    description:
      "Evaluates understanding of advanced authentication (OAuth, Bearer), API chaining, test data strategies, and GitHub Actions CI/CD integration.",
    icon: "🔐",
  },
  questions: [
    {
      id: "ac-01",
      question:
        "What is the core difference between Authentication and Authorization?",
      options: [
        "Authentication uses tokens; Authorization uses passwords.",
        "Authentication verifies who you are; Authorization verifies what you can do.",
        "Authentication is for APIs; Authorization is for UIs.",
        "They mean exactly the same thing.",
      ],
      correctIndex: 1,
      explanation:
        "Authentication verifies who you are (identity); Authorization verifies what you can do (permissions/access).",
    },
    {
      id: "ac-02",
      question:
        "In Basic Authentication, how are the credentials transmitted to the server?",
      options: [
        "As a plain text JSON body.",
        "As a Base64-encoded string (username:password) in the Authorization header.",
        "As an encrypted query parameter.",
        "Via an OAuth 2.0 exchange.",
      ],
      correctIndex: 1,
      explanation:
        "Basic Auth uses credentials (username:password) that are Base64-encoded and sent in the Authorization header.",
    },
    {
      id: "ac-03",
      scenario: "You are testing a Single Page Application (SPA).",
      question:
        "According to modern OAuth 2.0 standards, which flow replaced the deprecated Implicit Grant for SPAs?",
      options: [
        "Client Credentials",
        "Password Grant",
        "PKCE (Authorization Code + Proof Key)",
        "Basic Auth",
      ],
      correctIndex: 2,
      explanation:
        "The Implicit grant is deprecated for SPAs. The modern secure alternative is PKCE (Authorization Code + Proof Key for Code Exchange).",
    },
    {
      id: "ac-04",
      question:
        "Which OAuth 2.0 grant type is designed specifically for Machine-to-Machine (M2M) communication without user context?",
      options: [
        "Authorization Code",
        "Client Credentials",
        "Implicit Grant",
        "Password Grant",
      ],
      correctIndex: 1,
      explanation:
        "Client Credentials grant is used for machine-to-machine (M2M) communication where there is no user context.",
    },
    {
      id: "ac-05",
      scenario: "You are designing an API test that uses API Keys.",
      question:
        "Which method of passing the API Key is considered the MOST secure?",
      options: [
        "Via a query parameter (e.g., `?api_key=123`).",
        "Via the request body.",
        "Via a custom HTTP Header (e.g., `X-API-Key: 123`).",
        "Hardcoding it in the URL path.",
      ],
      correctIndex: 2,
      explanation:
        "Passing API keys via a custom header is the most secure method, whereas query parameters are visible in server logs.",
    },
    {
      id: "ac-06",
      question:
        "What is a primary advantage of using Dynamic Test Data (e.g., `Date.now()`, `faker`) over Static Data?",
      options: [
        "It is always faster to execute.",
        "It is predictable and easy to debug.",
        "It is highly realistic and helps avoid data conflicts in shared environments.",
        "It doesn't require importing external libraries.",
      ],
      correctIndex: 2,
      explanation:
        "Dynamic data (like generating random names or UUIDs) is realistic and avoids data conflicts when running tests repeatedly in shared environments.",
    },
    {
      id: "ac-07",
      code: "const createRes = await request.post('/users', { data: payload });\nconst { id } = await createRes.json();\nconst getRes = await request.get(`/users/${id}`);",
      question: "What API testing concept does the code snippet demonstrate?",
      options: [
        "API Fuzzing",
        "API Chaining (passing data from one response to the next request)",
        "Contract Testing",
        "Basic Authentication",
      ],
      correctIndex: 1,
      explanation:
        "API chaining involves using the response of one API call (extracting the 'id') as input to the next call (fetching the user by 'id').",
    },
    {
      id: "ac-08",
      code: "import users from './test-data/users.json';\nfor (const user of users) {\n  test(`Create user: ${user.name}`, async ({ request }) => { ... });\n}",
      question: "What is the purpose of this looping structure in Playwright?",
      options: [
        "To perform stress testing by hitting the API in a tight loop.",
        "To execute Data-Driven Testing (DDT), automatically generating one test case for every user in the JSON file.",
        "To poll the server until a user is found.",
        "To retry failed tests.",
      ],
      correctIndex: 1,
      explanation:
        "This loop executes Data-Driven Testing by reading an array of objects from an external JSON file and creating an individual test case for each dataset.",
    },
    {
      id: "ac-09",
      question:
        "In the context of CI/CD Best Practices, where should you store sensitive data like API Tokens?",
      options: [
        "In a public `test-data.json` file.",
        "Hardcoded inside `playwright.config.ts`.",
        "In CI/CD Secrets (e.g., GitHub Secrets) and injected as environment variables.",
        "In the URL query parameters.",
      ],
      correctIndex: 2,
      explanation:
        "Best practice: Store sensitive data (tokens, passwords) in CI/CD secrets, never in code, and inject them as environment variables (e.g., `${{ secrets.API_TOKEN }}`).",
    },
    {
      id: "ac-10",
      code: "env:\n  BASE_URL: ${{ secrets.API_BASE_URL }}",
      question:
        "In a GitHub Actions workflow YAML file, what does the `env:` block do?",
      options: [
        "It defines the operating system for the runner.",
        "It triggers the workflow to run.",
        "It makes the specified secrets available as environment variables to the executing test scripts.",
        "It uploads the test artifacts.",
      ],
      correctIndex: 2,
      explanation:
        "The `env:` block maps GitHub secrets to environment variables that Playwright can access via `process.env.BASE_URL`.",
    },
    {
      id: "ac-11",
      question:
        "Which CI/CD practice ensures that broken code does not reach production?",
      options: [
        "Running tests only on the local machine.",
        "Gating deployments—blocking merges to the main branch if API tests fail.",
        "Uploading reports as artifacts.",
        "Running fuzz tests in production.",
      ],
      correctIndex: 1,
      explanation:
        "A best practice is to gate deployments on test pass, which means blocking merges or deployments if API tests fail.",
    },
    {
      id: "ac-12",
      question: "What is a 'Bearer Token'?",
      options: [
        "A base64 encoded username and password.",
        "A cryptographically signed key sent in the URL.",
        "An opaque string or JWT obtained from a login endpoint, sent in the Authorization header to access protected routes.",
        "A session cookie.",
      ],
      correctIndex: 2,
      explanation:
        "A Bearer token (JWT or opaque) is obtained from an auth endpoint and sent in the Authorization header. It is the most common pattern for REST APIs.",
    },
    {
      id: "ac-13",
      code: "uses: actions/upload-artifact@v3\nwith:\n  name: playwright-report\n  path: playwright-report/",
      question: "Why is this step included in the GitHub Actions pipeline?",
      options: [
        "To publish the generated HTML test reports as build artifacts so the team can view them after execution.",
        "To download the Playwright browser binaries.",
        "To encrypt the test results.",
        "To deploy the code to production.",
      ],
      correctIndex: 0,
      explanation:
        "Publishing test reports as build artifacts allows team visibility into test results (like the HTML report) after the CI pipeline finishes.",
    },
    {
      id: "ac-14",
      question:
        "Which OAuth 2.0 grant type is deprecated for new applications because it sends user credentials directly to the client?",
      options: [
        "Authorization Code",
        "PKCE",
        "Implicit Grant",
        "Password Grant",
      ],
      correctIndex: 3,
      explanation:
        "The Password Grant involves sending user credentials directly and is deprecated; it should be avoided in new apps.",
    },
    {
      id: "ac-15",
      code: "baseURL: process.env.BASE_URL || 'https://api.staging.example.com'",
      question:
        "What is the architectural benefit of configuring the `baseURL` this way?",
      options: [
        "It speeds up network requests by skipping DNS resolution.",
        "It enforces the use of HTTPS.",
        "It allows the test suite to seamlessly switch between dev, staging, and production environments by simply changing the environment variable.",
        "It acts as a fallback for offline testing.",
      ],
      correctIndex: 2,
      explanation:
        "Using `process.env.BASE_URL` with a fallback allows you to use separate environment configs (dev, staging, production) effortlessly from the CLI.",
    },
    {
      id: "ac-16",
      question:
        "When should you run a 'full regression' suite of API tests in a CI/CD pipeline according to best practices?",
      options: [
        "On every single commit push.",
        "Only when deploying to production.",
        "On merge to the main branch.",
        "Once a month.",
      ],
      correctIndex: 2,
      explanation:
        "Best practice: Run smoke tests on every push; run full regression on merge to main.",
    },
    {
      id: "ac-17",
      question:
        "In Playwright, what is the correct syntax for a CLI command to run tests against a specific production URL via environment variables?",
      options: [
        "npx playwright test --url=https://api.prod.com",
        "BASE_URL=https://api.prod.com npx playwright test",
        "npx playwright test -e prod",
        "npx playwright test && env=prod",
      ],
      correctIndex: 1,
      explanation:
        "You inject the environment variable in the CLI command before running the runner: `BASE_URL=https://api.prod.com npx playwright test`.",
    },
    {
      id: "ac-18",
      code: "Authorization: Bearer ${process.env.API_TOKEN}",
      question:
        "If `API_TOKEN` is not set in the environment, what will the header string evaluate to in JavaScript?",
      options: [
        "Authorization: Bearer undefined",
        "Authorization: Bearer null",
        "It will throw a SyntaxError.",
        "Authorization: Bearer ",
      ],
      correctIndex: 0,
      explanation:
        "If an environment variable is missing, `process.env.API_TOKEN` is `undefined`, so the template literal resolves to `Bearer undefined`.",
    },
    {
      id: "ac-19",
      question: "Why is 'API Chaining' essential for realistic test scenarios?",
      options: [
        "Because APIs cannot process concurrent requests.",
        "Because stateful applications require the output of an operation (like an ID) to execute subsequent operations (like an Update or Delete).",
        "Because it reduces the size of the JSON payload.",
        "Because it encrypts the network traffic.",
      ],
      correctIndex: 1,
      explanation:
        "API chaining is essential for realistic scenarios because operations are dependent; you must create a resource and extract its ID before you can update or delete it.",
    },
    {
      id: "ac-20",
      code: "on: [push, pull_request]",
      question: "What does this line control in a GitHub Actions YAML file?",
      options: [
        "It defines which GitHub secrets the script has access to.",
        "It sets up the Node.js version.",
        "It specifies the events that trigger the automated test workflow.",
        "It defines the branch merging strategy.",
      ],
      correctIndex: 2,
      explanation:
        "The `on:` directive specifies the events that trigger the workflow, in this case, any `push` or `pull_request` event.",
    },
  ],
};
