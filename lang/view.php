<?php
header('Content-Type: text/html; charset=UTF-8');
if (isset($_GET['lang'])) {
  $lang = json_decode(file_get_contents($_GET['lang'].'.json'));
  foreach($lang as &$value) {
    $value = htmlspecialchars($value);
  }
  echo  '<pre>',
        "&lt;?php\n".str_replace('stdClass::__set_state', '$dictionary=', var_export($lang, true)).";\n?&gt;",
        '</pre>'
  ;
}
?>