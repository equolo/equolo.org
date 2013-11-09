// add shortcut icons per each resolution to the header at runtime
// requires equoloIcon();
function createShortcutIcon(equoloIcon) {
  for(var
    link1, link2,
    // used to generate icons at runtime
    canvas = document.createElement('canvas'),
    // where to place links
    fragment = document.createDocumentFragment(),
    sizes = [
      30, 57, 60, 72, 114, 128, 144, 173, 196
      // completely random , hopefully future proof, entries
      , 214, 256
      // btw, the whole sizes and 2X idea is so wrong ...
    ],
    i = 0; i < sizes.length; i++
  ) {
    link1 = document.createElement('link');
    link2 = document.createElement('link');
    link1.rel = 'shortcut icon';
    link2.rel = 'apple-touch-icon';
    link1.type = link2.type = 'image/png';
    link1.href = link2.href = equoloIcon(
      canvas, sizes[i], '#E6A72A', '#286868'
    ).toDataURL();
    link1.setAttribute('sizes', link1.sizes = sizes[i] + 'x' + sizes[i]);
    link2.setAttribute('sizes', link1.sizes);
    fragment.appendChild(link1);
    fragment.appendChild(link2);
  }
  (document.head || document.querySelector('head')).appendChild(fragment);
}