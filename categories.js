// NOTE: probably not needed/used anymore

// requires a local mysql with the following:
// an equolo database, a root password, and a category table
var
  TeaSpawn = require('tea-spawn'),
  mysql = new TeaSpawn('mysql', ['-u', 'root'])
;

mysql.send('SELECT GROUP_CONCAT(icon) AS icon FROM equolo.category', function(e, o){
  process.stdout.write(
    'var icons=' +
      JSON.stringify(
        (''+o)
          // first line is the header
          .split(/[\r\n]+/)[1]
          // second line is grouped via coma
          .split(',')
      ) +
    ';'
  );
});
