<?php

/**
 * (C) equolo.org - Mit Style License
 *
 *  - Index page
 */

require_once('cgi/common.php');

// database object needed everywhere in here
$db = db();

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

// save the cookie for the next time
cookieSetter('lang', $lang, 60 * 60 * 24 * 365);

// require the spoken language
require_once(
  // if the file exists
  file_exists('cgi/lang/'.$lang.'.php') ?
    'cgi/lang/'.$lang.'.php' :
    // otherwise the first language, which is English
    // ... and I know this is available :-)
    'cgi/lang/'.$languages[0]->value.'.php'
);

// step-1: select the language
$languageOptions = array();
foreach($languages as $row) {
  $selected = $row->value == $lang ? 'selected="selected"' : '';
  $languageOptions[] = '<option '.$selected.' value="'.$row->value.'">'.safer($row->description).'</option>';
}

echo template(
  // the template name
  'submit',
  // the whole list of created strings or variables
  array(
    'MAX_JS' => DEVELOPMENT ? '.max' : '',
    'title' => 'equolo.org - add your equobusiness here',
    'next' => $dictionary['next'],
    'dom-language-options' => implode('', $languageOptions)
  )
);

?>