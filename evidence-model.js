/* DEV-002 — Evidence / Verification Layer
 *
 * Structured evidence records for the AMRHZ Website.
 * Evidence is descriptive; it does not grant authority or runtime access.
 */
(function () {
  "use strict";

  var EVIDENCE_REGISTRY = [
    {
      id: "DEV-001-STATE-REGISTRY",
      capability: "Development Hub verified state registry",
      state: "VERIFIED",
      implementation: "state-model.js + index.html",
      test: "Live Development Hub rendering",
      result: "Registry rendered with valid DEV-001 states.",
      environment: "AMRHZ-Website static website",
      limitations: "Does not prove backend persistence, authentication, or autonomous execution."
    },
    {
      id: "DEV-001-IDEAS",
      capability: "Ideas tracking",
      state: "PROPOSED",
      implementation: "index.html Development Hub ideas sections",
      test: "Repository inspection and rendered website inspection",
      result: "Ideas are represented as static documentary content.",
      environment: "AMRHZ-Website static website",
      limitations: "No persistent idea storage is implemented."
    },
    {
      id: "DEV-001-FEEDBACK",
      capability: "Persistent feedback",
      state: "UNKNOWN",
      implementation: "No persistent feedback implementation evidenced in current repository.",
      test: "Repository inspection",
      result: "No verified runtime storage path was identified.",
      environment: "AMRHZ-Website repository",
      limitations: "This record does not prove that future feedback infrastructure cannot exist elsewhere."
    }
  ];

  var REQUIRED_FIELDS = [
    "id",
    "capability",
    "state",
    "implementation",
    "test",
    "result",
    "environment",
    "limitations"
  ];

  function validateEvidence(record) {
    if (!record || typeof record !== "object") {
      return false;
    }

    return REQUIRED_FIELDS.every(function (field) {
      return typeof record[field] === "string" && record[field].trim().length > 0;
    });
  }

  function validateRegistry(registry) {
    if (!Array.isArray(registry) || !registry.length) {
      return false;
    }

    return registry.every(validateEvidence);
  }

  function createEvidenceSection() {
    var section = document.createElement("div");
    section.className = "cards development-hub-grid";
    section.setAttribute("data-dev002", "evidence-registry");

    EVIDENCE_REGISTRY.forEach(function (item) {
      var card = document.createElement("article");
      card.className = "card";

      var top = document.createElement("div");
      top.className = "card-top";

      var label = document.createElement("span");
      label.className = "card-index";
      label.textContent = item.id;

      var badge = document.createElement("span");
      badge.className = "status-badge";
      badge.textContent = item.state;

      top.appendChild(label);
      top.appendChild(badge);

      var eyebrow = document.createElement("div");
      eyebrow.className = "eyebrow";
      eyebrow.textContent = "DEV-002 EVIDENCE";

      var title = document.createElement("h3");
      title.textContent = item.capability;

      var evidence = document.createElement("p");
      evidence.textContent = item.result;

      var details = document.createElement("div");
      details.className = "card-footer";
      details.innerHTML =
        "<span>IMPLEMENTATION: " + escapeHtml(item.implementation) + "</span>" +
        "<span>TEST: " + escapeHtml(item.test) + "</span>";

      var limits = document.createElement("p");
      limits.className = "evidence-limitations";
      limits.textContent = "LIMITATIONS: " + item.limitations;

      card.appendChild(top);
      card.appendChild(eyebrow);
      card.appendChild(title);
      card.appendChild(evidence);
      card.appendChild(details);
      card.appendChild(limits);
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

    if (!hub || document.querySelector("[data-dev002='evidence-registry']")) {
      return;
    }

    if (!validateRegistry(EVIDENCE_REGISTRY)) {
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
      "<div class='eyebrow'>DEV-002</div><h3>Evidence Registry</h3>";

    container.insertBefore(heading, intro.nextSibling);
    container.insertBefore(createEvidenceSection(), heading.nextSibling);
  }

  window.AMRHZ_EVIDENCE_REGISTRY = EVIDENCE_REGISTRY;
  window.AMRHZ_VALIDATE_EVIDENCE = validateEvidence;
  window.AMRHZ_VALIDATE_EVIDENCE_REGISTRY = validateRegistry;

  initialize();
}());
