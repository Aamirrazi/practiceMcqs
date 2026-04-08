const APISet1 = {
  meta: {
    id: "api-fundamentals",
    testTitle: "API & Web App Fundamentals",
    topic: "api",
    topicLabel: "API Basics",
    difficulty: "Beginner",
    questionCount: 20,
    estimatedMinutes: 25,
    description:
      "Evaluates knowledge of Web App Architecture, URLs, JSON formats, and Web Services (REST/SOAP).",
    icon: "🌐",
  },
  questions: [
    {
      id: "ap1-01",
      question:
        "Which type of web application combines native and web technologies (e.g., using Cordova)?",
      options: [
        "Progressive Web App (PWA)",
        "Hybrid App",
        "Cloud App",
        "Desktop App",
      ],
      correctIndex: 1,
      explanation:
        "A Hybrid App is a combination of native and web technologies (e.g., Ionic apps, Flipkart).",
    },
    {
      id: "ap1-02",
      scenario: "You are testing a standard 3-tier web application.",
      question:
        "Which tier is primarily responsible for exposing the business logic via APIs?",
      options: [
        "Presentation Tier",
        "Data Tier",
        "Application / Logic Tier",
        "Microservices Tier",
      ],
      correctIndex: 2,
      explanation:
        "The Application / Logic Tier (Backend) contains the business logic layer and exposes APIs consumed by the frontend.",
    },
    {
      id: "ap1-03",
      question:
        "What is a major advantage of using a Microservices Architecture over a traditional monolithic 3-tier architecture?",
      options: [
        "It requires less code.",
        "It uses only one database.",
        "It allows for independent scaling, technology heterogeneity, and fault isolation.",
        "It operates entirely offline.",
      ],
      correctIndex: 2,
      explanation:
        "In microservices, advantages include independent scaling, technology heterogeneity, and fault isolation.",
    },
    {
      id: "ap1-04",
      question:
        "Which part of this URL is the 'Query String'? \n`https://api.example.com/v1/users?role=admin&active=true#section2`",
      options: [
        "/v1/users",
        "api.example.com",
        "?role=admin&active=true",
        "#section2",
      ],
      correctIndex: 2,
      explanation:
        "The Query String contains key=value pairs for filtering or parameterizing requests, like `?role=admin&active=true`.",
    },
    {
      id: "ap1-05",
      question:
        "Why must certain characters in a URL, such as spaces or ampersands, be percent-encoded?",
      options: [
        "To compress the URL size.",
        "Because URLs can only contain certain characters; for example, a space becomes %20.",
        "To encrypt sensitive data.",
        "To make the URL human-readable.",
      ],
      correctIndex: 1,
      explanation:
        "URLs can only contain certain characters. Special characters must be percent-encoded. For example, a space becomes %20.",
    },
    {
      id: "ap1-06",
      question:
        "According to the JSON characteristics listed in the guide, which of the following is strictly PROHIBITED in a standard JSON file?",
      options: ["Nested objects", "Boolean values", "Comments", "Arrays"],
      correctIndex: 2,
      explanation:
        "The JSON spec does not support comments (you must use JSONC for dev configs).",
    },
    {
      id: "ap1-07",
      question: "Which of the following is a valid JSON data type?",
      options: ["undefined", "Function", "Null", "Date"],
      correctIndex: 2,
      explanation:
        "JSON supports Strings, Numbers, Booleans, Null, Arrays, and Objects.",
    },
    {
      id: "ap1-08",
      question: "Why is JSON generally preferred over XML for REST APIs?",
      options: [
        "It is older and more established.",
        "It supports SOAP protocols out of the box.",
        "It has a smaller payload size and simpler structure.",
        "It natively supports binary file transfers.",
      ],
      correctIndex: 2,
      explanation:
        "JSON is generally preferred for REST APIs due to its smaller size and simpler structure compared to XML.",
    },
    {
      id: "ap1-09",
      question:
        "In Service-Oriented Architecture (SOA), which testing scope validates the Service/Integration Layer?",
      options: [
        "UI Testing",
        "Contract testing",
        "SQL Queries",
        "Usability testing",
      ],
      correctIndex: 1,
      explanation:
        "The Service/Integration Layer scope involves Integration testing and Contract testing.",
    },
    {
      id: "ap1-10",
      scenario:
        "You are testing an API by sending random, unexpected data payloads to see if the server crashes or exposes vulnerabilities.",
      question: "What type of API testing is this?",
      options: [
        "Load Testing",
        "Fuzz Testing",
        "Contract Testing",
        "Integration Testing",
      ],
      correctIndex: 1,
      explanation:
        "Fuzz Testing involves sending random/unexpected data to discover edge cases and crashes.",
    },
    {
      id: "ap1-11",
      question:
        "Which of the following is a key characteristic of REST Web Services compared to SOAP?",
      options: [
        "It only supports XML.",
        "It uses HTTP, SMTP, and TCP.",
        "It is stateful.",
        "It is faster, lighter, and uses less overhead.",
      ],
      correctIndex: 3,
      explanation:
        "REST is faster, has less overhead, and is stateless compared to the heavier SOAP standard.",
    },
    {
      id: "ap1-12",
      question: "What does WSDL validation ensure in SOAP web services?",
      options: [
        "That the JSON payload is formatted correctly.",
        "That the Web Services Description Language document structure is valid.",
        "That the REST endpoints return 200 OK.",
        "That the UI renders correctly.",
      ],
      correctIndex: 1,
      explanation:
        "WSDL Validation validates the WSDL (Web Services Description Language) document structure for SOAP services.",
    },
    {
      id: "ap1-13",
      question:
        "Which URL component prevents the client-side browser from sending specific anchor references to the server?",
      options: [
        "The Query String",
        "The Path",
        "The Fragment (#)",
        "The Scheme",
      ],
      correctIndex: 2,
      explanation:
        "The Fragment (#section2) is a client-side anchor reference and is not sent to the server.",
    },
    {
      id: "ap1-14",
      question: "What defines an API's 'Interoperability' advantage?",
      options: [
        "It runs faster on mobile devices.",
        "It enables communication across different systems and platforms.",
        "It uses less memory on the server.",
        "It hides database passwords.",
      ],
      correctIndex: 1,
      explanation:
        "Interoperability enables communication across different systems, allowing different platforms to work together.",
    },
    {
      id: "ap1-15",
      code: "{\n  id: 101,\n  name: 'Alice'\n}",
      question: "Why is the above payload strictly INVALID JSON?",
      options: [
        "It uses single quotes for strings and unquoted keys.",
        "It is missing a trailing comma.",
        "It does not contain an array.",
        "It is valid JSON.",
      ],
      correctIndex: 0,
      explanation:
        "JSON has strict syntax: Keys must be strings enclosed in double quotes, and string values must also use double quotes.",
    },
    {
      id: "ap1-16",
      question:
        "When testing APIs, testers primarily focus on which architectural tier?",
      options: [
        "Presentation Tier",
        "Application / Logic Tier",
        "Database Tier",
        "OS Tier",
      ],
      correctIndex: 1,
      explanation:
        "In API testing, we primarily test the Application Tier - the business logic exposed through HTTP endpoints.",
    },
    {
      id: "ap1-17",
      question: "What is 'Contract Testing'?",
      options: [
        "Testing the legal agreements of software.",
        "Ensuring the API conforms to the agreed-upon contract/schema.",
        "Testing how many users the API can handle.",
        "Testing the database connections.",
      ],
      correctIndex: 1,
      explanation:
        "Contract Testing ensures the API conforms to the agreed-upon contract/schema.",
    },
    {
      id: "ap1-18",
      question: "Which protocol is STRICTLY required by REST APIs?",
      options: ["SMTP", "TCP", "HTTP/HTTPS", "FTP"],
      correctIndex: 2,
      explanation:
        "REST APIs communicate exclusively over the HTTP/HTTPS protocols, unlike SOAP which can use SMTP or TCP.",
    },
    {
      id: "ap1-19",
      question:
        "Which of the following best describes the 'Host' component of a URL?",
      options: [
        "The specific page route.",
        "The parameters sent to the database.",
        "The domain name or IP address of the server.",
        "The port number.",
      ],
      correctIndex: 2,
      explanation:
        "The Host is the domain name or IP address of the server (e.g., api.example.com).",
    },
    {
      id: "ap1-20",
      question: "What is the primary role of a 'Web Service'?",
      options: [
        "To render HTML to a browser.",
        "To provide a graphical user interface.",
        "To serve as a standardized method for propagating messages between client and server over the web.",
        "To store data offline.",
      ],
      correctIndex: 2,
      explanation:
        "A Web Service is a standardized method for propagating messages between client and server applications on the World Wide Web.",
    },
  ],
};
