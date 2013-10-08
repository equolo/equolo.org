<?php

$content = '';

echo preg_replace_callback(
  '/\{\{([^\}]+?)\}\}/',
  function ($matches) use (&$content) {
    return $matches[1].$content;
  },
  file_get_contents('tpl/index.html')
);

?>