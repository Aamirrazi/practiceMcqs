/**
 * DATA MODULE: JMeter & Performance Testing
 * -------------------------------------------------
 * Covers NFR gathering, JMeter tooling, test strategies,
 * distributed testing, and real-world troubleshooting.
 */
const PerformanceTesting = {
  meta: {
    id: "performance-testing",
    testTitle: "JMeter: Performance Testing",
    topic: "performance",
    topicLabel: "Performance",
    difficulty: "Intermediate",
    questionCount: 20,
    estimatedMinutes: 25,
    description:
      "NFR definition, JMeter tooling, load strategies, correlation, distributed testing, and result analysis.",
    icon: "⚡",
  },

  questions: [
    {
      id: "pt-01",
      scenario:
        "A product owner says: 'We expect a surge in traffic next week. Ensure the website stays fast and doesn't crash.'",
      question:
        "What is your mandatory first step before scripting any load tests?",
      options: [
        "Install Apache JMeter and begin recording the critical user journeys.",
        "Convert the vague request into measurable Non-Functional Requirements.",
        "Provision additional cloud server hardware to handle the expected surge.",
        "Execute a baseline stress test with 10,000 virtual users immediately.",
      ],
      correctIndex: 1,
      explanation:
        "Performance testing requires explicit, measurable goals. Vague statements must be converted into documented Non-Functional Requirements (NFRs) specifying target concurrent users, TPS, and response time thresholds.",
    },
    {
      id: "pt-02",
      code: 'HEAP="-Xms2g -Xmx8g"',
      question:
        "When modifying the JMeter startup script with the code above, what critical issue are you proactively resolving?",
      options: [
        "It permanently limits the maximum number of virtual users JMeter can run.",
        "It allocates sufficient RAM to the JVM, preventing OutOfMemoryError crashes.",
        "It configures the host operating system to allow unlimited TCP/IP connections.",
        "It instructs JMeter to allocate 8GB of hard disk space for test result logs.",
      ],
      correctIndex: 1,
      explanation:
        "JMeter is a Java application. The default JVM heap allocation is very low. Setting -Xmx allocates more RAM to the heap, which is mandatory for running high-load tests or storing large datasets in memory.",
    },
    {
      id: "pt-03",
      scenario:
        "You are tasked with executing a 'Baseline Test' before conducting the full-scale endurance test.",
      question:
        "Why is executing a Baseline Test highly recommended before initiating full-scale load testing?",
      options: [
        "It verifies that the JMeter Distributed Worker nodes are communicating.",
        "It determines the absolute breaking point of the database architecture.",
        "It establishes a clean, single-user reference metric to measure degradation.",
        "It automatically generates the required NFR documentation for stakeholders.",
      ],
      correctIndex: 2,
      explanation:
        "A baseline test runs with minimal load (e.g., 1 user) to establish optimal response times. This provides a reference point so you can accurately quantify how much the system slows down under heavier loads.",
    },
    {
      id: "pt-04",
      scenario:
        "You are setting up JMeter's HTTP(S) Test Script Recorder. You want to avoid cluttering your test plan with requests for images and stylesheets.",
      question:
        "How do you achieve a clean recording of only essential application traffic?",
      options: [
        "Manually delete the unwanted requests from the Thread Group post-recording.",
        "Add regex filters like `.*\\.css` to the Exclude Patterns in the recorder.",
        "Disable your web browser's network cache before starting the proxy recording.",
        "Configure the JMeter recorder to strictly listen on TCP port 443 instead.",
      ],
      correctIndex: 1,
      explanation:
        "The Script Recorder contains an 'Exclude Patterns' field. Adding regular expressions for static file extensions instructs JMeter to ignore those requests, yielding a cleaner script focused on business logic.",
    },
    {
      id: "pt-05",
      scenario:
        "Your application returns a unique anti-CSRF token in the HTML of the login page, which must be submitted in the subsequent POST request.",
      question:
        "Which specific JMeter component allows you to extract this token dynamically?",
      options: [
        "A CSV Data Set Config element.",
        "An HTTP Header Manager element.",
        "A Regular Expression Extractor element.",
        "A Response Code Assertion element.",
      ],
      correctIndex: 2,
      explanation:
        "Correlation handles dynamic data. Extractors (Regex, JSON Path, CSS) capture values from previous server responses and store them in variables for use in subsequent sampler requests.",
    },
    {
      id: "pt-06",
      scenario:
        "Your project manager wants to watch the test run live and asks you to execute the 5,000-user load test from the JMeter graphical user interface (GUI).",
      question:
        "What is the primary danger of executing a high-concurrency load test from the GUI?",
      options: [
        "The GUI completely prevents the execution of Custom Java Samplers.",
        "The GUI consumes immense memory for rendering, skewing results and crashing.",
        "The GUI strictly limits the Thread Group configuration to exactly 100 users.",
        "The GUI cannot export test results into standard JTL or CSV data formats.",
      ],
      correctIndex: 1,
      explanation:
        "The GUI is intended for script development and debugging only. During execution, visual listeners consume excessive CPU and RAM, artificially bottlenecking the load generator rather than testing the server.",
    },
    {
      id: "pt-07",
      scenario:
        "Your JMeter script simulates users navigating an e-commerce catalog, but it currently executes requests as fast as the CPU allows.",
      question:
        "Why is it important to introduce elements like the 'Constant Timer' into a performance test script?",
      options: [
        "To forcefully restrict the server's network bandwidth during the test run.",
        "To simulate realistic human 'think time' and reading delays between actions.",
        "To synchronize multiple distributed worker machines to start simultaneously.",
        "To accurately calculate the microsecond latency of the target database.",
      ],
      correctIndex: 1,
      explanation:
        "Without timers, JMeter executes sequential requests instantaneously, generating an unrealistic, machine-gun-like throughput. Timers introduce delays that mimic real human interaction.",
    },
    {
      id: "pt-08",
      scenario:
        "During a massive 10,000-user load test, JMeter begins failing with OS-level `java.net.BindException: Address already in use` errors.",
      question:
        "Which specific system configuration requires tuning to resolve this bottleneck?",
      options: [
        "Expanding the JVM Heap Memory allocation settings within the startup file.",
        "Tuning the OS TCP/IP settings by increasing ephemeral ports and lowering TIME_WAIT.",
        "Temporarily disabling the Windows Defender Firewall or local antivirus software.",
        "Upgrading the JMeter installation to the latest available major version.",
      ],
      correctIndex: 1,
      explanation:
        "High-throughput testing rapidly consumes available TCP ports. Tuning the OS registry (Windows) or sysctl (Linux) to increase port ranges and quickly recycle closed connections is required for large tests.",
    },
    {
      id: "pt-09",
      scenario:
        "You want to ensure an API endpoint returns exactly a 201 Created status, otherwise the transaction should be marked as failed.",
      question:
        "Which JMeter element allows you to definitively mark a sampler as 'Failed' based on specific conditions?",
      options: [
        "The View Results Tree visual listener.",
        "The Constant Throughput Timer element.",
        "The Response Assertion configuration element.",
        "The HTTP Cookie Manager configuration element.",
      ],
      correctIndex: 2,
      explanation:
        "Response Assertions validate server responses against expected conditions (status codes, substrings, JSON structures). If the assertion fails, JMeter accurately flags the transaction as an error.",
    },
    {
      id: "pt-10",
      scenario:
        "You are planning the overall performance testing strategy for a brand new software project.",
      question:
        "At which specific phase of the Software Development Life Cycle (SDLC) is it most cost-effective to begin gathering NFRs?",
      options: [
        "During the initial Requirements and Design phase.",
        "Immediately following the completion of unit testing.",
        "During the final User Acceptance Testing (UAT) phase.",
        "After the application is deployed into the Production environment.",
      ],
      correctIndex: 0,
      explanation:
        "Performance should be integrated early. Identifying architectural bottlenecks or defining SLAs during the Requirements/Design phase is exponentially cheaper than fixing performance bugs in Production.",
    },
    {
      id: "pt-11",
      scenario:
        "Your test requires simulating 1,000 distinct users, each needing their own unique username and password combination to login successfully.",
      question:
        "How should you effectively manage and inject these unique credentials into the script?",
      options: [
        "Define 1,000 distinct User Defined Variables manually in the Test Plan header.",
        "Create 1,000 identical Thread Groups, hardcoding one user into each group.",
        "Utilize a CSV Data Set Config element to read credentials sequentially from a file.",
        "Write a complex JSR223 Groovy script to mathematically generate unique credentials.",
      ],
      correctIndex: 2,
      explanation:
        "The CSV Data Set Config element iterates through rows in an external file, assigning values to variables (e.g., ${username}) for each thread, enabling massive-scale data-driven testing.",
    },
    {
      id: "pt-12",
      scenario:
        "A rigid corporate security policy absolutely prohibits modifying your browser's proxy settings, rendering JMeter's built-in HTTP recorder useless.",
      question:
        "What is the industry-standard alternative method for generating a JMeter test script?",
      options: [
        "Performance testing cannot be executed securely under rigid corporate firewalls.",
        "Capture the network traffic natively as a HAR file and convert it into a JMX script.",
        "Modify the host machine's registry to forcibly bypass the corporate firewall policies.",
        "Reconfigure the JMeter proxy server to listen exclusively on port 443 instead.",
      ],
      correctIndex: 1,
      explanation:
        "If proxy settings are locked, you can use Chrome DevTools or browser extensions (like BlazeMeter) to record traffic directly into a HAR or JMX file, bypassing network configuration restrictions.",
    },
    {
      id: "pt-13",
      code: "Number of Threads (users): 500\nRamp-up period (seconds): 100",
      question:
        "Based on the Thread Group configuration above, how will JMeter manage the virtual users?",
      options: [
        "JMeter will pause for exactly 100 seconds, then start all 500 threads simultaneously.",
        "JMeter will initiate precisely 5 new virtual user threads every single second.",
        "The entire load test will execute for a maximum duration of exactly 100 seconds.",
        "Each individual thread will execute a total of 100 loops before gracefully terminating.",
      ],
      correctIndex: 1,
      explanation:
        "The ramp-up period defines how long JMeter takes to start all threads. 500 threads divided by 100 seconds means the engine will distribute the load by starting 5 threads per second.",
    },
    {
      id: "pt-14",
      scenario:
        "You are configuring JMeter's Proxy Server to capture encrypted HTTPS traffic generated by your Chrome browser.",
      question:
        "Why is it absolutely necessary for JMeter to install its own temporary Root CA certificate into your web browser?",
      options: [
        "It authorizes the open-source JMeter software to execute legally on your operating system.",
        "It bypasses complex Multi-Factor Authentication mechanisms on the target website.",
        "It allows JMeter to act as a trusted man-in-the-middle to decrypt recorded HTTPS traffic.",
        "It cryptographically signs and secures the generated HTML performance reports.",
      ],
      correctIndex: 2,
      explanation:
        "HTTPS traffic is encrypted. To record the URLs and payloads, JMeter's proxy must intercept and decrypt the traffic. Installing the JMeter Root CA allows the browser to trust this interception.",
    },
    {
      id: "pt-15",
      scenario:
        "You have successfully recorded a user journey. However, upon immediate playback, the script fails with an HTTP 403 Forbidden error on the final checkout step.",
      question:
        "What is the most statistically probable cause of this playback validation failure?",
      options: [
        "You neglected to increase the JMeter heap memory limits prior to playback.",
        "The target application server crashed under the immense load of a single user.",
        "A dynamically generated security token (CSRF) was recorded but not properly correlated.",
        "You executed the single-user validation test in GUI mode instead of Non-GUI mode.",
      ],
      correctIndex: 2,
      explanation:
        "Hardcoded security tokens from a previous recording session will be rejected by the server as expired or invalid. You must extract (correlate) the fresh token during playback to pass authentication.",
    },
    {
      id: "pt-16",
      scenario:
        "You are transitioning a JMeter script from single-user debugging mode to full-scale load execution mode.",
      question:
        "Which specific JMeter listener must be strictly disabled during high-volume load test execution to prevent crashes?",
      options: [
        "The Summary Report visualizer.",
        "The View Results Tree visualizer.",
        "The Simple Data Writer component.",
        "The Backend Listener configuration.",
      ],
      correctIndex: 1,
      explanation:
        "View Results Tree stores the complete request and response payload for every single transaction in RAM. Under high load, this will rapidly exhaust the JVM heap and cause catastrophic OutOfMemory errors.",
    },
    {
      id: "pt-17",
      scenario:
        "You need to determine if your monolithic application suffers from slow memory leaks that eventually cause the JVM to crash after several days of continuous operation.",
      question:
        "Which specific performance testing methodology is designed to uncover this exact defect?",
      options: [
        "A high-intensity Stress Test.",
        "A sudden, high-volume Spike Test.",
        "An extended-duration Soak Test.",
        "An incremental Scalability Test.",
      ],
      correctIndex: 2,
      explanation:
        "Soak (or Endurance) Testing involves applying a sustained, expected load over a very long duration (typically 8-72 hours) specifically to monitor resource degradation and memory leaks over time.",
    },
    {
      id: "pt-18",
      scenario:
        "You are negotiating performance requirements with business stakeholders and engineering teams.",
      question:
        "In the context of gathering Non-Functional Requirements, what is the core difference between an SLA and an SLO?",
      options: [
        "SLAs strictly dictate concurrent user counts, whereas SLOs dictate acceptable error rates.",
        "An SLA is a binding contractual threshold, whereas an SLO is a stricter internal target.",
        "SLAs exclusively govern backend database metrics, whereas SLOs govern frontend UI metrics.",
        "There is no functional difference; the two acronyms are utilized completely interchangeably.",
      ],
      correctIndex: 1,
      explanation:
        "An SLA is a formal contract with external stakeholders (e.g., 99% uptime). An SLO is an internal engineering goal (e.g., 99.9% uptime) designed to provide a safety buffer against breaching the SLA.",
    },
    {
      id: "pt-19",
      scenario:
        "Your single high-end workstation can only simulate 2,000 concurrent virtual users before maxing out its CPU, but your test strategy demands simulating 10,000 users.",
      question:
        "How does JMeter natively solve this hardware limitation problem?",
      options: [
        "By artificially increasing the Thread Group loop count to compensate for the missing users.",
        "By utilizing a Controller-Worker distributed architecture across multiple remote machines.",
        "By permanently reducing the footprint of the JVM via aggressive garbage collection tuning.",
        "By executing multiple instances of the JMeter GUI application simultaneously on one machine.",
      ],
      correctIndex: 1,
      explanation:
        "JMeter supports Distributed Testing, where a master 'Controller' node orchestrates multiple 'Worker' nodes. Each worker generates a portion of the load, allowing limitless scaling across infrastructure.",
    },
    {
      id: "pt-20",
      scenario:
        "An e-commerce site experiences massive, instantaneous traffic surges the exact moment a highly anticipated concert ticket goes on sale.",
      question:
        "Which specific performance test profile must you execute to simulate and validate this phenomenon?",
      options: [
        "A baseline capacity Load Test.",
        "A destructive infrastructure Stress Test.",
        "An extended duration Endurance Test.",
        "A sudden, extreme-volume Spike Test.",
      ],
      correctIndex: 3,
      explanation:
        "Spike Testing evaluates how a system responds to sudden, extreme, and instantaneous bursts of traffic, and more importantly, how gracefully it recovers once the burst subsides.",
    },
  ],
};
