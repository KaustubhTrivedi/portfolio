# Kaustubh Trivedi — CV

## Contact and status

- Location: Dublin, Ireland
- Work permission: Stamp 1G
- Email: kaus12tri@gmail.com
- Phone: +353 089 495 4389
- Portfolio: kaustubhsstuff.com
- GitHub: github.com/KaustubhTrivedi
- LinkedIn: linkedin.com/in/kaustubhtrivedi07-software-engineer

## Profile

Full stack software engineer with roughly two years of professional experience
building scalable, production-grade applications across Java/Spring Boot
backends and React/TypeScript frontends, plus hands-on delivery of LLM-powered
systems in production. Track record of improving system performance and
deployment efficiency across enterprise-scale codebases, with working knowledge
of event-driven development, microservices architecture, and monolith
decomposition. MSc Computer Science graduate, comfortable driving product
features from design through to production.

## Technical skills

- **Languages**: Java, Kotlin, TypeScript, JavaScript, Python, Go, SQL, Swift
- **Backend and frameworks**: Spring Boot, Node.js, FastAPI, Celery, Supabase
  Edge Functions (Deno), RESTful API design, microservices, multi-tenant
  architecture, Kafka, GraphQL
- **Frontend**: React, Next.js, Vite, TypeScript, React Redux, HTML, CSS,
  Tailwind CSS, shadcn/ui
- **Infrastructure and DevOps**: Docker, Docker Compose, Kubernetes, AWS,
  Azure, Cloudflare, Caddy, Dokploy, Tailscale, Linux, GitHub Actions, Jenkins,
  CI/CD, Datadog
- **Databases**: PostgreSQL, row-level security (RLS), schema design and
  migrations, MySQL, MongoDB, DynamoDB, Redis, PostGIS, PgBouncer, pgvector
- **AI and integrations**: LLM inference and prompt design,
  retrieval-augmented generation (RAG), LangChain, LLM fine-tuning, Azure
  Machine Learning, NLP, structured output extraction, embeddings, HubSpot CRM
  API
- **Testing and quality**: JUnit, Selenium, TestNG, Postman, unit / integration
  / API testing
- **Methodologies**: Agile Scrum and SAFe, domain-driven design, event-driven
  development, monolith decomposition, systems design, security auditing, RLS
  policy design, GDPR/HIPAA compliance

## Professional experience

### Founding Engineer — CueX10, Dublin
**July 2026 – present (current role)**

- Designed and shipped a production multi-tenant B2B SaaS platform that guides
  prospects through an adaptive consultation, scores buying intent
  deterministically, generates AI-tailored briefs, and syncs qualified leads
  into the client CRM. Launched with The Corporate Governance Institute as the
  first live tenant.
- Architected tenant isolation from the ground up with a tenant-scoped
  PostgreSQL schema, row-level security on every table, and a superadmin
  console separated from per-tenant admin, so onboarding a new client requires
  configuration rather than a fork.
- Built the backend as roughly 20 Supabase Edge Functions (Deno/TypeScript)
  spanning consultation lifecycle, session-token validation, AI inference, CRM
  sync, and admin operations, with anonymous prospect access mediated entirely
  through RLS-controlled reads and server-validated session tokens.
- Implemented a deterministic intent-scoring engine using weighted question
  responses and ICP rules, executed server-side on every answer so lead
  qualification stays auditable and reproducible independent of LLM output.
- Delivered a bidirectional HubSpot integration covering contact upsert, deal
  create/update, and transcript notes with per-tenant credential storage;
  eliminated consultation finalisation timeouts by moving the blocking CRM call
  to background execution.
- Led a full security audit and remediation pass ahead of client handover,
  closing privilege-escalation paths in tenant-invite and role-grant functions,
  relocating CRM access tokens behind a server-only secrets table, and
  replacing an insecure SECURITY DEFINER view. Verified against live database
  state rather than migration files.

### Data Scientist Intern (Custom LLM Scientist) — Orcawise, Dublin
**September 2025 – June 2026**

- Developed an end-to-end chatbot over a 10,000+ document corpus using
  retrieval-augmented generation, LangChain, and a custom fine-tuned LLM
  (Gemma); cut a manual healthcare-sector task from hours to minutes while
  meeting GDPR and HIPAA requirements.
- Improved answer accuracy by over 20% against baseline by fine-tuning the LLM
  and tuning RAG retrieval in Python and Azure Machine Learning.
- Ensured data integrity and quality through Python automation, providing
  reliable inputs for training and inference pipelines.
- Rolled the chatbot out across multiple business teams, leading design
  sessions and producing functional design documents.
- Maintained process documentation and communication between stakeholders and
  IT development teams.

### Full Stack Software Developer — Openspace Services Pvt Ltd, India
**November 2022 – June 2023**

- Architected a full-stack real-estate management platform using Spring Boot
  microservices and a Next.js/TypeScript frontend, serving 5,000+ monthly
  active users on a 50,000+ LOC production codebase.
- Designed PostgreSQL schemas and optimised queries with indexing strategies,
  achieving 30% faster data retrieval; applied monolith decomposition patterns
  to isolate service boundaries as the platform scaled.
- Built and documented RESTful APIs; managed frontend state with React Redux.
- Implemented Docker-based deployment pipelines with GitHub Actions CI/CD,
  reducing manual deployment effort by 40% across Dev, UAT, and Production.
- Worked across a 5-person Agile Scrum team with UX, QA, and Data stakeholders.
- Monitored production services with Datadog, resolving performance incidents
  under tight SLAs.

### Software Engineering Intern — PPLWork, Remote (India)
**March 2022 – September 2022**

- Designed and implemented Spring Boot REST APIs backed by PostgreSQL and MySQL
  for a payment processing framework handling 100,000+ monthly transactions.
- Optimised database queries and indexing strategies, improving data-retrieval
  performance by 20%; evaluated event-driven patterns for asynchronous
  transaction processing at scale.
- Dockerised backend services, cutting environment setup from hours to minutes.
- Built automated CI/CD pipelines with test coverage improvements, reducing
  regression and deployment issues by 30%.
- Monitored on-call production incidents using Datadog dashboards.
- Authored technical documentation and API specifications.

## Education

### Technological University Dublin
**MSc in Computer Science (Advanced Software Development)** — September 2023 to
March 2025. Grade: Second-Class Honours (2:1).

### University of Pune
**Bachelor of Engineering in Information Technology** — September 2019 to June
2022. CGPA: 8.86/10.

## Additional experience

**Customer Service Assistant (part-time) — Circle K, Dublin.** January 2025 to
present. A customer-facing retail role of 22.5+ hours per week, held alongside
MSc studies, an active engineering job search, and open-source project work.

## Certifications

- The Complete Agentic AI Engineering Course (2025), Udemy — ongoing
- AI Fluency: Framework & Foundations — Anthropic
- Claude 101 — Anthropic
- Claude Code in Action — Anthropic
- Software Engineer, Java (Basic), JavaScript (Basic), React (Basic) —
  HackerRank
