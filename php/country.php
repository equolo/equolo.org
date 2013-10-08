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
  // will be the user country
  $country = 'null';
  // needed to find the country
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
    $ip = explode('.', $REMOTE_ADDR);
    // and only if it contains an IPv4 address
    if (count($ip) === 4) {
      // prepare the query
      $stmt = query(
        'user-country',
        array(
          ($ip[0] * 0x1000000) +
          ($ip[1] * 0x10000) +
          ($ip[2] * 0x100) +
          ($ip[3] * 0x1)
        )
      );
      // only if there is a row
      while($row = $stmt->fetch(PDO::FETCH_OBJ)) {
        $object = new StdClass;
        $object->id = intval($row->id);
        $object->name = $row->name;
        $object->iso2 = $row->iso2;
        $object->geo = new StdClass;
        $object->geo->latitude = floatval($row->latitude);
        $object->geo->longitude = floatval($row->longitude);
        $country = json_encode($object);
      }
    }
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