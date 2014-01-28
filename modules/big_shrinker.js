
big_shrinker = {
	cursor: 0,
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
		$('html').prepend($big_shrinker);
		$big_shrinker.hide(5000,function(){ $(this).remove(); });
	}
}