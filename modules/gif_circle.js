//CIRCLE GIFS

var circle_container = document.createElement('div');
circle_container.setAttribute("style","width:100%;height:100%;z-index:999999999999999;position:absolute;top:0px;");
circle_container.setAttribute('id','circle');
document.getElementById('container').appendChild( circle_container );

var circle_imgs = circle_container.getElementsByTagName("img");
var circle = {
	run: false,
	refresh: false,
	refresh_cursor: 0,
	points: 63,
	radius: 400,
	theta_length: .1,
	center_x: (window.innerWidth / 2),
	center_y: (window.innerHeight / 2),
	angle: 0,
	container_angle: 0,
	container_spin_speed: .5,
	spin_speed: .02,
	cursor: 0,
	size_lock: false,
	die: function(){
		circle.run = false;
		m_out(1,'white');
		$('.circle').removeClass('circle');
	},
	init: function(){
		$circle = $('#circle');
		circle.run = !circle.run;
		if(circle.run==true){ 
			m_out(1,'cyan');
		}
		else{ 
			circle.die();
		}
		perim = circle.get_perim();
		$('#circle img').remove();
		var i = 0;
		circle_draw = setInterval(function(){
			if( i == perim.length || !circle.run ){ clearInterval( circle_draw ); return; }
			circle_pic = $("<img />")
			.attr('class','circle')
			.attr('src',images.set_array[images.cursor])
			.attr('height',images.height)
			.attr('width',images.width)
			.css({
				'position': 'absolute',
				'opacity':images.opacity,
				'border-radius': images.radius+"px",
				left : perim[i][0],
				top : perim[i][1],
				"-webkit-transform" : "rotate("+circle.angle+"deg)"
			});
			$circle.append(circle_pic)
			i++;
		},20);
		chain.total_amount = chain.total_amount+circle.points;


		//$('img').not('.circle').remove();
		
	},
	get_perim: function(){
		i = 0;
		theta = 0;
		perim = new Array();
		while( i < circle.points){
			x = circle.center_x + circle.radius * Math.cos(theta);
			y = circle.center_y + circle.radius * Math.sin(theta);
			perim[i] = [x,y];
			i++;
			theta = theta+circle.theta_length;
		}
		return perim;
	},
	draw: function(){

		if(!circle.run){ return; }

		//Apply styles to every image simultaneously (rotate)
		for (var i = 0; i < circle_imgs.length;i++) {
		    circle.angle = circle.angle+circle.spin_speed;
		    circle_imgs[i].style.webkitTransform = "rotate("+circle.angle+"deg)";
		}

		if( chain.restart == true ){
			circle.refresh = true;
			circle.refresh_cursor = -1;
			chain.restart = false;
		}

		if( circle.refresh ){
			$( circle_imgs[circle.refresh_cursor] ).attr('src',images.set_array[images.cursor]);
			
			circle.refresh_cursor++;

			if( circle.refresh_cursor > circle_imgs.length+1 ){
				circle.refresh = false;
			}
		}

		//Apply stlyes frame by frame

		if( !circle.size_lock ){
			$(circle_imgs[circle.cursor])
			//.attr( 'src', images.set_array[images.cursor] )
			.attr('height',images.height)
			.attr('width',images.width)
			.css({
				'opacity':images.opacity,
				'border-radius': images.radius+"px"
			});
		}

		circle.cursor++;
		if( circle.cursor > circle_imgs.length ){ circle.cursor = 0; }


		//Spin the whole circle
		circle_container.style.webkitTransform = "rotate("+circle.container_angle+"deg)";
		circle.container_angle = circle.container_angle-circle.container_spin_speed;

		// REMOVE RESIDUAL IMAGES
		if( $('#container>img').length > 0 ){
			images.remove_random();
			if( $('#container>img').length < 6){
	      $('#container>img').remove();
	    }
		}
	}
}