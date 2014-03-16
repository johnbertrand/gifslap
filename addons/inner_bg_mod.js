
// Setup commands

(function(){
	$inner_bg_box = $("<div id='inner-bg-box'></div>").css({
		'height': '80%',
		'width': '80%',
		'margin-top': '5%;',
		'background-size': 'cover',
		'display': 'inline-block'
	});

	$('#container').append($inner_bg_box);
}());


// Module properties and functions
var inner_bg_mod = {

	active_set: null,
	cursor: 0,

	box: $('#inner-bg-box'),

	//CLEAR THE INNER BG
	clear: function(){
		inner_bg_mod.box.css('opacity','0')
	},

	//SHOW THE INNER BG
	show: function(){
		inner_bg_mod.box.css('opacity','1')
	},

	// RESET (when switching sets)
	reset: function(){
		inner_bg_mod.clear();
		inner_bg_mod.cursor = 0;

		// Sync with active set
		if( images.active_set.inner ){
			inner_bg_mod.active_set = images.active_set.inner;
		}else{
			inner_bg_mod.active_set = images.active_set.main.slice(0);
			console.log('--> No inner bgs set folder')
		}

		//Shuffle Inner BG Set if random
		if( images.randomize_order ){
		  shuffle_array(inner_bg_mod.active_set);
		}

	},

	//GO TO THE NEXT IMAGE
	next: function(){
		//restart if cursor is at the end
		if (inner_bg_mod.cursor > inner_bg_mod.active_set.length){ inner_bg_mod.cursor = 0; }
		//set the new bg
		inner_bg_mod.box.css('background-image','url('+inner_bg_mod.active_set[inner_bg_mod.cursor]+')');
		inner_bg_mod.cursor++;
	},

	//GO TO THE PREVIOUS IMAGE
	prev: function(){
		//restart if cursor is at 0
		if (inner_bg_mod.cursor < 0){ inner_bg_mod.cursor = inner_bg_mod.active_set.length; }
		//set the new bg
		inner_bg_mod.cursor--;
		inner_bg_mod.box.css('background-image','url('+inner_bg_mod.active_set[inner_bg_mod.cursor]+')');
	}
}

inner_bg_mod.reset();