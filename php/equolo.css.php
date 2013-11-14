<?php
ob_start('ob_gzhandler');
header('Content-Type: text/css; charset=UTF-8');
echo file_get_contents('../css/equolo.css');
?>