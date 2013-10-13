<?php

/**
 * (C) equolo.org - Mit Style License
 *
 *  - generic verification utility file
 *
 */

require_once('common.php');

// only for verified requests
if (isEquoloRequest()) {
  $result = null;
  if (
    // email must be provided
    isset($_GET['email']) &&
    // it's a must to also verify on the server
    isValidEmail($_GET['email'])
  ) {
    $commonParams = array($_GET['email']);
    // editing, case after authentication with same epxlicit email
    if (isAuthenticated() && $_GET['email'] === $_COOKIE['email']) {
      // grab all activities and all related info
      $stmt = query('user-activities', $commonParams);
      // used to group by activity
      $activities_holder = array();
      // used to group places
      $places_holder = array();
      // output
      $result = array();
      // all keys to copy from $row to $place (geo place)
      $keys = array(
        'icon',
        'latitude',
        'longitude',
        'road',
        'extra',
        'postcode',
        'city',
        'county',
        'state',
        'country',
        'email',
        'phone',
        'website',
        'twitter'
      );
      while($row = $stmt->fetch(PDO::FETCH_OBJ)) {
        // if there's no activity yet
        if (!isset($activities_holder[$row->id])) {
          // create one unique
          $activity = new StdClass;
          $activity->name = $row->name;
          $activity->description = array();
          $activity->place = array();
          $activities_holder[$row->id] = $activity;
          // assign by reference to the next $result
          $result[] = &$activity;
        }
        // the previously handled unique activity
        $activity = &$activities_holder[$row->id];
        // each description by lang per each single activity
        $activity->description[$row->lang] = $row->description;
        // each place per activity
        if (!isset($places_holder[$row->gid])) {
          $place = new StdClass;
          $place->id = $row->gid;
          foreach($keys as $key) {
            $place->$key = $row->$key;
          }
          $places_holder[$row->gid] = $place;
          $activity->place[] = $place;
        }
      }
    } else {
      // check if the user never authenticated
      $active = null;
      $stmt = query('auth-login-active', $commonParams);
      while($row = $stmt->fetch(PDO::FETCH_OBJ)) {
        $active = $row->active;
      }
      // if there is a user like this in the database
      if ($active !== null) {
        $sendAuthenticationMessage = function ($active) use (&$commonParams) {
          $stmt = query('user-authentication', $commonParams);
          while($row = $stmt->fetch(PDO::FETCH_OBJ)) {
            $token = $row->token;
          }
          // require the spoken language
          $dictionary = getLanguage(
            isset($_COOKIE['lang']) ?
              $_COOKIE['lang'] : 'en'
          );
          // send an email with the authentication link
          mailTo(
            'no-reply',
            $commonParams[0],
            ($active ?
              $dictionary['authentication-reminder'] :
              $dictionary['authentication-activation']
            ),
            ($active ?
              $dictionary['authentication-reminder-text'] :
              $dictionary['authentication-activation-text']
            ).
              "\n<br>\n".
              '<a href="http://equolor.org/?email='.
                rawurlencode($commonParams[0]).
              '&token='.
                rawurlencode($token).
              '">)°(, equolo - authentication</a>'
          );
        };
        // inform the client too
        $result = $active == '1';
        // needed to avoid common problems with dates
        date_default_timezone_set('UTC');
        // and verify if there is at least one notification
        $when = null;
        $stmt = query('verify-notification', $commonParams);
        while($row = $stmt->fetch(PDO::FETCH_OBJ)) {
          $when = new DateTime($row->when);
        }
        // if no notification is in the database
        if ($when === null) {
          query('insert-notification', $commonParams);
          // the user is waiting for a message to be able
          // to enable or edit again
          $sendAuthenticationMessage($result);
        } else {
          // verify when last notification has been sent
          $now = new DateTime(date('Y-m-d H:i:s'));
          // at least a couple of days ago
          if (1 < $now->diff($when)->days) {
            // update the record and send notification again
            query('update-notification', $commonParams);
            $sendAuthenticationMessage($result);
          }
        }
      }
    }
  }
  jsHeader('json');
  echo json_encode($result);
} else {
  // trollers must be trolled :P
  jsTroll();
}
?>