/* THE LODOWN - Background Service Worker */
/* DuckDuckGo site: search for local news articles */

/* ===== DATA ===== */

var RESISTANCE_LIST = [
  { domain: "washingtonpost.com", owner: "Jeff Bezos", type: "billionaire" },
  { domain: "latimes.com", owner: "Patrick Soon-Shiong", type: "billionaire" },
  { domain: "time.com", owner: "Marc Benioff", type: "billionaire" },
  { domain: "theatlantic.com", owner: "Laurene Powell Jobs", type: "billionaire" },
  { domain: "nytimes.com", owner: "NYT Co.", type: "corporate" },
  { domain: "wsj.com", owner: "News Corp (Murdoch)", type: "corporate" },
  { domain: "foxnews.com", owner: "Fox Corp (Murdoch)", type: "corporate" },
  { domain: "nypost.com", owner: "News Corp (Murdoch)", type: "corporate" },
  { domain: "cnn.com", owner: "Warner Bros. Discovery", type: "corporate" },
  { domain: "abcnews.go.com", owner: "Walt Disney Co.", type: "corporate" },
  { domain: "nbcnews.com", owner: "Comcast", type: "corporate" },
  { domain: "msnbc.com", owner: "Comcast", type: "corporate" },
  { domain: "cbsnews.com", owner: "Paramount Global", type: "corporate" },
  { domain: "usatoday.com", owner: "Gannett", type: "corporate" },
  { domain: "dailynews.com", owner: "Alden Global Capital", type: "hedge_fund" },
  { domain: "chicagotribune.com", owner: "Alden Global Capital", type: "hedge_fund" },
  { domain: "denverpost.com", owner: "Alden Global Capital", type: "hedge_fund" },
  { domain: "mercurynews.com", owner: "Alden Global Capital", type: "hedge_fund" },
  { domain: "bostonherald.com", owner: "MediaNews Group (Alden)", type: "hedge_fund" },
  { domain: "breitbart.com", owner: "Breitbart News Network", type: "special_interest" },
  { domain: "dailywire.com", owner: "The Daily Wire", type: "special_interest" },
  { domain: "oann.com", owner: "Herring Networks", type: "special_interest" },
  { domain: "newsmax.com", owner: "Newsmax Media", type: "special_interest" },
  { domain: "huffpost.com", owner: "BuzzFeed Inc.", type: "corporate" },
  { domain: "vox.com", owner: "Vox Media", type: "corporate" }
];

var LOCAL_SOURCES = [
  { id: "publicsource", name: "PublicSource", domain: "publicsource.org", url: "https://www.publicsource.org", city: "Pittsburgh", state: "PA", nonprofit: true, verified: true },
  { id: "pittsburgh-current", name: "Pittsburgh Current", domain: "pittsburghcurrent.com", url: "https://www.pittsburghcurrent.com", city: "Pittsburgh", state: "PA", nonprofit: false, verified: true },
  { id: "next-pittsburgh", name: "NEXTpittsburgh", domain: "nextpittsburgh.com", url: "https://nextpittsburgh.com", city: "Pittsburgh", state: "PA", nonprofit: false, verified: true },
  { id: "pittsburgh-city-paper", name: "Pittsburgh City Paper", domain: "pghcitypaper.com", url: "https://www.pghcitypaper.com", city: "Pittsburgh", state: "PA", nonprofit: false, verified: true },
  { id: "triblive", name: "TribLIVE", domain: "triblive.com", url: "https://triblive.com", city: "Pittsburgh", state: "PA", nonprofit: false, verified: true },
  { id: "wesa", name: "90.5 WESA", domain: "wesa.fm", url: "https://www.wesa.fm", city: "Pittsburgh", state: "PA", nonprofit: true, verified: true },
  { id: "pittsburgh-union-progress", name: "Pittsburgh Union Progress", domain: "unionprogress.com", url: "https://www.unionprogress.com", city: "Pittsburgh", state: "PA", nonprofit: false, verified: true },
  { id: "the-incline", name: "The Incline", domain: "theincline.com", url: "https://theincline.com", city: "Pittsburgh", state: "PA", nonprofit: false, verified: true },
  { id: "pittsburgh-post-gazette", name: "Pittsburgh Post-Gazette", domain: "post-gazette.com", url: "https://www.post-gazette.com", city: "Pittsburgh", state: "PA", nonprofit: false, verified: true },
  { id: "pgh-lesbian-correspondents", name: "Pittsburgh Lesbian Correspondents", domain: "pghlescorps.com", url: "https://www.pghlescorps.com", city: "Pittsburgh", state: "PA", nonprofit: false, verified: true }
];

/* ===== HELPERS ===== */

function extractDomain(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch (e) {
    return null;
  }
}

