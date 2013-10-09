<?php

/**
 * (C) equolo.org - Mit Style License
 *
 *  - SQL Queries For All The Things
 */

// returns an SQL associated with a specific string
// @example
//    $stmt = db()->prepare(sql('all-data'));
//    $stmt->execute(array($lang, $coords));
//    foreach($stmt->fetch(PDO::FETCH_OBJ) as $row) {...}
//    $stmt->closeCursor();
function sql($command) {
  static $query = array(
    'language' =>
      'SELECT
        lang.id,
        lang.value,
        `lang-description`.value AS description
      FROM
        lang,
        `lang-description`
      WHERE
        lang.id = `lang-description`.`lang-id`',
    'user-country' =>
      'SELECT
        country.*
      FROM
        country_range,
        country,
        `lang-description`
      WHERE
        ?
      BETWEEN
        country_range.start
      AND
        country_range.end
      AND
        country.id = country_range.country_id'
  );
  return isset($query[$command]) ?
    $query[$command] :
    exit('unknown query command: '.$command)
  ;
}
?>