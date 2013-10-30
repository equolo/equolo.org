<?php

/**
 * (C) equolo.org - Mit Style License
 *
 *  - generic location service
 *
 */

require_once('common.php');

if (isEquoloRequest() &&
  isset(
    $_COOKIE['lang'],
    $_COOKIE['country'],
    $_COOKIE['ip']
  )
) {
  jsHeader('javascript', true);
  echo json_encode(getOrganizedResults(
    query('all-activities'),
    $_COOKIE['lang']
  ));
} else {
  jsTroll('derp');
}

?>