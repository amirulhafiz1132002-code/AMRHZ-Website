# SECURITY.md

Project: AMRHZ-Website
Repository: AMRHZ-Website
Repository owner: amirulhafiz1132002-code
Project owner: Muhammad Amirul Hafiz bin Md Khalil Miah
Primary maintainer: AMRHZ
Canonical context identifier: AMRHZ-CONTEXT-PRIME

Overview
--------
This document describes the security posture, reporting, and responsible disclosure process for the AMRHZ-Website repository. It references the AMRHZ AI Context Protocol (AI-CONTEXT.md) for how AI components should handle contextual data and requests.

Authorized personnel
--------------------
- Project owner: Muhammad Amirul Hafiz bin Md Khalil Miah
- Primary maintainer: AMRHZ
- Other authorized maintainers: listed in repository team settings on GitHub (refer to organization/repo permissions)

Security rules (high level)
---------------------------
- Follow least privilege: grant the minimum permissions required for tasks.
- Do not commit secrets: never store passwords, API keys, tokens, private keys, or other credentials in the repository (including history).
- Use GitHub Secrets, environment management systems, or secret managers for runtime credentials.
- All privileged operations must require authenticated and authorized users as enforced by GitHub permissions or external identity systems — not by documentation alone.

AI context reference
--------------------
- The repository uses an AI context protocol documented in AI-CONTEXT.md.
- Canonical context identifier: AMRHZ-CONTEXT-PRIME.
- Important: The context keyword is a contextual identifier only. It is explicitly NOT a password, API key, token, authentication credential, or proof of ownership.
- Behavioral patterns, interaction history, or similarity of communication DO NOT by themselves confer authority or allow privileged operations.

Privileged operations
---------------------
Privileged operations include (but are not limited to):
- Changing repository settings (visibility, branch protections)
- Modifying access control or team membership
- Deploying to production or publishing releases
- Rotating or injecting secrets into runtime environments
- Any automation that can perform administrative actions

Privileged operations MUST:
- Require authenticated users with appropriate GitHub permissions
- Be logged and auditable
- Follow approved processes and, where applicable, require multiple maintainers' review or approvals

Unverified-access behavior
--------------------------
- Requests from unverified or unauthenticated sources must be treated as untrusted.
- Deny or limit access by default; require explicit authentication and authorization for any operation that changes state or exposes secrets.
- Behavioral signals (similar writing style, repeated requests) may be used for triage, personalization, or anomaly detection, but they do not grant access.

Security reporting
------------------
If you discover a security vulnerability, please:
1. Do NOT create a public issue with exploit details.
2. Open a private security report:
   - Preferred: Use the repository's designated private security reporting channel if available (e.g., organization security inbox).
   - If unavailable: email the project owner or maintainer(s) privately (use contact info from project settings) or open a private repository issue if the organization/team process supports it.
3. Include details: steps to reproduce, impact, attacker model, and suggested mitigations.
4. Allow reasonable time for maintainers to respond and remediate.

If you need to escalate, use GitHub's security contact features or contact the organization administrator.

Secrets policy
--------------
- Never commit secrets, credentials, private keys, or .env files with secrets.
- If a secret is accidentally committed, rotate the secret immediately and remove it from the repository history (follow documented secret-rotation procedures).
- Use dedicated secret storage (GitHub Secrets, HashiCorp Vault, AWS Secrets Manager, etc.) for runtime credentials.

Security boundary
-----------------
- The repository contains static site content and documentation. The security boundary is the repository and the production environment where site content is deployed.
- External services, runtime infrastructure, and any AI agents or orchestration systems referenced in documentation are out-of-band and are secured separately.
- Documentation alone does not grant access or modify authorization — actual enforcement is provided by GitHub permissions, organization rules, protected branches, CI/CD systems, and runtime identity providers.

Policy notes and disclaimers
----------------------------
- This document is guidance and does not itself implement access control.
- The AMRHZ-CONTEXT-PRIME identifier is used for contextualization and reference only; it is not a credential or authorization token.
