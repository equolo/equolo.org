<?php
if (isset($_POST['save'])) {
  $fp = fopen($_POST['lang'].'.json', 'w+');
  fwrite($fp, stripslashes($_POST['save']));
  fclose($fp);
  exit;
}
?>
<?php header('Content-Type: text/html; charset=UTF-8'); ?>
<!doctype html>
<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
<style>
* {
  font-family: sans-serif;
  font-size: 13px;
}
tr:nth-child(2n-1),
tr:nth-child(2n-1) textarea {
  background: #F5F5F5;
}
</style>
<table>
<?php
require_once('en.php');
$lang = isset($_GET['lang']) ? $_GET['lang'] : 'en';
echo '<select onchange="changeLocation(this)">';
foreach(array('en', 'de', 'fr', 'es', 'it') as $value) {
  echo '<option'.($value === $lang ? ' selected="selected"' : '').'>'.$value.'</option>';
}
echo '</select>';
if(!file_exists($lang.'.json')) {
  $fp = fopen($lang.'.json', 'w+');
  fwrite($fp, $lang === 'en' ? json_encode($dictionary) : '{}');
  fclose($fp);
}
$currentRaw = file_get_contents($lang.'.json');
$current = json_decode($currentRaw);
foreach($dictionary as $key => $value) {
  if ($key !== 'jslang') {
    echo '<tr valign="top"><td width="30%">'.$key.'</td><td width="70%"><textarea name="'.$key.'" style="width:100%;" rows="6">'.(
      isset($current->$key) ? $current->$key : ''
    ).'</textarea></td></tr>';
  }
}
?>
</table>
<script>
<?php echo 'var lang={'.$lang.':'.$currentRaw.'};'?>
var timer = 0;
function sendAndSave() {
  var
    xhr = new XMLHttpRequest,
    what = Object.keys(lang)[0]
  ;
  xhr.open('POST', location.href.split('?')[0], false);
  xhr.setRequestHeader("If-Modified-Since", "Mon, 26 Jul 1997 05:00:00 GMT");
  xhr.setRequestHeader("Cache-Control", "no-cache");
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send('lang=' + what + '&save=' + encodeURIComponent(JSON.stringify(lang[what])));
}
function saveIt() {
  [].forEach.call(document.querySelectorAll('textarea'), function(t){
    this[t.name] = t.value;
  }, lang[Object.keys(lang)[0]]);
  sendAndSave();
}
function beforeSaving() {
  clearTimeout(timer);
  timer = setTimeout(saveIt, 2000);
}
function changeLocation(select) {
  var href = location.href.split('?')[0];
  sendAndSave();
  location.href = href + '?lang=' + select.value;
}
[].forEach.call(document.querySelectorAll('textarea'), function(t){
  t.addEventListener('keyup', beforeSaving);
});
</script>