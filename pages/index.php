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

echo template('index', $content);

?>