<?php

/**
 * (C) equolo.org - Mit Style License
 *
 *  - Database connection
 */

// NOTE: this is an example of the original database file used in equolo.org
function db() {
  static $db;
  // only if never instantiated/assigned
  if (empty($db)) {
    // differnce between localhost and production
    $prod = isset($_ENV['DATABASE_SERVER']);
    if ($prod) {
      $host = $_ENV['DATABASE_SERVER'];
      $dbmane = 'production_database_name';
      $user = 'production_database_user';
      $pass = 'production_database_pass';
      $type = 'production_database_type';
    } else {
      $host = 'local_database_host';
      $dbmane = 'local_database_name';
      $user = 'local_database_user';
      $pass = 'local_database_pass';
      $type = 'local_database_type';
    }
    // http://www.php.net/manual/en/pdo.construct.php
    try {
      $db = new PDO(
        $type.':dbname='.$dbmane.';host='.$host.';charset=utf8',
        $user,
        $pass
      );
      // be extra sure it's handled like that
      // for older PDO configurations
      $db->exec('set names utf8');
    } catch (PDOException $e) {
      exit($prod ?
        'the database, I haz it no more!' :
        $e->getMessage()
      );
    }
  }
  return $db;
}
?>