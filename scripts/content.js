(function () {
  "use strict";

  if (window.__LODOWN_INJECTED) return;
  window.__LODOWN_INJECTED = true;

  function extractPageText() {
    var selectors = ["article", "[role='article']", ".article-body", ".story-body", ".post-content", ".entry-content", "main"];
    var i, el;
    for (i = 0; i < selectors.length; i++) {
      el = document.querySelector(selectors[i]);
      if (el && el.innerText && el.innerText.length > 200) {
        return el.innerText.slice(0, 5000);
      }
    }
    var body = document.body.cloneNode(true);
    var removes = body.querySelectorAll("nav, footer, aside, header, script, style, form, input, textarea");
    for (i = 0; i < removes.length; i++) {
      removes[i].remove();
    }
    return (body.innerText || "").slice(0, 5000);
  }

  chrome.runtime.sendMessage(
    { type: "CHECK_RESISTANCE", url: window.location.href },
    function (response) {
      if (chrome.runtime.lastError || !response || !response.resisted) return;
      chrome.storage.local.get(["invasiveness"], function (data) {
        if (data.invasiveness === "auto") {
          showBanner(response.info);
        }
      });
    }
  );

  function showBanner(info) {
    var host = document.createElement("div");
    host.id = "lodown-banner-host";
    var shadow = host.attachShadow({ mode: "closed" });
    var ownerLabel = "Owned by " + info.owner;

    var style = document.createElement("style");
    style.textContent = ":host{all:initial;position:fixed;bottom:0;left:0;right:0;z-index:2147483647;font-family:Georgia,serif}.banner{background:#2C2416;color:#F5F0E8;display:flex;align-items:center;justify-content:space-between;padding:10px 20px;font-size:14px;line-height:1.4;box-shadow:0 -2px 12px rgba(0,0,0,0.4)}.banner-left{display:flex;align-items:center;gap:12px}.brand{font-weight:700;font-size:16px;letter-spacing:2px;text-transform:uppercase;color:#D4C5A9}.owner{color:#C9A96E;font-weight:600}.btn{text-transform:uppercase;letter-spacing:1.5px;font-weight:700;font-size:12px;background:#8B7355;color:#F5F0E8;border:none;padding:8px 18px;cursor:pointer}.btn:hover{background:#A08563}.close-btn{background:none;border:none;color:#A09880;font-size:20px;cursor:pointer;padding:0 0 0 12px;line-height:1}.close-btn:hover{color:#F5F0E8}.banner-right{display:flex;align-items:center;gap:8px}";

    var banner = document.createElement("div");
    banner.className = "banner";
    banner.innerHTML = '<div class="banner-left"><span class="brand">THE LODOWN</span><span>You are reading from <span class="owner">' + ownerLabel + '</span>. Local alternatives available.</span></div><div class="banner-right"><button class="btn" id="lodown-open">Get the Local Story</button><button class="close-btn" id="lodown-close">&times;</button></div>';

    shadow.appendChild(style);
    shadow.appendChild(banner);
    document.documentElement.appendChild(host);

    shadow.getElementById("lodown-close").addEventListener("click", function () {
      host.remove();
    });

    shadow.getElementById("lodown-open").addEventListener("click", function () {
      var text = extractPageText();
      chrome.storage.local.set({ lastPageText: text, lastPageUrl: window.location.href });
      host.remove();
    });
  }

  chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.type === "GET_PAGE_TEXT") {
      sendResponse({ text: extractPageText(), url: window.location.href });
    }
  });
})();
