
var control_handlers = {

	mouse_move: function(e){
		
		//set basic control variables
		controls.curs_width = (e.pageX / window.innerWidth);
		controls.curs_height = (e.pageY / window.innerHeight);

		images.height=Math.floor((controls.curs_height*30)*(controls.curs_width*60));
		//fire mouse move functions from modules
		hallway.mouse();


	},

	mouse_down: function(e){
		if( keydown['p'] ){
			console.log(puncher);
			puncher.punch(1);
			return;
		}

		//if(midi){return;}
		
		module_changer.step();
	},

	key_down:function(e){
	
		//if entered and a letter is pressed
		if( controls.entered && e.which>=65 && e.which <= 90 ){
			//keycode = e.which.toString();
			//enter_set(keycode);
		}
		if(e.which==16){
			controls.shifted = true;	
		}else if(e.which==13){// ENTER
			controls.entered = true;
		}else if(e.which==18){// ALT
			controls.alted = true;
		}else if(e.which==37){ // LEFT KEY
			controls.l_press = true;	
			if( controls.u_press ){
				//up left 
				chain.move_y = -30;
				chain.move_x = -30;
			}else if( controls.d_press ){
				//down left
				chain.move_y = 30;
				chain.move_x = -30;
			}else{
				//left 
				chain.move_x = -30;
				chain.move_y = 0; 
			}
		}else if(e.which==38){ // UP KEY
			controls.u_press = true;	
			if( controls.l_press ){ 
				//up left
				chain.move_y = -30;
				chain.move_x = -30;
			}
			else if( controls.r_press ){ 
				//up right
				chain.move_y = -30;
				chain.move_x = 30;
			}else{
				//up
				chain.move_y = -30;
				chain.move_x = 0;
			}
		}else if(e.which==40){ // DOWN KEY
			controls.d_press = true;	
			if( controls.l_press ){
				//down left
				chain.move_y = 30;
				chain.move_x = -30;
			}
			else if( controls.r_press ){ 
				//down right
				chain.move_x = 30;
				chain.move_y = 30;
			}else{
				//down
				chain.move_y = 30;
				chain.move_x = 0;
			}
		}else if(e.which==39){ // RIGHT KEY
			controls.r_press = true;	
			if( controls.u_press ){ 
				//up right
				chain.move_y = -30;
				chain.move_x = 30;
			}else if( controls.d_press ){ 
				//down right
				chain.move_x = 30;
				chain.move_y = 30;
			}else{
				chain.move_y = 0;
				chain.move_x = 30;
			}
		}else if(e.which==8){//DELETE:REMOVE random LOCKED image
			random_locked_ele=	Math.floor(Math.random()*$('.locked').length);
			$('.locked').eq(random_locked_ele).remove();
			return false;
		}else if(e.which==91 || e.which==93){//COMMAND KEY:set BG GIF
			
			if(controls.shifted){
				inner_bg_mod.show();
				inner_bg_mod.next();
			}else if(controls.alted){
				bg_mod.clear();
			}else if(controls.entered){
				inner_bg_mod.clear();
			}else{
				bg_mod.show();
				bg_mod.next();
			}
			
		}else if(e.which==187){//+ to increase trail
			images.amount=images.amount+1;
		}else if(e.which==189){//- to decrease trail
			if(images.amount==0){return;}
			images.amount=images.amount-1;
			random_ele=	Math.floor(Math.random()*images.amount);
			$('img').eq(random_ele).remove();
		}else if(e.which==219){//[ to decrease rotation
			
			images.rotation--;	
			
			}else if(e.which==221){// ] to increase rotation
			
			images.rotation++;
				
		}else if(e.which==186){// ;
			
		}else if(e.which==222){// '
			
		}else if(e.which==32){ // SPACE BAR TO START NEW CHAIN

			if( controls.shifted ){
				chain.cursor--;
			}else{
				chain.cursor++;
			}

			if(hallway.run){
				hallway.refresh_pics = true;
			}else{
				chain.restart = true;
			}
		
		}else if(e.which==65){// A
			hallway.init();
		}else if(e.which==66){//B
			big_shrinker.go();
		}else if(e.which==67){//C

			if( controls.shifted ){
				corner_box.toggle();
				return;
			}

			circle.init();


		}else if(e.which==68){// D

		}else if(e.which==69){// E

		}else if(e.which==70){// F

			keydown['f'] = true;

		}else if(e.which==71){// G

		}else if(e.which==72){// Height
			if( controls.alted ){ height='auto';return }
			mods['height'] = true;
			images.width = $('img').eq(0).width();
			mods['default']=false;
			$('#height').addClass('active');
			$control_selector.val('Height');
		}else if(e.which==73){// I
			mirror_gif.init();
		}else if(e.which==76){// L

		}else if(e.which==77){// M
			center_pix.init();
		}else if(e.which==78){// N

		}else if(e.which==79){// O
			mods['opacity'] = true;
			mods['default'] = false;
			$('#opacity').addClass('active');
			$control_selector.val('Opacity');
		
		}else if(e.which==80){// P

			keydown['p']=true;

		}else if(e.which==81){// Q

		}else if(e.which==82){// R
			toggle_value('rainbow_bars_run');
		}else if(e.which==83){// S

			keydown['s']=true;

		}else if(e.which==84){// T

		}else if(e.which==85){// U

		}else if(e.which==86){// V

		}else if(e.which==87){// W
			if( controls.alted ){ images.width='auto';return }
			mods['width'] = true;
			images.height = $('img').eq(0).height();
			mods['default'] = false;
			$('#width').addClass('active');
			$control_selector.val('Width');
		}else if(e.which==89){// Y

		}else if(e.which==220){// \ TOGGLE UI
			toggle_value('hide_ui');
		}
		////////////////////////////////////////////////////////////////////Number Toggles
		else if(e.which==49){//1: pause
			run = !run;
		}else if(e.which==50){//2
			
		}else if(e.which==51){//3
			
		}else if(e.which==52){//4

		}else if(e.which==192){// ~ RECORD BUTTON
			
			save_out.run();
			// save_out.get_img_srcs();
			
			
		}else if(e.which==54){ // 6 
			
		}
	},
	key_up: function(e){
		
		if(e.which==70){ // F
			keydown['f'] = false; 
		}else if(e.which==72){ mods['height'] = false; mods['default'] = true;$('#height').removeClass('active');}// Height
		else if(e.which==79) { mods['opacity']=false; mods['default'] = true;$('#opacity').removeClass('active'); }// Opacity
		else if(e.which==80){ // P
			keydown['p'] = false; 
		}
		else if(e.which==83){ // S
			keydown['s'] = false; 
		}
		else if(e.which==87) { mods['width']=false; mods['default'] = true;$('#width').removeClass('active'); }// Width
		else if(e.which==84) { mods['trail']=false; mods['default'] = true;$('#trail').removeClass('active'); }// Width
		else if(e.which==16){ controls.shifted=false }
		else if(e.which==18){ controls.alted=false; }
		else if(e.which==13){ 
			controls.entered=false;
			
			//set changer temporarily disabled

			// n = images.set_array[0].lastIndexOf("/");
			// $('#title').show(0).html(images.set_array[0].substring(5,n)).fadeOut(5000);
			
			// $('#readout div div').remove();
			// for(var i=0; i<bg_mod.active_set.length; i++){
			// 	if( bg_mod.active_set[i].indexOf("!") !== -1 ){ dot_class="poppin"; }else{ dot_class="";}
			// 	$('#count-bgs').append('<div class="'+dot_class+'">');
			// }
			// for(var i=0; i<inner_bg_mod.active_set.length; i++){
			// 	if( inner_bg_mod.active_set[i].indexOf("!") !== -1 ){ dot_class="poppin"; }else{ dot_class="";}
			// 	$('#count-inner-bgs').append('<div class="'+dot_class+'">');
			// }
			// for(var i=0; i<images.set_array.length; i++){
			// 	if( images.set_array[i].indexOf("!") !== -1 ){ dot_class="poppin"; }else{ dot_class="";}
			// 	$('#count-images').append('<div class="'+dot_class+'">');
			// }
		}
		else if(e.which==187){ $('#plus').removeClass('active'); }
		else if(e.which==189){ $('#minus').removeClass('active'); }
		else if(e.which==37){ controls.l_press=false; }
		else if(e.which==38){ controls.u_press=false; }
		else if(e.which==39){ controls.r_press=false; }
		else if(e.which==40){ controls.d_press=false; }

	}
}

//BIND OVERALL UI ACTIONS
$('html').mousemove(function(e){ control_handlers.mouse_move(e) });
$('html').mousedown(function(e){ control_handlers.mouse_down(e) });
$(document).bind('keydown', function(e){ control_handlers.key_down(e) });
$(document).bind('keyup', function(e){ control_handlers.key_up(e) });

var controls = {
	curs_height: 0,
	curs_width: 0,
	shifted: false,
	alted: false,
	u_press: false,
	l_press: false,
	d_press: false,
	r_press: false
}

var keydown = new Array();