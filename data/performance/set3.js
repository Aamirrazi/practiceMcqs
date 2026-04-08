const PerformanceSet3 = {
  meta: {
    id: "perf-jmeter-scripting",
    testTitle: "JMeter Scripting & Execution",
    topic: "performance",
    topicLabel: "Scripting & Exec",
    difficulty: "Hard",
    questionCount: 20,
    estimatedMinutes: 30,
    description:
      "Evaluates practical skills in script recording, HAR conversion, correlation (extractors), assertions, and CLI execution.",
    icon: "💻",
  },
  questions: [
    {
      id: "pjs-01",
      scenario:
        "You want to record a JMeter script but corporate IT policy prevents you from installing local proxy certificates.",
      question:
        "Which recording method bypasses the need for manual proxy and certificate setup?",
      options: [
        "JMeter HTTP(S) Test Script Recorder",
        "BlazeMeter Chrome Extension",
        "Manual manual coding in XML",
        "FoxyProxy",
      ],
      correctIndex: 1,
      explanation:
        "BlazeMeter's Chrome extension records browser activity and exports it directly as a JMeter JMX file, eliminating the need for manual proxy and certificate setup.",
    },
    {
      id: "pjs-02",
      question:
        "When configuring the JMeter Proxy, what should you add to 'Exclude Patterns' to keep your script clean?",
      options: [
        ".*\\.jsp, .*api.*",
        "localhost",
        ".*\\.css, .*\\.js, .*\\.png, .*\\.gif",
        "http://*",
      ],
      correctIndex: 2,
      explanation:
        "Exclude Patterns are used for static resources like .css, .js, .png, .gif so they don't clutter the test script.",
    },
    {
      id: "pjs-03",
      question: "What is a HAR file?",
      options: [
        "A proprietary JMeter script format.",
        "A JSON-formatted log of all browser network activity (HTTP Archive).",
        "A compiled Java application.",
        "A server-side monitoring log.",
      ],
      correctIndex: 1,
      explanation:
        "A HAR (HTTP Archive) file is a JSON-formatted log of all browser network activity exported from DevTools.",
    },
    {
      id: "pjs-04",
      scenario:
        "You are preparing a script for validation playback to catch correlation issues.",
      question:
        "What Thread Group settings should you use for this initial validation?",
      options: [
        "100 users, 10s ramp-up, loop forever.",
        "1 user, 1 loop, 1s ramp-up.",
        "10 users, 1 loop, 5s ramp-up.",
        "500 users, 0s ramp-up, 1 loop.",
      ],
      correctIndex: 1,
      explanation:
        "Playback Setup for validation requires: Number of Threads: 1, Ramp-Up Period: 1 second, Loop Count: 1.",
    },
    {
      id: "pjs-05",
      question:
        "If a playback request fails with a '403 Forbidden' error, what is the most likely scripting issue you need to fix?",
      options: [
        "Missing or incorrect CSRF token correlation.",
        "The proxy server is down.",
        "The 'Follow Redirects' option is unchecked.",
        "The request body is formatted as JSON.",
      ],
      correctIndex: 0,
      explanation:
        "A 403 Forbidden error during playback typically indicates a need to check CSRF token extraction/correlation.",
    },
    {
      id: "pjs-06",
      question:
        "Which listener is absolutely essential during the script validation phase to inspect detailed request/response bodies?",
      options: [
        "Aggregate Graph",
        "Summary Report",
        "View Results Tree",
        "Backend Listener",
      ],
      correctIndex: 2,
      explanation:
        "The 'View Results Tree' listener allows you to see detailed request/response data necessary for validation.",
    },
    {
      id: "pjs-07",
      scenario:
        "Your application passes a dynamic 'access_token' in a JSON response body during login, which must be sent in subsequent requests.",
      question: "Which JMeter extractor is best suited to capture this token?",
      options: [
        "CSS/JQuery Extractor",
        "JSON Path Extractor",
        "XPath Extractor",
        "HTTP Cookie Manager",
      ],
      correctIndex: 1,
      explanation:
        "The JSON Path Extractor (e.g., `$.access_token`) is used to extract dynamic Auth Tokens from JSON responses.",
    },
    {
      id: "pjs-08",
      code: "input[name=_token]",
      question:
        "If you use this expression in a CSS/JQuery Extractor, what kind of dynamic value are you likely trying to correlate?",
      options: [
        "A JSON Web Token (JWT).",
        "A ViewState parameter.",
        "A CSRF Token embedded in a hidden HTML form field.",
        "A session cookie.",
      ],
      correctIndex: 2,
      explanation:
        "The CSS/JQuery extractor using `input[name=_token]` is the standard way to extract CSRF tokens from HTML forms.",
    },
    {
      id: "pjs-09",
      question:
        "Which config element handles `JSESSIONID` and `.ASPXAUTH` tokens automatically without manual regular expressions?",
      options: [
        "HTTP Header Manager",
        "HTTP Cookie Manager",
        "CSV Data Set Config",
        "Regular Expression Extractor",
      ],
      correctIndex: 1,
      explanation:
        "Session Tokens (Cookies) like JSESSIONID are handled automatically by adding an HTTP Cookie Manager.",
    },
    {
      id: "pjs-10",
      code: "location: (.*?)\\r\\n",
      question:
        "This Regular Expression is used to extract what kind of dynamic value?",
      options: [
        "A ViewState.",
        "A JSON payload.",
        "A Redirect URL from HTTP headers.",
        "A CSRF token.",
      ],
      correctIndex: 2,
      explanation:
        "The regex `location: (.*?)\\r\\n` is used to capture a Redirect URL from the HTTP response headers.",
    },
    {
      id: "pjs-11",
      scenario:
        "You need to parameterize your script so that 500 virtual users each log in with a unique email and password.",
      question:
        "Which JMeter element allows you to read these credentials from an external file?",
      options: [
        "HTTP Header Manager",
        "User Parameters",
        "CSV Data Set Config",
        "Regular Expression Extractor",
      ],
      correctIndex: 2,
      explanation:
        "To parameterise users, you add a CSV Data Set Config to read a `users.csv` file with email and password columns.",
    },
    {
      id: "pjs-12",
      question:
        "When adding a Response Assertion to verify that a page loaded correctly, what is a best practice?",
      options: [
        "Assert on the HTTP 200 response code alone.",
        "Assert that the response body contains a specific expected string like 'Welcome, John'.",
        "Assert that the response size matches exactly 1024 bytes.",
        "Assert that the latency is under 10ms.",
      ],
      correctIndex: 1,
      explanation:
        "A best practice is checking that the 'Text Response Contains Expected String' (e.g., 'Welcome, John') to ensure the page rendered correctly, not just returned a 200 code.",
    },
    {
      id: "pjs-13",
      scenario:
        "Your SLA states that the 'Add to Cart' transaction must complete within 3 seconds.",
      question:
        "Which specific assertion type fails the request if it takes longer than 3000 milliseconds?",
      options: [
        "Response Assertion",
        "Size Assertion",
        "JSON Path Assertion",
        "Duration Assertion",
      ],
      correctIndex: 3,
      explanation:
        "The Duration Assertion fails the request if it does not respond within the specified duration in milliseconds (e.g., 3000ms).",
    },
    {
      id: "pjs-14",
      question:
        "What is the purpose of Transaction Controllers in a JMeter script?",
      options: [
        "To manage database transactions (commit/rollback).",
        "To group multiple related HTTP requests (like Login, Search, Checkout) into a single labeled transaction for aggregated reporting.",
        "To loop through a CSV file.",
        "To pause the script automatically.",
      ],
      correctIndex: 1,
      explanation:
        "Transaction Controllers group related requests (Login, Search, Checkout) into labeled transactions for reporting.",
    },
    {
      id: "pjs-15",
      code: "jmeter -n -t User_Journey.jmx -l results.jtl -e -o /report",
      question: "What does the `-n` flag represent in this execution command?",
      options: [
        "Number of threads",
        "Name of the script",
        "Non-GUI mode",
        "New log file",
      ],
      correctIndex: 2,
      explanation:
        "The `-n` flag tells JMeter to run the test in Non-GUI mode, which is mandatory for actual load testing.",
    },
    {
      id: "pjs-16",
      code: "jmeter -n -t User_Journey.jmx -l results.jtl -e -o /report",
      question: "In the same command, what does `-e -o /report` accomplish?",
      options: [
        "It ends the test and opens the results in Excel.",
        "It automatically generates an HTML dashboard report in the specified `/report` folder at the end of the test.",
        "It overrides the environment variables.",
        "It empties the target folder before running.",
      ],
      correctIndex: 1,
      explanation:
        "The `-e -o` flags generate the HTML dashboard report and output it to the specified folder after the test concludes.",
    },
    {
      id: "pjs-17",
      scenario:
        "During playback, a request meant to fetch an API returns a '500 Server Error'.",
      question:
        "According to the validation checklist, what should you verify?",
      options: [
        "Check if the request body format is correct (e.g., JSON vs form data) and that the Content-Type header matches.",
        "Check the CSRF token.",
        "Ensure 'Follow Redirects' is checked.",
        "Clear cookies.",
      ],
      correctIndex: 0,
      explanation:
        "For a 500 Server Error, the checklist advises to 'Check request body format (JSON vs form data)' and Content-Type headers.",
    },
    {
      id: "pjs-18",
      question:
        "If you import a HAR file into JMeter using the built-in importer (Tools > Import from HAR), where are the new requests created?",
      options: [
        "In a newly generated .jmx file on the desktop.",
        "In the current open Test Plan.",
        "In the JMeter /lib folder.",
        "They are executed immediately in the cloud.",
      ],
      correctIndex: 1,
      explanation:
        "When importing from HAR via the Tools menu, requests are created directly in the current Test Plan.",
    },
    {
      id: "pjs-19",
      question:
        "Which JMeter element is required if your API endpoints expect payloads formatted explicitly as JSON?",
      options: [
        "HTTP Cookie Manager",
        "HTTP Cache Manager",
        "HTTP Header Manager (with Content-Type: application/json)",
        "JSON Path Extractor",
      ],
      correctIndex: 2,
      explanation:
        "An HTTP Header Manager is required to add `Content-Type: application/json` where needed for API calls.",
    },
    {
      id: "pjs-20",
      question:
        "What is the primary objective of the 'Playback and Validation' phase?",
      options: [
        "To stress the server to breaking point.",
        "To capture server metrics like CPU and Memory.",
        "To catch correlation issues, hardcoded values, and request failures with a single user before scaling to load.",
        "To compile the Java code of the script.",
      ],
      correctIndex: 2,
      explanation:
        "Playback and validation with a single virtual user catches correlation issues, hardcoded values, and request failures before scaling to load.",
    },
  ],
};
