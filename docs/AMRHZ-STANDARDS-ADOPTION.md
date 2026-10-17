# AMRHZ Standards Adoption — AMRHZ-Website

**Local role:** Responsive website and UI  
**Adoption state:** PROPOSED  
**Enforcement state:** UNKNOWN — no automated enforcement is claimed by this document.  
**Dependency:** [Canonical standards proposal PR #1](https://github.com/amirulhafiz1132002-code/amrhz-architecture-core/pull/1).

## Standards intended for adoption

- [UI Evolution Contract](https://github.com/amirulhafiz1132002-code/amrhz-architecture-core/blob/main/docs/standards/UI-EVOLUTION-CONTRACT.md)
- [Dual-Layer Documentation Standard](https://github.com/amirulhafiz1132002-code/amrhz-architecture-core/blob/main/docs/standards/DUAL-LAYER-DOCUMENTATION-STANDARD.md)
- [Evidence and State Contract](https://github.com/amirulhafiz1132002-code/amrhz-architecture-core/blob/main/docs/standards/EVIDENCE-AND-STATE-CONTRACT.md)

## Local constraints

Do not change website markup, CSS, JavaScript, assets, deployment settings, or runtime behavior as part of standards adoption. Any later UI task must cite a reproducible issue and name its exact scope.

Existing AI-CONTEXT.md and repository documentation remain project-specific context, but their claims must be reconciled with source and runtime evidence.

## Required adoption sequence

1. Review and merge the canonical standards proposal before calling these links an approved policy.
2. Review this repository's AI entrypoint and project-specific documentation for contradictions.
3. Add structured state or verification records only when their source evidence, owner, schema, and update process are known.
4. Validate links and any structured data; run relevant checks and record the actual results.
5. Mark **ADOPTED** only after the local guidance is merged; mark **VERIFIED** only after relevant checks pass; mark **ENFORCED** only after controls are configured and tested.
6. Keep implementation/UI changes outside this documentation-only adoption PR.

## Current evidence

- The AI entrypoint and this adoption note are proposed in the same branch.
- Canonical standards are still pending review/merge.
- Automated enforcement, schema validation in CI, and downstream runtime behavior have **not** been verified by this document.
