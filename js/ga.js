function GoogleAnalytics() {
  if(location.href.indexOf('equolo') < 0) return;
  window._gaq = [
    ['_setAccount','UA-924021-6'],
    ['_trackPageview']
  ];
  var
    ga = document.createElement('script'),
    s = document.getElementsByTagName('script')[0]
  ;
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = 'http://www.google-analytics.com/ga.js';
  s.parentNode.insertBefore(ga, s);
}