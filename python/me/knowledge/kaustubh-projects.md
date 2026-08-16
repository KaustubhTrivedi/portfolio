# Kaustubh Trivedi — Projects

Most of my work sits at the point where LLM pipelines stop being demos and
start needing real engineering: durable state, model routing, failure
recovery, and knowing when not to trust the model's output.

## Rendure — multi-agent resume tailoring (open source)

**Stack**: Next.js, FastAPI, RenderCV
**Live**: rendure.kaustubhsstuff.com
**Source**: github.com/KaustubhTrivedi/rendure-v2

Rendure takes a resume and a job description and produces typeset RenderCV
YAML.

The hard part is not generation, it is refusing to invent things. Language
models will happily add a framework you have never touched if the job
description mentions it. So Rendure runs a two-stage generation-to-QA
pipeline. The generation agent produces a candidate resume; a separate QA
agent audits every claim back to the source resume under strict grounding
rules and rejects anything unsupported.

Splitting these into two agents with opposing incentives works far better than
one agent asked politely to be accurate.

## Agent orchestration platform

**Stack**: Postgres, TypeScript, Python, OpenRouter, self-hosted

A set of specialised agents that run continuously and hand work down a chain,
each stage enriching a shared record. Built to answer a question I kept
hitting: how do you run agents for weeks rather than minutes?

The answer turned out to be avoiding agent-to-agent chat entirely. Agents
coordinate through a Postgres state machine and cron scheduling, not by
talking to each other. Every transition is a durable row, so a crashed agent
resumes from state rather than losing the run.

The pipeline runs four stages under a cron supervisor — discovery, opportunity
intel, people research, and dispatch — all reading from and writing to shared
Postgres state.

Design decisions that mattered:

1. **Model routing by stage.** Structured extraction runs on cheap fast
   models; reasoning-heavy stages route to larger ones.
2. **Supervisor loops over fixed schedules.** A heartbeat process watches agent
   health and escalates to a human only when something needs it.
3. **Evidence requirements.** Every agent output carries typed provenance, and
   unverifiable claims are labelled as inferred rather than asserted.

## Personal RAG

**Stack**: R2R, pgvector, Cohere, CouchDB, Caddy

Retrieval over several years of Obsidian notes and development docs, queried
from Telegram.

The reranking stage mattered more than the embedding model; raw vector search
kept surfacing plausible but wrong chunks. Runs on my homelab alongside
Obsidian LiveSync over CouchDB, behind Caddy.

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

- Led frontend architecture for the application.
- Implemented a component-driven architecture using Next.js, React, and
  TypeScript, integrating with Go-based REST APIs.
- Applied React performance practices including code splitting, memoisation,
  and custom hooks.
- Integrated PostGIS-backed spatial queries, improving geospatial accuracy and
  map responsiveness.
- Created component documentation and reusable UI patterns, improving team
  development speed and design consistency.
