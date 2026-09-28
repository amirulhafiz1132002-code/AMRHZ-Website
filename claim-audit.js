/* DEV-003 — Evidence Coverage & Claim Audit
 *
 * Public claim audit for the AMRHZ Website.
 * This layer records what repository/static evidence supports;
 * it does not create runtime capability or promote state automatically.
 */
(function () {
  "use strict";

  var CLAIM_AUDIT = [
    {
      id: "D3-01",
      claim: "Header: ONLINE",
      support: "STATIC_RENDERED",
      state: "UNKNOWN",
      evidence: "index.html static header",
      limitation: "Static rendering does not prove runtime health.",
      action: "Clarify as static website availability or remove runtime implication."
    },
    {
      id: "D3-02",
      claim: "AMRHZ AI System — ACTIVE",
      support: "REPOSITORY + DOCUMENTARY",
      state: "DEVELOPMENT",
      evidence: "Website description plus AMRHZ-AI-13 repository artifacts.",
      limitation: "No current runtime/deployment verification for the broader system.",
      action: "Narrow wording or map to evidence before treating ACTIVE as runtime status."
    },
    {
      id: "D3-03",
      claim: "AP1 Orchestrator — BUILDING",
      support: "REPOSITORY + DOCUMENTARY",
      state: "DEVELOPMENT",
      evidence: "Website architecture description and AP1-WEB-Console orchestration documentation.",
      limitation: "No dedicated orchestrator runtime was verified.",
      action: "Keep as development language with explicit non-runtime limitation."
    },
    {
      id: "D3-04",
      claim: "Architecture Core — ACTIVE",
      support: "REPOSITORY + DOCUMENTARY",
      state: "DEVELOPMENT",
      evidence: "Architecture Core repository README and docs.",
      limitation: "Documentation/repository activity is not proof of a live runtime.",
      action: "Clarify as active development/documentation."
    },
    {
      id: "D3-05",
      claim: "AMRHZ Website — PUBLIC",
      support: "REPOSITORY + STATIC_RENDERED",
      state: "VERIFIED",
      evidence: "Public GitHub repository and public-facing site artifacts.",
      limitation: "Production deployment was not independently verified in this audit.",
      action: "Preserve PUBLIC; keep deployment claims separate."
    },
    {
      id: "D3-06",
      claim: "AMRHZ AI 13 — BUILDING",
      support: "REPOSITORY + DOCUMENTARY",
      state: "DEVELOPMENT",
      evidence: "Repository contains agent, backend, learning, memory and test-related artifacts.",
      limitation: "Runtime execution and current health were not verified.",
      action: "Preserve BUILDING with explicit runtime limitation."
    },
    {
      id: "D3-07",
      claim: "AP1 Web Console — BUILDING",
      support: "REPOSITORY + DOCUMENTARY",
      state: "DEVELOPMENT",
      evidence: "Repository contains frontend/backend directories, HTML and documentation.",
      limitation: "Runtime deployment and current operational health were not verified.",
      action: "Preserve BUILDING with explicit runtime limitation."
    },
    {
      id: "D3-08",
      claim: "Architecture Core project — DOCUMENTED",
      support: "REPOSITORY + DOCUMENTARY",
      state: "VERIFIED",
      evidence: "Architecture Core README and docs directory.",
      limitation: "Documentation presence does not prove every described architecture component is implemented.",
      action: "Preserve DOCUMENTED."
    },
    {
      id: "D3-09",
      claim: "Development Hub — VERIFIED",
      support: "REPOSITORY + STATIC_RENDERED",
      state: "VERIFIED",
      evidence: "DEV-001 state registry, DEV-002 evidence registry and prior rendering verification.",
      limitation: "Verification covers the static website layer only.",
      action: "Preserve VERIFIED with boundary."
    },
    {
      id: "D3-10",
      claim: "Changelog — repository history",
      support: "REPOSITORY",
      state: "PARTIAL",
      evidence: "changelog.js calls the GitHub commits API and has an offline fallback.",
      limitation: "External API success was not re-tested during this audit.",
      action: "Do not present as runtime health telemetry."
    },
    {
      id: "D3-11",
      claim: "Browser Terminal — interactive interface",
      support: "REPOSITORY + STATIC_RENDERED",
      state: "PARTIAL",
      evidence: "index.html and script.js both define terminal surfaces.",
      limitation: "Current HTML IDs/form structure do not match the JavaScript selectors.",
      action: "Correct wiring in a separate implementation task."
    },
    {
      id: "D3-12",
      claim: "Roadmap / planned features",
      support: "STATIC_RENDERED + DOCUMENTARY",
      state: "PLANNED",
      evidence: "Static roadmap, progress and feedback architecture sections.",
      limitation: "Roadmap content does not imply implementation.",
      action: "Preserve PLANNED and STATIC labels."
    }
  ];

  var REQUIRED_FIELDS = [
    "id",
    "claim",
    "support",
    "state",
    "evidence",
    "limitation",
    "action"
  ];

  function validateRecord(record) {
    return record && REQUIRED_FIELDS.every(function (field) {
      return typeof record[field] === "string" && record[field].trim().length > 0;
    });
  }

  function validateAudit(audit) {
    return Array.isArray(audit) && audit.length > 0 && audit.every(validateRecord);
  }

  function createSection() {
    var section = document.createElement("div");
    section.className = "cards development-hub-grid";
    section.setAttribute("data-dev003", "claim-audit");

    CLAIM_AUDIT.forEach(function (item) {
      var card = document.createElement("article");
      card.className = "card";

      var top = document.createElement("div");
      top.className = "card-top";

      var id = document.createElement("span");
      id.className = "card-index";
      id.textContent = item.id;

      var badge = document.createElement("span");
      badge.className = "status-badge";
      badge.textContent = item.state;

      top.appendChild(id);
      top.appendChild(badge);

      var eyebrow = document.createElement("div");
      eyebrow.className = "eyebrow";
      eyebrow.textContent = "CLAIM AUDIT";

      var title = document.createElement("h3");
      title.textContent = item.claim;

      var evidence = document.createElement("p");
      evidence.textContent = "EVIDENCE: " + item.evidence;

      var support = document.createElement("div");
      support.className = "card-footer";
      support.innerHTML =
        "<span>SUPPORT: " + escapeHtml(item.support) + "</span>" +
        "<span>STATE: " + escapeHtml(item.state) + "</span>";

      var limitation = document.createElement("p");
      limitation.className = "evidence-limitations";
      limitation.textContent = "LIMITATION: " + item.limitation;

      var action = document.createElement("p");
      action.className = "evidence-limitations";
      action.textContent = "ACTION: " + item.action;

      card.appendChild(top);
      card.appendChild(eyebrow);
      card.appendChild(title);
      card.appendChild(evidence);
      card.appendChild(support);
      card.appendChild(limitation);
      card.appendChild(action);
      section.appendChild(card);
    });

    return section;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function initialize() {
    var hub = document.getElementById("development-hub");

    if (!hub || document.querySelector("[data-dev003='claim-audit']")) {
      return;
    }

    if (!validateAudit(CLAIM_AUDIT)) {
      return;
    }

    var container = hub.querySelector(".container");
    var intro = container ? container.querySelector(".section-intro") : null;

    if (!container || !intro) {
      return;
    }

    var heading = document.createElement("div");
    heading.className = "section-heading";
    heading.innerHTML =
      "<div class='eyebrow'>DEV-003</div><h3>Claim Audit</h3>";

    container.insertBefore(heading, intro.nextSibling);
    container.insertBefore(createSection(), heading.nextSibling);
  }

  window.AMRHZ_CLAIM_AUDIT = CLAIM_AUDIT;
  window.AMRHZ_VALIDATE_CLAIM_AUDIT = validateAudit;

  initialize();
}());
