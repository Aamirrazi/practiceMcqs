const PerformanceSet2 = {
  meta: {
    id: "perf-nfr-setup",
    testTitle: "NFRs & JMeter Setup",
    topic: "performance",
    topicLabel: "NFRs & Config",
    difficulty: "Medium",
    questionCount: 20,
    estimatedMinutes: 30,
    description:
      "Covers NFR gathering, test strategy documents, JMeter installation, classpath configuration, and OS-level TCP tuning.",
    icon: "⚙️",
  },
  questions: [
    {
      id: "pns-01",
      question:
        "What is the key difference between Functional Requirements and Non-Functional Requirements (NFRs)?",
      options: [
        "Functional defines 'how well' the system performs; NFRs define 'what' it does.",
        "Functional defines 'what' the system does; NFRs define 'how well' it performs its functions.",
        "Functional requirements are for UI; NFRs are for APIs.",
        "There is no difference.",
      ],
      correctIndex: 1,
      explanation:
        "NFRs define how well the system performs its functions, as opposed to functional requirements that define what the system does.",
    },
    {
      id: "pns-02",
      scenario:
        "You are beginning a performance testing engagement and need to establish the NFRs.",
      question:
        "What is the first recommended step in the NFR gathering process?",
      options: [
        "Define Acceptance Criteria immediately.",
        "Analyse Production Data.",
        "Meet with stakeholders (Business Owners, Architects) to understand SLAs and peak load expectations.",
        "Get written Sign-Off.",
      ],
      correctIndex: 2,
      explanation:
        "Step 1 of NFR Gathering is Stakeholder Interviews: Meet with Business Owners, Architects, and Operations to understand SLAs.",
    },
    {
      id: "pns-03",
      question: "What does the 'Business Workload Model' accomplish?",
      options: [
        "It maps user journeys to percentages (e.g., 40% browse, 30% search).",
        "It sets the database schema for performance.",
        "It lists the hardware specifications of the server.",
        "It calculates the financial cost of testing.",
      ],
      correctIndex: 0,
      explanation:
        "Step 3 (Business Workload Model) maps user journeys to percentages, representing real traffic patterns.",
    },
    {
      id: "pns-04",
      question:
        "Which section of the Performance Test Strategy Document contains explicit exclusions with justification?",
      options: ["Scope", "Out of Scope", "Executive Summary", "Entry Criteria"],
      correctIndex: 1,
      explanation:
        "The 'Out of Scope' section contains explicit exclusions with justification.",
    },
    {
      id: "pns-05",
      scenario:
        "Before launching the load test, you check if all functional test scripts are peer-reviewed and signed off, and if the environment is stable.",
      question: "What part of the strategy document do these checks belong to?",
      options: [
        "Exit Criteria",
        "Test Deliverables",
        "Entry Criteria",
        "Risks & Mitigation",
      ],
      correctIndex: 2,
      explanation:
        "Entry Criteria defines what must be true before testing starts, such as environment stability and functional script sign-off.",
    },
    {
      id: "pns-06",
      question:
        "What is the minimum recommended Java JDK version required to run modern JMeter?",
      options: ["JDK 6", "JDK 7", "JDK 8 (JDK 11+ recommended)", "JRE 1.4"],
      correctIndex: 2,
      explanation:
        "Java JDK 8 or later must be installed, though JDK 11+ is recommended.",
    },
    {
      id: "pns-07",
      code: "cp bcprov-jdk15on-1.70.jar /opt/jmeter/lib/",
      question: "Why must Bouncy Castle JARs be added to the JMeter classpath?",
      options: [
        "To increase JMeter heap memory.",
        "To enable HTML report generation.",
        "To act as a cryptography provider for SSL/HTTPS recording.",
        "To convert HAR files to JMX format.",
      ],
      correctIndex: 2,
      explanation:
        "JMeter needs Bouncy Castle JARs (bcprov and bcpkix) in its lib folder to handle SSL certificates and cryptography for HTTPS proxy recording.",
    },
    {
      id: "pns-08",
      question:
        "When running high-load tests on Windows, which registry setting helps increase the ephemeral port range?",
      options: [
        "TcpNumConnections = 65000",
        "MaxUserPort = 65534",
        "TcpTimedWaitDelay = 30",
        "ipv4_local_port_range = 1024",
      ],
      correctIndex: 1,
      explanation:
        "To increase the ephemeral port range on Windows, you add the DWORD: MaxUserPort = 65534.",
    },
    {
      id: "pns-09",
      code: "net.ipv4.tcp_tw_reuse = 1\nnet.ipv4.tcp_fin_timeout = 15",
      question: "What is the purpose of these Linux TCP/IP tuning commands?",
      options: [
        "To reduce the TIME_WAIT duration and enable socket reuse, preventing 'Connection refused' errors under high load.",
        "To allocate more heap memory to JMeter.",
        "To increase the maximum number of open files.",
        "To allow JMeter to bypass firewalls.",
      ],
      correctIndex: 0,
      explanation:
        "These commands reduce the TIME_WAIT period and enable port reuse, solving 'Connection refused' errors when thousands of sockets are opening and closing.",
    },
    {
      id: "pns-10",
      code: 'set HEAP="-Xms1g -Xmx4g"',
      question:
        "What does the `-Xmx4g` parameter specify in JMeter's configuration?",
      options: [
        "The number of concurrent threads.",
        "The initial heap size.",
        "The maximum JVM heap size is set to 4 GB.",
        "The test duration is 4 hours.",
      ],
      correctIndex: 2,
      explanation:
        "-Xmx defines the maximum heap size, which is set to 4 GB in this snippet.",
    },
    {
      id: "pns-11",
      question:
        "What is the recommended maximum heap size (-Xmx) allocation relative to the machine's total available RAM?",
      options: ["10-20%", "30-40%", "60-70%", "90-100%"],
      correctIndex: 2,
      explanation:
        "It is recommended to set -Xmx to 60-70% of available RAM to leave enough memory for the OS and native JVM processes.",
    },
    {
      id: "pns-12",
      question:
        "If you need to simulate 5,000+ virtual users, what environment architecture does the guide recommend?",
      options: [
        "A single desktop with 16GB RAM.",
        "A single server with 32GB RAM.",
        "Distributed mode across multiple nodes with 64+ GB total RAM.",
        "GUI mode with 8GB RAM.",
      ],
      correctIndex: 2,
      explanation:
        "For 5,000+ virtual users, the guide recommends Distributed mode across multiple nodes with 64+ GB RAM.",
    },
    {
      id: "pns-13",
      question:
        "According to the study guide, what is the absolute critical rule regarding JMeter load test execution?",
      options: [
        "Always execute tests in GUI mode to watch the live graphs.",
        "NEVER run load tests from the JMeter GUI; always use non-GUI (CLI) mode for accurate results.",
        "Always use blazing fast Think Times.",
        "Never run tests longer than 5 minutes.",
      ],
      correctIndex: 1,
      explanation:
        "Warning: NEVER run load tests from the JMeter GUI. Always use non-GUI mode (jmeter -n) for accurate results and lower resource overhead.",
    },
    {
      id: "pns-14",
      question:
        "Which file does JMeter automatically generate on its first proxy run to act as a man-in-the-middle for HTTPS?",
      options: [
        "jmeter.properties",
        "bouncycastle.crt",
        "ApacheJMeterTemporaryRootCA.crt",
        "ssl_keystore.jks",
      ],
      correctIndex: 2,
      explanation:
        "The JMeter SSL Certificate auto-generated on the first proxy run is ApacheJMeterTemporaryRootCA.crt.",
    },
    {
      id: "pns-15",
      scenario:
        "During load test execution, JMeter crashes with an `OutOfMemoryError`.",
      question: "What is the most likely cause of this error?",
      options: [
        "Insufficient TCP/IP ports available on the OS.",
        "Insufficient JVM heap memory allocated.",
        "Missing Bouncy Castle JARs.",
        "The proxy port 8888 is blocked.",
      ],
      correctIndex: 1,
      explanation:
        "Insufficient heap causes OutOfMemoryError and test instability.",
    },
    {
      id: "pns-16",
      question:
        "What happens if a performance test environment shares resources (like a database) with functional test environments?",
      options: [
        "The test runs faster due to cached data.",
        "It violates the principle of having an isolated environment, skewing performance results due to unpredictable background noise.",
        "It automatically correlates tokens.",
        "Nothing, this is a standard practice.",
      ],
      correctIndex: 1,
      explanation:
        "Environment consideration 'Isolated' demands no shared resources with functional test environments to ensure clean, predictable results.",
    },
    {
      id: "pns-17",
      question: "Which of the following is an example of an 'Error Rate' NFR?",
      options: [
        "System recovers within 10 seconds.",
        "Maximum acceptable error rate is < 0.1% errors under load.",
        "Minimum TPS is 500.",
        "System scales linearly.",
      ],
      correctIndex: 1,
      explanation:
        "An Error Rate NFR sets a threshold like '< 0.1% errors under load'.",
    },
    {
      id: "pns-18",
      question:
        "In the sample NFR Document, if 'Checkout/Payment' requires 200 Concurrent Users, what is the target p95 Response Time?",
      options: ["< 2.0s", "< 3.0s", "< 4.0s", "< 5.0s"],
      correctIndex: 1,
      explanation:
        "According to the Sample NFR Document, the p95 Response for Checkout/Payment is < 3.0s.",
    },
    {
      id: "pns-19",
      question: "Why do we apply `fs.file-max = 1000000` in Linux tuning?",
      options: [
        "To increase the size limit of the JMX file.",
        "To increase the maximum number of open files (sockets) the OS can handle.",
        "To reduce JMeter log file sizes.",
        "To allow JMeter to bypass the firewall.",
      ],
      correctIndex: 1,
      explanation:
        "fs.file-max increases the max open files limit in Linux, which is necessary since every TCP socket counts as an open file.",
    },
    {
      id: "pns-20",
      code: 'export JVM_ARGS="-Xms2g -Xmx8g"',
      question: "How do you apply this environment variable in macOS/Linux?",
      options: [
        "Edit the Windows Registry.",
        "Run the export command in the terminal before starting JMeter.",
        "Type it directly into the JMeter GUI settings menu.",
        "It is not supported on macOS.",
      ],
      correctIndex: 1,
      explanation:
        'In Linux/macOS, you can set the heap size dynamically by running `export JVM_ARGS="-Xms2g -Xmx8g"` in the terminal before running `jmeter`.',
    },
  ],
};
