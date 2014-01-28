module_changer = {

	//Used to change modules on the fly. (Currently fires on html click)

	current: 0,
	functions: new Array(
		chain.init,
		hallway.init,
		circle.init,
		mirror_gif.init
		//center_pix.init
	),
	kill_all: function(){
		images.clear();
		chain.run = false;
		hallway.clear();
		circle.run = false;
		mirror_gif.clear();
		//center_pix.run = false;
	},
	step: function(){
		if(!controls.alted){
			module_changer.kill_all();
		}

		module_changer.current++;

		if(module_changer.current == module_changer.functions.length){ 
			module_changer.current = 0;
		}
		module_changer.functions[module_changer.current]();
	}
}