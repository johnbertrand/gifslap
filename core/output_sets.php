<script>
var sets = {};
<?

// READ AND PRINT ALL THE SETS AND SUBSETS.

// This file reads gifs from the "sets/" folder.
// It also checks for folders within the sets and outputs them as subsets. 
// It only checks one layer deep for subsets.

//get all the gifs from all the folders.
foreach(glob("sets/*") as $set):

	//if it starts with - skip it
	if( strpos($set,"/-") ){ continue; }	

	//cut off "sets/"	
	$set = substr($set, 5);

	// decalre JS variable for this set
	echo "sets.$set = {};";
	echo "\n";

	// declare js variable for the main image collection in this set
	// extra image collections are also declared later if they are present as folders in this set
	echo "sets.$set.main = [];";
	echo "\n";

	$i = 0;
	foreach(glob("sets/$set/*") as $image_or_dir):

		if( is_dir($image_or_dir) ){
			// WE IN A DIR

			//cut off prefixes
			$dir = basename($image_or_dir);

			echo "sets.$set.$dir = []";
			echo "\n";

			//Output the gifs from this subset
			$ii = 0;
			foreach(glob("sets/$set/$dir/*.{gif,GIF}", GLOB_BRACE) as $image):
				
				echo "sets.$set.$dir"."[$ii] = '$image';";
				echo "\n";

				$ii++;

			endforeach;			

		}elseif( strpos($image_or_dir,".gif") || strpos($image_or_dir,".GIF") ){

			// this gif is part of the main collection for this set
			$image = $image_or_dir;

			echo "sets.$set.main"."[$i] = '$image';";
			echo "\n";

			$i++;
		}

	endforeach;

endforeach;

?>
</script>