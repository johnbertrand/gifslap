<html>
<head>
<title>.gifSlap</title>

<!-- ASSETS -->

<link rel="stylesheet" href="core/assets/style.css" />
<script type="text/javascript" src="core/assets/jquery-1.9.1.min.js"></script>

</head>
<body>

<div id="text"></div>

<!-- MODULES ADD ELEMENTS TO #CONTAINER: -->
<div id="container">
	<h1 id="title"></h1>
	<div id="midi-info"></div>
	<div id="map"></div>
	<div id="inner-bg"></div>
</div>

<div id="readout">
	<div id="count-bgs"></div>
	<div id="count-inner-bgs"></div>
	<div id="count-images"></div>
</div>



<script>
<? if( $_GET['midi']=="true" ){?>
	midi = true;
	</script>
	<object id="Jazz" type="audio/x-jazz" class="hidden"></object>
<? }else{ ?>
	var midi = false;
	</script>
<? } ?>

<!-- PRINT ALL THE SETS FROM THE FILESYSTEM -->
<? include('core/output_sets.php'); ?>

<!-- CORE -->
<script src="core/helpers.js"></script>
<script src="core/images.js"></script>
<script src="core/midi.js"></script>
<script src="core/hud.js"></script>
<script src="core/save_out.js"></script>
<script src="core/image_flagger.js"></script>
<script src="core/switch_sets.js"></script>

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

var
	run = true,
	recording = false, //Not currently recording
	
	//doubler = false, //IF THE DOUBLER IS ACTIVE

	// doubler_left = 300,
	// doubler_top = 0,
	// doubler_cursor = 0,
	// doubler_distance = 1,
	// doubler_size = 1,
	//double_positioning = false,
	move_loop = setInterval(),

	// joy_vert = 0,
	// joy_horiz = 0,

	beat_shrink = 0,
	beat_grow = 500,
	beat_height = true,
	beat_width = true,
	beat_rotator = 180,
	
	lockdown_class = ' ', //FOR LOCKDOWN TO WORK IN RECORDINGS? NEEDS TO BE FIXED
	
	//rotation_speed = 0,
	blackout = false;



//DECLAUE DOM VARIABLES
var
$body = $('body'),
$container = $('#container'),
$text = $('#text'),
$inner_bg = $('#inner-bg');




//DECLARE INITIAL BG SET. MOVE TO BG_MOD.JS
// bg_mod.active_set = all_gifs_bgs;
// if(bg_mod.active_set.length == 0){ bg_mod.active_set = images.set_array; }
// shuffle_array(bg_mod.active_set);

// //DECLARE INITIAL INNER_BG SET. MOVE TO INNER_BG_MOD.JS
// inner_bg_mod.active_set = all_gifs_inner_bgs;
// if(inner_bg_mod.active_set.length == 0){ inner_bg_mod.active_set = images.set_array; }
// shuffle_array(inner_bg_mod.active_set);
// shuffle_array(inner_bg_mod.active_set);


//START THE LOOP!!!
t=setInterval(function(){

	if (run==false){return;}

	// Addons
	rainbow_bars.draw();
	images.fly_off();
	bg_mod.vscroll();
	bg_mod.hscroll();
	
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
		case 'recording':
			if( frames.length == 0 ){ $('#export-recording').addClass('available'); }
			if(a.paused==false){a.pause();}else{a.play();}
			recording = (recording != true);
			bg_flag_url = current_bg;
			$('#record-button').toggleClass('on');
			break;
		case 'doubler':
			doubler = (doubler != true);
			doubler_cursor = chain.cursor;
			doubler_left = 300;
			doubler_top = 0;
			if(midi){if(doubler==true){Jazz.MidiOut(0x90,32,1);}else{Jazz.MidiOut(0x90,32,0)}}
			break;
		case 'double_positioning':
			double_positioning = !double_positioning;
			//toggle button light
			if(double_positioning){ Jazz.MidiOut(0x90,33,1); }else{ Jazz.MidiOut(0x90,33,0); }
			break;
		case 'blackout':
			blackout = !blackout;
			if(blackout){
				Jazz.MidiOut(0x90,48,1); 
				$('img').css('display','none');
			}else{ 
				Jazz.MidiOut(0x90,48,0);
				$('img').css('display','block');
			}
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
				chain.cursor = 0;
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