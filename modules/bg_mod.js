
// Setup commands

(function(){
	$bg_box = $("<div id='bg-box'></div>").css({
		'position': 'absolute',
		'height': '100%',
		'width': '100%',
		'z-index': '-1',
		'left': '0px',
		'top': '0px'
	});

	$('#container').append($bg_box);
}());


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
		bg_mod.box.css('opacity','1')
	},

	//GO TO THE NEXT IMAGE
	next: function(){
		//restart if cursor is at the end
		if (bg_mod.cursor > bg_mod.active_set.length){ bg_mod.cursor = 0; }
		//set the new bg
		bg_mod.box.css('background-image','url('+bg_mod.active_set[bg_mod.cursor]+')');
		bg_mod.cursor++;
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
	}
}