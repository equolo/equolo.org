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
    'auth-login-active' =>
      'SELECT
        `auth-login`.active
      FROM
        auth,
        `auth-login`
      WHERE
        `auth-login`.`auth-id` = auth.id
      AND
        auth.email = ?',
    'insert-notification' =>
      'INSERT INTO
        notifications
      (`auth-id`)
        VALUES
      (SELECT id FROM auth WHERE email = ?)',
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
    'remove-notification' =>
      'DELETE FROM
        notifications
      WHERE
        `auth-id` = (SELECT id FROM auth WHERE email = ?)',
    'update-notification' =>
      'UPDATE
        notifications
      SET
        tstamp = NOW()
      WHERE
        `auth-id` = (SELECT id FROM auth WHERE email = ?)',
    'user-activation' =>
      'UPDATE
        `auth-login`
      SET
        active = 1
      WHERE
        `auth-id` = ?',
    'user-activities' =>
      'SELECT
        activity.id,
        `activity-name`.value AS "name",
        `activity-description`.value AS "description",
        lang.id AS "lid",
        lang.value AS "lang",
        category.icon,
        `activity-geo`.id AS "gid",
        `activity-geo`.latitude,
        `activity-geo`.longitude,
        `activity-place`.road,
        `activity-place`.extra,
        `activity-place`.postcode,
        `activity-place`.city,
        `activity-place`.county,
        `activity-place`.state,
        `activity-place`.country,
        `activity-place`.email,
        `activity-place`.phone,
        `activity-place`.website,
        `activity-place`.twitter
      FROM
        auth,
        `auth-login`,
        activity,
        `activity-description`,
        `activity-name`,
        `activity-geo`,
        `activity-place`,
        category,
        lang
      WHERE
        auth.email = "ariannademario@hotmail.com"
      AND
        `auth-login`.`auth-id` = auth.id
      AND
        `auth-login`.active = 1
      AND
        activity.`auth-id` = auth.id
      AND
        `activity-name`.`activity-id` = activity.id
      AND
        `activity-description`.`activity-id` = activity.id
      AND
        lang.id = `activity-description`.`lang-id`
      AND
        `activity-geo`.`activity-id` = activity.id
      AND
        category.id = `activity-geo`.`category-id`
      AND
        `activity-place`.`activity-geo-id` = `activity-geo`.id',
    'user-authentication' =>
      'SELECT
        SHA1(CONCAT(email, token)) AS "token"
      FROM
        auth
      WHERE
        email = ?',
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
        country.id = country_range.country_id',
    'verify-notification' =>
      'SELECT
        notifications.tstamp AS "when"
      FROM
        auth,
        notifications
      WHERE
        auth.email = ?
      AND
        notifications.`auth-id` = auth.id',
    'verify-user' =>
      'SELECT
        auth.id,
        `auth-login`.active
      FROM
        auth,
        `auth-login`
      WHERE
        `auth-login`.`auth-id` = auth.id
      AND
        auth.email = ?
      AND
        SHA1(CONCAT(email, token)) = ?'
  );
  return isset($query[$command]) ?
    $query[$command] :
    exit('unknown query command: '.$command)
  ;
}
?>