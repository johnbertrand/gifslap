var images = {
	height: 500,
	width: "auto",
	opacity: 1,
	radius: 0,
	rotation: 0,
  rotation_speed: 0,
  randomize_order: true,
  amount: 10, //amount allowed in chain
  auto_height: false,
  auto_height_steps: 8,
  auto_height_cursor: 0,
  set_array: new Array(),
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