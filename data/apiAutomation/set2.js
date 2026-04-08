const APISet2 = {
  meta: {
    id: "http-postman",
    testTitle: "HTTP Structure & Postman",
    topic: "api",
    topicLabel: "HTTP & Postman",
    difficulty: "Medium",
    questionCount: 20,
    estimatedMinutes: 30,
    description:
      "Evaluates understanding of HTTP methods, status codes, headers, and Postman functionality (environments, variables, and scripts).",
    icon: "🚀",
  },
  questions: [
    {
      id: "hp-01",
      question: "What does it mean when we say HTTP is a 'stateless' protocol?",
      options: [
        "It cannot handle JSON payloads.",
        "Each request is independent and the server retains no memory of previous requests.",
        "It only works within a single geographic state.",
        "It does not use status codes.",
      ],
      correctIndex: 1,
      explanation:
        "HTTP is stateless meaning each request is independent and the server does not store state between requests.",
    },
    {
      id: "hp-02",
      question:
        "Which HTTP method is specifically used to partially update an existing resource?",
      options: ["PUT", "POST", "PATCH", "OPTIONS"],
      correctIndex: 2,
      explanation:
        "PATCH is used to partially update a resource, whereas PUT is used to replace the entire resource.",
    },
    {
      id: "hp-03",
      question: "What is the HTTP `HEAD` method used for?",
      options: [
        "To update the headers of a resource.",
        "To fetch supported CORS methods.",
        "It acts the same as GET but returns no body, useful for checking if a resource exists.",
        "To delete a resource's metadata.",
      ],
      correctIndex: 2,
      explanation:
        "HEAD is the same as GET but returns no body; it is used to check if a resource exists or to read its headers.",
    },
    {
      id: "hp-04",
      question:
        "If an API successfully processes a DELETE request, which status code is most commonly expected according to the guide?",
      options: ["200 OK", "201 Created", "204 No Content", "404 Not Found"],
      correctIndex: 2,
      explanation:
        "A successful DELETE operation typically returns a 204 No Content status code because there is no body needed to return.",
    },
    {
      id: "hp-05",
      scenario: "You send a request but receive a 403 status code.",
      question: "What category of HTTP error does this fall into?",
      options: [
        "Informational (1xx)",
        "Success (2xx)",
        "Client Error (4xx)",
        "Server Error (5xx)",
      ],
      correctIndex: 2,
      explanation:
        "4xx codes represent Client Errors (e.g., 400 Bad Request, 401 Unauthorized, 403 Forbidden).",
    },
    {
      id: "hp-06",
      question:
        "Which HTTP request header tells the server what data format the client is capable of processing in the response?",
      options: ["Content-Type", "Accept", "User-Agent", "Host"],
      correctIndex: 1,
      explanation:
        "The 'Accept' header tells the server what format the client can process in the response.",
    },
    {
      id: "hp-07",
      question: "What is the purpose of 'Environments' in Postman?",
      options: [
        "To manage and switch variables across different setups like dev, staging, and production.",
        "To simulate an API response without a real backend.",
        "To execute all requests sequentially.",
        "To export tests to GitHub.",
      ],
      correctIndex: 0,
      explanation:
        "Environments manage variables across dev/staging/production setups, allowing you to switch endpoints easily.",
    },
    {
      id: "hp-08",
      question:
        "Which Postman feature allows you to simulate API responses without having a real working backend?",
      options: [
        "Collection Runner",
        "Newman",
        "Mock Servers",
        "Pre-request Scripts",
      ],
      correctIndex: 2,
      explanation:
        "Mock Servers simulate API responses without a real backend.",
    },
    {
      id: "hp-09",
      code: "newman run collection.json -e env.json",
      question: "What is 'Newman' in the context of Postman?",
      options: [
        "A plugin for writing assertions.",
        "Postman's command-line runner used for CI/CD integration.",
        "A dynamic variable generator.",
        "An authentication framework.",
      ],
      correctIndex: 1,
      explanation:
        "Newman is Postman's command-line runner used for integrating collections into CI/CD pipelines.",
    },
    {
      id: "hp-10",
      code: "pm.test('Status is 200', () => {\n  pm.response.to.have.status(200);\n});",
      question: "Where in Postman would you place this JavaScript snippet?",
      options: [
        "In the Headers tab.",
        "In the Pre-request Script tab.",
        "In the Tests (Post-response Scripts) tab.",
        "In the Body tab.",
      ],
      correctIndex: 2,
      explanation:
        "Validations and assertions using `pm.test` are placed in the Tests (Post-response Scripts) tab, as they execute after the response is received.",
    },
    {
      id: "hp-11",
      question:
        "Which Postman variable scope is the narrowest, applying only to a single request's scripts?",
      options: [
        "Global Variables",
        "Environment Variables",
        "Collection Variables",
        "Local Variables",
      ],
      correctIndex: 3,
      explanation:
        "Local Variables are scoped to a single request's scripts, making them the narrowest scope.",
    },
    {
      id: "hp-12",
      question:
        "If you need to generate a random, unique ID every time a Postman request is sent, which dynamic variable should you use in your JSON body?",
      options: ["{{$randomEmail}}", "{{$guid}}", "{{$timestamp}}", "{{$id}}"],
      correctIndex: 1,
      explanation:
        "Postman provides built-in Dynamic Variables like {{$guid}} to generate random unique identifiers.",
    },
    {
      id: "hp-13",
      question:
        "Which HTTP status code is expected when a POST request successfully creates a new resource?",
      options: ["200 OK", "201 Created", "202 Accepted", "204 No Content"],
      correctIndex: 1,
      explanation:
        "A POST request used to create a new resource is expected to return a 201 Created status.",
    },
    {
      id: "hp-14",
      question:
        "What HTTP method is utilized during CORS (Cross-Origin Resource Sharing) preflight requests to fetch supported methods?",
      options: ["GET", "OPTIONS", "HEAD", "TRACE"],
      correctIndex: 1,
      explanation:
        "The OPTIONS method fetches supported methods and is primarily used for CORS preflight checks.",
    },
    {
      id: "hp-15",
      code: "pm.request.headers.add({\n  key: 'Authorization',\n  value: 'Bearer ' + pm.environment.get('token')\n});",
      question: "What does this Pre-request script do?",
      options: [
        "It authenticates using Basic Auth.",
        "It dynamically injects an environment variable 'token' into the Authorization header as a Bearer token.",
        "It asserts that a Bearer token was returned in the response.",
        "It creates a mock server.",
      ],
      correctIndex: 1,
      explanation:
        "This script fetches the 'token' from the environment and injects it into the request headers as a Bearer token before the request is sent.",
    },
    {
      id: "hp-16",
      question:
        "In the HTTP Request Structure, what header is strictly required in HTTP/1.1?",
      options: ["Content-Type", "Host", "Authorization", "User-Agent"],
      correctIndex: 1,
      explanation:
        "The 'Host' header, representing the domain name of the server, is required in HTTP/1.1.",
    },
    {
      id: "hp-17",
      question: "Which status code represents 'Internal Server Error'?",
      options: ["400", "401", "500", "503"],
      correctIndex: 2,
      explanation:
        "500 represents Internal Server Error (a Server Error in the 5xx category).",
    },
    {
      id: "hp-18",
      question: "What is the purpose of the 'Content-Type' header?",
      options: [
        "It dictates what format the client can accept.",
        "It describes the format of the request or response body (e.g., application/json).",
        "It provides authentication credentials.",
        "It specifies the HTTP protocol version.",
      ],
      correctIndex: 1,
      explanation:
        "Content-Type describes the format of the request or response body (e.g., application/json).",
    },
    {
      id: "hp-19",
      question:
        "When writing an API test case, what is the crucial step immediately following the definition of Inputs?",
      options: [
        "Running the Newman CLI.",
        "Defining Expected Output (Status code, body schema).",
        "Setting up Mock Servers.",
        "Writing Pre-request scripts.",
      ],
      correctIndex: 1,
      explanation:
        "After defining the Input (URL, headers, body), you must Define Expected Output (status code, schema, values) before writing assertions.",
    },
    {
      id: "hp-20",
      code: "pm.expect(pm.response.responseTime).to.be.below(500);",
      question: "What specifically does this Postman test snippet validate?",
      options: [
        "That the status code is below 500.",
        "That the response body has fewer than 500 characters.",
        "That the server responded in less than 500 milliseconds.",
        "That the query parameter is under 500.",
      ],
      correctIndex: 2,
      explanation:
        "This snippet checks `pm.response.responseTime` to ensure the API responded in less than 500ms.",
    },
  ],
};
