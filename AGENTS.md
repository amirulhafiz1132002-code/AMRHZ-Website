# AI Working Contract — AMRHZ-Website

This repository's role in the AMRHZ ecosystem: **Responsive website and UI**.

## Required reading
1. [Local adoption status](docs/AMRHZ-STANDARDS-ADOPTION.md)
2. [Canonical UI Evolution Contract](https://github.com/amirulhafiz1132002-code/amrhz-architecture-core/blob/main/docs/standards/UI-EVOLUTION-CONTRACT.md)
3. [Canonical Dual-Layer Documentation Standard](https://github.com/amirulhafiz1132002-code/amrhz-architecture-core/blob/main/docs/standards/DUAL-LAYER-DOCUMENTATION-STANDARD.md)
4. [Canonical Evidence and State Contract](https://github.com/amirulhafiz1132002-code/amrhz-architecture-core/blob/main/docs/standards/EVIDENCE-AND-STATE-CONTRACT.md)

Canonical standards proposal: [amrhz-architecture-core PR #1](https://github.com/amirulhafiz1132002-code/amrhz-architecture-core/pull/1). Until that PR is reviewed and merged, treat the standards as **PROPOSED**, not as an approved or enforced policy.

## Repository-specific boundaries
- Do not change website markup, CSS, JavaScript, assets, deployment settings, or runtime behavior as part of standards adoption. Any later UI task must cite a reproducible issue and name its exact scope.
- Existing AI-CONTEXT.md and repository documentation remain project-specific context, but their claims must be reconciled with source and runtime evidence.
- Inspect the current branch, implementation, relevant tests, and configuration before proposing a change.
- Use the smallest change that solves a demonstrated problem. Keep unrelated files and behavior unchanged.
- Do not claim `VERIFIED` without a scoped, observed test result; do not claim `LIVE` without environment-specific deployment/runtime evidence.
- If evidence is missing or contradictory, report `BLOCKED` or `UNKNOWN`; do not fill gaps with assumptions.
- Do not deploy, delete data, change secrets, rewrite architecture, or expand into other repositories unless explicitly approved.
- Report changed files, tests actually run, results, limitations, and remaining unknowns.

These instructions document intended workflow; they do not by themselves prove that automated enforcement exists.
