var scenes_helper = {
  scenes_for_set: scenes.all_gifs, // scenes for current set
  activate_scenes_for_set: function(new_scenes){
    scenes_helper.scenes_for_set = new_scenes;
  },
  activate_scene: function(key){
    set_title = sets_helper.current_set_name;
    scene_title = scenes_helper.scenes_for_set[key];

    $.ajax({
      url: "sets/"+set_title+"/scenes/"+scene_title+".html",
      success:function( html ){
        //add the script to the bottom of the body, which will immediately evaluate it.
        $('body').append( html );        

      }
    });

    
    
  }
}