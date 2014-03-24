

var corner_box = {
  set_array: images.active_set.punches,
  cursor: Math.floor((Math.random()*images.set_array.length)+1),
  width: 30, //percent
  toggle: function(){
    
    //instantiate the box
    if( $('#corner-box').length == 0 ){
      $box = $('<div id="corner-box" class="hidden" ></div>').css({
        'width': corner_box.width+"%",
        'position': 'absolute',
        'top': '0px',
        'left': '0px;',
        'z-index':'100000000000'
      });
      $('#container').append($box);
    }

    $pic = $('<img class="locked" src="'+corner_box.set_array[corner_box.cursor]+'" />').css({
      'width':"100%"
    });

    $('#corner-box').toggleClass('hidden').html($pic);
    if( $('#corner-box').hasClass('hidden') ){ return; }

    if(corner_box.cursor >= corner_box.set_array.length-1){ 
      corner_box.cursor=0; 
    }else{
      corner_box.cursor++;
    }
  }
}