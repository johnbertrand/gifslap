<?

// declare global scenes variable
echo "<script>\n";
echo "var scenes = {};\n";
echo "</script>\n";

// this fn is called from output_sets.php
function output_scenes($dir, $set_name){
  
  echo "scenes.".$set_name." = [];\n";
  $iii = 0;
  foreach(glob($dir."/*.html") as $scene_file):

    // clean up the following line and cut off .html 

    echo "scenes.".$set_name."[$iii] = '". basename($scene_file) . "'\n";
    $iii++;
  endforeach;

}

?>