function isResisted(url) {
  var domain = extractDomain(url);
  if (!domain) return null;
  for (var i = 0; i < RESISTANCE_LIST.length; i++) {
    var entry = RESISTANCE_LIST[i];
    if (domain === entry.domain || domain.indexOf("." + entry.domain) === domain.length - entry.domain.length - 1) {
      return entry;
    }
  }
  return null;
}

function getSourcesForLocation(city, state) {
  var results = [];
  for (var i = 0; i < LOCAL_SOURCES.length; i++) {
    var s = LOCAL_SOURCES[i];
    if (s.verified && s.city.toLowerCase() === city.toLowerCase() && s.state.toUpperCase() === state.toUpperCase()) {
      results.push(s);
    }
  }
  return results;
}

function findSourceByDomain(domain) {
  if (!domain) return null;
  for (var i = 0; i < LOCAL_SOURCES.length; i++) {
    var s = LOCAL_SOURCES[i];
    if (domain === s.domain || domain === "www." + s.domain || domain.indexOf("." + s.domain) !== -1) {
      return s;
    }
  }
  return null;
}

/* ===== KEYWORD EXTRACTION ===== */

var STOP_WORDS = {};
"the,a,an,is,are,was,were,be,been,being,have,has,had,do,does,did,will,would,could,should,may,might,shall,can,and,but,or,nor,for,so,yet,both,either,neither,not,no,in,on,at,to,from,by,with,about,between,through,during,before,after,above,below,up,down,out,off,over,under,into,of,than,too,very,just,also,then,now,here,there,when,where,why,how,all,each,every,any,few,more,most,other,some,such,only,own,same,that,this,these,those,what,which,who,whom,its,his,her,he,she,it,we,they,me,my,your,our,their,him,us,them,if,as,new,said,one,two,like,even,back,much,get,got,go,going,say,says,make,made,know,see,think,take,come,want,use,find,give,tell,work,call,try,ask,need,feel,become,leave,put,mean,keep,let,begin,seem,help,show,hear,play,run,move,live,believe,hold,bring,happen,write,provide,people,year,time,way,day,man,woman,child,world,life,hand,part,place,case,week,company,system,program,question,government,number,night,point,home,water,room,area,money,story,fact,month,right,study,book,job,word,business,issue,side,kind,head,house,service,power,hour,game,line,end,member,law,car,city,community,name,president,team,minute,idea,body,information,school,state,family,student,group,country,problem,today,per,percent,according,article,read,share,sign,subscribe,newsletter,click,advertisement,cookie,privacy,terms,opinion,editorial,more,about,also,been,would,could,should,after,before,years,first,last,still,many,three,four,five,long,great,little,being".split(",").forEach(function (w) { STOP_WORDS[w] = true; });

function extractKeywords(text, maxKeywords) {
  if (!maxKeywords) maxKeywords = 6;
  var words = text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(function (w) {
    return w.length > 3 && !STOP_WORDS[w] && !/^\d+$/.test(w);
  });
  var freq = {};
  words.forEach(function (w) { freq[w] = (freq[w] || 0) + 1; });
  return Object.keys(freq).sort(function (a, b) { return freq[b] - freq[a]; }).slice(0, maxKeywords);
}

/* ===== DUCKDUCKGO SEARCH ===== */

var FETCH_TIMEOUT_MS = 12000;
var searchCache = {};
var CACHE_TTL_MS = 10 * 60 * 1000;

function stripTags(str) {
  return str.replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}

/*
 * Decode DuckDuckGo redirect URLs.
 * DDG wraps links in several formats:
 *   //duckduckgo.com/l/?uddg=https%3A%2F%2Fexample.com%2Farticle&rut=...
 *   /l/?uddg=https%3A%2F%2Fexample.com%2Farticle&rut=...
 *   https://duckduckgo.com/l/?uddg=...
 * We need to extract and decode the uddg parameter.
 */
function decodeDDGUrl(rawUrl) {
  if (!rawUrl) return null;

  /* Case 1: contains uddg= parameter */
  var uddgIdx = rawUrl.indexOf("uddg=");
  if (uddgIdx !== -1) {
    var rest = rawUrl.substring(uddgIdx + 5);
    /* Cut at next & */
    var ampIdx = rest.indexOf("&");
    var encoded = ampIdx !== -1 ? rest.substring(0, ampIdx) : rest;
    try {
      var decoded = decodeURIComponent(encoded);
      /* Sometimes double-encoded */
      if (decoded.indexOf("%") !== -1) {
        try { decoded = decodeURIComponent(decoded); } catch (e2) { /* use single-decoded */ }
      }
      if (decoded.indexOf("http") === 0) return decoded;
    } catch (e) {
      console.warn("[LODOWN] URL decode failed:", encoded);
    }
    return null;
  }

  /* Case 2: direct http(s) URL */
  if (rawUrl.indexOf("http://") === 0 || rawUrl.indexOf("https://") === 0) {
    /* Skip if it's a duckduckgo.com URL without uddg */
    if (rawUrl.indexOf("duckduckgo.com") !== -1) return null;
    return rawUrl;
  }

  /* Case 3: protocol-relative */
  if (rawUrl.indexOf("//") === 0) {
    if (rawUrl.indexOf("duckduckgo.com") !== -1) return null;
    return "https:" + rawUrl;
  }

  return null;
}

