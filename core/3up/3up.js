var _3up = {
  location: 'none', // this is set with corner-3up.js or offscreen-3up.js
  update: function(){
    // to short circuit the call if we are not using 3up.
    if( _3up.location == "none" ){ return; }
    _3up.update_handler();
  }, 
  update_handler: function(){}, // function will be assigned by corner-3up or offscreen-3up.js
  fg_offset: 1,
  bg_offset: 1,
  ibg_offset: 1,
  // fg_preview_cursor:1,
  // bg_preview_cursor:0,
  // inner_bg_preview_cursor:0,
  fg_advance_view: function(){
    _3up.fg_offset++;
    _3up.update();
  },
  bg_advance_view: function(){
    _3up.bg_offset++;
    _3up.update();
  },
  ibg_advance_view: function(){
    _3up.ibg_offset++;
    _3up.update();
  }
}