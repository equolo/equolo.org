var storage = localStorage;
try{storage.setItem('0',0)}catch(iOS7){
  /* it wasn't that difficult Apple ...
  interface Storage {
    readonly attribute unsigned long length;
    [IndexGetter] DOMString key(in unsigned long index);
    [NameGetter] DOMString getItem(in DOMString key);
    [NameSetter] void setItem(in DOMString key, in DOMString data);
    [NameDeleter] void removeItem(in DOMString key);
    void clear();
  };
  */
  storage = (function(db){
    var
      // speed up instead of using O(n) Object.keys calls
      keys = [],
      // the unique dictionary used for the whole sessions
      dict = Object.create(null),
      // the fake localStorage with filly implemented API
      // except for accessors, of course (and YAGNI ;-))
      localStorage = Object.defineProperties({}, {
        length: {
          get: function length() {
            return keys.length;
          }
        },
        key: {
          value: function key(i) {
            return keys[i];
          }
        },
        getItem: {
          value: function getItem(key) {
            return dict[key];
          }
        },
        setItem: {
          value: function setItem(key, data) {
            db.transaction(
              (key in dict ?
                updatePair :
                keys.push(key) && savePair
              ).bind(
                null,
                key,
                dict[key] = '' + data
              )
            );
          }
        },
        removeItem: {
          value: function (key) {
            if (key in dict) {
              delete dict[key];
              keys.splice(keys.indexOf(key), 1);
              db.transaction(
                removePair.bind(
                  null,
                  key
                )
              );
            }
          }
        }
      })
    ;
    function removePair(key, t) {
      t.executeSql([
        'DELETE FROM',
          'localStorage',
        'WHERE',
          '`key` = ?'
        ].join(' '),
        [key],
        function () {
          console.log('pair removed');
        }
      );
    }
    function savePair(key, item, t) {
      t.executeSql([
        'INSERT INTO',
          'localStorage',
        'VALUES (?, ?)'
        ].join(' '),
        [key, item],
        function () {
          console.log('pair saved');
        }
      );
    }
    function updatePair(key, item, t) {
      t.executeSql([
        'UPDATE',
          'localStorage',
        'SET',
          '`item` = ?',
        'WHERE',
          '`key` = ?'
        ].join(' '),
        [item, key],
        function () {
          console.log('pair updated');
        }
      );
    }
    db.transaction(function(t){
      t.executeSql([
        'CREATE TABLE IF NOT EXISTS',
          'localStorage',
        '(',
          '`key` TEXT NOT NULL PRIMARY KEY,',
          '`item` TEXT NOT NULL',
        ')'].join(' '),
        keys,
        function(){
          db.readTransaction(function(t){
            t.executeSql(
              'SELECT * FROM localStorage',
              function(t, r) {
                for (var
                  current,
                  rows = r.rows,
                  i = 0, l = rows.length; i < l; i++
                ) {
                  current = rows.item(i);
                  dict[keys[i] = current.key] = dict[current.item];
                  // you don't really want to go down the
                  // Object.setProperty with getter and setter
                  // per each property ... do you?
                  // 'cause you will put yourself in troubles
                  // due inability to intercept the delete operation
                  // since Proxy does nto belong JSC yet
                  // just do not use the DOM storage as an object
                  // pass through its methods as I say since ever ^_^
                }
              }
            );
          });
        }
      );
    });
    return localStorage;
  }(openDatabase('localStorage', '1.0', 'localStorage', 1024 * 1024)));
}
storage.removeItem('0');

window._storage = storage;