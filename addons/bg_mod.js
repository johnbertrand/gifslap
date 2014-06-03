


// add the BG Box to the DOM
$bg_box = $("<div id='bg-box'></div>").css({
	'position': 'absolute',
	'height': '100%',
	'width': '100%',
	'z-index': '-1',
	'left': '0px',
	'top': '0px',
	'background-position-y':'0px',
	'background-position-x':'0px'
});

$('#container').append($bg_box);


// Module properties and functions
var bg_mod = {

	active_set: null,
	cursor: 0,

	box: $('#bg-box'),

	//CLEAR THE BG
	clear: function(){
		bg_mod.box.css('opacity','0')
	},

	//SHOW THE BG
	show: function(){
		bg_mod.box.css('background-image','url('+bg_mod.active_set[bg_mod.cursor]+')');
		bg_mod.box.css('opacity','1')
	},

	// RESET (when switching sets)
	reset: function(){
		bg_mod.clear();
		bg_mod.cursor = 0;
		bg_mod.vscrolling_speed = 0;
		bg_mod.hscrolling_speed = 0;
		bg_mod.box.css("background-position-x","0px");
		bg_mod.box.css("background-position-y","0px");

		// Sync with active set
		if( images.active_set.bgs ){
			bg_mod.active_set = images.active_set.bgs;
		}else{
			bg_mod.active_set = images.active_set.main.slice(0);
			console.log('--> No bgs set folder')
		}

		//Shuffle BG Set if random
		if( images.randomize_order ){
		  shuffle_array(bg_mod.active_set);
		}

	},

	//GO TO THE NEXT IMAGE
	next: function(){
		//restart if cursor is at the end
		if (bg_mod.cursor > bg_mod.active_set.length){ bg_mod.cursor = 0; }
		//set the new bg
		bg_mod.box.css('background-image','url('+bg_mod.active_set[bg_mod.cursor]+')');
		bg_mod.cursor++;

		if( bg_mod.box.css('opacity') == 0 ){
			bg_mod.box.css('opacity',1);
		}
	},

	//GO TO THE PREVIOUS IMAGE
	prev: function(){
		//restart if cursor is at 0
		if (bg_mod.cursor < 0){ bg_mod.cursor = bg_mod.active_set.length; }
		//set the new bg
		bg_mod.cursor--;
		bg_mod.box.css('background-image','url('+bg_mod.active_set[bg_mod.cursor]+')');
	},
	set: function(url){
		bg_mod.box.css('background-image','url('+url+')');	
	},

	vscrolling_speed: 0,
	vscroll_invert: false,
	vscroll: function(){		
		if(bg_mod.vscrolling_speed > 0){ 
			vpos = bg_mod.box.css("background-position-y");
			vpos = parseInt(vpos);
			if( bg_mod.vscroll_invert ){
				bg_mod.box.css("background-position-y",vpos-bg_mod.vscrolling_speed+"px");
			}else{
				bg_mod.box.css("background-position-y",vpos+bg_mod.vscrolling_speed+"px");
			}
		}
	},

	hscrolling_speed: 0,
	hscroll_invert: false,
	hscroll: function(){		
		if(bg_mod.hscrolling_speed > 0){ 
			hpos = bg_mod.box.css("background-position-x");
			hpos = parseInt(hpos);
			if( bg_mod.hscroll_invert ){
				bg_mod.box.css("background-position-x",hpos-bg_mod.hscrolling_speed+"px");
			}else{
				bg_mod.box.css("background-position-x",hpos+bg_mod.hscrolling_speed+"px");
			}
		}
	}

}



bg_mod.reset();
