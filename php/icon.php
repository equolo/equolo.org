<?php

if (isset($_GET['char'])) {
  
  
  
  
  exit;
  try {
    $char = json_decode('"\u'.$_GET['char'].'"');
    if (3 < strlen($char)) throw new Exception;
    header('Content-Type: image/png');
    $size = 16;
    $margin = 4;
    if (isset($_GET['retina'])) {
      $size *= 2;
      $margin *= 2;
    }
    $fullMargin = $margin * 4;
    $center = floor(($size + $fullMargin) / 2.1);
    $im = imagecreatetruecolor(
      $size + $fullMargin,
      $size + $fullMargin
    );
    //imagesavealpha($im, true);
    //imagefill($im, 0, 0, imagecolorallocatealpha($im, 0, 0, 0, 127));
    
    //*
    imagettftext(
      $im,
      $size,
      0,
      $margin,
      $size + $margin,
      imagecolorallocate($im, 150, 150, 150),
      '../font/fontawesome-webfont.ttf',
      $char
    );
    //*/
    imagepng($im);
    imagedestroy($im);
  } catch(Exception $e) {
    // nothing to do here
  }
}

?>