
var control_handlers = {

	mouse_move: function(e){
		
		//set basic control variables
		controls.curs_width = (e.pageX / window.innerWidth);
		controls.curs_height = (e.pageY / window.innerHeight);

		images.height=Math.floor((controls.curs_height*30)*(controls.curs_width*60));
		//fire mouse move functions from modules
		hallway.mouse();

		if(keydown['b']){
			images.border_width = (controls.curs_width*30)*(controls.curs_height*60);
			console.log(images.border_width);
		}


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
			keycode = e.which;

			if( controls.shifted ){
				scenes_helper.activate_scene(keycode);
			}else{
				switch_sets(keycode);				
			}
		}
		if(e.which==16){ // SHIFT

			controls.shifted = true;	

		}else if(e.which==13){// ENTER

			controls.entered = true;
			hud.show();
			
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
		}else if(e.which==8){//DELETE
			
			//cant really override default back button

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
			
			images.amount++;

		}else if(e.which==189){//- to decrease trail

			if(images.amount==0){return;}
			images.remove_random();
			images.amount--;
			chain.amount--;

		}else if(e.which==219){//[ to decrease rotation
			
			images.rotation--;	
			
			}else if(e.which==221){// ] to increase rotation
			
			images.rotation++;
				
		}else if(e.which==186){// ;
			
		}else if(e.which==222){// '
			
		}else if(e.which==32){ // SPACE BAR TO START NEW CHAIN

			if( controls.shifted ){
				images.cursor--;
			}else{
				images.cursor++;
			}

			if(hallway.run){
				hallway.refresh_pics = true;
			}else{
				chain.restart = true;
			}
		
		}else if(e.which==65){// A
			
			keydown['a'] = !keydown['a'];

			keydown['w'] = false;
			keydown['s'] = false;
			keydown['d'] = false;

		}else if(e.which==66){//B
			
			keydown['b'] = true;
			images.border_image = true;	

		}else if(e.which==67){//C

			if( controls.shifted ){
				corner_box.toggle();
				return;
			}

			circle.init();


		}else if(e.which==68){// D

			
			keydown['d'] = !keydown['d'];

			keydown['w'] = false;
			keydown['a'] = false;
			keydown['s'] = false;


		}else if(e.which==69){// E

		}else if(e.which==70){// F

			keydown['f'] = true;

		}else if(e.which==71){// G

		}else if(e.which==72){// Height
			if( controls.alted ){ height='auto';return }
			
			images.width = $('img').eq(0).width();
			
			$('#height').addClass('active');
			
		}else if(e.which==73){// I
			mirror_gif.init();
		}else if(e.which==76){// L

			os_hud.update();

		}else if(e.which==77){// M
			center_pix.init();
		}else if(e.which==78){// N

		}else if(e.which==79){// O
			
			
			$('#opacity').addClass('active');
			
		
		}else if(e.which==80){// P

			keydown['p']=true;

		}else if(e.which==81){// Q

		}else if(e.which==82){// R
			toggle_value('rainbow_bars_run');
		}else if(e.which==83){// S

			keydown['s']=!keydown['s'];

			keydown['w'] = false;
			keydown['a'] = false;
			keydown['d'] = false;

		}else if(e.which==84){// T

		}else if(e.which==85){// U

		}else if(e.which==86){// V

		}else if(e.which==87){// W
			
			keydown['w'] = !keydown['w'];
			
			keydown['a'] = false;
			keydown['s'] = false;
			keydown['d'] = false;

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

		}else if(e.which==27){// ESC

			// move all images onscreen to the delete folder
			image_flagger.run();

		}else if(e.which==192){// ~ 
			
			

			if( controls.shifted ){
				// save scene instead of still
				save_out.save_scene();
				return;
			}

			//save still
			save_out.save_still();
			
		}else if(e.which==54){ // 6 
			
		}
	},
	key_up: function(e){
		
		
		if(e.which==65){ // A

			

		}else if(e.which==66){ // B

			keydown['b'] = false; 
			

		}else if(e.which==68){ // D

			

		}else if(e.which==70){ // F

			keydown['f'] = false; 

		}else if(e.which==72){ // H

		}else if(e.which==79){ // O

		}else if(e.which==80){ // P

			keydown['p'] = false; 

		}
		else if(e.which==83){ // S

			

		}
		else if(e.which==87) { // W

			
			
		}
		else if(e.which==84){

		}else if(e.which==16){  // SHIFT

			controls.shifted=false;

		}
		else if(e.which==18){ controls.alted=false; }
		else if(e.which==13){ // ENTER

			controls.entered=false;
			hud.hide();
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
keydown['w'] = false;
keydown['a'] = false;
keydown['s'] = false;
keydown['d'] = false;