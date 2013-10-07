<?php
function sql($command) {
  static $query = array(
    'select'    =>
      'SELECT * FROM whatever'
  );
  return isset($query[$command]) ?
    $query[$command] :
    exit('unknown query command: '.$command)
  ;
}
?>