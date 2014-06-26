var gamepadSupport = {
  // A number of typical buttons recognized by Gamepad API and mapped to
  // standard controls. Any extraneous buttons will have larger indexes.
  TYPICAL_BUTTON_COUNT: 16,

  // A number of typical axes recognized by Gamepad API and mapped to
  // standard controls. Any extraneous buttons will have larger indexes.
  TYPICAL_AXIS_COUNT: 4,

  // Whether we’re requestAnimationFrameing like it’s 1999.
  ticking: false,

  // The canonical list of attached gamepads, without “holes” (always
  // starting at [0]) and unified between Firefox and Chrome.
  gamepads: [],

  // Remembers the connected gamepads at the last check; used in Chrome
  // to figure out when gamepads get connected or disconnected, since no
  // events are fired.
  prevRawGamepadTypes: [],

  // Previous timestamps for gamepad state; used in Chrome to not bother with
  // analyzing the polled data if nothing changed (timestamp is the same
  // as last time).
  prevTimestamps: [],

  /**
   * Initialize support for Gamepad API.
   */
  init: function() {
    var gamepadSupportAvailable = navigator.getGamepads ||
        !!navigator.webkitGetGamepads ||
        !!navigator.webkitGamepads;

    if (!gamepadSupportAvailable) {
      alert('gamepad support not available')
    } else {
      // Check and see if gamepadconnected/gamepaddisconnected is supported.
      // If so, listen for those events and don't start polling until a gamepad
      // has been connected.
      console.log('gamepad supported');
      if ('ongamepadconnected' in window) {
        window.addEventListener('gamepadconnected',
                              gamepadSupport.onGamepadConnect, false);
        window.addEventListener('gamepaddisconnected',
                                gamepadSupport.onGamepadDisconnect, false);
      } else {
        // If connection events are not supported just start polling
        console.log('begin polling')
        gamepadSupport.startPolling();
      }
    }
  },

  /**
   * Starts a polling loop to check for gamepad state.
   */
  startPolling: function() {
    // Don’t accidentally start a second loop, man.
    if (!gamepadSupport.ticking) {
      gamepadSupport.ticking = true;
      gamepadSupport.tick();
    }
  },

  /**
   * Stops a polling loop by setting a flag which will prevent the next
   * requestAnimationFrame() from being scheduled.
   */
  stopPolling: function() {
    gamepadSupport.ticking = false;
  },

  /**
   * A function called with each requestAnimationFrame(). Polls the gamepad
   * status and schedules another poll.
   */
  tick: function() {
    gamepadSupport.pollStatus();
    gamepadSupport.scheduleNextTick();
  },

  scheduleNextTick: function() {
    // Only schedule the next frame if we haven’t decided to stop via
    // stopPolling() before.
    if (gamepadSupport.ticking) {
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(gamepadSupport.tick);
      } else if (window.mozRequestAnimationFrame) {
        window.mozRequestAnimationFrame(gamepadSupport.tick);
      } else if (window.webkitRequestAnimationFrame) {
        window.webkitRequestAnimationFrame(gamepadSupport.tick);
      }
      // Note lack of setTimeout since all the browsers that support
      // Gamepad API are already supporting requestAnimationFrame().
    }
  },

  /**
   * Checks for the gamepad status. Monitors the necessary data and notices
   * the differences from previous state (buttons for Chrome/Firefox,
   * new connects/disconnects for Chrome). If differences are noticed, asks
   * to update the display accordingly. Should run as close to 60 frames per
   * second as possible.
   */
  pollStatus: function() {
    // Poll to see if gamepads are connected or disconnected. Necessary
    // only on Chrome.
    gamepadSupport.pollGamepads();

    for (var i in gamepadSupport.gamepads) {
      var gamepad = gamepadSupport.gamepads[i];

      // Don’t do anything if the current timestamp is the same as previous
      // one, which means that the state of the gamepad hasn’t changed.
      // This is only supported by Chrome right now, so the first check
      // makes sure we’re not doing anything if the timestamps are empty
      // or undefined.
      if (gamepad.timestamp &&
          (gamepad.timestamp == gamepadSupport.prevTimestamps[i])) {
        continue;
      }
      gamepadSupport.prevTimestamps[i] = gamepad.timestamp;
      gamepadSupport.updateDisplay(i);
    }
  },

  // This function is called only on Chrome, which does not yet support
  // connection/disconnection events, but requires you to monitor
  // an array for changes.
  pollGamepads: function() {
    // Get the array of gamepads – the first method (getGamepads)
    // is the most modern one and is supported by Firefox 28+ and
    // Chrome 35+. The second one (webkitGetGamepads) is a deprecated method
    // used by older Chrome builds.
    var rawGamepads =
        (navigator.getGamepads && navigator.getGamepads()) ||
        (navigator.webkitGetGamepads && navigator.webkitGetGamepads());

    if (rawGamepads) {
      // We don’t want to use rawGamepads coming straight from the browser,
      // since it can have “holes” (e.g. if you plug two gamepads, and then
      // unplug the first one, the remaining one will be at index [1]).
      gamepadSupport.gamepads = [];

      // We only refresh the display when we detect some gamepads are new
      // or removed; we do it by comparing raw gamepad table entries to
      // “undefined.”
      var gamepadsChanged = false;

      for (var i = 0; i < rawGamepads.length; i++) {
        if (typeof rawGamepads[i] != gamepadSupport.prevRawGamepadTypes[i]) {
          gamepadsChanged = true;
          gamepadSupport.prevRawGamepadTypes[i] = typeof rawGamepads[i];
        }

        if (rawGamepads[i]) {
          gamepadSupport.gamepads.push(rawGamepads[i]);
        }
      }

      // Ask the tester to refresh the visual representations of gamepads
      // on the screen.
      if (gamepadsChanged) {
        
      }
    }
  },

  // Call the tester with new state and ask it to update the visual
  // representation of a given gamepad.
  updateDisplay: function(gamepadId) {

    var gamepad = gamepadSupport.gamepads[gamepadId];

    // console.log(gamepad.buttons)

    
    if(gamepad.buttons){
      
      if(gamepad.buttons[0].pressed){ // A
        module_changer.step();
      }
      
      if(gamepad.buttons[1].pressed){ // B
       module_changer.step(); 
      }

      if(gamepad.buttons[2].pressed){ // X
        module_changer.step();
      }
      if(gamepad.buttons[3].pressed){ // Y
        module_changer.step();
      }

      

      if(gamepad.buttons[4].pressed) // left bumper
        bg_mod.next();

      if(gamepad.buttons[5].pressed) // right bumper
        images.next();

      if(gamepad.buttons[6].pressed){ // left trigger
        if(bg_mod.box.css('opacity') == 0){
          bg_mod.next();
          bg_mod.show();
        }else{
          bg_mod.clear();          
        }
      }

      if(gamepad.buttons[7].pressed){ // right trigger
        if(inner_bg_mod.box.css('opacity') == 0){
          inner_bg_mod.next();
          inner_bg_mod.show();
        }else{
          inner_bg_mod.clear();          
        }
      }

      

      // PAUSE
      if(gamepad.buttons[9].pressed || gamepad.buttons[8].pressed){
        run = !run;
        if(!run){
          $('#paused-message').show();
        }else{
          $('#paused-message').hide();
        }
      }

      // D PAD
      if(gamepad.buttons[12].pressed){ // up
        keydown['a'] = false;
        keydown['s'] = false;
        keydown['d'] = false;
        keydown['w'] = !keydown['w'];
      }
      if(gamepad.buttons[13].pressed){ // down
        keydown['a'] = false;
        keydown['w'] = false;
        keydown['d'] = false;
        keydown['s'] = !keydown['s'];
      }
      if(gamepad.buttons[15].pressed){ // right
        keydown['w'] = false;
        keydown['s'] = false;
        keydown['a'] = false;
        keydown['d'] = !keydown['d'];        
      }
      if(gamepad.buttons[14].pressed){ // left
        keydown['d'] = false;
        keydown['s'] = false;
        keydown['w'] = false;
        keydown['a'] = !keydown['a'];
      }

      // analog stick press in
      if(gamepad.buttons[10].pressed){
        mirror_gif.vertical_stream = !mirror_gif.vertical_stream;
      }

    }
    

    // Update all the analogue sticks.
      if(gamepad.axes){
        
        // left
        if(mirror_gif.run){
          images.rotation = gamepad.axes[1]*100;
          images.margin = gamepad.axes[0]*400;
        
        }else if(hallway.run){
          hallway.origin_x = gamepad.axes[0]+.25;
          hallway.origin_y = gamepad.axes[1]+.25;
        
        }else if(chain.run){
          chain.move_x = gamepad.axes[0]*100;
          chain.move_y = gamepad.axes[1]*100; 
        
        }else if(center_pix.run){
          images.height = Math.pow(((gamepad.axes[1]*-1)+2),6.5)+250;
          images.width = Math.pow(((gamepad.axes[0]*-1)+2),6.5)+250;
        }
         
         // right
        if(mirror_gif.run){
          images.height = ((gamepad.axes[3]+1)*100);
          images.width = ((gamepad.axes[2]+1)*400)+20;

        }else if(hallway.run){
          if( gamepad.axes[3]>0.2 ){
            hallway.perspective = gamepad.axes[3]*1450;  
          }else if( gamepad.axes[3]< -0.2 ){
            hallway.perspective = (gamepad.axes[3]*-1)*1450;
          }else{
            hallway.perspective = 250;
          }
        
        }else if(chain.run){
          images.height = ((gamepad.axes[3]+1)*400)+20;
          images.width = ((gamepad.axes[2]+1)*400)+20;
        
        }else if(center_pix.run){
          images.rotation = (gamepad.axes[3]*10)*(gamepad.axes[2]*10);  
        }

        
        
           
      }

  }
};

gifslap_gamepad = true;

// set modules for use with gamepad mode
module_changer.functions= new Array(
    chain.init,
    hallway.init,
    mirror_gif.init,
    center_pix.init
  );

//set images defaults
images.amount = 25;
images.fly_off_dist = 50;

chain.distance = 2;

gamepadSupport.init();