<html>
<head>
<title>.gifSlap</title>

<!-- ASSETS -->

<link rel="stylesheet" href="core/assets/style.css" />
<script type="text/javascript" src="core/assets/jquery-1.9.1.min.js"></script>

</head>
<body>

<!-- Scene scripts are loaded into this div -->
<div id="scene-directives"></div>

<!-- This is for debugging -->
<div id="text"></div>

<!-- MODULES ADD ELEMENTS TO #CONTAINER: -->
<div id="container"></div>

<!-- PRINT ALL THE SETS & SCENES FROM THE FILESYSTEM -->
<? include('core/output_scenes.php'); ?>
<? include('core/output_sets.php'); ?>

<script>
<? if( $_GET['midi']=="true" ){?>
	midi = true;
	</script>
	
	<!-- first check for the additional controller -->
	<? if( $_GET['midi2']=="true" ){ ?>
		
		<!-- initialize controller 2 -->		
		<object id="Jazz2" type="audio/x-jazz" class="hidden"></object>			
		<script>var midi2 = true;</script>
		<script src="core/midi_livid_block_3.js"></script>
		<!-- special script to map MJP scenes to the Livid Block controller -->
		<!-- <script src="core/scenes_to_block.js"></script> -->

	<? }else{ ?>
		<script> var midi2 = false; </script>
	<? } ?>

	<!-- initialize controller 1 -->
	<object id="Jazz" type="audio/x-jazz" class="hidden"></object>
	<script src="core/midi_livid_control_r.js"></script>

<? }else{ ?>
	var midi = false;
	var m_out = function(){return;}
	</script>
<? } ?>

<!-- CORE -->
<script src="core/helpers.js"></script>
<script src="core/images.js"></script>
<script src="core/scenes_helper.js"></script>
<script src="core/switch_sets.js"></script>
<script src="core/hud.js"></script>
<script src="core/save_out.js"></script>
<script src="core/image_flagger.js"></script>

<!-- MODULES --> 
<script src="modules/gif_circle.js"></script>
<script src="modules/chain.js"></script>
<script src="modules/mirror_gif.js"></script>
<script src="modules/center_pix.js"></script>
<script src="modules/hallway.js"></script>
<!-- <script src="modules/kscope.js"></script> -->

<!-- ADDONS -->
<script src="addons/rainbow_bars.js"></script>
<script src="addons/inner_bg_mod.js"></script>
<script src="addons/bg_mod.js"></script>
<script src="addons/big_shrinker.js"></script>
<script src="addons/puncher.js"></script>
<script src="addons/corner_box.js"></script>


<script>


//VARIABLES
var run = true;

//START THE LOOP!!!
t=setInterval(function(){

	if (run==false){return;}

	// Addons
	rainbow_bars.draw();
	images.fly_off();
	bg_mod.vscroll();
	bg_mod.hscroll();
	inner_bg_mod.vscroll();
	inner_bg_mod.hscroll();
	
	// Modules
	hallway.draw();
	mirror_gif.draw();
	center_pix.draw();
	circle.draw();	
	chain.draw();
	// kscope.draw();
	
},35);


//TOGGLE CONTROL STATES
toggle_value=function(control){
	
	switch(control){
		case 'circle_size_lock':
			circle.size_lock = (circle.size_lock != true);
			if(midi){if( circle.size_lock==true ){Jazz.MidiOut(0x90,41,1);}else{Jazz.MidiOut(0x90,41,0)}}
			break;
		case 'doubler':
			doubler = (doubler != true);
			doubler_cursor = images.cursor;
			doubler_left = 300;
			doubler_top = 0;
			if(midi){if(doubler==true){Jazz.MidiOut(0x90,32,1);}else{Jazz.MidiOut(0x90,32,0)}}
			break;
		case 'rainbow_bars_run':
			rainbow_bars.run = (rainbow_bars.run != true);
			if(midi){
				if(rainbow_bars.run==true){ Jazz.MidiOut(0x90,40,1);
				}else{
					Jazz.MidiOut(0x90,40,0);
					rainbow_bars.current_size = 0;
					$('p').remove();
				}}
			break;
	}
};

var shrink_images = function(){
	$('img').animate({"height":"0px","width":"0px"},2000);
}

//ENTER DIFFERENT SETS
var enter_set = function(which_key){

	bg_mod.clear();
	inner_bg_mod.clear();

	randomize = false;
	<? if(!empty($custom_set_launch_array)){?>
		<? foreach( $custom_set_launch_array as $key => $set_array){
			if(!$set_array){continue;}?>
			if (which_key == '<? echo $key; ?>'){
				images.cursor = 0;
				set_array=<? echo $set_array; ?>;
				
				shuffle_array(set_array);
				
				bg_mod.active_set = <? echo $set_array; ?>_bgs;
				bg_mod.cursor = 0;
				
				shuffle_array(bg_mod.active_set);

				inner_bg_mod.active_set = <? echo $set_array; ?>_inner_bgs;
				inner_bg_mod.cursor = 0;
				punches = <? echo $set_array; ?>_punches;
			} else 
		<? }; ?>
		{ 
			//alert("no set with this key"); 
		return; }
	<? }elseif($logged_in || $local){?>
		alert("No switchable sets defined.	");
	<? }else{ ?>
		alert("Switching sets is a member function only.");
	<? } ?>
}


</script>

<script src="core/controls.js"></script>
<script src="core/module_changer.js"></script>
</body>
</html>