<?php

/**
 * (C) equolo.org - Mit Style License
 *
 *  - understand the country based on IPv4 address location
 *
 *  - Database Countries Ranges by GeoLite
 *    @link http://dev.maxmind.com/geoip/legacy/geolite/
 */

// only if the remote address is present
if (isset($_SERVER['REMOTE_ADDR'])) {
  // require what's needed
  require_once('common.php');
  // shortcut to avoid multiple access
  $REMOTE_ADDR = $_SERVER['REMOTE_ADDR'];
  // if already set and same as it was before
  if (
    isset($_COOKIE['ip']) &&
    $_COOKIE['ip'] === base64_encode($REMOTE_ADDR)
  ) {
    // no need to disturb the database
    $country = base64_decode($_COOKIE['country']);
  } else {
    // let's find out the country
    $country = json_encode(getIPv4Country($REMOTE_ADDR));
  }
  // set cookies in a simple way
  // no need to make them visible, neither to use
  // full enccryption for this data. Is already public
  cookieSetter('ip', base64_encode($REMOTE_ADDR));
  cookieSetter('country', base64_encode($country));
  // send the country object;
  jsHeader('javascript', false);
  echo 'navigator.country='.$country.';';
}
?>