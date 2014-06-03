var hud_window;

var os_hud = {
  fg_preview_cursor:1,
  bg_preview_cursor:0,
  inner_bg_preview_cursor:0,
  open: function(){
    hud_window = window.open("os_hud.html","_blank","height=800,width=800,status=yes,toolbar=no,menubar=no,location=no");
    $(hud_window.document).ready(function () {
      os_hud.update();
    });
  },
  update: function(){
    $(hud_window.document).contents().find('#hud-fg').attr('src',images.set_array[images.cursor+os_hud.fg_preview_cursor]);
    $(hud_window.document).contents().find('#hud-bg').attr('src',bg_mod.active_set[bg_mod.cursor+os_hud.bg_preview_cursor]);
    $(hud_window.document).contents().find('#hud-inner-bg').attr('src',inner_bg_mod.active_set[inner_bg_mod.cursor+os_hud.inner_bg_preview_cursor]);
  },
  fg_advance_view: function(){
    os_hud.fg_preview_cursor++;
    os_hud.update();
  },
  fg_launch: function(){
    images.cursor = images.cursor+os_hud.fg_preview_cursor;
    os_hud.fg_advance_view();
  },
  bg_advance_view: function(){
    os_hud.bg_preview_cursor++;
    os_hud.update();
  },
  bg_launch: function(){
    bg_mod.cursor = bg_mod.cursor+os_hud.bg_preview_cursor;
    bg_mod.show();
    os_hud.bg_advance_view();
  },
  inner_bg_advance_view: function(){
    os_hud.inner_bg_preview_cursor++;
    os_hud.update();
  },
  inner_bg_launch: function(){
    inner_bg_mod.cursor = inner_bg_mod.cursor+os_hud.inner_bg_preview_cursor;
    inner_bg_mod.show();
    os_hud.inner_bg_advance_view();

  },
}

os_hud.open();
$(window).unload(function(){
  hud_window.close();
});