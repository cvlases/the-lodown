/* THE LODOWN — Content Script
 * Runs on the website. Reads the Supabase session from localStorage
 * and forwards it to the extension background so bookmarks can be saved
 * without a separate login step inside the extension.
 */
(function () {
  function getSessionFromStorageValue(raw) {
    if (!raw) return null;
    try {
      var data = JSON.parse(raw);
      if (data && data.access_token) return data;
      if (data && data.currentSession && data.currentSession.access_token) return data.currentSession;
      if (data && data.session && data.session.access_token) return data.session;
      if (Array.isArray(data)) {
        for (var i = 0; i < data.length; i++) {
          if (data[i] && data[i].access_token) return data[i];
        }
      }
    } catch (e) {}
    return null;
  }

  function isExtensionAlive() {
    try { return !!chrome.runtime && !!chrome.runtime.id; }
    catch (e) { return false; }
  }

  function safeSend(msg) {
    if (!isExtensionAlive()) return;
    try {
      chrome.runtime.sendMessage(msg, function () {
        // Swallow "Extension context invalidated" and similar errors
        void chrome.runtime.lastError;
      });
    } catch (e) {}
  }

  function syncAuth() {
    if (!isExtensionAlive()) return;
    try {
      var keys = Object.keys(localStorage);
      var sessionKey = keys.find(function (k) {
        return k.startsWith('sb-') && k.endsWith('-auth-token');
      });
      if (sessionKey) {
        var raw = localStorage.getItem(sessionKey);
        var session = getSessionFromStorageValue(raw);
        if (session && session.access_token) {
          safeSend({ type: 'SYNC_AUTH', token: session.access_token, email: (session.user && session.user.email) || null });
          return;
        }
      }
      safeSend({ type: 'SYNC_AUTH', token: null, email: null });
    } catch (e) {}
  }

  syncAuth();

  window.addEventListener('lodown:auth-change', function (e) {
    var detail = (e && e.detail) || {};
    safeSend({ type: 'SYNC_AUTH', token: detail.token || null, email: detail.email || null });
  });

  window.addEventListener('storage', function (e) {
    if (e.key && e.key.startsWith('sb-') && e.key.endsWith('-auth-token')) {
      syncAuth();
    }
  });
})();
