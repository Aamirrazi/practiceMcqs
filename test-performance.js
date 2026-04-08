window.TestBank.push({
  id: "jmeter_adv",
  title: "JMeter Performance Engineering",
  topic: "performance",
  level: "Advanced",
  questions: [
    {
      code: `HEAP="-Xms2g -Xmx8g"`,
      q: "When modifying the JMeter startup script with the code above, what critical issue are you proactively resolving?",
      o: [
        "A) It permanently limits the maximum number of virtual users.",
        "B) It allocates sufficient RAM to the JVM, preventing OutOfMemoryError crashes.",
        "C) It configures the host operating system to allow unlimited connections.",
        "D) It instructs JMeter to allocate 8GB of hard disk space for logs.",
      ],
      a: 1,
      e: "JMeter is a Java application. Setting -Xmx allocates more RAM to the heap, which is mandatory for running high-load tests.",
    },
    // Add more questions here...
  ],
});
