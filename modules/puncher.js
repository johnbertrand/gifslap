var puncher = {
  fade_time: 1000,
  punch: function(index){
    
    if(!index){index=0;}

    src=images.set_array[index];
  
    pos_y=Math.floor(Math.random()*window.innerHeight);
    pos_x=Math.floor(Math.random()*window.innerWidth);
    height=Math.floor(Math.random()*300)+100;
    
    // if(index==0){button=31}
    // else if(p_num==1){button=39}
    // else if(p_num==2){button=47}
    // else if(p_num==3){button=55}
    // else if(p_num==4){button=63}
    // Jazz.MidiOut(0x90,button,1);
    
    $p_img = $('<img src="'+src+'" class="gif locked" height="'+height+'" />').css({
      'top':pos_y,
      'left':pos_x,
      'z-index':'1000000000000'
    });
    $('#container').prepend( $p_img );
    //$p_img.error(function(){ $(this).attr('src',theme_array[p_num]); });

    $p_img.animate({'top':5000,},5000,function(){
      $(this).remove();
      //Jazz.MidiOut(0x90,$(this).attr('alt'),0)
    });
  }
}