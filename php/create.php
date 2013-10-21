<?php

/**
 * (C) equolo.org - Mit Style License
 *
 *  - file to create or modify user data
 *
 */

// used to unpack places later on
// https://github.com/WebReflection/JSONH
require_once('jsonh.php');
require_once('common.php');

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
  if (isset($user) && preg_match('/^[^@]+?@[^\1@]+\.([a-z]{2,})$/', $user->email)) {
    $commonParam = array($user->email);
    $user->id = isAuthenticated(true);
    $proceed = $validUser = $user->id !== false && $user->email === $_COOKIE['email'];
    if (!$proceed && !isset($_COOKIE['email'])) {
      // probably a new user to welcome ?
      $active = null;
      $stmt = query('auth-login-active', $commonParam);
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
        $stmt = query('user-activities', array($user->email));
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
        query('user-create', $commonParam);
        // first time in the database
        query('auth-login-create', array(
          // the new user id will be set as non active
          // until the email has been verified
          $user->id = db()->lastInsertId()
        ));
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
          $id = substr($activity->id, 7);
          if (isset($activities[$id])) {
            // WARNING: this query might deeply hurt
            //          it removes everything at once, watch out
            //          if playing while debugging
            $commonParam = array($id);
            query('activity-delete', $commonParam);
            query('activity-certification-delete', $commonParam);
            query('activity-criteria-delete', $commonParam);
          } else {
            exit('bad-data');
          }
        } else {
          // new activities need to be created
          if (substr($activity->id, 0, 4) === 'new:') {
            // create the new activity
            query('activity-create', array($user->id));
            $commonParam = array(
              $activity->id = db()->lastInsertId()
            );
            query('activity-name-create-empty', $commonParam);
            $activities[$activity->id] = true;
          } else {
            $commonParam = array($activity->id);
          }
          // only if owned
          if (isset($activities[$activity->id])) {
            // drop and put all certifications
            query('activity-certification-delete', $commonParam);
            foreach($activity->certification as $certificationID) {
              query('activity-certification-create', array(
                $activity->id, $certificationID
              ));
            }
            // drop and put all criteria
            query('activity-criteria-delete', $commonParam);
            foreach($activity->criteria as $criteriaID) {
              query('activity-criteria-create', array(
                $activity->id, $criteriaID
              ));
            }
            // update the name
            query('activity-name-update', array(
              trim($activity->name), $activity->id
            ));
            // drop all descriptions
            query('activity-description-delete', $commonParam);
            foreach($activity->description as $lang => $description) {
              // and insert again them
              query('activity-description-create', array(
                $activity->id, $language[$lang], trim($description)
              ));
            }
            // per each place ... basically do the same
            foreach(JSONH::unpack($activity->place) as $place) {
              // only if owned
              if(substr($place->id, 0, 7) === 'remove:') {
                $id = substr($place->id, 7);
                if (isset($places[$id])) {
                  // WARNING: this query might hurt too
                  query('activity-geo-delete', array($id));
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
                    $category[$place->icon],
                    $place->latitude,
                    $place->longitude,
                    $place->id
                  ));
                  query('activity-place-update', array(
                    trim($place->road),
                    trim($place->extra),
                    trim($place->postcode),
                    trim($place->city),
                    trim($place->county),
                    trim($place->state),
                    trim($place->country),
                    trim($place->email),
                    trim($place->phone),
                    trim($place->website),
                    // grab possible handler only
                    trim(preg_replace(
                      '#^.*?(?:@|twitter\.[a-z]{2,}/)#',
                      '',
                      $place->twitter
                    )),
                    // remove initial part of the link
                    trim(preg_replace(
                      '#^.*?facebook\.[a-z]{2,}/#',
                      '',
                      $place->facebook
                    )),
                    $place->id
                  ));
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
        $link = '<a href="http://equolo.org/activate.php?'.
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
            ),
            '../tpl/'
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