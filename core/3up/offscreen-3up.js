
// variable for the offscreen window
var hud_window;

// handles opening and updating window
var offscreen_3up = {
  open: function(){
    hud_window = window.open("core/3up/os_hud.html","_blank","height=800,width=800,status=yes,toolbar=no,menubar=no,location=no");
    $(hud_window.document).ready(function () {
      offscreen_3up.update();
    });
  },
  update: function(){
    $(hud_window.document).contents().find('#hud-fg').attr('src',"../../"+images.set_array[images.cursor+_3up.fg_preview_cursor]);
    $(hud_window.document).contents().find('#hud-bg').attr('src',"../../"+bg_mod.active_set[bg_mod.cursor+_3up.bg_preview_cursor]);
    $(hud_window.document).contents().find('#hud-inner-bg').attr('src',"../../"+inner_bg_mod.active_set[inner_bg_mod.cursor+_3up.inner_bg_preview_cursor]);
  }
}

// set the handler so _3up knows what to update;
_3up.update_handler = offscreen_3up.update;

// set the location of the 3up
_3up.location = "offscreen";

// open window
offscreen_3up.open();

// close the window on page close
$(window).unload(function(){
  hud_window.close();
});