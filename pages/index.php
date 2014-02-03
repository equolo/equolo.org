<?php

/**
 * (C) equolo.org - Mit Style License
 *
 *  - Index page
 */

require_once('cgi/common.php');

// where does the user come from ?
$jsonCountry = searchSetAndGetCountry();

if (isset($_COOKIE['lang'])) {
  $lang = $_COOKIE['lang'];
} else {
  $obj = json_decode($jsonCountry);
  $lang = $obj ? $obj->lang : 'en';
}
// no need to move PCRE here, a simple check would do
// (.., ./, //) will all fail with '.php' after
if (strlen($lang) != 2) {
  $lang = 'en';
}
// save the language for the next visit
cookieSetter('lang', $lang);

// show content in the proper language
$dictionary = getLanguage($lang);
// providing some JS variable
$dictionary['MAX_JS'] = DEVELOPMENT ? '.max' : '';
$dictionary['navigator.country'] = 'navigator.country='.$jsonCountry.';';

// populate the select with all categories
$categories = '<select name="category"><option value="all"> - </option>';
$stmt = query('category-lang', array($lang));
while($row = $stmt->fetch(PDO::FETCH_OBJ)) {
  $categories .= '<option value="'.$row->icon.'">'.$row->description.'</option>';
}
$categories .= '</select>';
$dictionary['select-categories'] = $categories;

// show intro once per session
$dictionary['show-intro'] = isset($_COOKIE['intro']) ? 'ignore' : 't-all show';
cookieSetter('intro', 'ok');

header('Content-Type: text/html; charset=utf-8');
echo template(
  // the template name
  'index',
  // all keys to replace
  $dictionary
);

?>