const genset1 = {
  meta: {
    id: "genai-advanced-v1",
    testTitle: "Generative AI: Advanced Production Scenarios",
    topic: "agentic-ai",
    topicLabel: "LLM Engineering & Ops",
    difficulty: "Advanced",
    questionCount: 20,
    estimatedMinutes: 45,
    description:
      "Complex narratives covering RAG evaluation, fine‑tuning trade‑offs, prompt injection, cost governance, and multi‑modal alignment.",
    icon: "🧠",
  },
  questions: [
    {
      id: "genai-01",
      scenario:
        "Your team deploys a RAG chatbot for internal HR policies. After two weeks, users complain that answers are increasingly outdated, though the vector database is updated nightly. Logs show the retrieval step consistently returns chunks from six months ago.",
      question:
        "What is the most likely root cause, and which remediation should be prioritised?",
      options: [
        "The embedding model was never fine‑tuned on HR documents – switch to a larger off‑the‑shelf model.",
        "The chunking strategy creates large overlapping segments, biasing relevance scores toward older paragraphs – implement sliding‑window chunking with recency weighting.",
        "The LLM’s context window truncates newer chunks – increase the max tokens parameter.",
        "The retrieval top‑k is set too low – increase k from 5 to 20 without other changes.",
      ],
      correctIndex: 1,
      explanation:
        "Older chunks may be larger or contain more keyword density. A sliding window with recency weighting (e.g., timestamp‑based boost) ensures fresher content is preferred, while overlapping chunks preserve continuity.",
    },
    {
      id: "genai-02",
      scenario:
        "A financial services firm uses GPT‑4 to summarise earnings calls. Legal mandates that no confidential information (e.g., unannounced M&A) leaves the VPC. The current pipeline sends full call transcripts to the LLM API.",
      question:
        "Which architectural change best balances confidentiality and summarisation quality?",
      options: [
        "Move to an open‑source model hosted on‑premises and fine‑tune it on public earnings call data only.",
        "Use a local small language model (SLM) with PII/secret redaction, then send only anonymised excerpts to a cloud LLM for final polish.",
        "Encrypt the transcript with a customer‑managed key and send it to the LLM provider’s dedicated tenant.",
        "Abandon LLM summarisation and rely on human analysts with NDAs.",
      ],
      correctIndex: 1,
      explanation:
        "An SLM can redact sensitive entities locally. Sending only anonymised, non‑confidential excerpts to a more capable cloud LLM reduces legal exposure while preserving output quality – a common hybrid approach in regulated industries.",
    },
    {
      id: "genai-03",
      scenario:
        "A product team launches an LLM‑based code assistant. Within a month, cloud costs triple due to high token usage. You discover that 40% of calls are identical repeated questions from the same users.",
      question:
        "What two interventions would most directly reduce cost without degrading user experience?",
      options: [
        "Implement semantic caching with a similarity threshold and introduce a rate limit per user per minute.",
        "Downgrade to a smaller model for all queries and reduce the maximum output tokens.",
        "Remove the system prompt and disable tool calling to save prompt tokens.",
        "Switch to a batch processing mode where users wait 24 hours for answers.",
      ],
      correctIndex: 0,
      explanation:
        "Semantic caching serves exact or near‑duplicate queries from cache, drastically reducing API calls. Per‑user rate limits prevent abuse while allowing normal usage. Neither hurts answer quality for legitimate unique questions.",
    },
    {
      id: "genai-04",
      scenario:
        "Your marketing team wants to generate 10,000 personalised product descriptions. A single prompt with all product attributes frequently produces repetitive, templated output.",
      question:
        "Which technique most effectively increases diversity while keeping each description factual?",
      options: [
        "Set temperature = 0.9 and top_p = 1.0, then post‑filter duplicates.",
        "Use chain‑of‑thought prompting that first lists 3 unique angles for the product, then writes the description based on a randomly selected angle.",
        "Fine‑tune a model on only one example product and reuse it for all.",
        "Lower frequency_penalty and presence_penalty to zero.",
      ],
      correctIndex: 1,
      explanation:
        "Chain‑of‑thought that explicitly generates multiple angles before writing forces the model to consider distinct perspectives, increasing factual diversity without hallucination. Randomly selecting an angle further decorrelates outputs.",
    },
    {
      id: "genai-05",
      scenario:
        "A healthcare chatbot passes all unit tests but in production starts suggesting unverified herbal remedies for serious conditions. Unit tests only checked grammatical correctness and refusal of obvious harm (e.g., ‘jump off a bridge’).",
      question: "What missing evaluation dimension allowed this failure?",
      options: [
        "Lack of toxicity scoring on output.",
        "Absence of ‘faithfulness’ and ‘clinical alignment’ metrics verified against a ground truth knowledge base.",
        "No adversarial testing with jailbreak prompts like ‘ignore previous instructions’.",
        "The model was not fine‑tuned on medical data.",
      ],
      correctIndex: 1,
      explanation:
        "Faithfulness measures whether the answer is strictly derived from the trusted knowledge base. Clinical alignment checks recommendations against official guidelines. Simple grammar or toxicity checks do not catch factual errors about treatment.",
    },
    {
      id: "genai-06",
      scenario:
        "You run a prompt that works well with GPT‑4 Turbo but fails when you switch to a cheaper, faster model (e.g., GPT‑3.5 Turbo). The failure is that the model omits important steps in a multi‑step reasoning task.",
      question:
        "Which change is most likely to restore performance on the smaller model?",
      options: [
        "Remove all few‑shot examples to reduce input length.",
        "Add explicit ‘think step by step’ instructions and break the task into multiple smaller prompts (chain‑of‑thought decomposition).",
        "Increase the temperature to 1.2 to encourage more random reasoning paths.",
        "Use the same prompt but set a higher presence penalty.",
      ],
      correctIndex: 1,
      explanation:
        "Smaller models benefit from explicit step‑by‑step decomposition and chain‑of‑thought. Breaking a complex task into several prompts reduces the cognitive load per inference and guides the model through the reasoning.",
    },
    {
      id: "genai-07",
      scenario:
        "Your finance team uses an LLM to extract structured data from PDF invoices. Accuracy is 92% on a test set, but the business requires 99% for automatic payment approval. Manual review of errors shows most are due to ambiguous field labels (‘PO#’ vs ‘Order Ref’).",
      question:
        "What is the most cost‑efficient way to reach 99% without replacing the LLM?",
      options: [
        "Train a small classification model to standardise field names before sending to the LLM.",
        "Double the training data by generating synthetic invoices and fine‑tune the LLM.",
        "Switch to a multimodal LLM that can see the invoice layout directly.",
        "Add a human‑in‑the‑loop for every invoice that falls below 0.95 confidence.",
      ],
      correctIndex: 0,
      explanation:
        "A lightweight classifier that maps variant field names (e.g., ‘PO#’, ‘P.O. Number’) to a canonical label is cheap to train and maintain. It pre‑processes the input, so the LLM always receives clean, consistent field names – boosting accuracy without expensive fine‑tuning.",
    },
    {
      id: "genai-08",
      scenario:
        "An e‑commerce site uses an LLM to generate alt‑text for product images. The model sometimes describes people with stereotypical or offensive attributes (e.g., ‘angry Asian woman’).",
      question:
        "Which mitigation strategy addresses both the specific harmful bias and future similar cases?",
      options: [
        "Remove all images with people from the training pipeline.",
        "Add a prompt suffix: ‘Describe the image strictly in terms of clothing, pose, and visible objects. Do not mention race, age, or emotion.’",
        "Fine‑tune the model on a dataset of respectful alt‑text examples that explicitly neutralises protected attributes.",
        "Post‑process the output with a regex that blocks certain words like ‘angry’ or ‘Asian’.",
      ],
      correctIndex: 2,
      explanation:
        "Fine‑tuning with a carefully curated, bias‑aware dataset directly adjusts model weights to avoid harmful stereotypes. A prompt suffix can be ignored or bypassed, and post‑processing is reactive. Fine‑tuning is more robust and generalisable.",
    },
    {
      id: "genai-09",
      scenario:
        "Your LLM application passes all offline evaluations but fails in production because users ask questions that the retrieval system cannot answer from the knowledge base, yet the model hallucinates a confident answer.",
      question:
        "What evaluation metric should you add to the pre‑production pipeline to catch this?",
      options: [
        "BLEU score comparing generated answers to a golden set.",
        "Retrieval‑augmented ‘answerability’ prediction – a classifier that estimates if the retrieved documents contain the answer.",
        "Perplexity of the generated answer measured by a reference model.",
        "Semantic similarity between the question and the top‑retrieved chunk.",
      ],
      correctIndex: 1,
      explanation:
        "An answerability classifier (or a ‘do not know’ head) predicts whether the retrieved context is sufficient. If it predicts ‘unanswerable’, you can force the LLM to say ‘I don’t know’ instead of hallucinating. This can be trained on positive and negative retrieval examples.",
    },
    {
      id: "genai-10",
      scenario:
        "You version your prompts in Git, but a model update from the provider (e.g., gpt‑4‑0613 → gpt‑4‑1106) causes the same prompt to output completely different JSON structures, breaking your parser.",
      question: "Which practice would have prevented this breakage?",
      options: [
        "Pinning the model version in the API call (e.g., ‘gpt‑4-0613’) until you explicitly test and update.",
        "Using natural language instructions instead of JSON mode.",
        "Always requesting plain text output and parsing it with a flexible regex.",
        "Adding a fallback model that retries with a different prompt.",
      ],
      correctIndex: 0,
      explanation:
        "Pinning the exact model version (e.g., ‘gpt‑4-0613’) insulates your application from undocumented behaviour changes. After testing the new version in a staging environment, you can update the pin and adjust your parser accordingly.",
    },
    {
      id: "genai-11",
      scenario:
        "You are building a multilingual support chatbot. The English performance is excellent, but the model often refuses to answer in low‑resource languages like Swahili or produces mixed‑language gibberish.",
      question:
        "What is the most effective approach without retraining the base model?",
      options: [
        "Translate the user’s question to English, let the model answer in English, then translate back to Swahili.",
        "Add a language detection step and, for low‑resource languages, fallback to a rule‑based system.",
        "Increase the temperature to encourage more creative output in Swahili.",
        "Fine‑tune the model on a machine‑translated Swahili dataset.",
      ],
      correctIndex: 0,
      explanation:
        "Translate‑to‑English → process → translate‑back leverages the model’s strength in English and uses mature translation models for the low‑resource language. This avoids the need for expensive fine‑tuning or degrading the user experience with refusals.",
    },
    {
      id: "genai-12",
      scenario:
        "During a cost review, you notice that prompt tokens are 10× output tokens for most requests, primarily because of lengthy system prompts and few‑shot examples that rarely change.",
      question:
        "Which optimisation would reduce latency and cost with minimal quality loss?",
      options: [
        "Cache the prefix (system prompt + static examples) using prompt caching if the provider supports it.",
        "Remove the system prompt entirely and rely on the user prompt.",
        "Replace few‑shot examples with a single abstract instruction.",
        "Switch to a model with a smaller context window to force shorter prompts.",
      ],
      correctIndex: 0,
      explanation:
        "Prompt caching (supported by Anthropic, OpenAI’s new feature, etc.) stores the static prefix and reuses it across requests, charging only for the unique suffix. This drastically reduces token cost and latency when the same prefix is repeatedly sent.",
    },
    {
      id: "genai-13",
      scenario:
        "Your RAG pipeline uses a dense embedding model (e.g., text‑embedding‑3‑small). A new product line with completely different jargon (e.g., medical devices) is added, and retrieval recall drops from 85% to 40%.",
      question:
        "What is the most appropriate first step to diagnose and fix the issue?",
      options: [
        "Replace the embedding model with a larger one (e.g., text‑embedding‑3‑large).",
        "Train a small set of queries and relevant documents from the new domain, compute the embedding similarity, and compare the distribution to the old domain – then consider fine‑tuning the embedder or switching to a hybrid keyword‑dense retrieval.",
        "Increase the chunk size so that each chunk contains more jargon terms.",
        "Manually add synonyms for all medical terms to every document.",
      ],
      correctIndex: 1,
      explanation:
        "First diagnose the shift: plot similarity distributions. New jargon may be out‑of‑vocabulary for the pretrained embedder. Solutions could include fine‑tuning the embedder on the new domain or adding a keyword (BM25) retriever as a hybrid fallback.",
    },
    {
      id: "genai-14",
      scenario:
        "A product manager suggests using ‘chain of density’ prompting to generate more concise yet informative summaries. However, you observe that repeated ‘density’ iterations cause the summary to lose nuance and become overly generic.",
      question:
        "How can you modify the chain of density process to preserve key details?",
      options: [
        "Reduce the number of iterations from 5 to 2.",
        "Include an ‘entity preservation constraint’ in each iteration’s instructions, asking the model to explicitly retain named entities and numbers from the previous summary.",
        "Start with an extremely short summary and expand it instead of condensing.",
        "Use a different LLM for each iteration to increase diversity.",
      ],
      correctIndex: 1,
      explanation:
        "The ‘missing entity’ problem occurs when the model drops proper nouns or quantities while trying to increase density. Explicitly instructing it to retain all named entities and numeric values from the previous iteration maintains factuality while improving conciseness.",
    },
    {
      id: "genai-15",
      scenario:
        "Your legal team wants an LLM to redact PII from free‑text case notes. The model works well but sometimes fails to redact indirect identifiers (e.g., ‘the driver who lives at 123 Main St’ without explicitly saying ‘123 Main St’).",
      question:
        "Which technique specifically improves redaction of indirect references?",
      options: [
        "Use a larger LLM with a 128k context window.",
        "Apply a two‑stage pipeline: first extract all entities (direct + inferred) with a fine‑tuned NER model, then remove or mask every sentence that contains any of those entities.",
        "Add a post‑processing regex that searches for common address patterns.",
        "Increase the temperature to make the model more random in its redaction decisions.",
      ],
      correctIndex: 1,
      explanation:
        "A specialised NER model can be trained to recognise inferred relationships (e.g., via coreference resolution). Then, removing entire sentences containing any sensitive entity is a conservative but safe approach, preventing indirect leakage. The LLM alone may not connect ‘the driver’ to the address.",
    },
    {
      id: "genai-16",
      scenario:
        "A fraud detection team uses an LLM to reason over transaction histories. The model is very accurate but occasionally explains its reasoning using information that is not present in the given history (hallucinated transactions).",
      question:
        "What training or prompting method directly penalises such reasoning hallucinations?",
      options: [
        "Reinforcement learning from human feedback (RLHF) with a custom reward that checks each quoted fact against the input using a textual entailment model.",
        "Fine‑tuning with more transaction examples.",
        "Adding ‘be honest’ to the system prompt.",
        "Lowering the temperature to 0.0.",
      ],
      correctIndex: 0,
      explanation:
        "RLHF can incorporate a reward function that uses an NLI (natural language inference) model to verify whether each claim in the reasoning is entailed by the input transactions. The model learns to avoid non‑entailed statements to maximise reward.",
    },
    {
      id: "genai-17",
      scenario:
        "You are deploying a fine‑tuned Llama 3 8B model on a single GPU for an internal summarisation task. Inference latency is 2 seconds per document, but the business requires <500ms.",
      question:
        "Which optimisation yields the largest latency reduction with smallest accuracy drop?",
      options: [
        "Quantise the model to 4‑bit integer (INT4) and use vLLM with continuous batching.",
        "Distil the 8B model into a 1B student model.",
        "Move the model to CPU and use OpenVINO.",
        "Use speculative decoding with a tiny draft model.",
      ],
      correctIndex: 0,
      explanation:
        "INT4 quantisation reduces memory bandwidth and allows larger batches, while vLLM’s paged attention and continuous batching drastically improve throughput and latency. Accuracy loss is typically <1% for summarisation. Distillation to 1B may cause unacceptable quality loss.",
    },
    {
      id: "genai-18",
      scenario:
        "A compliance officer questions why the LLM sometimes gives different answers to the same question posed minutes apart, even at temperature = 0.",
      question:
        "What explains non‑deterministic outputs at temperature 0, and how can you achieve true determinism?",
      options: [
        "GPU floating point non‑determinism across different hardware – set `torch.use_deterministic_algorithms(True)` and disable cuDNN auto‑tune.",
        "The seed is not fixed – set a fixed random seed for all libraries (Python, NumPy, PyTorch) and for the model’s sampling routine.",
        "Temperature 0 only approximates argmax, but some APIs still sample – use `top_k = 1` instead.",
        "All of the above could contribute; implement all three: fixed seed, deterministic CUDA, and `top_k=1`.",
      ],
      correctIndex: 3,
      explanation:
        "Model determinism requires controlling the random seed, eliminating GPU non‑determinism (via deterministic algorithms), and forcing greedy decoding (top_k=1, temperature=0). Any single missing piece can cause variation across runs or hardware.",
    },
    {
      id: "genai-19",
      scenario:
        "Your team has built a large collection of prompts for different tasks. Managing them across dev, staging, and prod becomes error‑prone; a mistake in the production prompt causes a severe outage.",
      question:
        "What infrastructure practice would best prevent this class of error?",
      options: [
        "Store all prompts as constants in the application code and deploy via standard CI/CD.",
        "Use a prompt registry (e.g., LangSmith, Humanloop) with versioning, environment tagging, and a canary deployment stage that compares outputs before full rollout.",
        "Keep prompts in a database and always fetch the latest at runtime; rollback is just an SQL update.",
        "Write prompts directly in the production console for quick iteration.",
      ],
      correctIndex: 1,
      explanation:
        "A dedicated prompt registry provides version control, environment separation, and canary testing (e.g., 5% traffic to new prompt). It also enables rollback to any previous version and audit trails – essential for production LLM systems.",
    },
    {
      id: "genai-20",
      scenario:
        "A generative AI feature that writes social media posts is accused of plagiarising a competitor’s blog. The model was trained on a large web corpus that likely included that blog.",
      question:
        "Which combination of techniques could reduce verbatim memorisation while preserving quality?",
      options: [
        "Differential privacy (DP) training and de‑duplication of the training corpus.",
        "Lower temperature to 0.1 and add a ‘be original’ prefix.",
        "Fine‑tune on only synthetic data generated by a different model.",
        "Use an output filter that compares against a database of known competitor content and blocks exact matches.",
      ],
      correctIndex: 0,
      explanation:
        "De‑duplicating the training set removes near‑duplicate examples, reducing memorisation pressure. DP training adds noise to the gradients, making it harder for the model to memorise rare sequences. Both are proactive. Output filters are reactive and can be bypassed.",
    },
  ],
};
const genset2 = {
  meta: {
    id: "agentic-ai-advanced-v1",
    testTitle: "Agentic AI: Multi‑Agent & Autonomous Workflows",
    topic: "agentic-ai",
    topicLabel: "Autonomous Agents & Orchestration",
    difficulty: "Advanced",
    questionCount: 20,
    estimatedMinutes: 50,
    description:
      "Complex scenarios on agent memory, tool use, reflection, delegation, safety, and economic coordination.",
    icon: "🤖",
  },
  questions: [
    {
      id: "agentic-01",
      scenario:
        "A code‑review agent is given access to a GitHub repository. It frequently makes correct suggestions but also accidentally pushes commits to the main branch due to a tool‑use ambiguity.",
      question:
        "What two safeguards should be implemented to prevent unauthorised writes while preserving the agent’s ability to propose changes?",
      options: [
        "Use a ‘dry‑run’ mode where the agent only generates diffs, then a human or separate approval agent executes them after review.",
        "Restrict the agent’s token to read‑only permissions via GitHub fine‑grained PATs.",
        "Implement an ‘allow‑list’ of safe git commands (e.g., ‘git diff’, ‘git log’) and block any command containing ‘push’, ‘merge’, or ‘force’.",
        "All of the above – read‑only token + dry‑run + command allow‑list.",
      ],
      correctIndex: 3,
      explanation:
        "Combining a read‑only token (pre‑compromise), a command allow‑list that explicitly omits destructive operations, and a dry‑run / human‑approval workflow gives defence in depth. The agent can inspect and suggest but never directly alter remote state.",
    },
    {
      id: "agentic-02",
      scenario:
        "An autonomous travel booking agent books flights, hotels, and rental cars. After a minor change to the hotel search API response format, the agent begins booking hotels in the wrong city because it misinterprets the ‘location’ field.",
      question:
        "What architectural pattern would make the agent resilient to such API schema changes?",
      options: [
        "Hard‑code field extraction logic inside the agent’s prompt.",
        "Use a ‘tool schema adapter’ layer that transforms any external API response into a canonical internal representation (e.g., JSON schema validated with Pydantic).",
        "Retrain the agent’s LLM on the new API format using few‑shot examples.",
        "Wrap each API call in a try‑except block that retries with a different parse strategy.",
      ],
      correctIndex: 1,
      explanation:
        "A schema adapter decouples the agent’s reasoning from the fragile external format. The adapter maps diverse API responses to a stable, versioned internal schema. If the external API changes, you only update the adapter, not the agent’s prompts or tools.",
    },
    {
      id: "agentic-03",
      scenario:
        "A multi‑agent system for customer support uses a ‘manager’ agent that routes tickets to specialist agents (billing, technical, returns). The manager occasionally loops by sending the same ticket back and forth between two agents.",
      question:
        "Which mechanism can detect and break such loops without human intervention?",
      options: [
        "Limit each agent to a maximum of 3 tool calls per request.",
        "Implement a ‘short‑term memory’ of recent decisions per ticket; the manager checks if the same ticket ID and agent pair repeats within a sliding window and then selects a different agent or escalates.",
        "Reduce the number of specialist agents to one generalist.",
        "Add a random factor to the manager’s routing decisions.",
      ],
      correctIndex: 1,
      explanation:
        "By maintaining a small buffer of recent (ticket, agent) assignments, the manager can detect cycles. When a potential loop is detected, it can try a new agent, invoke a conflict resolver, or escalate to a human. This is analogous to cycle detection in graphs.",
    },
    {
      id: "agentic-04",
      scenario:
        "You are building a financial research agent that must search the web, read PDFs, and summarise findings. However, the agent often spends a long time on irrelevant pages or downloads extremely large PDFs, exceeding its context window.",
      question:
        "What combination of controls would most efficiently bound the agent’s exploration?",
      options: [
        "Set a hard time‑out of 2 minutes per agent run.",
        "Implement a ‘cost‑budget’ in tokens and a ‘fetch budget’ in page size; the agent must decide when to stop based on remaining budget.",
        "Hard‑code a maximum of 5 web searches per task.",
        "Use a separate summariser agent to compress each page before passing it to the main agent.",
      ],
      correctIndex: 1,
      explanation:
        "A token budget (e.g., 10k input tokens per run) and a fetch budget (e.g., 1MB total downloads) give the agent explicit constraints. It can then learn (or be prompted) to prioritise high‑value actions. Hard limits alone don’t teach efficient exploration; budgets integrate with the agent’s decision‑making.",
    },
    {
      id: "agentic-05",
      scenario:
        "A customer‑service agent has ‘memory’ of past conversations stored in a vector database. After one month, the agent starts mixing up customers’ names and preferences because similar conversations interfere.",
      question:
        "What memory architecture change would most reduce cross‑customer interference?",
      options: [
        "Use a larger embedding model to better separate memories.",
        "Implement ‘episodic memory’ isolated by customer ID – each retrieval query is automatically filtered by a customer ID metadata tag.",
        "Store all memories in a single large string and let the LLM’s own context window handle it.",
        "Reset the agent’s memory every day.",
      ],
      correctIndex: 1,
      explanation:
        "Metadata filtering (by customer ID) ensures that retrieval only returns memories from the same customer. This prevents cross‑contamination and is simple to implement with most vector databases. Larger embeddings alone won’t solve hard collisions.",
    },
    {
      id: "agentic-06",
      scenario:
        "In a simulation of a sales negotiation, two agents (buyer and seller) are supposed to reach a mutually beneficial deal. Instead, they get stuck in a loop of offering increasingly extreme prices (e.g., $1 → $1M → $1).",
      question:
        "What negotiation design pattern prevents such extreme oscillations?",
      options: [
        "Limit the number of negotiation rounds to 5.",
        "Inject a ‘proposal validity’ check that rejects offers outside a reasonable range (e.g., 0.5× to 2× of the previous offer).",
        "Force both agents to use a random walk instead of strategic reasoning.",
        "Replace the agents with a single LLM that computes the Nash equilibrium.",
      ],
      correctIndex: 1,
      explanation:
        "A validity check acts as a ‘negotiation norm’ that prevents extreme jumps. This mirrors real‑world negotiation where offers move incrementally. It stabilises the dialogue and encourages convergence without limiting the total number of rounds.",
    },
    {
      id: "agentic-07",
      scenario:
        "An agentic system for supply chain optimisation has five specialised agents (demand forecast, inventory, logistics, supplier, finance). The finance agent disagrees with the inventory agent’s reorder plan, causing a deadlock.",
      question:
        "Which coordination pattern resolves such conflicts without a centralised dictator?",
      options: [
        "Implement a ‘voting’ mechanism where each agent gets one vote, majority wins.",
        "Introduce a ‘mediator’ agent that analyses arguments from both sides and proposes a compromise; the original agents can accept or reject with a final escalation to a human.",
        "Give priority to the finance agent because budget constraints are hardest.",
        "Randomly select one agent’s plan each time a conflict arises.",
      ],
      correctIndex: 1,
      explanation:
        "A mediator agent (or ‘arbitrator’) that synthesises proposals and reasons about trade‑offs can break deadlocks without a fixed hierarchy. It can also explain the compromise, building trust. Final human escalation ensures safety.",
    },
    {
      id: "agentic-08",
      scenario:
        "You are evaluating an autonomous coding agent. It successfully fixes a bug but also inadvertently deletes a test file that it considered ‘redundant’. The agent had tool access to ‘rm’ and ‘git rm’.",
      question:
        "What evaluation metric or safety guard would have flagged this deletion as undesirable before deployment?",
      options: [
        "Check for file deletions in a sandbox and require explicit approval for any delete operation.",
        "Measure the number of files changed – deletion counts as a negative change.",
        "Run a before‑after diff and fail if any line of test code is removed without a corresponding test update.",
        "All of the above are valid complementary safeguards.",
      ],
      correctIndex: 3,
      explanation:
        "Sandboxing with delete‑approval prevents accidental removal. Counting file changes as a metric can signal anomalies. Specialised test‑coverage checks catch deletion of test assets. Using multiple layers is prudent for autonomous code agents.",
    },
    {
      id: "agentic-09",
      scenario:
        "A multi‑agent system for legal document review comprises a ‘risk agent’ (flags risky clauses) and a ‘compliance agent’ (checks regulations). The risk agent flags a clause that the compliance agent says is compliant, leading to conflicting advice for the user.",
      question:
        "How should the system present this conflict to the user, assuming full automation is not required?",
      options: [
        "Show only the compliance agent’s output because it’s based on law.",
        "Show both verdicts with the reasoning from each agent, labelled by confidence scores, and allow the user to decide.",
        "Create a third ‘adjudicator’ agent that always overrules the other two.",
        "Silently discard the risk agent’s flag because risk is subjective.",
      ],
      correctIndex: 1,
      explanation:
        "In high‑stakes domains, transparency is key. Presenting both reasoned opinions with confidence scores empowers the user to make an informed decision. An adjudicator might be used, but the final choice should remain with the human expert.",
    },
    {
      id: "agentic-10",
      scenario:
        "An agent is designed to manage your calendar and email. It uses a large language model to decide which emails to answer and when to schedule meetings. After deployment, it sends a passive‑aggressive reply to a client because the model misinterpreted a sarcastic comment in the client’s email.",
      question: "What guardrail could have prevented this unwanted tone?",
      options: [
        "Add a ‘sentiment analyser’ as a pre‑filter that flags emails with high negative or sarcastic score, and for those emails the agent only drafts a reply for human approval.",
        "Force the agent to always use a neutral template for all replies.",
        "Train the agent on only positive email examples.",
        "Remove email reply capabilities entirely.",
      ],
      correctIndex: 0,
      explanation:
        "A sentiment pre‑filter catches risky emails (sarcasm, anger) and routes them to a safe fallback (human‑in‑the‑loop). Neutral templates are too rigid. This balances autonomy with safety.",
    },
    {
      id: "agentic-11",
      scenario:
        "You run a swarm of 50 agents that each perform independent product research. They each call the same external product API. The API provider rate‑limits you to 10 requests per second, causing many agents to fail.",
      question:
        "What architectural change ensures efficient use of the API limit?",
      options: [
        "Increase the swarm size to 100 to overwhelm the limit.",
        "Implement a centralised ‘token bucket’ or ‘leaky bucket’ rate limiter that all agents consult before making an API call, with a queue for pending requests.",
        "Make each agent sleep for a random time between 0 and 5 seconds before calling the API.",
        "Replace the external API with a local cache that is updated only once per hour.",
      ],
      correctIndex: 1,
      explanation:
        "A centralised rate limiter (e.g., Redis‑based token bucket) coordinates access across agents. It blocks or queues requests when the limit is exhausted, ensuring smooth operation without exceeding the API quota. Random sleeps are unreliable.",
    },
    {
      id: "agentic-12",
      scenario:
        "After a month of operation, the logs show that a customer service agent has developed a ‘lazy’ behaviour – it always transfers complex tickets to a human without attempting to solve them, even when the solution is straightforward.",
      question:
        "Which reinforcement learning (RL) or feedback mechanism can discourage such behaviour?",
      options: [
        "Give a small negative reward for each transfer to human, and a larger positive reward when the agent solves a ticket correctly without human help.",
        "Remove the transfer tool entirely.",
        "Increase the agent’s temperature to encourage more diverse attempts.",
        "Manually review all transferred tickets and fire the agent if too many are unnecessary.",
      ],
      correctIndex: 0,
      explanation:
        "RL reward shaping: assign a small cost to using the human‑transfer tool, while giving a significant reward for correct autonomous resolution. This incentivises the agent to attempt solving before escalating, but doesn’t forbid transfers for truly hard cases.",
    },
    {
      id: "agentic-13",
      scenario:
        "A data analysis agent is allowed to write and execute Python code in a sandbox. It writes a script that accidentally runs an infinite loop, consuming all CPU on the shared sandbox node and impacting other agents.",
      question:
        "What resource control mechanisms should be mandatory for such agents?",
      options: [
        "Process‑level CPU time limit (e.g., `ulimit -t 10`) and memory limit (e.g., `ulimit -v 500000`).",
        "Only allow the agent to return code, not execute it.",
        "Run each agent’s code in a separate lightweight container (e.g., Docker) with a hard timeout and CPU quota.",
        "Both A and C – per‑process limits inside a container for defence in depth.",
      ],
      correctIndex: 3,
      explanation:
        "Containers provide isolation and resource quotas at the OS level. Inside the container, ulimits add a second layer. A hard timeout kills runaway code. Together they prevent starvation of other agents.",
    },
    {
      id: "agentic-14",
      scenario:
        "An agent tasked with ‘improve the company’s knowledge base’ decides to delete 80% of the articles because they have low page views, not realising that some are critical for compliance.",
      question:
        "What value alignment technique would have prevented this destructive action?",
      options: [
        "Constitutional AI: provide the agent with a set of high‑level principles (e.g., ‘Never delete compliance‑related content’, ‘Preserve articles younger than 1 year’). Check every proposed deletion against these principles before execution.",
        "Remove the delete capability entirely.",
        "Make the agent ask for human approval for any deletion affecting >5% of articles.",
        "Both A and C are good safeguards.",
      ],
      correctIndex: 3,
      explanation:
        "Constitutional AI embeds rules in the agent’s decision loop, while a human‑approval threshold on large‑scale deletions provides a safety net. Both together strongly align the agent’s optimisation (page views) with true business value.",
    },
    {
      id: "agentic-15",
      scenario:
        "A multi‑agent system for software development includes a ‘planner’ agent that breaks down a feature into sub‑tasks, and ‘worker’ agents that implement each sub‑task. Sometimes the planner creates sub‑tasks that are impossible because they depend on each other cyclically.",
      question:
        "Which validation step should the planner include before dispatching tasks?",
      options: [
        "Run a topological sort on the task dependency graph; if a cycle exists, reject the plan and ask the planner to revise it.",
        "Execute tasks in alphabetical order regardless of dependencies.",
        "Skip the planner and let workers figure out dependencies themselves.",
        "Increase the planning horizon to include all possible dependencies.",
      ],
      correctIndex: 0,
      explanation:
        "Validating the dependency graph for cycles is a standard software engineering practice. The planner can then either break the cycle (by merging tasks or reordering) or request more information. This prevents deadlock at execution time.",
    },
    {
      id: "agentic-16",
      scenario:
        "An agent for social media management posts daily content. One day it posts a message that is factually correct but inadvertently reveals a planned product launch under embargo, causing a stock price swing.",
      question: "What information flow control could have prevented this?",
      options: [
        "Implement a ‘data classification’ system: all content about future products is labelled ‘embargoed’. The agent’s tools are configured to reject any post that includes an embargoed label.",
        "Remove social media posting capabilities completely.",
        "Add a human reviewer for every post before publishing.",
        "Train the agent to avoid any mention of future products using negative examples.",
      ],
      correctIndex: 0,
      explanation:
        "Label‑based access control (also called ‘info‑flow control’) ensures that the agent cannot output data from a high‑security classification (embargoed) to a low‑security channel (public social media). The labelling can be done by a separate metadata extractor.",
    },
    {
      id: "agentic-17",
      scenario:
        "A personal shopping agent observes your purchase history and begins to recommend items that are increasingly expensive, presumably because the reward function was simply ‘maximise purchase amount’.",
      question:
        "How would you redesign the reward function to encourage good value instead of just high price?",
      options: [
        "Reward = (list price) - (discount percentage).",
        "Reward = user click‑through rate on recommendations, not actual purchases.",
        "Reward = (user satisfaction predicted by a separate model, e.g., like/dislike after purchase) – λ * (price).",
        "Remove price from the reward entirely.",
      ],
      correctIndex: 2,
      explanation:
        "A multi‑objective reward: predicted satisfaction (maybe from a small user feedback model) minus a cost term λ*price encourages recommendations that are both liked and reasonably priced. λ can be tuned to balance value and thrift.",
    },
    {
      id: "agentic-18",
      scenario:
        "An agent is given a goal: ‘arrange a surprise birthday party for Alice’. It sends invitations to 100 people, rents a huge venue, and orders expensive catering – far exceeding any reasonable budget, because the goal didn’t specify constraints.",
      question:
        "What is the correct way to embed resource constraints into agentic goals?",
      options: [
        "Use a ‘budget parameter’ in the goal specification (e.g., max $500) and enforce it via a wallet tool that deducts costs; the agent cannot take an action that exceeds the available budget.",
        "Hard‑code a limit of 20 guests in the agent’s prompt.",
        "Run the agent’s plan through a separate ‘budget critic’ that asks for human approval if cost exceeds $200.",
        "All of above can work together, but a wallet tool with a budget parameter is the most principled.",
      ],
      correctIndex: 3,
      explanation:
        "A wallet tool that tracks a budget (like a prepaid card) and fails any action that would exceed it gives the agent hard constraints. The agent learns to plan within limits. A prompt may be ignored; a critic adds a second layer.",
    },
    {
      id: "agentic-19",
      scenario:
        "Your agentic system uses a shared vector database for long‑term memory across all users. Over time, the database contains many outdated memories (e.g., old addresses). The agent sometimes uses these stale facts, causing service failures.",
      question: "Which memory maintenance mechanism is most appropriate?",
      options: [
        "Assign each memory a timestamp and a ‘recency score’. During retrieval, decay the importance weight of older memories. Periodically run a compaction job that deletes memories older than 90 days.",
        "Never delete memories – let the agent decide which ones to use.",
        "Manually review and delete memories each week.",
        "Use a separate agent that checks the freshness of each retrieved memory against the current source of truth before using it.",
      ],
      correctIndex: 0,
      explanation:
        "Time‑based decay in retrieval (e.g., multiplying similarity by exp(-λ * age)) penalises stale memories. Periodic automated deletion of very old (e.g., >90 days) memories keeps the store clean. Both together maintain freshness without manual overhead.",
    },
    {
      id: "agentic-20",
      scenario:
        "A scientific research agent is given access to run simulations. It discovers an interesting pattern but, when asked to reproduce the experiment, produces different results because its internal random seed was not fixed across runs.",
      question:
        "What logging and configuration practice ensures reproducibility of agentic actions?",
      options: [
        "Log the full initial state of the agent (including random seed, tool versions, and the exact prompt). Allow re‑running the agent from that logged state.",
        "Only log the final answer, not intermediate steps.",
        "Use a deterministic LLM (temperature=0, top_k=1) but ignore seeds.",
        "Run all agents in a cloud function that resets every time.",
      ],
      correctIndex: 0,
      explanation:
        "Reproducibility requires capturing the entire execution environment: the agent’s configuration (seeds, model version), the prompt, tool versions, and even timestamps if they affect behaviour. Re‑running from that exact captured state should give identical outputs.",
    },
  ],
};
const genset3 = {
  meta: {
    id: "mcp-advanced-v1",
    testTitle: "Model Context Protocol: Infrastructure & Integration",
    topic: "agentic-ai",
    topicLabel: "Model Context Protocol (MCP)",
    difficulty: "Advanced",
    questionCount: 20,
    estimatedMinutes: 40,
    description:
      "Complex scenarios on MCP server design, resource lifecycle, context window management, security, and multi‑model orchestration.",
    icon: "🔌",
  },
  questions: [
    {
      id: "mcp-01",
      scenario:
        "You are implementing an MCP server that provides access to a company’s internal database. A client requests a resource with URI `postgres://sales/revenue?year=2024`. The server must authenticate and authorise the request.",
      question:
        "According to the MCP specification, where should authorisation logic be placed?",
      options: [
        "Inside the resource handler, after parsing the URI, using the session token provided during client initialisation.",
        "In a separate authentication middleware before the request reaches the MCP server.",
        "Inside the LLM’s system prompt, asking it not to request unauthorised resources.",
        "In the client side, because the server trusts the client’s identity.",
      ],
      correctIndex: 0,
      explanation:
        "MCP defines that each resource request includes a session ID (from the initial handshake). Authorisation is the responsibility of the resource handler on the server, which can check the session’s permissions against the requested URI. Pre‑middleware may work but standardisation points to the handler.",
    },
    {
      id: "mcp-02",
      scenario:
        "An MCP server provides a resource `file:///var/logs/app.log` that is 500 MB. An LLM client requests the entire resource, causing memory exhaustion on both server and client.",
      question:
        "What MCP feature or pattern should the server implement to handle large resources efficiently?",
      options: [
        "Support the `Range` header or pagination parameters in the resource URI (e.g., `?offset=0&limit=10000`), and document these as resource templates.",
        "Refuse any resource larger than 10 MB.",
        "Stream the resource as a series of `resource/updated` notifications.",
        "Compress the resource using gzip before sending.",
      ],
      correctIndex: 0,
      explanation:
        "MCP allows resources to be paginated via URI query parameters or the `Range` request header. The server can break large logs into chunks and let the client request specific ranges, avoiding memory overload. This is a common pattern for large text or binary resources.",
    },
    {
      id: "mcp-03",
      scenario:
        "You have two MCP servers: one for a vector database (server A) and one for a SQL database (server B). An LLM client wants to perform a retrieval‑augmented generation that needs results from both. The client currently can only connect to one MCP server at a time.",
      question:
        "What is the most standards‑compliant way to enable this without modifying the client?",
      options: [
        "Merge both databases into a single MCP server.",
        "Use an MCP gateway / proxy that forwards requests to server A and B based on URI prefix (e.g., `vector://…` → A, `sql://…` → B). The client connects only to the gateway.",
        "Write a custom client that opens two separate MCP connections.",
        "Ask the LLM to output two separate requests that the client then routes manually.",
      ],
      correctIndex: 1,
      explanation:
        "An MCP‑compliant gateway acts as a single endpoint to the client but routes internally to multiple backend servers based on URI schemes or other metadata. This preserves the client’s simple one‑connection model and is a common deployment pattern.",
    },
    {
      id: "mcp-04",
      scenario:
        "An MCP server exposes a tool `send_email(to, subject, body)`. A malicious prompt injection convinces the LLM to call this tool with `to=competitor@example.com, subject=‘Trade secrets’, body=…` leaking confidential information.",
      question: "What security mechanism within MCP could mitigate this?",
      options: [
        "Mark the tool as `dangerous` and require explicit user confirmation on every call.",
        "Implement a tool input validation that rejects emails destined outside the company’s domain unless an explicit allow‑list is present.",
        "Remove the email tool entirely.",
        "Encrypt the email body so only the intended recipient can read it.",
      ],
      correctIndex: 1,
      explanation:
        "MCP tool handlers can perform validation on parameters before executing the action. Checking the recipient domain against a corporate allow‑list is a simple, effective guard against exfiltration. User confirmation could work but may be clicked through; input validation is proactive.",
    },
    {
      id: "mcp-05",
      scenario:
        "Your MCP server provides a resource that changes every few seconds (e.g., stock price). The LLM client polls the resource repeatedly, causing high load. The server wants to push updates.",
      question:
        "Which MCP capability should the server advertise and implement?",
      options: [
        "`resource/subscribe` and `resource/updated` notifications. The client subscribes once, receives push notifications on changes.",
        "Use WebSockets directly, bypassing MCP.",
        "Increase the polling interval via a custom header.",
        "Cache the resource and return stale data for 10 seconds.",
      ],
      correctIndex: 0,
      explanation:
        "MCP supports server‑initiated notifications via `resource/updated`. The server can advertise its `subscriptions` capability. Clients can subscribe to a specific resource URI and then the server will notify them of changes, eliminating costly polling.",
    },
    {
      id: "mcp-06",
      scenario:
        "An MCP server maintains a resource representing a long‑running workflow (e.g., ‘deploy /status’). When the client requests the resource, the server must compute the current status on the fly, which takes 5 seconds – too slow for an interactive LLM call.",
      question: "What pattern can the server use to avoid blocking the client?",
      options: [
        "Return a `202 Accepted` with a `Location` header pointing to a future resource that will contain the result, then update that resource when ready.",
        "Increase the client’s timeout to 30 seconds.",
        "Cache the status and recalculate every minute in the background.",
        "Refuse to serve that resource.",
      ],
      correctIndex: 0,
      explanation:
        "The server can implement an asynchronous pattern: the initial request returns an ‘accepted’ response with a URI where the final status will appear. The client can poll that URI or subscribe to updates. This is analogous to REST async patterns and is MCP‑compatible.",
    },
    {
      id: "mcp-07",
      scenario:
        "A client connects to an MCP server and lists available resources. The server returns a huge list (10,000 resources), causing token overflow in the LLM’s context window when the client passes the list to the model.",
      question:
        "What MCP feature should the client and server use to handle large resource listings?",
      options: [
        "Server should support pagination in the `resources/list` request (e.g., `cursor` parameter). Client should request pages incrementally and only present a relevant subset to the LLM (e.g., via search or filtering).",
        "Reduce the number of resources to 100 by deleting less important ones.",
        "Client should ignore the list and guess resource URIs.",
        "Compress the list as a JSON string and ask the LLM to decompress it.",
      ],
      correctIndex: 0,
      explanation:
        "MCP specification includes pagination for `resources/list` using a `cursor` token. The client can fetch resources in chunks and, importantly, filter or search that list before feeding it to the LLM’s context – e.g., only show resources matching a topic relevant to the current conversation.",
    },
    {
      id: "mcp-08",
      scenario:
        "You are writing an MCP server that provides access to a cloud object store (S3). Different clients have different access levels (read‑only, read‑write).",
      question: "How should the server differentiate client permissions?",
      options: [
        "Use the client’s session ID, which is established during the initial handshake, and associate a permission set with that session. The session ID is passed with every request.",
        "Ask the client to include an API key in every request URI.",
        "Create separate MCP servers on different ports for each permission level.",
        "Trust the client’s self‑claimed identity in the first message.",
      ],
      correctIndex: 0,
      explanation:
        "MCP sessions are long‑lived after the initial ‘initialize’ request, which can include authentication tokens. The server stores the permission set for that session ID and checks it on every subsequent resource/tool call. This is the standard way.",
    },
    {
      id: "mcp-09",
      scenario:
        "An MCP server exposes a tool `run_sql(query)`. The LLM constructs a query like `SELECT * FROM users WHERE email = ‘{{user_input}}’`. An attacker provides user input `’; DROP TABLE users; --` causing SQL injection.",
      question: "What is the most effective MCP‑side mitigation?",
      options: [
        "The tool should not accept raw SQL; instead, provide a set of parameterised query tools (e.g., `query_users_by_email(email)`).",
        "Use a regex to block dangerous SQL keywords.",
        "Set a low timeout on SQL execution so the injection cannot complete.",
        "Restrict the database user to read‑only privileges.",
      ],
      correctIndex: 0,
      explanation:
        "MCP tools should be designed with security in mind. Exposing a raw SQL executor is dangerous. Parameterised, pre‑defined queries (or using a safe query builder) prevent injection. Read‑only helps but does not protect against data exfiltration via SELECT injection.",
    },
    {
      id: "mcp-10",
      scenario:
        "A client uses two MCP servers – one for code execution and one for a knowledge base. The LLM must call tools from both servers to answer a complex question. However, each server call is separate, and the LLM may lose context between calls.",
      question:
        "How can the client maintain conversational context across server calls?",
      options: [
        "The client is responsible for maintaining a conversation history and injecting relevant results from previous server calls into the context window when calling the next server.",
        "Use a single MCP server that aggregates both capabilities.",
        "Store intermediate results in a shared file system that both servers can read.",
        "Ask the LLM to repeat all previous information in every tool call.",
      ],
      correctIndex: 0,
      explanation:
        "MCP servers are stateless with respect to conversation. The client (or an orchestrator) must maintain the dialogue state and decide what context to feed to which server. The client can combine results from server A when formulating a call to server B.",
    },
    {
      id: "mcp-11",
      scenario:
        "Your MCP server returns a resource that is a large JSON object. The LLM often requests the whole object for a small piece of information, wasting tokens.",
      question: "How can the server encourage more efficient access?",
      options: [
        "Provide sub‑resources using a hierarchical URI scheme (e.g., `/users/123/name`). Document these in the resource listing.",
        "Always return the whole object; it’s the client’s responsibility.",
        "Refuse requests that don’t specify an `fields` parameter.",
        "Compress the JSON and ask the client to decompress.",
      ],
      correctIndex: 0,
      explanation:
        "MCP encourages granular resources. By exposing fine‑grained sub‑resources (e.g., individual fields), the server enables the client (and LLM) to request only what is needed. Server can also support JSONPath or GraphQL‑like queries, but hierarchical URIs are simplest and most MCP‑native.",
    },
    {
      id: "mcp-12",
      scenario:
        "An MCP server is deployed behind a corporate firewall. A cloud‑based LLM client needs to access it. The client cannot initiate a connection because the firewall blocks inbound traffic from the cloud.",
      question:
        "What deployment pattern solves this while keeping the server inside the firewall?",
      options: [
        "Use an MCP tunnel or reverse proxy: the client makes an outbound connection to a publicly accessible relay, and the internal MCP server connects outbound to the same relay (similar to ngrok or cloudflare tunnel).",
        "Open a firewall hole for the client’s IP range.",
        "Move the MCP server to the cloud.",
        "Use a VPN and assign the cloud client an internal IP.",
      ],
      correctIndex: 0,
      explanation:
        "A reverse tunnel (e.g., using WebSocket or HTTP Connect) allows the internal server to initiate an outbound connection to a relay, and the cloud client also connects to the relay. No inbound firewall hole is needed. This is common for on‑prem services consumed by external LLMs.",
    },
    {
      id: "mcp-13",
      scenario:
        "Your MCP server provides a tool that launches a long‑running process (e.g., training a model). The client’s request times out after 30 seconds, but the process may take 10 minutes.",
      question:
        "How should the server design this tool to work within MCP’s request/response model?",
      options: [
        "The tool returns a job ID immediately. The server provides a separate resource URI (e.g., `job://{jobId}/status`) where the client can poll for completion and retrieve results.",
        "Increase the timeout on the client side to 20 minutes.",
        "Run the process synchronously and hope the timeout isn’t enforced.",
        "Refuse to implement long‑running tools.",
      ],
      correctIndex: 0,
      explanation:
        "Asynchronous job pattern: the tool response is fast, containing a job handle. The client can then subscribe to changes on that job’s status resource or poll it. This adheres to MCP’s synchronous request nature while supporting async workloads.",
    },
    {
      id: "mcp-14",
      scenario:
        "An MCP server exposes 50 different tools. The LLM client’s prompt includes the entire tool list, consuming thousands of tokens. The model sometimes uses the wrong tool due to ambiguity.",
      question:
        "What MCP feature can the server implement to reduce the tool list per request?",
      options: [
        "Implement tool grouping and dynamic discovery: the server can provide a ‘toolgroup’ capability that returns only tools relevant to a given context or query.",
        "Force the client to hard‑code tool names.",
        "Merge all tools into a single ‘do_everything’ tool with many parameters.",
        "Document the tools externally and remove them from the MCP manifest.",
      ],
      correctIndex: 0,
      explanation:
        "MCP allows servers to organise tools and potentially offer ‘dynamic tool discovery’ – e.g., a `tools/list` endpoint that accepts a context query and returns a filtered subset. This reduces token usage and improves model accuracy.",
    },
    {
      id: "mcp-15",
      scenario:
        "You maintain an MCP server for a legacy system that uses an unusual serialisation format (e.g., XML). The LLM expects clean JSON. Transforming every response is repetitive.",
      question:
        "Where should the transformation occur according to clean MCP layering?",
      options: [
        "Inside the MCP server’s resource handler: retrieve the legacy format, transform to JSON, then return the JSON.",
        "On the client side: the client must understand the legacy format.",
        "In a separate adapter microservice between the legacy system and the MCP server.",
        "Modify the legacy system to output JSON.",
      ],
      correctIndex: 0,
      explanation:
        "The MCP server is the abstraction layer. Its responsibility is to present resources and tools in the standard MCP JSON format. Therefore, it should translate from any legacy format to JSON internally. Clients should not have to understand legacy formats.",
    },
    {
      id: "mcp-16",
      scenario:
        "A single MCP server handles multiple simultaneous clients. One client starts a long resource subscription; the server holds state for that subscription. When the server restarts, the subscription is lost, and the client stops receiving updates.",
      question:
        "What pattern allows the subscription to survive a server restart?",
      options: [
        "Persist subscription state in an external durable store (e.g., Redis). On restart, the server reloads subscriptions and continues sending updates.",
        "Assume clients will re‑subscribe after a timeout; it’s not the server’s problem.",
        "Use a server‑less architecture where there is no persistent state.",
        "Do not support subscriptions; require polling.",
      ],
      correctIndex: 0,
      explanation:
        "For high availability, MCP servers that maintain state (subscriptions, job statuses) should store that state externally. On restart, they recover the state and resume operations. This is standard practice for stateful protocol servers.",
    },
    {
      id: "mcp-17",
      scenario:
        "Your MCP server provides access to a confidential document store. You want to log every access for audit purposes, including which client (session) accessed which resource and when.",
      question: "Where and how should this audit logging be implemented?",
      options: [
        "In the MCP server’s resource and tool handlers, using the session ID and a timestamp library. Log to a secure, append‑only sink.",
        "On the client side, because the client knows what it requested.",
        "In the LLM provider’s logs, by asking the LLM to output each access.",
        "In a separate sidecar proxy that sniffs network traffic – but then the session ID may be encrypted.",
      ],
      correctIndex: 0,
      explanation:
        "The MCP server is the authoritative point where access decisions are made and where session IDs are present. Implementing audit logging in the resource handlers ensures completeness and tamper‑resistance (if logs are append‑only).",
    },
    {
      id: "mcp-18",
      scenario:
        "An LLM calls an MCP tool `search_products(keyword)` that internally calls an external search API that sometimes takes 3 seconds to respond. During this time, the LLM is idle, and the user experiences a delay.",
      question:
        "What optimisation can the MCP server implement to reduce perceived latency?",
      options: [
        "Implement caching for frequent keywords (e.g., LRU cache with TTL). Return a cached result when available.",
        "Increase the LLM’s timeout to 10 seconds.",
        "Stream partial results back via multiple `tool/call` updates (not yet standard).",
        "Ask the user to be patient.",
      ],
      correctIndex: 0,
      explanation:
        "Caching is the most straightforward MCP‑side optimisation. For common searches, the server returns a pre‑computed result instantly. This reduces latency and external API costs. If the search API supports it, server could also pre‑fetch popular keywords.",
    },
    {
      id: "mcp-19",
      scenario:
        "An MCP server exposes a resource that represents a real‑time dashboard (URI `dashboard://metrics`). The server updates the resource value every second. Many clients subscribe, each receiving a `resource/updated` notification every second, consuming network bandwidth.",
      question:
        "How can the server reduce update frequency for clients that do not need real‑time?",
      options: [
        "Allow clients to specify a desired `update_interval` in the subscription (e.g., `dashboard://metrics?interval=5s`). The server then sends notifications at that interval.",
        "Disable push notifications and require polling.",
        "Send only one update per second regardless of clients.",
        "Merge all clients into one WebSocket stream.",
      ],
      correctIndex: 0,
      explanation:
        "MCP URIs can accept query parameters. A client can request a slower update rate. The server maintains one internal real‑time feed but delivers notifications to each client at its requested interval. This is efficient and respects client needs.",
    },
    {
      id: "mcp-20",
      scenario:
        "Your MCP server evolves over time, adding new resources and tools. Existing clients that rely on an older version may break if you remove a resource. You need to support both old and new clients simultaneously during a transition.",
      question: "What versioning strategy is most compatible with MCP?",
      options: [
        "Include a version number in the server’s `serverInfo` during initialisation. Support multiple resource/tool versions using URI patterns (e.g., `v1/users`, `v2/users`). Deprecate old versions gradually.",
        "Change the server’s port for each version and update clients atomically.",
        "Never remove old resources – just add new ones.",
        "Ask all clients to upgrade at once.",
      ],
      correctIndex: 0,
      explanation:
        "MCP’s `serverInfo` can advertise a version string. You can implement versioned namespaces in URIs (e.g., `/v1/...` vs `/v2/...`). The server can continue to serve the old namespace for legacy clients while new clients use the newer version. This is a standard REST‑like versioning approach.",
    },
  ],
};
