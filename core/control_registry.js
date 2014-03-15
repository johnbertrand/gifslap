//control registry

var control_registry = {
  single_height : {
    name: "Single Height",
    type: "knob",
    midi_response: function( value ){
      images.height = value * 8;
    },
    basic_response: function( cursor ){
      images.height = cursor * 30;
    }
    // activation_key: null, 
    // midi_control_id: null 
  }

}