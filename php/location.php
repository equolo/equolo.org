<?php

/**
 * (C) equolo.org - Mit Style License
 *
 *  - generic location service
 *
 */

if (isset(
  $_COOKIE['lang'],
  $_COOKIE['country'],
  $_COOKIE['ip']
)) {

  require_once('common.php');
  require_once('jsonh.php');

  $stmt = query('all-activities', array($_COOKIE['lang']));
  while($row = $stmt->fetch(PDO::FETCH_OBJ)) {
    // TODO: organize activities, use JSONH
    // make it small and fast
  }

  jsHeader('javascript', true);
} else {
  // trolls gonna troll
  jsTroll('derp');
}

?>