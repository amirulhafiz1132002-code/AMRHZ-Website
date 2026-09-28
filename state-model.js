/* DEV-001 — Verified Development State Model
 *
 * This registry is documentary/UI state, not runtime health telemetry.
 * State changes require evidence and should be reviewed against DEV-001.md.
 */
(function () {
  "use strict";

  var STATE_REGISTRY = [
    {
      name: "Development Hub",
      state: "VERIFIED",
      evidence: "Implemented website section; current repository contains the feature.",
      runtime: "STATIC WEBSITE"
    },
    {
      name: "Ideas",
      state: "PROPOSED",
      evidence: "Documented concepts; no persistent idea storage is implemented.",
      runtime: "STATIC"
    },
    {
      name: "Feedback",
      state: "UNKNOWN",
      evidence: "Persistent feedback capability is not configured; runtime storage is not evidenced.",
      runtime: "NOT CONFIGURED"
    }
  ];

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

    if (!container) {
      return;
    }

    var intro = container.querySelector(".section-intro");

    if (intro) {
      var heading = document.createElement("div");
      heading.className = "section-heading";
      heading.innerHTML =
        '<div class="eyebrow">DEV-001</div><h3>Verified State Registry</h3>';

      container.insertBefore(heading, intro.nextSibling);
      container.insertBefore(createRegistry(), heading.nextSibling);
    }
  }

  initialize();
}());
