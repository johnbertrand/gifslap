var save_out = {
  
  get_global_vars: function(){
    var keyValues = [], global = window; // window for browser environments
    for (var prop in global) {
        keyValues.push(prop + "=" + global[prop]);
    }
    return keyValues.join('&'); // build the string
  },
  
  prompt_name: function(){
    var creation_name=null;
    while (creation_name==null || creation_name==""){
      var creation_name=prompt("Name this creation");
    }
    return creation_name.replace(/\W|_/gi,"_");
  },
  
  get_img_srcs:function(){
    images = [];
    $('#container *').each(function(){
      
      if( $(this).attr('src') )
        images.push( $(this).attr('src') );

      if( $(this).css('background-image') !== 'none' ){
        bg = $(this).css('background-image');
        bg = bg.replace('url(','').replace(')','');
        images.push( bg );
      }

    });
    unique_images = images.filter(function(elem, pos) {
        return images.indexOf(elem) == pos;
    })
    return unique_images;
  },

  run: function(){
    name = save_out.prompt_name();
    
    visuals_container = $('#container').html();
    images = save_out.get_img_srcs();

    data_string = 'name='+name+'&visuals_container='+visuals_container+'&images='+images;

    $.ajax({
      type:"POST",
      data: data_string,
      url: "core/save_out.php",
      success:function( data ){
        alert(data);
      }
    });

  }

}