(function () {
  "use strict";

  function $(sel) { return document.querySelector(sel); }
  var currentView = "main";
  var locations = [];
  var invasiveness = "manual";

  function init() {
    chrome.storage.local.get(["userLocations", "invasiveness", "setupComplete"], function (data) {
      locations = data.userLocations || [{ city: "Pittsburgh", state: "PA" }];
      invasiveness = data.invasiveness || "manual";
      if (!data.setupComplete) {
        showSetup();
      } else {
        updateLocationDisplay();
        checkCurrentTab();
      }
    });
    bindEvents();
  }

  function bindEvents() {
    $("#settingsBtn").addEventListener("click", function () {
      if (currentView === "main") showSetup();
      else showMain();
    });
    $("#addLocationBtn").addEventListener("click", addLocation);
    $("#stateInput").addEventListener("keydown", function (e) {
      if (e.key === "Enter") addLocation();
    });
    $("#saveSettingsBtn").addEventListener("click", saveSettings);
  }

  function showSetup() {
    currentView = "setup";
    $("#mainView").style.display = "none";
    $("#setupView").style.display = "block";
    renderLocationChips();
    if (invasiveness === "auto") $("#modeAuto").checked = true;
    else $("#modeManual").checked = true;
  }

  function showMain() {
    currentView = "main";
    $("#setupView").style.display = "none";
    $("#mainView").style.display = "block";
    updateLocationDisplay();
    loadArticles();
  }

  function addLocation() {
    var city = $("#cityInput").value.trim();
    var state = $("#stateInput").value.trim().toUpperCase();
    if (!city || !state || state.length !== 2) return;
    var exists = false;
    locations.forEach(function (l) {
      if (l.city.toLowerCase() === city.toLowerCase() && l.state === state) exists = true;
    });
    if (exists) return;
    locations.push({ city: city, state: state });
    $("#cityInput").value = "";
    $("#stateInput").value = "";
    renderLocationChips();
  }

  function removeLocation(idx) {
    locations.splice(idx, 1);
    renderLocationChips();
  }

  function renderLocationChips() {
    var container = $("#locationList");
    container.innerHTML = locations.map(function (l, i) {
      return '<span class="location-chip">' + l.city + ', ' + l.state + ' <button data-idx="' + i + '">&times;</button></span>';
    }).join("");
    container.querySelectorAll("button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        removeLocation(parseInt(btn.getAttribute("data-idx")));
      });
    });
  }

  function updateLocationDisplay() {
    if (locations.length === 0) {
      $("#locationDisplay").textContent = "NO LOCATION SET";
    } else if (locations.length === 1) {
      $("#locationDisplay").textContent = "IN " + locations[0].city.toUpperCase() + ", " + locations[0].state;
    } else {
      $("#locationDisplay").textContent = locations.length + " CITIES";
    }
  }

  function saveSettings() {
    var checked = document.querySelector("input[name='invasiveness']:checked");
    invasiveness = checked ? checked.value : "manual";
    chrome.storage.local.set({
      userLocations: locations,
      invasiveness: invasiveness,
      setupComplete: true
    }, function () {
      showMain();
    });
  }

  function checkCurrentTab() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var tab = tabs[0];
      if (!tab || !tab.url) { loadArticles(); return; }
      chrome.runtime.sendMessage({ type: "CHECK_RESISTANCE", url: tab.url }, function (res) {
        if (chrome.runtime.lastError) { loadArticles(); return; }
        if (res && res.resisted) {
          $("#contextBar").style.display = "block";
          $("#ownerName").textContent = res.info.owner;
          /* Get page text and search for local coverage on this topic */
          chrome.tabs.sendMessage(tab.id, { type: "GET_PAGE_TEXT" }, function (pageRes) {
            if (chrome.runtime.lastError || !pageRes || !pageRes.text) {
              /* Cannot read page - show general feed */
              loadArticles();
            } else {
              loadAlternatives(pageRes.text);
            }
          });
        } else {
          loadArticles();
        }
      });
    });
  }

  function loadArticles() {
    showLoading("Searching local sources");
    chrome.runtime.sendMessage({ type: "GET_LOCAL_FEED" }, function (res) {
      hideLoading();
      if (res && res.success && res.items && res.items.length > 0) {
        renderArticles(res.items);
      } else {
        showEmpty("No local stories found right now. Check back later or adjust your locations in settings.");
      }
    });
  }

  function loadAlternatives(pageText) {
    showLoading("Finding local coverage");
    chrome.runtime.sendMessage({ type: "FIND_ALTERNATIVES", pageText: pageText }, function (res) {
      hideLoading();
      if (res && res.success && res.alternatives && res.alternatives.length > 0) {
        renderArticles(res.alternatives);
      } else {
        /* NO FALLBACK. Clearly state no local coverage was found. */
        showEmpty("No local coverage found for this article. Your local sources may not have reported on this topic yet.");
      }
    });
  }

  function renderArticles(items) {
    var container = $("#articlesContainer");
    container.style.display = "flex";
    container.innerHTML = items.map(function (item) {
      var tagLabel = item.nonprofit ? "NON-PROFIT" : (item.sourceName || "LOCAL");
      var tagClass = item.nonprofit ? "card-source-tag nonprofit" : "card-source-tag";
      return '<div class="card">' +
        '<span class="' + tagClass + '">' + escapeHTML(tagLabel) + '</span>' +
        '<div class="card-headline">' + escapeHTML(truncate(item.title, 80)) + '</div>' +
        '<div class="card-author">' + escapeHTML(item.sourceName || "") + '</div>' +
        '<div class="card-snippet">' + escapeHTML(truncate(item.description || "", 140)) + '</div>' +
        '<div class="card-actions">' +
          '<a class="btn-read" href="' + escapeAttr(item.link) + '" target="_blank" rel="noopener noreferrer">Read All About It <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" width="12" height="12"><path d="M3 9L9 3M9 3H4M9 3V8"/></svg></a>' +
          '<button class="btn-icon" title="Bookmark"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" width="14" height="14"><path d="M3 2h8v11l-4-3-4 3V2z"/></svg></button>' +
          '<button class="btn-icon" title="Follow"><svg viewBox="0 0 14 14" fill="currentColor" width="14" height="14"><path d="M7 2.5c-1.8-1.7-4.7-1.7-6.5 0s-1.8 4.6 0 6.3L7 14l6.5-5.2c1.8-1.7 1.8-4.6 0-6.3s-4.7-1.7-6.5 0z"/></svg></button>' +
        '</div>' +
      '</div>';
    }).join("");
  }

  function showLoading(msg) {
    var el = $("#loadingState");
    el.textContent = msg || "Searching";
    el.style.display = "block";
    $("#articlesContainer").style.display = "none";
    $("#emptyState").style.display = "none";
  }
  function hideLoading() { $("#loadingState").style.display = "none"; }
  function showEmpty(msg) {
    var el = $("#emptyState");
    el.textContent = msg || "No results found.";
    el.style.display = "block";
  }

  function escapeHTML(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }
  function escapeAttr(str) {
    return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function truncate(str, max) {
    return str.length > max ? str.slice(0, max) + "\u2026" : str;
  }

  init();
})();
