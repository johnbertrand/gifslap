<?
// GET AND PRINT ALL THE SETS

$all_sets = array();

//get all the gifs from all the folders.
foreach(glob("sets/*") as $set):

	//if it starts with - skip it
	if( strpos($set,"/-") ){ continue; }	

	// cut off "sets/"	
	$set = substr($set, 5);
	

	// Rewrite this section so it first adds all images in the file to the set array
	// Then it scans for subfolders, and uses the folder name as the name of the subobject where the images within that folder are added
	// all of the images in all of the sets should have this structure
	// sets.citiesnskies.0 (for the first gif in the citiesnskies folder)
	// sets.citiesnskies.bgs.0 (for the first gif in the subfodler bgs in the citiesnskies folder)
	// the nesting should not go deeper than one subfolder
	




	$this_set = array();
	$this_set['title'] = $set;
	$this_set['images'] = array();
	$this_set['inner_bgs'] = array();
	$this_set['bgs'] = array();
	$this_set['punches'] = array();
	
	foreach(glob("sets/".$set."/*.{gif,GIF}", GLOB_BRACE) as $image):
		//if it starts with - skip it
		if( strpos($image,"/-") ){ continue; }
		//BG Array
		if( strpos($image,"/bg") ){ 
			array_push( $this_set['bgs'], $image);
		//INNER BG Array
		}elseif( strpos($image,"/inner_bg") ){
			array_push( $this_set['inner_bgs'], $image );
		//PUNCH Array
		}elseif( strpos($image,"/punch") ){
			array_push( $this_set['punches'], $image );
		//NORMAL Images
		}else{ 
			array_push( $this_set['images'], $image );
		}
	endforeach;

	foreach(glob("sets/".$set."/bgs/*.{gif,GIF}", GLOB_BRACE) as $image):
		array_push( $this_set['bgs'], $image);
	endforeach;

	foreach(glob("sets/".$set."/fgs/*.{gif,GIF}", GLOB_BRACE) as $image):
		array_push( $this_set['images'], $image);
	endforeach;

	foreach(glob("sets/".$set."/punches/*.{gif,GIF}", GLOB_BRACE) as $image):
		array_push( $this_set['punches'], $image);
	endforeach;

	array_push($all_sets,$this_set);
endforeach;


?>