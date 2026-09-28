/* DEV-001 — Verified Development State Model
 *
 * State is derived from the DEV-002 evidence registry.
 * This registry is documentary/UI state, not runtime health telemetry.
 */
(function () {
  "use strict";

  var evidenceRegistry = window.AMRHZ_EVIDENCE_REGISTRY || [];

  var STATE_ORDER = [
    "CONCEPT",
    "PROPOSED",
    "PLANNED",
    "DEVELOPMENT",
    "PARTIAL",
    "VERIFIED",
    "LIVE",
    "BLOCKED",
    "DEPRECATED",
    "UNKNOWN"
  ];

  var STATE_REGISTRY = [
    {
      name: "Development Hub",
      state: findState("DEV-001-STATE-REGISTRY", "VERIFIED"),
      evidence: findResult("DEV-001-STATE-REGISTRY", "Registry evidence unavailable."),
      runtime: "STATIC WEBSITE"
    },
    {
      name: "Ideas",
      state: findState("DEV-001-IDEAS", "PROPOSED"),
      evidence: findResult("DEV-001-IDEAS", "Idea evidence unavailable."),
      runtime: "STATIC"
    },
    {
      name: "Feedback",
      state: findState("DEV-001-FEEDBACK", "UNKNOWN"),
      evidence: findResult("DEV-001-FEEDBACK", "Feedback evidence unavailable."),
      runtime: "NOT CONFIGURED"
    }
  ];

  function findEvidence(id) {
    return evidenceRegistry.find(function (item) {
      return item.id === id;
    });
  }

  function findState(id, fallback) {
    var item = findEvidence(id);
    return item && isValidState(item.state) ? item.state : fallback;
  }

  function findResult(id, fallback) {
    var item = findEvidence(id);
    return item && item.result ? item.result : fallback;
  }

  function isValidState(state) {
    return STATE_ORDER.indexOf(state) !== -1;
  }

  function createRegistry() {
    var section = document.createElement("div");
    section.className = "cards development-hub-grid";
    section.setAttribute("data-dev001", "state-registry");

    STATE_REGISTRY.forEach(function (item) {
      var card = document.createElement("article");
      card.className = "card";

      var top = document.createElement("div");
      top.className = "card-top";

      var label = document.createElement("span");
      label.className = "card-index";
      label.textContent = "DEV-001";

      var badge = document.createElement("span");
      badge.className = "status-badge";
      badge.textContent = item.state;

      top.appendChild(label);
      top.appendChild(badge);

      var eyebrow = document.createElement("div");
      eyebrow.className = "eyebrow";
      eyebrow.textContent = "VERIFIED STATE";

      var title = document.createElement("h3");
      title.textContent = item.name;

      var evidence = document.createElement("p");
      evidence.textContent = item.evidence;

      var footer = document.createElement("div");
      footer.className = "card-footer";

      var runtime = document.createElement("span");
      runtime.textContent = "RUNTIME: " + item.runtime;

      var evidenceState = document.createElement("span");
      evidenceState.textContent = isValidState(item.state)
        ? "STATE MODEL: VALID"
        : "STATE MODEL: INVALID";

      footer.appendChild(runtime);
      footer.appendChild(evidenceState);

      card.appendChild(top);
      card.appendChild(eyebrow);
      card.appendChild(title);
      card.appendChild(evidence);
      card.appendChild(footer);
      section.appendChild(card);
    });

    return section;
  }

  function initialize() {
    var hub = document.getElementById("development-hub");

    if (!hub || document.querySelector("[data-dev001='state-registry']")) {
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
      "<div class='eyebrow'>DEV-001</div><h3>Verified State Registry</h3>";

    container.insertBefore(heading, intro.nextSibling);
    container.insertBefore(createRegistry(), heading.nextSibling);
  }

  window.AMRHZ_STATE_REGISTRY = STATE_REGISTRY;
  window.AMRHZ_VALID_STATES = STATE_ORDER;

  initialize();
}());
