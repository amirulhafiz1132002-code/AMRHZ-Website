(function () {
  "use strict";

  var REPO_API = "https://api.github.com/repos/amirulhafiz1132002-code/AMRHZ-Website/commits?per_page=12";
  var container = document.getElementById("changelogEntries");
  var countElement = document.getElementById("changelogCount");
  var lastUpdateElement = document.getElementById("changelogLastUpdate");

  function injectStyles() {
    var style = document.createElement("style");
    style.textContent = `
      .changelog-panel {
        border: 1px solid var(--line);
        background: var(--panel);
        overflow: hidden;
      }

      .changelog-meta {
        display: flex;
        justify-content: space-between;
        gap: 20px;
        padding: 16px 20px;
        border-bottom: 1px solid var(--line);
        color: var(--muted);
        font: 9px var(--mono);
        letter-spacing: .08em;
      }

      .changelog-meta b {
        color: var(--accent);
        font-weight: 500;
      }

      .changelog-list {
        display: grid;
      }

      .changelog-entry {
        display: grid;
        grid-template-columns: 150px 1fr auto;
        gap: 24px;
        align-items: start;
        padding: 22px 20px;
        border-bottom: 1px solid var(--line);
        transition: background .2s ease;
      }

      .changelog-entry:last-child {
        border-bottom: 0;
      }

      .changelog-entry:hover {
        background: var(--accent-soft);
      }

      .changelog-date,
      .changelog-sha {
        color: var(--muted);
        font: 9px var(--mono);
      }

      .changelog-message {
        margin: 0 0 6px;
        font: 600 15px/1.4 var(--sans);
      }

      .changelog-type {
        color: var(--accent);
        font: 9px var(--mono);
        letter-spacing: .12em;
      }

      .changelog-sha {
        text-align: right;
        white-space: nowrap;
      }

      .changelog-state {
        padding: 28px 20px;
        color: var(--muted);
        font: 11px/1.7 var(--mono);
      }

      @media (max-width: 720px) {
        .changelog-meta {
          flex-direction: column;
          gap: 8px;
        }

        .changelog-entry {
          grid-template-columns: 1fr auto;
          gap: 10px;
        }

        .changelog-date {
          grid-column: 1 / -1;
        }

        .changelog-message {
          font-size: 14px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function formatDate(value) {
    var date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return "UNKNOWN DATE";
    }

    return date.toLocaleDateString([], {
      year: "numeric",
      month: "short",
      day: "2-digit"
    });
  }

  function classify(message) {
    var value = message.toLowerCase();
    if (value.indexOf("fix") !== -1) return "FIX";
    if (value.indexOf("add") !== -1 || value.indexOf("create") !== -1) return "ADD";
    if (value.indexOf("update") !== -1 || value.indexOf("change") !== -1) return "UPDATE";
    if (value.indexOf("remove") !== -1 || value.indexOf("delete") !== -1) return "REMOVE";
    return "COMMIT";
  }

  function render(commits) {
    if (!container) return;

    if (!Array.isArray(commits) || !commits.length) {
      container.innerHTML = '<div class="changelog-state">No system events indexed.</div>';
      return;
    }

    container.innerHTML = commits.map(function (commit) {
      var message = (commit.commit && commit.commit.message || "Untitled commit").split("\n")[0];
      var date = commit.commit && commit.commit.author ? commit.commit.author.date : null;
      var sha = (commit.sha || "").slice(0, 7);

      return '<article class="changelog-entry">' +
        '<div class="changelog-date">' + formatDate(date) + '</div>' +
        '<div>' +
          '<p class="changelog-message">' + escapeHtml(message) + '</p>' +
          '<span class="changelog-type">' + classify(message) + ' // GITHUB</span>' +
        '</div>' +
        '<div class="changelog-sha">' + escapeHtml(sha) + '</div>' +
      '</article>';
    }).join("");

    if (countElement) countElement.textContent = String(commits.length).padStart(2, "0");

    var latestDate = commits[0] && commits[0].commit && commits[0].commit.author
      ? commits[0].commit.author.date
      : null;

    if (lastUpdateElement) lastUpdateElement.textContent = formatDate(latestDate);
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function load() {
    if (!container) return;

    container.innerHTML = '<div class="changelog-state">SYNCING SYSTEM HISTORY...</div>';

    fetch(REPO_API, {
      headers: { Accept: "application/vnd.github+json" }
    })
      .then(function (response) {
        if (!response.ok) throw new Error("GitHub API unavailable");
        return response.json();
      })
      .then(render)
      .catch(function () {
        container.innerHTML = '<div class="changelog-state">SYSTEM HISTORY OFFLINE — GitHub history could not be loaded.</div>';
        if (countElement) countElement.textContent = "--";
        if (lastUpdateElement) lastUpdateElement.textContent = "OFFLINE";
      });
  }

  injectStyles();
  load();
}());