/*
 * Check if a URL points to an actual article (has a path beyond just /)
 */
function isArticleUrl(url) {
  try {
    var parsed = new URL(url);
    var path = parsed.pathname.replace(/\/+$/, "");
    /* Reject bare homepage, category-only pages, etc. */
    if (!path || path === "" || path === "/") return false;
    /* Must have at least one path segment with content */
    var segments = path.split("/").filter(function (s) { return s.length > 0; });
    return segments.length >= 1;
  } catch (e) {
    return false;
  }
}

function searchDuckDuckGo(query) {
  var cacheKey = query.toLowerCase().trim();
  var cached = searchCache[cacheKey];
  if (cached && Date.now() - cached.ts < CACHE_TTL_MS) {
    return Promise.resolve(cached.results);
  }

  var url = "https://html.duckduckgo.com/html/?q=" + encodeURIComponent(query);
  console.log("[LODOWN] Fetching:", url);

  var controller = new AbortController();
  var timer = setTimeout(function () { controller.abort(); }, FETCH_TIMEOUT_MS);

  return fetch(url, {
    signal: controller.signal,
    headers: {
      "Accept": "text/html,application/xhtml+xml"
    }
  }).then(function (res) {
    clearTimeout(timer);
    console.log("[LODOWN] DDG response status:", res.status);
    if (!res.ok) throw new Error("HTTP " + res.status);
    return res.text();
  }).then(function (html) {
    console.log("[LODOWN] DDG HTML length:", html.length);
    var results = parseDDGResults(html);
    console.log("[LODOWN] Parsed results:", results.length);
    searchCache[cacheKey] = { results: results, ts: Date.now() };
    return results;
  }).catch(function (err) {
    clearTimeout(timer);
    console.error("[LODOWN] DDG search failed:", err.message);
    return [];
  });
}

function parseDDGResults(html) {
  var results = [];

  /*
   * Strategy: find all <a> tags with href containing "uddg=" or pointing to
   * our local source domains. Extract title from the link text.
   * Then find nearby snippet text.
   */

  /* First, try to find result__a links (DDG HTML format) */
  var linkRegex = /<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi;
  var allLinks = [];
  var linkMatch;

  while ((linkMatch = linkRegex.exec(html)) !== null) {
    allLinks.push({
      rawUrl: linkMatch[1],
      rawTitle: linkMatch[2],
      index: linkMatch.index
    });
  }

  console.log("[LODOWN] Total <a> tags found:", allLinks.length);

  /* Filter to only links that contain uddg= (these are search result links) */
  var resultLinks = allLinks.filter(function (l) {
    return l.rawUrl.indexOf("uddg=") !== -1;
  });

  console.log("[LODOWN] Links with uddg=:", resultLinks.length);

  /* If no uddg links, try to find any links to our source domains */
  if (resultLinks.length === 0) {
    resultLinks = allLinks.filter(function (l) {
      var decoded = decodeDDGUrl(l.rawUrl);
      if (!decoded) return false;
      var domain = extractDomain(decoded);
      return findSourceByDomain(domain) !== null;
    });
    console.log("[LODOWN] Fallback domain-matched links:", resultLinks.length);
  }

  /* Extract snippets: look for result__snippet class */
  var snippetRegex = /<[^>]*class="[^"]*result__snippet[^"]*"[^>]*>([\s\S]*?)<\/(?:a|span|div|td)>/gi;
  var snippets = [];
  var snippetMatch;
  while ((snippetMatch = snippetRegex.exec(html)) !== null) {
    snippets.push({
      text: stripTags(snippetMatch[1]),
      index: snippetMatch.index
    });
  }

  /* Process each result link */
  for (var i = 0; i < resultLinks.length; i++) {
    var link = resultLinks[i];
    var actualUrl = decodeDDGUrl(link.rawUrl);
    if (!actualUrl) {
      console.log("[LODOWN] Could not decode URL:", link.rawUrl.substring(0, 100));
      continue;
    }

    var title = stripTags(link.rawTitle).trim();
    if (!title || title.length < 3) continue;

    /* Only keep actual article URLs, not homepages */
    if (!isArticleUrl(actualUrl)) {
      console.log("[LODOWN] Skipping homepage URL:", actualUrl);
      continue;
    }

    /* Find nearest snippet after this link */
    var snippet = "";
    for (var j = 0; j < snippets.length; j++) {
      if (snippets[j].index > link.index) {
        snippet = snippets[j].text;
        break;
      }
    }

    var sourceDomain = extractDomain(actualUrl);
    var sourceInfo = findSourceByDomain(sourceDomain);

    results.push({
      title: title,
      link: actualUrl,
      description: snippet,
      sourceName: sourceInfo ? sourceInfo.name : sourceDomain,
      sourceId: sourceInfo ? sourceInfo.id : "",
      sourceUrl: sourceInfo ? sourceInfo.url : "",
      nonprofit: sourceInfo ? sourceInfo.nonprofit : false
    });
  }

  /* Deduplicate by URL */
  var seenUrls = {};
  var deduped = [];
  for (var k = 0; k < results.length; k++) {
    if (!seenUrls[results[k].link]) {
      seenUrls[results[k].link] = true;
      deduped.push(results[k]);
    }
  }

  return deduped;
}

