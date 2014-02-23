var border_pic = {
  run: false,
  toggle: function(){
    
    if( !border_pic.run ){

      style = $('<style>img{}</style>')

    }

    if( border_pic.run ){

      border_pic.run = false;  
    }

  }  
}