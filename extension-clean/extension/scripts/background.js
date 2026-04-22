/* THE LODOWN v2.0 — Background Service Worker
 * Pulls sources + resistance list from Supabase.
 * DuckDuckGo site: search. Bookmark to account. Author extraction. Date sort.
 */

importScripts('config.js');

var SB_URL = LODOWN_CONFIG.SUPABASE_URL;
var SB_KEY = LODOWN_CONFIG.SUPABASE_ANON_KEY;
var CACHE_TTL = 60 * 60 * 1000;

/* ===== SUPABASE HELPERS ===== */

function sbFetch(path) {
  return fetch(SB_URL + "/rest/v1/" + path, {
    headers: { "apikey": SB_KEY, "Authorization": "Bearer " + SB_KEY, "Accept": "application/json" }
  }).then(function(r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); });
}

function sbAuthPost(table, body, token) {
  return fetch(SB_URL + "/rest/v1/" + table, {
    method: "POST",
    headers: {
      "apikey": SB_KEY, "Authorization": "Bearer " + token,
      "Content-Type": "application/json", "Prefer": "return=minimal"
    },
    body: JSON.stringify(body)
  });
}

/* ===== DATA LOADING WITH CACHE ===== */

function loadSources() {
  return chrome.storage.local.get(["cachedSources", "sourcesCachedAt"]).then(function(d) {
    if (d.cachedSources && d.sourcesCachedAt && (Date.now() - d.sourcesCachedAt < CACHE_TTL)) return d.cachedSources;
    return sbFetch("sources?verified=eq.true&select=id,name,url,domain,city,state,nonprofit")
      .then(function(sources) {
        if (Array.isArray(sources) && sources.length > 0) {
          chrome.storage.local.set({ cachedSources: sources, sourcesCachedAt: Date.now() });
          return sources;
        }
        return d.cachedSources || [];
      }).catch(function() { return d.cachedSources || []; });
  });
}

function loadResistanceList() {
  return chrome.storage.local.get(["cachedResistance", "resistCachedAt"]).then(function(d) {
    if (d.cachedResistance && d.resistCachedAt && (Date.now() - d.resistCachedAt < CACHE_TTL)) return d.cachedResistance;
    return sbFetch("resistance_list?select=domain,owner,type")
      .then(function(list) {
        if (Array.isArray(list) && list.length > 0) {
          chrome.storage.local.set({ cachedResistance: list, resistCachedAt: Date.now() });
          return list;
        }
        return d.cachedResistance || [];
      }).catch(function() { return d.cachedResistance || []; });
  });
}

/* ===== DOMAIN MATCHING ===== */

function extractDomain(url) {
  try { return new URL(url).hostname.replace(/^www\./, "").toLowerCase(); }
  catch(e) { return null; }
}

function matchDomain(domain, targetDomain) {
  if (!domain || !targetDomain) return false;
  var td = targetDomain.toLowerCase();
  if (domain === td) return true;
  var suffix = "." + td;
  return domain.length > td.length && domain.substring(domain.length - suffix.length) === suffix;
}

function isResisted(url, list) {
  var domain = extractDomain(url);
  if (!domain) return null;
  for (var i = 0; i < list.length; i++) {
    if (matchDomain(domain, list[i].domain)) return list[i];
  }
  return null;
}

function findSourceByDomain(domain, sources) {
  if (!domain) return null;
  domain = domain.toLowerCase();
  for (var i = 0; i < sources.length; i++) {
    if (matchDomain(domain, sources[i].domain)) return sources[i];
  }
  return null;
}

function getSourcesForLoc(city, state, sources) {
  return sources.filter(function(s) {
    return s.city.toLowerCase() === city.toLowerCase() && s.state.toUpperCase() === state.toUpperCase();
  });
}

/* ===== KEYWORDS ===== */

