# DEV-003 — Repository Claim Audit

**Repository:** AMRHZ-Website  
**Audit state:** IMPLEMENTED — PENDING TEST  
**Audit date:** 2026-09-29  
**Method:** repository inspection of AMRHZ-Website plus linked project repositories referenced by the website.

## Audit Result

DEV-003 inspection found that the website contains a mixture of:

- claims directly supported by repository artifacts,
- static/documentary project descriptions,
- claims that require external runtime verification,
- and one implementation mismatch affecting the browser terminal wiring.

The audit does **not** promote runtime capability from static evidence.

## Support Levels

- **REPOSITORY** — a relevant implementation or artifact is observable in GitHub.
- **STATIC_RENDERED** — the website can represent the capability in its static UI.
- **EXTERNAL_RUNTIME** — independently verified runtime/deployment evidence.
- **DOCUMENTARY** — documentation, architecture, roadmap, or intent.
- **INSUFFICIENT** — available evidence does not support the claim at its current strength.

## Findings

| ID | Claim / Surface | Evidence inspected | Support | State interpretation | Limitation | Action |
|---|---|---|---|---|---|---|
| D3-01 | Header: ONLINE | `index.html` static header | STATIC_RENDERED | UNKNOWN for runtime health | Static rendering does not prove runtime health or that the service is online | Clarify as static website availability or remove runtime implication |
| D3-02 | AMRHZ AI System — ACTIVE | Website description; AMRHZ-AI-13 repository contains runnable Python/API artifacts | REPOSITORY, DOCUMENTARY | DEVELOPMENT | No current runtime/deployment verification for the broader system | Narrow wording or map to evidence before treating ACTIVE as runtime status |
| D3-03 | AP1 Orchestrator — BUILDING | Website architecture description; AP1-WEB-Console repository documents orchestration concepts | REPOSITORY, DOCUMENTARY | DEVELOPMENT / architecture work | No dedicated orchestrator runtime was verified | Keep as development language with explicit non-runtime limitation |
| D3-04 | Architecture Core — ACTIVE | Architecture Core repository README and docs | REPOSITORY, DOCUMENTARY | DEVELOPMENT | Repository activity/documentation is not proof of a live runtime | Clarify as active development/documentation |
| D3-05 | AMRHZ Website — PUBLIC | Public GitHub repository and public-facing site artifacts | REPOSITORY, STATIC_RENDERED | VERIFIED for public repository/site artifact | This does not independently verify a production deployment endpoint | Preserve PUBLIC; keep deployment claims separate |
| D3-06 | AMRHZ AI 13 — BUILDING | AMRHZ-AI-13 contains agent, backend, learning, memory and test-related artifacts | REPOSITORY, DOCUMENTARY | DEVELOPMENT | Runtime execution and current health were not verified in this audit | Preserve BUILDING with explicit runtime limitation |
| D3-07 | AP1 Web Console — BUILDING | AP1-WEB-Console contains frontend/backend directories, HTML, docs and tests-related artifacts | REPOSITORY, DOCUMENTARY | DEVELOPMENT | Runtime deployment and current operational health were not verified | Preserve BUILDING with explicit runtime limitation |
| D3-08 | Architecture Core project — DOCUMENTED | Architecture Core README, docs directory and version/status documentation | REPOSITORY, DOCUMENTARY | VERIFIED for documentation presence | Documentation presence does not prove all described architecture is implemented | Preserve DOCUMENTED |
| D3-09 | Development Hub — VERIFIED | DEV-001 state registry, DEV-002 evidence registry and prior live rendering verification | REPOSITORY, STATIC_RENDERED | VERIFIED | Verification covers the static website layer, not backend persistence/auth/agents | Preserve VERIFIED with boundary |
| D3-10 | Changelog — repository history | `changelog.js` calls GitHub commits API and has explicit offline fallback | REPOSITORY | PARTIAL | Code path is observable; current external API success was not re-tested during this audit | Preserve implementation claim; do not call it live runtime telemetry |
| D3-11 | Browser Terminal — interactive interface | `index.html` uses `terminal-output`/`terminal-input`; `script.js` looks for `terminalOutput`, `terminalForm`, `terminalInput` and related elements | REPOSITORY, STATIC_RENDERED | PARTIAL | DOM IDs/required form structure do not currently match the JavaScript selectors | Correct wiring in a separate implementation task before claiming verified terminal behavior |
| D3-12 | Roadmap / planned features | Static roadmap, progress and feedback architecture sections | STATIC_RENDERED, DOCUMENTARY | PLANNED | No implementation is implied by roadmap language | Preserve PLANNED and STATIC labels |

## Important Correction Candidates

1. **ONLINE** is presentation state, not verified runtime health.
2. **ACTIVE** labels should not be read as proof of live runtime capability.
3. **BUILDING** labels are supported as project/development language where repository artifacts exist, but they do not prove operational runtime.
4. **Terminal** needs a separate fix because the current HTML element IDs/form structure do not match the selectors expected by `script.js`.
5. **Changelog** is repository-history integration, not runtime health telemetry.
6. **Roadmap** content is correctly bounded as planned/static.

## Audit Boundary

No backend, authentication, agents, orchestration runtime, AI execution, persistent feedback, or new external integration was implemented by DEV-003.

## Next Step

The audit artifact and renderer must be tested. If the audit renderer passes, a DEV-003 checkpoint can record the verified audit state. Terminal wiring correction remains outside this audit's implementation boundary unless separately approved.
