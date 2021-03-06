
// Setup commands

(function(){
	$mirror_box = $("<div id='mirror-box'></div>").css({
		'position': 'absolute',
		'height': '100%',
		'width': '100%',
		'left': '0px',
		'top': '0px',
		'z-index': '3'
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


	$('#container').append($mirror_box);
}());

m_left = 0;
var mirror_gif={
	box: $('#mirror-box'),
	run: false,
	current_amount: 0,
	boxes: $('#mirror-left, #mirror-right'),
	vertical_stream: true,
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

		if(!mirror_gif.run){return;}

		//Auto Rotation
		if( images.rotation_speed > 0 ){ images.rotation = images.rotation+(images.rotation_speed*.05); }

		$add_image = $('<img />')
			.attr("src",images.set_array[images.cursor])
			.attr('height',images.height)
			.attr('width',images.width)
			.css({
				'opacity':images.opacity,
				'-webkit-transform': 'rotate('+images.rotation+'deg)',
				'border-radius': images.radius+"px",
				'position':'relative',
				'top':'0px',
				'left':'0px',
				'margin-left':images.margin+"px"
			});

		if( mirror_gif.vertical_stream ){
			$add_image.css({
				'float':'left',
				'clear':'both'
			})
		}

		if( images.border_image ){
			$add_image.css({
				'border-width':images.border_width,
				'border-image':'url('+images.set_array[images.cursor+1]+') 48% repeat',
				"border-image-slice":images.border_slice+"%"
			});
		}

		mirror_gif.boxes.prepend( $add_image );
		mirror_gif.current_amount++;
		m_left++;

		if(mirror_gif.current_amount >= images.amount){
			mirror_gif.boxes.find('img:gt('+images.amount+')').remove();
			mirror_gif.current_amount = images.amount;
		}
	},
	rotate: function(deg){
		mirror_gif.box.css('-webkit-transform','rotate('+(-1*deg)+'deg)');
	}
};