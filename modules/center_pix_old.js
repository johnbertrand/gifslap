
// Setup commands

(function(){
	$center_pix = $("<div id='center-pix'></div>").css({
		'position': 'absolute',
		'height': '100%',
		'width': '100%',
		'left': '0px',
		'top': '0px',
		'z-index': '3',
		'text-align': 'center'
	});

	$('#container').append($center_pix);

	var css = '#center-pix div:nth-child(1){-webkit-transform:scale(3)}#center-pix div:nth-child(2){-webkit-transform:scale(2.5)}#center-pix div:nth-child(3){-webkit-transform:scale(2)}#center-pix div:nth-child(4){-webkit-transform:scale(1.5)}#center-pix div:nth-child(6){-webkit-transform:scale(.5)}';
	add_css( css );

}());

var center_pix={
	run: false,
	layers: 10,
	grow_factor: 20,
	current_amount: 0,
	box: $('#center-pix'),
	init: function(){
		center_pix.run = !center_pix.run;

		if(center_pix.run){
			if(midi){ m_out(48,'127'); }
			images.clear();
			center_pix.current_amount = 0;
			if( images.width == "auto" ){
				images.width = 500;
			}	
		}else{
			if(midi){ m_out(48,'off'); }
		}
	},
	draw: function(){

		if(!center_pix.run){ return; }

		//Auto Rotation
		if( images.rotation_speed > 0 ){ images.rotation = images.rotation+(images.rotation_speed*.05); }

		center_pix.box.find('img').each(function(){
			$(this).height( $(this).height + center_pix.grow_factor );
			$(this).width( $(this).width + center_pix.grow_factor );
		});

		mtop = -1*(images.height/2);
		mleft = -1*(images.width/2);

		
		// images.height = controls.curs_height*1000;
		// images.width = controls.curs_width*1000;

		$img = $('<img />')
			.attr("src",images.set_array[images.cursor])
			.attr('height',images.height)
			.attr('width',images.width)
			.css({
				'opacity':images.opacity,
				'-webkit-transform': 'rotate('+images.rotation+'deg)',
				'border-radius': images.radius+"px",
				'left':'50%',
				'top': '50%',
				'position':'absolute',
				'margin-top': mtop,
				'margin-left': mleft
			});
		$div = $('<div style="height:100%" />').append( $img );
		center_pix.box.prepend( $div );
		center_pix.current_amount++;

		if(center_pix.current_amount >= center_pix.layers){
			center_pix.box.find('img:gt('+center_pix.layers+')').remove();
			center_pix.current_amount = center_pix.layers;
		}



	}
};