
$("<div id='big-shrinker-box'></div>").css({
	'width':'100%',
	'height':'100%',
	'position':'absolute',
	'top':'0',
	'left':'0'
}).appendTo( $('#container') );

big_shrinker = {
	box: $('#big-shrinker-box'),
	cursor: Math.floor((Math.random()*images.set_array.length)+1),
	next: function(){
		big_shrinker.cursor++;
		if(big_shrinker.cursor == images.set_array.length){
			big_shrinker.cursor = 0;
		}
	},
	go: function(){
		$big_shrinker = $('<img />')
			.attr('src',images.set_array[big_shrinker.cursor])
			.addClass('locked')
			.css({
				'position': 'absolute',
			    'top': '0px',
			    'left': '0px',
			    'width': '100%',
			    'height': '100%'
			});
		big_shrinker.box.prepend($big_shrinker);
		$big_shrinker.hide(5000,function(){ $(this).remove(); });
	},
	rotate: function(deg){
		big_shrinker.box.css('-webkit-transform','rotate('+(-1*deg)+'deg)');
	}
}