var SW = {};
"the,a,an,is,are,was,were,be,been,being,have,has,had,do,does,did,will,would,could,should,may,might,shall,can,and,but,or,nor,for,so,yet,not,no,in,on,at,to,from,by,with,about,between,through,during,before,after,above,below,up,down,out,off,over,under,into,of,than,too,very,just,also,then,now,here,there,when,where,why,how,all,each,every,any,few,more,most,other,some,such,only,own,same,that,this,these,those,what,which,who,whom,its,his,her,he,she,it,we,they,me,my,your,our,their,him,us,them,if,as,new,said,one,two,like,even,back,much,get,got,go,going,say,says,make,made,know,see,think,take,come,want,use,find,give,tell,work,call,try,ask,need,feel,become,leave,put,mean,keep,let,begin,seem,help,show,hear,play,run,move,live,believe,hold,bring,happen,write,provide,people,year,time,way,day,world,life,hand,part,place,case,week,number,night,point,home,area,money,story,fact,month,right,study,book,job,word,business,issue,side,kind,head,house,service,power,hour,game,line,end,member,law,car,city,community,name,president,team,minute,idea,body,information,school,state,family,student,group,country,problem,today,per,percent,according,article,read,share,sign,subscribe,newsletter,click,advertisement,cookie,privacy,terms,opinion,editorial,years,first,last,still,many,long,great,little,being,while,another,because,something,nothing,really,things,thing,always,never,without,since,though,although,however,million,billion".split(",").forEach(function(w) { SW[w] = true; });

function extractKeywords(text, max) {
  if (!max) max = 6;
  var words = text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(function(w) {
    return w.length > 3 && !SW[w] && !/^\d+$/.test(w);
  });
  var freq = {};
  words.forEach(function(w) { freq[w] = (freq[w] || 0) + 1; });
  return Object.keys(freq).sort(function(a,b) { return freq[b] - freq[a]; }).slice(0, max);
}

/* ===== DUCKDUCKGO SEARCH ===== */

var sCache = {};

function stripTags(s) {
  return s.replace(/<[^>]*>/g,"").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#x27;/g,"'").replace(/&#39;/g,"'").replace(/&nbsp;/g," ").replace(/\s+/g," ").trim();
}

function decodeDDG(raw) {
  if (!raw) return null;
  var i = raw.indexOf("uddg=");
  if (i !== -1) {
    var rest = raw.substring(i+5); var amp = rest.indexOf("&");
    var enc = amp !== -1 ? rest.substring(0, amp) : rest;
    try { var d = decodeURIComponent(enc); if (d.indexOf("%")!==-1) try { d=decodeURIComponent(d); } catch(e2){} if (d.indexOf("http")===0) return d; } catch(e){}
    return null;
  }
  if (raw.indexOf("http")===0 && raw.indexOf("duckduckgo.com")===-1) return raw;
  return null;
}

function extractDateSnippet(snippet) {
  if (!snippet) return null;
  var pats = [/(\d{4}-\d{2}-\d{2})/, /(\w{3,9}\s+\d{1,2},?\s+\d{4})/, /(\d{1,2}\s+\w{3,9}\s+\d{4})/];
  for (var i=0; i<pats.length; i++) { var m = snippet.match(pats[i]); if (m) { var d = new Date(m[1]); if (!isNaN(d.getTime())) return d.toISOString(); } }
  return null;
}

function searchDDG(query, sources) {
  var ck = query.toLowerCase().trim();
  var c = sCache[ck];
  if (c && Date.now() - c.ts < 600000) return Promise.resolve(c.results);

  var url = "https://html.duckduckgo.com/html/?q=" + encodeURIComponent(query);
  var ctrl = new AbortController();
  var tmr = setTimeout(function(){ ctrl.abort(); }, 12000);

  return fetch(url, { signal: ctrl.signal, headers: {"Accept":"text/html"} })
    .then(function(r) { clearTimeout(tmr); if (!r.ok) throw new Error("HTTP "+r.status); return r.text(); })
    .then(function(html) {
      var results = parseDDG(html, sources);
      sCache[ck] = { results: results, ts: Date.now() };
      return results;
    }).catch(function(err) { clearTimeout(tmr); return []; });
}

