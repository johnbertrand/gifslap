var save_out = {

  get_vars: function(){
    var keyValues = [];
    var globals = window; // window for browser environments
    var include = [
    'images',
    'circle',
    'chain',
    'center_pix',
    'hallway',
    'rainbow_bars',
    'inner_bg_mod',
    'bg_mod',
    'big_shrinker',
    'puncher',
    'corner_box'];

    // exclude is for the elements within objects!
    var exclude = [
    'images.active_set',
    'images.set_array']
    
    // all the global variables
    for (var variable in globals) {

      //Only keep variables on the include list
      if( !include.contains(variable) )
        continue;

      //if it's an object then output all the sub variables
      if( typeof window[variable] == "object" ){
        
        object_to_save = window[variable];

        // iterate over elements in the object
        for(var obj_element in object_to_save){

          var property_name = variable + "." + obj_element;
          
          // discard certain object elements (list above)
          if( exclude.contains(property_name) )
            continue;

          // discard function elements
          if(typeof object_to_save[obj_element] == 'function')
            continue;

          // discard object elements
          if(typeof object_to_save[obj_element] == 'object')
            continue;

          keyValues.push(property_name + "=" + object_to_save[obj_element]);
        }

      }else{
        // variable is not an object
        keyValues.push(variable + "=" + globals[variable]);
      }

    }
    // build the string
    keyvalues = keyValues.join('; '); 
    keyvalues = keyvalues += ";";
    return keyvalues;
  },
  
  prompt_name: function(){
    var creation_name = null;
    var creation_name = prompt("Name this creation");
    if( creation_name == null ){
      return "exit";
    }

    return creation_name.replace(/\W|_/gi,"_");
  },

  run: function(is_scene){

    if( typeof is_scene == 'undefined' ){ is_scene = false; }

    name = save_out.prompt_name();
    if(name == "exit"){ alert('quit'); return; }

    visuals_container = $('#container').html();
    images_to_copy = images.get_sources();

    data_string = 'name='+name+'&visuals_container='+visuals_container+'&images='+images_to_copy;

    if( is_scene ){
      variable_settings = save_out.get_vars();
      set_name = sets_helper.get_name();

      data_string += "&scene_variables=" + variable_settings + "&set_name=" + set_name;

      // Saving a scene to activate later
      $.ajax({
        type:"POST",
        data: data_string,
        url: "core/save_scene.php",
        success:function( data ){
          // alert(data);
        }
      });

    }else{

      // Saving a still composition
      $.ajax({
        type:"POST",
        data: data_string,
        url: "core/save_still.php",
        success:function( data ){
          //alert(data);
        }
      });

    }

  }

}