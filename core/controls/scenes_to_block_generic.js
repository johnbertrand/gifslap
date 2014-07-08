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
  if( scene_name.indexOf("row1") !== -1 ){

    button = midi_row_0_cursor*8
    illuminate_on_block( button );
    scenes_for_buttons[button] = scene_name;
    midi_row_0_cursor++;

  }

  
  if( scene_name.indexOf("row2") !== -1 ){
    
    button = (midi_row_1_cursor*8)+1;
    illuminate_on_block( button );
    scenes_for_buttons[button] = scene_name;
    midi_row_1_cursor++;

  }

  if( scene_name.indexOf("row3") !== -1 ){
    
    button = (midi_row_2_cursor*8)+2;
    illuminate_on_block( button );
    scenes_for_buttons[button] = scene_name;
    midi_row_2_cursor++;

  }

  if( scene_name.indexOf("row4") !== -1 ){
    
    button = (midi_row_3_cursor*8)+3;
    illuminate_on_block( button );
    scenes_for_buttons[button] = scene_name;
    midi_row_3_cursor++;

  }

  if( scene_name.indexOf("row5") !== -1 ){
    
    button = (midi_row_4_cursor*8)+4;
    illuminate_on_block( button );
    scenes_for_buttons[button] = scene_name;
    midi_row_4_cursor++;

  }

  if( scene_name.indexOf("row6") !== -1 ){
    
    button = (midi_row_5_cursor*8)+5;
    illuminate_on_block( button );
    scenes_for_buttons[button] = scene_name;
    midi_row_5_cursor++;

  }

  if( scene_name.indexOf("row7") !== -1 ){
    
    button = (midi_row_6_cursor*8)+6;
    illuminate_on_block( button );
    scenes_for_buttons[button] = scene_name;
    midi_row_6_cursor++;

  }

  if( scene_name.indexOf("row8") !== -1 ){
    
    button = (midi_row_7_cursor*8)+7;
    illuminate_on_block( button );
    scenes_for_buttons[button] = scene_name;
    midi_row_7_cursor++;

  }

});