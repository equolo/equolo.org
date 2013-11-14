<?php
ob_start('ob_gzhandler');
header('Content-Type: image/svg+xml; charset=UTF-8');
echo file_get_contents('../fonts/fontawesome-webfont.svg');
?>