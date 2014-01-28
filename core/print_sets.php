<?php
//print all retrieved sets as JS arrays
foreach( $all_sets as $set ):
	//Initialize the JS arrays
	echo "var ".$set['title']." = new Array();\n";
	echo "var ".$set['title']."_bgs = new Array();\n";
	echo "var ".$set['title']."_inner_bgs = new Array();\n";
	echo "var ".$set['title']."_punches = new Array();\n";
	
	//Output the JS array of images
	$i=0;
	foreach($set['images'] as $image):
		echo $set['title']."[$i] = '".$image."'";
		echo "\n";
		$i++;
	endforeach;
	
	//HACK: repeat output images as backgrounds, and inners randomized.
	// this is here because the javascript shuffle function doesnt work

	$i=0;
	shuffle($set['images']);
	foreach($set['images'] as $image):
		echo $set['title']."_bgs[$i] = '".$image."'";
		echo "\n";
		$i++;
	endforeach;

	$i=0;
	shuffle($set['images']);
	foreach($set['images'] as $image):
		echo $set['title']."_inner_bgs[$i] = '".$image."'";
		echo "\n";
		$i++;
	endforeach;

	// //Output JS array of backgrounds
	// if( !empty($set['bgs']) ){
	// 	$i=0;
	// 	foreach($set['bgs'] as $bg):
	// 		echo $set['title']."_bgs[$i] = '".$bg."'";
	// 		echo "\n";
	// 		$i++;
	// 	endforeach;
	// }
	
	//Output JS array of inner bgs
	// if( !empty($set['inner_bgs']) ){
	// 	$i=0;
	// 	foreach($set['inner_bgs'] as $bg):
	// 		echo $set['title']."_inner_bgs[$i] = '".$bg."'";
	// 		echo "\n";
	// 		$i++;
	// 	endforeach;
	// }

	//Output JS array of punches
	if( !empty($set['punches']) ){
		$i=0;
		foreach($set['punches'] as $punch):
			echo $set['title']."_punches[$i] = '".$punch."'";
			echo "\n";
			$i++;
		endforeach;
	}

endforeach;
?>