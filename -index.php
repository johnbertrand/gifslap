<html>
<head>
<title>.gifSlap</title>
<link rel="stylesheet" href="core/assets/style.css" />
</head>
<body>
<div id="corner-pic" class="hidden"></div>
<div id="text"></div>
<div id="container">
	<h1 id="title"></h1>
	<div id="midi-info"></div>
	<div id="map"></div>
	<div id="inner-bg"></div>
</div>
<div id="circle"></div>
<div id="readout">
	<div id="count-bgs"></div>
	<div id="count-inner-bgs"></div>
	<div id="count-images"></div>
</div>

<script type="text/javascript" src="core/assets/jquery-1.9.1.min.js"></script>

<script>
<? if( $_GET['midi']=="true" ){?>
	midi = true;
	</script>
	<object id="Jazz" type="audio/x-jazz" class="hidden"></object>
<? }else{ ?>
	var midi = false;
	</script>
<? } ?>

<script src="core/midi.js"></script>
<script src="core/images.js"></script>
<script src="core/hud.js"></script>


<!-- MODULES -->

<script src="modules/rainbow_bars.js"></script>
<script src="modules/gif_circle.js"></script>
<script src="modules/bg_mod.js"></script>
<script src="modules/inner_bg_mod.js"></script>
<script src="modules/big_shrinker.js"></script>
<script src="modules/chain.js"></script>
<script src="modules/mirror_gif.js"></script>
<script src="modules/center_pix.js"></script>
<script src="modules/hallway.js"></script>
<script src="modules/puncher.js"></script>
<script src="modules/corner_box.js"></script>

<script>
<?

include('core/get_sets.php');
include('core/print_sets.php');

//These correspond to folders
$custom_set_launch_array = array(
	/*A*/ "65" => "pacifica",
	/*B*/ "66" => "bakery_fresh",
	/*C*/ "67" => "CBMD_MUSIC",
	/*D*/ "68" => "does_the_mountain_dream_at_night",
	/*E*/ "69" => "eight_bit_sf",
	/*F*/ "70" => "flashbulb",
	/*G*/ "71" => "deff_coast",
	/*H*/ "72" => "gif_happy_hour",
	/*I*/ "73" => "the_time_it_takes_a_tree_to_blink",
	/*J*/ "74" => "",
	/*K*/ "75" => "knights_in_cairo",
	/*L*/ "76" => "redline",
	/*M*/ "77" => "midnight_glide",
	/*N*/ "78" => "new_quest_city",
	/*O*/ "79" => "momentous",
	/*P*/ "80" => "petra",
	/*Q*/ "81" => "",
	/*R*/ "82" => "rich_ddt",
	/*S*/ "83" => "slosh_drop",
	/*T*/ "84" => "tributary_lost",
	/*U*/ "85" => "",
	/*V*/ "86" => "",
	/*W*/ "87" => "welcome_ohm",
	/*X*/ "88" => "extent_of_the_jam",
	/*Y*/ "89" => "not_too_shabby",
	/*Z*/ "90" => "starpause"
	);
?>


// //MODIFIERS TO ALTER THE LOOP
// var mods = new Array();
// mods['default'] = true;
// mods['height'] = false;
// mods['width'] = false;
// mods['opacity'] = false;
// mods['speed'] = false;
// mods['trail'] = false;

//VARIABLES

images.set_array = all_gifs; //INITIAL SET.

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


//Shuffle Array
function shuffle_array(o) {
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

//Shuffle Set if random
if(images.randomize_order){ shuffle_array( images.set_array ); }

//DECLARE INITIAL BG SET. MOVE TO BG_MOD.JS
bg_mod.active_set = all_gifs_bgs;
if(bg_mod.active_set.length == 0){ bg_mod.active_set = images.set_array; }
shuffle_array(bg_mod.active_set);

//DECLARE INITIAL INNER_BG SET. MOVE TO INNER_BG_MOD.JS
inner_bg_mod.active_set = all_gifs_inner_bgs;
if(inner_bg_mod.active_set.length == 0){ inner_bg_mod.active_set = images.set_array; }
shuffle_array(inner_bg_mod.active_set);
shuffle_array(inner_bg_mod.active_set);


//START THE LOOP!!!
t=setInterval(function(){

	if (run==false){return;}

	//Modules that can run with simultaneously:

	if(rainbow_bars.run == true){
		rainbow_bars.draw();
	}
	

	// mutually exclusive modules (notice the return;)

	if(hallway.run){
		hallway.draw();
		return;
	}

	if(mirror_gif.run){
		mirror_gif.draw();
		return;
	}

	if(center_pix.run){
		center_pix.draw();
		return;
	}
	
	
	if(circle.run){
		circle.draw();
		return;
	}

	if(chain.run){
		chain.draw();
		return;
	}
	
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

// var corner_pic_num = 0;
// var corner_pic = function(){

// 	$corner_pic = $('<img src="'+punches[corner_pic_num]+'" />');
// 	$('#corner-pic').toggleClass('hidden').html($corner_pic);
// 	if( $('#corner-pic').hasClass('hidden') ){ return; }
// 	if(corner_pic_num >= punches.length-1){ 
// 		corner_pic_num=0; 
// 	}else{
// 		corner_pic_num++;
// 	}
// }


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
<script src="modules/module_changer.js"></script>
</body>
</html>
<!--

Big Features to Add:
- Second screen HUD
- AutoVJ mode
- Robust recording, playback
- DOM unpacker, for saving digital posters. deletes empty nodes and finally deletes all JS

Modules to Add
- Audio reaction
- waveform generator

Module Improvements:
- background size support in hallway

-->