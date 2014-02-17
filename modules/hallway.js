
// Setup commands

(function(){
	

}());

var hallway={
	run: false,
	refresh_pics: false,
	layers: 5,
	layer: null, //is filled in with init()
	perspective: 250,
	box: $('#hallway'),
	initialized: false,
	ripple_cursor: 0,
	strobe_cursor: 0,
	origin_x: .25,
	origin_y: .25,
	origin_divisor: 100,
	midi_x: .25,
	midi_y: .25,
	top_bottom_rotation: 0,
	sides_rotation: 0,
	init: function(){
		hallway.run = !hallway.run;

		if(hallway.run){
			//if(midi){ m_out(48,'127'); }
			images.clear();

			if( hallway.initialized==true ){ return; }
			$hallway = $("<div id='hallway'></div>").css({
				'position': 'absolute',
				'height': '100%',
				'width': '100%',
				'left': '0px',
				'top': '0px',
				'z-index': '0'
			});
			$layer = $('<div class="hallway-layer"></div>').css({
				'position': 'absolute',
				'z-index': '0',
				'-webkit-perspective': hallway.perspective,
		        '-webkit-perspective-origin-x': '50%',
		        '-webkit-perspective-origin-y': '50%'
			});
			$top = $('<div class="hallway-top"></div>').css({
				'width': '100%',
				'height': '20%',
				'margin': '0px auto',
				'-webkit-transform': 'rotateX(-63deg)',
				'position': 'absolute'
			});
			$left = $('<div class="hallway-left"></div>').css({
				'float':'left',
				'width':'50%',
				'height':'80%',
				'-webkit-transform': 'rotateY(-90deg)'
			});
			$right = $('<div class="hallway-right"></div>').css({
				'float':'left',
				'width':'50%',
				'height':'80%',
				'-webkit-transform': 'rotateY(-90deg)'
			});
			$bottom = $('<div class="hallway-bottom"></div>').css({
				'width': '100%',
				'height': '37%',
				'margin': '0px auto',
				'-webkit-transform': 'rotateX(63deg)',
				'position': 'absolute',
				'bottom': '0px',
				'z-index': '-1'
			});

			$layer.append($top, $left, $right, $bottom);
			hallway.layer = $layer;

			$('#container').append($hallway);
			hallway.initialized = true;
			

		}else{
			//if(midi){ m_out(48,'off'); }
		}
	},
	clear: function(){
		hallway.run = false;
		$('.hallway-top, .hallway-bottom, .hallway-right, .hallway-left').css('background-image','none');		
	},
	mouse: function(){
		if( !hallway.run ){ return; }
		hallway.origin_x = controls.curs_width;
		hallway.origin_y = controls.curs_height;

	},
	draw: function(){

		if(!hallway.run){return;}

		if(midi){
			hallway.layer.find(".hallway-bottom, .hallway-top").css({
				"opacity":images.opacity,
				'-webkit-transform': 'rotateX('+hallway.top_bottom_rotation+'deg)'
			});
			hallway.layer.find(".hallway-left, .hallway-right").css({
				"opacity":images.opacity,
				'-webkit-transform': 'rotateY('+hallway.sides_rotation+'deg)'
			});
		}

		new_layer = hallway.layer.clone();

		if( controls.shifted ){
			hallway.perspective = controls.curs_width*controls.curs_height*100;
		}
		if( controls.alted ){
			hallway.perspective = 250;
		}

		new_layer.css({
			'opacity':'1',
			'-webkit-perspective': hallway.perspective,
			'-webkit-perspective-origin-x':hallway.origin_x*200+"%",
			'-webkit-perspective-origin-y':hallway.origin_y*200+"%"
		});
		
		

		new_layer.find('.hallway-top, .hallway-bottom').css('background-image','url('+images.set_array[chain.cursor+1]+')');
		new_layer.find('.hallway-right, .hallway-left').css('background-image','url('+images.set_array[chain.cursor]+')');


		new_layer.appendTo( $('#hallway') );
		if( $('.hallway-layer').length > hallway.layers ){
			$('.hallway-layer').eq(0).remove()
		}

		if( keydown['s'] ){ //STROBE
			$('#hallway').find('.hallway-layer').css('opacity','0').eq(hallway.strobe_cursor).css('opacity','1');
			hallway.strobe_cursor++
			if(hallway.strobe_cursor > hallway.layers){ hallway.strobe_cursor = 0; }
		}

		if( keydown['r'] ){ //RIPPLE
			
		}


		//FIX THIS
		//$('#hallway div').eq(hallway.ripple_cursor).css('opacity','.2');

	}
};