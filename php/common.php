<?php

/**
 * (C) equolo.org - Mit Style License
 * Common utilities for the project
 */

// the database is commonly needed for sure :-)
require_once('db.php');

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

// utility: set right headers for dynamic JS files
function jsHeader($type, $compressed = false, $CORS = false) {
  if ($compressed) {
    ob_start('ob_gzhandler');
  }
  if ($CORS) {
    header('Access-Control-Allow-Origin: *');
  }
  header('Content-Type: application/'.$type.'; charset=UTF-8');
}

// utility: send a basic HTML email
function mailTo($from, $to, $subject, $message) {
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

// utility: make HTML strings safe
function safer($text) {
  return htmlentities($text, ENT_QUOTES, 'UTF-8');
}

?>