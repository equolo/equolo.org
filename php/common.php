<?php

/**
 * (C) equolo.org - Mit Style License
 *
 *  - Common utilities for the project
 */

// This file will be included by default almost everywhere
// It contains common functions used here and there
// promoting code reusability and more flexible signatures

// in order to behave differently
// define the environment in here
define(
  'DEVELOPMENT',
  in_array($_SERVER['REMOTE_ADDR'], array(
    '127.0.0.1',  // common IPv4 localhost
    'fe80::1',    // common OSX IPv6 localhost
    '::1'         // common OSX IPv6 localhost
  ))
);

// if we are in localhost makes sense to actually see errors
if (DEVELOPMENT) {
  error_reporting(-1);
}

// the database is needed most of the time
require_once('db.php');

// and no query can be performed without the following file
require_once('sql.php');

// remove magic_quotes if defaulted for some reason
if (get_magic_quotes_gpc()) {
    function stripslashes_gpc(&$value) {
        $value = stripslashes($value);
    }
    array_walk_recursive($_GET, 'stripslashes_gpc');
    array_walk_recursive($_POST, 'stripslashes_gpc');
    array_walk_recursive($_COOKIE, 'stripslashes_gpc');
    array_walk_recursive($_REQUEST, 'stripslashes_gpc');
}

// utility: set right headers for dynamic JS or JSON files
function jsHeader(
  $type,                // javascript || json
  $compressed = false,  // uses gz_handler if true
  $CORS = false         // enable CORS if necessary
) {
  if ($compressed) ob_start('ob_gzhandler');
  if ($CORS) header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/'.$type.'; charset=UTF-8');
}

// utility: send a basic HTML email
function mailTo(
  $from,    // the sender or 'no-reply'
  $to,      // the destination email
  $subject, // the email subject
  $message  // the basic HTML content
) {
  // common prefix for all email subjects
  // users can create a rule in this case
  // and decide how to be notified
  static $logo = ')°(, equolo - ';

  // if no-reply, the user should not be able to reply indeed
  $name = $from === 'no-reply' ? $from : 'equolo - '.$from;
  return mail(
    $to,
    $logo.$subject,
    '<!DOCTYPE html>'.$message,
    "From: {$name} <{$from}@equolo.org>\r\n".
    "Reply-To: {$name} <{$from}@equolo.org>\r\n".
    "MIME-Version: 1.0\r\nContent-Type: text/html; charset=utf-8\r\n".
    "X-Mailer: PHP/".phpversion()."\r\n"
    // if you are wondering ... NO, this is not needed
    // still a common procedure to flag the env
    // that generated and sent the email
  );
}

// utility: helps to set a cookie with common arguments
function cookieSetter($key, $value, $expires = 3600) {
  setcookie(
    $key,
    $value,
    time() + $expires,
    '/',
    DEVELOPMENT ?
      '' : 'equolo.org',
    false,
    true  // no need to expose server-side cookies to JavaScript
  );
}

// utility: returns the country associated with an IPv4 address
function getIPv4Country($REMOTE_ADDR) {
  $country = null;
  $ip = explode('.', $REMOTE_ADDR);
  // and only if it contains an IPv4 address
  if (count($ip) === 4) {
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
    // only if there is a row
    while($row = $stmt->fetch(PDO::FETCH_OBJ)) {
      $object = new StdClass;
      $object->id = intval($row->id);
      $object->lang = $row->lang_id;
      $object->name = $row->name;
      $object->iso2 = $row->iso2;
      $object->geo = new StdClass;
      $object->geo->latitude = floatval($row->latitude);
      $object->geo->longitude = floatval($row->longitude);
      $country = $object;
    }
  }
  return $country;
}

// utility: prepare a PDOStatement through a command
function prepare($command) {
  return db()->prepare(sql($command));
}

// utility: returns a prepared and executed PDOStatement
// @example
//  foreach(query('user-country')->fetch(PDO::FETCH_OBJ) as $row) {...}
function query($command, $arguments = array()) {
  $stmt = prepare($command);
  $stmt->execute($arguments);
  return $stmt;
}

// utility: make HTML strings safe
function safer($text) {
  return htmlentities($text, ENT_QUOTES, 'UTF-8');
}

// utility: parse and translate a template
function template($file, $content) {
  return preg_replace_callback(
    '/\{\{([^\}]+?)\}\}/',
    function ($matches) use (&$content) {
      $key = $matches[1];
      return isset($content[$key]) ? $content[$key] : $matches[0];
    },
    file_get_contents('tpl/'.$file.'.html')
  );
}

?>