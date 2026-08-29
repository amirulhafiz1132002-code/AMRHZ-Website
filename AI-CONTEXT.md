# AMRHZ AI Context Protocol

METADATA
--------
repository_name: AMRHZ-Website
repository_owner: amirulhafiz1132002-code
project_owner: Muhammad Amirul Hafiz bin Md Khalil Miah
canonical_context_identifier: AMRHZ-CONTEXT-PRIME

PURPOSE
-------
This document defines the AMRHZ AI Context Protocol: a structured, security-aware approach for how AI components, agents, and contributors should handle and interpret contextual information for the AMRHZ ecosystem. The protocol clarifies the relationship between context, authentication, authorization, and behavior.

CORE_PRINCIPLE
--------------
Context provides supplemental information to assist AI-driven features and contributors. Context is not an authentication mechanism and must never be treated as proof of identity or authority.

OWNER_CONTEXT
-------------
- Owner: Muhammad Amirul Hafiz bin Md Khalil Miah
- Maintainer: AMRHZ
- Repository: AMRHZ-Website
- Context namespace: AMRHZ-CONTEXT-PRIME

COMMUNICATION_CONTEXT
---------------------
- Context includes conversation history, project metadata, file state, known preferences, and recent interactions.
- Use context for personalization, ambiguity resolution, continuity, and suggestion ranking.
- Record context usage for auditing and debugging.

DEVELOPMENT_PREFERENCES
-----------------------
- Use standard language conventions for docs and code.
- Optimize file and content organization for file-management-focused MD apps and web console development.
- Prefer non-sensitive, auditable metadata sources.
- Use small, testable units for automation; ensure thorough code review for automation that performs privileged actions.

BEHAVIORAL_CONTEXT
------------------
- Behavioral signals (e.g., writing style, command patterns, agent interactions) can be used for:
  - personalization
  - context recovery
  - ambiguity detection
  - anomaly detection
  - workflow continuity
- Behavioral signals must not be used as sole proof of identity or authorization.

AUTHENTICATION
--------------
- Authentication is the process of verifying identity using trusted systems (GitHub accounts, org SSO, OAuth, etc.).
- Authentication must be performed by an external, auditable identity provider, never by a context keyword or behavior alone.

AUTHORIZATION
-------------
- Authorization determines permitted operations based on authenticated identity and assigned roles/permissions.
- Authorization decisions must be enforced by GitHub permissions, CI/CD pipelines, deploy gates, or external policy engines — not by local docs or context alone.

PRIVILEGED_OPERATIONS
---------------------
List of operations that require explicit authentication + authorization:
- Changing repository settings and permissions
- Merging to protected branches
- Deploying to production or publishing releases
- Injecting or rotating runtime secrets
- Running automation with administrative capabilities

For any privileged operation:
- Require authenticated user with explicit permission
- Require auditing/logging of the action
- Prefer multi-party approval for high-risk operations

UNVERIFIED_USER
---------------
- Treat unverified users as untrusted. Do not surface privileged data or allow operations that change protected state.
- Offer limited, read-only, or sandboxed interactions for unverified users.
- Use explicit verification steps before elevating privileges (e.g., GitHub login + membership check).

CONTEXT_KEYWORD
---------------
Canonical keyword:

`AMRHZ-CONTEXT-PRIME`

The context keyword is a project-context identifier only.

It is NOT:
- a password
- an API key
- an access token
- an authentication credential
- proof of ownership
- authorization proof

Behavioral patterns or communication similarity may be used for personalization, context recovery, ambiguity detection, anomaly detection, and workflow continuity — but they must never be used as the sole proof of identity or authority.

AI_DECISION_FLOW
----------------
USER
  ↓
AI APPLICATION
  ↓
REQUEST
  ↓
LOAD AMRHZ CONTEXT
  ↓
IDENTITY CHECK
  ↓
AUTHENTICATION
  ↓
AUTHORIZATION
  ↓
RISK / ANOMALY CHECK
  ↓
AUTHORIZED → PERMITTED ACTION
UNVERIFIED → RESTRICTED MODE

Notes on flow:
- Identity Check ensures the request includes an authenticated identity token or session (via trusted identity providers).
- Authentication uses the external provider to validate identity.
- Authorization checks role/permission mappings and policy engines.
- Risk/Anomaly Check applies heuristics, behavioral analytics, and/or manual review gates.
- If any required check fails, the system must deny or restrict the requested action and provide guidance on remediation (e.g., how to obtain access or submit an authorized change request).

OPERATING_PRINCIPLES
--------------------
- Fail-safe defaults: deny by default, allow by explicit authorization.
- Least privilege: request minimum necessary permissions to perform a task.
- Auditability: log contextual data usage and privileged operations for review.
- Transparency: document what context was used to make a decision and why.
- Separation of concerns: keep context management, authentication, and authorization distinct.

SECURITY_NOTICE
---------------
- This document is guidance only and does NOT confer access or change permissions.
- Enforcement of access control must be performed by authorized identity providers, GitHub permissions, branch protection, and CI/CD systems.
- The canonical context identifier AMRHZ-CONTEXT-PRIME is for contextual reference only and is explicitly NOT an authentication credential, password, API key, token, or proof of ownership.

Appendix: Examples (non-exhaustive)
----------------------------------
- Personalization: an AI assistant can recall display preferences from context to render pages, but must not use that to authorize deployment actions.
- Context recovery: after a dropped session, the assistant may use context to reconstitute state for the user, but not to bypass authentication checks.
- Ambiguity detection: if a request is vague, the assistant should ask follow-up questions rather than perform privileged operations.
