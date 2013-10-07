<?php
// NOTE: this is an example of the original database file used in equolo.org
function db() {
  static $db;
  // only if never instantiated/assigned
  if (empty($db)) {
    $db = new mysqli(
      'database_host',    // where is the MySQL database ?
      'database_user',    // which user to log in into that ?
      'database_password',// which is the user password ?
      'database_name'     // which database name is it ?
    );
    if ($db->connect_errno) {
      // it's pointless to perform anything else
      // if the database connection goes down
      // or is not available.
      exit('the database, I haz it nomore');
    }
  }
  return $db;
}
?>