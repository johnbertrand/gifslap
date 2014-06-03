var rippler={
  coords:[],
  box:null,
  block_width:null,
  block_height:null,
  init:function(){

    // add the rippler container
    $rippler_box = $('<div id="rippler_box"></div>').css({
      'position':'absolute',
      'top':'0px',
      'left':'0px',
      'width':'100%',
      'height':'100%',
      'z-index':'4'
    });
    $('#container').append($rippler_box);
    rippler.box = $('#rippler_box');

    // get the 64 points. We count in columns, since the block midi is set up that way
    rippler.block_width = window.innerWidth/8;
    rippler.block_height = window.innerHeight/8;
    
    i=0;
    bk_x = 0;
    bk_y = 0;
    while(i<64){

      xy = [bk_x,bk_y];
      rippler.coords.push(xy);

      bk_y = bk_y+rippler.block_height;
      if(bk_y > (rippler.block_height*7)){
        bk_y = 0;
        bk_x = bk_x + rippler.block_width;
      }

      i++;
    }
  },
  activated_blocks: [],
  show_block: function(index,entropy){
    if(entropy > 4){return;}
    if( rippler.activated_blocks[index] ){return;}

    rippler.activated_blocks[index] = true;
    $ripple_img = $('<img class="locked" />')
    .attr("src",images.set_array[images.cursor+entropy])
    .css({
      'position':'absolute',
      'box-sizing':'border-box',
      'padding':entropy*5+'px',
      'width':rippler.block_width+20+"px",
      'height':rippler.block_height+20+"px",
      'top':rippler.coords[index][1]+"px",
      'left':rippler.coords[index][0]+"px",
    });
    rippler.box.append($ripple_img);
    $ripple_img.delay(80).hide(100,function(){
      $(this).remove();
      rippler.show_block(index+1,entropy);
      rippler.show_block(index-1,entropy);
      rippler.show_block(index+8,entropy);
      rippler.show_block(index-8,entropy);
    });
    setTimeout(function(){
      rippler.activated_blocks[index] = false;
    },200)
    entropy++
    
  }
}

rippler.init();