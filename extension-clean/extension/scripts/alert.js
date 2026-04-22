(function(){
  function esc(s){var d=document.createElement("div");d.textContent=s;return d.innerHTML;}
  function escA(s){return s.replace(/&/g,"&amp;").replace(/"/g,"&quot;");}
  function trunc(s,m){return s.length>m?s.slice(0,m)+"…":s;}

  chrome.storage.local.get(["alertInfo"],function(d){
    if(!d.alertInfo){document.getElementById("emptyState").textContent="No alert data.";document.getElementById("emptyState").style.display="block";document.getElementById("loadingState").style.display="none";return;}
    var info=d.alertInfo;
    document.getElementById("ownerName").textContent=info.owner||"Corporate Media";
    document.getElementById("backLink").addEventListener("click",function(){
      if(info.sourceTabId)chrome.tabs.update(info.sourceTabId,{active:true},function(){window.close();});else window.close();
    });
    chrome.runtime.sendMessage({type:"EXTRACT_FROM_TAB",tabId:info.sourceTabId},function(res){
      if(chrome.runtime.lastError||!res||!res.text||res.text.length<50){doFeed();return;}
      chrome.runtime.sendMessage({type:"FIND_ALTERNATIVES",pageText:res.text},function(r){
        document.getElementById("loadingState").style.display="none";
        if(r&&r.success&&r.alternatives&&r.alternatives.length>0)render(r.alternatives);
        else{document.getElementById("emptyState").textContent="No local coverage found for this article.";document.getElementById("emptyState").style.display="block";}
      });
    });
  });

  function doFeed(){
    chrome.runtime.sendMessage({type:"GET_LOCAL_FEED"},function(r){
      document.getElementById("loadingState").style.display="none";
      if(r&&r.success&&r.items&&r.items.length>0)render(r.items);
      else{document.getElementById("emptyState").textContent="No local stories found.";document.getElementById("emptyState").style.display="block";}
    });
  }

  function render(items){
    var c=document.getElementById("arts");c.style.display="flex";
    c.innerHTML=items.map(function(it){
      var tag=it.nonprofit?"NON-PROFIT":(it.sourceName||"LOCAL");
      var cls=it.nonprofit?"card-tag np":"card-tag";
      return '<div class="card"><span class="'+cls+'">'+esc(tag)+'</span>'+
        '<h3>'+esc(trunc(it.title,90))+'</h3>'+
        '<div class="meta">'+esc(it.sourceName||"")+'</div>'+
        '<div class="snip">'+esc(trunc(it.description||"",180))+'</div>'+
        '<a class="btn-r" href="'+escA(it.link)+'" target="_blank" rel="noopener noreferrer">Read All About It</a></div>';
    }).join("");
  }
})();
