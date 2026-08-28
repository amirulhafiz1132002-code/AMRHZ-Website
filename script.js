(function () {
  "use strict";

  var COMMAND_PROMPT = "amrhz@core:~$";
  var terminalOutput = document.getElementById("terminalOutput");
  var terminalForm = document.getElementById("terminalForm");
  var terminalInput = document.getElementById("terminalInput");
  var clearTerminalButton = document.getElementById("clearTerminal");
  var clockElement = document.getElementById("clock");
  var dateElement = document.getElementById("date");
  var yearElement = document.getElementById("year");

  var history = [];
  var historyIndex = 0;

  function updateDateTime() {
    var now = new Date();
    var time = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    });
    var date = now.toLocaleDateString([], {
      year: "numeric",
      month: "short",
      day: "2-digit"
    });

    if (clockElement) {
      clockElement.textContent = time;
    }

    if (dateElement) {
      dateElement.textContent = date;
    }

    if (yearElement) {
      yearElement.textContent = String(now.getFullYear());
    }
  }

  function scrollTerminalToBottom() {
    if (terminalOutput) {
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
  }

  function createOutputLine(className, text) {
    var line = document.createElement("div");
    line.className = className || "terminal-response";
    line.textContent = text;
    return line;
  }

  function appendCommand(command) {
    if (!terminalOutput) {
      return;
    }

    var line = document.createElement("div");
    var prompt = document.createElement("span");
    prompt.className = "prompt";
    prompt.textContent = COMMAND_PROMPT;
    line.appendChild(prompt);
    line.appendChild(document.createTextNode(" " + command));
    terminalOutput.appendChild(line);
  }

  function appendResponse(response) {
    if (!terminalOutput) {
      return;
    }

    if (Array.isArray(response)) {
      response.forEach(function (line) {
        terminalOutput.appendChild(createOutputLine("terminal-response", line));
      });
    } else if (response) {
      terminalOutput.appendChild(createOutputLine("terminal-response", response));
    }

    scrollTerminalToBottom();
  }

  function clearTerminal() {
    if (terminalOutput) {
      terminalOutput.replaceChildren();
      scrollTerminalToBottom();
    }
  }

  function getSystemStatus() {
    var statusElement = document.querySelector(".status-main strong");
    var statusDescription = document.querySelector(".status-main p");
    var status = statusElement ? statusElement.textContent.trim() : "UNAVAILABLE";
    var description = statusDescription
      ? statusDescription.textContent.trim()
      : "No status details available.";

    return ["CORE STATUS: " + status, description];
  }

  function getProjects() {
    var projectTitles = Array.prototype.map.call(
      document.querySelectorAll("#projects .card h3"),
      function (title) {
        return "- " + title.textContent.trim();
      }
    );

    return projectTitles.length
      ? ["PROJECTS:", projectTitles.join("\n")]
      : "No projects indexed.";
  }

  function runCommand(rawCommand) {
    var command = rawCommand.trim().toLowerCase();

    switch (command) {
      case "help":
        return [
          "Commands:",
          "help, status, projects, whoami, clear"
        ];
      case "status":
        return getSystemStatus();
      case "projects":
        return getProjects();
      case "whoami":
        return [
          "AMRHZ operator.",
          "Independent builder focused on systems, software and AI experiments."
        ];
      case "clear":
        clearTerminal();
        return null;
      default:
        return command
          ? "Command not found: " + command + ". Type 'help' for available commands."
          : null;
    }
  }

  function handleTerminalSubmit(event) {
    event.preventDefault();

    if (!terminalInput) {
      return;
    }

    var rawCommand = terminalInput.value;
    var command = rawCommand.trim();

    if (!command) {
      return;
    }

    history.push(command);
    historyIndex = history.length;
    appendCommand(command);
    appendResponse(runCommand(command));
    terminalInput.value = "";
    terminalInput.focus();
  }

  function handleTerminalKeydown(event) {
    if (!terminalInput || (event.key !== "ArrowUp" && event.key !== "ArrowDown")) {
      return;
    }

    event.preventDefault();

    if (event.key === "ArrowUp") {
      historyIndex = Math.max(0, historyIndex - 1);
    } else {
      historyIndex = Math.min(history.length, historyIndex + 1);
    }

    terminalInput.value = history[historyIndex] || "";
  }

  function focusTerminal(event) {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      if (terminalInput) {
        terminalInput.focus();
        terminalInput.scrollIntoView({ block: "center", behavior: "smooth" });
      }
    }
  }

  function setupNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function (event) {
        var target = document.getElementById(link.getAttribute("href").slice(1));

        if (!target) {
          return;
        }

        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", link.getAttribute("href"));
      });
    });
  }

  function initializeClock() {
    updateDateTime();
    window.setInterval(updateDateTime, 1000);
  }

  function initializeTerminal() {
    if (terminalForm) {
      terminalForm.addEventListener("submit", handleTerminalSubmit);
    }

    if (terminalInput) {
      terminalInput.addEventListener("keydown", handleTerminalKeydown);
    }

    if (clearTerminalButton) {
      clearTerminalButton.addEventListener("click", clearTerminal);
    }
  }

  function initialize() {
    initializeClock();
    initializeTerminal();
    setupNavigation();
    document.addEventListener("keydown", focusTerminal);
  }

  initialize();
}());
