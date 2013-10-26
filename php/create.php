<?php

/**
 * (C) equolo.org - Mit Style License
 *
 *  - file to create or modify user data
 *
 */

require_once('common.php');

// used to unpack places later on
// https://github.com/WebReflection/JSONH
require_once('jsonh.php');

// NOTE: most of these checks are redundant
// considering the user comes from a session
// in a page where verification already happened.
// However, security is always a concern
// and we should never assume data from another page
// is safe or the intent was good and error free.

// only for verified requests
if (
  (isset($_POST['info']) && isEquoloRequest())
  // TODO: for testing only, to be removed
  // or to mark DEVELOPMENT statically as false
  || (DEVELOPMENT && isset($_GET['info']))
) {
  // flag to operate
  $proceed = false;
  // flag to notify the user
  // if a new comer
  $validUser = false;
  try {
    $user = json_decode(
      DEVELOPMENT && isset($_GET['info']) ?
        $_GET['info'] : $_POST['info']
    );
  } catch(Exception $e) {
    // not much to do here ... 
  }
  if (isset($user) && filter_var($user->email, FILTER_VALIDATE_EMAIL)) {
    $commonParam = array($user->email);
    $user->id = isAuthenticated(true);
    $proceed = $validUser = $user->id !== false && $user->email === $_COOKIE['email'];
    if (!$proceed && !isset($_COOKIE['email'])) {
      // probably a new user to welcome ?
      $active = null;
      $stmt = query('auth-login-active', $commonParam, true);
      // the while should never happen for new users
      while($row = $stmt->fetch(PDO::FETCH_OBJ)) {
        $active = $row->active;
        if (DEVELOPMENT) {
          $user->id = $row->id;
          $validUser = $active == 1;
          $active = null;
        }
      }
      $proceed = $active === null;
    }
    if ($proceed) {

      $activities = array();
      $places = array();
      // let's be sure that the user owns ids is trying to modify
      // each operation should be double validated in this procedure
      // activities, as well as palces, should be already known
      // or at least should be new (then added to these lists)
      if ($validUser) {
        $stmt = query('user-activities', array($user->email), true);
        while($row = $stmt->fetch(PDO::FETCH_OBJ)) {
          $activities[$row->id] = true;
          $places[$row->gid] = true;
        }
      }

      // simplifies the language => id map
      $language = array();
      $stmt = query('language');
      while($row = $stmt->fetch(PDO::FETCH_OBJ)) {
        $language[$row->value] = $row->id;
      }

      // simplifies the icon => category-id map
      $category = array();
      $stmt = query('category');
      while($row = $stmt->fetch(PDO::FETCH_OBJ)) {
        $category[$row->icon] = $row->id;
      }

      // not a valid user? create one then
      if (!$validUser) {
        $user->token = sha1(uniqid($user->email.microtime(true), true));
        $commonParam[] = $user->token;
        query('user-create', $commonParam, true);
        // first time in the database
        query('auth-login-create', array(
          // the new user id will be set as non active
          // until the email has been verified
          $user->id = db()->lastInsertId()
        ), true);
        // TODO: send the email with the token later on
      }

// now .. RE-WRITE ALL THE THINGS !!!!
/////////////////////////////////////////////////////////////////////////

      // NOTE FOR LURKERS:
      // this is horribly inefficient
      // right now we don't have too many users
      // neither so many new activities per second
      // but ideally only fields that should be updated
      // should be updated ... possibly filtered
      // on the client side so that only update, insert, and remove
      // operations will be performed here

      // TODO: use a single TRANSITION for
      // all inserts, delete, and updates
      foreach($user->activities as $activity) {
        // removed activities, just drop data
        if(substr($activity->id, 0, 7) === 'remove:') {
          $id = filter_var(substr($activity->id, 7), FILTER_SANITIZE_NUMBER_INT);
          if (isset($activities[$id])) {
            // WARNING: this query might deeply hurt
            //          it removes everything at once, watch out
            //          if playing while debugging
            $commonParam = array($id);
            query('activity-delete', $commonParam, true);
            query('activity-certification-delete', $commonParam, true);
            query('activity-criteria-delete', $commonParam, true);
          } else {
            exit('bad-data');
          }
        } else {
          // new activities need to be created
          if (substr($activity->id, 0, 4) === 'new:') {
            // create the new activity
            query('activity-create', array($user->id), true);
            $commonParam = array(
              $activity->id = db()->lastInsertId()
            );
            query('activity-name-create-empty', $commonParam, true);
            $activities[$activity->id] = true;
          } else {
            $activity->id = filter_var($activity->id, FILTER_SANITIZE_NUMBER_INT);
            $commonParam = array($activity->id);
          }
          // only if owned
          if (isset($activities[$activity->id])) {
            // drop and put all certifications
            query('activity-certification-delete', $commonParam, true);
            foreach($activity->certification as $certificationID) {
              query('activity-certification-create', array(
                $activity->id,
                filter_var($certificationID, FILTER_SANITIZE_NUMBER_INT)
              ), true);
            }
            // drop and put all criteria
            query('activity-criteria-delete', $commonParam, true);
            foreach($activity->criteria as $criteriaID) {
              query('activity-criteria-create', array(
                $activity->id,
                filter_var($criteriaID, FILTER_SANITIZE_NUMBER_INT)
              ), true);
            }
            // update the name
            query('activity-name-update', array(
              trim($activity->name),
              $activity->id
            ), true);
            // drop all descriptions
            query('activity-description-delete', $commonParam, true);
            foreach($activity->description as $lang => $description) {
              // and insert again them
              query('activity-description-create', array(
                $activity->id,
                isset($language[$lang]) ? $language[$lang] : 1,
                trim($description)
              ), true);
            }
            // per each place ... basically do the same
            foreach(JSONH::unpack($activity->place) as $place) {
              // only if owned
              if(substr($place->id, 0, 7) === 'remove:') {
                $id = filter_var(substr($place->id, 7), FILTER_SANITIZE_NUMBER_INT);
                if (isset($places[$id])) {
                  // WARNING: this query might hurt too
                  query('activity-geo-delete', array($id), true);
                } else {
                  exit('bad-data');
                }
              } else {
                if (substr($place->id, 0, 4) === 'new:') {
                  // create the new geo location
                  query('activity-geo-create-empty');
                  query('activity-place-create-empty', array(
                    $place->id = db()->lastInsertId()
                  ));
                  $places[$place->id] = true;
                }
                if (isset($places[$place->id])) {
                  query('activity-geo-update', array(
                    $activity->id,
                    isset($category[$place->icon]) ? $category[$place->icon] : 'map-marker',
                    $place->latitude,
                    $place->longitude,
                    $place->id
                  ), true);
                  query('activity-place-update', array(
                    trim($place->address),
                    trim($place->extra),
                    trim($place->postcode),
                    trim($place->city),
                    trim($place->county),
                    trim($place->state),
                    trim($place->country),
                    mb_strtolower(trim(filter_var($place->email, FILTER_SANITIZE_EMAIL))),
                    trim($place->phone),
                    trim($place->website),
                    // grab possible handler only
                    preg_replace(
                      '#^.*?(?:@|twitter\.[a-z]{2,}/)#',
                      '',
                      filter_var($place->twitter, FILTER_SANITIZE_URL)
                    ),
                    // remove initial part of the link
                    preg_replace(
                      '#^.*?plus\.google\.[a-z]{2,}/#',
                      '',
                      filter_var($place->gplus, FILTER_SANITIZE_URL)
                    ),
                    // remove initial part of the link
                    preg_replace(
                      '#^.*?facebook\.[a-z]{2,}/#',
                      '',
                      filter_var($place->facebook, FILTER_SANITIZE_URL)
                    ),
                    $place->id
                  ), true);
                } else {
                  exit('bad-data');
                }
              }
            }
          }
        }
      }
      // welcome to equolo new user!
      if (!$validUser) {
        $link = '<a href="http://equolo.org/submit.php?'.
          'token='.rawurlencode(sha1($user->email.$user->token)).'&'.
          'email='.rawurlencode($user->email).
        '">clicking here</a>';
        mailTo(
          'no-reply',
          $user->email,
          'welcome',
          template(
            'welcome',
            array(
              'authentication-link' => $link
            )
          ),
          true
        ) or exit('bad-data');
      }
      exit('OK');
    }
  }
  // well, this is a good info for the JS
  // a pointless one for debugging purpose
  exit('bad-data');
} else {
  jsTroll();
}
?>