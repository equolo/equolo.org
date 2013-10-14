<?php

/**
 * (C) equolo.org - Mit Style License
 *
 *  - Index page
 */

require_once('cgi/common.php');

$content = array(
  'title' => 'equolo.org'
);

header('Content-Type: text/html; charset=UTF-8');
echo template('index', $content);

?>