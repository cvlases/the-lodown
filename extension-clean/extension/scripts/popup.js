(function(){
"use strict";
function $(s){return document.querySelector(s);}
var currentView="main",locations=[],invasiveness="manual";

try{var port=chrome.runtime.connect({name:"keepalive"});setInterval(function(){try{port.postMessage({ping:true});}catch(e){}},20000);}catch(e){}

function send(msg,cb){try{chrome.runtime.sendMessage(msg,function(r){if(chrome.runtime.lastError){if(cb)cb(null);return;}if(cb)cb(r);});}catch(e){if(cb)cb(null);}}

function init(){
  chrome.storage.local.get(["userLocations","invasiveness","setupComplete"],function(d){
    if(chrome.runtime.lastError)return;
    locations=d.userLocations||[{city:"Pittsburgh",state:"PA"}];
    invasiveness=d.invasiveness||"manual";
    if(!d.setupComplete)showSetup();else{updateLocDisp();checkTab();}
  });
  send({type:"GET_AUTH"},function(r){
    if(r&&r.loggedIn){
      $("#authArea").innerHTML='<span class="auth-email">'+esc(r.email)+'</span> <button id="logoutBtn" class="auth-link">Sign Out</button>';
      $("#logoutBtn").addEventListener("click",function(){send({type:"LOGOUT"},function(){$("#authArea").innerHTML='<button id="loginBtn" class="auth-link">Sign In</button>';bindLogin();});});
    } else { bindLogin(); }
  });
  bindEvents();
}

function bindLogin(){
  var b=$("#loginBtn"); if(!b)return;
  b.addEventListener("click",function(){
    var area=$("#authArea");
    area.innerHTML='<input id="emailIn" type="email" placeholder="email" class="auth-input"><input id="passIn" type="password" placeholder="password" class="auth-input"><button id="doLogin" class="auth-link">Go</button>';
    $("#doLogin").addEventListener("click",doLogin);
    $("#passIn").addEventListener("keydown",function(e){if(e.key==="Enter")doLogin();});
  });
}

function doLogin(){
  var email=$("#emailIn").value.trim(),pass=$("#passIn").value;
  if(!email||!pass)return;
  send({type:"LOGIN",email:email,password:pass},function(r){
    if(r&&r.success){
      $("#authArea").innerHTML='<span class="auth-email">'+esc(r.email)+'</span> <button id="logoutBtn" class="auth-link">Sign Out</button>';
      $("#logoutBtn").addEventListener("click",function(){send({type:"LOGOUT"},function(){$("#authArea").innerHTML='<button id="loginBtn" class="auth-link">Sign In</button>';bindLogin();});});
    } else {
      var msg = (r&&r.error) || "Login failed";
      $("#authArea").innerHTML='<span class="auth-email" style="color:var(--heart)">'+esc(msg)+'</span> <button id="loginBtn" class="auth-link">Retry</button>';
      bindLogin();
    }
  });
}

function bindEvents(){
  $("#settingsBtn").addEventListener("click",function(){currentView==="main"?showSetup():showMain();});
  $("#addLocationBtn").addEventListener("click",addLoc);
  $("#stateInput").addEventListener("keydown",function(e){if(e.key==="Enter")addLoc();});
  $("#saveSettingsBtn").addEventListener("click",saveSettings);
}

function showSetup(){currentView="setup";$("#mainView").style.display="none";$("#setupView").style.display="block";renderChips();if(invasiveness==="auto")$("#modeAuto").checked=true;else $("#modeManual").checked=true;}
function showMain(){currentView="main";$("#setupView").style.display="none";$("#mainView").style.display="block";updateLocDisp();loadArticles();}

function addLoc(){
  var c=$("#cityInput").value.trim(),s=$("#stateInput").value.trim().toUpperCase();
  if(!c||!s||s.length!==2)return;
  var exists=false;locations.forEach(function(l){if(l.city.toLowerCase()===c.toLowerCase()&&l.state===s)exists=true;});
  if(exists)return;locations.push({city:c,state:s});$("#cityInput").value="";$("#stateInput").value="";renderChips();
}
function removeLoc(i){locations.splice(i,1);renderChips();}
function renderChips(){
  var c=$("#locationList");
  c.innerHTML=locations.map(function(l,i){return '<span class="location-chip">'+l.city+', '+l.state+' <button data-idx="'+i+'">&times;</button></span>';}).join("");
  c.querySelectorAll("button").forEach(function(b){b.addEventListener("click",function(){removeLoc(parseInt(b.getAttribute("data-idx")));});});
}
function updateLocDisp(){
  if(locations.length===0)$("#locationDisplay").textContent="NO LOCATION SET";
  else if(locations.length===1)$("#locationDisplay").textContent="IN "+locations[0].city.toUpperCase()+", "+locations[0].state;
  else $("#locationDisplay").textContent=locations.length+" CITIES";
}
function saveSettings(){
  var ch=document.querySelector("input[name='invasiveness']:checked");
  invasiveness=ch?ch.value:"manual";
  chrome.storage.local.set({userLocations:locations,invasiveness:invasiveness,setupComplete:true},function(){showMain();});
}

function checkTab(){
  chrome.tabs.query({active:true,currentWindow:true},function(tabs){
    if(chrome.runtime.lastError||!tabs||!tabs[0]){loadArticles();return;}
    var tab=tabs[0];if(!tab.url||tab.url.indexOf("http")!==0){loadArticles();return;}
    send({type:"CHECK_RESISTANCE",url:tab.url},function(res){
      if(!res||!res.resisted){$("#contextBar").style.display="none";loadArticles();return;}
      $("#contextBar").style.display="block";$("#ownerName").textContent=res.info.owner;
      send({type:"EXTRACT_FROM_TAB",tabId:tab.id},function(d){
        var text=(d&&d.text)||"";
        if(text.length>50)loadAlts(text);else loadArticles();
      });
    });
  });
}

function loadArticles(){
  showLoading("Searching local sources");
  send({type:"GET_LOCAL_FEED"},function(r){
    hideLoading();
    if(r&&r.success&&r.items&&r.items.length>0)renderArticles(r.items);
    else showEmpty("No local stories found. Check back later or adjust locations.");
  });
}

function loadAlts(pageText){
  showLoading("Finding local coverage");
  send({type:"FIND_ALTERNATIVES",pageText:pageText},function(r){
    hideLoading();
    if(r&&r.success&&r.alternatives&&r.alternatives.length>0)renderArticles(r.alternatives);
    else showEmpty("No local coverage found for this article.");
  });
}

function renderArticles(items){
  var c=$("#articlesContainer");c.style.display="flex";
  c.innerHTML=items.map(function(item,idx){
    var tag=item.nonprofit?"NON-PROFIT":(item.sourceName||"LOCAL");
    var tagCls=item.nonprofit?"card-source-tag nonprofit":"card-source-tag";
    var dateStr=item.publishedAt?formatDate(item.publishedAt):"";
    return '<div class="card"><span class="'+tagCls+'">'+esc(tag)+'</span>'+
      '<div class="card-headline">'+esc(truncate(item.title,80))+'</div>'+
      '<div class="card-author">'+esc(item.sourceName||"")+(dateStr?' &middot; '+dateStr:'')+'</div>'+
      '<div class="card-snippet">'+esc(truncate(item.description||"",140))+'</div>'+
      '<div class="card-actions">'+
        '<a class="btn-read" href="'+escA(item.link)+'" target="_blank" rel="noopener noreferrer">Read All About It <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" width="12" height="12"><path d="M3 9L9 3M9 3H4M9 3V8"/></svg></a>'+
        '<button class="btn-icon btn-bookmark" title="Save to account" data-idx="'+idx+'"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" width="14" height="14"><path d="M3 2h8v11l-4-3-4 3V2z"/></svg></button>'+
      '</div></div>';
  }).join("");

  /* Bind bookmark buttons */
  c.querySelectorAll(".btn-bookmark").forEach(function(btn){
    btn.addEventListener("click",function(){
      var i=parseInt(btn.getAttribute("data-idx"));
      var item=items[i];if(!item)return;
      btn.style.opacity="0.5";btn.disabled=true;
      send({type:"SAVE_BOOKMARK",article:item},function(r){
        if(r&&r.success){btn.innerHTML='<svg viewBox="0 0 14 14" fill="currentColor" width="14" height="14"><path d="M3 2h8v11l-4-3-4 3V2z"/></svg>';btn.title="Saved!";}
        else{btn.style.opacity="1";btn.disabled=false;btn.title=(r&&r.error)||"Save failed";}
      });
    });
  });
}

function showLoading(m){var e=$("#loadingState");e.textContent=m;e.style.display="block";$("#articlesContainer").style.display="none";$("#emptyState").style.display="none";}
function hideLoading(){$("#loadingState").style.display="none";}
function showEmpty(m){var e=$("#emptyState");e.textContent=m;e.style.display="block";$("#articlesContainer").style.display="none";}
function esc(s){var d=document.createElement("div");d.textContent=s;return d.innerHTML;}
function escA(s){return s.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");}
function truncate(s,m){return s.length>m?s.slice(0,m)+"\u2026":s;}
function formatDate(iso){try{return new Date(iso).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});}catch(e){return "";}}

init();
})();
