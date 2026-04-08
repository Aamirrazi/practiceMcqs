const PerformanceSet1 = {
  meta: {
    id: "perf-fundamentals",
    testTitle: "Performance Testing Fundamentals",
    topic: "performance",
    topicLabel: "Performance Basics",
    difficulty: "Beginner",
    questionCount: 20,
    estimatedMinutes: 25,
    description:
      "Evaluates knowledge of performance testing objectives, SDLC integration, test types, and architecture.",
    icon: "⏱️",
  },
  questions: [
    {
      id: "pf-01",
      scenario:
        "Your company is launching a massive Black Friday marketing campaign. Management wants to know if the system will survive 10x the normal traffic.",
      question:
        "Which of the following is a primary business reason for performance testing in this scenario?",
      options: [
        "To verify that all UI buttons display the correct colors.",
        "To prevent production crashes, as real-world failures (like Amazon losing 1% sales for a 100ms delay) show the high cost of neglecting performance.",
        "To ensure the database has been backed up.",
        "To automate functional regression tests.",
      ],
      correctIndex: 1,
      explanation:
        "Performance testing verifies system behavior under peak load because real-world failures cost revenue, such as Amazon losing 1% in sales revenue for a 100ms delay.",
    },
    {
      id: "pf-02",
      question:
        "At what point does fixing a performance issue become 10-100x more expensive?",
      options: [
        "During the Design phase.",
        "When found in production.",
        "During User Acceptance Testing (UAT).",
        "When detected in the staging environment.",
      ],
      correctIndex: 1,
      explanation:
        "Performance issues found in production cost 10-100x more to fix than those found during testing. Early detection is always cheaper.",
    },
    {
      id: "pf-03",
      question:
        "Which performance metric specifically measures the number of requests processed per second (TPS/RPS)?",
      options: ["Latency", "Throughput", "Response Time", "Scalability"],
      correctIndex: 1,
      explanation:
        "Throughput measures the number of requests processed per second, often expressed as TPS (Transactions Per Second) or RPS.",
    },
    {
      id: "pf-04",
      question: "What is the difference between Response Time and Latency?",
      options: [
        "There is no difference; they are synonyms.",
        "Latency is the time for the first byte to arrive, while Response Time is the total time from request sent to response fully received.",
        "Response Time is measured in milliseconds, while Latency is measured in MB/s.",
        "Latency measures server CPU utilization.",
      ],
      correctIndex: 1,
      explanation:
        "Response Time is the total time from request to full response, whereas Latency is the time for the first byte of the response to arrive.",
    },
    {
      id: "pf-05",
      scenario:
        "You are setting up a load test that simulates users reading an article for 45 seconds before clicking the 'Next' button.",
      question: "Which concept simulates this real human behavior?",
      options: [
        "Ramp-Up Period",
        "Think Time",
        "Concurrent Users",
        "Error Rate",
      ],
      correctIndex: 1,
      explanation:
        "Think Time is the pause time between user actions that simulates real human behavior.",
    },
    {
      id: "pf-06",
      question:
        "Which of the following describes a Service Level Agreement (SLA)?",
      options: [
        "An internal engineering target for CPU utilization.",
        "A contractual performance threshold, such as '95% of requests must be under 2s'.",
        "The time it takes to write a JMeter script.",
        "A tool used to orchestrate distributed load tests.",
      ],
      correctIndex: 1,
      explanation:
        "An SLA is a contractual performance threshold, while an SLO (Service Level Objective) is usually an internal target.",
    },
    {
      id: "pf-07",
      question:
        "During which phase of the SDLC should you review the architecture for performance bottlenecks and model capacity?",
      options: ["Requirements", "Design", "Testing (SIT/UAT)", "Maintenance"],
      correctIndex: 1,
      explanation:
        "In the Design phase of the SDLC, the performance activity involves reviewing architecture for bottlenecks and modeling capacity.",
    },
    {
      id: "pf-08",
      question:
        "What is the first step in the Performance Testing Life Cycle (PTLC)?",
      options: [
        "Test Environment Setup",
        "Test Script Development",
        "NFR Analysis & Workload Modelling",
        "Test Execution",
      ],
      correctIndex: 2,
      explanation:
        "The first step of the PTLC is NFR Analysis & Workload Modelling.",
    },
    {
      id: "pf-09",
      question:
        "In a performance test architecture, what is the role of 'Worker Nodes'?",
      options: [
        "To capture server-side metrics.",
        "To orchestrate the distributed load test.",
        "To store test results for analysis.",
        "To execute the actual virtual user load.",
      ],
      correctIndex: 3,
      explanation:
        "Worker Nodes (like JMeter Slaves) execute the actual virtual user load, while the Controller Node orchestrates them.",
    },
    {
      id: "pf-10",
      scenario:
        "You have been asked to verify if a system can recover gracefully after sudden, massive traffic bursts (e.g., ticket sales opening).",
      question:
        "Which performance test type simulates an instant jump to peak load and then drops back?",
      options: ["Soak Test", "Spike Test", "Baseline Test", "Volume Test"],
      correctIndex: 1,
      explanation:
        "A Spike Test simulates sudden traffic spikes (an instant jump to peak then back) over 30-60 minutes.",
    },
    {
      id: "pf-11",
      question:
        "Which test type is run over a long period (8-72 hours) to detect memory leaks and resource degradation?",
      options: [
        "Stress Test",
        "Soak / Endurance Test",
        "Load Test",
        "Scalability Test",
      ],
      correctIndex: 1,
      explanation:
        "A Soak / Endurance Test applies sustained load over a long period (8-72 hours) specifically to detect memory leaks and resource degradation.",
    },
    {
      id: "pf-12",
      question:
        "Why should you always run a Baseline Test before executing full Load or Stress tests?",
      options: [
        "To warm up the database caches.",
        "To generate the final HTML report for stakeholders.",
        "To establish a clean reference benchmark, because without it, you cannot measure degradation.",
        "To check if the application has security vulnerabilities.",
      ],
      correctIndex: 2,
      explanation:
        "Always run a Baseline test first to establish a reference benchmark. Without a baseline, you cannot measure degradation.",
    },
    {
      id: "pf-13",
      question:
        "Which performance testing role is primarily responsible for NFR definition, workload modeling, and acceptance criteria?",
      options: [
        "Performance Test Engineer",
        "Business Analyst",
        "DevOps / Infra Engineer",
        "Architect",
      ],
      correctIndex: 1,
      explanation:
        "The Business Analyst is responsible for NFR definition, the workload model, and acceptance criteria.",
    },
    {
      id: "pf-14",
      question:
        "Which tool is commonly used for APM/Monitoring to capture server-side metrics during a test?",
      options: ["JMeter", "InfluxDB", "Dynatrace", "Taurus"],
      correctIndex: 2,
      explanation:
        "Tools like Grafana, Dynatrace, New Relic, and Prometheus are used for APM/Monitoring to capture server-side metrics.",
    },
    {
      id: "pf-15",
      scenario:
        "A client wants you to test the application by incrementally increasing the load beyond the normal expected limits until the system breaks.",
      question: "What type of test are you performing?",
      options: ["Stress Test", "Smoke Test", "Volume Test", "Load Test"],
      correctIndex: 0,
      explanation:
        "A Stress Test incrementally increases load beyond normal limits to find the breaking point of the system.",
    },
    {
      id: "pf-16",
      question:
        "What environment consideration is critical for database query performance testing?",
      options: [
        "The DB must use an entirely different OS from production.",
        "The DB should have production-sized data to ensure realistic query plans.",
        "The DB should be empty before the test begins.",
        "The DB should bypass all indexes.",
      ],
      correctIndex: 1,
      explanation:
        "Data Volume is critical: The DB should have production-sized data for realistic query plans.",
    },
    {
      id: "pf-17",
      question:
        "When identifying 'What Should Be Tested', why might you mock external third-party integrations?",
      options: [
        "To avoid hitting API rate limits of external services during your load test.",
        "Because external services are usually written in different programming languages.",
        "To increase the Error Rate artificially.",
        "To make the JMeter script look cleaner.",
      ],
      correctIndex: 0,
      explanation:
        "Third-party stubs/mocks are used to mock external services to avoid hitting rate limits during tests.",
    },
    {
      id: "pf-18",
      question:
        "Which SDLC phase involves 'Baseline establishment; capacity validation; sign-off'?",
      options: ["Design", "Development", "Pre-Production", "Maintenance"],
      correctIndex: 2,
      explanation:
        "The Pre-Production phase involves baseline establishment, capacity validation, and sign-off.",
    },
    {
      id: "pf-19",
      question:
        "In performance testing, what does the term 'Percentile (p95, p99)' represent?",
      options: [
        "The percentage of tests that pass successfully.",
        "The percentage of code covered by performance scripts.",
        "A threshold indicating that 95% or 99% of requests are faster than a specific time value.",
        "The number of concurrent users divided by 100.",
      ],
      correctIndex: 2,
      explanation:
        "A Percentile (p95, p99) means that 95% or 99% of the requests are faster than this specific value.",
    },
    {
      id: "pf-20",
      question:
        "Which test type validates that the system performs well with massive data sets inside the database under normal load?",
      options: ["Load Test", "Stress Test", "Volume Test", "Spike Test"],
      correctIndex: 2,
      explanation:
        "A Volume Test tests the application with large data volumes in the database under normal user load.",
    },
  ],
};
