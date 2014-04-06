
//setup

(function(){
  $kscope_box = $('<div id="kscope-box"></div>').css({
    'position': 'absolute',
    'height': '70%',
    'width': '70%',
    'left': '15%',
    'top': '15%',
    'z-index': '1'
  });

  $('#container').append($kscope_box);

}());

var kscope = {
  run: false,
  box: $('#kscope-box'),
  current_cursor: 0,
  init: function(){
    kscope.run = true;
    kscope.set_boxes();

  },
  set_boxes:function(){
    i=0;
    while(i<4){
      $kscope_square = $("<div class='kscope-box'></div>")
      .css({
        'border-image':'url('+images.set_array[images.cursor+i]+') 48% repeat',
        'background-image':'url('+images.set_array[images.cursor+i+1]+')',
        'background-size':'cover',
        'width':'50%',
        'height':'50%',
        'float':'left',
        'border-width':'50px',
        'box-sizing':'border-box'
      });
      kscope.box.append($kscope_square);
      i++;
    }
  },
  draw: function(){
    if( !kscope.run ){ return; }
    if( images.cursor !== kscope.current_cursor ){
      kscope.box.empty();
      kscope.set_boxes();
      kscope.current_cursor = images.cursor;
    }

    $('.kscope-box').css({
      "border-image-slice":(controls.curs_width*100)+"%",
      "border-width":(controls.curs_height*100)+"px"

    });

  },
  die: function(){
    kscope.run = false;
    kscope.box.empty();
  }
}