function parseDDG(html, sources) {
  var results = [];
  var linkRe = /<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi;
  var links = []; var m;
  while ((m = linkRe.exec(html)) !== null) links.push({ rawUrl:m[1], rawTitle:m[2], index:m.index });

  var rLinks = links.filter(function(l){ return l.rawUrl.indexOf("uddg=")!==-1; });
  if (rLinks.length === 0) {
    rLinks = links.filter(function(l) {
      var u = decodeDDG(l.rawUrl); if (!u) return false;
      return findSourceByDomain(extractDomain(u), sources) !== null;
    });
  }

  var snipRe = /<[^>]*class="[^"]*result__snippet[^"]*"[^>]*>([\s\S]*?)<\/(?:a|span|div|td)>/gi;
  var snips = [];
  while ((m = snipRe.exec(html)) !== null) snips.push({ text: stripTags(m[1]), index: m.index });

  for (var i=0; i<rLinks.length; i++) {
    var lk = rLinks[i];
    var aUrl = decodeDDG(lk.rawUrl);
    if (!aUrl) continue;
    var title = stripTags(lk.rawTitle).trim();
    if (!title || title.length < 5) continue;
    try { if (new URL(aUrl).pathname.replace(/\/+$/,"").length < 2) continue; } catch(e){ continue; }

    var snip = "";
    for (var j=0; j<snips.length; j++) { if (snips[j].index > lk.index) { snip = snips[j].text; break; } }

    var si = findSourceByDomain(extractDomain(aUrl), sources);
    results.push({
      title: title, link: aUrl, description: snip,
      sourceName: si ? si.name : extractDomain(aUrl),
      sourceId: si ? si.id : "", nonprofit: si ? si.nonprofit : false,
      publishedAt: extractDateSnippet(snip)
    });
  }

  var seen = {};
  results = results.filter(function(r){ if (seen[r.link]) return false; seen[r.link]=true; return true; });

  results.sort(function(a,b) {
    var da = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    var db = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    if (da && db) return db - da;
    if (da) return -1;
    if (db) return 1;
    return 0;
  });
  return results;
}

/* ===== EXTRACT TEXT+AUTHOR FROM TAB ===== */

function extractFromTab(tabId) {
  return chrome.scripting.executeScript({
    target: { tabId: tabId },
    func: function() {
      var author = null;
      var ms = ["meta[name='author']","meta[property='article:author']","meta[name='dc.creator']","meta[name='byl']","[rel='author']",".author-name",".byline__name","[class*='byline']","[data-testid='byline']"];
      for (var i=0; i<ms.length; i++) {
        var el = document.querySelector(ms[i]);
        if (el) { author = el.getAttribute("content") || el.textContent || null; if (author) { author = author.replace(/^by\s+/i,"").trim(); break; } }
      }
      var sels = ["article","[role='article']",".article-body",".story-body",".post-content",".entry-content","main"];
      var text = "";
      for (var j=0; j<sels.length; j++) { var e2 = document.querySelector(sels[j]); if (e2 && e2.innerText && e2.innerText.length > 200) { text = e2.innerText.slice(0,5000); break; } }
      if (!text) { var b = document.body.cloneNode(true); var rm = b.querySelectorAll("nav,footer,aside,header,script,style,form,input,textarea"); for (var k=0;k<rm.length;k++) rm[k].remove(); text = (b.innerText||"").slice(0,5000); }
      var title = ""; var og = document.querySelector("meta[property='og:title']");
      if (og && og.getAttribute("content")) title = og.getAttribute("content"); else title = document.title || "";
      return { text:text, author:author, title:title, url:window.location.href };
    }
  }).then(function(r) { return (r&&r[0]&&r[0].result) || {text:"",author:null,title:"",url:""}; })
    .catch(function() { return {text:"",author:null,title:"",url:""}; });
}

/* ===== SEARCH FUNCTIONS ===== */

function findAlts(pageText, locs, sources) {
  var ls = [];
  locs.forEach(function(l){ ls = ls.concat(getSourcesForLoc(l.city, l.state, sources)); });
  if (ls.length === 0) return Promise.resolve([]);
  var kw = extractKeywords(pageText, 6);
  if (kw.length === 0) return Promise.resolve([]);
  var sc = ls.map(function(s){ return "site:"+s.domain; }).join(" OR ");
  var q = kw.join(" ") + " (" + sc + ")";
  return searchDDG(q, sources).then(function(r) {
    if (r.length > 0 || kw.length <= 3) return r;
    return searchDDG(kw.slice(0,3).join(" ") + " (" + sc + ")", sources);
  });
}

function getFeed(locs, sources) {
  var ls = []; var cities = [];
  locs.forEach(function(l){ ls = ls.concat(getSourcesForLoc(l.city, l.state, sources)); if (cities.indexOf(l.city)===-1) cities.push(l.city); });
  if (ls.length === 0) return Promise.resolve([]);
  var sc = ls.map(function(s){ return "site:"+s.domain; }).join(" OR ");
  return searchDDG(cities.join(" ") + " news (" + sc + ")", sources);
}

