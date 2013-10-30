var storage = localStorage;
try{storage.setItem('0',0)}catch(iOS7){
  storage = {
    length: 0,    // do not store data
    getItem: function (key) {
      var
        cookie = document.cookie,
        i = cookie.indexOf(
          key = escape('' + key)
        ),
        l
      ;
      if (-1 < i) {
        i += 1 + key.length;
        l = cookie.indexOf(';', i);
        return unescape(
          cookie.substring(
            i, l < 0 ? cookie.length : l
          )
        );
      }
    },
    setItem: function (key, data) {
      document.cookie = [
        escape('' + key) + '=' + escape('' + data),
        'expires=' + (new Date(
          Date.now() + 1000 * 60 * 60 * 24)
        ).toUTCString(),
        'path=/'
      ].join('; ');
    }
  };
}