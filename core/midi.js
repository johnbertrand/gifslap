
// MIDI Control scheme for the LIVID CNTRL:R
//

var m_out = function(button,color){
		if(!midi){return;}
		switch(color){
			case 'off':
				color = 0;
				break
			case 'white':
				color = 1;
				break
			case 'cyan':
				color = 4;
				break
			case 'pink':
				color = 10;
				break
			case 'red':
				color = 20;
				break
			case 'blue':
				color = 35;
				break
			case 'yellow':
				color = 65;
				break
			case 'green':
				color = 127;
				break
		}

		Jazz.MidiOut(0x90,button,color);
	}

if(midi){
	var Jazz = document.getElementById("Jazz");
	console.log(Jazz);
	Jazz.MidiInOpen(0);
	Jazz.MidiOutOpen(1);

	window.setInterval(function(){
		var arr;
		while(arr=Jazz.QueryMidiIn()){
		a=arr.slice(1,arr.length);
		//$('#midi-info').text(a[0]+" "+a[1]+" "+a[2]);
		if(a[0]==176&&a[1]==1){ //knob 1
			
			/* * * * * * * * *  * 
			*                   *
			* SINGLE HEIGHT     *
			* * * * * * * * * * */

			images.height = a[2]*8;
			if(images.height<10){images.height=10}

		}else if(a[0]==176&&a[1]==5){ //knob 2

			/* * * * * * * * *  * 
			*                   *
			* SINGLE WIDTH      *
			* * * * * * * * * * */

			images.width = a[2]*14;
			if(images.width<10){images.width=10}

		}else if(a[0]==176&&a[1]==9){ //knob 3

			/* * * * * * * * *  * 
			*                   *
			* SINGLE OPACITY    *
			* * * * * * * * * * */

			images.opacity = a[2]*.01;

		}else if(a[0]==176&&a[1]==13){ //knob 4

			/* * * * * * * * *  * 
			*                   *
			* SINGLE ROTATE     *
			* * * * * * * * * * */

			if( circle.run ){
				circle.container_spin_speed = a[2]*.05;
			}else if( hallway.run ){
				hallway.top_bottom_rotation = a[2]*3;
			}else{
				images.rotation = a[2]*3;
			}

		}else if(a[0]==176&&a[1]==2){ //knob 5
			
			/* * * * * * * * *  * 
			*                   *
			* GLOBAL HEIGHT     *
			* * * * * * * * * * */
			
			images.height = a[2]*8;
			if(images.height<10){images.height=10}

			$('img').height( images.height );
			
		}else if(a[0]==176&&a[1]==6){ //knob 6

			/* * * * * * * * *  * 
			*                   *
			* GLOBAL WIDTH     *
			* * * * * * * * * * */

			images.width = a[2]*8;
			if(images.width<10){images.width=10}
			$('img').css({'width':images.width+"px"});

		}else if(a[0]==176&&a[1]==10){ //knob 7

			/* * * * * * * * *  * 
			*                   *
			* GLOBAL OPACITY    *
			* * * * * * * * * * */

			images.opacity = a[2]*.01;
			$('img').css({'opacity':images.opacity});

		}else if(a[0]==176&&a[1]==14){ //knob 8
			
			/* * * * * * * * *  * 
			*                   *
			* GLOBAL ROTATE     *
			* * * * * * * * * * */

			if(hallway.run){ //if hallway is on, this turns the sides
				hallway.sides_rotation = a[2]*3;
				return;
			}

			images.rotation = a[2]*3;
			$('img').css({'-webkit-transform':'rotate('+images.rotation+'deg)'});



		}else if(a[0]==176&&a[1]==3){ //knob 9

			/* * * * * * * * *  * 
			*                   *
			* BORDER RADIUS     *
			* * * * * * * * * * */

			images.radius = a[2]*10;

		}else if(a[0]==176&&a[1]==7){ //knob 10

		}else if(a[0]==176&&a[1]==11){ //knob 11

		}else if(a[0]==176&&a[1]==15){ //knob 12

			/* * * * * * * * * * * * * 
			*                        *
			* SINGLE AUTO ROTATE     *
			* * * * * * * * * * * * */

			if( circle.run ){
				circle.spin_speed = a[2]*.005;
			}else{
				images.rotation_speed = a[2]*3;
			}

		}else if(a[0]==176&&a[1]==17){ //knob 13 RIGHT SIDE

		}else if(a[0]==176&&a[1]==21){ //knob 14

			/* * * * * * * * * * * * * * * * *
			*                                *
			* HALLWAY ORIGIN DIVISOR         *
			* * * * * * * * * * * * * * * * */

			//prevent 0
			if (a[2] == 0){ a[2] = 1; }
			
			// multiply first half of knob movement into large numbers
			if(a[2]<100){ 
				a[2] = a[2] * (a[2]*.025);

			}else{ // divide second half of knob movement to small numbers
				a[2] = a[2]/100;

			}

			hallway.origin_divisor = a[2];
			hallway.origin_x = hallway.midi_x / hallway.origin_divisor;
			hallway.origin_y = hallway.midi_y / hallway.origin_divisor;


		}else if(a[0]==176&&a[1]==25){ //knob 15

			/* * * * * * * * * * * * * 
			*                        *
			* MOVE X                 *
			* * * * * * * * * * * * */

			chain.move_x = a[2]-64;

			hallway.midi_x = a[2];
			hallway.origin_x = a[2]/hallway.origin_divisor;
			

		}else if(a[0]==176&&a[1]==29){ //knob 16 

			/* * * * * * * * * * * * * 
			*                        *
			* MOVE Y                 *
			* * * * * * * * * * * * */

			chain.move_y = -a[2]+64;

			hallway.midi_y = a[2];
			hallway.origin_y = a[2]/hallway.origin_divisor;

		}else if(a[0]==176&&a[1]==18){ //knob 17

		}else if(a[0]==176&&a[1]==22){ //knob 18

		}else if(a[0]==176&&a[1]==26){ //knob 19

		}else if(a[0]==176&&a[1]==30){ //knob 20

		}else if(a[0]==176&&a[1]==19){ //knob 21

		}else if(a[0]==176&&a[1]==23){ //knob 22

		}else if(a[0]==176&&a[1]==26){ //knob 23

		}else if(a[0]==176&&a[1]==31){ //knob 24

		}else if(a[0]==176&&a[1]==4){ //slider 1

			/* * * * * * * * * * * * * 
			*                        *
			* SPEED                  *
			* * * * * * * * * * * * */

			chain.distance = a[2]/10;

		}else if(a[0]==176&&a[1]==8){ //slider 2

			/* * * * * * * * * * * * * 
			*                        *
			* TRAIL AMOUNT           *
			* * * * * * * * * * * * */

			//a[2]= Math.floor(a[2]/3);
			if( a[2] < images.amount ){ // we need to remove images
				$('.chain').eq(a[2]).nextAll('.chain').remove();
				chain.amount=a[2];
			}
			
			images.amount=a[2];

		}else if(a[0]==176&&a[1]==12){ //slider 3

			/* * * * * * * * * * * * * 
			*                        *
			* BG SIZE                *
			* * * * * * * * * * * * */

			if(a[2]==0){ a[2]=1; }

			a[2] = a[2]+"%";

			if(a[2]=="127%"){ a[2]="cover"; }

			$('#bg-box').css({"background-size": a[2]})
			$('.kscope-box').css({"background-size": a[2]})


		}else if(a[0]==176&&a[1]==16){ //slider 4

			/* * * * * * * * * * * * * 
			*                        *
			* INNER BG SIZE          *
			* * * * * * * * * * * * */

			if(a[2]==0){ a[2]=1; }
			inner_bg_mod.box.css({"background-size": a[2]+"%"});

		}else if(a[0]==176&&a[1]==20){ //slider 5

			/* * * * * * * * * * * * * 
			*                        *
			* BORDER IMAGE WIDTH     *
			* * * * * * * * * * * * */

			if( a[2] == 0 ){ 
				images.border_image = false;
			}else{
				images.border_image = true;	
			}
			images.border_width = a[2];

		}else if(a[0]==176&&a[1]==24){ //slider 6

			/* * * * * * * * * * * * * 
			*                        *
			* BORDER IMAGE SLICE     *
			* * * * * * * * * * * * */
			if( a[2] == 0 ){ 
				images.border_image = false;
			}else{
				images.border_image = true;
				if(images.border_width == 0){
					images.border_width = 20;
				}
			}
			images.border_slice = a[2];

		}else if(a[0]==176&&a[1]==28){ //slider 7

			/* * * * * * * * * * * * * 
			*                        *
			* HALLWAY WIDTH          *
			* * * * * * * * * * * * */

			hallway.layer_width = a[2];
			//hallway.layer_rot = a[2];

		}else if(a[0]==176&&a[1]==32){ //slider 8

			/* * * * * * * * * * * * * * * *
			*                              *
			* FLY OFF DISTANCE             *
			* * * * * * * * * * * * * * * */

			images.fly_off_dist = a[2];

		}else if(a[0]==176&&a[1]==48){ //encoder spin 1
			
			/* * * * * * * * * * * * * * *
			*                            *
			* HALLWAY AUTO ROT SPEED     *
			* * * * * * * * * * * * * * */

			hallway.layer_auto_rot = (a[2]-64)*.5;

		}else if(a[0]==176&&a[1]==51){ //encoder spin 2

			/* * * * * * * * * * * * * * * *
			*                              *
			* CHAIN AUTO HEIGHT STEP COUNT *
			* * * * * * * * * * * * * * * */

			images.auto_height_steps = a[2];

		}else if(a[0]==176&&a[1]==54){ //encoder spin 3

		}else if(a[0]==176&&a[1]==57){ //encoder spin 4

		}else if(a[0]==176&&a[1]==49){ //encoder spin 5

			/* * * * * * * * * * * * * * * *
			*                              *
			* MIRROR MODE AMOUNT PER SIDE  *
			* * * * * * * * * * * * * * * */

			mirror_gif.amount_per_side = a[2];

		}else if(a[0]==176&&a[1]==52){ //encoder spin 6

		}else if(a[0]==176&&a[1]==55){ //encoder spin 7

			/* * * * * * * * * * * * * 
			*                        *
			* BG HSCROLL             *
			* * * * * * * * * * * * */

			bg_mod.hscrolling_speed=a[2]*.5;

		}else if(a[0]==176&&a[1]==58){ //encoder spin 8
			
			/* * * * * * * * * * * * * 
			*                        *
			* BG VSCROLL             *
			* * * * * * * * * * * * */

			bg_mod.vscrolling_speed=a[2]*.5;

		}else if(a[0]==176&&a[1]==50){ //encoder spin 9

			/* * * * * * * * * * * * * 
			*                        *
			* BG OPACITY             *
			* * * * * * * * * * * * */

			bg_mod.box.css("opacity", a[2]*.01);

		}else if(a[0]==176&&a[1]==53){ //encoder spin 10

			/* * * * * * * * * * * * * 
			*                        *
			* INNER BG OPACITY       *
			* * * * * * * * * * * * */

			inner_bg_mod.box.css("opacity", a[2]*.01);

		}else if(a[0]==176&&a[1]==56){ //encoder spin 11

			/* * * * * * * * * * * * * 
			*                        *
			* MAP MARGIN             *
			* * * * * * * * * * * * */

			rainbow_bars.margin = a[2]*-.5;

		}else if(a[0]==176&&a[1]==59){ //encoder spin 12

			/* * * * * * * * * * * * * 
			*                        *
			* MAP ROTATE             *
			* * * * * * * * * * * * */		

			rainbow_bars.rotate = a[2];

		}if(a[0]==144&&a[1]==48&&a[2]>0){ //encoder press 1

			/* * * * * * * * * * * * * * * * * * * * * * * 
			*                                            * 
			* TOGGLE HALLWAY AUTOROT, OR INIT HALLWAY    *
			* * * * * * * * * * * * * * * * * * * * * * */

			if(!hallway.run){
				hallway.init();
			}else{
				hallway.layer_auto_rot = 0;
			}

		}else if(a[0]==144&&a[1]==51&&a[2]>0){ //encoder press 2

			/* * * * * * * * * * * * * * * *
			*                              *
			* TOGGLE AUTO HEIGHT           *
			* * * * * * * * * * * * * * * */

			images.auto_height = !images.auto_height;

			if( images.auto_height ){
				m_out(51,'green');	
			}else{
				m_out(51,'off');
			}

		}else if(a[0]==144&&a[1]==54&&a[2]>0){ //encoder press 3

		}else if(a[0]==144&&a[1]==57&&a[2]>0){ //encoder press 4

		}else if(a[0]==144&&a[1]==49&&a[2]>0){ //encoder press 5
			
			/* * * * * * * * * * * *  * 
			*                         *
			* TOGGLE MIRROR           *
			* * * * * * * * * * * * * */

			mirror_gif.init();
			circle.die();

		}else if(a[0]==144&&a[1]==52&&a[2]>0){ //encoder press 6

		}else if(a[0]==144&&a[1]==55&&a[2]>0){ //encoder press 7

			/* * * * * * * * * * * *  * 
			*                         *
			* BG HSCROLL INVERT       *
			* * * * * * * * * * * * * */

			bg_mod.hscroll_invert = !bg_mod.hscroll_invert;

		}else if(a[0]==144&&a[1]==58&&a[2]>0){ //encoder press 8

			/* * * * * * * * * * * *  * 
			*                         *
			* BG VSCROLL INVERT       *
			* * * * * * * * * * * * * */

			bg_mod.vscroll_invert = !bg_mod.vscroll_invert;

		}else if(a[0]==144&&a[1]==50&&a[2]>0){ //encoder press 9

			/* * * * * * * * * * * * * 
			*                         *
			* TOGGLE BG OPACITY       *
			* * * * * * * * * * * * * */			

			console.log(bg_mod.box.css("opacity"));

		}else if(a[0]==144&&a[1]==53&&a[2]>0){ //encoder press 10

		}else if(a[0]==144&&a[1]==56&&a[2]>0){ //encoder press 11

		}else if(a[0]==144&&a[1]==59&&a[2]>0){ //encoder press 12

			/* * * * * * * * * * * * * 
			*                        *
			* TOGGLE RAINBOW BARS    *
			* * * * * * * * * * * * */

			rainbow_bars.run = !rainbow_bars.run;
			
			
			if(rainbow_bars.run){
				m_out(59,'red');
			}else{
				m_out(59,'off');
			}

			rainbow_bars.current_size = 0;
			$('p').remove();

		}else if(a[0]==144&&a[1]==0&&a[2]>0){ //grid button 1

			/* * * * * * * * * * * * * 
			*                        *
			* PAUSE / RUN            *
			* * * * * * * * * * * * */

			run = !run;

			if(run){
				m_out(0,'white');
			}else{
				m_out(0,'cyan');
			}

		}else if(a[0]==144&&a[1]==4&&a[2]>0){ //grid button 2

		}else if(a[0]==144&&a[1]==8&&a[2]>0){ //grid button 3

			/* * * * * * * * * * * * * 
			*                        *
			* UP LEFT                *
			* * * * * * * * * * * * */

			// if(chain.double_positioning){
			// 	clearInterval(move_loop);
			// 	move_loop = setInterval(function(){
			// 		chain.doubler_top = chain.doubler_top-distance;
			// 		chain.doubler_left = chain.doubler_left-distance;
			// 		if(a[2]==0){ clearInterval(move_loop); }
			// 	},20);
			// }else{
			// 	chain.move_y = -distance;
			// 	chain.move_x = -distance;
			// }

		}else if(a[0]==144&&a[1]==12&&a[2]>0){ //grid button 4

			/* * * * * * * * * * * * * * 
			*                          *
			* UP RIGHT                 *
			* * * * * * * * * * * * * */
			
			// if(chain.double_positioning){
			// 	clearInterval(move_loop);
				
			// 	move_loop = setInterval(function(){
					
			// 		chain.doubler_top = chain.doubler_top-distance;
			// 		chain.doubler_left = chain.doubler_left+distance;
			// 		if(a[2]==0){ clearInterval(move_loop); }
			// 	},20);
			// }else{
			// 	//direction='up-right';
			// 	chain.move_y = -distance;
			// 	chain.move_x = distance;
			// 	set_directional_lights(21);
			// }

		}else if(a[0]==144&&a[1]==1&&a[2]>0){ //grid button 5

			/* * * * * * * * * * * * * 
			*                        *
			* CIRCLE TOGGLE          *
			* * * * * * * * * * * * */

			if( !circle.run ){
				circle.init();
			}else{
				circle.die();
			}


		}else if(a[0]==144&&a[1]==5&&a[2]>0){ //grid button 6

			/* * * * * * * * * * * * * 
			*                        *
			* CIRCLE SIZE LOCK       *
			* * * * * * * * * * * * */

			circle.size_lock = !circle.size_lock;

			if( circle.size_lock ){
				m_out(5,'cyan');
			}else{
				m_out(5,'white');
			}

		}else if(a[0]==144&&a[1]==9&&a[2]>0){ //grid button 7

			/* * * * * * * * * * * * * 
			*                        *
			* DOWN LEFT              *
			* * * * * * * * * * * * */

			// if(chain.double_positioning){
			// 	clearInterval(move_loop);
			// 	move_loop = setInterval(function(){
			// 		chain.doubler_top = chain.doubler_top+distance;
			// 		chain.doubler_left = chain.doubler_left-distance;
			// 		if(a[2]==0){ clearInterval(move_loop); }
			// 	},20);
			// }else{
			// 	chain.move_y = distance;
			// 	chain.move_x = -distance;
			// }

		}else if(a[0]==144&&a[1]==13&&a[2]>0){ //grid button 8
			
			/* * * * * * * * * * * *  * 
			*                         *
			* DOWN RIGHT              *
			* * * * * * * * * * * * * */


			// if(chain.double_positioning){
			// 	clearInterval(move_loop);
			// 	move_loop = setInterval(function(){
			// 		chain.doubler_top = chain.doubler_top+distance;
			// 		chain.doubler_left = chain.doubler_left+distance;
			// 		if(a[2]==0){ clearInterval(move_loop); }
			// 	},20);
			// }else{
			// 	//direction='down-right';
				
			// 	chain.move_x = distance;
			// 	chain.move_y = distance;
			// 	set_directional_lights(23);
			// }

		}else if(a[0]==144&&a[1]==2&&a[2]>0){ //grid button 9
			

		}else if(a[0]==144&&a[1]==6&&a[2]>0){ //grid button 10

		}else if(a[0]==144&&a[1]==10){ //grid button 11

			/* * * * * * * * * * * * *  * 
			*                           *
			* DOUBLER POSITION          *
			* * * * * * * * * * * * * * */

			toggle_value('double_positioning');

		}else if(a[0]==144&&a[1]==14&&a[2]>0){ //grid button 12

			/* * * * * * * * * * * * *  * 
			*                           *
			* TOGGLE DOUBLER            *
			* * * * * * * * * * * * * * */

			chain.doubler = !chain.doubler;

			if(chain.doubler){
				chain.doubler_cursor = 	chain.cursor;
			}

		}else if(a[0]==144&&a[1]==3&&a[2]>0){ //grid button 13
			
			/* * * * * * * * * * * * *  * 
			*                           *
			* MIRROR VERTICAL STREAM    *
			* * * * * * * * * * * * * * */

			mirror_gif.vertical_stream = !mirror_gif.vertical_stream;
			if( mirror_gif.vertical_stream ){
				m_out(3,'cyan');
			}else{
				m_out(3,'white');
			}

		}else if(a[0]==144&&a[1]==7&&a[2]>0){ //grid button 14

		}else if(a[0]==144&&a[1]==11&&a[2]>0){ //grid button 15

			/* * * * * * * * * * * * *  * 
			*                           *
			* DELETE CHAIN IMAGES       *
			* * * * * * * * * * * * * * */

			$('.chain').remove();

		}else if(a[0]==144&&a[1]==15&&a[2]>0){ //grid button 16
			
			/* * * * * * * * * * * * *  * 
			*                           *
			* DELETE ALL IMAGES         *
			* * * * * * * * * * * * * * */

			images.clear();

		}else if(a[0]==144&&a[1]==16&&a[2]>0){ //seq button 1

			/* * * * * * * * *  * 
			*                   *
			* NEXT IMAGE        *
			* * * * * * * * * * */

				
			if( hud.preview ){
				chain.cursor++;
				hud.refresh_preview();
				return;
			}						


			chain.cursor++;
			chain.restart=true;


		}else if(a[0]==144&&a[1]==17&&a[2]>0){ //seq button 2

			/* * * * * * * * *  * 
			*                   *
			* NEXT BG           *
			* * * * * * * * * * */

			if( hud.preview ){
				bg_mod.cursor++;
				hud.refresh_preview();
				return;
			}

			bg_mod.next();

		}else if(a[0]==144&&a[1]==18&&a[2]>0){ //seq button 3

			/* * * * * * * * *  * 
			*                   *
			* NEXT INNER        *
			* * * * * * * * * * */

			if( hud.preview ){
				inner_bg_mod.cursor++;
				hud.refresh_preview();
				return;
			}

			inner_bg_mod.next();

		}else if(a[0]==144&&a[1]==19&&a[2]>0){ //seq button 4

		}else if(a[0]==144&&a[1]==20&&a[2]>0){ //seq button 5

			/* * * * * * * * * *  * 
			*                     *
			* PUNCH 0             *
			* * * * * * * * * * * */

			punch(0);

		}else if(a[0]==144&&a[1]==21){ //seq button 6

			/* * * * * * * * * *  * 
			*                     *
			* PUNCH 2             *
			* * * * * * * * * * * */

			punch(2);

		}else if(a[0]==144&&a[1]==22){ //seq button 7

		}else if(a[0]==144&&a[1]==23&&a[2]>0){ //seq button 8
			
			/* * * * * * * * * *  * 
			*                     *
			* ROTATE ALL 90       *
			* * * * * * * * * * * */		

			images.rotate_all(90);

		}else if(a[0]==144&&a[1]==24&&a[2]>0){ //seq button 9
			
			/* * * * * * * * * *  * 
			*                     *
			* BIG SHRINKER ++     *
			* * * * * * * * * * * */

			big_shrinker.next();

		}else if(a[0]==144&&a[1]==25&&a[2]>0){ //seq button 10

		}else if(a[0]==144&&a[1]==26&&a[2]>0){ //seq button 11

			/* * * * * * * * *  * 
			*                   *
			* BOUNCER: GROW     *
			* * * * * * * * * * */

			beat_grow = 40;
			beat_height = false;
			beat_width = true;

		}else if(a[0]==144&&a[1]==27&&a[2]>0){ //seq button 12

			/* * * * * * * * * * * * * * 
			*                          *
			* BOUNCER: GROW HEIGHT     *
			* * * * * * * * * * * * * */

			beat_grow = 40;
			beat_height = true;
			beat_width = false;

		}else if(a[0]==144&&a[1]==28&&a[2]>0){ //seq button 13

			/* * * * * * * * * * * * * * 
			*                          *
			* BOUNCER: SHRINK WIDTH    *
			* * * * * * * * * * * * * */

			beat_shrink = 500;
			beat_height = false;
			beat_width = true;

		}else if(a[0]==144&&a[1]==29&&a[2]>0){ //seq button 14

		}else if(a[0]==144&&a[1]==30){ //seq button 15

			/* * * * * * * * *  * 
			*                   *
			* WIDTH BUMP ++     *
			* * * * * * * * * * */

			size_mod = size_mod+80;
			if(size_mod > 500){ size_mod = 50; }

			$('img').each(function(){
				w = $(this).width();
				$(this).width( w + size_mod );
			});

		}else if(a[0]==144&&a[1]==31){ //seq button 16

			/* * * * * * * * * * * 
			*                    *
			* HEIGHT BUMP ++     *
			* * * * * * * * * * */

			size_mod = size_mod+80;
			if(size_mod > 500){ size_mod = 50; }

			$('img').each(function(){
				h = $(this).height();
				$(this).height( h + size_mod );
			});

		}else if(a[0]==144&&a[1]==32&&a[2]>0){ //seq button LOW 1

			/* * * * * * * * *  * 
			*                   *
			* PREVIOUS IMAGE    *
			* * * * * * * * * * */

			chain.cursor--;
			chain.restart=true;


		}else if(a[0]==144&&a[1]==33&&a[2]>0){ //seq button LOW 2

			/* * * * * * * * *  * 
			*                   *
			* PREVIOUS BG       *
			* * * * * * * * * * */

			bg_mod.prev();

		}else if(a[0]==144&&a[1]==34&&a[2]>0){ //seq button LOW 3

			/* * * * * * * * * * * * * * 
			*                          *
			* PREVIOUS INNER BG        *
			* * * * * * * * * * * * * */

			inner_bg_mod.prev();

		}else if(a[0]==144&&a[1]==35){ //seq button LOW 4

			/* * * * * * * * * * * * * * * 
			*                            *
			* PREVIEW MOMENTARY          *
			* * * * * * * * * * * * * * */

			if(a[2]){
				hud.show_preview();
				hud.preview = true;
			}else{
				hud.preview_box.empty();
				hud.preview = false;
			}

			//images.preview = !images.preview;

		}else if(a[0]==144&&a[1]==36){ //seq button LOW 5

			/* * * * * * * * *  * 
			*                   *
			* PUNCH 3           *
			* * * * * * * * * * */

			punch(3);

		}else if(a[0]==144&&a[1]==37&&a[2]>0){ //seq button LOW 6

			/* * * * * * * * *  * 
			*                   *
			* PUNCH 1           *
			* * * * * * * * * * */

			punch(1);

		}else if(a[0]==144&&a[1]==38&&a[2]>0){ //seq button LOW 7

		}else if(a[0]==144&&a[1]==39&&a[2]>0){ //seq button LOW 8

			/* * * * * * * * *  * 
			*                   *
			* SHRINK ALL        *
			* * * * * * * * * * */

			shrink_images();

		}else if(a[0]==144&&a[1]==40&&a[2]>0){ //seq button LOW 9

			/* * * * * * * * *  * 
			*                   *
			* BIG SHRINKER      *
			* * * * * * * * * * */

			big_shrinker.go()

		}else if(a[0]==144&&a[1]==41){ //seq button LOW 10

		}else if(a[0]==144&&a[1]==42&&a[2]>0){ //seq button LOW 11

			/* * * * * * * * * * * * 
			*                      *
			* BOUNCER: ROTATE      *
			* * * * * * * * * * * */		

			beat_rotator = 0;

		}else if(a[0]==144&&a[1]==43&&a[2]>0){ //seq button LOW 12

			/* * * * * * * * * * * * * *  * 
			*                             *
			* BOUNCER: SHRINK HEIGHT      *
			* * * * * * * * * * * * * * * */

			beat_shrink = 500;
			beat_height = true;
			beat_width = false;

		}else if(a[0]==144&&a[1]==44&&a[2]>0){ //seq button LOW 13

			/* * * * * * * * * * * * * *  * 
			*                             *
			* BOUNCER: GROW               *
			* * * * * * * * * * * * * * * */		

			beat_grow = 40;
			beat_height = true;
			beat_width = true;

		}else if(a[0]==144&&a[1]==45&&a[2]>0){ //seq button LOW 14

		}else if(a[0]==144&&a[1]==46){ //seq button LOW 15

			/* * * * * * * * *  * 
			*                   *
			* WIDTH BUMP --     *
			* * * * * * * * * * */

			size_mod = size_mod-50;
			if(size_mod < -100){ size_mod = 500; }

			$('img').each(function(){
				w = $(this).width();
				$(this).width( h + size_mod );
			});

		}else if(a[0]==144&&a[1]==47){ //seq button LOW 16

			/* * * * * * * * *  * 
			*                   *
			* HEIGHT BUMP --    *
			* * * * * * * * * * */

			size_mod = size_mod-50;
			if(size_mod < -100){ size_mod = 500; }

			$('img').each(function(){
				h = $(this).height();
				$(this).height( h + size_mod );
			});

		}

	}
	},0);

	// COLOR THE DIRECTIONAL BUTTONS
	

	// DEFAULT COLOR OF BUTTONS

	// GRID BUTTONS
	
	m_out(0,'white');
	m_out(1,'white');
	m_out(2,'off');
	m_out(3,'white');
	m_out(4,'white');
	m_out(5,'white');
	m_out(6,'off');
	m_out(7,'off');
	// m_out(8,'green');
	m_out(9,'off');
	m_out(10,'white');
	// m_out(11,'red');
	// m_out(12,'green'); 
	// m_out(13,'green');
	m_out(14,'white');
	m_out(15,'red');

	// ENCODERS (turn them off)
	m_out(48,'white');
	m_out(49,'white');
	m_out(50,'yellow');
	m_out(51,'white');
	m_out(52,'off');
	m_out(53,'yellow');
	m_out(54,'off');
	m_out(55,'off');
	m_out(56,'off');
	m_out(57,'off');
	m_out(58,'off');
	m_out(59,'off');

	//SEQ BUTTONS

	m_out(16,'pink');
	m_out(32,'white');

	m_out(17,'pink');
	m_out(33,'white');

	m_out(18,'pink');
	m_out(34,'white');

	// m_out(20,'blue'); //punches
	// m_out(21,'blue');
	// m_out(22,'blue');
	// m_out(36,'blue');
	// m_out(37,'blue');

	m_out(39,'yellow');

	m_out(24,'green');
	m_out(40,'pink');

	// m_out(26,'blue'); //bouncers
	// m_out(27,'blue');
	// m_out(28,'blue');
	// m_out(42,'blue');
	// m_out(43,'blue');
	// m_out(44,'blue');

	// m_out(30,'white'); //bumpers
	// m_out(46,'white');
	// m_out(31,'white');
	// m_out(47,'white');
}
