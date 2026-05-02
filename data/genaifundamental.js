/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  TEST MODULE — genaifundamental.js                           ║
 * ╚══════════════════════════════════════════════════════════════╝
 */
const GenAIFundamentals = {
  meta: {
    id: "genai-agentic-mcp",
    testTitle: "Generative AI, Agentic AI & MCP",
    topic: "javascript",
    topicLabel: "AI & MCP",
    difficulty: "Intermediate",
    questionCount: 30,
    estimatedMinutes: 45,
    description:
      "A comprehensive 30-question module covering Generative AI fundamentals, Agentic AI architecture, and the Model Context Protocol (MCP). Questions are scenario-driven and framed in real industry and business contexts.",
    icon: "🤖",
  },

  questions: [
    // ── GENERATIVE AI ────────────────────────────────────────────

    {
      id: "gam-01",
      scenario:
        "A product manager at a fintech startup is pitching an AI investment to their board. " +
        "She says the new system will not just retrieve stored records — it will produce entirely " +
        "new content, summaries, and recommendations that did not exist in any database beforehand. " +
        "A skeptical board member asks her to clarify what fundamentally separates this technology " +
        "from the traditional rule-based software the company has used for a decade.",
      question:
        "Which statement most precisely captures what makes Generative AI fundamentally different from traditional software?",
      options: [
        "It uses reinforcement learning exclusively, rewarding correct answers and penalising wrong ones until the model converges on a perfect decision policy.",
        "It replaces every layer of the software stack, eliminating the need for databases, APIs, and rule engines by consolidating all logic into a single neural model.",
        "It learns statistical patterns from vast training data and generates novel outputs — text, images, code — that are probabilistically plausible rather than deterministically retrieved.",
        "It connects to the internet in real time, allowing it to retrieve and display up-to-date information that legacy systems cannot access without manual updates.",
      ],
      correctIndex: 2,
      explanation:
        "Generative AI distinguishes itself by producing statistically plausible novel content derived from learned patterns — not by retrieving stored records or replacing existing infrastructure. Traditional software follows deterministic rules; GenAI samples from a learned probability distribution, which is why outputs can be creative, varied, and occasionally wrong.",
    },

    {
      id: "gam-02",
      scenario:
        "During a technical deep-dive, a senior engineer is explaining to a group of business analysts " +
        "how a large language model actually processes the sentence 'The quarterly report is ready.' " +
        "She draws a diagram showing how the sentence is broken into smaller pieces before the model " +
        "ever sees it, and how each piece receives a numerical ID that the model operates on.",
      question:
        "What are these smaller pieces called, and why does their count matter for enterprise deployments?",
      options: [
        "Parameters — the trainable weights of the model that collectively encode all the knowledge it has absorbed during pre-training.",
        "Embeddings — dense vector representations that determine how semantically similar two sentences are when stored in a vector database.",
        "Checkpoints — serialised snapshots of model state saved during training, which determine how much historical text the model can recall at inference time.",
        "Tokens — sub-word units that the model's vocabulary maps to numeric IDs; their total count in a request directly consumes the model's finite context window.",
      ],
      correctIndex: 3,
      explanation:
        "Tokens are the fundamental unit of text that LLMs process — typically sub-word fragments. Every token in a prompt and response consumes a portion of the context window, which is the model's finite working memory. Enterprise teams must track token usage for cost management, latency, and staying within model limits.",
    },

    {
      id: "gam-03",
      scenario:
        "A CTO is evaluating three foundation model providers for her company's new AI platform. " +
        "Her team has shortlisted OpenAI's GPT-4o, Google's Gemini Ultra, and Anthropic's Claude. " +
        "A junior engineer asks why the industry calls these 'foundation models' and whether " +
        "they need to train a separate model for every business use case they want to support.",
      question:
        "What is the defining characteristic of a foundation model that makes it reusable across diverse enterprise tasks?",
      options: [
        "It is a fully open-source model with published weights, guaranteeing that any company can audit, modify, and redistribute it freely under a permissive licence.",
        "It is pre-trained at massive scale on broad data, giving it general-purpose capabilities that can be adapted — via prompting or fine-tuning — to many downstream tasks without training from scratch.",
        "It is a model that has completed RLHF alignment and therefore produces outputs that are guaranteed safe and compliant with enterprise governance standards out of the box.",
        "It is pre-trained on a narrow, curated dataset specific to a single vertical, ensuring high accuracy within that domain without requiring any additional configuration.",
      ],
      correctIndex: 1,
      explanation:
        "Foundation models derive their value from broad pre-training — they develop general language, reasoning, and world-knowledge capabilities that serve as a starting point for many tasks. Enterprises adapt them via system prompts, retrieval augmentation, or lightweight fine-tuning rather than training domain-specific models from zero each time.",
    },

    {
      id: "gam-04",
      scenario:
        "A marketing team at a retail company is using an LLM to generate product descriptions. " +
        "Their prompt reads: 'Write a product description.' The outputs are inconsistent — some are " +
        "one sentence, others are five paragraphs, and the tone varies wildly. The team lead calls " +
        "a workshop on improving their prompts. She tells the group that the single most impactful " +
        "change they can make is not to the model — it is to how they talk to it.",
      question:
        "Which prompt engineering technique would most reliably produce consistent, on-brand descriptions in this scenario?",
      options: [
        "Adding a one-shot example of a perfect description directly in the prompt, along with explicit constraints on tone, length, and required fields such as features and call to action.",
        "Increasing the model's temperature setting to above 1.0 so it explores a wider creative space and finds more distinctive phrasing on each attempt.",
        "Switching to a larger parameter-count model, because inconsistency is always a symptom of insufficient model capacity rather than a prompt quality issue.",
        "Splitting the single prompt into fifty separate prompts — one per product — and submitting them all in parallel to average out any variance in the outputs.",
      ],
      correctIndex: 0,
      explanation:
        "Few-shot prompting (providing one or more examples) combined with explicit constraints is the most direct fix for inconsistency. It anchors the model's output distribution around a concrete target format and style. Raising temperature increases randomness — the opposite of what's needed — and model size does not compensate for a vague instruction.",
    },

    {
      id: "gam-05",
      scenario:
        "A healthcare company integrates an LLM into their internal knowledge base. After deployment, " +
        "a nurse reports that the system confidently told her that a specific drug has no interactions " +
        "with warfarin — information that is factually incorrect and potentially dangerous. " +
        "The AI engineering team investigates and discovers the model was not malfunctioning; " +
        "it was doing exactly what LLMs do when they lack reliable grounding.",
      question:
        "What phenomenon explains why the model generated a confident but factually wrong answer, and what architectural approach best mitigates it?",
      options: [
        "Model drift — the model's weights degrade over time in production, and the fix is to schedule monthly retraining runs against updated medical literature.",
        "Prompt injection — a malicious user modified the system prompt to suppress safety filters, and the fix is stricter input sanitisation and role-based access controls on the prompt interface.",
        "Overfitting — the model memorised its training data too precisely and cannot generalise to real clinical questions; the fix is to reduce model size and apply aggressive dropout regularisation.",
        "Hallucination — the model produces plausible-sounding but fabricated information because it optimises for fluency rather than factual accuracy; RAG (Retrieval-Augmented Generation) mitigates this by grounding responses in verified source documents at query time.",
      ],
      correctIndex: 3,
      explanation:
        "Hallucination is the tendency of LLMs to generate factually incorrect but linguistically confident text. It arises because these models predict probable token sequences rather than retrieve verified facts. Retrieval-Augmented Generation (RAG) grounds each response in retrieved source documents, allowing the model to cite and reason over authoritative content rather than confabulate.",
    },

    {
      id: "gam-06",
      scenario:
        "An AI ethics board at a major bank is reviewing a Gen AI deployment that will auto-approve " +
        "or flag personal loan applications. The board's legal counsel raises the concern that the " +
        "model may perpetuate historical biases present in decades of past lending decisions " +
        "embedded in its fine-tuning data. The CTO argues that because the model was aligned with " +
        "RLHF, it is safe to deploy without additional controls.",
      question:
        "Why is the legal counsel's concern valid even for an RLHF-aligned model, and what governance control should the board require?",
      options: [
        "The concern is invalid because financial regulators worldwide have already approved RLHF-aligned models for automated lending decisions, making additional oversight redundant.",
        "The model should simply be retrained using only synthetic data so that no historical lending decisions influence its parameters, which completely eliminates the risk of embedded bias.",
        "RLHF alignment primarily targets helpfulness and harmlessness in conversational contexts; it does not audit or remove demographic biases in domain-specific training data, so independent bias audits and explainability requirements are necessary before production use in regulated decisions.",
        "RLHF alignment makes models completely unbiased because human raters explicitly review every potential decision the model could make before deployment.",
      ],
      correctIndex: 2,
      explanation:
        "RLHF aligns model behaviour to human preferences in general conversations but does not systematically detect or remove downstream biases in fine-tuning datasets. Lending decisions fall under regulations like the Equal Credit Opportunity Act (US) or similar frameworks worldwide. Governance controls must include bias audits across protected demographics, explainability mechanisms, and human-in-the-loop review for high-stakes decisions.",
    },

    {
      id: "gam-07",
      scenario:
        "A startup CTO is building a customer service chatbot using an external LLM API. During " +
        "architecture review, her team debates how to structure the integration. One engineer wants " +
        "to send the entire customer history — thousands of past interactions — in every API call. " +
        "Another argues this approach will have serious cost and latency consequences at scale " +
        "and proposes a different strategy.",
      question:
        "Which API integration pattern best balances context quality with cost and latency at scale for this customer service use case?",
      options: [
        "Remove all conversation history from API calls entirely and rely on the model's parametric memory alone, since well-trained LLMs retain factual knowledge about all prior interactions.",
        "Use a vector database to retrieve only the top-k most semantically relevant past interactions and inject them into a concise system prompt, keeping token usage bounded regardless of history length.",
        "Cache the entire model locally on-premise by downloading its weights, eliminating API call overhead and making token limits irrelevant for the customer history use case.",
        "Send the full multi-year conversation history with every API request to maximise the context window utilisation and guarantee the model never misses a relevant detail.",
      ],
      correctIndex: 1,
      explanation:
        "RAG-style retrieval from a vector database allows the system to inject only the most relevant historical context — keeping token counts predictable and bounded. Sending full history grows costs linearly with customer tenure and can exceed context limits. LLMs have no memory across API calls by default, and most commercial models are not available for local download.",
    },

    {
      id: "gam-08",
      scenario:
        "A head of engineering is designing a simple internal chatbot that lets employees query " +
        "the company HR policy handbook. He calls a team meeting and announces that the first " +
        "version should be a minimal proof of concept — no fine-tuning, no vector databases, just " +
        "a direct API integration that demonstrates value to leadership within two weeks.",
      question:
        "For this constrained timeline, which architecture represents the simplest viable chatbot that still answers policy questions accurately?",
      options: [
        "Build a knowledge graph of every HR policy, write a custom entity extraction pipeline, and use the graph as a structured backend the LLM queries via SPARQL.",
        "Train a BERT-based classification model on HR policy categories, route queries to the appropriate policy section, and append that section to a GPT prompt for answer generation.",
        "Embed the entire HR handbook as plain text in the system prompt of each API call so the model reasons directly over the authoritative source on every query.",
        "Fine-tune a 7-billion-parameter open-source model on the HR handbook, host it on a GPU server, and expose it via a REST endpoint behind the company VPN.",
      ],
      correctIndex: 2,
      explanation:
        "For a two-week POC with a small, bounded document like an HR handbook, embedding the document directly in a long system prompt is the simplest viable approach — no infrastructure, no vector stores, no custom training. It trades long-term scalability for immediate delivery, which is appropriate for a proof of concept. The other options require weeks of additional engineering.",
    },

    {
      id: "gam-09",
      scenario:
        "During a GenAI strategy workshop, a VP of Product asks the AI lead to explain the " +
        "concept of a context window in plain terms because she needs to communicate its " +
        "business implications — particularly around document processing and multi-turn conversations " +
        "— to non-technical stakeholders on the executive team.",
      question:
        "Which analogy most accurately conveys the business implication of a context window limit to a non-technical executive?",
      options: [
        "It is like the model's hard drive — a larger context window means the model has stored more facts during training and can answer a wider range of domain questions correctly.",
        "It is like the model's internet connection speed — a larger context window means the model retrieves information from external sources faster and with higher throughput during each query.",
        "It is like a software licence seat — each token consumed counts against a fixed annual allocation, and organisations must purchase additional context capacity in advance to avoid service interruption.",
        "It is like the model's RAM for a single conversation — everything the model can 'see and reason over' at once; once the conversation exceeds this limit, older content falls out of awareness, just as a consultant who can only hold the last N pages of a contract in view at any moment.",
      ],
      correctIndex: 3,
      explanation:
        "The context window is the model's active working memory for a single inference call — everything it can attend to simultaneously. When input exceeds this window, earlier content is truncated. The consultant analogy (only seeing N pages at once) is accurate and accessible: it conveys why very long documents must be chunked or retrieved selectively rather than fed in their entirety.",
    },

    // ── AGENTIC AI ────────────────────────────────────────────────

    {
      id: "gam-10",
      scenario:
        "A solutions architect is presenting two AI products to a logistics company. Product A " +
        "responds to questions about shipment status and generates polite replies. Product B " +
        "receives a request like 'delay all shipments to Zone 4 by two days,' then autonomously " +
        "checks the scheduling system, updates delivery windows, sends customer notifications, " +
        "flags the operations team, and confirms completion. The client asks what the architectural " +
        "difference is between the two products.",
      question:
        "What is the fundamental architectural distinction that separates an AI agent from a standard chatbot in this scenario?",
      options: [
        "The agent uses a larger language model with more parameters, which allows it to understand multi-step instructions that a smaller chatbot model would fail to parse correctly.",
        "The agent operates in a perceive-plan-act loop: it autonomously decomposes goals into sub-tasks, selects and invokes external tools or APIs across multiple steps, and pursues an objective with minimal human involvement between actions.",
        "The agent stores conversation history in a relational database, whereas a chatbot stores history in-memory only, making the agent capable of longer and more coherent dialogues.",
        "The agent is fine-tuned on logistics data specifically, which gives it domain expertise the general-purpose chatbot lacks, enabling it to take actions the chatbot was never trained to perform.",
      ],
      correctIndex: 1,
      explanation:
        "An AI agent is defined by its autonomous, multi-step action loop — it perceives the environment, plans a sequence of steps, and invokes external tools to effect real change in the world. A chatbot generates text responses within a conversation. The distinction is not model size or fine-tuning; it is the ability to take consequential actions through tool use across multiple reasoning cycles.",
    },

    {
      id: "gam-11",
      scenario:
        "A VP of Engineering is whiteboarding an agentic AI system with her team. She draws three " +
        "boxes: 'Brain,' 'Hands,' and 'Memory.' She explains that the 'Brain' decides what to do, " +
        "the 'Hands' interact with the outside world, and 'Memory' ensures the agent does not " +
        "forget critical context between steps. A new engineer asks what the standard industry " +
        "terminology is for each of these architectural components.",
      question:
        "Which mapping correctly aligns the VP's metaphor to the standard agent architecture components?",
      options: [
        "Brain = Vector Database, Hands = LLM Inference Engine, Memory = System Prompt — the prompt holds all reasoning logic and the database executes actions.",
        "Brain = Fine-tuned domain model, Hands = Output parser, Memory = Retrieval-Augmented Generation pipeline that fetches knowledge on every step.",
        "Brain = Planning and Reasoning module (the LLM), Hands = Tool Use layer (APIs, code execution, browser), Memory = Short-term context plus long-term external stores like vector DBs or databases.",
        "Brain = Orchestration framework like LangChain, Hands = Embedding model, Memory = The tokeniser that converts past actions into numerical representations for the LLM.",
      ],
      correctIndex: 2,
      explanation:
        "Standard agent architecture maps directly: the LLM serves as the reasoning and planning core; tools (APIs, browsers, code executors) are the action layer that lets the agent affect external systems; memory spans in-context history (short-term) and persistent stores like vector databases or relational databases (long-term). This three-component model is consistent across frameworks like LangChain, AutoGPT, and CrewAI.",
    },

    {
      id: "gam-12",
      scenario:
        "A backend engineer is integrating a travel booking agent. When a user asks it to 'book " +
        "the cheapest flight to Berlin next Friday under £400,' the agent needs to call a live " +
        "flight search API. The engineer realises the model cannot call the API on its own — " +
        "the application code must mediate between the model's output and the actual HTTP request. " +
        "She needs to design this interface correctly for the agent to work.",
      question:
        "What mechanism allows the LLM to request that the application invoke a specific external function, and how does the result flow back into the agent's reasoning?",
      options: [
        "The engineer writes an if-else rule that scans the model's text output for flight-related keywords and triggers the API call automatically, without the model needing to be aware of tool schemas.",
        "The application sends every user message to the flight API before it reaches the model, pre-fetching all possible flight data so the model never needs to call external tools itself.",
        "The LLM is given a schema of available tools and, when it decides a tool is needed, outputs a structured tool-call payload (function name and arguments); the application executes the actual call and injects the result back into the conversation context for the model to continue reasoning.",
        "The LLM modifies its own weights at runtime to embed the API's authentication credentials, enabling it to send HTTP requests directly without application mediation.",
      ],
      correctIndex: 2,
      explanation:
        "Function calling (also called tool use) works through a formal protocol: the LLM is given a JSON schema describing available tools and their parameters. When the model determines a tool is necessary, it returns a structured tool-call object instead of prose. The host application then executes the real function, captures the result, and appends it to the conversation for the model to synthesise — creating a closed reasoning loop.",
    },

    {
      id: "gam-13",
      scenario:
        "A data science team is evaluating agent orchestration frameworks for a research automation " +
        "project. Their lead presents two options: LangChain, which offers a rich ecosystem of " +
        "pre-built integrations and abstractions, and CrewAI, which introduces the concept of " +
        "multiple specialised agents collaborating under defined roles. The team needs to choose " +
        "based on their use case: automating a complex research pipeline where different subtasks " +
        "require different expertise.",
      question:
        "For a multi-step research pipeline that benefits from specialisation and delegation, which framework concept is most architecturally appropriate and why?",
      options: [
        "Neither framework; instead, deploy a separate fine-tuned model for each research sub-task and use a message queue to pass outputs between models without any orchestration layer.",
        "A single monolithic LangChain agent with every tool registered simultaneously, because having one agent with access to all capabilities eliminates coordination overhead between specialised agents.",
        "LangChain's sequential chain pattern, where each step passes its full output to the next as a simple string, making the pipeline easy to debug because all state is visible in plain text at every node.",
        "CrewAI's multi-agent crew model, where each agent is assigned a distinct role and backstory, enabling specialised reasoning and parallel execution of sub-tasks with explicit delegation between agents.",
      ],
      correctIndex: 3,
      explanation:
        "CrewAI's crew model was designed precisely for multi-agent collaboration with specialisation. Each agent has a defined role, goal, and backstory that shapes its reasoning focus — a researcher agent, a writer agent, a critic agent can work in parallel or sequence. This mirrors real team workflows and outperforms a single overloaded agent on complex, multi-domain tasks where context fragmentation becomes a bottleneck.",
    },

    {
      id: "gam-14",
      scenario:
        "An enterprise AI team is deploying a customer support agent that handles thousands of " +
        "conversations per day. After a month in production, they notice the agent repeatedly " +
        "asks customers for information they already provided in a previous session — for example, " +
        "their account tier, preferred communication channel, and past issue history. Customers " +
        "are frustrated. The engineering manager traces the problem to the agent's memory design.",
      question:
        "What is the distinction between short-term and long-term agent memory, and which is missing in this scenario?",
      options: [
        "Short-term memory is the system prompt; long-term memory is an external cache of the last 10 user messages. Adding a Redis cache of recent messages for each user will completely resolve cross-session continuity.",
        "Short-term memory is the active context window of the current conversation; long-term memory is persistent storage — such as a database or vector store — that survives across sessions. The agent lacks long-term memory: it cannot retrieve user preferences or history from previous conversations.",
        "Short-term memory is the tool call history within one turn; long-term memory is a summary of the current conversation stored in a cookie on the user's browser, which the agent reads at session start.",
        "Short-term memory is the model's parameter count; long-term memory is the fine-tuning dataset. The team should fine-tune the model on customer transcripts so it permanently remembers individual users.",
      ],
      correctIndex: 1,
      explanation:
        "Short-term memory is the in-context information available during a single conversation. Long-term memory is externalised persistent storage — a database or vector store — that the agent can write to and retrieve from across sessions. The missing component is long-term memory: without a persistent user profile store, each new session starts blank, causing the frustrating repetition described.",
    },

    {
      id: "gam-15",
      scenario:
        "A fintech company has deployed a multi-agent system where an Orchestrator agent breaks " +
        "large financial analysis tasks into sub-tasks and dispatches them to specialised Worker " +
        "agents — one for market data, one for regulatory compliance, one for client profiling. " +
        "During a quarterly review, the risk team asks how the company ensures that no single " +
        "agent can unilaterally take a high-stakes action like executing a trade or sending a " +
        "regulatory filing without review.",
      question:
        "Which safety pattern in multi-agent system design addresses the risk of unilateral high-stakes actions by autonomous agents?",
      options: [
        "Using a single large orchestrator agent instead of multiple specialised agents, because a monolithic agent is easier to audit since all decisions are concentrated in one place.",
        "Logging every agent action to an append-only audit trail after execution, which allows the risk team to review and reverse any problematic actions during the weekly compliance review cycle.",
        "Implementing human-in-the-loop checkpoints and permission boundaries: irreversible or high-stakes actions require explicit human approval before execution, and agents operate within scoped tool access that prevents them from invoking capabilities outside their designated role.",
        "Giving every agent an identical copy of all available tools so that if one agent fails, another can complete the task autonomously without any interruption to the workflow.",
      ],
      correctIndex: 2,
      explanation:
        "Human-in-the-loop checkpoints and least-privilege tool scoping are the standard safety patterns for high-stakes agentic systems. Agents should be unable to invoke capabilities beyond their defined role, and actions that are irreversible — trades, filings, payments — should pause for explicit human approval. Post-hoc audit logs are necessary but insufficient; they cannot prevent harm, only document it.",
    },

    {
      id: "gam-16",
      scenario:
        "A product team building a legal research agent notices that when asked to summarise a " +
        "hundred-page contract, the agent loses track of conclusions it reached about clause 12 by " +
        "the time it reaches clause 87, and sometimes contradicts its own earlier analysis. " +
        "The team identifies that the problem is structural — not a model quality issue — " +
        "and begins redesigning the agent's approach to long-document reasoning.",
      question:
        "What agent design pattern best addresses the challenge of maintaining coherent reasoning across a document that exceeds the model's single-context window?",
      options: [
        "Convert the contract to a relational schema and store each clause as a database row, then instruct the agent to issue SQL queries for clauses on demand — eliminating the need for any summarisation logic.",
        "Ask the model to read the document backwards from clause 100 to clause 1, since LLMs have demonstrated better recall of content that appears at the end of their context window.",
        "Increase the API request timeout to allow the model more wall-clock time to process the full document in a single uninterrupted inference call before returning the summary.",
        "Map-reduce over chunks: split the document into sections, run a focused analysis pass on each chunk independently, store intermediate summaries in an external memory store, then run a final reduce pass that synthesises all summaries into a coherent whole.",
      ],
      correctIndex: 3,
      explanation:
        "The map-reduce pattern is the standard agent approach for documents exceeding the context window. Each chunk is processed independently in a 'map' pass, producing intermediate summaries stored externally. A final 'reduce' pass synthesises these summaries into a coherent whole. This preserves analytical quality across document length without requiring the entire document to fit in a single context.",
    },

    {
      id: "gam-17",
      scenario:
        "A team of AI engineers at a healthcare startup is building an agent that automates prior " +
        "authorisation requests to insurance companies — a notoriously time-consuming administrative " +
        "process that currently takes clinic staff up to three hours per patient. The agent can " +
        "query EHR systems, fill forms, check payer guidelines, and submit requests. " +
        "The clinical operations director is excited but asks the team to clarify what safeguards " +
        "prevent the agent from submitting an incorrect or fraudulent authorisation autonomously.",
      question:
        "Which combination of safety guardrails is most appropriate for a high-stakes autonomous agent operating in a regulated healthcare administrative process?",
      options: [
        "Use a second LLM as a critic agent that reads the first agent's output and approves or rejects it automatically, creating a fully automated two-agent review loop with no human involvement required.",
        "Apply least-privilege tool scoping (read-only EHR access until a clinician approves submission), build confidence thresholds that escalate low-certainty decisions to human review, maintain a full audit log of every agent action, and require clinician sign-off before any external submission.",
        "Run the agent in shadow mode indefinitely — it generates the authorisation request but never submits it, and a human re-enters the data manually into the payer portal, defeating automation but preserving safety.",
        "Disable all tool permissions by default and require a human to manually re-enable each tool before every individual agent run, ensuring full manual oversight of every single action the agent takes.",
      ],
      correctIndex: 1,
      explanation:
        "High-stakes regulated processes require layered guardrails: least-privilege access prevents the agent from acting beyond its sanctioned scope; confidence thresholds route uncertain cases to humans; audit logs satisfy regulatory requirements; and clinician sign-off ensures a qualified professional takes legal responsibility for each submission. Shadow mode and manual re-entry eliminate the efficiency gain; a second LLM still doesn't provide human accountability.",
    },

    {
      id: "gam-18",
      scenario:
        "An engineering lead is giving a knowledge transfer session on agent limitations to a " +
        "product team that is enthusiastically planning to automate a complex multi-department " +
        "business workflow entirely with agents. The engineering lead wants to temper expectations " +
        "by explaining the scenarios where current agentic systems consistently struggle, " +
        "even when built with state-of-the-art models.",
      question:
        "Which scenario most accurately represents a genuine limitation of current agentic AI systems that the product team should factor into their planning?",
      options: [
        "Agents can only operate on tasks explicitly listed in their training data, so any novel business process introduced after the model's training cutoff date is completely outside the agent's capability.",
        "Agents require a dedicated GPU cluster to run locally and cannot function through cloud API calls, making them prohibitively expensive for any company without significant on-premise hardware investment.",
        "Agents are susceptible to error compounding over long task horizons — a small misstep in an early reasoning step can cascade into incorrect downstream actions, and the system may not self-correct without explicit checkpoints or verification steps.",
        "Agents cannot process structured data formats like JSON or CSV, limiting them exclusively to unstructured natural language inputs and preventing integration with any existing enterprise data systems.",
      ],
      correctIndex: 2,
      explanation:
        "Error compounding — or 'error propagation' — is one of the most documented challenges in agentic systems. Unlike a single-turn chatbot where a mistake affects one response, an agent that makes a flawed assumption in step two may execute ten subsequent steps based on that flawed premise, producing a deeply incorrect final outcome. Well-designed agents include verification checkpoints, intermediate result validation, and rollback mechanisms to address this.",
    },

    // ── MCP ───────────────────────────────────────────────────────

    {
      id: "gam-19",
      scenario:
        "A principal engineer at a software consultancy is reading Anthropic's announcement of the " +
        "Model Context Protocol. She is trying to understand whether this is simply another " +
        "proprietary SDK or something with broader industry implications. She calls a team huddle " +
        "to discuss the protocol's purpose and asks someone to explain what fundamental problem " +
        "MCP was designed to solve in the AI integration landscape.",
      question:
        "What core integration problem does MCP address, and why does it matter for organisations building AI-powered applications across multiple tools and data sources?",
      options: [
        "MCP addresses the hallucination problem by implementing a cryptographic verification layer that cross-references every model output against a trusted facts registry before returning a response.",
        "MCP is a fine-tuning specification that standardises how organisations submit domain-specific training data to Anthropic, ensuring consistent model improvement across enterprise customers.",
        "MCP solves the compute cost problem by compressing model weights during inference, allowing large models to run on consumer hardware without performance degradation.",
        "MCP provides a standardised, open protocol for connecting AI models to external context sources — files, databases, APIs, tools — replacing the current fragmented landscape where every integration requires custom, one-off connector code.",
      ],
      correctIndex: 3,
      explanation:
        "MCP (Model Context Protocol) was created to solve the 'M×N integration problem': without a standard, every AI application needs custom connectors for every data source and tool it uses. MCP defines a universal client-server protocol — similar to how LSP standardised editor-to-language-server communication — so a model client can connect to any MCP-compliant server without bespoke integration code.",
    },

    {
      id: "gam-20",
      scenario:
        "A solutions architect is designing an AI assistant that needs to read files from a company " +
        "SharePoint drive, query a PostgreSQL database, and call a weather API — all in response to " +
        "a single natural language request. Without a standard protocol, her team would need to " +
        "write three separate custom integrations. She proposes adopting MCP instead and presents " +
        "the architectural diagram to her team, who ask her to explain how MCP components map " +
        "to the three data sources.",
      question:
        "In MCP architecture, what are the roles of the Host, the Client, and the Server, and how do they interact in this three-source scenario?",
      options: [
        "The Host is Anthropic's cloud infrastructure, the Client is the company's on-premise server, and the MCP Server is a proxy that translates requests between Claude's proprietary format and the company's REST APIs.",
        "The Host is the AI application (e.g., Claude Desktop or a custom app) that manages the session; the MCP Client is the protocol layer embedded in the Host that speaks MCP; and each MCP Server is a lightweight process that exposes a specific context source — one for SharePoint, one for Postgres, one for weather — all using a uniform interface.",
        "The Host and Client are the same component — the LLM model itself — and the three Servers are microservices that push data proactively to the model's context window on a scheduled refresh interval.",
        "The Host is the PostgreSQL database, the Client is the SharePoint drive, and the Server is the weather API — MCP simply relabels existing enterprise infrastructure with new protocol-specific names.",
      ],
      correctIndex: 1,
      explanation:
        "MCP defines three roles: the Host is the AI application that the user interacts with and that initiates MCP connections; the Client is the MCP-protocol-speaking module embedded in the Host; and each Server is an independent, lightweight process that exposes a specific resource (files, database, API) through a standardised MCP interface. The Host can connect to multiple Servers simultaneously — one per data source — without custom integration code for each.",
    },

    {
      id: "gam-21",
      scenario:
        "A backend engineer who has been building REST APIs for ten years is being introduced to MCP " +
        "for the first time. He pushes back: 'We already have REST APIs. Every system exposes a " +
        "REST endpoint. Why do I need yet another protocol layer on top of what already works? ' " +
        "The AI platform lead needs to explain the specific ways MCP differs from a traditional " +
        "REST API in an AI context.",
      question:
        "What is the most accurate articulation of how MCP differs from a traditional REST API, specifically in the context of AI model integration?",
      options: [
        "MCP replaces REST entirely and is incompatible with HTTP, requiring organisations to migrate all existing API infrastructure to a new transport layer before any AI integration is possible.",
        "MCP is faster than REST because it uses binary serialisation instead of JSON, reducing payload size and network latency for high-throughput AI workloads in production environments.",
        "Unlike REST, which requires the client to know in advance exactly which endpoints to call and how to interpret responses, MCP servers self-describe their capabilities through a discovery mechanism — the model can dynamically learn what tools and resources are available and invoke them without hard-coded endpoint logic in the application.",
        "MCP is simply a RESTful API with stricter OpenAPI schema validation, ensuring that AI models receive well-formed JSON responses and never encounter malformed data from integrated backend services.",
      ],
      correctIndex: 2,
      explanation:
        "The critical difference is capability discovery and dynamic invocation. A REST API requires the calling application to have prior knowledge of every endpoint, request schema, and response format — that knowledge is hard-coded. MCP servers advertise their tools, resources, and prompts at connection time, so the AI model (via the client) can discover and invoke capabilities dynamically without requiring the host application to be updated for each new server.",
    },

    {
      id: "gam-22",
      scenario:
        "A data engineering team at a media company is evaluating which types of MCP servers to " +
        "build first for their new AI content platform. Their AI assistant needs to access the " +
        "company's digital asset library (stored in Azure Blob Storage), query their MySQL content " +
        "database for article metadata, and fetch trending topic data from an external social " +
        "listening API. The team lead asks the engineers to categorise these three integrations " +
        "by MCP server type before they begin development.",
      question:
        "How should the team categorise these three integrations into the recognised MCP server types?",
      options: [
        "Azure Blob Storage maps to a File/Resource MCP Server; the MySQL database maps to a Database MCP Server; and the social listening API maps to a Web/API MCP Server — each server type exposes a different class of context source through a common MCP interface.",
        "The categorisation does not matter architecturally — all MCP servers expose identical interfaces, so the type label is purely documentary and has no bearing on implementation or capability exposure.",
        "Azure Blob Storage and MySQL are both Storage MCP Servers because they persist data, while the social API is a Compute MCP Server because it performs live processing before returning results.",
        "All three are Database MCP Servers because they ultimately return structured data that the model will process, regardless of whether the underlying source is a file store, SQL database, or web API.",
      ],
      correctIndex: 0,
      explanation:
        "MCP server types reflect the nature of the underlying resource: File/Resource servers expose file systems or blob stores where the model can read and navigate documents; Database servers expose structured query interfaces over relational or vector stores; and Web/API servers wrap external HTTP services. These distinctions inform implementation choices — connection handling, authentication patterns, and the shape of tools and resources exposed.",
    },

    {
      id: "gam-23",
      scenario:
        "A developer advocate at a software company is running a workshop on building a minimal MCP " +
        "server. An attendee has a directory of Markdown documentation files and wants Claude to " +
        "be able to read any file from that directory in response to natural language questions. " +
        "The developer advocate walks the group through what the server needs to expose so that " +
        "a connected MCP client can discover and invoke the file-reading capability.",
      question:
        "When building a file-based MCP server, what are the three primary primitives the server should expose, and what does each enable?",
      options: [
        "Streams, Webhooks, and Callbacks — the three asynchronous communication patterns required because file I/O is inherently slow and MCP mandates non-blocking server implementations for all resource types.",
        "Embeddings, Indexes, and Retrievers — the three components of a retrieval pipeline, since a file MCP server must pre-embed all documents and serve the model vector similarity results rather than raw file contents.",
        "Endpoints, Schemas, and Responses — the same three primitives as a standard REST API, since MCP is built on REST conventions and inherits its resource model directly.",
        "Tools (executable functions the model can invoke, such as read_file or list_directory), Resources (static or dynamic content the model can read directly, such as file contents), and Prompts (pre-defined templates that help the model interact with the server correctly).",
      ],
      correctIndex: 3,
      explanation:
        "MCP defines three core primitives: Tools are callable functions — actions the model can request the server to execute (read a file, run a query, call an API); Resources are data objects the model can access directly, similar to GET endpoints; and Prompts are server-defined templates that guide how the model should interact with the server's capabilities. Together, they give the model structured access to the server's full capability surface.",
    },

    {
      id: "gam-24",
      scenario:
        "An AI platform team has built an MCP server that gives Claude access to the company's " +
        "internal project management database. During a security review, the information security " +
        "officer raises several concerns: the server has read-write access to production data, " +
        "there is no audit trail of which model sessions accessed which records, and there are no " +
        "rate limits preventing a runaway agent from overwhelming the database. She asks the team " +
        "to present a remediation plan before the server goes live.",
      question:
        "Which combination of security controls should the MCP server implement to satisfy the information security officer's concerns?",
      options: [
        "Move the production database to a private subnet with no external network access, which prevents the MCP server from reaching it and therefore eliminates the attack surface without changing any server code.",
        "Implement read-only tool scoping by default with explicit write-permission elevation; enforce per-session audit logging of every tool invocation and resource access; apply rate limiting and query result size caps; and require OAuth or API authentication before the MCP client can establish a connection.",
        "Add a second MCP server that acts as a security proxy, forwarding all requests from the first server to the database while inserting a 500ms delay between requests to throttle throughput and deter automated abuse.",
        "Disable the MCP server entirely and revert to a human manually copying relevant database excerpts into Claude's context window before each session, which eliminates all automated data access risk.",
      ],
      correctIndex: 1,
      explanation:
        "Secure MCP server design follows least-privilege principles: tools should default to read-only with explicit escalation for writes; every tool call and resource access should be logged with session context for auditability; rate limiting and result-size caps protect the backend from inadvertent or malicious overload; and authentication ensures only authorised clients can connect. These controls address each of the security officer's concerns systematically.",
    },

    {
      id: "gam-25",
      scenario:
        "A principal engineer at a SaaS company is integrating Claude with their product using MCP. " +
        "She wants Claude to be able to create support tickets, update CRM records, and send " +
        "notifications via Slack — all triggered by natural language requests from internal users. " +
        "Her junior colleague asks how Claude 'knows' which MCP tools are available and when to " +
        "invoke them, since the engineer hasn't written any explicit if-else routing logic.",
      question:
        "How does Claude discover and decide to invoke MCP tools at runtime without explicit routing logic in the host application?",
      options: [
        "Claude makes a preliminary API call to a separate tool-routing model that classifies the user's intent and returns the correct tool name, which is then passed to Claude as part of the system prompt for each request.",
        "The host application pre-processes every user message with a regex classifier that identifies action verbs, maps them to tool names in a lookup table, and injects the selected tool name into Claude's context before Claude ever sees the user's message.",
        "On connection, the MCP client negotiates with the server and receives a manifest of available tools — each with a name, description, and input schema; Claude reads these descriptions and autonomously decides, based on the user's intent and the tool descriptions, which tool to invoke and with what parameters.",
        "The engineer must register every possible user intent as a keyword trigger in Claude's system prompt, and Claude matches user input against these triggers to select the appropriate tool call.",
      ],
      correctIndex: 2,
      explanation:
        "MCP's capability discovery mechanism is central to its power. When the client connects to the server, it calls list_tools (and list_resources, list_prompts) to receive a manifest of everything the server exposes — including natural language descriptions of each tool's purpose and a JSON schema for its parameters. Claude uses these descriptions as context to autonomously decide which tool to call, when, and with what arguments — no hard-coded routing logic required.",
    },

    {
      id: "gam-26",
      scenario:
        "An enterprise architect is building the business case for adopting MCP across their " +
        "organisation's AI tooling stack. She anticipates the question: 'If we invest in building " +
        "MCP servers for our ten core data systems, what do we get back?' She needs to articulate " +
        "the strategic compounding benefit — specifically what happens as the number of AI " +
        "applications and data sources in the organisation grows over time.",
      question:
        "What is the strategic compounding value of MCP adoption as an organisation's AI application portfolio and data source inventory both grow?",
      options: [
        "MCP enforces a hard limit of ten concurrent server connections per host application, which incentivises organisations to consolidate data sources and reduces architectural complexity by preventing sprawl.",
        "Each new MCP server reduces the token cost of all existing AI applications because the protocol compresses context before transmission, so integration costs fall as the network grows.",
        "The value is primarily vendor lock-in avoidance — MCP guarantees that any model from any provider can replace Claude without code changes, making the AI stack fully model-agnostic from day one.",
        "MCP transforms the integration topology from M×N (every app needs a custom connector to every data source) to M+N (each app connects to MCP, each source exposes an MCP server) — so adding one new data source immediately makes it available to all existing AI apps, and vice versa.",
      ],
      correctIndex: 3,
      explanation:
        "The M×N to M+N transformation is MCP's core strategic value proposition, analogous to how USB standardised peripheral connectivity. Without a standard, ten AI apps integrating with ten data sources requires up to 100 custom connectors. With MCP, each of the ten apps implements one MCP client and each of the ten data sources implements one MCP server — 20 implementations, and every combination works automatically. The value compounds with every addition.",
    },

    {
      id: "gam-27",
      scenario:
        "A startup is demonstrating a product where Claude, running inside their application, can " +
        "directly open, read, and create files on a user's local filesystem, execute terminal " +
        "commands, and interact with locally running databases — all from within what appears to " +
        "be a standard chat interface. An investor watching the demo asks the technical founder how " +
        "Claude is reaching outside the browser sandbox to interact with local system resources.",
      question:
        "What MCP transport mechanism enables an AI model to interact with resources on a user's local machine that are inaccessible to a standard web application?",
      options: [
        "Claude's cloud inference API has a special elevated-privilege mode that receives filesystem paths and executes operations directly on the user's machine through a secure tunnel Anthropic maintains to each registered client device.",
        "A local MCP server process runs on the user's machine and communicates with the host application via stdio (standard input/output) or a local socket; the host app relays tool requests from Claude to this local server, which executes them with native OS access and returns results.",
        "The application is a native desktop app that embeds a full browser engine — the browser engine handles all local system access and Claude simply outputs JSON commands that the engine's built-in interpreter executes.",
        "The application uses WebAssembly compiled at runtime to bypass browser security restrictions and directly invoke native OS system calls from within the browser tab.",
      ],
      correctIndex: 1,
      explanation:
        "Local MCP servers solve the sandbox problem by running as a native process on the user's machine with full OS-level permissions. They communicate with the host application via stdio or a local socket — the host relays Claude's tool-call requests to the local server and returns results. This is how Claude Desktop enables local file system, terminal, and database access: the model never directly touches the OS; it invokes a local MCP server that does.",
    },

    {
      id: "gam-28",
      scenario:
        "A technical team is evaluating real-world use cases for MCP deployment and is building a " +
        "prioritised list of the highest-ROI integrations to develop first. Their AI model will " +
        "serve both internal operations teams and customer-facing support agents. The team wants " +
        "to identify use cases where giving the model real-time, structured access to live systems " +
        "via MCP dramatically outperforms a static prompt with manually pasted data.",
      question:
        "Which use case most powerfully demonstrates MCP's advantage over a static-context approach, and why?",
      options: [
        "Answering general knowledge questions about the company's industry, because MCP's web server fetches Wikipedia articles faster than the model's parametric knowledge can retrieve the same facts.",
        "Drafting marketing emails, because MCP's file server ensures the model always uses the latest brand guidelines document rather than relying on guidelines that may have been pasted into the system prompt weeks ago.",
        "An operational troubleshooting assistant that, when a production alert fires, autonomously queries the live metrics database, retrieves recent deployment logs, cross-references the error registry, and synthesises a root-cause hypothesis — all within seconds, using real-time data that would be stale or unavailable in a static prompt.",
        "Summarising a PDF document the user uploads at the start of a session, because MCP's file server can read PDFs more accurately than pasting the extracted text into a prompt.",
      ],
      correctIndex: 2,
      explanation:
        "The operational troubleshooting scenario illustrates MCP's transformative value: it requires multiple live data sources, real-time state, and cross-system synthesis — exactly what MCP's dynamic context retrieval enables. Static prompt pasting cannot scale to this use case because data volumes are large, change by the second, and span systems that must be queried in response to unknown future conditions. MCP makes this reactive intelligence possible.",
    },

    {
      id: "gam-29",
      scenario:
        "A security researcher is auditing an organisation's MCP deployment and presents a threat " +
        "model to the engineering team. She identifies a specific attack vector: a malicious actor " +
        "could craft a document or web page that, when read by the AI through an MCP file or web " +
        "server, contains embedded instructions designed to hijack the model's subsequent actions — " +
        "for example, instructing it to exfiltrate data or call tools it was not explicitly asked to use.",
      question:
        "What is this class of attack called, and what server-side and application-level controls best defend against it in an MCP deployment?",
      options: [
        "A denial-of-service attack — the defence is rate limiting on all MCP server endpoints and circuit breakers that temporarily disable overloaded servers when request volume exceeds a configured threshold.",
        "A man-in-the-middle attack — the defence is mutual TLS between the MCP client and server so that any intercepted content is encrypted and cannot be modified in transit without detection by the certificate validation layer.",
        "A SQL injection attack — the defence is parameterised queries on all database MCP servers and strict input validation on every tool argument before it reaches the underlying data store.",
        "A prompt injection attack — defences include sandboxing tool execution so data retrieved from external sources is clearly demarcated from instructions, applying output filtering to detect anomalous tool invocations, using the principle of least privilege so injected instructions cannot invoke high-impact tools, and presenting suspicious content to a human reviewer before acting on it.",
      ],
      correctIndex: 3,
      explanation:
        "Prompt injection via retrieved content is a recognised threat in agentic and MCP systems. When a model reads external content through a tool, adversarial instructions embedded in that content may be interpreted as legitimate commands. Defences include clear architectural demarcation between data and instructions, output monitoring for anomalous tool calls, least-privilege tool scoping that limits what injected instructions can actually trigger, and human review gates for high-impact actions.",
    },

    {
      id: "gam-30",
      scenario:
        "An AI platform lead is preparing a set of MCP best practices to share with eight development " +
        "teams across her organisation before they each begin building their own MCP servers. " +
        "She wants to distil the most impactful guidance into a concise set of principles that " +
        "will prevent the most common production problems — from security incidents to poor " +
        "performance to unreliable tool descriptions that cause the model to invoke the wrong tool.",
      question:
        "Which set of MCP server best practices addresses the broadest range of production risks across security, reliability, and model behaviour quality?",
      options: [
        "Build one universal MCP server per organisation that aggregates all data sources into a single endpoint, since fewer servers means fewer authentication surfaces, simpler maintenance, and lower orchestration overhead for connected AI hosts.",
        "Write precise, unambiguous tool descriptions because the model uses them to decide when and how to invoke each tool; apply least-privilege access controls; implement idempotent tool design so retries are safe; version server capabilities explicitly to avoid breaking connected hosts; and instrument every tool call with logging for observability and incident response.",
        "Prioritise synchronous blocking tool implementations over asynchronous patterns, because LLMs expect immediate responses and cannot handle tools that return results via callbacks or polling mechanisms.",
        "Always expose the maximum number of tools per server, write the shortest possible tool descriptions to minimise token usage, and share authentication credentials between servers to simplify key management.",
      ],
      correctIndex: 1,
      explanation:
        "The five practices in the correct option each address a distinct production risk: precise tool descriptions prevent the model from misidentifying when to invoke a tool; least privilege limits blast radius of compromise; idempotency ensures retry safety in unreliable networks; explicit versioning prevents silent breaking changes; and comprehensive logging enables debugging and incident response. A universal mega-server is an antipattern — it creates a single point of failure and a massive attack surface.",
    },
  ],
};
