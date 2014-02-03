<?php

/**
 * (C) equolo.org - Mit Style License
 *
 *  - Just categories
 */



if (isset($_COOKIE['lang'])) {
  require_once('cgi/common.php');
  $categories = '<ul>';
  $stmt = query('category-list', array($_COOKIE['lang']));
  while($row = $stmt->fetch(PDO::FETCH_OBJ)) {
    $list = explode(';;;', $row->list);
    $categories .= '<li><i class="icon-'.$row->icon.'"></i> '.$row->name.'<ul><li>'.implode('</li><li>', $list).'</li></ul></li>';
  }
  if ($categories !== '<ul>') {
    $dictionary = getLanguage($_COOKIE['lang']);
    $categories .= '<li class="others"><i class="icon-location"></i> '.$dictionary['category-other'].'</li>';
  }
  $categories .= '</ul>';

  header('Content-Type: text/html; charset=utf-8');
  echo template(
    // the template name
    'categories',
    // all keys to replace
    array('categories' => $categories)
  );
}

?>