<?php

/**
 * (C) equolo.org - Mit Style License
 *
 *  - understand the country based on IPv4 address location
 *
 *  - Database Countries Ranges by GeoLite
 *    @link http://dev.maxmind.com/geoip/legacy/geolite/
 */

require_once('common.php');

// only for verified requests
if (isEquoloRequest()) {
  // shortcut to avoid multiple access
  $REMOTE_ADDR = $_SERVER['REMOTE_ADDR'];
  // if already set and same as it was before
  if (
    isset($_COOKIE['ip']) &&
    $_COOKIE['ip'] === base64_encode($REMOTE_ADDR)
  ) {
    // no need to disturb the database
    $country = base64_decode($_COOKIE['country']);
  }
  // let's find out the country
  else {
    // using a fake IP hwen in localhost
    $country = json_encode(getIPv4Country(
      DEVELOPMENT ? '172.1.1.1' : $REMOTE_ADDR
    ));
  }
  // set cookies in a simple way
  // no need to make them visible, neither to use
  // full enccryption for this data. Is already public
  cookieSetter('ip', base64_encode($REMOTE_ADDR), 3600);
  cookieSetter('country', base64_encode($country), 3600);
  // send the country object;
  jsHeader('javascript');
  echo 'navigator.country='.$country.';';
} else {
  // trollers must be trolled :P
  jsTroll();
}
?>