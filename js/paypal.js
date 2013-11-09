function PayPal() {
  var
    url = 'https://www.paypalobjects.com/',
    fragment = document.createDocumentFragment(),
    input = fragment.appendChild(document.createElement('input')),
    img = fragment.appendChild(document.createElement('img'))
  ;
  input.type = 'image';
  input.src = url + 'en_US/i/btn/btn_donate_SM.gif';
  input.border = img.border = 0;
  input.name = 'submit';
  input.alt = 'PayPal - The safer, easier way to pay online!';
  img.alt = '';
  img.src = url + 'de_DE/i/scr/pixel.gif';
  img.width = img.height = 1;
  $('form#paypal')[0].appendChild(fragment);
}