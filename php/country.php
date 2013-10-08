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
  $ip = explode('.', $_SERVER['REMOTE_ADDR']);
  // and only if it contains an IPv4 address
  if (count($ip) === 4) {
    // require what's needed
    require_once('common.php');
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
    $country = '';
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
    jsHeader('javascript', false);
    echo 'navigator.country='.(
      strlen($country) ?
        $country : 'null'
    ).';';
  }
}
?>