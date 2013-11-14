<?php
ob_start('ob_gzhandler');
header('Content-Type: application/javascript; charset=UTF-8');
echo file_get_contents('../js/equolo.max.js');
?>