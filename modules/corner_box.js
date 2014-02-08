var corner_box = {
  cursor: 0,
  width: 20, //percent
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
      $('body').append($box);
    }

    $pic = $('<img class="locked" src="'+images.set_array[corner_box.cursor]+'" />').css({
      'width':"100%"
    });

    $('#corner-box').toggleClass('hidden').html($pic);
    if( $('#corner-box').hasClass('hidden') ){ return; }

    if(corner_box.cursor >= images.set_array.length-1){ 
      corner_box.cursor=0; 
    }else{
      corner_box.cursor++;
    }
  }
}