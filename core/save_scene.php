<?

// Get the name of the creation
$name = $_POST['name'];
if( !$name ){ return; }

// Get the name of the set
$set_name = $_POST['set_name'];
if( !$set_name ){ return; }

// Destination folder is the "scenes" folder within the set
$dest = '../sets/'.$set_name.'/scenes';

// Make the scenes folder if it's not already there
if( !is_dir($dest) ){
  mkdir($dest);
}

// Get the scene variables
$scene_vars = $_POST['scene_variables'];

// Write the scene variables
$scene_vars_file = $dest . "/" . $name .".js";
$scene_vars_handle = fopen($scene_vars_file, 'w') or die("can't open file");
fwrite($scene_vars_handle, $scene_vars);
fclose($scene_vars_handle);

// Get scene html structure
$scene_html =  $_POST['visuals_container'];

// Write scene HTML to file
$scene_html_file = $dest . "/" . $name .".html";
$scene_html_handle = fopen($scene_html_file, 'w') or die("can't open file");
fwrite($scene_html_handle, $scene_html);
fclose($scene_html_handle);

?>