/* ===== TRACK ARTICLE INTERACTIONS FOR FOLLOWING PAGE ===== */

function trackArticleInteraction(article) {
  // Extract topics from article description/text
  var keywords = extractKeywords((article.description || "") + " " + (article.title || ""), 5);
  
  // Get or initialize stored data
  var stored = localStorage.getItem('thelodown_extension_topics');
  var data = {};
  try {
    data = stored ? JSON.parse(stored) : {};
  } catch(e) {
    data = {};
  }
  
  // Initialize arrays if missing
  if (!Array.isArray(data.topics)) data.topics = [];
  if (!Array.isArray(data.authors)) data.authors = [];
  if (!Array.isArray(data.sources)) data.sources = [];
  if (!Array.isArray(data.places)) data.places = [];
  
  // Add unique values
  if (article.author) {
    article.author = String(article.author).trim();
    if (article.author && data.authors.indexOf(article.author) === -1) {
      data.authors.push(article.author);
    }
  }
  
  if (article.sourceName) {
    article.sourceName = String(article.sourceName).trim();
    if (article.sourceName && data.sources.indexOf(article.sourceName) === -1) {
      data.sources.push(article.sourceName);
    }
  }
  
  keywords.forEach(function(kw) {
    if (data.topics.indexOf(kw) === -1) {
      data.topics.push(kw);
    }
  });
  
  // Store back to localStorage
  try {
    localStorage.setItem('thelodown_extension_topics', JSON.stringify(data));
  } catch(e) {
    console.error('Failed to store article interaction:', e);
  }
}

/* ===== MESSAGE HANDLER ===== */

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.type === "TRACK_ARTICLE") {
    trackArticleInteraction(msg.article);
    sendResponse({success: true});
    return;
  }
  if (msg.type === "CHECK_RESISTANCE") {
    loadResistanceList().then(function(list) {
      var r = isResisted(msg.url, list);
      sendResponse({ resisted: !!r, info: r });
    }); return true;
  }
  if (msg.type === "EXTRACT_FROM_TAB") {
    extractFromTab(msg.tabId).then(function(d){ sendResponse(d); }); return true;
  }
  if (msg.type === "FIND_ALTERNATIVES") {
    Promise.all([chrome.storage.local.get(["userLocations"]), loadSources()]).then(function(res) {
      var locs = res[0].userLocations || [{city:"Pittsburgh",state:"PA"}];
      return findAlts(msg.pageText||"", locs, res[1]);
    }).then(function(a){ sendResponse({success:true,alternatives:a}); })
      .catch(function(e){ sendResponse({success:false,alternatives:[],error:e.message}); });
    return true;
  }
  if (msg.type === "GET_LOCAL_FEED") {
    Promise.all([chrome.storage.local.get(["userLocations"]), loadSources()]).then(function(res) {
      var locs = res[0].userLocations || [{city:"Pittsburgh",state:"PA"}];
      return getFeed(locs, res[1]);
    }).then(function(items){ sendResponse({success:true,items:items}); })
      .catch(function(e){ sendResponse({success:false,items:[],error:e.message}); });
    return true;
  }
  if (msg.type === "SAVE_BOOKMARK") {
    chrome.storage.local.get(["authToken"]).then(function(d) {
      if (!d.authToken) { sendResponse({success:false,error:"Sign in on the website first"}); return; }
      
      // Extract user_id from JWT token
      var userId = null;
      try {
        var parts = d.authToken.split(".");
        if (parts.length === 3) {
          var payload = parts[1].replace(/-/g, "+").replace(/_/g, "/");
          while (payload.length % 4) payload += "=";
          var decoded = JSON.parse(atob(payload));
          userId = decoded.sub;
        }
      } catch(e) {}
      
      if (!userId) {
        sendResponse({success:false,error:"Could not extract user ID from token"});
        return;
      }
      
      sbAuthPost("extension_bookmarks", {
        user_id: userId,
        headline: msg.article.title || "", 
        source: msg.article.sourceName || null,
        author: msg.article.author || null, 
        url: msg.article.link || msg.article.url || null
      }, d.authToken).then(function(r){ sendResponse({success:r.ok||r.status===409}); })
        .catch(function(e){ sendResponse({success:false,error:e.message}); });
    }); return true;
  }
  if (msg.type === "LOGIN") {
    fetch(SB_URL + "/auth/v1/token?grant_type=password", {
      method: "POST",
      headers: { "apikey": SB_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({ email: msg.email, password: msg.password })
    }).then(function(r) { return r.json(); }).then(function(data) {
      if (data.access_token) {
        chrome.storage.local.set({ authToken: data.access_token, userEmail: data.user.email });
        sendResponse({ success: true, email: data.user.email });
      } else {
        sendResponse({ success: false, error: data.error_description || data.msg || "Login failed" });
      }
    }).catch(function(e) { sendResponse({ success: false, error: e.message }); });
    return true;
  }
  if (msg.type === "LOGOUT") {
    chrome.storage.local.remove(["authToken","userEmail"]);
    sendResponse({ success: true });
    return false;
  }
  if (msg.type === "GET_AUTH") {
    chrome.storage.local.get(["authToken","userEmail"]).then(function(d) {
      sendResponse({ loggedIn: !!d.authToken, email: d.userEmail || null });
    }); return true;
  }
  if (msg.type === "SYNC_AUTH") {
    if (msg.token) {
      chrome.storage.local.set({ authToken: msg.token, userEmail: msg.email || null });
    } else {
      chrome.storage.local.remove(["authToken", "userEmail"]);
    }
    return false;
  }
  if (msg.type === "TRACK_VISIT") {
    chrome.storage.local.get(["authToken"]).then(function(d) {
      if (!d.authToken) { sendResponse({ success: false }); return; }
      sbAuthPost("article_visits", {
        url: msg.article.url || null,
        title: msg.article.title || null,
        source: msg.article.source || null,
        author: msg.article.author || null,
        keywords: msg.article.keywords || []
      }, d.authToken).then(function(r) { sendResponse({ success: r.ok || r.status === 409 }); })
        .catch(function() { sendResponse({ success: false }); });
    }); return true;
  }
});

