
//initialize
(function(){

  $hud = $('<div id="hud"></div>').css({
    'position':'absolute',
    'top':'0px',
    'left':'0px',
    'width':'100%',
    'height':'100%',
    'z-index':'10000000000000',
    'display':'none'
  });

  $set_list_element = $('<ul id="hud-sets"></div>').css({
    'list-style-type':'upper-latin',
    'color':'#fff',
    'text-align':'left',
    'float':'left',
    'padding':'10px 10px 10px 20px',
    'background-color':'black'
  });

  set_list.forEach(function(set) {
      if( set == null ){
        set_title = ""; 
      }else{
        set = set[0];
        set_title = sets_helper.get_name(set);
      }
      
      
      $set_list_element.append($("<li>"+set_title+"</li>"));
  });

  $hud.append($set_list_element);

  $scene_list_element = $('<ul id="hud-scenes"></div>').css({
    'list-style-type':'upper-latin',
    'color':'#fff',
    'text-align':'left',
    'float':'left',
    'padding':'10px 10px 10px 20px',
    'background-color':'black'
    // 'display':'none'
  });

  scenes_helper.scenes_for_set.forEach(function(scene_title){
      $scene_list_element.append($("<li>"+scene_title+"</li>"));
  });

  $hud.append($scene_list_element);  

  $preview_box = $('<div id="preview-box"></div>').css({
    'background-color':'black',
    'position':'absolute',
    'bottom':'0px',
    'left':'0px',
    'width':'75px',
    'height':'25px',
  });

  $hud.append($preview_box);

  $('body').append($hud);

}());

var hud = {
  visible: false,
  preview: false,
  preview_box: $('#preview-box'),

  // Main HUD operations
  show: function(){
    if( !hud.visible ){
      //hud.draw();
      hud.refresh_preview();
      $('#hud').css("display","block");
      hud.visible = true;
    }
  },
  hide: function(){
    $('#hud').css("display","none");
    hud.visible = false;
  },

  show_preview: function(){

    images_preview_cursor = images.cursor+1;
    bgs_preview_cursor = bg_mod.cursor;
    inner_bgs_preview_cursor = inner_bg_mod.cursor;

    hud.preview_box.prepend(
      $('<img />')
      .attr("src",inner_bg_mod.active_set[inner_bgs_preview_cursor])
      .attr('class','locked')
      .attr("style","height:25px; width:25px; float:left;")
    );
    hud.preview_box.prepend(
      $('<img />')
      .attr("src",bg_mod.active_set[bgs_preview_cursor])
      .attr('class','locked')
      .attr("style","height:25px; width:25px; float:left;")
    );
    hud.preview_box.prepend(
      $('<img />')
      .attr("src",images.set_array[images_preview_cursor])
      .attr('class','locked')
      .attr("style","height:25px; width:25px; float:left;")
    );
    
    
  },
  refresh_preview: function(){
    hud.preview_box.empty();
    hud.show_preview();
  }
  
}