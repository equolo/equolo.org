// once notified, creates a full screen logo
window.on('wp:hs-icon', function(e) {
  var
    wp = document.body.appendChild(
      document.createElement('wp')
    ),
    tmp = document.createElement('canvas'),
    width = (Math.min(display.width, display.height) / 2) >> 0
  ;
  tmp.style.cssText = 'width:' + width + 'px;' +
                      'height:' + width + 'px;';
  wp.appendChild(
    equoloIcon(
      tmp,
      width * display.ratio,
      '#E6A72A',
      '#286868'
    )
  );
  wp.appendChild(
    document.createElement('h1')
  ).textContent = 'equolo.org';
  wp.onclick = wp.remove;
  if (IE9Mobile) {
    wp.style.cssText =  [
      ';top:', document.documentElement.scrollTop, 'px',
      ';width:', display.width, 'px',
      ';height:', display.height, 'px'
    ].join('');
  }
  e.preventDefault();
});