var images = {
  set_array: new Array(),
	height: 500,
	width: "auto",
	opacity: 1,
	radius: 0,
	rotation: 0,
  rotation_speed: 0,
  randomize_order: true,
  border_image: false,
  border_width: 50,
  border_slice: 48,
  amount: 10, //amount allowed in chain
  auto_height: false,
  auto_height_steps: 8,
  auto_height_cursor: 0,
  fly_off_dist: 20,
  fly_off: function(){

      css_direction = 'NULL';

      if( keydown['w'] ){
        css_direction = 'top';
      }
      if( keydown['a'] ){
        css_direction = 'left';
      }
      if( keydown['s'] ){
        css_direction = 'bottom';
      }
      if( keydown['d'] ){
        css_direction = 'right';
      }

      if( css_direction == 'NULL' ){ return; }

    $('img').not('.locked').each(function(){

      if( css_direction == "left" || css_direction == "top" ){
        direction_value = $(this).css(css_direction);
        direction_value = parseInt(direction_value);
        $(this).css(css_direction,(direction_value-images.fly_off_dist)+"px");
      }
      
      if(css_direction == "right"){
        direction_value = $(this).css('left');
        direction_value = parseInt(direction_value);
        $(this).css('left',(direction_value+images.fly_off_dist)+"px");
      }

      if(css_direction == "bottom"){
        direction_value = $(this).css('top');
        direction_value = parseInt(direction_value);
        $(this).css('top',(direction_value+images.fly_off_dist)+"px");
      }
    });

  },
  get_sources: function(){
    _images = [];
    $('#container *').each(function(){
      
      if( $(this).attr('src') )
        _images.push( $(this).attr('src') );

      if( $(this).css('background-image') !== 'none' ){
        bg = $(this).css('background-image');
        bg = bg.replace('url(','').replace(')','');
        _images.push( bg );
      }

    });
    unique_images = _images.filter(function(elem, pos) {
        return _images.indexOf(elem) == pos;
    })
    return unique_images;
  },
  remove_random: function(){
    images_onscreen = $('img').not('.circle, .locked').length;
    random_ele=(Math.floor(Math.random()*images_onscreen));
    if(random_ele < 5){ random_ele = 6; }
    $('img').not('.circle, .locked').eq(random_ele).remove();
  },
  clear: function(){
    $('img').remove();
  },
  rotate_all: function(degrees){
    images.rotation = images.rotation + degrees;
    $('img').css({'-webkit-transform': 'rotate('+(-1*images.rotation)+'deg) scaleX(-1)'});
  }
}