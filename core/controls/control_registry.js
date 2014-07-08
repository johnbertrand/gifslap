//control registry

// connect this to an interface for mapping MIDI

var controls = {
  
  knobs : {

    single_height : {
      name: "Single Height",
      change: function( value ){
        images.height = value*8;
        if(images.height<10){images.height=10}
      }
      cursor: [false,false], // x,y 
      midi_control_id: null 
    },

    single_height : {
      name: "Single Width",
      change: function( value ){
        images.width = value*14;
        if(images.width<10){images.width=10}
      }
      cursor: [false,false], // x,y 
      midi_control_id: null 
    }

  },
  buttons : {

    next_image : {
      name: "Next Image",
      press: function(){
        images.next();
      },
      keystroke: null,
      midi_control_id: null
    },

    next_background : {
      name: "Next Background",
      press: function(){
        bg_mod.next();
      },
      keystroke: null,
      midi_control_id: null
    }

  }

}