/* ===== MAIN SEARCH FUNCTIONS ===== */

function findLocalAlternatives(pageText, userLocations) {
  var sources = [];
  userLocations.forEach(function (loc) {
    sources = sources.concat(getSourcesForLocation(loc.city, loc.state));
  });
  if (sources.length === 0) return Promise.resolve([]);

  var keywords = extractKeywords(pageText, 6);
  console.log("[LODOWN] Keywords:", keywords);

  if (keywords.length === 0) {
    /* No usable keywords from page */
    return Promise.resolve([]);
  }

  /* Build site: query with keywords */
  var siteClause = sources.map(function (s) { return "site:" + s.domain; }).join(" OR ");
  var query = keywords.join(" ") + " (" + siteClause + ")";
  console.log("[LODOWN] Search query:", query);

  return searchDuckDuckGo(query).then(function (results) {
    if (results.length > 0) return results;

    /* Retry with fewer keywords if no results */
    if (keywords.length > 3) {
      var fewerKeywords = keywords.slice(0, 3);
      var retryQuery = fewerKeywords.join(" ") + " (" + siteClause + ")";
      console.log("[LODOWN] Retry query:", retryQuery);
      return searchDuckDuckGo(retryQuery);
    }

    /* No results — return empty, do NOT fall back to general feed */
    return [];
  });
}

function getLocalFeed(userLocations) {
  var sources = [];
  var cityNames = [];
  userLocations.forEach(function (loc) {
    sources = sources.concat(getSourcesForLocation(loc.city, loc.state));
    if (cityNames.indexOf(loc.city) === -1) cityNames.push(loc.city);
  });
  if (sources.length === 0) return Promise.resolve([]);

  var siteClause = sources.map(function (s) { return "site:" + s.domain; }).join(" OR ");
  var query = cityNames.join(" ") + " news (" + siteClause + ")";
  console.log("[LODOWN] General feed query:", query);

  return searchDuckDuckGo(query);
}

/* ===== MESSAGE HANDLER ===== */

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.type === "CHECK_RESISTANCE") {
    var result = isResisted(msg.url);
    sendResponse({ resisted: !!result, info: result });
    return false;
  }

  if (msg.type === "FIND_ALTERNATIVES") {
    chrome.storage.local.get(["userLocations"], function (data) {
      var locations = data.userLocations || [{ city: "Pittsburgh", state: "PA" }];
      findLocalAlternatives(msg.pageText || "", locations).then(function (alternatives) {
        sendResponse({ success: true, alternatives: alternatives });
      }).catch(function (err) {
        console.error("[LODOWN] Error:", err);
        sendResponse({ success: false, alternatives: [], error: err.message });
      });
    });
    return true;
  }

  if (msg.type === "GET_LOCAL_FEED") {
    chrome.storage.local.get(["userLocations"], function (data) {
      var locations = data.userLocations || [{ city: "Pittsburgh", state: "PA" }];
      getLocalFeed(locations).then(function (items) {
        sendResponse({ success: true, items: items });
      }).catch(function (err) {
        console.error("[LODOWN] Feed error:", err);
        sendResponse({ success: false, items: [], error: err.message });
      });
    });
    return true;
  }
});

/* ===== TAB LISTENER ===== */

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status !== "complete" || !tab.url) return;
  var resisted = isResisted(tab.url);
  if (!resisted) return;
  chrome.storage.local.get(["invasiveness"], function (data) {
    if (data.invasiveness === "auto") {
      chrome.action.setBadgeText({ text: "!", tabId: tabId });
      chrome.action.setBadgeBackgroundColor({ color: "#8B0000", tabId: tabId });
    }
  });
});

console.log("[LODOWN] Service worker loaded.");
