export interface KnowledgeChunk {
  id: string;
  text: string;
  metadata: {
    source?: string;
    category?: string;
    file_name?: string;
    chunk_index?: number;
    [key: string]: any;
  };
}

export const RESUME_CHUNKS: KnowledgeChunk[] = [
  {
    "id": "doc_pavan_dasam_resume_updated_chunk_0",
    "text": "PAVAN DASAM\nAI Engineer | Generative AI | Agentic AI | RAG\nOver 3.5 Years \u2022 Financial Insurance | Health Insurance\nEmail: pavanwork2113@gmail.com\nPhone: +91 9640559197\nCertifications: LangChain, LangGraph & MCP Certified (Anthropic)\nLocation: India",
    "metadata": {
      "char_length": 248,
      "file_size": 11430,
      "doc_id": "doc_pavan_dasam_resume_updated",
      "chunk_index": 0,
      "line_count": 99,
      "file_name": "Pavan_Dasam_Resume_Updated.txt",
      "chunk_count": 28,
      "encoding": "utf-8",
      "extension": ".txt"
    }
  },
  {
    "id": "doc_pavan_dasam_resume_updated_chunk_1",
    "text": "PROFESSIONAL SUMMARY",
    "metadata": {
      "encoding": "utf-8",
      "chunk_count": 28,
      "char_length": 20,
      "extension": ".txt",
      "file_name": "Pavan_Dasam_Resume_Updated.txt",
      "doc_id": "doc_pavan_dasam_resume_updated",
      "chunk_index": 1,
      "line_count": 99,
      "file_size": 11430
    }
  },
  {
    "id": "doc_pavan_dasam_resume_updated_chunk_2",
    "text": "AI Engineer with over 3.5 years of experience designing, building and deploying enterprise Generative AI and Agentic AI solutions across Financial Insurance and Health Insurance domains. Hands-on experience developing production-oriented RAG applications, LLM-powered assistants and multi-step agentic workflows using Python, LangChain and LangGraph",
    "metadata": {
      "line_count": 99,
      "extension": ".txt",
      "encoding": "utf-8",
      "file_name": "Pavan_Dasam_Resume_Updated.txt",
      "doc_id": "doc_pavan_dasam_resume_updated",
      "file_size": 11430,
      "chunk_index": 2,
      "chunk_count": 28,
      "char_length": 349
    }
  },
  {
    "id": "doc_pavan_dasam_resume_updated_chunk_3",
    "text": "Skilled across the full GenAI application lifecycle \u2014 prompt engineering, embeddings, vector search, retrieval pipelines, tool integration via the Model Context Protocol (MCP), structured outputs, evaluation and guardrails \u2014 with practical exposure to FastAPI-based API development and Docker/Azure deployment. Experienced collaborating with architects, product owners, SMEs and compliance stakeholders to translate regulated, enterprise business requirements into reliable, grounded and auditable AI systems.",
    "metadata": {
      "file_size": 11430,
      "line_count": 99,
      "char_length": 509,
      "encoding": "utf-8",
      "chunk_count": 28,
      "doc_id": "doc_pavan_dasam_resume_updated",
      "chunk_index": 3,
      "file_name": "Pavan_Dasam_Resume_Updated.txt",
      "extension": ".txt"
    }
  },
  {
    "id": "doc_pavan_dasam_resume_updated_chunk_4",
    "text": "TECHNICAL SKILLS\nProgramming: Python, Java, SQL\nGenerative AI: Generative AI, Large Language Models (LLMs), Prompt Engineering, RAG, Embeddings, Semantic Search, Context Management, Structured Outputs\nAgentic AI: AI Agents, Tool Calling, Model Context Protocol (MCP), Agentic Workflows, State Management, Human-in-the-Loop, Multi-Agent Concepts\nFrameworks: LangChain, LangGraph, FastAPI, Pydantic\nLLMs: OpenAI GPT Models, Azure OpenAI, Anthropic Claude\nVector Databases / Search: FAISS, ChromaDB, Azure AI Search",
    "metadata": {
      "extension": ".txt",
      "file_name": "Pavan_Dasam_Resume_Updated.txt",
      "encoding": "utf-8",
      "file_size": 11430,
      "doc_id": "doc_pavan_dasam_resume_updated",
      "chunk_index": 4,
      "line_count": 99,
      "char_length": 512,
      "chunk_count": 28
    }
  },
  {
    "id": "doc_pavan_dasam_resume_updated_chunk_5",
    "text": "RAG Pipeline: Document Loading, Chunking (RecursiveCharacterTextSplitter), Embeddings, Vector Search, Top-K Retrieval, Context Augmentation, Reranking Concepts, Metadata Filtering\nAI Evaluation: RAGAS, LLM-as-a-Judge, Groundedness, Faithfulness, Relevance, Hallucination Evaluation\nResponsible AI / Guardrails: Prompt Injection Protection, Content Filtering, PII Handling, Output Validation, Human Escalation\nAPIs / Backend: REST APIs, FastAPI, JSON, API Integration\nCloud / Deployment: Azure, Azure OpenAI, Docker, Git, GitHub, CI/CD Fundamentals",
    "metadata": {
      "doc_id": "doc_pavan_dasam_resume_updated",
      "extension": ".txt",
      "chunk_index": 5,
      "line_count": 99,
      "encoding": "utf-8",
      "chunk_count": 28,
      "file_name": "Pavan_Dasam_Resume_Updated.txt",
      "file_size": 11430,
      "char_length": 547
    }
  },
  {
    "id": "doc_pavan_dasam_resume_updated_chunk_6",
    "text": "PROFESSIONAL EXPERIENCE\n\nAgentic AI Engineer | Accenture\nClient: Voya Financial \u2013 Financial Insurance \u2022 Generative AI & Agentic AI \u2022 Jun 2024 \u2013 Present\n\nAI PRODUCTS:",
    "metadata": {
      "file_name": "Pavan_Dasam_Resume_Updated.txt",
      "extension": ".txt",
      "file_size": 11430,
      "line_count": 99,
      "encoding": "utf-8",
      "chunk_index": 6,
      "doc_id": "doc_pavan_dasam_resume_updated",
      "chunk_count": 28,
      "char_length": 165
    }
  },
  {
    "id": "doc_pavan_dasam_resume_updated_chunk_7",
    "text": "1. Autonomous Claims Processing Agent \u2014 Multi-Agent System\n- Multi-Agent System \u2014 Coordinated Specialist Agents\n- Context: Voya's claims operations span supplemental health, life and disability, and in 2026 brought Leave/PFML/Short-Term Disability claims administration in-house for new business. Delivered a multi-agent system that coordinates several specialized agents under a single LangGraph workflow to process a claim end-to-end.",
    "metadata": {
      "char_length": 436,
      "extension": ".txt",
      "line_count": 99,
      "file_size": 11430,
      "encoding": "utf-8",
      "doc_id": "doc_pavan_dasam_resume_updated",
      "file_name": "Pavan_Dasam_Resume_Updated.txt",
      "chunk_count": 28,
      "chunk_index": 7
    }
  },
  {
    "id": "doc_pavan_dasam_resume_updated_chunk_8",
    "text": "- Multi-Agent Workflow: New Claim \u2192 Intake Agent \u2192 Document Verification Agent \u2192 Policy Retrieval Agent \u2192 Eligibility Agent \u2192 Claims Analysis Agent \u2192 Fraud/Risk Agent \u2192 Recommendation Agent \u2192 Human Claims Examiner\n- Technologies: LangGraph, MCP, Azure OpenAI, Python, FastAPI, Azure Service Bus / Event Grid, Azure AI Search, PostgreSQL, Redis, Docker, AKS\n- Technical Details:",
    "metadata": {
      "doc_id": "doc_pavan_dasam_resume_updated",
      "extension": ".txt",
      "char_length": 377,
      "chunk_index": 8,
      "encoding": "utf-8",
      "chunk_count": 28,
      "line_count": 99,
      "file_name": "Pavan_Dasam_Resume_Updated.txt",
      "file_size": 11430
    }
  },
  {
    "id": "doc_pavan_dasam_resume_updated_chunk_9",
    "text": "* Designed and built a multi-agent system in LangGraph spanning Intake, Document Verification, Policy Retrieval, Eligibility, Claims Analysis, Fraud/Risk and Recommendation agents to process disability, life and supplemental health claims end-to-end.\n* Developed the Intake Agent to classify incoming claims and extract claimant and policy information, and the Document Verification Agent to check received documents against claim-type requirements and flag missing items.",
    "metadata": {
      "chunk_count": 28,
      "file_size": 11430,
      "char_length": 472,
      "encoding": "utf-8",
      "chunk_index": 9,
      "line_count": 99,
      "file_name": "Pavan_Dasam_Resume_Updated.txt",
      "doc_id": "doc_pavan_dasam_resume_updated",
      "extension": ".txt"
    }
  },
  {
    "id": "doc_pavan_dasam_resume_updated_chunk_10",
    "text": "* Implemented the Policy Retrieval Agent using RAG over certificate/policy language to surface the applicable coverage sections for each claim.\n* Developed the Eligibility Agent to validate coverage dates, plan eligibility and applicable rules via internal APIs and rules-engine integration, and standardized tool/data-source access across all agents using the Model Context Protocol (MCP).",
    "metadata": {
      "file_size": 11430,
      "doc_id": "doc_pavan_dasam_resume_updated",
      "extension": ".txt",
      "encoding": "utf-8",
      "chunk_index": 10,
      "char_length": 390,
      "line_count": 99,
      "chunk_count": 28,
      "file_name": "Pavan_Dasam_Resume_Updated.txt"
    }
  },
  {
    "id": "doc_pavan_dasam_resume_updated_chunk_11",
    "text": "* Built the Fraud/Risk Agent to flag unusual claim patterns for review, and the Recommendation Agent to assemble supporting evidence, cite policy sections, and produce a confidence-scored recommended next action for the human examiner.",
    "metadata": {
      "file_name": "Pavan_Dasam_Resume_Updated.txt",
      "file_size": 11430,
      "chunk_index": 11,
      "line_count": 99,
      "encoding": "utf-8",
      "doc_id": "doc_pavan_dasam_resume_updated",
      "char_length": 235,
      "chunk_count": 28,
      "extension": ".txt"
    }
  },
  {
    "id": "doc_pavan_dasam_resume_updated_chunk_12",
    "text": "* Implemented human-in-the-loop routing so examiners review and finalize every agent-recommended action before it is applied \u2014 e.g., a sample output flags 4/5 documents received, cites Policy Section 7.2, and recommends requesting the missing document at 94% confidence. Selected LangGraph over a simple LangChain chain for its persistent state, conditional branching and human-in-the-loop checkpoints.",
    "metadata": {
      "chunk_count": 28,
      "file_name": "Pavan_Dasam_Resume_Updated.txt",
      "extension": ".txt",
      "char_length": 402,
      "line_count": 99,
      "encoding": "utf-8",
      "chunk_index": 12,
      "file_size": 11430,
      "doc_id": "doc_pavan_dasam_resume_updated"
    }
  },
  {
    "id": "doc_pavan_dasam_resume_updated_chunk_13",
    "text": "2. Voya Policy Servicing Agent \u2014 Single Agentic System\n- Single Agentic System \u2014 per Voya Financial's requirement\n- Context: Beyond claims, Voya's policy servicing team handles endorsements, beneficiary updates, billing inquiries and policy document requests. Rather than a multi-agent pipeline, delivered a single agentic system \u2014 one LLM-driven agent equipped with multiple tools \u2014 that reasons over each request end-to-end and decides which tool to call, matched to how self-contained this workflow is.",
    "metadata": {
      "char_length": 505,
      "extension": ".txt",
      "file_size": 11430,
      "doc_id": "doc_pavan_dasam_resume_updated",
      "file_name": "Pavan_Dasam_Resume_Updated.txt",
      "chunk_count": 28,
      "line_count": 99,
      "encoding": "utf-8",
      "chunk_index": 13
    }
  },
  {
    "id": "doc_pavan_dasam_resume_updated_chunk_14",
    "text": "- Single-Agent + Tools Workflow: Incoming Request \u2192 Single Agent (reasoning loop) \u2192 Tool Calls: Policy Change Tool | Billing Lookup Tool | Document Retrieval Tool | Compliance Check Tool \u2192 Response\n- Technologies: LangGraph (single-agent loop), MCP, Azure OpenAI, Python, FastAPI, Azure AI Search, PostgreSQL, Docker, AKS\n- Technical Details:\n* Designed a single agentic system \u2014 one LangGraph agent running a continuous reasoning-and-tool-calling loop, not a multi-agent pipeline \u2014 since policy servicing requests are typically self-contained and well-suited to one agent with the right tools.",
    "metadata": {
      "file_name": "Pavan_Dasam_Resume_Updated.txt",
      "encoding": "utf-8",
      "chunk_count": 28,
      "char_length": 594,
      "chunk_index": 14,
      "doc_id": "doc_pavan_dasam_resume_updated",
      "extension": ".txt",
      "file_size": 11430,
      "line_count": 99
    }
  },
  {
    "id": "doc_pavan_dasam_resume_updated_chunk_15",
    "text": "* Exposed policy-change, billing-lookup, RAG-based document-retrieval and compliance-check capabilities as MCP tools that the single agent calls directly, keeping one continuous context and one audit trail per request instead of handing off between agents.\n* Implemented persistent agent state so the same agent handles multi-turn requests \u2014 e.g., a beneficiary update followed by a compliance re-check \u2014 without losing context, with human-in-the-loop approval inside the same loop for changes above a defined risk threshold.",
    "metadata": {
      "file_name": "Pavan_Dasam_Resume_Updated.txt",
      "chunk_index": 15,
      "char_length": 525,
      "line_count": 99,
      "encoding": "utf-8",
      "file_size": 11430,
      "doc_id": "doc_pavan_dasam_resume_updated",
      "chunk_count": 28,
      "extension": ".txt"
    }
  },
  {
    "id": "doc_pavan_dasam_resume_updated_chunk_16",
    "text": "* Deliberately chose this single-agent, tool-calling design over a multi-agent pipeline for policy servicing, reserving the multi-agent approach for the higher-complexity claims workflow above.",
    "metadata": {
      "chunk_index": 16,
      "extension": ".txt",
      "encoding": "utf-8",
      "file_name": "Pavan_Dasam_Resume_Updated.txt",
      "chunk_count": 28,
      "line_count": 99,
      "file_size": 11430,
      "doc_id": "doc_pavan_dasam_resume_updated",
      "char_length": 193
    }
  },
  {
    "id": "doc_pavan_dasam_resume_updated_chunk_17",
    "text": "3. Voya Claims Intelligence Copilot \u2014 GenAI Copilot\n- Context: Voya's Claims Center supports claim initiation, document upload and status tracking. Examiners needed a faster way to understand large claim files spanning medical documents, claim forms, employer information, policy documents and correspondence.\n- RAG Architecture: Documents \u2192 OCR/Document Extraction \u2192 Chunking \u2192 Embeddings \u2192 Vector DB \u2192 RAG \u2192 LLM \u2192 Structured Claims Summary\n- Technologies: Azure OpenAI / GPT, LangChain, Python, FastAPI, Azure AI Search, Blob Storage, PostgreSQL, React, Application Insights\n- Technical Details:",
    "metadata": {
      "file_name": "Pavan_Dasam_Resume_Updated.txt",
      "doc_id": "doc_pavan_dasam_resume_updated",
      "file_size": 11430,
      "encoding": "utf-8",
      "char_length": 597,
      "chunk_count": 28,
      "extension": ".txt",
      "line_count": 99,
      "chunk_index": 17
    }
  },
  {
    "id": "doc_pavan_dasam_resume_updated_chunk_18",
    "text": "* Built a GenAI copilot that ingests claim documents and produces a structured summary for examiners \u2014 claim type, reason, missing documents, relevant policy sections, potential issues and a recommended next step \u2014 instead of requiring manual review of the full file.\n* Implemented OCR-based document extraction, chunking and embedding generation across heterogeneous claim file formats, and developed RAG retrieval over policy and claims documentation to ground each generated summary.",
    "metadata": {
      "encoding": "utf-8",
      "chunk_count": 28,
      "doc_id": "doc_pavan_dasam_resume_updated",
      "file_name": "Pavan_Dasam_Resume_Updated.txt",
      "char_length": 486,
      "line_count": 99,
      "extension": ".txt",
      "file_size": 11430,
      "chunk_index": 18
    }
  },
  {
    "id": "doc_pavan_dasam_resume_updated_chunk_19",
    "text": "* Built FastAPI endpoints and a React-based interface for examiners to review AI-generated summaries alongside source documents, with Application Insights monitoring.\n* Applied guardrails ensuring the copilot assists examiners with information synthesis only, and does not autonomously approve or deny high-impact insurance claims.",
    "metadata": {
      "line_count": 99,
      "file_size": 11430,
      "encoding": "utf-8",
      "file_name": "Pavan_Dasam_Resume_Updated.txt",
      "chunk_index": 19,
      "chunk_count": 28,
      "char_length": 331,
      "extension": ".txt",
      "doc_id": "doc_pavan_dasam_resume_updated"
    }
  },
  {
    "id": "doc_pavan_dasam_resume_updated_chunk_20",
    "text": "Software Engineer | TAO Digitals\nClient: Anthem \u2013 Health Insurance \u2022 Java Development & Generative AI \u2022 Mar 2023 \u2013 May 2024",
    "metadata": {
      "chunk_count": 28,
      "char_length": 123,
      "encoding": "utf-8",
      "doc_id": "doc_pavan_dasam_resume_updated",
      "extension": ".txt",
      "file_size": 11430,
      "line_count": 99,
      "file_name": "Pavan_Dasam_Resume_Updated.txt",
      "chunk_index": 20
    }
  },
  {
    "id": "doc_pavan_dasam_resume_updated_chunk_21",
    "text": "GENAI ENGINEER \u2014 AI PRODUCTS\nMemberAssist AI \u2014 GenAI Member Service Copilot\n- Context: Members contact support with questions such as whether a procedure is covered, what their deductible is, why a claim was denied, expected out-of-pocket cost, provider network status and what an EOB means. Support agents needed to search across benefit documents, policy information, claims data and knowledge bases to answer them.\n- Architecture: Member/CSR \u2192 AI Assistant \u2192 Intent Detection \u2192 RAG \u2192 Member/Claims APIs + Vector DB \u2192 LLM \u2192 Guardrails \u2192 Response",
    "metadata": {
      "extension": ".txt",
      "line_count": 99,
      "chunk_count": 28,
      "char_length": 547,
      "encoding": "utf-8",
      "file_size": 11430,
      "chunk_index": 21,
      "doc_id": "doc_pavan_dasam_resume_updated",
      "file_name": "Pavan_Dasam_Resume_Updated.txt"
    }
  },
  {
    "id": "doc_pavan_dasam_resume_updated_chunk_22",
    "text": "- Technologies: Azure OpenAI / OpenAI, LangChain, Python, FastAPI, Azure AI Search, Vector Database, API Gateway, Azure Functions / AKS, Application Insights, LangSmith\n- Technical Details:\n* Built MemberAssist AI, a RAG-based GenAI assistant that retrieves a member's relevant plan, benefit and claims information and explains it in plain language for support agents and members.\n* Implemented intent detection to route member questions \u2014 coverage, deductible, claim denial reason, cost-share, network status, EOB explanation \u2014 to the appropriate retrieval and API path.",
    "metadata": {
      "file_size": 11430,
      "line_count": 99,
      "file_name": "Pavan_Dasam_Resume_Updated.txt",
      "extension": ".txt",
      "chunk_index": 22,
      "char_length": 571,
      "encoding": "utf-8",
      "chunk_count": 28,
      "doc_id": "doc_pavan_dasam_resume_updated"
    }
  },
  {
    "id": "doc_pavan_dasam_resume_updated_chunk_23",
    "text": "* Developed RAG retrieval over benefit documents, policy information and internal knowledge bases, combined with real-time lookups against member and claims APIs.\n* Example: for a denied-claim query, the assistant retrieves the claim, denial reason and policy, then explains the denial (e.g., missing prior authorization) with clear next steps such as contacting the provider or reviewing appeal options.\n* Generated embeddings and indexed benefit guides and policy documents in a vector database, and built FastAPI endpoints with API gateway integration to expose the assistant to CSR-facing tools.",
    "metadata": {
      "doc_id": "doc_pavan_dasam_resume_updated",
      "file_name": "Pavan_Dasam_Resume_Updated.txt",
      "char_length": 599,
      "chunk_index": 23,
      "file_size": 11430,
      "line_count": 99,
      "encoding": "utf-8",
      "extension": ".txt",
      "chunk_count": 28
    }
  },
  {
    "id": "doc_pavan_dasam_resume_updated_chunk_24",
    "text": "* Applied guardrails and grounding checks to keep responses accurate to member-specific plan data, and used LangSmith and Application Insights to trace, debug and monitor the assistant in production.",
    "metadata": {
      "chunk_index": 24,
      "file_size": 11430,
      "encoding": "utf-8",
      "chunk_count": 28,
      "doc_id": "doc_pavan_dasam_resume_updated",
      "char_length": 199,
      "extension": ".txt",
      "line_count": 99,
      "file_name": "Pavan_Dasam_Resume_Updated.txt"
    }
  },
  {
    "id": "doc_pavan_dasam_resume_updated_chunk_25",
    "text": "JAVA DEVELOPMENT\nClaims & Member Services Backend (Java)\n- Context: Began as a Java backend developer on Anthem's claims and member services platform, building and maintaining the core services that GenAI applications would later integrate with, before transitioning into the GenAI engineering team.\n- Technologies: Java, Spring Boot, REST APIs, SQL, JUnit, Mockito, Git, Jenkins, Agile\n- Technical Details:\n* Developed and maintained backend microservices using Java, Spring Boot and REST APIs for claims processing and member service workflows.",
    "metadata": {
      "encoding": "utf-8",
      "chunk_index": 25,
      "doc_id": "doc_pavan_dasam_resume_updated",
      "extension": ".txt",
      "char_length": 546,
      "file_size": 11430,
      "chunk_count": 28,
      "file_name": "Pavan_Dasam_Resume_Updated.txt",
      "line_count": 99
    }
  },
  {
    "id": "doc_pavan_dasam_resume_updated_chunk_26",
    "text": "* Designed and optimized SQL queries and stored procedures for claims and member data, and wrote unit/integration tests using JUnit and Mockito to ensure service reliability.\n* Collaborated with QA and business teams to troubleshoot production issues and support release cycles via Git/Jenkins CI/CD in an Agile environment, then transitioned into the GenAI engineering team, applying this backend and API expertise to LLM-powered application development.",
    "metadata": {
      "encoding": "utf-8",
      "extension": ".txt",
      "chunk_count": 28,
      "char_length": 455,
      "line_count": 99,
      "doc_id": "doc_pavan_dasam_resume_updated",
      "chunk_index": 26,
      "file_size": 11430,
      "file_name": "Pavan_Dasam_Resume_Updated.txt"
    }
  },
  {
    "id": "doc_pavan_dasam_resume_updated_chunk_27",
    "text": "EDUCATION\nBachelor of Technology (B.Tech) in Computer Science\nJNTUK University \u2022 Graduated 2023\n\nCERTIFICATIONS\n- Certified in Model Context Protocol (MCP) \u2013 Anthropic\n- Databricks Certified \u2013 Generative AI\n- LangChain Certification (LangChain Academy)\n- LangGraph Certification (LangChain Academy)",
    "metadata": {
      "char_length": 298,
      "chunk_index": 27,
      "chunk_count": 28,
      "extension": ".txt",
      "file_size": 11430,
      "encoding": "utf-8",
      "doc_id": "doc_pavan_dasam_resume_updated",
      "line_count": 99,
      "file_name": "Pavan_Dasam_Resume_Updated.txt"
    }
  },
  {
    "id": "doc_pavan_dasam_professional_profile_chunk_0",
    "text": "PAVAN DASAM \u2014 CANDIDATE PROFILE & ASSESSMENT PERSPECTIVES\n\nCandidate: Pavan Dasam\nRole: AI Engineer / Agentic AI Systems Architect\nSpecialization: Generative AI, Multi-Agent Workflows (LangGraph), Production RAG Architectures, FastAPI, Python & Java Microservices\nLocation: India | Email: pavanwork2113@gmail.com | Phone: +91 9640559197\nCertifications: Certified in Model Context Protocol (MCP) by Anthropic, Databricks Certified Generative AI Engineer, LangChain Certified, LangGraph Certified.",
    "metadata": {
      "line_count": 30,
      "file_name": "Pavan_Dasam_Professional_Profile.txt",
      "doc_id": "doc_pavan_dasam_professional_profile",
      "chunk_count": 14,
      "extension": ".txt",
      "chunk_index": 0,
      "encoding": "utf-8",
      "char_length": 495,
      "file_size": 4264
    }
  },
  {
    "id": "doc_pavan_dasam_professional_profile_chunk_1",
    "text": "Assessment Question 1 \u2014 Life Story:\nWhat should we know about your life story in a few sentences?",
    "metadata": {
      "file_name": "Pavan_Dasam_Professional_Profile.txt",
      "chunk_index": 1,
      "chunk_count": 14,
      "doc_id": "doc_pavan_dasam_professional_profile",
      "line_count": 30,
      "extension": ".txt",
      "encoding": "utf-8",
      "char_length": 97,
      "file_size": 4264
    }
  },
  {
    "id": "doc_pavan_dasam_professional_profile_chunk_2",
    "text": "I graduated with a B.Tech in Computer Science from JNTUK University in 2023. I began my career as a software engineer at TAO Digitals developing high-throughput Java and Spring Boot microservices and SQL data pipelines for Anthem in health insurance, ensuring 99.99% service availability. Fascinated by the transformative potential of Large Language Models, I transitioned into GenAI engineering, architecting MemberAssist AI\u2014a real-time RAG-powered copilot resolving complex procedure coverage and claim denial inquiries",
    "metadata": {
      "char_length": 521,
      "line_count": 30,
      "file_name": "Pavan_Dasam_Professional_Profile.txt",
      "encoding": "utf-8",
      "doc_id": "doc_pavan_dasam_professional_profile",
      "chunk_index": 2,
      "extension": ".txt",
      "chunk_count": 14,
      "file_size": 4264
    }
  },
  {
    "id": "doc_pavan_dasam_professional_profile_chunk_3",
    "text": "Currently, I serve as an Agentic AI Engineer at Accenture supporting Voya Financial, where I architect enterprise multi-agent LangGraph workflows like the Autonomous Claims Processing Agent and single-agent MCP tool systems for policy servicing.",
    "metadata": {
      "chunk_index": 3,
      "line_count": 30,
      "char_length": 245,
      "file_size": 4264,
      "encoding": "utf-8",
      "doc_id": "doc_pavan_dasam_professional_profile",
      "chunk_count": 14,
      "extension": ".txt",
      "file_name": "Pavan_Dasam_Professional_Profile.txt"
    }
  },
  {
    "id": "doc_pavan_dasam_professional_profile_chunk_4",
    "text": "Assessment Question 2 \u2014 #1 Superpower:\nWhat's your #1 superpower?",
    "metadata": {
      "extension": ".txt",
      "char_length": 65,
      "chunk_index": 4,
      "chunk_count": 14,
      "line_count": 30,
      "file_size": 4264,
      "encoding": "utf-8",
      "doc_id": "doc_pavan_dasam_professional_profile",
      "file_name": "Pavan_Dasam_Professional_Profile.txt"
    }
  },
  {
    "id": "doc_pavan_dasam_professional_profile_chunk_5",
    "text": "My #1 superpower is architecting reliable, production-grade agentic AI systems grounded by robust enterprise software engineering foundations. While many developers can assemble a basic LLM prototype, my strength is bridging the gap between non-deterministic models and mission-critical enterprise workflows: designing cyclic state graphs in LangGraph, implementing persistent memory, enforcing human-in-the-loop checkpoints, building strict RAG retrieval guardrails with RAGAS evaluation, and backing everything with rock-solid, high-throughput FastAPI and Java/Spring Boot microservices.",
    "metadata": {
      "char_length": 589,
      "file_name": "Pavan_Dasam_Professional_Profile.txt",
      "line_count": 30,
      "doc_id": "doc_pavan_dasam_professional_profile",
      "extension": ".txt",
      "chunk_count": 14,
      "encoding": "utf-8",
      "file_size": 4264,
      "chunk_index": 5
    }
  },
  {
    "id": "doc_pavan_dasam_professional_profile_chunk_6",
    "text": "Assessment Question 3 \u2014 Top 3 Growth Areas:\nWhat are the top 3 areas you'd like to grow in?\nThe top three areas I am actively growing in are:\n1. Low-latency inference optimization and model serving: Deepening hands-on mastery of speculative decoding, vLLM, and TensorRT-LLM to deliver sub-second P95 latencies for real-time conversational voice agents.\n2. Advanced multi-agent memory and GraphRAG: Expanding beyond traditional vector retrieval into graph-based knowledge representations (GraphRAG) and persistent hierarchical memory across distributed agent swarms.",
    "metadata": {
      "chunk_count": 14,
      "file_size": 4264,
      "doc_id": "doc_pavan_dasam_professional_profile",
      "extension": ".txt",
      "char_length": 565,
      "file_name": "Pavan_Dasam_Professional_Profile.txt",
      "chunk_index": 6,
      "line_count": 30,
      "encoding": "utf-8"
    }
  },
  {
    "id": "doc_pavan_dasam_professional_profile_chunk_7",
    "text": "3. Automated LLM red-teaming and continuous evaluation: Scaling synthetic evaluation frameworks, automated vulnerability detection, and LLM-as-a-judge pipelines to proactively identify regressions in production.",
    "metadata": {
      "char_length": 211,
      "chunk_count": 14,
      "chunk_index": 7,
      "line_count": 30,
      "file_name": "Pavan_Dasam_Professional_Profile.txt",
      "doc_id": "doc_pavan_dasam_professional_profile",
      "encoding": "utf-8",
      "extension": ".txt",
      "file_size": 4264
    }
  },
  {
    "id": "doc_pavan_dasam_professional_profile_chunk_8",
    "text": "Assessment Question 4 \u2014 Coworker Misconceptions:\nWhat misconception do your coworkers have about you?",
    "metadata": {
      "extension": ".txt",
      "line_count": 30,
      "char_length": 101,
      "chunk_count": 14,
      "doc_id": "doc_pavan_dasam_professional_profile",
      "file_name": "Pavan_Dasam_Professional_Profile.txt",
      "file_size": 4264,
      "chunk_index": 8,
      "encoding": "utf-8"
    }
  },
  {
    "id": "doc_pavan_dasam_professional_profile_chunk_9",
    "text": "Because of my strong focus on architectural rigor, edge case handling, and strict guardrails (such as mandatory Human-in-the-Loop review, MCP standardization, and citation grounding), coworkers who haven't worked with me closely sometimes assume I might be overly cautious or prefer building complex systems",
    "metadata": {
      "extension": ".txt",
      "encoding": "utf-8",
      "line_count": 30,
      "file_size": 4264,
      "doc_id": "doc_pavan_dasam_professional_profile",
      "chunk_count": 14,
      "chunk_index": 9,
      "file_name": "Pavan_Dasam_Professional_Profile.txt",
      "char_length": 307
    }
  },
  {
    "id": "doc_pavan_dasam_professional_profile_chunk_10",
    "text": "In reality, I am deeply pragmatic and believe in \"simplicity as a prerequisite for reliability.\" I always advocate for the simplest architecture that solves the business problem, using battle-tested patterns first and only adding agentic complexity where the workflow genuinely demands iterative state or multi-step reasoning.",
    "metadata": {
      "doc_id": "doc_pavan_dasam_professional_profile",
      "file_size": 4264,
      "file_name": "Pavan_Dasam_Professional_Profile.txt",
      "line_count": 30,
      "extension": ".txt",
      "chunk_count": 14,
      "chunk_index": 10,
      "char_length": 326,
      "encoding": "utf-8"
    }
  },
  {
    "id": "doc_pavan_dasam_professional_profile_chunk_11",
    "text": "Assessment Question 5 \u2014 Pushing Boundaries & Limits:\nHow do you push your boundaries and limits?",
    "metadata": {
      "encoding": "utf-8",
      "file_size": 4264,
      "chunk_count": 14,
      "line_count": 30,
      "doc_id": "doc_pavan_dasam_professional_profile",
      "char_length": 96,
      "chunk_index": 11,
      "file_name": "Pavan_Dasam_Professional_Profile.txt",
      "extension": ".txt"
    }
  },
  {
    "id": "doc_pavan_dasam_professional_profile_chunk_12",
    "text": "I push my boundaries by immersing myself directly into high-stakes, technically demanding domains where precision is paramount, such as regulated financial insurance and healthcare claims",
    "metadata": {
      "chunk_index": 12,
      "doc_id": "doc_pavan_dasam_professional_profile",
      "line_count": 30,
      "encoding": "utf-8",
      "file_name": "Pavan_Dasam_Professional_Profile.txt",
      "chunk_count": 14,
      "char_length": 187,
      "file_size": 4264,
      "extension": ".txt"
    }
  },
  {
    "id": "doc_pavan_dasam_professional_profile_chunk_13",
    "text": "Rather than staying in comfort zones, I continuously challenge myself by solving 500+ algorithmic problems across LeetCode and competitive programming platforms, mastering emerging technologies early (such as earning official LangChain, LangGraph, and Anthropic MCP certifications within days of release), and building end-to-end working systems from scratch to battle-test bleeding-edge AI papers in production conditions.",
    "metadata": {
      "doc_id": "doc_pavan_dasam_professional_profile",
      "char_length": 423,
      "file_name": "Pavan_Dasam_Professional_Profile.txt",
      "line_count": 30,
      "file_size": 4264,
      "extension": ".txt",
      "chunk_index": 13,
      "chunk_count": 14,
      "encoding": "utf-8"
    }
  },
  {
    "id": "doc_pavan_dasam_ai_engineer_resume_chunk_0",
    "text": "PAVAN DASAM\nAI Engineer | Generative AI | Agentic AI | RAG\nOver 3 Years+ \u2022 Financial Insurance | Health Insurance\n\ud83d\udce7 pavanwork2113@gmail.com\n\ud83d\udcde +91 9640559197\n\ud83d\udccd India\n\ud83c\udf93 LangChain & LangGraph Certified\nPROFESSIONAL SUMMARY\nAI Engineer with over 3 years of experience designing, building and deploying enterprise Generative AI and Agentic AI solutions across Financial\nInsurance and Health Insurance domains. Hands-on experience developing production-oriented RAG applications, LLM-powered assistants and multi-step",
    "metadata": {
      "doc_id": "doc_pavan_dasam_ai_engineer_resume",
      "file_name": "Pavan_Dasam_AI_Engineer_Resume.pdf",
      "char_length": 511,
      "author": "",
      "extension": ".pdf",
      "chunk_index": 0,
      "file_size": 51278,
      "chunk_count": 18,
      "title": "",
      "page_count": 2
    }
  },
  {
    "id": "doc_pavan_dasam_ai_engineer_resume_chunk_1",
    "text": "agentic workflows using Python, LangChain and LangGraph. Skilled across the full GenAI application lifecycle \u2014 prompt engineering, embeddings, vector\nsearch, retrieval pipelines, tool integration, structured outputs, evaluation and guardrails \u2014 with practical exposure to FastAPI-based API development and\nDocker/Azure deployment. Experienced collaborating with architects, product owners, SMEs and compliance stakeholders to translate regulated,\nenterprise business requirements into reliable, grounded and auditable AI systems.\nTECHNICAL SKILLS\nProgramming\nPython, SQL\nGenerative AI",
    "metadata": {
      "chunk_count": 18,
      "doc_id": "doc_pavan_dasam_ai_engineer_resume",
      "file_size": 51278,
      "char_length": 584,
      "file_name": "Pavan_Dasam_AI_Engineer_Resume.pdf",
      "chunk_index": 1,
      "author": "",
      "title": "",
      "page_count": 2,
      "extension": ".pdf"
    }
  },
  {
    "id": "doc_pavan_dasam_ai_engineer_resume_chunk_2",
    "text": "Generative AI, Large Language Models (LLMs), Prompt Engineering, RAG, Embeddings, Semantic Search, Context\nManagement, Structured Outputs\nAgentic AI\nAI Agents, Tool Calling, Agentic Workflows, State Management, Human-in-the-Loop, Multi-Agent Concepts\nFrameworks\nLangChain, LangGraph, FastAPI, Pydantic\nLLMs\nOpenAI GPT Models, Azure OpenAI, Anthropic Claude\nVector Databases / Search\nFAISS, ChromaDB, Azure AI Search\nRAG Pipeline\nDocument Loading, Chunking (RecursiveCharacterTextSplitter), Embeddings, Vector Search, Top-K Retrieval,\nContext Augmentation, Reranking Concepts, Metadata Filtering",
    "metadata": {
      "file_name": "Pavan_Dasam_AI_Engineer_Resume.pdf",
      "doc_id": "doc_pavan_dasam_ai_engineer_resume",
      "title": "",
      "char_length": 594,
      "author": "",
      "file_size": 51278,
      "chunk_count": 18,
      "chunk_index": 2,
      "extension": ".pdf",
      "page_count": 2
    }
  },
  {
    "id": "doc_pavan_dasam_ai_engineer_resume_chunk_3",
    "text": "AI Evaluation\nRAGAS, LLM-as-a-Judge, Groundedness, Faithfulness, Relevance, Hallucination Evaluation\nResponsible AI / Guardrails\nPrompt Injection Protection, Content Filtering, PII Handling, Output Validation, Human Escalation\nAPIs / Backend\nREST APIs, FastAPI, JSON, API Integration\nCloud / Deployment\nAzure, Azure OpenAI, Docker, Git, GitHub, CI/CD Fundamentals\nPROFESSIONAL EXPERIENCE\nAccenture | Agentic AI Engineer\nClient: Voya Financial \u2013 Financial Insurance \u2022 Generative AI & Agentic AI \u2022 Jun 2024 \u2013 Present\n\u25c6 PRODUCTS / PROJECTS: Autonomous Claims Processing Agent \u2014 Agentic AI \u2605",
    "metadata": {
      "file_name": "Pavan_Dasam_AI_Engineer_Resume.pdf",
      "file_size": 51278,
      "author": "",
      "title": "",
      "chunk_count": 18,
      "page_count": 2,
      "char_length": 587,
      "extension": ".pdf",
      "chunk_index": 3,
      "doc_id": "doc_pavan_dasam_ai_engineer_resume"
    }
  },
  {
    "id": "doc_pavan_dasam_ai_engineer_resume_chunk_4",
    "text": "Context: Voya's claims operations span supplemental health, life and disability, and in 2026 brought Leave/PFML/Short-Term Disability claims administration\nin-house for new business. Designed a multi-agent workflow, rather than a single LLM call, to process incoming claims end-to-end.\nMulti-Agent Workflow: New Claim \u2192 Intake Agent \u2192 Document Verification Agent \u2192 Policy Retrieval Agent \u2192 Eligibility Agent \u2192 Claims Analysis Agent \u2192\nFraud/Risk Agent \u2192 Recommendation Agent \u2192 Human Claims Examiner",
    "metadata": {
      "char_length": 497,
      "file_size": 51278,
      "author": "",
      "page_count": 2,
      "title": "",
      "doc_id": "doc_pavan_dasam_ai_engineer_resume",
      "chunk_index": 4,
      "extension": ".pdf",
      "chunk_count": 18,
      "file_name": "Pavan_Dasam_AI_Engineer_Resume.pdf"
    }
  },
  {
    "id": "doc_pavan_dasam_ai_engineer_resume_chunk_5",
    "text": "Technologies: LangGraph, Azure OpenAI, Python, FastAPI, Azure Service Bus / Event Grid, Azure AI Search, PostgreSQL, Redis, Docker, AKS\n\u25c6 Voya Claims Intelligence Copilot \u2014 GenAI\nContext: Voya's Claims Center supports claim initiation, document upload and status tracking across life, disability and supplemental health products.\nExaminers needed a faster way to understand large claim files spanning medical documents, claim forms, employer information, policy documents and\ncorrespondence.",
    "metadata": {
      "title": "",
      "file_name": "Pavan_Dasam_AI_Engineer_Resume.pdf",
      "char_length": 491,
      "doc_id": "doc_pavan_dasam_ai_engineer_resume",
      "chunk_count": 18,
      "author": "",
      "extension": ".pdf",
      "chunk_index": 5,
      "file_size": 51278,
      "page_count": 2
    }
  },
  {
    "id": "doc_pavan_dasam_ai_engineer_resume_chunk_6",
    "text": "RAG Architecture: Documents \u2192 OCR/Document Extraction \u2192 Chunking \u2192 Embeddings \u2192 Vector DB \u2192 RAG \u2192 LLM \u2192 Structured Claims Summary\nTechnologies: Azure OpenAI / GPT, LangChain, Python, FastAPI, Azure AI Search, Blob Storage, PostgreSQL, React, Application Insights\nDesigned and built a multi-agent LangGraph workflow spanning Intake, Document Verification, Policy Retrieval, Eligibility, Claims Analysis, Fraud/Risk and\nRecommendation agents to process disability, life and supplemental health claims.\n\u25ba",
    "metadata": {
      "author": "",
      "extension": ".pdf",
      "file_size": 51278,
      "chunk_index": 6,
      "file_name": "Pavan_Dasam_AI_Engineer_Resume.pdf",
      "chunk_count": 18,
      "char_length": 501,
      "doc_id": "doc_pavan_dasam_ai_engineer_resume",
      "page_count": 2,
      "title": ""
    }
  },
  {
    "id": "doc_pavan_dasam_ai_engineer_resume_chunk_7",
    "text": "Developed the Intake Agent to classify incoming claims and extract claimant and policy information, and the Document Verification Agent to check received\ndocuments against claim-type requirements and flag missing items.\n\u25ba\nImplemented the Policy Retrieval Agent using RAG over certificate/policy language to surface the applicable coverage sections for each claim.\n\u25ba\nDeveloped the Eligibility Agent to validate coverage dates, plan eligibility and applicable rules via internal APIs and rules-engine integration.\n\u25ba",
    "metadata": {
      "doc_id": "doc_pavan_dasam_ai_engineer_resume",
      "file_size": 51278,
      "extension": ".pdf",
      "chunk_index": 7,
      "char_length": 513,
      "chunk_count": 18,
      "author": "",
      "file_name": "Pavan_Dasam_AI_Engineer_Resume.pdf",
      "page_count": 2,
      "title": ""
    }
  },
  {
    "id": "doc_pavan_dasam_ai_engineer_resume_chunk_8",
    "text": "Built the Fraud/Risk Agent to flag unusual claim patterns for review, and the Recommendation Agent to assemble supporting evidence, cite policy sections,\nand produce a confidence-scored recommended next action for the human examiner.\n\u25ba\nImplemented human-in-the-loop routing so claims examiners review and finalize every agent-recommended action before it is applied \u2014 e.g., a sample\noutput flags 4/5 documents received, cites Policy Section 7.2, and recommends requesting the missing employer statement at 94% confidence, routed for\nhuman review.\n\u25ba",
    "metadata": {
      "chunk_index": 8,
      "page_count": 2,
      "chunk_count": 18,
      "doc_id": "doc_pavan_dasam_ai_engineer_resume",
      "file_name": "Pavan_Dasam_AI_Engineer_Resume.pdf",
      "file_size": 51278,
      "title": "",
      "char_length": 548,
      "extension": ".pdf",
      "author": ""
    }
  },
  {
    "id": "doc_pavan_dasam_ai_engineer_resume_chunk_9",
    "text": "Selected LangGraph over a simple LangChain chain because the claims process required persistent state, conditional branching between agents, and\nhuman-in-the-loop checkpoints.\n\u25ba\nBuilt a GenAI copilot that ingests claim documents and produces a structured summary for examiners \u2014 claim type, reason, missing documents, relevant\npolicy sections, potential issues and a recommended next step \u2014 instead of requiring manual review of the full file.\n\u25ba\nImplemented OCR-based document extraction, chunking and embedding generation across heterogeneous claim file formats.\n\u25ba",
    "metadata": {
      "author": "",
      "doc_id": "doc_pavan_dasam_ai_engineer_resume",
      "char_length": 565,
      "file_name": "Pavan_Dasam_AI_Engineer_Resume.pdf",
      "page_count": 2,
      "chunk_index": 9,
      "file_size": 51278,
      "title": "",
      "chunk_count": 18,
      "extension": ".pdf"
    }
  },
  {
    "id": "doc_pavan_dasam_ai_engineer_resume_chunk_10",
    "text": "Developed RAG retrieval over policy and claims documentation to ground each generated summary in the applicable plan language.\n\u25ba",
    "metadata": {
      "file_name": "Pavan_Dasam_AI_Engineer_Resume.pdf",
      "doc_id": "doc_pavan_dasam_ai_engineer_resume",
      "char_length": 128,
      "extension": ".pdf",
      "author": "",
      "page_count": 2,
      "chunk_index": 10,
      "title": "",
      "file_size": 51278,
      "chunk_count": 18
    }
  },
  {
    "id": "doc_pavan_dasam_ai_engineer_resume_chunk_11",
    "text": "TAO Digitals | Software Engineer\nClient: Anthem \u2013 Health Insurance \u2022 Java Development & Generative AI \u2022 Mar 2023 \u2013 May 2024\n\u25c6 GENAI ENGINEER \u2014 MemberAssist AI \u2014 GenAI Member Service Copilot\nContext: Members contact support with questions such as whether a procedure is covered, what their deductible is, why a claim was denied, expected out-of-\npocket cost, provider network status and what an EOB means. Support agents needed to search across benefit documents, policy information, claims data\nand knowledge bases to answer them.",
    "metadata": {
      "page_count": 2,
      "file_size": 51278,
      "chunk_count": 18,
      "chunk_index": 11,
      "title": "",
      "file_name": "Pavan_Dasam_AI_Engineer_Resume.pdf",
      "extension": ".pdf",
      "doc_id": "doc_pavan_dasam_ai_engineer_resume",
      "author": "",
      "char_length": 530
    }
  },
  {
    "id": "doc_pavan_dasam_ai_engineer_resume_chunk_12",
    "text": "Architecture: Member/CSR \u2192 AI Assistant \u2192 Intent Detection \u2192 RAG \u2192 Member/Claims APIs + Vector DB \u2192 LLM \u2192 Guardrails \u2192 Response\nTechnologies: Azure OpenAI / OpenAI, LangChain, Python, FastAPI, Azure AI Search, Vector Database, API Gateway, Azure Functions / AKS, Application\nInsights, LangSmith\n\u25c6 JAVA DEVELOPMENT \u2014 Claims & Member Services Backend (Java)\nContext: Began as a Java backend developer on Anthem's claims and member services platform, building and maintaining the core services that GenAI\napplications would later integrate with, before transitioning into the GenAI engineering team.",
    "metadata": {
      "file_size": 51278,
      "title": "",
      "page_count": 2,
      "author": "",
      "chunk_index": 12,
      "doc_id": "doc_pavan_dasam_ai_engineer_resume",
      "extension": ".pdf",
      "char_length": 596,
      "file_name": "Pavan_Dasam_AI_Engineer_Resume.pdf",
      "chunk_count": 18
    }
  },
  {
    "id": "doc_pavan_dasam_ai_engineer_resume_chunk_13",
    "text": "Technologies: Java, Spring Boot, REST APIs, SQL, JUnit, Mockito, Git, Jenkins, Agile\nEDUCATION\nBachelor of Technology (B.Tech)\nJNTUK University \u2022 2023\nCERTIFICATIONS\nBuilt FastAPI endpoints and a React-based interface for examiners to review AI-generated summaries alongside source documents, with Application\nInsights monitoring.\n\u25ba\nApplied guardrails ensuring the copilot assists examiners with information synthesis only, and does not autonomously approve or deny high-impact\ninsurance claims.\n\u25ba",
    "metadata": {
      "page_count": 2,
      "extension": ".pdf",
      "title": "",
      "chunk_count": 18,
      "char_length": 497,
      "file_name": "Pavan_Dasam_AI_Engineer_Resume.pdf",
      "doc_id": "doc_pavan_dasam_ai_engineer_resume",
      "chunk_index": 13,
      "author": "",
      "file_size": 51278
    }
  },
  {
    "id": "doc_pavan_dasam_ai_engineer_resume_chunk_14",
    "text": "Built MemberAssist AI, a RAG-based GenAI assistant that retrieves a member's relevant plan, benefit and claims information and explains it in plain\nlanguage for support agents and members.\n\u25ba\nImplemented intent detection to route member questions \u2014 coverage, deductible, claim denial reason, cost-share, network status, EOB explanation \u2014 to\nthe appropriate retrieval and API path.\n\u25ba\nDeveloped RAG retrieval over benefit documents, policy information and internal knowledge bases, combined with real-time lookups against member and\nclaims APIs.\n\u25ba",
    "metadata": {
      "file_name": "Pavan_Dasam_AI_Engineer_Resume.pdf",
      "file_size": 51278,
      "title": "",
      "author": "",
      "char_length": 544,
      "chunk_count": 18,
      "page_count": 2,
      "chunk_index": 14,
      "doc_id": "doc_pavan_dasam_ai_engineer_resume",
      "extension": ".pdf"
    }
  },
  {
    "id": "doc_pavan_dasam_ai_engineer_resume_chunk_15",
    "text": "Example: for a denied-claim query, the assistant retrieves the claim, denial reason, member benefits and applicable policy, then generates a plain-\nlanguage explanation (e.g., missing prior authorization) along with next steps such as contacting the provider or reviewing appeal options.\n\u25ba\nGenerated embeddings and indexed benefit guides and policy documents in a vector database for semantic search.\n\u25ba\nBuilt FastAPI endpoints and API gateway integration to expose the assistant to CSR-facing tools.\n\u25ba",
    "metadata": {
      "chunk_count": 18,
      "file_size": 51278,
      "chunk_index": 15,
      "author": "",
      "extension": ".pdf",
      "char_length": 501,
      "title": "",
      "doc_id": "doc_pavan_dasam_ai_engineer_resume",
      "file_name": "Pavan_Dasam_AI_Engineer_Resume.pdf",
      "page_count": 2
    }
  },
  {
    "id": "doc_pavan_dasam_ai_engineer_resume_chunk_16",
    "text": "Applied guardrails and grounding checks so responses stayed accurate to member-specific plan data, avoiding incorrect coverage or claim-outcome\nstatements.\n\u25ba\nUsed LangSmith for tracing and debugging LLM calls, and Application Insights for production monitoring.\n\u25ba\nDeveloped and maintained backend microservices using Java, Spring Boot and REST APIs for claims processing and member service workflows.\n\u25ba\nDesigned and optimized SQL queries and stored procedures for claims and member data, and wrote unit/integration tests using JUnit and Mockito to\nensure service reliability.\n\u25ba",
    "metadata": {
      "file_size": 51278,
      "file_name": "Pavan_Dasam_AI_Engineer_Resume.pdf",
      "author": "",
      "extension": ".pdf",
      "chunk_index": 16,
      "chunk_count": 18,
      "doc_id": "doc_pavan_dasam_ai_engineer_resume",
      "title": "",
      "char_length": 577,
      "page_count": 2
    }
  },
  {
    "id": "doc_pavan_dasam_ai_engineer_resume_chunk_17",
    "text": "Collaborated with QA and business teams to troubleshoot production issues, supporting release cycles via Git and Jenkins CI/CD pipelines in an Agile\nenvironment.\n\u25ba\nTransitioned into the GenAI engineering team, applying backend and API expertise to LLM-powered application development.\n\u25ba\nDatabricks Certified \u2013 Generative AI\n\u25ba\nLangChain Certification\n\u25ba\nLangGraph Certification\n\u25ba",
    "metadata": {
      "title": "",
      "chunk_index": 17,
      "doc_id": "doc_pavan_dasam_ai_engineer_resume",
      "extension": ".pdf",
      "file_size": 51278,
      "file_name": "Pavan_Dasam_AI_Engineer_Resume.pdf",
      "chunk_count": 18,
      "author": "",
      "char_length": 377,
      "page_count": 2
    }
  }
];
