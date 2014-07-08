
// sets up the 3up and updates them
var corner_3up = {
  init: function(){
    $3up_box = $( "<div id='_3up' />" ).css({
      'position':'absolute',
      'bottom':'10px',
      'left':'10px',
      'z-index':'9999999999999999'
    });
    corner_3up.$fg = $('<img src="#" class="locked" />').css({'margin-right':'10px','width':'100px'});
    corner_3up.$bg = $('<img src="#" class="locked" />').css({'margin-right':'10px','width':'100px'});
    corner_3up.$ibg = $('<img src="#" class="locked" />').css('width','100px');
    $3up_box.append(corner_3up.$fg).append(corner_3up.$bg).append(corner_3up.$ibg);
    $('body').append($3up_box);
  },
  $fg: null,
  $bg: null,
  $ibg: null,
  update: function(){
    
    corner_3up.$fg.attr('src',images.set_array[images.cursor+_3up.fg_offset]);
    corner_3up.$bg.attr('src',bg_mod.active_set[bg_mod.cursor+_3up.bg_offset]);
    corner_3up.$ibg.attr('src',inner_bg_mod.active_set[inner_bg_mod.cursor+_3up.ibg_offset]);
  }
}

// set up the box
corner_3up.init();

// set the handler so _3up knows what to update;
_3up.update_handler = corner_3up.update;

// set the location of the 3up
_3up.location = "corner";