/* ===== AUTO MODE ===== */
var alertedTabs = {};

chrome.tabs.onUpdated.addListener(function(tabId, ci, tab) {
  if (ci.status !== "complete" || !tab.url || tab.url.indexOf("http") !== 0) return;

  // Resistance badge
  loadResistanceList().then(function(list) {
    var r = isResisted(tab.url, list);
    if (r) {
      chrome.action.setBadgeText({ text: "!", tabId: tabId });
      chrome.action.setBadgeBackgroundColor({ color: "#8B0000", tabId: tabId });
      chrome.storage.local.get(["invasiveness","setupComplete"], function(d) {
        if (d.invasiveness === "auto" && d.setupComplete) {
          var key = tabId + ":" + r.domain;
          if (alertedTabs[key]) return;
          alertedTabs[key] = true;
          chrome.storage.local.set({ alertInfo: { owner:r.owner, type:r.type, domain:r.domain, sourceTabId:tabId } }, function() {
            chrome.tabs.create({ url: chrome.runtime.getURL("alert.html"), active: true });
          });
        }
      });
    } else {
      chrome.action.setBadgeText({ text: "", tabId: tabId });
    }
  });

  // Auto-track visits to local news sources (if logged in)
  Promise.all([loadSources(), chrome.storage.local.get(["authToken"])]).then(function(res) {
    var sources = res[0];
    var token = res[1].authToken;
    if (!token) return;
    var domain = extractDomain(tab.url);
    var source = findSourceByDomain(domain, sources);
    if (!source) return;
    extractFromTab(tabId).then(function(d) {
      if (!d || !d.title || d.title.length < 5) return;
      var keywords = extractKeywords(d.text || "", 8);
      sbAuthPost("article_visits", {
        url: tab.url,
        title: d.title || null,
        source: source.name,
        author: d.author || null,
        keywords: keywords
      }, token).catch(function() {});
    });
  }).catch(function() {});
});

chrome.tabs.onRemoved.addListener(function(tabId) {
  Object.keys(alertedTabs).forEach(function(k){ if (k.indexOf(tabId+":")===0) delete alertedTabs[k]; });
});

chrome.runtime.onConnect.addListener(function(port) {
  if (port.name === "keepalive") port.onMessage.addListener(function(){ port.postMessage({pong:true}); });
});

console.log("[LODOWN] v2.0 loaded");
