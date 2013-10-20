<?php

/**
 * (C) equolo.org - Mit Style License
 *
 *  - Index page
 */

require_once('cgi/common.php');

// the needed/reused database object
$db = db();



//// <<< AUTHENTICATION >>>

// defaultcondition
$active = null;

// check if user is authroized/authenticated
if (
  // try to ensure not using F5 or trying again in short time
  !isset($_COOKIE['verified']) &&
  // coming from an equolo.org link ?
  isset(
    $_GET['email'],
    $_GET['token']
  ) &&
  isValidEmail($_GET['email']) &&
  preg_match(
    // expected SHA1
    '/^[a-f0-9]{40}$/',
    $_GET['token']
  )
) {
  // flag this procedure to avoid
  // too easy multiple checks (sort of brute forces)
  cookieSetter('verified', 'true', 3600);
  // verify the result in database
  $stmt = query('verify-user', array($_GET['email'], $_GET['token']));
  $id = 0;
  while($row = $stmt->fetch(PDO::FETCH_OBJ)) {
    $id = $row->id;
    $active = $row->active == 1;
  }
  if ($active !== null) {
    if ($active === false) {
      // activate all activities related to this email
      query('user-activation', array($id));
      $active = true;
    }
    cookieSetter('email', $_GET['email']);
    cookieSetter('token', $_GET['token']);
  }
} else {
  $active = isAuthenticated();
}

//// <<< /AUTHENTICATION >>>



//// <<< LANGUAGE >>>

// did the user chose a language ?
$lang = isset($_GET['lang']) ?
  $_GET['lang'] : (
  // did the user have a language ?
  isset($_COOKIE['lang']) ?
    $_COOKIE['lang'] :
    // define later on
    ''
);

if (empty($lang)) {
  // try to figure out the country
  $country = getIPv4Country($_SERVER['REMOTE_ADDR']);
  if (!empty($country)) {
    // set the country spoken language
    // assuming we flagged all of them in order
    // to match available languages
    $lang = $country->lang_id;
  }
}

// try to figure out if there is such language
// in the system (used later too)
$notFound = true;
$languages = array();
$stmt = query('language');
while($row = $stmt->fetch(PDO::FETCH_OBJ)) {
  $languages[] = $row;
  if ($notFound) {
    // in case the lang comes from the country
    if ($lang == $row->id) {
      $lang = $row->value;
    }
    if ($lang == $row->value) {
      $notFound = false;
    }
  }
}

// in case we didn't find one
if ($notFound) {
  $lang = $languages[0]->value;
}

// require the spoken language
$dictionary = getLanguage(
  file_exists('cgi/lang/'.$lang.'.php') ?
    // everything ok if the file exists
    $lang :
    // otherwise the first language, which is English
    // ... and I know this is available :-)
    ($lang = $languages[0]->value)
);

// save the cookie for the next time
cookieSetter('lang', $lang);

// step-1: select the language
$languageOptions = array();
foreach($languages as $row) {
  $selected = $row->value == $lang ? 'selected="selected"' : '';
  $languageOptions[] = '<option '.$selected.' value="'.$row->value.'">'.safer($row->description).'</option>';
}
$dictionary['dom-language-options'] = implode('', $languageOptions);
//// <<< /LANGUAGE >>>



//// <<< CRITERIA >>>
$criteria = array();
$stmt = query('criteria', array($lang));
while($row = $stmt->fetch(PDO::FETCH_OBJ)) {
  $criteria[] =
    '<li class="no-select">'.
      '<input type="checkbox" value="'.$row->id.'"/>'.safer($row->value).
    '</li>'
  ;
}
$dictionary['criteria'] = implode('', $criteria);
//// <<< /CRITERIA >>>



$dictionary['user.email'] = $active ? (
  isset($_GET['email']) ? $_GET['email'] : $_COOKIE['email']
) : '';
$dictionary['MAX_JS'] = DEVELOPMENT ? '.max' : '';
$dictionary['title'] = 'equolo.org - add your equobusiness here :-)';

header('Content-Type: text/html; charset=UTF-8');
echo template(
  // the template name
  'submit',
  // all keys to replace
  $dictionary
);

?>