/* THE LODOWN — Content Script
 * Runs on the website. Reads the Supabase session from localStorage
 * and forwards it to the extension background so bookmarks can be saved
 * without a separate login step inside the extension.
 */
(function () {
  function syncAuth() {
    try {
      var keys = Object.keys(localStorage);
      var sessionKey = keys.find(function (k) {
        return k.startsWith('sb-') && k.endsWith('-auth-token');
      });
      if (sessionKey) {
        var raw = localStorage.getItem(sessionKey);
        if (raw) {
          var data = JSON.parse(raw);
          if (data && data.access_token) {
            chrome.runtime.sendMessage({
              type: 'SYNC_AUTH',
              token: data.access_token,
              email: (data.user && data.user.email) || null,
            });
            return;
          }
        }
      }
      chrome.runtime.sendMessage({ type: 'SYNC_AUTH', token: null, email: null });
    } catch (e) {}
  }

  // Sync immediately on page load
  syncAuth();

  // Sync when the website explicitly signals an auth change
  window.addEventListener('lodown:auth-change', function (e) {
    var detail = (e && e.detail) || {};
    chrome.runtime.sendMessage({
      type: 'SYNC_AUTH',
      token: detail.token || null,
      email: detail.email || null,
    });
  });

  // Fallback: watch localStorage for Supabase session changes
  window.addEventListener('storage', function (e) {
    if (e.key && e.key.startsWith('sb-') && e.key.endsWith('-auth-token')) {
      syncAuth();
    }
  });
})();
