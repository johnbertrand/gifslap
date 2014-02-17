var save_out = {
  
  // get_global_vars: function(){
  //   var keyValues = [], global = window; // window for browser environments
  //   for (var prop in global) {
  //       keyValues.push(prop + "=" + global[prop]);
  //   }
  //   return keyValues.join('&'); // build the string
  // },
  
  prompt_name: function(){
    var creation_name = null;
    var creation_name = prompt("Name this creation");
    if( creation_name == null ){
      return "exit";
    }

    return creation_name.replace(/\W|_/gi,"_");
  },

  run: function(){
    
    name = save_out.prompt_name();
    if(name == "exit"){ alert('exited'); return; }

    visuals_container = $('#container').html();
    move_images = images.get_sources();

    data_string = 'name='+name+'&visuals_container='+visuals_container+'&images='+move_images;
    
    $.ajax({
      type:"POST",
      data: data_string,
      url: "core/save_out.php",
      success:function( data ){
        //alert(data);
      }
    });

  }

}