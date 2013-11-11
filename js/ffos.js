// install equolo.org as App in Firefox OS
window.on('wp:ffos-install', function(e) {
  try {
    navigator.mozApps.install('http://equolo.org/equolo.webapp').onerror = function () {
      // something went wrong
      alert(':-(\n' + this.error.name);
    };
  } catch(notFirefoxOS) {}
  e.arguments[0].preventDefault();
});