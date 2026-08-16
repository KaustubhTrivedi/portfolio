# Kaustubh Trivedi — Frequently asked questions

Question-and-answer pairs covering what people most often ask on the site.

## What are you doing right now?

I'm Founding Engineer at CueX10 in Dublin, where I've been since July 2026. I
designed and shipped a multi-tenant B2B SaaS platform that runs prospects
through an adaptive consultation, scores buying intent deterministically,
generates AI-tailored briefs, and syncs qualified leads into the client's CRM.
It launched with The Corporate Governance Institute as the first live tenant.

## What kind of roles are you looking for?

I'm open to permanent mid-level engineering roles in Dublin, or remote within
Ireland.

## Where are you based, and can you work in Ireland?

Dublin, Ireland. I hold a Stamp 1G.

## How can someone get in touch with you?

Email is best: kaus12tri@gmail.com. My code is at github.com/KaustubhTrivedi,
I'm on LinkedIn at kaustubhtrivedi07-software-engineer, and my CV is
downloadable from kaustubhsstuff.com.

## How much experience do you have?

Roughly two years of professional engineering experience across Ireland and
India: Founding Engineer at CueX10 since July 2026, Data Scientist Intern
(Custom LLM Scientist) at Orcawise from September 2025 to June 2026, Full Stack
Software Developer at Openspace Services from November 2022 to June 2023, and a
software engineering internship at PPLWork in 2022. Plus an MSc in Computer
Science from TU Dublin.

## What is your experience with AI and LLMs?

It's most of my recent work, and it's production work rather than
experimentation.

At Orcawise I built an end-to-end chatbot over a 10,000+ document corpus using
RAG, LangChain, and a custom fine-tuned Gemma model, improving answer accuracy
by over 20% against baseline while meeting GDPR and HIPAA requirements. It cut
a manual healthcare-sector task from hours to minutes.

At CueX10 I built AI-tailored brief generation into a multi-tenant SaaS
product, deliberately keeping lead scoring deterministic and server-side so
qualification stays auditable rather than depending on model output.

On my own time: Rendure is an open-source two-agent resume pipeline where a QA
agent audits a generation agent against source material, and I run an agent
orchestration platform that keeps agents alive for weeks by coordinating
through Postgres rather than agent-to-agent chat.

## What is your experience with agents specifically?

Multi-agent systems and the infrastructure that keeps them running. The
recurring lesson is that agents fail in production for boring reasons —
lost state, no failure recovery, unverifiable output — so my work focuses on
durable state machines, model routing per stage, and typed provenance on agent
output. I also self-host an OpenClaw agent runtime on my own Linux
infrastructure with Telegram-based orchestration.

## What is your strongest technical area?

Backend and systems work: Java/Spring Boot and Python services, REST API
design, PostgreSQL schema design, row-level security, and query optimisation,
plus Docker and Kubernetes deployment. I'm equally comfortable on the frontend
with React, TypeScript, and Next.js — Magpie was frontend architecture, and
CueX10 involved building the admin consoles as well as the backend.

## Do you have security experience?

Yes, in a hands-on remediation sense. Ahead of client handover at CueX10 I led
a full security audit and remediation pass: closing privilege-escalation paths
in tenant-invite and role-grant functions, relocating CRM access tokens behind
a server-only secrets table, and replacing an insecure SECURITY DEFINER view. I
verified findings against live database state rather than migration files,
because the two drift. I've also designed row-level security policies as the
primary isolation mechanism for a multi-tenant product.

## Do you have production experience, or just side projects?

Both, and the side projects run in production too. At Openspace I built a real
estate platform serving 5,000+ monthly active users on a 50,000+ LOC codebase.
At PPLWork I built payment processing APIs handling 100,000+ monthly
transactions. Both involved on-call support and incident debugging with
Datadog. CueX10 is live with a paying tenant. My own projects are self-hosted
on infrastructure I operate and keep up.

## What measurable results have you delivered?

Over 20% improvement in chatbot answer accuracy through fine-tuning and
retrieval tuning; 40% reduction in deployment effort through Docker and GitHub
Actions pipelines; 30% faster data retrieval through indexing and query
optimisation; 20% improvement in data-retrieval performance on a payment
framework handling 100,000+ monthly transactions; 30% fewer regression and
deployment issues through CI/CD and test coverage.

## What have you built recently that's open source?

**Rendure** (github.com/KaustubhTrivedi/rendure-v2) — a self-hosted multi-agent
resume tailoring pipeline with a Postgres audit trail.

**MacSTT** (github.com/KaustubhTrivedi/MacSTT) — a private, local-first
speech-to-text studio for macOS in Swift, running whisper.cpp or MLX models
entirely on-device, with meeting recording and transcript export to TXT, SRT,
WebVTT, or JSON. Distributed through a Homebrew tap.

## What is your education?

MSc in Computer Science (Advanced Software Development) from Technological
University Dublin, September 2023 to March 2025, Second-Class Honours (2:1).
Before that, a Bachelor of Engineering in Information Technology from the
University of Pune, 2019 to 2022, CGPA 8.86/10.

## Do you write or share anything publicly?

I write about self-hosting and agent tooling as **rackgremlin**, and my
projects are open source on GitHub.

## What do you do outside of commercial work?

I self-host most of my own infrastructure — a Linux homelab running an agent
runtime, my personal RAG system over years of Obsidian notes, DNS filtering,
monitoring, databases, and CI/CD, behind Caddy and Tailscale. Running my own
infrastructure is where a lot of the operational knowledge comes from.

I've also worked part-time at Circle K in Dublin since January 2025, 22.5+
hours a week alongside my MSc, the job search, and open-source work.
