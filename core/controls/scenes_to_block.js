midi_row_0_cursor = 0;
midi_row_1_cursor = 0;
midi_row_2_cursor = 0;
midi_row_3_cursor = 0;
midi_row_4_cursor = 0;
midi_row_5_cursor = 0;
midi_row_6_cursor = 0;
midi_row_7_cursor = 0;
midi_row_8_cursor = 0;

scenes_for_buttons = [];

scenes.all_gifs.forEach(function(scene_name){

  // Quintation
  if( scene_name.indexOf("quint") !== -1 ){

    button = midi_row_0_cursor*8
    illuminate_on_block( button );
    scenes_for_buttons[button] = scene_name;
    midi_row_0_cursor++;

  }

  
  if( scene_name.indexOf("dead_hand") !== -1 ){
    
    button = (midi_row_1_cursor*8)+1;
    illuminate_on_block( button );
    scenes_for_buttons[button] = scene_name;
    midi_row_1_cursor++;

  }

  // Polish Cold War Neon
  if( scene_name.indexOf("polish") !== -1 ){
    
    button = (midi_row_2_cursor*8)+2;
    illuminate_on_block( button );
    scenes_for_buttons[button] = scene_name;
    midi_row_2_cursor++;

  }

  // Norberto Fig
  if( scene_name.indexOf("norberto") !== -1 ){
    
    button = (midi_row_3_cursor*8)+3;
    illuminate_on_block( button );
    scenes_for_buttons[button] = scene_name;
    midi_row_3_cursor++;

  }

  // Pewter Handles
  if( scene_name.indexOf("pewter") !== -1 ){
    
    button = (midi_row_4_cursor*8)+4;
    illuminate_on_block( button );
    scenes_for_buttons[button] = scene_name;
    midi_row_4_cursor++;

  }

  // Civil Disobedience is Civil Defense
  if( scene_name.indexOf("civil") !== -1 ){
    
    button = (midi_row_5_cursor*8)+5;
    illuminate_on_block( button );
    scenes_for_buttons[button] = scene_name;
    midi_row_5_cursor++;

  }

  // Cosmic Sans
  if( scene_name.indexOf("cosmic") !== -1 ){
    
    button = (midi_row_6_cursor*8)+6;
    illuminate_on_block( button );
    scenes_for_buttons[button] = scene_name;
    midi_row_6_cursor++;

  }

  // Detour of Duty
  if( scene_name.indexOf("detour") !== -1 ){
    
    button = (midi_row_7_cursor*8)+7;
    illuminate_on_block( button );
    scenes_for_buttons[button] = scene_name;
    midi_row_7_cursor++;

  }

});