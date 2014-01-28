
//initialize
$('body').append(
  $('<div id="preview-box"></div>')
  .attr("style", "position:absolute; bottom:0px; left:0px; width:500px; height:45px; z-index:10000000000000")
);

var hud = {
  preview: false,
  preview_box: $('#preview-box'),
  show_preview: function(){

    images_preview_cursor = chain.cursor+1;
    bgs_preview_cursor = bg_mod.cursor;
    inner_bgs_preview_cursor = inner_bg_mod.cursor;

    hud.preview_box.prepend(
      $('<img />')
      .attr("src",inner_bg_mod.active_set[inner_bgs_preview_cursor])
      .attr('class','locked')
      .attr("style","height:25px; width:25px; opacity:.5; float:left;")
    );
    hud.preview_box.prepend(
      $('<img />')
      .attr("src",bg_mod.active_set[bgs_preview_cursor])
      .attr('class','locked')
      .attr("style","height:25px; width:25px; opacity:.5; float:left;")
    );
    hud.preview_box.prepend(
      $('<img />')
      .attr("src",images.set_array[images_preview_cursor])
      .attr('class','locked')
      .attr("style","height:25px; width:25px; opacity:.5; float:left;")
    );
    
    
  },
  refresh_preview: function(){
    hud.preview_box.empty();
    hud.show_preview();
  }
  
}