# Kaustubh Trivedi — Projects

Most of my work sits at the point where LLM pipelines stop being demos and
start needing real engineering: durable state, model routing, failure
recovery, and knowing when not to trust the model's output.

## Rendure — self-hosted multi-agent resume tailoring (open source)

**Repository**: github.com/KaustubhTrivedi/rendure-v2
**Live**: rendure.kaustubhsstuff.com
**Stack**: Python agent pipeline, Hono API, React, Postgres, OpenRouter,
RenderCV, Docker Compose

You give Rendure a job posting URL. It scrapes the posting, generates a
tailored resume, runs a QA pass over the result, and stores every run in
Postgres for review. It does not submit applications — it prepares resume
versions and QA notes so you review the output and apply yourself.

The hard part is not generation, it is refusing to invent things. Language
models will happily add a framework you have never touched if the job
description mentions it. So generation and QA are separate agents with opposing
incentives: the generation agent produces a candidate resume, and the QA agent
audits every claim back to the source resume under strict grounding rules and
rejects anything unsupported. That works far better than one agent asked
politely to be accurate.

What it includes:

- Web dashboard for submitting jobs and tracking pipeline progress.
- Python agent pipeline covering job scraping, tailoring, QA, and confirmation.
- Postgres-backed audit trail for jobs, resume versions, QA reviews, and
  pipeline events.
- Live job-detail updates over server-sent events.
- RenderCV PDF downloads for approved resume versions.
- Single-user local profile with encrypted OpenRouter API key storage.
- Optional Telegram webhook submission and completion notifications.
- One-command Docker Compose bootstrap for self-hosting.

## MacSTT — local-first speech-to-text for macOS (open source)

**Repository**: github.com/KaustubhTrivedi/MacSTT
**Stack**: Swift, whisper.cpp, MLX Audio, ScreenCaptureKit

A private, local-first speech-to-text studio for macOS, with a workflow
deliberately familiar to LM Studio users: discover models, keep a local model
library, load one, and run inference in a focused workspace.

Audio and transcript content is never uploaded. Network access is used only to
download model weights from Hugging Face.

- Downloads curated whisper.cpp and MLX Audio STT models from Hugging Face with
  progress and cancellation, or imports existing `.bin` and `.gguf` files.
- Records 16 kHz microphone audio with explicit macOS permission handling.
- Records meetings from microphone, system audio via ScreenCaptureKit, or both
  as separate stems aligned into one recording.
- Transcribes locally with whisper.cpp or native MLX acceleration, with
  language auto-detection and speech-to-English translation on multilingual
  models.
- Produces an editable full transcript plus timestamped segments, exportable as
  plain text, SRT, WebVTT, or JSON.
- Writes finalised audio segments to disk during recording rather than holding
  a whole meeting in memory, so a crash retains everything but an incomplete
  tail.

Distributed with a Homebrew tap at github.com/KaustubhTrivedi/homebrew-macstt.

## Agent orchestration platform

**Stack**: Postgres, TypeScript, Python, OpenRouter, self-hosted

A set of specialised agents that run continuously and hand work down a chain,
each stage enriching a shared record. Built to answer a question I kept
hitting: how do you run agents for weeks rather than minutes?

The answer turned out to be avoiding agent-to-agent chat entirely. Agents
coordinate through a Postgres state machine and cron scheduling, not by talking
to each other. Every transition is a durable row, so a crashed agent resumes
from state rather than losing the run.

The pipeline runs four stages under a cron supervisor — discovery, opportunity
intel, people research, and dispatch — all reading from and writing to shared
Postgres state.

Design decisions that mattered:

1. **Model routing by stage.** Structured extraction runs on cheap fast models;
   reasoning-heavy stages route to larger ones.
2. **Supervisor loops over fixed schedules.** A heartbeat process watches agent
   health and escalates to a human only when something needs it.
3. **Evidence requirements.** Every agent output carries typed provenance, and
   unverifiable claims are labelled as inferred rather than asserted.

## Self-hosted homelab infrastructure

**Stack**: Linux, Docker, Dokploy, Tailscale, Caddy, Telegram

Personal Linux server infrastructure where my agents actually run. I operate a
self-hosted OpenClaw agent runtime deployed via Docker and Dokploy behind a
reverse proxy, with Tailscale private networking and Telegram-based
orchestration and alerting.

Alongside it runs a full self-hosted service stack — DNS filtering, monitoring,
databases, CI/CD — which is where a lot of my operations, troubleshooting, and
uptime experience comes from.

I write about self-hosting and agent tooling as **rackgremlin**.

## Personal RAG

**Stack**: R2R, pgvector, Cohere, CouchDB, Caddy

Retrieval over several years of Obsidian notes and development docs, queried
from Telegram. The reranking stage mattered more than the embedding model; raw
vector search kept surfacing plausible but wrong chunks. Runs on the homelab
alongside Obsidian LiveSync over CouchDB, behind Caddy.

## Portfolio chat (this site)

The assistant answering questions on this site is its own RAG service: a Flask
API with ChromaDB vector storage, embeddings and chat routed through
OpenRouter, and a dedicated cross-encoder reranker. Retrieval runs a
distance-threshold filter over the candidate pool before reranking down to the
final chunks handed to the model.

## Magpie — MSc final project

**Stack**: Next.js, React, TypeScript, Go, PostGIS
**Period**: September 2024 – December 2024

A production-grade geospatial web application visualising public amenities
through interactive maps, built as a six-person MSc team project at TU Dublin.

My contribution was the frontend architecture:

- Led frontend architecture using Next.js, React, and TypeScript integrated
  with Go-based REST APIs, handling 58,000+ spatial data points.
- Applied React performance practices — code splitting, memoisation, custom
  hooks — while enforcing WCAG accessibility standards.
- Integrated PostGIS-backed spatial queries, improving geospatial accuracy and
  map responsiveness.
- Created a reusable component library and documentation, improving team
  development speed and design consistency.
