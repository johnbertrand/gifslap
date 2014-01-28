
// Setup commands

(function(){
	$mirror_box = $("<div id='mirror-box'></div>").css({
		'position': 'absolute',
		'height': '100%',
		'width': '100%',
		'left': '0px',
		'top': '0px',
		'z-index': '0'
	});

	$mirror_left = $("<div id='mirror-left'></div>").css({
		'height': '100%',
		'width': '50%',
		'display': 'inline-block',
		'-webkit-transform': 'scaleX(-1)'
	});

	$mirror_right = $("<div id='mirror-right'></div>").css({
		'height': '100%',
		'width': '50%',
		'display': 'inline-block'
	});

	$mirror_box.append($mirror_left);
	$mirror_box.append($mirror_right);


	$('body').append($mirror_box);
}());

m_left = 0;
var mirror_gif={
	run: false,
	current_amount: 0,
	boxes: $('#mirror-left, #mirror-right'),
	init: function(){
		mirror_gif.run = !mirror_gif.run;

		if(mirror_gif.run){
			m_out(49,'127');
			images.clear();
			mirror_gif.current_amount = 0;		
		}else{
			m_out(49,'off');
		}
	},
	clear: function(){
		mirror_gif.run = false;
		m_out(49,'off');
		mirror_gif.boxes.empty();
	},
	draw: function(){

		//Auto Rotation
		if( images.rotation_speed > 0 ){ images.rotation = images.rotation+(images.rotation_speed*.05); }

		mirror_gif.boxes.prepend(
		$('<img />')
			.attr("src",images.set_array[chain.cursor])
			.attr('height',images.height)
			.attr('width',images.width)
			.css({
				'opacity':images.opacity,
				'-webkit-transform': 'rotate('+images.rotation+'deg)',
				'border-radius': images.radius+"px"
			}));
		mirror_gif.current_amount++;
		m_left++;

		if(mirror_gif.current_amount >= images.amount){
			mirror_gif.boxes.find('img:gt('+images.amount+')').remove();
			mirror_gif.current_amount = images.amount;
		}



	}
};