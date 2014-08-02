$('#container').append('<div id="chain"></div>');

var chain = {
	run: true,
	restart: false,
	container: $('#chain'),
	amount: 0, //THE AMOUNT OF IMAGES SHOWN FROM THE CURRENT CHAIN, ALSO USED FOR Z-INDEX
	pos_x: 500,
	pos_y: 100,
	move_x: 0,
	move_y: 15,
	distance: 1, //SPEED MULTIPLIER
	z: 0, // Z INDEX
	doubler: false,
	doubler_left: 300,
	doubler_top: 0,
	doubler_cursor: 0,
	doubler_distance: 1,
	doubler_size: 1,
	double_positioning: false,
	init: function(){
		chain.run = true;
		chain.restart = false;
		images.width = 'auto';

		//if the image overlaps the right edge, bring it in
		if( chain.pos_x + images.height > window.innerWidth ){ chain.pos_x = chain.pos_x - images.height; }
		
		//Restart the theme sequence if we've reached the end.
		if(images.cursor >= images.set_array.length){ images.cursor = 0; }

	},
	draw: function(){

		if(!chain.run){ return; }

		chain.amount++;
		chain.z++;

		chain.pos_x = chain.pos_x + (chain.move_x*chain.distance);
		chain.pos_y = chain.pos_y + (chain.move_y*chain.distance);
		
		//PREVENT IMAGE FROM GOING OFFSCREEN
		
		//get width of images
		if( isNaN( images.width ) ){
			var estimated_width = $('img').eq(0).width();
		}else{
			var estimated_width = images.width;
		}
		
		//prevent image from going offscreen
		if( chain.pos_x > window.innerWidth - (estimated_width*.25)){ //right side
			chain.pos_x = 0 - (estimated_width*.75);
		}else if( chain.pos_y > window.innerHeight-(images.height*.4)){ //bottom
			chain.pos_y= 0 - (images.height*.6);
		}else if(chain.pos_x < 0 - (estimated_width*.75) ){ //left
			chain.pos_x=window.innerWidth - (estimated_width*.25);
		}if(chain.pos_y < 0 - (images.height*.6)){ //top
			chain.pos_y=window.innerHeight - (images.height*.4);
		}
		
		//Auto Rotation
		if( images.rotation_speed > 0 ){ images.rotation = images.rotation+(images.rotation_speed*.05); }

		if( images.auto_height ){
			console.log('ah');
			max_height = images.height;
			height_slice = max_height/images.auto_height_steps;
			current_height = height_slice*images.auto_height_cursor;
			images.auto_height_cursor++;
			if( images.auto_height_cursor > images.auto_height_steps ){
				images.auto_height_cursor = 1;
			}
		}else{
			current_height = images.height;
		}

		//ADD THE NEW IMAGE!

		$add_image = $('<img />')
			.attr("src",images.set_array[images.cursor])
			.attr("class","gif chain")
			.attr('height',current_height)
			.attr('data-orig-height',images.height)
			.attr('width',images.width)
			.attr('alt',chain.amount)
			.css({
				'top':chain.pos_y,
				'left':chain.pos_x,
				'z-index':chain.z,
				'opacity':images.opacity,
				'-webkit-transform': 'rotate('+images.rotation+'deg)',
				'border-radius': images.radius+"px"
			});

		if( images.border_image ){
			$add_image.css({
				'border-width':images.border_width,
				'border-image':'url('+images.set_array[images.cursor+1]+') 48% repeat',
				"border-image-slice":images.border_slice+"%"
			});
		}


		chain.container.prepend( $add_image );
			
		if( chain.doubler ){
			chain.doubler_y = chain.pos_y+chain.doubler_top;
			if( chain.doubler_y > window.innerHeight ){ chain.doubler_y = chain.doubler_y%window.innerHeight; }
			if(chain.doubler_y < 0){ chain.doubler_y = window.innerHeight + chain.doubler_y%window.innerHeight; }
			
			chain.doubler_x = chain.pos_x+images.width;
			if( chain.doubler_x > window.innerWidth ){ chain.doubler_x = chain.doubler_x%window.innerWidth;}
			if( chain.doubler_x < 0 ){ chain.doubler_x=window.innerWidth + chain.doubler_x%window.innerWidth;}
			
			// $('#text').text(chain.doubler_size);
			
			chain.container.prepend($('<img />')
				.attr('src',images.set_array[chain.doubler_cursor])
				.attr('class','gif chain '+images.cursor)
				.attr('height',(images.height*chain.doubler_size))
				.attr('width',(images.width*chain.doubler_size))
				.attr('alt',chain.amount)
				.css({
					//'top':(pos_y+(joy_vert*2)+(chain.doubler_distance*chain.doubler_top)),
					//'left':(pos_x+(joy_horiz*2)+(chain.doubler_distance*chain.doubler_left)),
					'top': chain.doubler_y+"px",
					'left': chain.doubler_x,
					'z-index':chain.z,
					'opacity':images.opacity, 
					'-webkit-transform': 'rotate('+(-1*images.rotation)+'deg) scaleX(-1)',
					'border-radius': images.radius+"px"
				}));
				
		chain.amount++;
		}
				
		//REMOVE IMAGES (CLEAN UP PHASE)
		if(chain.amount >= images.amount){

			images.remove_random();
			chain.amount--;
			if(chain.doubler || chain.amount > 100 ){ //run it again
				images.remove_random();
				chain.amount--;
			}
		}

		//LAUNCH A NEW CHAIN IF IT HAS REACHED CHAIN LENGTH OR SPACE BAR IS PRESSED
		if(chain.restart == true){ chain.init(); }
	}
}