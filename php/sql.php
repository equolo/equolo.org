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
//
// NOTE:  queries are kept simple on purpose
//        being the database and the version
//        unnown upfront (in few words: no JOIN)
function sql($command) {
  static $query = array(



    'all-activities' =>
      'SELECT
        activity.id,
        `activity-name`.value AS "name",
        `activity-description`.value AS "description",
        lang.value AS "lang",
        category.icon,
        `activity-geo`.id AS "gid",
        `activity-geo`.latitude,
        `activity-geo`.longitude,
        `activity-place`.road AS "address",
        `activity-place`.extra,
        `activity-place`.postcode,
        `activity-place`.city,
        `activity-place`.county,
        `activity-place`.state,
        `activity-place`.country,
        `activity-place`.email,
        `activity-place`.phone,
        `activity-place`.website,
        `activity-place`.twitter,
        `activity-place`.gplus,
        `activity-place`.facebook
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



    'activity-create' =>
      'INSERT INTO
        activity
      VALUES
        (null, ?, NOW())',
    'activity-delete' =>
      'DELETE LOW_PRIORITY FROM
        activity,
        `activity-description`,
        `activity-name`,
        `activity-geo`,
        `activity-place`
      USING
        activity
      INNER JOIN
        `activity-description`
      INNER JOIN
        `activity-name`
      INNER JOIN
        `activity-geo`
      INNER JOIN
        `activity-place`
      WHERE
        activity.id = ?
      AND
        `activity-description`.`activity-id` = activity.id
      AND
        `activity-name`.`activity-id` = activity.id
      AND
        `activity-geo`.`activity-id` = activity.id
      AND
        `activity-place`.`activity-geo-id` = `activity-geo`.id',



    'auth-login-active' =>
      'SELECT
        auth.id,
        `auth-login`.active
      FROM
        auth,
        `auth-login`
      WHERE
        `auth-login`.`auth-id` = auth.id
      AND
        auth.email = ?',
    'activity-criteria-create' =>
      'INSERT INTO
        `activity-criteria`
      VALUES
        (?, ?)',
    'activity-criteria-delete' =>
      'DELETE FROM
        `activity-criteria`
      WHERE
        `activity-id` = ?',



    'activity-certification-create' =>
      'INSERT INTO
        `activity-certification`
      VALUES
        (?, ?)',
    'activity-certification-delete' =>
      'DELETE FROM
        `activity-certification`
      WHERE
        `activity-id` = ?',



    'activity-description-create' =>
      'INSERT INTO
        `activity-description`
      VALUES
        (?, ?, ?)',
    'activity-description-delete' =>
      'DELETE FROM
        `activity-description`
      WHERE
        `activity-id` = ?',


    'activity-geo-create-empty' =>
      'INSERT INTO `activity-geo` (id) VALUES (null)',
    'activity-geo-delete' =>
      'DELETE LOW_PRIORITY FROM
        `activity-geo`,
        `activity-place`
      USING
        `activity-geo`
      INNER JOIN
        `activity-place`
      WHERE
        `activity-geo`.id = ?
      AND
        `activity-place`.`activity-geo-id` = `activity-geo`.id',
    'activity-geo-update' =>
      'UPDATE
        `activity-geo`
      SET
        `activity-id` = ?,
        `category-id` = ?,
        latitude = ?,
        longitude = ?
      WHERE
        id = ?',



    'activity-name-create-empty' =>
      'INSERT INTO
        `activity-name`
      VALUES
        (?, "")',
    'activity-name-update' =>
      'UPDATE
        `activity-name`
      SET
        value = ?
      WHERE
        `activity-id` = ?',



    'activity-place-create-empty' =>
      'INSERT INTO `activity-place` (`activity-geo-id`) VALUES (?)',
    'activity-place-update' =>
      'UPDATE
        `activity-place`
      SET
        road = ?,
        extra = ?,
        postcode = ?,
        city = ?,
        county = ?,
        state = ?,
        country = ?,
        email = ?,
        phone = ?,
        website = ?,
        twitter = ?,
        gplus = ?,
        facebook = ?
      WHERE
        `activity-geo-id` = ?',



    'auth-login-create' =>
      'INSERT INTO
        `auth-login`
      VALUES
        (?, 0, NOW())',
    'criteria' =>
      'SELECT
        criteria.id,
        criteria.value
      FROM
        criteria,
        lang
      WHERE
        criteria.`lang-id` = lang.id
      AND
        lang.value = ?',

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

      'category' =>
      'SELECT
        *
      FROM
        category',

      'category-lang' =>
      'SELECT
        category.icon,
        `category-name`.value AS "description"
      FROM
        category,
        `category-name`,
        lang
      WHERE
        lang.value = ?
      AND
        `category-name`.`lang-id` = lang.id
      AND
        `category-name`.`category-id` = category.id',

      'category-list' =>
      'SELECT
        `category`.icon AS "icon",
        `category-name`.value AS "name",
         GROUP_CONCAT(
           `category-list`.value
           ORDER BY `category-list`.value
           DESC SEPARATOR ";;;"
        ) AS "list"
      FROM
        `category`,
        `category-name`,
        `category-list`,
        lang
      WHERE
        lang.value = ?
      AND
        `category-name`.`lang-id` = lang.id
      AND
        `category-list`.`category-id` = `category-name`.`category-id`
      AND
        `category`.id = `category-name`.`category-id`
      AND
        `category-list`.`lang-id` = lang.id
      GROUP BY
        `category-list`.`category-id`',


    'remove-notification' =>
      'DELETE LOW_PRIORITY FROM
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
        (SELECT
          GROUP_CONCAT(
            DISTINCT `activity-criteria`.`criteria-id`
          )
        FROM
          `activity-criteria`
        WHERE
          `activity-criteria`.`activity-id` = activity.id
        ) AS "criteria",
        (SELECT
          GROUP_CONCAT(
            DISTINCT `activity-certification`.`certification-id`
          )
        FROM
          `activity-certification`
        WHERE
          `activity-certification`.`activity-id` = activity.id
        ) AS "certification",
        lang.id AS "lid",
        lang.value AS "lang",
        category.icon,
        `activity-geo`.id AS "gid",
        `activity-geo`.latitude,
        `activity-geo`.longitude,
        `activity-place`.road AS "address",
        `activity-place`.extra,
        `activity-place`.postcode,
        `activity-place`.city,
        `activity-place`.county,
        `activity-place`.state,
        `activity-place`.country,
        `activity-place`.email,
        `activity-place`.phone,
        `activity-place`.website,
        `activity-place`.twitter,
        `activity-place`.gplus,
        `activity-place`.facebook
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
        auth.email = ?
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
        `activity-place`.`activity-geo-id` = `activity-geo`.id
      GROUP BY gid, lid',

    'user-authentication' =>
      'SELECT
        SHA1(CONCAT(email, token)) AS "token"
      FROM
        auth
      WHERE
        email = ?',
    'user-create' =>
      'INSERT INTO
      auth
      VALUES
      (null, ?, ?)',
    'user-delete' =>
      'DELETE LOW_PRIORITY FROM
        auth,
        `auth-login`
      USING
        auth
      INNER JOIN
        `auth-login`
      WHERE
        auth.id = ?
      AND
        `auth-login`.`auth-id` = auth.id',


    'delete-user-and-related-activities' =>
      'DELETE LOW_PRIORITY FROM
        auth,
        `auth-login`,
        activity,
        `activity-description`,
        `activity-name`,
        `activity-geo`,
        `activity-place`
      USING
        auth
      INNER JOIN
        `auth-login`
      INNER JOIN
        activity
      INNER JOIN
        `activity-description`
      INNER JOIN
        `activity-name`
      INNER JOIN
        `activity-geo`
      INNER JOIN
        `activity-place`
      WHERE
        auth.id = ?
      AND
        `auth-login`.`auth-id` = auth.id
      AND
        activity.`auth-id` = auth.id
      AND
        `activity-description`.`activity-id` = activity.id
      AND
        `activity-name`.`activity-id` = activity.id
      AND
        `activity-geo`.`activity-id` = activity.id
      AND
        `activity-place`.`activity-geo-id` = `activity-geo`.id',


    'user-country' =>
      'SELECT
        country.*,
        lang.value AS "lang"
      FROM
        country_range,
        country,
        lang
      WHERE
        ?
      BETWEEN
        country_range.start
      AND
        country_range.end
      AND
        country.id = country_range.country_id
      AND
        lang.id = country.lang_id
      LIMIT 1',



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