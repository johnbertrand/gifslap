
//initialize
$('#container').append(
  $('<div id="preview-box"></div>')
  .attr("style", "position:absolute; bottom:0px; left:0px; width:500px; height:45px; z-index:10000000000000")
);

$('#container').append(
  $('<div id="hud"></div>').css({
    'position':'absolute',
    'top':'0px',
    'left':'0px',
    'width':'100%',
    'height':'100%',
    'z-index':'10000000000000',
    'display':'none'
  }).append(
    $('<div id="hud-sets">THIS IS THE SET LIST</div>').css({
      'color':'#fff',
      'text-align':'left',
      'float':'left',
      'padding':'10px',
      'background-color':'black'
    })
  )
);

var hud = {
  preview: false,
  preview_box: $('#preview-box'),
  show: function(){
    $('#hud').css("display","block");
  },
  hide: function(){
    $('#hud').css("display","none");
  },
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