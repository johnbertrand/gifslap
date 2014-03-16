//These correspond to folders
var set_list = Array();

 /*A*/ set_list[65] = sets.pacifica;
 /*B*/ set_list[66] = sets.bakery_fresh;
 /*C*/ set_list[67] = sets.CBMD_MUSIC;
 /*D*/ set_list[68] = sets.does_the_mountain_dream_at_night;
 /*E*/ set_list[69] = sets.eight_bit_sf;
 /*F*/ set_list[70] = sets.flashbulb;
 /*G*/ set_list[71] = sets.deff_coast;
 /*H*/ set_list[72] = sets.gif_happy_hour;
 /*I*/ set_list[73] = sets.the_time_it_takes_a_tree_to_blink;
 /*J*/ set_list[74] = null;
 /*K*/ set_list[75] = sets.knights_in_cairo;
 /*L*/ set_list[76] = sets.redline;
 /*M*/ set_list[77] = sets.midnight_glide;
 /*N*/ set_list[78] = sets.new_quest_city;
 /*O*/ set_list[79] = sets.momentous;
 /*P*/ set_list[80] = sets.petra;
 /*Q*/ set_list[81] = null;
 /*R*/ set_list[82] = sets.rich_ddt;
 /*S*/ set_list[83] = sets.slosh_drop;
 /*T*/ set_list[84] = sets.tributary_lost;
 /*U*/ set_list[85] = null;
 /*V*/ set_list[86] = null;
 /*W*/ set_list[87] = sets.welcome_ohm;
 /*X*/ set_list[88] = sets.extent_of_the_jam;
 /*Y*/ set_list[89] = sets.not_too_shabby;
 /*Z*/ set_list[90] = sets.starpause;

var switch_sets = function(key){
  new_set = set_list[key];

  if(new_set == null){ return; }

  first_item = new_set.main[1];


  var set_title_regex = /\/(.*)\//g;
  var set_title = myRegexp.exec(first_item);
  
  images.active_set = new_set;
  images.set_array = new_set.main;

  // we need this:
  // modules.reset()
  // to do the following:

  bg_mod.reset();
  inner_bg_mod.reset();
  images.clear();

}